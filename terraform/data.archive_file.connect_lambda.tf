data "archive_file" "connect_lambda" {
  type = "zip"

  source_dir  = "../lambda/connect/"
  output_path = "../lambda/_build/connect.zip"
}
