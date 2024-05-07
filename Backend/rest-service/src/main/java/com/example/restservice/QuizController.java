package com.example.restservice;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class QuizController {

	private static final String QUIZZES_DIR_PATH = "./quizzes/";

	//TODO: This is a stub.
	@GetMapping("/quiz")
	public String greeting(@RequestParam(value = "quizName", defaultValue = "defaultQuiz.txt") String name) throws IOException {
		return Files.readString(Paths.get(QUIZZES_DIR_PATH.concat(name)));
	}
}