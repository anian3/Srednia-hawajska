package com.example.restservice;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class QuizController {

    private static final String QUIZZES_DIR_PATH = "./quizzes/";
    private static final String SMELLS_INJECT = "/CodeSmells/";
    private static final String CODE_INJECT = "/Quizzes/";

    private Path internalPath(String quiz, String path, String inject) {
        return Paths.get(QUIZZES_DIR_PATH + quiz + inject + path);
    }

    @GetMapping("/apiv1/quizfile")
    public String Quizfile(@RequestParam String quiz, @RequestParam String path) throws IOException {
        return Files.readString(internalPath(quiz, path, SMELLS_INJECT));
    }

    @GetMapping("/apiv1/codefile")
    public String Codefile(@RequestParam String quiz, @RequestParam String path) throws IOException {
        return Files.readString(internalPath(quiz, path, CODE_INJECT));
    }
}
