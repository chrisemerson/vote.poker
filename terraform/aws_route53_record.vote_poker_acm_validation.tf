resource "aws_route53_record" "vote_poker_acm_validation" {
  for_each = {
    for dvo in aws_acm_certificate.vote_poker_us-east-1.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true

  name    = each.value.name
  records = [each.value.record]
  ttl     = var.dns_ttl
  type    = each.value.type
  zone_id = aws_route53_zone.vote_poker.zone_id
}
