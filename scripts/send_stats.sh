#!/bin/bash

FILE="/home/a3/a3-metro-train/informer.log"
SERVER="https://metro-stat.veikus.com/"
AUTH="AuthKey123"

if [ -f "$FILE" ]
then
    curl -X POST --header "X-Auth:${AUTH}" --data-binary @<(cat $FILE | gzip) $SERVER && rm -f $FILE
fi