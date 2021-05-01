data "aws_iam_policy_document" "bjss_poker_lambda_access_to_connections_api" {
  statement {
    effect = "Allow"

    actions = [
      "execute-api:Invoke",
      "execute-api:ManageConnections"
    ]

    resources = [
      "${aws_apigatewayv2_api.bjss_poker.execution_arn}/${aws_apigatewayv2_stage.bjss_poker_prod.name}/POST/@connections"
    ]
  }
}