provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

provider "aws" {
  alias = "useast1"

  region  = "us-east-1"
  profile = var.aws_profile
}

terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.11, < 5"
    }

    archive = {
      source  = "hashicorp/external"
      version = ">= 2.2, < 3"
    }
  }

  backend "s3" {
    profile = "vote.poker"
    region  = "eu-west-1"
    bucket  = "devops.vote.poker"
    key     = "terraform/terraform.tfstate"
  }
}
