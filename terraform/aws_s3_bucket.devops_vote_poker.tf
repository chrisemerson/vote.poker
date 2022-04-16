resource "aws_s3_bucket" "devops_vote_poker" {
  bucket = "devops.${var.domain_name}"

  acl = "private"

  tags = var.global_tags
}
