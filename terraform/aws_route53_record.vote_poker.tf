resource "aws_route53_record" "vote_poker" {
  name    = ""
  type    = "A"
  zone_id = aws_route53_zone.vote_poker.id

  alias {
    name    = aws_cloudfront_distribution.vote_poker.domain_name
    zone_id = aws_cloudfront_distribution.vote_poker.hosted_zone_id

    evaluate_target_health = false
  }
}
