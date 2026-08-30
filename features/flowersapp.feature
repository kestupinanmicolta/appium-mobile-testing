Feature: FlowersApp complete test suite
  As a QA engineer
  I want to test the FlowersApp
  So that I can verify all critical functionality

  Background:
    Given the app is launched

  # --- Login Tests ---

  Scenario: Failed login with short password
    Given the user is on the login screen
    When the user enters email "test@test.com" and password "123"
    Then the user should see a validation error
    And the user stays on the login screen

  Scenario: Failed login with wrong credentials
    Given the user is on the login screen
    When the user enters email "wrong@mail.com" and password "wrong123"
    Then the user should see an auth error
    And the user stays on the login screen

  Scenario: Successful login
    Given the user is on the login screen
    When the user enters valid credentials
    Then the user should be on the catalog screen

  # --- Catalog Tests ---

  Scenario: Display products in catalog
    Given the user is logged in
    Then the catalog should show at least one product

  Scenario: Click on a product
    Given the user is logged in
    When the user clicks on the first product
    Then the product detail should be displayed

  Scenario: Filter by category
    Given the user is logged in
    When the user clicks on a category filter
    Then the catalog should display filtered results

  Scenario: Navigate to cart from catalog
    Given the user is logged in
    When the user clicks on the cart icon
    Then the cart screen should be displayed

  # --- Cart Tests ---

  Scenario: View cart screen
    Given the user is logged in
    When the user clicks on the cart icon
    Then the cart screen is visible

  Scenario: Navigate back from cart
    Given the user is logged in
    When the user clicks on the cart icon
    And the user navigates back from cart
    Then the user should be on the catalog screen
