package com.example.demo;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
public class PersonController {
  private final PeopleRepository peopleRepository;

  public PersonController(PeopleRepository peopleRepository) {
    this.peopleRepository = peopleRepository;
  }

  @PostMapping("/savePerson")
  @CrossOrigin(origins = "*")
  public String savePerson(@RequestBody Person person) {
    if (person == null) {
      return "The person is invalid";
    }
    this.peopleRepository.save(person);
    return "success";
  }
  
  @GetMapping("/findByName")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Person> findByName(@RequestParam String name) {
  	Iterable<Person> books = this.peopleRepository.findByName(name);
    List<Person> bookList = new ArrayList<>();
    books.forEach(bookList::add);
    return bookList;
  }

  @GetMapping("/findByContribution")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Person> findByContribution(@RequestParam String contribution) {
    Iterable<Person> books = this.peopleRepository.findByContribution(contribution);
    List<Person> bookList = new ArrayList<>();
    books.forEach(bookList::add);
    return bookList;
  }

  @GetMapping("/findByImageUrl")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Person> findByImageUrl(@RequestParam String url) {
    Iterable<Person> books = this.peopleRepository.findByImageUrl(url);
    List<Person> bookList = new ArrayList<>();
    books.forEach(bookList::add);
    return bookList;
  }

  @GetMapping("/findByImportance")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Person> findByImportance(@RequestParam String importance) {
    Iterable<Person> books = this.peopleRepository.findByImportance(importance);
    List<Person> bookList = new ArrayList<>();
    books.forEach(bookList::add);
    return bookList;
  }

  @GetMapping("/findByPoliticalInfluence")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Person> findByPoliticalInfluence(@RequestParam String politicalInfluence) {
    Iterable<Person> books = this.peopleRepository.findByPoliticalInfluence(politicalInfluence);
    List<Person> bookList = new ArrayList<>();
    books.forEach(bookList::add);
    return bookList;
  }

  @GetMapping("/findAllPeople")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Person> findAllPeople() {
  	Iterable<Person> books = this.peopleRepository.findAll();
    List<Person> bookList = new ArrayList<>();
    books.forEach(bookList::add);
    return bookList;
  }
}