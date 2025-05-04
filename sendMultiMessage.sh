#!/bin/bash

name="chinni palli shiva shankar reddy"
myFile=./producer.js
consumerFile=./consumer.js

# Check file exists only once — no loop needed
if [ -f "$myFile" ]; then
  # Convert string to array
  IFS=' ' read -r -a names_array <<< "$name"

  # Build JSON array from shell array
  message_json=$(printf '"%s",' "${names_array[@]}" | sed 's/,$//')
  message_json="[$message_json]"

  # Pass the JSON array to the Node.js script
  node "$myFile" "$message_json"

  # Run consumer
  node "$consumerFile"
else
  echo "File does not exist."
fi
