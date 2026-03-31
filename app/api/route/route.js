// app/api/cybersecurity-tip/route.js

import cybersecurityTips from '.././route/cyberTips';

export async function GET(request) {
    try {
        const randomIndex = Math.floor(Math.random() * cybersecurityTips.length);
        const tip = cybersecurityTips[randomIndex];
        
        return new Response(
            JSON.stringify({ tip }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error fetching tip:', error);
        return new Response(
            JSON.stringify({ tip: "Failed to fetch a new tip. Please try again later." }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
