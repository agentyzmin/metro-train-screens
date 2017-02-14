#!/bin/bash

APPDIR="/home/a3/a3-metro-train"
TEMPDIR="/tmp/metro-update"
TEMPFILE="${TEMPDIR}.zip"

die() {
    echo 'Error executing command, exiting'
    exit 1
}

# Check current version
LOCALVERSION=`cat ${APPDIR}/build.txt`;

if test $LOCALVERSION = "2017.02.12"; then
    echo "Update is not required";
    exit 1
fi

# Cleanup previous installation
rm -rf $TEMPDIR || true
rm -rf $TEMPFILE || true
mkdir -p $TEMPDIR || die

# Download latest project files and dependencies
wget https://metro-update.veikus.com/download/build_2017.02.12.zip -O $TEMPFILE || die
unzip $TEMPFILE -d $TEMPDIR || die
npm i --production --prefix $TEMPDIR || die

# Update file permissions
chmod -v +x ${TEMPDIR}/scripts/*.sh || die

# Replace original directory with updated files
chown -R a3:a3 $TEMPDIR ${TEMPDIR}/* ${TEMPDIR}/.[!.]* || die
rm -rf $APPDIR || die
mv $TEMPDIR $APPDIR || die
