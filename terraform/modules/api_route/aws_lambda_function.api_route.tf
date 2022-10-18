resource "aws_lambda_function" "api_route" {
  function_name = "${var.function_name_prefix}${var.lambda_function_name}"

  runtime = "nodejs14.x"
  handler = "index.handler"

  memory_size = 256

  role = var.lambda_role.arn

  publish = true

  filename         = data.external.archive_api_route.result.output_path
  source_code_hash = data.external.archive_api_route.result.output_hash

  environment {
    variables = {
      API_GATEWAY_MANAGEMENT_ENDPOINT = "${var.api_gateway.id}.execute-api.${var.aws_region}.amazonaws.com/prod"
    }
  }

  tags = var.global_tags
}
