const aws = require('aws-sdk');

aws.config.update({region: 'eu-west-1'});

const ddb = new aws.DynamoDB({apiVersion: '2012-08-10'});
const api = new aws.ApiGatewayManagementApi({
    endpoint: process.env.API_GATEWAY_MANAGEMENT_ENDPOINT
});

exports.handler = async (event) => {
    let params = {
        TableName: 'vote_poker.voters',
        Key: {
            connection_id: {S: event.requestContext.connectionId}
        }
    };

    try {
        console.log("Querying voters table for the disconnecting voter");
        let voterResponse = await ddb.getItem(params).promise();

        console.log("Response: ", voterResponse);

        const roomID = voterResponse.Item.room_id.S;

        console.log("Room ID is: " + roomID);

        console.log("Deleting user from voters table...");
        let promises = [ddb.deleteItem(params).promise()];

        let ddbQueryVotersParams = {
            TableName: 'vote_poker.voters',
            IndexName: 'RoomIndex',
            KeyConditionExpression: "room_id = :room_id",
            ExpressionAttributeValues: {
                ":room_id": {S: roomID}
            }
        };

        let ddbQueryRoomParams = {
            TableName: 'vote_poker.rooms',
            Key: {
                room_id: {S: roomID}
            }
        };

        console.log("Querying the voters table for any other voters in the room");
        const votersQueryResponse = await ddb.query(ddbQueryVotersParams).promise();

        console.log("Response: ", votersQueryResponse);

        console.log("Querying the rooms table for the current room");
        const roomQueryResponse = await ddb.getItem(ddbQueryRoomParams).promise();

        console.log("Response: ", roomQueryResponse);

        const votersData = votersQueryResponse.Items
            .filter((voterResponseData) => {
                return voterResponseData.connection_id.S !== event.requestContext.connectionId;
            })
            .map((voterResponseData) => {
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

        console.log("Current voters left in room: ", votersData);
        console.log("There are " + votersData.length + " voters left in the room " + roomID);

        if (roomID !== "noroom" && votersData.length === 0) {
            console.log("Deleting room " + roomID);
            promises.push(
                ddb
                    .deleteItem({
                        TableName: 'vote_poker.rooms',
                        Key: {
                            room_id: {S: roomID}
                        }
                    })
                    .promise()
            );
        } else {
            console.log("Voters still left in room, update all other users with disconnection");
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

        console.log("All done! Time for promises to resolve and return status to be set...");

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
