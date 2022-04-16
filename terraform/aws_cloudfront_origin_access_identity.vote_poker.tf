resource "aws_cloudfront_origin_access_identity" "vote_poker" {
  comment = "access-identity-${var.domain_name}"
}
