resource "aws_acm_certificate" "bjss_poker" {
  domain_name       = aws_route53_zone.bjss_poker.name
  validation_method = "DNS"

  subject_alternative_names = [
    "api.${aws_route53_zone.bjss_poker.name}"
  ]

  options {
    certificate_transparency_logging_preference = "ENABLED"
  }

  lifecycle {
    create_before_destroy = true
  }
}