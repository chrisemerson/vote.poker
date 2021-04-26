resource "aws_apigatewayv2_domain_name" "api_bjss_poker" {
  domain_name = "api.bjss.poker"

  domain_name_configuration {
    certificate_arn = aws_acm_certificate.bjss_poker.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }

  depends_on = [
    aws_acm_certificate_validation.bjss_poker
  ]
}