#!/bin/bash

yellow=`tput setaf 3`
reset=`tput sgr0`

echo "${yellow}[UPDATE][INFO]${reset} Acquiring update file."
curl -sL https://metro-update.veikus.com/latest.sh | bash -
echo "${yellow}[UPDATE][INFO]${reset} Update process complete."
