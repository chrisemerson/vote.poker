resource "aws_cloudfront_origin_access_identity" "bjss_poker" {
  comment = "access-identity-${var.domain_name}"
}