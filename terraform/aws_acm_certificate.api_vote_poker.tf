resource "aws_acm_certificate" "api_vote_poker" {
  domain_name       = "${var.api_sub_domain}.${aws_route53_zone.vote_poker.name}"
  validation_method = "DNS"

  options {
    certificate_transparency_logging_preference = "ENABLED"
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = var.global_tags
}
