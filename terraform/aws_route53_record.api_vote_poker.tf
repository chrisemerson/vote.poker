resource "aws_route53_record" "api_vote_poker" {
  name    = var.api_sub_domain
  type    = "A"
  zone_id = aws_route53_zone.vote_poker.id

  alias {
    name                   = aws_apigatewayv2_domain_name.api_vote_poker.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.api_vote_poker.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}
