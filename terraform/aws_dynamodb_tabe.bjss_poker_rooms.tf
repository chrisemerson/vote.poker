resource "aws_dynamodb_table" "bjss_poker_rooms" {
  name = var.rooms_table_name

  billing_mode   = "PROVISIONED"
  read_capacity  = 10
  write_capacity = 10

  hash_key = "room_id"

  attribute {
    name = "room_id"
    type = "S"
  }
}
