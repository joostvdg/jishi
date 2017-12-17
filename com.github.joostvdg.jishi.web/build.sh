#!/usr/bin/env bash

DOWN_DEFAULT=0
DOWN="${1:-$DOWN_DEFAULT}"

MAVEN_COMMANDS_DEFAULT=""
MAVEN_COMMANDS="${2:-$MAVEN_COMMANDS_DEFAULT}"

WAIT_PERIOD_FOR_DB_DEFAULT=30
WAIT_PERIOD_FOR_DB="${3:-$WAIT_PERIOD_FOR_DB_DEFAULT}"

DIND_WORKAROUND_DEFAULT=0
DIND_WORKAROUND="${4:-$DIND_WORKAROUND_DEFAULT}"

DIND_HOST=$5

WORKSPACE_FOLDER_DEFAULT=$PWD
WORKSPACE_FOLDER="${6:-$WORKSPACE_FOLDER_DEFAULT}"

echo "##############"
echo "## MAVEN PACKAGE"
echo "##############"
echo "## WORKSPACE_FOLDER_DEFAULT=${WORKSPACE_FOLDER_DEFAULT}"
echo "## WORKSPACE_FOLDER=${WORKSPACE_FOLDER}"
echo "## PREPARE DOCKER ENV"
docker-compose pull
echo "## START DB"
docker-compose up -d db
#echo "## START VAULT"
#docker-compose up -d vault-dev
echo "## Sleeping ${WAIT_PERIOD_FOR_DB} seconds for DB to come up"
sleep ${WAIT_PERIOD_FOR_DB}
docker logs jishi_db_1
echo "## CHECK DB IP"
DB_IP=$(docker inspect --format '{{.NetworkSettings.Networks.jishi_jishi_net.IPAddress}}' jishi_db_1)
#DB_IP=jishi_db_1
echo "# IP=${DB_IP}"
if [ $DIND_WORKAROUND -gt 0 ]
then
    echo "## Connecting DIND host to network"
    docker network connect jishi_jishi_net $DIND_HOST
fi
echo "##############"
echo "##############"
echo "## RUN MAVEN PACKAGE"
## --network=container:jishi_db_1
echo
docker run -i --rm --name jish-maven-build-check maven:3-jdk-9 mvn -v
docker run -i --rm --name jish-maven-build --net=jishi_jishi_net -v /tmp/repository:/tmp/repository -v "$WORKSPACE_FOLDER":/usr/src/mymaven -w /usr/src/mymaven maven:3-jdk-9 mvn clean package -Ddb.url=jdbc:mysql://${DB_IP}:3306/jishi -Dspring.datasource.url=jdbc:mysql://${DB_IP}:3306/jishi -Dspring.datasource.username=jishi -Dspring.datasource.password=5bZnNBnlo69xTirkGQjb ${MAVEN_COMMANDS} -Dmaven.repo.local=/tmp/repository
echo "##############"
echo "##############"
if [ $DIND_WORKAROUND -gt 0 ]
then
    echo "## Disconnecting DIND host to network"
    docker network disconnect jishi_jishi_net $DIND_HOST
fi
echo "## STOP DB"
if [ $DOWN -gt 0 ]
then
    docker-compose down
else
    docker-compose stop
fi
echo "##############"

docker run -i --rm --name jish-maven-build --net=jishi_jishi_net -v /tmp/repository:/tmp/repository -v /home/joost/Projects/github/jishi:/usr/src/mymaven -w /usr/src/mymaven maven ls -lath