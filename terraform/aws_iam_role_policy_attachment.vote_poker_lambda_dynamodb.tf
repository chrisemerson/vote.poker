resource "aws_iam_role_policy_attachment" "vote_poker_lambda_dynaomdb" {
  role       = aws_iam_role.vote_poker_lambdas.id
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}
