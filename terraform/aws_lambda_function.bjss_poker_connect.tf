resource "aws_lambda_function" "bjss_poker_connect" {
  function_name = "bjss_poker_connect"

  runtime = "nodejs14.x"
  handler = "index.js"

  role = aws_iam_role.lambda_connect.arn

  publish = var.publish_lambdas

  s3_bucket = aws_s3_bucket.devops_bjss_poker.bucket
  s3_key = "lambdas/connect.zip"
}