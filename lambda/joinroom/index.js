const aws = require('aws-sdk');

aws.config.update({region: 'eu-west-1'});

const ddb = new aws.DynamoDB({apiVersion: '2012-08-10'});
const api = new aws.ApiGatewayManagementApi({
    endpoint: process.env.API_GATEWAY_MANAGEMENT_ENDPOINT
});

exports.handler = async (event) => {
    const roomID = JSON.parse(event.body).data.room_id;
    const name = JSON.parse(event.body).data.name;
    const settings = JSON.parse(event.body).data.settings;
    const connectionID = event.requestContext.connectionId;

    let ddbUpdateParams = {
        TableName: 'vote_poker.voters',
        Key: {
            "connection_id": {S: connectionID}
        },
        UpdateExpression: "SET room_id = :r, voter_name = :n, voter_settings = :s",
        ExpressionAttributeValues: {
            ":r": {S: roomID},
            ":n": {S: name},
            ":s": {S: JSON.stringify(settings)}
        }
    };

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

        if (!roomQueryResponse.Item?.room_id?.S) {
            const params = {
                ConnectionId: connectionID,
                Data: Buffer.from(JSON.stringify(
                    {
                        "action": "roomdoesntexist",
                        "data": {
                            "room_id": roomID
                        }
                    }
                ))
            };

            return api.postToConnection(params).promise()
                .then(() => {
                    return {
                        statusCode: 200,
                        body: JSON.stringify("Voter " + connectionID + " tried to join non-existing room " + roomID),
                    };
                })
                .catch((err) => {
                    console.log("Error!" + err);
                    throw err
                });
        } else {
            const roomData = {
                "room_id": roomQueryResponse.Item.room_id.S,
                "room_owner": roomQueryResponse.Item.room_owner.S,
                "votes_revealed": roomQueryResponse.Item.votes_revealed.BOOL,
                "room_settings": JSON.parse(roomQueryResponse.Item.room_settings.S)
            };

            await ddb.updateItem(ddbUpdateParams).promise();

            const votersQueryResponse = await ddb.query(ddbQueryVotersParams).promise();

            const votersData = votersQueryResponse.Items.map((voterResponseData) => {
                let voterData = {
                    voter_id: voterResponseData.connection_id.S,
                    voter_name: voterResponseData.voter_name.S,
                    vote_placed: voterResponseData.vote_placed.BOOL,
                    settings: JSON.parse(voterResponseData.voter_settings.S)
                };

                if (roomQueryResponse.Item.votes_revealed.BOOL) {
                    voterData.vote = voterResponseData.vote.S;
                }

                return voterData;
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
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify("Error!" + err),
        };
    }
};
