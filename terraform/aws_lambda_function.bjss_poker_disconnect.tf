resource "aws_lambda_function" "bjss_poker_disconnect" {
  function_name = "bjss_poker_disconnect"

  runtime = "nodejs14.x"
  handler = "index.js"

  role = aws_iam_role.bjss_poker_lambdas.arn

  publish = true

  filename         = data.archive_file.lambdas["disconnect"].output_path
  source_code_hash = data.archive_file.lambdas["disconnect"].output_base64sha256
}