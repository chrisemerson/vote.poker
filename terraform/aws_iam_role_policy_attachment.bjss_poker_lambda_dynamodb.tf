resource "aws_iam_role_policy_attachment" "bjss_poker_lambda_dynaomdb" {
  role       = aws_iam_role.bjss_poker_lambdas.id
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}