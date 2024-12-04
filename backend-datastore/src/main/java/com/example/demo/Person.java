package com.example.demo;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

@Entity(name = "people")
public class Person {
  @Id
  Long id;

  String name;

  String imageUrl;

  String contribution;

  String importance;

  String politicalInfluence;

  public Person(String name, String imageUrl, String contribution, String importance, String politicalInfluence) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.contribution = contribution;
    this.importance = importance;
    this.politicalInfluence = politicalInfluence;
  }

  public Long getId() {
    return id;
  }

  public String getContribution() {
    return contribution;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public String getImportance() {
    return importance;
  }

  public String getName() {
    return name;
  }

  public String getPoliticalInfluence() {
    return politicalInfluence;
  }

  public void setContribution(String contribution) {
    this.contribution = contribution;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public void setImportance(String importance) {
    this.importance = importance;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setPoliticalInfluence(String politicalInfluence) {
    this.politicalInfluence = politicalInfluence;
  }

  @Override
  public String toString() {
    return "Person{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", imageUrl='" + imageUrl + '\'' +
            ", contribution='" + contribution + '\'' +
            ", importance='" + importance + '\'' +
            ", politicalInfluence='" + politicalInfluence + '\'' +
            '}';
  }
}