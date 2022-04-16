const aws = require('aws-sdk');

aws.config.update({region: 'eu-west-1'});

const ddb = new aws.DynamoDB({apiVersion: '2012-08-10'});
const api = new aws.ApiGatewayManagementApi({
    endpoint: process.env.API_GATEWAY_MANAGEMENT_ENDPOINT
});

exports.handler = async (event) => {
    const vote = JSON.parse(event.body).data;
    const connectionID = event.requestContext.connectionId;

    let vote_placed = true;

    if (vote === "") {
        vote_placed = false;
    }

    let ddbUpdateParams = {
        TableName: 'vote_poker.voters',
        Key: {
            "connection_id": {S: connectionID}
        },
        UpdateExpression: "SET vote_placed = :vp, vote = :vv",
        ExpressionAttributeValues: {
            ":vp": {BOOL: vote_placed},
            ":vv": {S: vote}
        }
    };

    let ddbQueryRoomParams = {
        TableName: 'vote_poker.voters',
        Key: {
            connection_id: {S: connectionID}
        }
    };

    try {
        await ddb.updateItem(ddbUpdateParams).promise();

        const roomQueryResponse = await ddb.getItem(ddbQueryRoomParams).promise();
        const room_id = roomQueryResponse.Item.room_id.S;

        console.log("Room ID: ", room_id);

        let ddbQueryVotersParams = {
            TableName: 'vote_poker.voters',
            IndexName: 'RoomIndex',
            KeyConditionExpression: "room_id = :room_id",
            ExpressionAttributeValues: {
                ":room_id": {S: room_id}
            }
        };

        const votersQueryResponse = await ddb.query(ddbQueryVotersParams).promise();

        const votersData = votersQueryResponse.Items.map((voterResponseData) => {
            return {
                voter_id: voterResponseData.connection_id.S,
                voter_name: voterResponseData.voter_name.S,
                vote_placed: voterResponseData.connection_id.S === connectionID ? vote_placed :  voterResponseData.vote_placed.BOOL
            };
        });

        let promises = [];

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
                    body: JSON.stringify("Voter " + connectionID + " has voted in room " + room_id),
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
