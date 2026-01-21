# Nuxt AI Chatbot

A modern, feature-rich AI chatbot application built with Nuxt 4 and Vercel AI SDK. This chatbot supports multiple AI models, tool calling capabilities, and user authentication.

## ✨ Features

- 🤖 **Multiple AI Models**: Support for Mistral AI models (ministral-3b, mistral-small, mistral-medium, mistral-large)
- 🔐 **GitHub OAuth Authentication**: Secure user authentication with GitHub
- 💬 **Persistent Chat History**: Save and manage your conversations
- 🛠️ **Tool Calling**: Built-in tools for:
  - 🌤️ Weather information with 5-day forecast
  - 📊 Interactive chart visualization
- 🎨 **Modern UI**: Built with Nuxt UI components
- 🌓 **Dark Mode**: Full dark mode support
- 🔄 **Real-time Streaming**: Stream AI responses in real-time
- 📝 **Markdown Support**: Rich text formatting with code highlighting
- 🚀 **PostgreSQL Database**: Reliable data persistence with Drizzle ORM
- 🐳 **Docker Ready**: Easy deployment with Docker support

## 🏗️ Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/)
- **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/) with AI Gateway integration
- **UI Components**: [Nuxt UI](https://ui.nuxt.com/)
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [nuxt-auth-utils](https://github.com/Atinux/nuxt-auth-utils)
- **Markdown**: [@nuxtjs/mdc](https://mdc.nuxtjs.org/)
- **Charts**: [nuxt-charts](https://nuxt-charts.com/)
- **Code Highlighting**: [Shiki](https://shiki.matsu.io/)

## 📋 Prerequisites

- Node.js 18+ or 22+
- PostgreSQL database
- pnpm (recommended) or npm
- GitHub OAuth App credentials
- Vercel AI Gateway API key

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vthanhduong/nuxt-ai-chatbot.git
cd nuxt-ai-chatbot
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Fill in the required environment variables:

```env
# Session password (minimum 32 characters)
NUXT_SESSION_PASSWORD=your-secure-random-password-min-32-chars

# GitHub OAuth credentials
NUXT_OAUTH_GITHUB_CLIENT_ID=your-github-client-id
NUXT_OAUTH_GITHUB_CLIENT_SECRET=your-github-client-secret

# AI Gateway API key
AI_GATEWAY_API_KEY=your-ai-gateway-api-key

# PostgreSQL database URL
DATABASE_URL=postgresql://user:password@host:port/database
```

#### Setting up GitHub OAuth:

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set the callback URL to: `http://localhost:3000/auth/github`
4. Copy the Client ID and Client Secret to your `.env` file

#### Getting AI Gateway API Key:

1. Sign up at [Vercel AI Gateway](https://vercel.com/docs/ai-gateway)
2. Create a new API key
3. Add it to your `.env` file

### 4. Set up the database

Generate database migrations:

```bash
pnpm run db:generate
```

Run migrations:

```bash
pnpm run db:migrate
```

### 5. Start development server

```bash
pnpm run dev
```

The application will be available at `http://localhost:3000`

## 🐳 Docker Deployment

### Build the Docker image

```bash
docker build \
  --build-arg DATABASE_URL=your-database-url \
  --build-arg AI_GATEWAY_API_KEY=your-api-key \
  -t nuxt-ai-chatbot .
```

### Run the container

```bash
docker run -p 3000:3000 \
  -e NUXT_SESSION_PASSWORD=your-session-password \
  -e NUXT_OAUTH_GITHUB_CLIENT_ID=your-github-client-id \
  -e NUXT_OAUTH_GITHUB_CLIENT_SECRET=your-github-client-secret \
  nuxt-ai-chatbot
```

## 📁 Project Structure

```
nuxt-ai-chatbot/
├── app/
│   ├── assets/           # CSS and static assets
│   ├── components/       # Vue components
│   ├── composables/      # Vue composables
│   ├── layouts/          # Layout components
│   ├── pages/            # Application pages
│   └── app.vue           # Main app component
├── server/
│   ├── api/              # API endpoints
│   ├── db/               # Database schema and migrations
│   └── routes/           # Server routes (auth)
├── shared/
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Shared utilities and tools
├── public/               # Public static files
├── nuxt.config.ts        # Nuxt configuration
├── drizzle.config.ts     # Drizzle ORM configuration
└── Dockerfile            # Docker configuration
```

## 🔧 Available Scripts

```bash
# Development
pnpm run dev              # Start development server

# Production
pnpm run build            # Build for production
pnpm run start            # Start production server
pnpm run preview          # Preview production build

# Database
pnpm run db:generate      # Generate database migrations
pnpm run db:migrate       # Run database migrations

# Code Quality
pnpm run lint             # Run ESLint
pnpm run typecheck        # Run TypeScript type checking
```

## 🛠️ AI Tools

The chatbot includes built-in tools that can be called during conversations:

### Weather Tool

Get current weather information and 5-day forecast for any location.

**Example prompt**: "What is the weather in Ho Chi Minh City?"

### Chart Tool

Create interactive line charts with single or multiple data series.

**Example prompt**: "Show me a chart of sales data"

## 🤖 AI Models

The chatbot supports multiple Mistral AI models:

- **ministral-3b**: Fast, lightweight model for quick responses
- **mistral-small**: Balanced performance and speed
- **mistral-medium**: Enhanced capabilities for complex tasks (default)
- **mistral-large**: Most powerful model for advanced reasoning

Users can switch between models using the model selector in the chat interface.

## 🎨 Customization

### Adding New AI Models

Edit `app/composables/useModels.ts`:

```typescript
export function useModels() {
  const models = [
    'your-provider/your-model',
    // Add more models here
  ]
  
  const model = useCookie<string>('model', { 
    default: () => 'your-provider/your-model' 
  })

  return { models, model }
}
```

### Creating Custom Tools

Add new tools in `shared/utils/tools/`:

```typescript
import { tool } from 'ai'
import { z } from 'zod'

export const yourTool = tool({
  description: 'Description of what your tool does',
  inputSchema: z.object({
    param: z.string().describe('Parameter description')
  }),
  execute: async ({ param }) => {
    // Your tool logic here
    return { result: 'data' }
  }
})
```

Then register the tool in `server/api/chats/[id].post.ts`.

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NUXT_SESSION_PASSWORD` | Session encryption password (min 32 chars) | Yes |
| `NUXT_OAUTH_GITHUB_CLIENT_ID` | GitHub OAuth client ID | Yes |
| `NUXT_OAUTH_GITHUB_CLIENT_SECRET` | GitHub OAuth client secret | Yes |
| `AI_GATEWAY_API_KEY` | Vercel AI Gateway API key | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes |

## 📝 Database Schema

The application uses three main tables:

- **users**: Store user information from GitHub OAuth
- **chats**: Store chat sessions
- **messages**: Store individual messages with their content parts

## 🔒 Security Features

- Session-based authentication with encrypted cookies
- OAuth 2.0 with GitHub
- Secure database connections
- Environment variable validation
- CORS protection

## 🚧 Development Notes

- The chatbot has a custom personality configured as "Slave-chan"
- Automatic chat title generation using AI
- Support for streaming responses with tool calls
- Markdown rendering with code syntax highlighting
- Responsive design for mobile and desktop

## 📄 License

This project is private and proprietary.

## 👤 Author

**Duong Vu Thanh**
- GitHub: [@vthanhduong](https://github.com/vthanhduong)
- Website: [chatbot.nytx.space](https://chatbot.nytx.space)

## 🤝 Contributing

This is a private project. If you have access and want to contribute, please follow the standard pull request workflow.

## 📮 Support

For issues and questions, please open an issue on the GitHub repository.

---

Built with ❤️ using Nuxt 4 and Vercel AI SDK
