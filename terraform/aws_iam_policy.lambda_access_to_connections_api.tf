resource "aws_iam_policy" "bjss_poker_lambda_access_to_connections_api" {
  name   = "BJSSPokerLambdaCallConnectionsAPIPolicy"
  policy = data.aws_iam_policy_document.bjss_poker_lambda_access_to_connections_api.json
}