resource "aws_s3_bucket_acl" "devops_vote_poker" {
  bucket = aws_s3_bucket.devops_vote_poker.id
  acl    = "private"
}
