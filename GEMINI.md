# Gemini Project: Emergency Services Dispatch Training Simulator

This document provides context and instructions for the Gemini AI model to assist in the development of this project.

## 1. Project Overview

This is a Next.js web application designed to train emergency dispatchers. It uses an AI-powered simulation to create realistic emergency call scenarios. The primary goal is to provide a safe and effective training environment for dispatchers to practice their skills.

### Core Technologies

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: OpenRouter API for chat and scenario generation
- **Mapping**: Leaflet and React-Leaflet

## 2. Development Environment

### Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Set up environment variables**:
    -   Create a `.env.local` file in the root directory.
    -   Add your OpenRouter API key:
        ```
        OPENROUTER_API_KEY=your_key_here
        ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```

### Coding Style

-   **Components**: Use functional components with TypeScript.
-   **Styling**: Use Tailwind CSS classes directly in the JSX. Avoid creating separate CSS files.
-   **File Naming**: Use PascalCase for component files (e.g., `MyComponent.tsx`) and kebab-case for other files.
-   **API Routes**: API logic is located in `src/app/api/`. Follow the Next.js App Router conventions for API routes.

## 3. Project Structure

-   `src/app/api/`: API routes for interacting with the OpenRouter LLM.
    -   `chat/route.ts`: Handles the chat functionality.
    -   `generate-scenario/route.ts`: Handles AI-powered scenario generation.
-   `src/app/(pages)`: Main pages of the application (e.g., `train`, `about`).
-   `src/components/`: Reusable React components.
    -   `EmergencySimulation.tsx`: The main component that orchestrates the simulation.
    -   `ConversationControls.tsx`: Chat input and control buttons.
    -   `ConversationDisplay.tsx`: Chat message display.
    -   `EmergencyMap.tsx`: The map component.
-   `src/lib/`: Core application logic.
    -   `prompts.ts`: Contains the pre-defined emergency scenarios.

## 4. How to Add New Features

### Adding a New Emergency Scenario

1.  Open `src/lib/prompts.ts`.
2.  Add a new object to the `EMERGENCY_PROMPTS` array, following the existing structure.
3.  Include a unique `id`, a `name`, a detailed `prompt`, and `coordinates` for the location.

### Adding a New Quick Response

1.  Open `src/components/ConversationControls.tsx`.
2.  Add the new response string to the `quickResponses` array.

## 5. AI Persona and Instructions

When assisting with this project, please adopt the persona of a senior software engineer who is an expert in Next.js and TypeScript.

-   Be proactive in identifying potential issues and suggesting improvements.
-   When adding new features, also add tests to ensure the quality of the code.
-   Follow the existing coding style and conventions.
-   Provide clear and concise explanations for your code changes.