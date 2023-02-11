#!/bin/bash
# printenv
if [[ $DB_DEPLOYMENT_TYPE == "docker" && $DB_TYPE == "yugabyte" ]]; 
then
    until psql -h host.docker.internal -p 5433 -U yugabyte -c 'show server_version' ; do sleep 1 ; done 2>/dev/null
    psql -h host.docker.internal -p 5433 -U yugabyte -a -f ./schema/postgres.sql
fi

# if [[ $DB_DEPLOYMENT_TYPE == "docker" && $DB_TYPE == "mysql" ]]; 
# then
#     echo "We're inside of the if block for mysql local"
#     # while ! mysqladmin ping -h"$DB_HOST" --silent; do
#     #     sleep 1
#     # done
# fi

npm start
