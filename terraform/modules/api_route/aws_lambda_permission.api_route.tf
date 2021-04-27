resource "aws_lambda_permission" "api_route" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api_route.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${var.api_gateway.execution_arn}/*/${var.route_key}"
}
