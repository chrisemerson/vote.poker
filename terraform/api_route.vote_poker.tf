module "api_route" {
  source = "./modules/api_route"

  for_each = local.lambda_route_mapping

  aws_region           = var.aws_region
  api_gateway          = aws_apigatewayv2_api.vote_poker
  route_key            = each.key
  lambda_function_name = each.value
  function_name_prefix = "vote_poker_"
  lambda_role          = aws_iam_role.vote_poker_lambdas
  global_tags          = var.global_tags
}
