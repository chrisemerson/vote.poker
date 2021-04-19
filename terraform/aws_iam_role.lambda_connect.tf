resource "aws_iam_role" "lambda_connect" {
  name               = "Lambda-Execution-BJSSPoker-Connect"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json
  path               = "/service-role/"
}