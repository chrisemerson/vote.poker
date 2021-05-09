const aws = require('aws-sdk');

aws.config.update({region: 'eu-west-1'});

const ddb = new aws.DynamoDB({apiVersion: '2012-08-10'});
const api = new aws.ApiGatewayManagementApi({
    endpoint: process.env.API_GATEWAY_MANAGEMENT_ENDPOINT
});

exports.handler = async (event) => {
    let params = {
        TableName: 'bjss.poker_voters',
        Key: {
            connection_id: {S: event.requestContext.connectionId}
        }
    };

    try {
        let voterResponse = await ddb.getItem(params).promise();

        const roomID = voterResponse.Item.room_id.S;

        let promises = [ddb.deleteItem(params).promise()];

        let ddbQueryVotersParams = {
            TableName: 'bjss.poker_voters',
            IndexName: 'RoomIndex',
            KeyConditionExpression: "room_id = :room_id",
            ExpressionAttributeValues: {
                ":room_id": {S: roomID}
            }
        };

        let ddbQueryRoomParams = {
            TableName: 'bjss.poker_rooms',
            Key: {
                room_id: {S: roomID}
            }
        };

        const votersQueryResponse = await ddb.query(ddbQueryVotersParams).promise();
        const roomQueryResponse = await ddb.getItem(ddbQueryRoomParams).promise();

        const votersData = votersQueryResponse.Items
            .filter((voterResponseData) => {
                return voterResponseData.connection_id.S !== event.requestContext.connectionId;
            })
            .map((voterResponseData) => {
                let voterData = {
                    voter_id: voterResponseData.connection_id.S,
                    voter_name: voterResponseData.voter_name.S,
                    vote_placed: voterResponseData.vote_placed.BOOL
                };

                if (roomQueryResponse.Item.votes_revealed.BOOL) {
                    voterData.vote = voterResponseData.vote.S;
                }

                return voterData;
        });

        if (votersData.length === 0) {
            promises.push(
                ddb
                    .deleteItem({
                        TableName: 'bjss.poker_rooms',
                        Key: {
                            room_id: {S: roomID}
                        }
                    })
                    .promise()
            );
        } else {
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
        }

        return Promise.all(promises)
            .then(() => {
                return {
                    statusCode: 200,
                    body: JSON.stringify("Voter " + event.requestContext.connectionId + " has left room " + roomID),
                };
            })
            .catch((err) => {
                console.log("Error!" + err);
                throw err
            });
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }
};
