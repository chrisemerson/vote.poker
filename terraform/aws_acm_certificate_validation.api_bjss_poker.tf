resource "aws_acm_certificate_validation" "api_bjss_poker" {
  certificate_arn         = aws_acm_certificate.api_bjss_poker.arn
  validation_record_fqdns = [for record in aws_route53_record.api_bjss_poker_acm_validation : record.fqdn]
}