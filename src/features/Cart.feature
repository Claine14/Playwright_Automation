@ui @cart @smoke
Feature: Sauce Demo Shopping Cart & Checkout Entry

  Scenario: Verify empty cart state and Continue Shopping navigation
    Given I am on the Cart page
    Then I should see the empty cart message "It appears that your cart is currently empty!"
    When I click Continue Shopping from the empty cart
    Then I should be navigated to a URL containing "/collections/all"

  Scenario: Add item, update quantity, remove item, and verify cart totals
    Given I am on the product detail page for "grey-jacket"
    When I click the Add to Cart button
    And I am on the Cart page
    Then I should see "Grey jacket" in the cart with price "£55.00"
    When I update the quantity of "Grey jacket" to 2
    Then the cart subtotal should match the expected total of "£110.00"
    When I remove "Grey jacket" from the cart
    Then I should see the empty cart message "It appears that your cart is currently empty!"

  Scenario: Proceed to checkout from a populated cart
    Given I am on the product detail page for "grey-jacket"
    When I click the Add to Cart button
    And I am on the Cart page
    And I proceed to checkout from the cart
    Then I should be navigated to a URL containing "/checkouts"
