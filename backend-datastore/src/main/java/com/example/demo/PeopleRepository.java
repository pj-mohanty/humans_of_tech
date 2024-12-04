package com.example.demo;

import java.util.List;

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;


public interface PeopleRepository extends DatastoreRepository<Person, Long> {

  List<Person> findByName(String name);

  List<Person> findByImageUrl(String imageUrl);

  List<Person> findByContribution(String contribution);

  List<Person> findByImportance(String importance);

  List<Person> findByPoliticalInfluence(String politicalInfluence);
}