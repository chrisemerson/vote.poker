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
  required_version = ">= 0.15"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.37.0, < 4.0.0"
    }

    archive = {
      source  = "hashicorp/archive"
      version = ">= 2.1.0, < 3.0.0"
    }
  }

  backend "s3" {
    profile = "cemerson"
    region  = "eu-west-1"
    bucket  = "devops.bjss.poker"
    key     = "terraform/terraform.tfstate"
  }
}
