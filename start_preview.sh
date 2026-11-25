#!/bin/bash
# Script to preview SPS Endocrine Hospital website locally in Brave Browser

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "=========================================================="
echo "  SPS DIABETES, THYROID & ENDOCRINE HOSPITAL WEBSITE"
echo "  Location: $DIR"
echo "=========================================================="

# Check if Brave Browser is installed
if [ -d "/Applications/Brave Browser.app" ]; then
    echo "Opening website in Brave Browser..."
    open -a "/Applications/Brave Browser.app" "$DIR/index.html"
else
    echo "Opening website in default browser..."
    open "$DIR/index.html"
fi

echo "Website opened successfully!"
