resource "aws_apigatewayv2_api" "bjss_poker" {
  name          = "bjss.poker"
  protocol_type = "WEBSOCKET"

  route_selection_expression   = "$request.body.action"
  api_key_selection_expression = "$request.header.x-api-key"
}