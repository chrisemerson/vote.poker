locals {
  mime_types = jsondecode(file("${path.root}/data/mime.json"))

  lambda_route_mapping = {
    "$connect"           = "connect"
    "$disconnect"        = "disconnect"
    "$default"           = "default"
    "changeroomsettings" = "changeroomsettings"
    "createroom"         = "createroom"
    "joinroom"           = "joinroom"
    "placevote"          = "placevote"
    "resetvotes"         = "resetvotes"
    "revealvotes"        = "revealvotes"
  }
}
