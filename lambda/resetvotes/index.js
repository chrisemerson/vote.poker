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
            throw "Reset votes command did not come from room owner";
        }

        let updateRoomParams = {
            TableName: 'vote_poker.rooms',
            Key: {
                "room_id": {S: roomID}
            },
            UpdateExpression: "SET votes_revealed = :vr",
            ExpressionAttributeValues: {
                ":vr": {BOOL: false}
            }
        };

        let promises = [ddb.updateItem(updateRoomParams).promise()];

        const votersQueryResponse = await ddb.query(ddbQueryVotersParams).promise();

        for (const idx in votersQueryResponse.Items) {
            const voter_id = votersQueryResponse.Items[idx].connection_id.S;

            const resetDataParams = {
                ConnectionId: voter_id,
                Data: Buffer.from(JSON.stringify(
                    {
                        "action": "votesreset"
                    }
                ))
            };

            let updateVoterParams = {
                TableName: 'vote_poker.voters',
                Key: {
                    connection_id: {S: voter_id}
                },
                UpdateExpression: "SET vote_placed = :vp, vote = :vv",
                ExpressionAttributeValues: {
                    ":vp": {BOOL: false},
                    ":vv": {S: "0"}
                }
            };

            promises.push(api.postToConnection(resetDataParams).promise());
            promises.push(ddb.updateItem(updateVoterParams).promise());
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
