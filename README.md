
---

# Daccy - Elevate Your DSA Skills with AI 💻✨

**Learn, Debug, and Succeed** with AI-powered assistance.

Daccy is an AI-powered learning web application designed to help users master Data Structures and Algorithms (DSA) through real-time debugging support, personalized learning paths, and AI-generated challenges.

## Features

- **AI-Based DSA Challenges**: Problems generated based on user-selected difficulty levels with intentional bugs for learning.
- **AI Chatbot**: Get answers to DSA-related questions using Gemini AI.
- **Generative Learning**: Automatically generated content on DSA topics like arrays, linked lists, and more.

## Challenges

We faced inconsistencies with the Gemini AI model's content generation. To overcome this:
- **Refined input prompts** for more accurate results.
- Implemented **quality control** by reviewing AI-generated content.
- Added a **user feedback system** for continuous improvement.

## Tech Stack

- **Frontend**: Nextjs
- **Backend**: Node.js, Express.js
- **Database**: Prism ORM
- **AI**: Gemini AI

## Getting Started

### Prerequisites

- Prisma
- PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RAVEYUS/Codu.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Codu
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file and add:

```env
GEMINI_API_KEY=
```

### Run the Project

Start the development server:
```bash
npm run dev
```

## Contributing

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Push and create a pull request.

## License

Licensed under the MIT License. See [LICENSE](LICENSE).

---
