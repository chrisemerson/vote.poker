resource "aws_lambda_function" "bjss_poker_connect" {
  function_name = "bjss_poker_connect"

  runtime = "nodejs14.x"
  handler = "index.js"

  role = ""
}