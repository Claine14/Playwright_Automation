@ui @info
Feature: Sauce Demo Blog & About Us Pages

  Scenario: Verify Blog page displays published store news
    Given I am on the Blog page
    Then I should see the blog post "First Post" published on "12 Mar"

  Scenario: Verify About Us page and footer navigation
    Given I am on the About Us page
    Then I should see the Sauce Demo store description on the About Us page
    Given I am on the Sauce Demo homepage
    When I click the "About Us" link in the footer
    Then I should be navigated to a URL containing "/pages/about-us"
