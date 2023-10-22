locals {
  mime_types = jsondecode(file("${path.root}/data/mime.json"))

  lambda_route_mapping = {
    "$connect"           = "connect"
    "$disconnect"        = "disconnect"
    "$default"           = "default"
    "changename"         = "changename"
    "changeroomsettings" = "changeroomsettings"
    "createroom"         = "createroom"
    "getroominfo"        = "getroominfo"
    "joinroom"           = "joinroom"
    "ping"               = "ping"
    "placevote"          = "placevote"
    "resetvotes"         = "resetvotes"
    "revealvotes"        = "revealvotes"
  }
}
