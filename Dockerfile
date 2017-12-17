FROM maven:3-jdk-9-slim AS build
#RUN update-ca-certificates -f
WORKDIR /usr/local/src
ENV MAVEN_OPTS=-Dmaven.repo.local=../m2repo/
COPY pom.xml .
RUN mvn -v
RUN mvn -B -e -C -T 1C org.apache.maven.plugins:maven-dependency-plugin:3.0.2:go-offline
COPY . /usr/local/src

FROM openjdk:9-jdk-slim
LABEL authors="Joost van der Griendt <joostvdg@gmail.com>"
LABEL version="1.0.0"
LABEL description="Simple application to model systems and applications"
CMD ["/usr/bin/java","-XX:+PrintFlagsFinal", "-XX:+PrintGCDetails","-jar","-Dspring.profiles.active=compose", "/app.jar"]
HEALTHCHECK --interval=5s --start-period=3s --timeout=5s CMD wget -qO- "http://localhost:8080/about"
COPY --from=build /usr/local/src/target/jishi-app.jar app.jar
RUN bash -c 'touch /app.jar'
EXPOSE 8080

