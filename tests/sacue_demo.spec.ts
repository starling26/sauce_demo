import { expect, test } from '@playwright/test';

test.describe('Sauce Demo Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test('TC-SD001: Successful login with valid credentials', async ({ page }) => {
        await test.step('Fill username', async () => {
            await page.fill('#user-name', 'standard_user');
        });

        await test.step('Fill password', async () => {
            await page.fill('#password', 'secret_sauce');
        });

        await test.step('Click login', async () => {
            await page.click('#login-button');
        });

        await test.step('Verify title page', async () => {
            await expect(page.getByText('Swag Labs')).toBeVisible();
        });

    });
    test('TC-SD002: Login attempt with locked_out_user account', async ({ page }) => {
        await test.step('Enter invalid username', async () => {
            await page.fill('#user-name', 'locked_out_user');
        });

        await test.step('Fill password', async () => {
            await page.fill('#password', 'secret_sauce');
        });

        await test.step('Click login', async () => {
            await page.click('#login-button');
        });

        await test.step('Verify error message', async () => {
            await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
        });
    });

    test('TC-SD003: Login form mandatory fields validation', async ({ page }) => {
        await test.step('Click login without filling fields', async () => {
            await page.click('#login-button');
        });

        await test.step('Verify error message for empty username', async () => {
            await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
        });

        await test.step('Fill password', async () => {
            await page.fill('#password', 'secret_sauce');
        });

        await test.step('Click login', async () => {
            await page.click('#login-button');
        });

        await test.step('Verify error message for empty username', async () => {
            await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
        });
    });

    test('TC-SD004: Add product to shopping cart from inventory', async ({ page }) => {
        await test.step('Login with valid credentials', async () => {
            await page.fill('#user-name', 'standard_user');
            await page.fill('#password', 'secret_sauce');
            await page.click('#login-button');
        });

        await test.step('Add product to cart', async () => {
            await page.click('.inventory_item:nth-child(1) .btn_inventory');
        });

        await test.step('Verify cart badge', async () => {
            await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        });
    });

    test('TC-SD005: Sort products by price ascending', async ({ page }) => {
        await test.step('Login with valid credentials', async () => {
            await page.fill('#user-name', 'standard_user');
            await page.fill('#password', 'secret_sauce');
            await page.click('#login-button');
        });

        await test.step('Sort products by price (low to high)', async () => {
            await page.selectOption('.product_sort_container', 'lohi');
        });

        await test.step('Verify first product price is lowest', async () => {
            const firstProductPrice = await page.locator('.inventory_item_price').first().textContent();
            expect(firstProductPrice).toBe('$7.99');
        });

    });
    test('TC-SD006: Access product details page', async ({ page }) => {
        await test.step('Login with valid credentials', async () => {
            await page.fill('#user-name', 'standard_user');
            await page.fill('#password', 'secret_sauce');
            await page.click('#login-button');
        });

        await test.step('Click on the first product', async () => {
            await page.locator('[data-test="item-4-title-link"]').click();
        });
        await test.step('Verify product details page', async () => {
            await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
        });
    });
    test('TC-SD007: Remove product from shopping cart', async ({ page }) => {
        await test.step('Login with valid credentials', async () => {
            await page.fill('#user-name', 'standard_user');
            await page.fill('#password', 'secret_sauce');
            await page.click('#login-button');
        });
        await test.step('Add product to cart', async () => {
            await page.getByRole('button', { name: 'Add to cart', exact: true }).first().click();
        });
        await test.step('Remove product from cart', async () => {
            await page.getByRole('button', { name: 'Remove', exact: true }).first().click();
        });
        await test.step('Verify cart is empty', async () => {
            const cartBadge = page.locator('.shopping_cart_badge');
            await expect(cartBadge).toHaveCount(0);
        });
    });

    test('TC-SD008: Complete checkout process successfully', async ({ page }) => {
        await test.step('Add products to cart', async () => {
            await page.fill('#user-name', 'standard_user');
            await page.fill('#password', 'secret_sauce');
            await page.click('#login-button');
            await page.getByRole('button', { name: 'Add to cart', exact: true }).first().click();
        });

        await test.step('Proceed to checkout', async () => {
            await page.click('.shopping_cart_link');
            await page.click('[data-test="checkout"]');
        });

        await test.step('Complete checkout', async () => {
            await page.fill('[data-test="firstName"]', 'Starling');
            await page.fill('[data-test="lastName"]', 'De La Cruz');
            await page.fill('[data-test="postalCode"]', '10304');
            await page.click('[data-test="continue"]');
            await page.click('[data-test="finish"]');

            await test.step('Verify checkout complete', async () => {
                await expect(page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible();
            });
        });
    });

    test('TC-SD009: Verify order total calculation accuracy', async ({ page }) => {
         await test.step('Add products to cart', async () => {
            await page.fill('#user-name', 'standard_user');
            await page.fill('#password', 'secret_sauce');
            await page.click('#login-button');
            await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        });

        await test.step('Proceed to checkout', async () => {
            await page.click('.shopping_cart_link');
            await page.click('[data-test="checkout"]');
        });

        await test.step('Complete checkout information', async () => {
            await page.fill('[data-test="firstName"]', 'Starling');
            await page.fill('[data-test="lastName"]', 'De La Cruz');
            await page.fill('[data-test="postalCode"]', '10304');
            await page.click('[data-test="continue"]');
        });

        await test.step('Verify order total', async () => {
            await expect(page.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $39.98');
            await expect(page.locator('[data-test="tax-label"]')).toHaveText('Tax: $3.20');
            await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $43.18');

            const itemTotal = 39.98;
            const tax = 3.20;
            const expectedTotal = itemTotal + tax;
            console.log(`Calculated Total: $${expectedTotal}`);
        });
    });
    test('TC-SD010: User logout from application', async ({ page }) => {
        await test.step('Login with valid credentials', async () => {
            await page.fill('#user-name', 'standard_user');
            await page.fill('#password', 'secret_sauce');
            await page.click('#login-button');
        });
        
        await test.step('Open menu and click logout', async () => {
            await page.click('#react-burger-menu-btn');
            await page.click('#logout_sidebar_link');
        });

    });
    test('TC-SD011: Failed login attempt with error_user credentials', async ({ page }) => {
        await test.step('Enter error_user username', async () => {
            await page.fill('#user-name', 'error_user');
        }
        );

        await test.step('Fill password', async () => {
            await page.fill('#password', 'secret_sauce');
        });

        await test.step('Click login', async () => {
            await page.click('#login-button');
        });

        await test.step('Verify error message', async () => {
            await expect(page.getByText('Epic sadface: Sorry user error.')).toBeVisible();
        });

    });



});