@ui @account
Feature: Sauce Demo Customer Login & Registration Pages

  Scenario: Reject login attempt with invalid credentials
    Given I am on the Login page
    When I submit the login form with email "invalid.qa@example.com" and password "WrongPassword123!"
    Then I should see an authentication error or stay on the login page

  Scenario: Navigate from Login page to Create Account page and verify form fields
    Given I am on the Login page
    When I click the Create account link from the login page
    Then I should be navigated to a URL containing "/account/register"
    And I should see all customer registration fields
