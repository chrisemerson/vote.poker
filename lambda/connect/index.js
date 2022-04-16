const aws = require('aws-sdk');
aws.config.update({region: 'eu-west-1'});
const ddb = new aws.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = async (event) => {
    let params = {
        TableName: 'vote_poker.voters',
        Item: {
            connection_id: {S: event.requestContext.connectionId},
            room_id: {S: "noroom"},
            voter_name: {S: ""},
            vote_placed: {BOOL: false},
            vote: {S: "0"}
        }
    };

    try {
        await ddb.putItem(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify("Created Dynamo DB entry for connection ID " + event.requestContext.connectionId),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify("Error!" + err),
        };
    }
};
