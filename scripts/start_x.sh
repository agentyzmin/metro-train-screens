#!/bin/sh
# This file will be executed by .xinitrc after X has started

chromium-browser \
    --disable \
    --disable-translate \
    --disable-infobars \
    --disable-suggestions-service \
    --disable-save-password-bubble \
    --start-maximized \
    --incognito \
    --kiosk "http://localhost:7777/"
