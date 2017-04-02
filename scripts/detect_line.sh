#!/bin/bash

red=`tput setaf 1`
green=`tput setaf 2`
yellow=`tput setaf 3`
reset=`tput sgr0`

echo "${yellow}[DETECT LINE][INFO]${reset} Detecting line."

STR=`statserial -d`
DCD=$((($STR & 0x40) != 0))
CTS=$((($STR & 0x20) != 0))

# M1
if [[ $DCD -eq 1 ]] && [[ $CTS -eq 0 ]]
then
    echo "M1" > /home/a3/.a3/metro-line.txt
    echo "${green}[DETECT LINE][OK]${reset} M1 detected."
    exit 1
fi

# M2
if [[ $DCD -eq 1 ]] && [[ $CTS -eq 1 ]]
then
    echo "M2" > /home/a3/.a3/metro-line.txt
    echo "${green}[DETECT LINE][OK]${reset} M2 detected."
    exit 1
fi

# M3
if [[ $DCD -eq 0 ]] && [[ $CTS -eq 1  ]]
then
    echo "M3" > /home/a3/.a3/metro-line.txt
    echo "${green}[DETECT LINE][OK]${reset} M3 detected."
    exit 1
fi

echo "${red}[DETECT LINE][ERROR]${reset} No line detected."