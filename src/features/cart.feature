@cart
Feature: Cart
  As a user of FlowersApp
  I want to manage my shopping cart
  So that I can purchase products

  Background:
    Given the user is on the cart screen

  Scenario: Verify empty cart
    Then the cart should be empty

  Scenario: Remove item from cart
    Given the cart has items
    When the user removes the first item
    Then the cart should be empty
