resource "aws_apigatewayv2_domain_name" "api_bjss_poker" {
  domain_name = "${var.api_sub_domain}.${aws_route53_zone.bjss_poker.name}"

  domain_name_configuration {
    certificate_arn = aws_acm_certificate.api_bjss_poker.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }

  depends_on = [
    aws_acm_certificate_validation.api_bjss_poker
  ]

  tags = {
    project = "bjss.poker"
  }
}
