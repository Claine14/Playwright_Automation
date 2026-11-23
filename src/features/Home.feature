@ui @home @smoke
Feature: Sauce Demo Homepage & Global Navigation

  Background:
    Given I am on the Sauce Demo homepage

  Scenario: Verify homepage branding, initial cart state, and featured products
    Then I should see the store tagline "Just a demo site showing off what Sauce can do."
    And the header cart count should be "(0)"
    And I should see 3 featured products on the homepage
    And the featured products should include "Grey jacket" priced at "£55.00"
    And the featured products should include "Noir jacket" priced at "£60.00"
    And the featured products should include "Striped top" priced at "£50.00"

  Scenario Outline: Navigate to storefront pages via the main sidebar menu
    When I click the "<menuItem>" link in the main menu
    Then I should be navigated to a URL containing "<expectedPath>"

    Examples:
      | menuItem | expectedPath     |
      | Catalog  | /collections/all |
      | Blog     | /blogs/news      |
      | About Us | /pages/about-us  |

  Scenario Outline: Navigate to authentication pages via the top header
    When I click the "<headerItem>" link in the top header
    Then I should be navigated to a URL containing "<expectedPath>"

    Examples:
      | headerItem | expectedPath      |
      | Log In     | /account/login    |
      | Sign up    | /account/register |

  Scenario: Navigate to product detail page from homepage featured product
    When I select the featured product "Grey jacket"
    Then I should be navigated to a URL containing "/products/grey-jacket"
