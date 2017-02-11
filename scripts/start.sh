#!/bin/bash

sudo bash /home/a3/a3-metro-train/scripts/detect_line.sh
sudo nohup nodejs /home/a3/a3-metro-train/BE/server.js &
startx -- -nocursor
