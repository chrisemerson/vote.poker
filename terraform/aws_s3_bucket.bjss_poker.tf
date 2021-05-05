resource "aws_s3_bucket" "bjss_poker" {
  bucket = var.domain_name

  acl = "private"

  tags = {
    project = "bjss.poker"
  }
}