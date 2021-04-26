resource "aws_apigatewayv2_deployment" "bjss_poker" {
  api_id = aws_apigatewayv2_api.bjss_poker.id

  triggers = {
    redeployment = sha1(join(",", [for api_route in module.api_route : api_route.api_route_key]))
  }

  lifecycle {
    create_before_destroy = true
  }
}