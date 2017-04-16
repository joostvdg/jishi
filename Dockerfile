FROM anapsix/alpine-java:jdk8

MAINTAINER Joost van der Griendt <joostvdg@gmail.com>
LABEL authors="Joost van der Griendt <joostvdg@flusso.nl>"
LABEL version="1.0.0"
LABEL description="Simple application to model systems and applications"

COPY target/jishi-app.jar app.jar
RUN bash -c 'touch /app.jar'
EXPOSE 8080
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","-Dspring.profiles.active=compose", "/app.jar"]