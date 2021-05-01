module "api_route" {
  source = "./modules/api_route"

  for_each = local.lambda_route_mapping

  aws_region           = var.aws_region
  api_gateway          = aws_apigatewayv2_api.bjss_poker
  route_key            = each.key
  lambda_function_name = each.value
  lambda_role          = aws_iam_role.bjss_poker_lambdas
}
