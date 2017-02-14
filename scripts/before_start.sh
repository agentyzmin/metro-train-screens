#!/bin/bash
# This file need to be executed as root

ifconfig wlan0 up && sleep 15 && dhclient -1 wlan0

bash /home/a3/a3-metro-train/scripts/send_stats.sh
bash /home/a3/a3-metro-train/scripts/update.sh

ifconfig wlan0 down