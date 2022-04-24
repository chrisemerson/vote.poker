resource "aws_s3_bucket" "devops_vote_poker" {
  bucket = "devops.${var.domain_name}"

  tags = var.global_tags
}
