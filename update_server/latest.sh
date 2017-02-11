#!/bin/bash

APPDIR="/home/a3/a3-metro-train"
TEMPDIR="/tmp/metro-update"

die() {
    echo 'Error executing command, exiting'
    exit 1
}

# Check current version
# TODO

# Cleanup previous installation
rm -rf $TEMPDIR || true
mkdir -p $TEMPDIR || die

# Download latest project files and dependencies
git clone --branch release https://github.com/agentyzmin/metro-train-screens.git $TEMPDIR || die
npm i --production --prefix $TEMPDIR || die

# Update file permissions
chmod +x "${TEMPDIR}/scripts/*.sh" || die

# Replace original directory with updated files
chown -R a3:a3 $TEMPDIR "${TEMPDIR}/*" "${TEMPDIR}/.[!.]*" || die
rm -rf $APPDIR || die
mv $TEMPDIR $APPDIR || die
