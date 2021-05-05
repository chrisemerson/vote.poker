resource "aws_dynamodb_table" "bjss_poker_voters" {
  name = var.voters_table_name

  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5

  hash_key = "connection_id"

  attribute {
    name = "connection_id"
    type = "S"
  }

  attribute {
    name = "room_id"
    type = "S"
  }

  global_secondary_index {
    name = "RoomIndex"

    hash_key        = "room_id"
    projection_type = "ALL"

    read_capacity  = 5
    write_capacity = 5
  }

  tags = {
    project = "bjss.poker"
  }
}
