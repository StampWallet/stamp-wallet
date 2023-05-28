#!/bin/sh

# https://openapi-generator.tech/docs/installation
# download the jar from https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/6.3.0/openapi-generator-cli-6.3.0.jar
# script has to be run in the same directory as the openapi-generator jar

SCRIPTPATH=`realpath "$0"`
SCRIPTDIR=`dirname $SCRIPTPATH`

ls $SCRIPTDIR/../src/api/*
rm -I $SCRIPTDIR/../src/api/*
java -jar openapi-generator-cli-6.3.0.jar generate -g typescript-axios -i $SCRIPTDIR/../api/schema.yaml -c $SCRIPTDIR/../api/config.yaml --global-property client -o $SCRIPTDIR/../src/api/
