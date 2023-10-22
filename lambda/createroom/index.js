const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

aws.config.update({region: 'eu-west-1'});

const ddb = new aws.DynamoDB({apiVersion: '2012-08-10'});
const api = new aws.ApiGatewayManagementApi({
    endpoint: process.env.API_GATEWAY_MANAGEMENT_ENDPOINT
});

exports.handler = async (event) => {
    const roomID = uuidv4();
    const roomSettings = JSON.parse(event.body).data.settings;
    const connectionID = event.requestContext.connectionId;

    let ddbParams = {
        TableName: 'vote_poker.rooms',
        Item: {
            room_id: {S: roomID},
            room_owner: {S: connectionID },
            votes_revealed: {BOOL: false},
            room_settings: {S: JSON.stringify(roomSettings)}
        }
    };

    let apiParams = {
        ConnectionId: event.requestContext.connectionId,
        Data: Buffer.from(JSON.stringify(
            {
                "action": "roomcreated",
                "data": {
                    "room_id": roomID,
                    "room_owner": connectionID,
                    "votes_revealed": false,
                    "room_settings": roomSettings
                }
            }
        ))
    };

    try {
        let ddbResponse = ddb.putItem(ddbParams).promise();
        let apiResponse = api.postToConnection(apiParams).promise();

        return Promise.all([ddbResponse, apiResponse])
            .then(() => {
                return {
                    statusCode: 200,
                    body: JSON.stringify("Created Dynamo DB entry for new room with ID " + roomID),
                };
            })
            .catch((err) => { throw err});
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }
};
