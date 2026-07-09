// tests/api.spec.js
const { test, expect, request } = require('@playwright/test');

test.describe('Enterprise Backend API Pipeline (Isolated)', () => {
    
    // এখানে আমরা কোনো গ্লোবাল ব্রাউজার বা Saucedemo-র কনটেক্সট ব্যবহার করব না
    // সরাসরি প্লে-রাইটের কোর রিকোয়েস্ট ইঞ্জিন দিয়ে ফ্রেশ কানেকশন তৈরি করা হচ্ছে
    
    // ১. POST Request: নতুন ইউজার তৈরি
    test('Should successfully register a new user via API POST request', async () => {
        const freshContext = await request.newContext(); // একদম স্বাধীন আইসোলেটেড কনটেক্সট
        
        const response = await freshContext.post('https://reqres.in/api/users', {
            data: {
                name: "Emon Automation",
                job: "Lead QA Engineer"
            }
        });

        // Assert 1: স্ট্যাটাস কোড ২০১ (Created) কিনা চেক করা
        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        console.log('Created User Response:', responseBody);

        // Assert 2: ডাটা ভেরিফিকেশন
        expect(responseBody.name).toBe("Emon Automation");
        expect(responseBody.job).toBe("Lead QA Engineer");
        expect(responseBody).toHaveProperty('id');
        
        await freshContext.dispose(); // কানেকশন বন্ধ করা
    });

    // ২. GET Request: ইউজারের ডাটা রিড করা
    test('Should fetch existing user profile details via API GET request', async () => {
        const freshContext = await request.newContext(); // একদম স্বাধীন আইসোলেটেড কনটেক্সট
        
        const response = await freshContext.get('https://reqres.in/api/users/2');

        // Assert 1: স্ট্যাটাস কোড ২০০ (OK) কিনা চেক করা
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log('Fetched User Details:', responseBody.data);

        // Assert 2: ইমেইল ও আইডি ভেরিফিকেশন
        expect(responseBody.data.id).toBe(2);
        expect(responseBody.data.email).toBe('janet.weaver@reqres.in');
        
        await freshContext.dispose(); // কানেকশন বন্ধ করা
    });
});