resource "aws_iam_role" "bjss_poker_lambdas" {
  name               = "Lambda-Execution-BJSSPoker-Connect"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json
  path               = "/service-role/"
}