package com.sohamkakra.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sohamkakra.springboot.Repository.TaskRepository;
import com.sohamkakra.springboot.exception.TaskNotFoundException;
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
	
	//add task
	@PostMapping("/tasks")
	public Task addTask(@RequestBody Task task) {
		return taskRepository.save(task);
	}
	
	// get employee by id rest api
	@GetMapping("/tasks/{id}")
	public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
		Task employee = taskRepository.findById(id)
		.orElseThrow(() -> new TaskNotFoundException("Employee not exist with id :" + id));
		return ResponseEntity.ok(employee);
	}
			
	// update employee rest api
	@PutMapping("/tasks/{id}")
	public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails){
		Task employee = taskRepository.findById(id)
		.orElseThrow(() -> new TaskNotFoundException("Employee not exist with id :" + id));
				
		employee.setDay(taskDetails.getDay());
		employee.setTask(taskDetails.getTask());
		employee.setReminder(taskDetails.isReminder());
				
		Task updatedEmployee = taskRepository.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}
	
	// delete employee rest api
	@DeleteMapping("/tasks/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteTask(@PathVariable Long id){
		Task task = taskRepository.findById(id)
		.orElseThrow(() -> new TaskNotFoundException("Employee not exist with id :" + id));
			
		taskRepository.delete(task);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
