const aws = require('aws-sdk');

aws.config.update({region: 'eu-west-1'});

const ddb = new aws.DynamoDB({apiVersion: '2012-08-10'});
const api = new aws.ApiGatewayManagementApi({
    endpoint: process.env.API_GATEWAY_MANAGEMENT_ENDPOINT
});

exports.handler = async (event) => {
    const roomID = JSON.parse(event.body).data.room_id;
    const connectionID = event.requestContext.connectionId;

    let ddbQueryRoomParams = {
        TableName: 'vote_poker.rooms',
        Key: {
            "room_id": {S: roomID}
        }
    };

    let ddbQueryVotersParams = {
        TableName: 'vote_poker.voters',
        IndexName: 'RoomIndex',
        KeyConditionExpression: "room_id = :room_id",
        ExpressionAttributeValues: {
            ":room_id": {S: roomID}
        }
    };

    try {
        const roomQueryResponse = await ddb.getItem(ddbQueryRoomParams).promise();

        if (roomQueryResponse.Item.room_owner.S !== connectionID) {
            throw "Reveal votes command did not come from room owner";
        }

        let updateRoomParams = {
            TableName: 'vote_poker.rooms',
            Key: {
                "room_id": {S: roomID}
            },
            UpdateExpression: "SET votes_revealed = :vr",
            ExpressionAttributeValues: {
                ":vr": {BOOL: true}
            }
        };

        await ddb.updateItem(updateRoomParams).promise();

        const roomData = {
            "room_id": roomQueryResponse.Item.room_id.S,
            "room_owner": roomQueryResponse.Item.room_owner.S,
            "votes_revealed": true,
            "room_settings": JSON.parse(roomQueryResponse.Item.room_settings.S)
        };

        const votersQueryResponse = await ddb.query(ddbQueryVotersParams).promise();

        const votersData = votersQueryResponse.Items.map((voterResponseData) => {
            return {
                voter_id: voterResponseData.connection_id.S,
                voter_name: voterResponseData.voter_name.S,
                vote_placed: voterResponseData.vote_placed.BOOL,
                vote: voterResponseData.vote.S,
                settings: JSON.parse(voterResponseData.voter_settings.S)
            };
        });

        let promises = [];

        for (const idx in votersData) {
            const voter = votersData[idx];

            const votersParams = {
                ConnectionId: voter.voter_id,
                Data: Buffer.from(JSON.stringify(
                    {
                        "action": "votersupdated",
                        "data": {
                            "us": voter.voter_id,
                            "voters": votersData
                        }
                    }
                ))
            };

            const roomParams = {
                ConnectionId: voter.voter_id,
                Data: Buffer.from(JSON.stringify(
                    {
                        "action": "roomsettingschanged",
                        "data": roomData
                    }
                ))
            };

            promises.push(api.postToConnection(votersParams).promise());
            promises.push(api.postToConnection(roomParams).promise());
        }

        return Promise.all(promises)
            .then(() => {
                return {
                    statusCode: 200,
                    body: JSON.stringify("Voter " + connectionID + " has joined room " + roomID),
                };
            })
            .catch((err) => {
                console.log("Error!" + err);
                throw err
            });
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify("Error!" + err),
        };
    }
};
