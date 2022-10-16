#!/bin/bash

ARGS=$(cat -)
INPUT_PATH=$(echo $ARGS | jq -r ".input_path")
OUTPUT_PATH=$(echo $ARGS | jq -r ".output_path")

rm -f $OUTPUT_PATH

cd $INPUT_PATH
zip -rqX $OUTPUT_PATH ./*

OUTPUT_HASH=$(cat $OUTPUT_PATH | openssl sha -binary -sha256 | base64)

jq -ncM \
  '{ "output_path": $output_path, "output_hash": $output_hash }' \
  --arg output_path "$OUTPUT_PATH" \
  --arg output_hash "$OUTPUT_HASH"
