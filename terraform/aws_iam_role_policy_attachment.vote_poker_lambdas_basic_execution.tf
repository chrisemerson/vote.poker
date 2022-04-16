resource "aws_iam_role_policy_attachment" "vote_poker_lambdas_basic_execution" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.vote_poker_lambdas.id
}
