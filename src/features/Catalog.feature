@ui @catalog
Feature: Sauce Demo Catalog Page

  Background:
    Given I am on the Catalog page

  Scenario: Verify all catalog products, prices, and sold-out badges
    Then I should see the page heading "Products"
    And I should see 7 products listed in the catalog
    And the product "Black heels" should be listed with price "£45.00"
    And the product "Bronze sandals" should be listed with price "£39.99"
    And the product "Brown Shades" should be listed with price "£20.00"
    And the product "Grey jacket" should be listed with price "£55.00"
    And the product "Noir jacket" should be listed with price "£60.00"
    And the product "Striped top" should be listed with price "£50.00"
    And the product "White sandals" should be listed with price "£25.00"
    And the product "Bronze sandals" should display a "Sold Out" badge
    And the product "Striped top" should display a "Sold Out" badge

  Scenario: Open an in-stock product from the catalog
    When I open the product "Black heels" from the catalog
    Then I should be navigated to a URL containing "/products/flower-print-jeans"
