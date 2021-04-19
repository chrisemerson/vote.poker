data "archive_file" "lambdas" {
  type = "zip"

  for_each = toset([for l in fileset("../lambda/", "*/index.js"): dirname(l)])

  source_dir  = "../lambda/${each.value}/"
  output_path = "../build/lambdas/${each.value}.zip"
}
