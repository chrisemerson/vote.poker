const aws = require('aws-sdk');

aws.config.update({region: 'eu-west-1'});

const ddb = new aws.DynamoDB({apiVersion: '2012-08-10'});
const api = new aws.ApiGatewayManagementApi({
    endpoint: process.env.API_GATEWAY_MANAGEMENT_ENDPOINT
});

exports.handler = async (event) => {
    const roomID = JSON.parse(event.body).data.room_id;
    const connectionID = event.requestContext.connectionId;

    let ddbUpdateParams = {
        TableName: 'bjss.poker_voters',
        Key: {
            "connection_id": {S: connectionID}
        },
        UpdateExpression: "SET room_id = :r",
        ExpressionAttributeValues: {
            ":r": {S: roomID}
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
        let roomQueryResponse = await ddb.getItem(ddbQueryRoomParams).promise();

        const roomData = {
            "room_id": roomQueryResponse.Item.room_id.S,
            "room_settings": JSON.parse(roomQueryResponse.Item.room_settings.S)
        };

        let votersQueryResponse = await ddb.query(ddbQueryVotersParams).promise();

        const votersData = votersQueryResponse.Items.map((voterResponseData) => {
            return {
                voter_id: voterResponseData.connection_id.S,
                voter_data: JSON.parse(voterResponseData.voter_data.S)
            };
        });

        let apiVotersParams = {
            ConnectionId: event.requestContext.connectionId,
            Data: Buffer.from(JSON.stringify(
                {
                    "action": "votersupdated",
                    "data": votersData
                }
            ))
        };

        let apiRoomParams = {
            ConnectionId: event.requestContext.connectionId,
            Data: Buffer.from(JSON.stringify(
                {
                    "action": "roomsettingschanged",
                    "data": roomData
                }
            ))
        };

        let votersAPIResponse = api.postToConnection(apiVotersParams).promise();
        let roomAPIResponse = api.postToConnection(apiRoomParams).promise();

        return Promise.all([votersAPIResponse, roomAPIResponse])
            .then(() => {
                return {
                    statusCode: 200,
                    body: JSON.stringify("Voter " + connectionID + " has joined room " + roomID),
                };
            })
            .catch((err) => { throw err });
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }
};
