import "../styles/globals.css";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "../context/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Viscan Script",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <AuthContextProvider>
          <div className="shadow-md">
          </div>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
