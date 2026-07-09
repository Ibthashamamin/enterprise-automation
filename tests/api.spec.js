// tests/api.spec.js
const { test, expect } = require('@playwright/test');
const axios = require('axios');

test.describe('Enterprise Backend API Pipeline (Isolated)', () => {
    
    // ১. POST Request: নতুন ইউজার তৈরি
    test('Should successfully register a new user via API POST request', async () => {
        const response = await axios.post('https://reqres.in/api/users', {
            name: "Emon Automation",
            job: "Lead QA Engineer"
        }, {
            // প্লে-রাইটের গ্লোবাল কনফিগারেশন এড়াতে হেডার আইসোলেশন
            headers: { 'Content-Type': 'application/json' },
            validateStatus: () => true // ৪Axios যাতে নিজেই এরর থ্রো না করে প্লে-রাইটকে চেক করতে দেয়
        });

        // Assert 1: স্ট্যাটাস কোড ২০১ কিনা চেক করা
        expect(response.status).toBe(201);

        const responseBody = response.data;
        console.log('Created User Response:', responseBody);

        // Assert 2: ডাটা ভেরিফিকেশন
        expect(responseBody.name).toBe("Emon Automation");
        expect(responseBody.job).toBe("Lead QA Engineer");
        expect(responseBody).toHaveProperty('id');
    });

    // ২. GET Request: ইউজারের ডাটা রিড করা
    test('Should fetch existing user profile details via API GET request', async () => {
        const response = await axios.get('https://reqres.in/api/users/2', {
            validateStatus: () => true
        });

        // Assert 1: স্ট্যাটাস কোড ২০০ কিনা চেক করা
        expect(response.status).toBe(200);

        const responseBody = response.data;
        console.log('Fetched User Details:', responseBody.data);

        // Assert 2: ইমেইল ও আইডি ভেরিফিকেশন
        expect(responseBody.data.id).toBe(2);
        expect(responseBody.data.email).toBe('janet.weaver@reqres.in');
    });
});