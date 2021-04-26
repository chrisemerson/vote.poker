resource "aws_s3_bucket_object" "bjss_poker" {
  for_each = fileset("../frontend/public/", "**")

  bucket = aws_s3_bucket.bjss_poker.id
  key    = each.value
  source = "../frontend/public/${each.value}"
  etag   = filemd5("../frontend/public/${each.value}")
}