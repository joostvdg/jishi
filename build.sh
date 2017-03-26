#!/usr/bin/env bash

DOWN_DEFAULT=0
DOWN="${1:-$DOWN_DEFAULT}"

echo "##############"
echo "## MAVEN PACKAGE"
echo "##############"
echo "## START DB"
docker-compose pull
docker-compose up -d db
sleep 15
docker logs jishi_db_1
echo "## CHECK DB IP"
DB_IP=$(docker inspect --format '{{.NetworkSettings.Networks.jishi_default.IPAddress}}' jishi_db_1)
echo "# IP=${DB_IP}"
echo "##############"
echo "##############"
echo "## RUN MAVEN PACKAGE"
mvn clean package -Ddb.url=jdbc:mysql://${DB_IP}:3306/jishi -Dspring.datasource.url=jdbc:mysql://${DB_IP}:3306/jishi -Dspring.datasource.username=jishi -Dspring.datasource.password=5bZnNBnlo69xTirkGQjb
echo "##############"
echo "##############"
echo "## STOP DB"
if [ $DOWN -gt 0 ]
then
    docker-compose down
else
    docker-compose stop
fi
echo "##############"