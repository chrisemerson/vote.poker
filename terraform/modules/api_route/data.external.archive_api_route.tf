data "external" "archive_api_route" {
  program = ["sh", "${path.module}/archive.sh"]

  query = {
    input_path  = "${abspath(path.root)}/../lambda/${var.lambda_function_name}/"
    output_path = "${abspath(path.root)}/../build/lambdas/${var.lambda_function_name}.zip"
  }
}
