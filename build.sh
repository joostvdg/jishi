#!/usr/bin/env bash

DOWN_DEFAULT=0
DOWN="${1:-$DOWN_DEFAULT}"

MAVEN_COMMANDS_DEFAULT=""
MAVEN_COMMANDS="${2:-$MAVEN_COMMANDS_DEFAULT}"

DIND_WORKAROUND_DEFAULT=0
DIND_WORKAROUND="${3:-DIND_WORKAROUND_DEFAULT}"

DIND_HOST=$4

echo "##############"
echo "## MAVEN PACKAGE"
echo "##############"
echo "## PREPARE DOCKER ENV"
docker-compose pull
echo "## START DB"
docker-compose up -d db
#echo "## START VAULT"
#docker-compose up -d vault-dev
sleep 20
docker logs jishi_db_1
echo "## CHECK DB IP"
DB_IP=$(docker inspect --format '{{.NetworkSettings.Networks.jishi_default.IPAddress}}' jishi_db_1)
echo "# IP=${DB_IP}"
if [ $DIND_WORKAROUND -gt 0 ]
then
    docker network connect jishi_default $DIND_HOST
fi
echo "##############"
echo "##############"
echo "## RUN MAVEN PACKAGE"
sh mvnw clean package -Ddb.url=jdbc:mysql://${DB_IP}:3306/jishi -Dspring.datasource.url=jdbc:mysql://${DB_IP}:3306/jishi -Dspring.datasource.username=jishi -Dspring.datasource.password=5bZnNBnlo69xTirkGQjb ${MAVEN_COMMANDS}
echo "##############"
echo "##############"
if [ $DIND_WORKAROUND -gt 0 ]
then
    docker network disconnect jishi_default $DIND_HOST
fi
echo "## STOP DB"
if [ $DOWN -gt 0 ]
then
    docker-compose down
else
    docker-compose stop
fi
echo "##############"