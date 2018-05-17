#!/usr/bin/bash
#
##############################################################################
### NZBGET POST-PROCESSING SCRIPT                                          ###

# Convert AAC audio

# NOTE: This script requires node.js to be installed on your system.

### NZBGET POST-PROCESSING SCRIPT                                          ###
##############################################################################
echo "starting node script on dir $NZBPP_DIRECTORY"
node $NZBOP_SCRIPTDIR/node-command-crawler/app.js $NZBPP_DIRECTORY
echo 'node script successfully executed. Exiting'
exit 93