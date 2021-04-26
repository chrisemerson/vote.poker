output "api_route_key" {
  value = join("--", [
    jsonencode(aws_apigatewayv2_integration.api_route),
    jsonencode(aws_apigatewayv2_route.api_route)
  ])
}
