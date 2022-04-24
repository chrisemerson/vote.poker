resource "aws_s3_bucket" "vote_poker" {
  bucket = var.domain_name

  tags = var.global_tags
}
