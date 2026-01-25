"use client"; // Add this directive at the top to mark it as a client component

import { geistSans, geistMono, metadata } from "./metadata"; // Import metadata
import "./globals.css";
import Navbar from "./components/Navbar/page";
import Footer from "./components/Footer/page";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { FirebaseAuthProvider } from "./contexts/FirebaseAuthContext";
import { usePathname } from "next/navigation"; // Import usePathname

// Helper function to check if the current path is a dashboard
const isDashboardPath = (pathname) => {
  if (!pathname) return false;

  // Check for main dashboard paths
  // if (
  //   pathname === "/dashboard" ||
  //   pathname === "/admin/dashboard" ||
  //   pathname === "/technasian/dashboard" ||
  //   pathname === "/customer/dashboard"
  // ) {
  //   return true;
  // }

  // Check for any subpaths under dashboard routes
  if (
    pathname.startsWith("/dashboard/") ||
    pathname.startsWith("/admin-dashboard") ||
    pathname.startsWith("/technasian-dashboard") ||
    pathname.startsWith("/customer-dashboard")
  ) {
    return true;
  }

  return false;
};

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current path
  const isDashboard = isDashboardPath(pathname); // Check if it's a dashboard

  return (
    <html
      lang="en"
      data-arp=""
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body
        className={`antialiased flex flex-col min-h-screen bg-neutral-light text-neutral-dark ${isDashboard ? "dashboard-layout" : ""}`}
        cz-shortcut-listen="true"
      >
        <AuthProvider>
          <FirebaseAuthProvider>
            <ThemeProvider>
              {/* Only render Navbar if not on a dashboard page */}
              {!isDashboard && <Navbar />}

              <main className={`flex-grow ${isDashboard ? "w-full" : ""}`}>
                <div
                  className={`${isDashboard ? "max-w-full" : "max-content-width container-padding"}`}
                >
                  {children}
                </div>
              </main>

              {/* Only render Footer if not on a dashboard page */}
              {!isDashboard && <Footer />}
            </ThemeProvider>
          </FirebaseAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
