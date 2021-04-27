resource "aws_apigatewayv2_api_mapping" "bjss_poker" {
  api_id          = aws_apigatewayv2_api.bjss_poker.id
  domain_name     = aws_apigatewayv2_domain_name.api_bjss_poker.id
  stage           = aws_apigatewayv2_stage.bjss_poker_prod.id
  api_mapping_key = ""
}