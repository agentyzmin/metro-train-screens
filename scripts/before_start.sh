#!/bin/bash
# This file need to be executed as root

ifconfig wlan0 up && dhclient wlan0 && sleep 15

bash /home/a3/a3-metro-train/scripts/send_stats.sh
bash /home/a3/a3-metro-train/scripts/update.sh

ifconfig wlan0 down
