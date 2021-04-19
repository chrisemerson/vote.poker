resource "aws_s3_bucket" "devops_bjss_poker" {
  bucket = "devops.bjss.poker"

  acl = "private"
}