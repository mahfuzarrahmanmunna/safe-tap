import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/page";
import Footer from "./components/Footer/page";
import { ThemeProvider } from "./contexts/ThemeContext";
// import Navbar from "./components/Navbar"; // Import the Navbar component
// import Footer from "./components/Footer/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SAFETAP LTD. | Professional Water Solutions",
  description: "Connect with certified technicians for fast, reliable water tap repairs and plumbing services. Book online or join our network of professional mechanics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-arp="" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased flex flex-col min-h-screen bg-neutral-light text-neutral-dark" cz-shortcut-listen="true">
        <ThemeProvider>
          <Navbar />

          <main className="flex-grow">
            <div className="max-content-width container-padding">
              {children}
            </div>
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}