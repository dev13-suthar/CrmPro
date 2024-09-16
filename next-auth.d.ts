/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: number;
    email: string;
  }
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number; 
    email:string
  }
}
