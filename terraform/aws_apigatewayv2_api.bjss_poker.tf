resource "aws_apigatewayv2_api" "bjss_poker" {
  name          = var.domain_name
  protocol_type = "WEBSOCKET"

  route_selection_expression   = "$request.body.action"
  api_key_selection_expression = "$request.header.x-api-key"

  disable_execute_api_endpoint = false

  tags = {
    project = "bjss.poker"
  }
}