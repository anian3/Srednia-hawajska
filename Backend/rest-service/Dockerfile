FROM gradle:jdk17-jammy AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle bootJar --no-daemon

FROM eclipse-temurin:17-jdk-jammy
RUN mkdir /server
WORKDIR /server
COPY --from=build /home/gradle/src/build/libs/rest-service-0.0.1-SNAPSHOT.jar /server/app.jar
COPY --from=build /home/gradle/src/quizzes /server/quizzes
EXPOSE 8080
ENTRYPOINT ["java","-jar","/server/app.jar"]
