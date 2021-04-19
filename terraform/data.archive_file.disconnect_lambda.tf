data "archive_file" "disconnect_lambda" {
  type = "zip"

  source_dir  = "../lambda/disconnect/"
  output_path = "../lambda/_build/disconnect.zip"
}
