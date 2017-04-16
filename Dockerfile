FROM anapsix/alpine-java:jdk8
ADD target/*.jar app.jar
RUN bash -c 'touch /app.jar'
EXPOSE 8080
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","-Dspring.profiles.active=compose", "/app.jar"]