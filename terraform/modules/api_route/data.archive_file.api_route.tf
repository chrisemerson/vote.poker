data "archive_file" "api_route" {
  type = "zip"

  source_dir  = "${path.root}/../lambda/${var.lambda_function_name}/"
  output_path = "${path.root}/../build/lambdas/${var.lambda_function_name}.zip"
}
