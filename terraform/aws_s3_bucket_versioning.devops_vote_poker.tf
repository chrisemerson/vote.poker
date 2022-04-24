resource "aws_s3_bucket_versioning" "devops_vote_poker" {
  bucket = aws_s3_bucket.devops_vote_poker.id

  versioning_configuration {
    status = "Disabled"
  }
}
