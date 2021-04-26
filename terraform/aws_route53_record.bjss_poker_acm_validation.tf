resource "aws_route53_record" "bjss_poker_acm_validation" {
  for_each = {
    for dvo in aws_acm_certificate.bjss_poker.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true

  name    = each.value.name
  records = [each.value.record]
  ttl     = 60 * 10
  type    = each.value.type
  zone_id = aws_route53_zone.bjss_poker.zone_id
}