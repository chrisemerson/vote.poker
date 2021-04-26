resource "aws_route53_record" "bjss_poker" {
  name    = ""
  type    = "A"
  zone_id = aws_route53_zone.bjss_poker.id

  alias {
    name    = aws_cloudfront_distribution.bjss_poker.domain_name
    zone_id = aws_cloudfront_distribution.bjss_poker.hosted_zone_id

    evaluate_target_health = false
  }
}