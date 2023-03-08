#!/bin/bash

#!/bin/bash

echo "Running healthcheck script..."

# Get current hour in 24-hour format
hour=$(date +%H)

# Check if hour is between 6am and 8pm
if [ $hour -ge 6 ] && [ $hour -lt 20 ]; then
  # Ping the URL and redirect output to /dev/null to suppress output
  if ping -c 1 https://linky-backend.onrender.com >/dev/null; then
    echo "URL successfully pinged."
  fi
fi


# Run the file with: chmod +x healthcheck.sh
# Stop running file: pkill -f healthcheck.sh

