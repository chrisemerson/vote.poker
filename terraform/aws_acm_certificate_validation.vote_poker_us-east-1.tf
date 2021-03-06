resource "aws_acm_certificate_validation" "vote_poker_us-east-1" {
  provider = aws.useast1

  certificate_arn         = aws_acm_certificate.vote_poker_us-east-1.arn
  validation_record_fqdns = [for record in aws_route53_record.vote_poker_acm_validation : record.fqdn]
}
