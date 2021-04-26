resource "aws_s3_bucket_policy" "bjss_poker" {
  bucket = aws_s3_bucket.bjss_poker.bucket
  policy = data.aws_iam_policy_document.bjss_poker_s3_bucket.json
}