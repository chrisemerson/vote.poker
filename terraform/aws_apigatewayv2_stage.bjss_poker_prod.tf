resource "aws_apigatewayv2_stage" "bjss_poker_prod" {
  api_id        = aws_apigatewayv2_api.bjss_poker.id
  name          = "prod"
  deployment_id = aws_apigatewayv2_deployment.bjss_poker.id
}