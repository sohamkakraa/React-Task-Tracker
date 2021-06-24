package com.sohamkakra.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sohamkakra.springboot.Repository.TaskRepository;
import com.sohamkakra.springboot.model.Task;

@RestController
@RequestMapping("/api/")
public class TaskController {

	@Autowired
	private TaskRepository taskRepository;
	
	//get all employees
	@GetMapping("/tasks")
	public List<Task> getAllTasks(){
		return taskRepository.findAll();
	}
}
