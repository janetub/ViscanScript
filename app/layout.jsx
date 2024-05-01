import "../styles/globals.css";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "../context/AuthContext";
import Head from "next/head";
import favicon from "@/public/images/vb.png";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Viscan Script",
  description: "",
  icons:{
    icon: {favicon},
    apple: {favicon},
    shortcut: {favicon},
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href={favicon}/>
      </Head>
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
