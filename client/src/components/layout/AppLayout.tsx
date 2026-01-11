// This component wraps all pages with the home page's exact header and sidebar
import { useLocation } from "wouter";
import Home from "@/pages/home";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();
  const isHomePage = location === "/";
  
  // If it's the home page, just render it directly (it has its own layout)
  if (isHomePage) {
    return <>{children}</>;
  }
  
  // For all other pages, wrap them with the home page structure
  // but replace the content area with the actual tool page
  return <Home isToolPage={true}>{children}</Home>;
}
