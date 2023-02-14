#!/bin/bash
# printenv
if [[ $DB_DEPLOYMENT_TYPE == "docker" && $DB_TYPE == "yugabyte" ]]; 
then
    until psql -h host.docker.internal -p 5433 -U yugabyte -c 'show server_version' ; do sleep 1 ; done 2>/dev/null
    until schemaInitialized=$(psql -h host.docker.internal -p 5433 -U yugabyte -t -c  "select count(schema_name) FROM information_schema.schemata WHERE schema_name = 'social'"); echo 'checking for schema' ; do sleep 1 ; done 2>/dev/null
    echo $schemaInitialized
    if [[ $schemaInitialized == "0" ]];
    then
        psql -h host.docker.internal -p 5433 -U yugabyte -a -f ./schema/postgres.sql 
        psql -h host.docker.internal -p 5433 -U yugabyte -a -f ./data/users.sql
        psql -h host.docker.internal -p 5433 -U yugabyte -a -f ./data/posts.sql
        psql -h host.docker.internal -p 5433 -U yugabyte -a -f ./data/comments.sql
        psql -h host.docker.internal -p 5433 -U yugabyte -a -f ./data/likes.sql
        psql -h host.docker.internal -p 5433 -U yugabyte -a -f ./data/relationships.sql
        psql -h host.docker.internal -p 5433 -U yugabyte -a -f ./data/stories.sql
    fi
fi

# if [[ $DB_DEPLOYMENT_TYPE == "docker" && $DB_TYPE == "mysql" ]]; 
# then
#     echo "We're inside of the if block for mysql local"
#     # while ! mysqladmin ping -h"$DB_HOST" --silent; do
#     #     sleep 1
#     # done
# fi

npm start
