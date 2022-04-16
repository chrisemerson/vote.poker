resource "aws_apigatewayv2_deployment" "vote_poker" {
  api_id = aws_apigatewayv2_api.vote_poker.id

  triggers = {
    redeployment = sha1(join(",", [for api_route in module.api_route2 : api_route.api_route_key]))
  }

  lifecycle {
    create_before_destroy = true
  }
}
