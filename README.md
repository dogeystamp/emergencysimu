# Emergency Services Dispatch Training Simulator

A Next.js web application that simulates emergency calls for training dispatchers using OpenRouter LLM.

## Features

- 🚨 **Text-based Conversations**: Uses OpenRouter LLM for realistic emergency simulations
- 📞 **Emergency Call Simulation**: Simulates realistic emergency scenarios for dispatcher training
- 🎲 **Random Scenario Selection**: Multiple emergency scenarios chosen randomly
- 💬 **Text Input**: Type your responses as a dispatcher
- ⚡ **Quick Response Buttons**: Pre-configured dispatcher phrases for common situations
- 🔄 **Dynamic Scenario Switching**: Get new random scenarios during training

## Prerequisites

- Node.js 18+ 
- OpenRouter API key ([Get one here](https://openrouter.ai/keys))

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Create a `.env.local` file in the root directory and add your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=your-openrouter-api-key-here
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **Open the Application**
   
   Navigate to `http://localhost:3000` in your browser.

## Usage

1. **Start Training Session**
   - A random emergency scenario will be automatically selected
   - Click "Start Emergency Call" button
   - The AI agent will begin simulating an emergency caller

2. **Interact with the Caller**
   - Read the emergency description
   - Ask appropriate questions using the text input
   - Use quick response buttons for common dispatcher phrases
   - Provide clear, calm instructions

3. **Switch Scenarios**
   - Click "New Scenario" button to get a different random emergency
   - Previous conversation will be cleared
   - Start a new training session with the new scenario

4. **End the Session**
   - Click "End Call" when training is complete

## Configuration

### Environment Variables

- `OPENROUTER_API_KEY`: Your OpenRouter API key (required)
- `NEXT_PUBLIC_APP_URL`: Optional app URL for OpenRouter API metadata

### Available Emergency Scenarios

The application includes multiple emergency scenarios that are randomly selected. See `src/lib/prompts.ts` for the full list.

## Architecture

```
src/
├── app/
│   ├── page.tsx              # Main application page
│   ├── layout.tsx            # App layout
│   ├── globals.css           # Global styles
│   └── api/
│       └── chat/
│           └── route.ts      # OpenRouter API integration
├── components/
│   ├── EmergencySimulation.tsx    # Main simulation component
│   ├── EmergencyHeader.tsx        # Header with branding and scenario info
│   ├── ConversationDisplay.tsx    # Message display area
│   ├── ConversationControls.tsx   # Control buttons and inputs
│   └── LoadingSpinner.tsx         # Loading indicator
├── lib/
│   └── prompts.ts            # Emergency scenario prompts and selection logic
```

## Key Components

### EmergencySimulation
- Main component that manages the OpenRouter conversation
- Handles connection state and message flow
- Manages random scenario selection and switching
- Integrates with OpenRouter LLM via API route

### EmergencyHeader
- Displays current emergency scenario
- Provides "New Scenario" button for scenario switching
- Shows training session information

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

1. **API Connection Failed**
   - Verify OpenRouter API key is correct in `.env.local`
   - Check OpenRouter account status and credits
   - Ensure API key has sufficient permissions

2. **No Response from Agent**
   - Check browser console for errors
   - Verify API route is accessible
   - Check network tab for failed requests

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

1. **New Emergency Scenarios**: Add new scenarios to the `EMERGENCY_PROMPTS` array in `src/lib/prompts.ts`
2. **New Quick Responses**: Edit the `quickResponses` array in `ConversationControls.tsx`
3. **UI Customization**: Modify Tailwind classes in component files
4. **New Message Types**: Extend the message interface in `EmergencySimulation.tsx`

## License

This project is for educational and training purposes. Please ensure compliance with local regulations when using for emergency services training.