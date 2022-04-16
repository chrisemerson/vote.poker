variable "aws_region" {
  type        = string
  description = "The AWS region to use"
  default     = "eu-west-1"
}

variable "aws_profile" {
  type        = string
  description = "Profile to use from the shared AWS credentials file"
  default     = ""
}

variable "domain_name" {
  type        = string
  description = "Domain name to use for the application"
  default     = "vote.poker"
}

variable "api_sub_domain" {
  type        = string
  description = "Subdomain to use for the API"
  default     = "api"
}

variable "dns_ttl" {
  type        = number
  description = "TTL to use for DNS entries"
  default     = 10 * 60 // 10 minutes
}

variable "voters_table_name" {
  type        = string
  description = "Name of the dynamo DB table for storing voter information"
  default     = "vote_poker.voters"
}

variable "rooms_table_name" {
  type        = string
  description = "Name of the dynamo DB table for storing room information"
  default     = "vote_poker.rooms"
}

variable "global_tags" {
  type        = map(string)
  description = "Global tags to apply to all items that support tagging"

  default = {
    project = "vote.poker"
  }
}
