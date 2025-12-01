# Solidwriter - AI Writing Assistant

A full-stack Next.js application that combines AI-powered writing assistance with usage tracking and document management.

## Features

- **AI Writing Assistant**: Powered by Moonshot K2 Thinking model for intelligent content generation
- **Usage Tracking**: Credit-based system with 10 free generations for new users
- **Document Management**: Create, edit, and save documents with real-time updates
- **Authentication**: GitHub OAuth and guest access support
- **Modern UI**: Built with Tailwind CSS and Radix UI components
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js for authentication
- **Database**: PostgreSQL with Prisma ORM
- **AI Integration**: OpenRouter API with Moonshot K2 Thinking model
- **UI Components**: Radix UI, Lucide React icons, Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- GitHub OAuth App (for authentication)
- OpenRouter API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd solidwriter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/solidwriter"
   
   # NextAuth.js
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # GitHub OAuth (Optional - for GitHub login)
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"
   
   # OpenRouter API
   OPENROUTER_API_KEY="your-openrouter-api-key"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
solidwriter/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth.js configuration
│   │   ├── documents/     # Document CRUD operations
│   │   ├── generate/      # AI generation endpoint
│   │   └── user/          # User management
│   ├── dashboard/         # User dashboard page
│   ├── editor/            # Document editor pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── lib/                   # Utility libraries
│   ├── db.ts              # Prisma client
│   └── utils.ts           # Helper functions
├── prisma/                # Database schema
│   └── schema.prisma      # Prisma schema
├── public/                # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Random string for JWT encryption | Yes |
| `NEXTAUTH_URL` | Your app's URL | Yes |
| `GITHUB_ID` | GitHub OAuth client ID | No |
| `GITHUB_SECRET` | GitHub OAuth client secret | No |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI | Yes |

## API Endpoints

- `GET /api/auth/signin` - Authentication sign-in
- `GET /api/documents` - List user documents
- `POST /api/documents` - Create new document
- `GET /api/documents/[id]` - Get specific document
- `PATCH /api/documents/[id]` - Update document
- `GET /api/user/usage` - Get user's usage statistics
- `POST /api/generate` - Generate AI content

## Database Schema

The application uses the following main models:

- **User**: User accounts with usage tracking
- **Document**: User documents with content and metadata
- **Account/Session**: NextAuth.js authentication data
- **VerificationToken**: Email verification tokens

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Usage

1. **Sign up/Login**: Use GitHub OAuth or guest access
2. **Dashboard**: View your documents and usage statistics
3. **Create Document**: Click "New Document" to start writing
4. **AI Assistant**: Use the AI sidebar to generate content
5. **Save**: Manually save your work or let auto-save handle it

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check existing issues on GitHub
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

## Acknowledgments

- Moonshot AI for the K2 Thinking model
- OpenRouter for AI API access
- Next.js team for the excellent framework
- Vercel for hosting platform
