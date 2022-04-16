# vote.poker Planning Poker

## Frontend

The front end, contained in `frontend/` is a Svelte JS app that is hosted on S3 via Cloudfront. You can use the
following commands to aid development:

`$ npm install` - install dependencies

`$ npm run dev` - run a develpoment server at `http://localhost:5000`

`$ npm run build` - build the application for production

## Lambdas

The lambda functions are contained in `lambdas/`, each being handled by the index.js file and handler function within
each lambda directory. These are then mapped to websocket API actions via the `lambda_route_mapping` local in the
`terraform/_vote_poker.locals.tf` file.

## Terraform

All contained within `terraform/`. Terraform is also used to handle deployments, reading code from the `lambdas/` and
`frontend/public/` directories and uploading them to AWS Lambda and AWS S3 respectively.
