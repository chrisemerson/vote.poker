data "aws_iam_policy_document" "vote_poker_s3_bucket" {
  statement {
    effect = "Allow"

    principals {
      identifiers = [
        aws_cloudfront_origin_access_identity.vote_poker.iam_arn
      ]

      type = "AWS"
    }

    actions = [
      "s3:GetObject"
    ]

    resources = [
      "${aws_s3_bucket.vote_poker.arn}/*"
    ]
  }
}
