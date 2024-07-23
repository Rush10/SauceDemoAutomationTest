import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  //visit website
  await page.goto('https://www.saucedemo.com/');
});

//test data
const USERS = [
  {
    'username' : 'standard_user',
    'password' : 'secret_sauce',
    'firstName' : 'Standard',
    'lastName' : 'User',
    'postalCode' : 'Test'
  }
] as const;

const ITEMS = [
  {
    'name' : 'Sauce Labs Backpack',
    'description' : 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    'price' : 29.99
  },
  {
    'name' : 'Sauce Labs Bike Light',
    'description' : 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
    'price' : 9.99
  },
  {
    'name' : 'Sauce Labs Bolt T-Shirt',
    'description' : "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    'price' : 15.99
  }
] as const;

test('Create Order', async ({ page }) => {
  //page elements
  const editTextUsername = page.locator('[data-test="username"]');
  const editTextPassword = page.locator('[data-test="password"]');
  const buttonLogin = page.locator('[data-test="login-button"]');

  const textTitle = page.locator('[data-test="title"]');
  const textItem4Name = page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]'); //Sauce Labs Backpack Text
  const buttonAddToCartBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const buttonRemoveBackpack = page.locator('[data-test="remove-sauce-labs-backpack"]');
  const textItem0Name = page.locator('[data-test="item-0-title-link"] [data-test="inventory-item-name"]'); //Sauce Labs Bike Light Text
  const buttonAddToCartBikeLight = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  const buttonRemoveBikeLight = page.locator('[data-test="remove-sauce-labs-bike-light"]');
  const textItem1Name = page.locator('[data-test="item-1-title-link"] [data-test="inventory-item-name"]'); //Sauce Labs Bolt T-Shirt Text
  const buttonAddToCartBoltTShirt = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
  const buttonRemoveBoltTShirt = page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]');
  const linkShoppingCart = page.locator('[data-test="shopping-cart-link"]');

  const buttonCheckout = page.locator('[data-test="checkout"]');

  const editTextFirstName = page.locator('[data-test="firstName"]');
  const editTextLastName = page.locator('[data-test="lastName"]');
  const editTextPostalCode = page.locator('[data-test="postalCode"]');
  const buttonContinue = page.locator('[data-test="continue"]');

  const labelSubtotal = page.locator('[data-test="subtotal-label"]');
  const labelTax = page.locator('[data-test="tax-label"]');
  const labelTotal = page.locator('[data-test="total-label"]');
  const buttonFinish = page.locator('[data-test="finish"]');
  
  const textCompleteHeader = page.locator('[data-test="complete-header"]');
  
  //const
  const textProductTitlePage = 'Products';
  const textCartTitlePage = 'Your Cart';
  const textCheckoutStepOneTitlePage = 'Checkout: Your Information';
  const textCheckoutStepTwoTitlePage = 'Checkout: Overview';
  const textCheckoutCompleteTitlePage = 'Checkout: Complete!';
  
  const textAddToCart = 'Add to cart';
  const textRemove = 'Remove';
  const textBtnLogin = 'Login';
  const textBtnCheckout = 'Checkout';
  const textBtnContinue = 'Continue';
  const textBtnFinish = 'Finish';
  
  const textOrderComplete = 'Thank you for your order!';
  
  //check login page is open
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(editTextUsername).toBeVisible();
  await expect(editTextPassword).toBeVisible();
  await expect(buttonLogin).toBeVisible();
  await expect(buttonLogin).toContainText(textBtnLogin);

  //login steps (#1)
  await editTextUsername.fill(USERS[0].username);
  await editTextPassword.fill(USERS[0].password);
  await buttonLogin.click();

  //verify if user has logged in
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
  await expect(textTitle).toBeVisible();
  await expect(textTitle).toContainText(textProductTitlePage);
  await expect(textItem4Name).toBeVisible();
  await expect(textItem4Name).toContainText(ITEMS[0].name);
  await expect(textItem0Name).toBeVisible();
  await expect(textItem0Name).toContainText(ITEMS[1].name);
  await expect(textItem1Name).toBeVisible();
  await expect(textItem1Name).toContainText(ITEMS[2].name);
  await expect(buttonAddToCartBackpack).toBeVisible();
  await expect(buttonAddToCartBackpack).toContainText(textAddToCart);
  await expect(buttonAddToCartBikeLight).toBeVisible();
  await expect(buttonAddToCartBikeLight).toContainText(textAddToCart);
  await expect(buttonAddToCartBoltTShirt).toBeVisible();
  await expect(buttonAddToCartBoltTShirt).toContainText(textAddToCart);
  await expect(linkShoppingCart).toBeVisible();

  //select 3 items steps (#2)
  await buttonAddToCartBackpack.click();
  await buttonAddToCartBikeLight.click();
  await buttonAddToCartBoltTShirt.click();

  //verify 3 items have been selected
  await expect(buttonRemoveBackpack).toBeVisible();
  await expect(buttonRemoveBackpack).toContainText(textRemove);
  await expect(buttonRemoveBikeLight).toBeVisible();
  await expect(buttonRemoveBikeLight).toContainText(textRemove);
  await expect(buttonRemoveBoltTShirt).toBeVisible();
  await expect(buttonRemoveBoltTShirt).toContainText(textRemove);

  await expect(buttonAddToCartBackpack).toHaveCount(0);
  await expect(buttonAddToCartBikeLight).toHaveCount(0);
  await expect(buttonAddToCartBoltTShirt).toHaveCount(0);

  //go to cart step (#3)
  await linkShoppingCart.click();

  //verify cart page and selected items
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');  
  await expect(textTitle).toBeVisible();
  await expect(textTitle).toContainText(textCartTitlePage);
  await expect(textItem4Name).toBeVisible();
  await expect(textItem4Name).toContainText(ITEMS[0].name);
  await expect(textItem0Name).toBeVisible();
  await expect(textItem0Name).toContainText(ITEMS[1].name);
  await expect(textItem1Name).toBeVisible();
  await expect(textItem1Name).toContainText(ITEMS[2].name);
  await expect(buttonRemoveBackpack).toBeVisible();
  await expect(buttonRemoveBackpack).toContainText(textRemove);
  await expect(buttonRemoveBikeLight).toBeVisible();
  await expect(buttonRemoveBikeLight).toContainText(textRemove);
  await expect(buttonRemoveBoltTShirt).toBeVisible();
  await expect(buttonRemoveBoltTShirt).toContainText(textRemove);
  await expect(buttonCheckout).toBeVisible();
  await expect(buttonCheckout).toContainText(textBtnCheckout);

  //remove an item step (#4)
  await buttonRemoveBackpack.click(); 

  //verify item has been removed
  await expect(textItem4Name).toHaveCount(0);
  await expect(buttonRemoveBackpack).toHaveCount(0);

  //checkout step (#5)
  await buttonCheckout.click();

  //verify checkout step one page
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  await expect(textTitle).toBeVisible();
  await expect(textTitle).toContainText(textCheckoutStepOneTitlePage);
  await expect(editTextFirstName).toBeVisible();
  await expect(editTextLastName).toBeVisible();
  await expect(editTextPostalCode).toBeVisible();
  await expect(buttonContinue).toBeVisible();
  await expect(buttonContinue).toContainText(textBtnContinue);

  //fill the form and continue steps (#6-#7)
  await editTextFirstName.fill(USERS[0].firstName);
  await editTextLastName.fill(USERS[0].lastName);
  await editTextPostalCode.fill(USERS[0].postalCode);
  await buttonContinue.click();

  //verify checkout step two page
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  await expect(textTitle).toBeVisible();
  await expect(textTitle).toContainText(textCheckoutStepTwoTitlePage);
  await expect(textItem0Name).toBeVisible();
  await expect(textItem0Name).toContainText(ITEMS[1].name);
  await expect(textItem1Name).toBeVisible();
  await expect(textItem1Name).toContainText(ITEMS[2].name);
  
  const orderTotal = ITEMS[1].price + ITEMS[2].price; 
  const orderTax = await calculateTax(orderTotal); 
  
  await expect(labelSubtotal).toBeVisible();
  await expect(labelSubtotal).toContainText('Item total: $' + orderTotal);
  await expect(labelTax).toBeVisible();
  await expect(labelTax).toContainText('Tax: $' + orderTax);
  await expect(labelTotal).toBeVisible();
  await expect(labelTotal).toContainText('Total: $' + (orderTotal + parseFloat(orderTax)).toFixed(2));
  await expect(buttonFinish).toBeVisible();
  await expect(buttonFinish).toContainText(textBtnFinish);

  //finish step (#8)
  await buttonFinish.click();

  //verify checkout complete
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  await expect(textTitle).toBeVisible();
  await expect(textTitle).toContainText(textCheckoutCompleteTitlePage);
  await expect(textCompleteHeader).toContainText(textOrderComplete);
});

async function calculateTax(totalPrice: number) {
  return (totalPrice * 0.08).toFixed(2);
}