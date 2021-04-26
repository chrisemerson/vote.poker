resource "aws_s3_bucket" "devops_bjss_poker" {
  bucket = "devops.${var.domain_name}"

  acl = "private"
}