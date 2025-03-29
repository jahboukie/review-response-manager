import { handleAuth } from '@auth0/nextjs-auth0';

// The correct way to implement Auth0 handler with Next.js App Router
export const GET = handleAuth();
