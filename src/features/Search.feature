@ui @search
Feature: Sauce Demo Storefront Search

  Background:
    Given I am on the Search page

  Scenario: Verify initial search page state
    Then I should see the page heading "Search Results"
    And I should see the initial search message "No search performed."

  Scenario: Search for an existing product keyword
    When I search for "jacket"
    Then I should see search results containing "Grey jacket"
    And I should see search results containing "Noir jacket"

  Scenario: Search for a non-existent keyword
    When I search for "nonexistent-item-xyz"
    Then I should see no matching products for "nonexistent-item-xyz"
