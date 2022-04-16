resource "aws_iam_role_policy_attachment" "vote_poker_lambda_connections_api" {
  role       = aws_iam_role.vote_poker_lambdas.id
  policy_arn = aws_iam_policy.vote_poker_lambda_access_to_connections_api.arn
}
