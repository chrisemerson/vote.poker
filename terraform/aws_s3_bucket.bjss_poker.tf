resource "aws_s3_bucket" "bjss_poker" {
  bucket = "bjss.poker"

  acl = "private"
}