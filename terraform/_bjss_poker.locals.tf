locals {
  mime_types = jsondecode(file("${path.root}/data/mime.json"))
}
