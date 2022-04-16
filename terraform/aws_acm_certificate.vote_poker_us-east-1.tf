resource "aws_acm_certificate" "vote_poker_us-east-1" {
  provider = aws.useast1

  domain_name       = aws_route53_zone.vote_poker.name
  validation_method = "DNS"

  options {
    certificate_transparency_logging_preference = "ENABLED"
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = var.global_tags
}
