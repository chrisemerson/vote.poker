resource "aws_dynamodb_table" "bjss_poker_voters" {
  name = var.voters_table_name

  billing_mode   = "PROVISIONED"
  read_capacity  = 10
  write_capacity = 10

  hash_key = "voter_id"

  attribute {
    name = "voter_id"
    type = "S"
  }
}
