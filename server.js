#!/usr/bin/env node

/**
 * Simple HTTP server to serve system prompts for the Emergency Dispatch Training Simulator
 * 
 * This server provides system prompts that configure the ElevenLabs agent
 * to simulate various emergency scenarios for dispatcher training.
 * 
 * Usage:
 *   node server.js
 * 
 * The server will run on http://localhost:8080
 * System prompts are served at /system-prompt
 */

const http = require('http');
const url = require('url');

const PORT = 8080;

// Example system prompts for different emergency scenarios
const systemPrompts = {
  default: `You are an emergency caller simulation agent. You will roleplay as someone calling 911 with various emergency situations.

Your role:
- Act as a distressed caller with a realistic emergency scenario
- Provide information gradually as the dispatcher asks questions
- Respond naturally to dispatcher instructions
- Maintain appropriate emotional tone for the emergency type

Emergency scenarios to simulate:
- Medical emergencies (heart attack, stroke, injury)
- Fire emergencies (house fire, car fire, smoke)
- Crime emergencies (break-in, assault, suspicious activity)
- Traffic accidents (collision, pedestrian struck, DUI)
- Natural disasters (flooding, severe weather)

Always maintain realism and provide appropriate details when asked by the dispatcher.`,

  medical: `You are simulating a medical emergency caller. You are calling 911 because someone is having a medical emergency.

Current scenario: A family member is experiencing chest pain and shortness of breath. They are conscious but in distress.

Your behavior:
- Sound worried and urgent but not panicked
- Provide medical information when asked
- Follow dispatcher instructions for first aid
- Answer questions about symptoms, age, medications
- Stay on the line until help arrives`,

  fire: `You are simulating a fire emergency caller. You are calling 911 because there is a fire emergency.

Current scenario: You smell smoke in your apartment building and see smoke coming from a unit downstairs.

Your behavior:
- Sound alarmed but try to stay calm
- Provide location details when asked
- Follow evacuation instructions
- Answer questions about fire location, size, people trapped
- Stay on the line while evacuating if safe to do so`,

  crime: `You are simulating a crime emergency caller. You are calling 911 because you witnessed or are experiencing a crime.

Current scenario: You heard loud noises and breaking glass from your neighbor's house, and you're concerned there may be a break-in.

Your behavior:
- Sound concerned and cautious
- Provide location and description details
- Follow safety instructions from dispatcher
- Answer questions about suspects, weapons, injuries
- Stay on the line while staying safe`
};

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }

  // Serve system prompt
  if (path === '/system-prompt') {
    const scenario = query.scenario || 'default';
    const prompt = systemPrompts[scenario] || systemPrompts.default;
    
    res.writeHead(200, corsHeaders);
    res.end(prompt);
    return;
  }

  // Serve API info
  if (path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head><title>Emergency Training System Prompt Server</title></head>
        <body>
          <h1>Emergency Training System Prompt Server</h1>
          <p>This server provides system prompts for the Emergency Dispatch Training Simulator.</p>
          <h2>Available Endpoints:</h2>
          <ul>
            <li><code>GET /system-prompt</code> - Default emergency scenario prompt</li>
            <li><code>GET /system-prompt?scenario=medical</code> - Medical emergency scenario</li>
            <li><code>GET /system-prompt?scenario=fire</code> - Fire emergency scenario</li>
            <li><code>GET /system-prompt?scenario=crime</code> - Crime emergency scenario</li>
          </ul>
          <h2>Usage:</h2>
          <p>Configure your Next.js app to fetch from <code>http://localhost:8080/system-prompt</code></p>
        </body>
      </html>
    `);
    return;
  }

  // 404 for other paths
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`🚨 Emergency Training System Prompt Server running on http://localhost:${PORT}`);
  console.log(`📞 System prompts available at http://localhost:${PORT}/system-prompt`);
  console.log(`🎯 Available scenarios: default, medical, fire, crime`);
  console.log(`\nExample usage:`);
  console.log(`  curl http://localhost:${PORT}/system-prompt`);
  console.log(`  curl http://localhost:${PORT}/system-prompt?scenario=medical`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
