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
                        body: JSON.stringify("Voter " + connectionID + " tried to get info on non-existing room " + roomID),
                    };
                })
                .catch((err) => {
                    console.log("Error!" + err);
                    throw err
                });
        } else {
            const apiRoomParams = {
                ConnectionId: event.requestContext.connectionId,
                Data: Buffer.from(JSON.stringify(
                    {
                        "action": "roominfo",
                        "data": {
                            "room_id": roomQueryResponse.Item.room_id.S,
                            "room_owner": roomQueryResponse.Item.room_owner.S,
                            "votes_revealed": roomQueryResponse.Item.votes_revealed.BOOL,
                            "room_settings": JSON.parse(roomQueryResponse.Item.room_settings.S)
                        }
                    }
                ))
            };

            return api.postToConnection(apiRoomParams).promise()
                .then(() => {
                    return {
                        statusCode: 200,
                        body: JSON.stringify("Voter " + connectionID + " has requested info on room " + roomID),
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
