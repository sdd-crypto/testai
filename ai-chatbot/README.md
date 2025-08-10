# Advanced AI Chatbot

A powerful AI chatbot built with Next.js and Perplexity API. This chatbot is designed to be highly advanced and capable of handling complex Python programming tasks and other queries with detailed explanations.

## Features

- 🧠 Powered by Perplexity AI's Sonar Pro model
- 💻 Expert in Python programming and various technical domains
- ⚡ Fast, real-time responses
- 🔍 Detailed A-Z explanations for any prompt
- 📝 Markdown support with syntax highlighting for code
- 🌓 Dark/Light mode support
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **API Integration**: Perplexity AI API
- **Styling**: Tailwind CSS with Typography plugin
- **Code Highlighting**: React Syntax Highlighter

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Perplexity API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/advanced-ai-chatbot.git
   cd advanced-ai-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your Perplexity API key:
   ```
   PERPLEXITY_API_KEY=your_api_key_here
   PERPLEXITY_MODEL=sonar-pro
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Type your question or prompt in the input field at the bottom of the chat window.
2. Press Enter or click the send button to submit your query.
3. The AI will process your request and provide a detailed response.
4. For code-related questions, the AI will provide syntax-highlighted code examples.

## Python Capabilities

The chatbot excels at Python programming tasks, including:

- Data analysis and visualization
- Machine learning and deep learning
- Web development (Flask, Django, FastAPI)
- Web scraping and automation
- Algorithm design and optimization
- Debugging and troubleshooting code

## Customization

You can customize the system prompt in the `ChatContext.tsx` file to change the AI's behavior and capabilities.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Perplexity AI](https://www.perplexity.ai/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
