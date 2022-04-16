resource "aws_apigatewayv2_domain_name" "api_vote_poker" {
  domain_name = "${var.api_sub_domain}.${aws_route53_zone.vote_poker.name}"

  domain_name_configuration {
    certificate_arn = aws_acm_certificate.api_vote_poker.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }

  depends_on = [
    aws_acm_certificate_validation.api_vote_poker
  ]

  tags = var.global_tags
}
