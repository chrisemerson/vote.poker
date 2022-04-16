resource "aws_cloudfront_distribution" "vote_poker" {
  default_root_object = "index.html"
  is_ipv6_enabled     = true
  price_class         = "PriceClass_100"

  aliases = [
    var.domain_name
  ]

  enabled = true

  origin {
    domain_name = aws_s3_bucket.vote_poker.bucket_domain_name
    origin_id   = "S3-${aws_s3_bucket.vote_poker.id}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.vote_poker.cloudfront_access_identity_path
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  default_cache_behavior {
    allowed_methods = [
      "HEAD",
      "GET"
    ]

    cached_methods = [
      "HEAD",
      "GET"
    ]

    compress = true

    forwarded_values {
      cookies {
        forward = "none"
      }

      query_string = false
    }

    target_origin_id       = "S3-${aws_s3_bucket.vote_poker.id}"
    viewer_protocol_policy = "redirect-to-https"
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.vote_poker_us-east-1.arn
    minimum_protocol_version = "TLSv1.1_2016"
    ssl_support_method       = "sni-only"
  }

  tags = var.global_tags
}
