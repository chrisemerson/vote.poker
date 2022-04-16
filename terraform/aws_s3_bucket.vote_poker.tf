resource "aws_s3_bucket" "vote_poker" {
  bucket = var.domain_name

  acl = "private"

  tags = var.global_tags
}
