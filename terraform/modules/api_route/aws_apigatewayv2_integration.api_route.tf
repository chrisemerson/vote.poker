resource "aws_apigatewayv2_integration" "api_route" {
  api_id           = var.api_gateway.id
  integration_type = "AWS"

  connection_type           = "INTERNET"
  content_handling_strategy = "CONVERT_TO_TEXT"
  integration_method        = "POST"
  integration_uri           = aws_lambda_function.api_route.invoke_arn
  passthrough_behavior      = "WHEN_NO_MATCH"
}