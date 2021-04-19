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
  default     = "bjss.poker"
}

variable "publish_lambdas" {
  type        = bool
  description = "Set to true to publish new Lambda functions from S3 bucket"
  default     = false
}
