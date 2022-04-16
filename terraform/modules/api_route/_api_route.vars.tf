variable "aws_region" {
  type        = string
  description = "The AWS region to use"
}

variable "route_key" {
  type        = string
  description = "Name of the route to add"
}

variable "lambda_function_name" {
  type        = string
  description = "Name of the lambda function within the lambda/ folder of this project to associate with the route"
}

variable "lambda_role" {
  description = "Role to use for the Lambda function"
}

variable "api_gateway" {
  description = "API Gateway to attach route to"
}

variable "global_tags" {
  type        = map(string)
  description = "Global tags to apply to all items that support tagging"
}

variable "function_name_prefix" {
  type        = string
  description = "Prefix to use for lambda functions"
}
