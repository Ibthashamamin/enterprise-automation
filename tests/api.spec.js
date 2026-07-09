// tests/api.spec.js
const { test, expect, request } = require('@playwright/test');

test.describe('Enterprise Backend API Pipeline (Direct Engine)', () => {
    
    // ১. POST Request: নতুন ইউজার তৈরি
    test('Should successfully register a new user via API POST request', async () => {
        // প্লে-রাইটের গ্লোবাল রানার সম্পূর্ণ বাইপাস করে ডিরেক্ট মেমোরি রিকোয়েস্ট
        const response = await request.post('https://reqres.in/api/users', {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' // সার্ভারকে বোঝানো এটি ব্রাউজার থেকে আসছে
            },
            data: {
                name: "Emon Automation",
                job: "Lead QA Engineer"
            },
            failOnStatusCode: false, // কোন অবস্থাতেই প্লেরাইট যাতে মাঝপথে টেস্ট ফেইল না করায়
            ignoreHTTPSErrors: true
        });

        console.log('Actual Received Status Code (POST):', response.status());
        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.name).toBe("Emon Automation");
    });

    // ২. GET Request: ইউজারের ডাটা রিড করা
    test('Should fetch existing user profile details via API GET request', async () => {
        const response = await request.get('https://reqres.in/api/users/2', {
            headers: {
                'Accept': '*/*',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            },
            failOnStatusCode: false,
            ignoreHTTPSErrors: true
        });

        console.log('Actual Received Status Code (GET):', response.status());
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.data.id).toBe(2);
    });
});