# Emergency Services Dispatch Training Simulator

A Next.js web application that simulates emergency calls for training dispatchers using ElevenLabs Agents Platform.

## Features

- 🚨 **Real-time Voice Conversations**: Uses ElevenLabs WebRTC for low-latency voice communication
- 📞 **Emergency Call Simulation**: Simulates realistic emergency scenarios for dispatcher training
- 💬 **Text Input Support**: Allows typing responses in addition to voice
- ⚡ **Quick Response Buttons**: Pre-configured dispatcher phrases for common situations
- 📊 **Training Feedback**: Built-in feedback system for performance evaluation
- 🎯 **Configurable System Prompts**: Dynamic system prompt loading from external server

## Prerequisites

- Node.js 18+ 
- ElevenLabs account with Agents Platform access
- Microphone access in your browser
- System prompt server running on localhost:8080 (or configured URL)

## Setup

1. **Clone and Install Dependencies**
   ```bash
   cd ~/proj/simu
   npm install
   ```

2. **Configure Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your ElevenLabs Agent ID:
   ```
   NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your-agent-id-here
   NEXT_PUBLIC_SYSTEM_PROMPT_URL=http://localhost:8080/system-prompt
   ```

3. **Set Up System Prompt Server**
   
   A sample server is included (`server.js`) that provides system prompts for different emergency scenarios.
   
   Start the server:
   ```bash
   node server.js
   ```
   
   The server runs on `http://localhost:8080` and provides:
   - `/system-prompt` - Default emergency scenario
   - `/system-prompt?scenario=medical` - Medical emergency
   - `/system-prompt?scenario=fire` - Fire emergency  
   - `/system-prompt?scenario=crime` - Crime emergency
   
   You can also create your own server that responds with plain text at the configured URL.

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

5. **Open the Application**
   
   Navigate to `http://localhost:3000` in your browser.

## Usage

1. **Start Training Session**
   - Click "Start Emergency Call" button
   - Allow microphone access when prompted
   - The AI agent will begin simulating an emergency caller

2. **Interact with the Caller**
   - Listen to the emergency description
   - Ask appropriate questions using voice or text input
   - Use quick response buttons for common dispatcher phrases
   - Provide clear, calm instructions

3. **End the Session**
   - Click "End Call" when training is complete
   - Provide feedback on your performance if prompted

## Configuration

### Environment Variables

- `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`: Your ElevenLabs Agent ID (required)
- `NEXT_PUBLIC_SYSTEM_PROMPT_URL`: URL to fetch system prompts from (default: http://localhost:8080/system-prompt)

### ElevenLabs Agent Setup

1. Create an agent in the ElevenLabs dashboard
2. Configure the agent with appropriate voice settings
3. Set up the agent's behavior and responses
4. Copy the Agent ID to your environment variables

## Architecture

```
src/
├── app/
│   ├── page.tsx              # Main application page
│   ├── layout.tsx            # App layout
│   └── globals.css           # Global styles
├── components/
│   ├── EmergencySimulation.tsx    # Main simulation component
│   ├── EmergencyHeader.tsx        # Header with branding
│   ├── ConversationDisplay.tsx    # Message display area
│   ├── ConversationControls.tsx   # Control buttons and inputs
│   └── LoadingSpinner.tsx         # Loading indicator
```

## Key Components

### EmergencySimulation
- Main component that manages the ElevenLabs conversation
- Handles connection state and message flow
- Integrates system prompt from external server

### ConversationDisplay
- Shows conversation history between dispatcher and caller
- Displays speaking indicators and timestamps
- Handles message formatting and layout

### ConversationControls
- Provides start/end call functionality
- Text input for typed responses
- Quick response buttons for common phrases
- Feedback submission interface

## Troubleshooting

### Common Issues

1. **Microphone Permission Denied**
   - Ensure browser has microphone access
   - Check browser permissions settings
   - Try refreshing the page

2. **Agent Connection Failed**
   - Verify ElevenLabs Agent ID is correct
   - Check ElevenLabs account status
   - Ensure agent is properly configured

3. **System Prompt Loading Failed**
   - Verify system prompt server is running
   - Check server URL configuration
   - Ensure server responds with plain text

4. **Audio Issues**
   - Check browser audio settings
   - Verify microphone is working
   - Try different browser or device

### Browser Compatibility

- Chrome/Chromium: Full support
- Firefox: Full support  
- Safari: Full support
- Edge: Full support

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Adding New Features

1. **New Quick Responses**: Edit the `quickResponses` array in `ConversationControls.tsx`
2. **UI Customization**: Modify Tailwind classes in component files
3. **New Message Types**: Extend the message interface in `EmergencySimulation.tsx`

## License

This project is for educational and training purposes. Please ensure compliance with local regulations when using for emergency services training.