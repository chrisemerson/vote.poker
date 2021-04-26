resource "aws_acm_certificate_validation" "bjss_poker" {
  certificate_arn         = aws_acm_certificate.bjss_poker.arn
  validation_record_fqdns = [for record in aws_route53_record.bjss_poker_acm_validation : record.fqdn]
}