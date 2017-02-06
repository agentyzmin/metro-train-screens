#!/bin/bash
STR=`statserial -d`
DCD=$((($STR & 0x40) != 0))
CTS=$((($STR & 0x20) != 0))

# M1
if [[ $DCD -eq 1 ]] && [[ $CTS -eq 0 ]]
then
    echo "M1" > /home/a3/a3-metro-train/BE/line.txt
fi

# M2
if [[ $DCD -eq 1 ]] && [[ $CTS -eq 1 ]]
then
    echo "M2" > /home/a3/a3-metro-train/BE/line.txt
fi

# M3
if [[ $DCD -eq 0 ]] && [[ $CTS -eq 1  ]]
then
    echo "M3" > /home/a3/a3-metro-train/BE/line.txt
fi
