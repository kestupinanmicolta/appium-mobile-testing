@login
Feature: Login
  As a user of FlowersApp
  I want to be able to login with my credentials
  So that I can access the app features

  Background:
    Given Karen is on the login screen

  Scenario: Successful login with valid credentials
    When she enters email "test@example.com" and password "password123"
    Then she should not see an error message

  Scenario: Failed login with invalid credentials
    When she enters email "invalid@email.com" and password "wrongpassword"
    Then she should see an error message
