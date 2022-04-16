data "aws_iam_policy_document" "vote_poker_lambda_access_to_connections_api" {
  statement {
    effect = "Allow"

    actions = [
      "execute-api:Invoke",
      "execute-api:ManageConnections"
    ]

    resources = [
      "${aws_apigatewayv2_api.vote_poker.execution_arn}/${aws_apigatewayv2_stage.vote_poker_prod.name}/GET/@connections/*",
      "${aws_apigatewayv2_api.vote_poker.execution_arn}/${aws_apigatewayv2_stage.vote_poker_prod.name}/POST/@connections/*",
      "${aws_apigatewayv2_api.vote_poker.execution_arn}/${aws_apigatewayv2_stage.vote_poker_prod.name}/DELETE/@connections/*"
    ]
  }
}
