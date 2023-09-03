#!/bin/bash
set -x

ARGS=$(cat -)
INPUT_PATH=$(echo "$ARGS" | jq -r ".input_path")
OUTPUT_PATH=$(echo "$ARGS" | jq -r ".output_path")

rm -f "$OUTPUT_PATH"

cd "$INPUT_PATH" || exit

zip -rqX "$OUTPUT_PATH" ./*

OUTPUT_HASH=$(cat "$OUTPUT_PATH" | openssl sha256 -binary | base64)

jq -ncM \
  '{ "output_path": $output_path, "output_hash": $output_hash }' \
  --arg output_path "$OUTPUT_PATH" \
  --arg output_hash "$OUTPUT_HASH"
