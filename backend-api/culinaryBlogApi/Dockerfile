FROM maven:latest AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN ["mvn", "-f", "/home/app/pom.xml", "clean"]
RUN ["mvn", "-f", "/home/app/pom.xml", "package", "-Dmaven.test.skip=true"]

FROM openjdk:17-jdk-slim-buster
COPY --from=build /home/app/target/backend-api-0.0.1-SNAPSHOT.jar ./backend-api.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "backend-api.jar"]