@catalog
Feature: Catalog
  As a user of FlowersApp
  I want to browse the product catalog
  So that I can find products to purchase

  Background:
    Given Karen is on the catalog screen

  Scenario: Display products in catalog
    Then the catalog should show at least one product

  Scenario: Click on a product
    When she clicks on the first product
    Then the product name should not be empty

  Scenario: Search for a product
    When she searches for "roses"
    Then the catalog should display search results

  Scenario: Navigate to cart
    When she clicks on the cart button
    Then the cart screen should be displayed
