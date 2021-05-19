resource "aws_lambda_function" "api_route" {
  function_name = "bjss_poker_${var.lambda_function_name}"

  runtime = "nodejs14.x"
  handler = "index.handler"

  memory_size = 256

  role = var.lambda_role.arn

  publish = true

  filename         = data.archive_file.api_route.output_path
  source_code_hash = data.archive_file.api_route.output_base64sha256

  environment {
    variables = {
      API_GATEWAY_MANAGEMENT_ENDPOINT = "${var.api_gateway.id}.execute-api.${var.aws_region}.amazonaws.com/prod"
    }
  }

  tags = {
    project = "bjss.poker"
  }
}