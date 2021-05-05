resource "aws_acm_certificate" "bjss_poker_us-east-1" {
  provider = aws.useast1

  domain_name       = aws_route53_zone.bjss_poker.name
  validation_method = "DNS"

  options {
    certificate_transparency_logging_preference = "ENABLED"
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    project = "bjss.poker"
  }
}