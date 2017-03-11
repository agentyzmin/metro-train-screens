#!/bin/bash

red=`tput setaf 1`
green=`tput setaf 2`
yellow=`tput setaf 3`
reset=`tput sgr0`

FILE="/home/a3/a3-metro-train/informer.log"
SERVER="https://metro-stat.veikus.com/"
AUTH="AuthKey123"

if [ -f "$FILE" ]
then
    echo "${yellow}[STATS][INFO]${reset} Uploading stats."
    curl -X POST --header "X-Auth:${AUTH}" --data-binary @<(cat $FILE | gzip) $SERVER > /dev/null \
    && echo "${green}[STATS][OK]${reset} Stats file uploaded." \
    && rm -f $FILE \
    && echo "${green}[STATS][OK]${reset} Stats file removed." \
    || echo "${red}[STATS][INFO]${reset} Stats upload or clean up failed."
else
    echo "${yellow}[STATS][INFO]${reset} Stats file does not exists."
fi
