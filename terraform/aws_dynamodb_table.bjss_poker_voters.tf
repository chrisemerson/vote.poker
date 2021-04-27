resource "aws_dynamodb_table" "bjss_poker_voters" {
  name = var.voters_table_name

  billing_mode   = "PROVISIONED"
  read_capacity  = 10
  write_capacity = 10

  hash_key = "connection_id"

  attribute {
    name = "connection_id"
    type = "S"
  }
}
