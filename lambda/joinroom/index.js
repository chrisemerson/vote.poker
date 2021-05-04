const aws = require('aws-sdk');

aws.config.update({region: 'eu-west-1'});

const ddb = new aws.DynamoDB({apiVersion: '2012-08-10'});
const api = new aws.ApiGatewayManagementApi({
    endpoint: process.env.API_GATEWAY_MANAGEMENT_ENDPOINT
});

exports.handler = async (event) => {
    const roomID = JSON.parse(event.body).data.room_id;
    const name = JSON.parse(event.body).data.name;
    const connectionID = event.requestContext.connectionId;

    let ddbUpdateParams = {
        TableName: 'bjss.poker_voters',
        Key: {
            "connection_id": {S: connectionID}
        },
        UpdateExpression: "SET room_id = :r, voter_name = :n",
        ExpressionAttributeValues: {
            ":r": {S: roomID},
            ":n": {S: name}
        }
    };

    let ddbQueryRoomParams = {
        TableName: 'bjss.poker_rooms',
        Key: {
            "room_id": {S: roomID}
        }
    };

    let ddbQueryVotersParams = {
        TableName: 'bjss.poker_voters',
        IndexName: 'RoomIndex',
        KeyConditionExpression: "room_id = :room_id",
        ExpressionAttributeValues: {
            ":room_id": {S: roomID}
        }
    };

    try {
        await ddb.updateItem(ddbUpdateParams).promise();
        const roomQueryResponse = await ddb.getItem(ddbQueryRoomParams).promise();

        const roomData = {
            "room_id": roomQueryResponse.Item.room_id.S,
            "room_owner": roomQueryResponse.Item.room_owner.S,
            "votes_revealed": roomQueryResponse.Item.votes_revealed.BOOL,
            "room_settings": JSON.parse(roomQueryResponse.Item.room_settings.S)
        };

        const votersQueryResponse = await ddb.query(ddbQueryVotersParams).promise();

        const votersData = votersQueryResponse.Items.map((voterResponseData) => {
            return {
                voter_id: voterResponseData.connection_id.S,
                voter_name: voterResponseData.voter_name.S,
                vote_placed: voterResponseData.vote_placed.BOOL
            };
        });

        const apiVotersParams = {
            ConnectionId: event.requestContext.connectionId,
            Data: Buffer.from(JSON.stringify(
                {
                    "action": "votersupdated",
                    "data": {
                        "us": event.requestContext.connectionId,
                        "voters": votersData
                    }
                }
            ))
        };

        const apiRoomParams = {
            ConnectionId: event.requestContext.connectionId,
            Data: Buffer.from(JSON.stringify(
                {
                    "action": "roomsettingschanged",
                    "data": roomData
                }
            ))
        };

        const roomAPIResponse = api.postToConnection(apiRoomParams).promise();
        const votersAPIResponse = api.postToConnection(apiVotersParams).promise();
        let promises = [roomAPIResponse, votersAPIResponse];

        for (const idx in votersData) {
            const voter = votersData[idx];

            const params = {
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

            promises.push(
                api.postToConnection(params).promise()
            );
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
