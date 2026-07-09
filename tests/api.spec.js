// tests/api.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Enterprise Backend API Pipeline (Direct Engine)', () => {
    
    // ১. POST Request: নতুন ইউজার তৈরি
    test('Should successfully register a new user via API POST request', async ({ request }) => {
        const response = await request.post('https://reqres.in/api/users', {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            },
            data: {
                name: "Emon Automation",
                job: "Lead QA Engineer"
            },
            failOnStatusCode: false
        });

        console.log('Actual Received Status Code (POST):', response.status());
        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.name).toBe("Emon Automation");
    });

    // ২. GET Request: ইউজারের ডাটা রিড করা
    test('Should fetch existing user profile details via API GET request', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users/2', {
            headers: {
                'Accept': '*/*',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            },
            failOnStatusCode: false
        });

        console.log('Actual Received Status Code (GET):', response.status());
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.data.id).toBe(2);
    });
});