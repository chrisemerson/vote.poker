resource "aws_iam_role" "vote_poker_lambdas" {
  name               = "Lambda-Execution-VotePoker"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json
  path               = "/service-role/"

  tags = var.global_tags
}
