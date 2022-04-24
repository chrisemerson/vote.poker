resource "aws_s3_bucket_versioning" "vote_poker" {
  bucket = aws_s3_bucket.vote_poker.id

  versioning_configuration {
    status = "Disabled"
  }
}
