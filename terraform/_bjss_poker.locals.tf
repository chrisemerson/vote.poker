locals {
  mime_types = jsondecode(file("${path.root}/data/mime.json"))

  lambda_route_mapping = {
    "$connect"    = "connect"
    "$disconnect" = "disconnect"
  }
}