package com.sohamkakra.springboot.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sohamkakra.springboot.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

}
