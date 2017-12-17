#!/usr/bin/env bash
DB_IP=$(docker inspect --format '{{.NetworkSettings.Networks.jishi_jishi_net.IPAddress}}' jishi_db_1)
echo "DB=${DB_IP}"
# -Dspring.profiles.active=compose
mvn clean -e -U -B -X test -Ddb.url="jdbc:mysql://${DB_IP}/jishi"
