// tests/api.spec.js
const { test, expect, request } = require('@playwright/test');

test.describe('Enterprise Backend API Pipeline (Fully Isolated)', () => {
    
    // ১. POST Request: নতুন ইউজার তৈরি
    test('Should successfully register a new user via API POST request', async () => {
        // extraHTTPHeaders: {} দিয়ে গ্লোবাল কনফিগারেশনের সব ভুলভাল হেডার ও কুকি মুছে সাফ করে দেওয়া হলো
        const isolatedContext = await request.newContext({
            extraHTTPHeaders: {} 
        });
        
        const response = await isolatedContext.post('https://reqres.in/api/users', {
            data: {
                name: "Emon Automation",
                job: "Lead QA Engineer"
            }
        });

        // স্ট্যাটাস কোড ভেরিফিকেশন
        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        console.log('Created User Response:', responseBody);

        expect(responseBody.name).toBe("Emon Automation");
        expect(responseBody.job).toBe("Lead QA Engineer");
        
        await isolatedContext.dispose();
    });

    // ২. GET Request: ইউজারের ডাটা রিড করা
    test('Should fetch existing user profile details via API GET request', async () => {
        // এখানেও গ্লোবাল সব হেডার ও কুকি সম্পূর্ণ ক্লিয়ার করে দেওয়া হলো
        const isolatedContext = await request.newContext({
            extraHTTPHeaders: {}
        });
        
        const response = await isolatedContext.get('https://reqres.in/api/users/2');

        // স্ট্যাটাস কোড ভেরিফিকেশন
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log('Fetched User Details:', responseBody.data);

        expect(responseBody.data.id).toBe(2);
        expect(responseBody.data.email).toBe('janet.weaver@reqres.in');
        
        await isolatedContext.dispose();
    });
});