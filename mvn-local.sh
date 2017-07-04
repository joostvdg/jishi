#!/usr/bin/env bash
DB_IP=$(docker inspect --format '{{.NetworkSettings.Networks.jishi_jishi_net.IPAddress}}' jishi_db_1)
mvn clean -e spring-boot:run -Dspring.profiles.active=compose -Ddb.url=jdbc:mysql://${DB_IP}/jishi -Dspring.datasource.url=jdbc:mysql://${DB_IP}/jishi
