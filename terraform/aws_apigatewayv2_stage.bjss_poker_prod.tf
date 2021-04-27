resource "aws_apigatewayv2_stage" "bjss_poker_prod" {
  api_id        = aws_apigatewayv2_api.bjss_poker.id
  name          = "prod"
  deployment_id = aws_apigatewayv2_deployment.bjss_poker.id

  default_route_settings {
    data_trace_enabled = true

    throttling_burst_limit = 500
    throttling_rate_limit  = 100
  }

  access_log_settings {
    destination_arn = "arn:aws:logs:eu-west-1:121981995654:log-group:/aws/apigateway/77batah26d/prod"
    format = jsonencode({
      caller       = "$context.identity.caller"
      connectionId = "$context.connectionId"
      eventType    = "$context.eventType"
      ip           = "$context.identity.sourceIp"
      requestId    = "$context.requestId"
      requestTime  = "$context.requestTime"
      routeKey     = "$context.routeKey"
      status       = "$context.status"
      user         = "$context.identity.user"
    })
  }
}
