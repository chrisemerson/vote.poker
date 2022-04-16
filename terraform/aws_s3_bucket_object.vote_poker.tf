resource "aws_s3_bucket_object" "vote_poker" {
  for_each = fileset("${path.root}/../frontend/public/", "**")

  bucket = aws_s3_bucket.vote_poker.id

  key    = each.value
  source = "${path.root}/../frontend/public/${each.value}"

  etag         = filemd5("${path.root}/../frontend/public/${each.value}")
  content_type = lookup(local.mime_types, regex("\\.[^.]+$", each.value), null)

  tags = var.global_tags
}
