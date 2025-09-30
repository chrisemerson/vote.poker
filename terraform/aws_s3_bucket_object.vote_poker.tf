resource "aws_s3_object" "vote_poker" {
  for_each = fileset("${path.root}/../frontend/dist/", "**")

  bucket = aws_s3_bucket.vote_poker.id

  key    = each.value
  source = "${path.root}/../frontend/dist/${each.value}"

  etag         = filemd5("${path.root}/../frontend/dist/${each.value}")
  content_type = lookup(local.mime_types, regex("\\.[^.]+$", each.value), null)

  tags = var.global_tags
}
