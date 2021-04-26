data "archive_file" "lambdas" {
  type = "zip"

  for_each = toset([for l in fileset("${path.root}/../lambda/", "*/index.js") : dirname(l)])

  source_dir  = "${path.root}/../lambda/${each.value}/"
  output_path = "${path.root}/../build/lambdas/${each.value}.zip"
}
