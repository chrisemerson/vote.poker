resource "aws_dynamodb_table" "vote_poker_rooms" {
  name = var.rooms_table_name

  billing_mode   = "PROVISIONED"
  read_capacity  = 10
  write_capacity = 10

  hash_key = "room_id"

  attribute {
    name = "room_id"
    type = "S"
  }

  tags = var.global_tags
}
