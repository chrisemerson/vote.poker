resource "aws_s3_bucket_policy" "vote_poker" {
  bucket = aws_s3_bucket.vote_poker.bucket
  policy = data.aws_iam_policy_document.vote_poker_s3_bucket.json
}
