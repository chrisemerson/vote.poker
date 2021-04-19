resource "aws_lambda_function" "bjss_poker_connect" {
  function_name = "bjss_poker_connect"

  runtime = "nodejs14.x"
  handler = "index.js"

  role = aws_iam_role.lambda_connect.arn

  publish = true

  filename         = "../lambda/_build/connect.zip"
  source_code_hash = data.archive_file.connect_lambda.output_base64sha256
}