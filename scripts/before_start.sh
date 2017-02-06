#!/bin/bash

ifconfig wlan0 up

/bin/bash /home/a3/a3-metro-train/send_stats.sh
/bin/bash /home/a3/a3-metro-train/update.sh
/bin/bash /home/a3/a3-metro-train/detect_line.sh

ifconfig wlan0 down