data "aws_iam_policy_document" "lambda_assume_role_policy" {
  statement {
    effect = "Allow"

    principals {
      identifiers = [
        "lambda.amazonaws.com"
      ]

      type = "Service"
    }

    actions = [
      "sts:AssumeRole"
    ]
  }
}
