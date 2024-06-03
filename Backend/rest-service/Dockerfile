FROM gradle:jdk17-jammy AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle bootJar --no-daemon

FROM eclipse-temurin:17-jdk-jammy
COPY --from=build /home/gradle/src/build/libs/rest-service-0.0.1-SNAPSHOT.jar app.jar
COPY --from=build /home/gradle/src/quizzes /quizzes
ENTRYPOINT ["java","-jar","/app.jar"]
