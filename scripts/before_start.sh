#!/bin/bash
# This file need to be executed as root

yellow=`tput setaf 3`
reset=`tput sgr0`

echo "${yellow}[BEFORE START][INFO]${reset} Device IP: $(ifconfig wlan0 | grep -oP 'inet addr:\K\S+')."
bash /home/a3/a3-metro-train/scripts/send_stats.sh
bash /home/a3/a3-metro-train/scripts/update.sh

ifconfig wlan0 down
