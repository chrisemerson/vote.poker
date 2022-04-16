resource "aws_iam_policy" "vote_poker_lambda_access_to_connections_api" {
  name   = "VotePokerLambdaCallConnectionsAPIPolicy"
  policy = data.aws_iam_policy_document.vote_poker_lambda_access_to_connections_api.json

  tags = var.global_tags
}