resource "aws_route53_zone" "vote_poker" {
  name = var.domain_name

  tags = var.global_tags
}
