@ui @pdp @smoke
Feature: Sauce Demo Product Detail Page

  Scenario: View in-stock product details and add item to cart
    Given I am on the product detail page for "grey-jacket"
    Then I should see the product title "Grey jacket" and price "£55.00"
    When I click the Add to Cart button
    Then the header cart count should be "(1)"

  Scenario: Verify sold-out product cannot be added to cart
    Given I am on the product detail page for "bronze-sandals"
    Then the Add to Cart button should be unavailable or marked sold out
