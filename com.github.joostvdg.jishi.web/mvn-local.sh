#!/usr/bin/env bash
DB_IP=$(docker inspect --format '{{.NetworkSettings.Networks.jishi_jishi_net.IPAddress}}' jishi_db_1)
echo "DB=${DB_IP}"
# -Dspring.profiles.active=compose
mvn clean -U -e spring-boot:run -Ddb.url="jdbc:mysql://${DB_IP}/jishi"

# -Ddb.user"jishi" -Ddb.pass="5bZnNBnlo69xTirkGQjb"mvn-local.sh
#    -Drun.arguments="-Ddb.url=jdbc:mysql://${DB_IP}/jishi -Dspring.flyway.url=jdbc:mysql://${DB_IP}/jishi -Dspring.datasource.url=jdbc:mysql://${DB_IP}/jishi"  \
#    -Dspring.datasource.url="jdbc:mysql://${DB_IP}/jishi" -Dspring.flyway.url="jdbc:mysql://${DB_IP}/jishi" \
#    -Dspring.flyway.user=jishi -Dspring.datasource.username=jishi -Ddb.user=jishi \
#    -Dspring.flyway.password=5bZnNBnlo69xTirkGQjb -Dspring.datasource.password=5bZnNBnlo69xTirkGQjb -Ddb.pass=5bZnNBnlo69xTirkGQjb

