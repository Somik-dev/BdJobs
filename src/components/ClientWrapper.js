// src/components/ClientWrapper.js
'use client';
import CompanyMessage from "@/app/CompanyMessage";
import ProviderRedux from "@/app/provider";
import AuthLoader from "@/app/providers/AuthLoader";
import UserMessage from "@/app/UserMessage";
import { ThemeProvider } from "./theme-provider";
import Navbar from "./navbar";
import { ToasterProvider } from "./ToasterProvider";
import JobMessage from "@/app/JobMessage";



export default function ClientAppWrapper({ children }) {
  return (
    <ProviderRedux>
      <AuthLoader />
      <UserMessage />
      <CompanyMessage />
      <JobMessage/>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        {children}
        <ToasterProvider />
      </ThemeProvider>
    </ProviderRedux>
  );
}

