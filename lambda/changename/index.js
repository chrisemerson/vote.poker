const aws = require('aws-sdk');

aws.config.update({region: 'eu-west-1'});

const ddb = new aws.DynamoDB({apiVersion: '2012-08-10'});
const api = new aws.ApiGatewayManagementApi({
    endpoint: process.env.API_GATEWAY_MANAGEMENT_ENDPOINT
});

exports.handler = async (event) => {
    const name = JSON.parse(event.body).data;
    const connectionID = event.requestContext.connectionId;

    let ddbUpdateParams = {
        TableName: 'vote_poker.voters',
        Key: {
            connection_id: {S: connectionID}
        },
        UpdateExpression: "SET voter_name = :n",
        ExpressionAttributeValues: {
            ":n": {S: name}
        }
    };

    let ddbQueryVoterParams = {
        TableName: 'vote_poker.voters',
        Key: {
            connection_id: {S: connectionID}
        }
    }

    try {
        await ddb.updateItem(ddbUpdateParams).promise();
        const voterQueryResponse = await ddb.getItem(ddbQueryVoterParams).promise();

        const roomID = voterQueryResponse.Item.room_id.S;

        let ddbQueryRoomParams = {
            TableName: 'vote_poker.rooms',
            Key: {
                room_id: {S: roomID}
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

        const roomQueryResponse = await ddb.getItem(ddbQueryRoomParams).promise();
        const votersQueryResponse = await ddb.query(ddbQueryVotersParams).promise();

        const votersData = votersQueryResponse.Items.map((voterResponseData) => {
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
