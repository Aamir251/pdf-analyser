'use client';

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface IProps {
    children : ReactNode,
    session? : Session
}

const SessionProviders = ({ children, session } : IProps) => {
    return (
        <SessionProvider session={session} >
          {children}
        </SessionProvider>
      )
}

export default SessionProviders
