resource "aws_apigatewayv2_api_mapping" "vote_poker" {
  api_id          = aws_apigatewayv2_api.vote_poker.id
  domain_name     = aws_apigatewayv2_domain_name.api_vote_poker.id
  stage           = aws_apigatewayv2_stage.vote_poker_prod.id
  api_mapping_key = ""
}
