package com.example.demo;

import java.util.List;

import com.google.common.collect.Lists;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;

@ShellComponent
@SpringBootApplication
public class DemoApplication {
  @Autowired
  PeopleRepository peopleRepository;

  public static void main(String[] args) {
     SpringApplication.run(DemoApplication.class, args);
  }

  @ShellMethod("Loads all people")
  public String findAllPeople() {
     Iterable<Person> people = this.peopleRepository.findAll();
     return Lists.newArrayList(people).toString();
  }

  @ShellMethod("Loads people by name: find-by-name <name>")
  public String findByName(String name) {
     List<Person> people = this.peopleRepository.findByName(name);
     return people.toString();
  }

}
