resource "aws_apigatewayv2_route" "api_route" {
  api_id    = var.api_gateway.id
  route_key = var.route_key

  target = "integrations/${aws_apigatewayv2_integration.api_route.id}"
}