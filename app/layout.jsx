/**
 * TODO: change favicon
 */
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "../context/AuthContext";
import Head from "next/head";
import favicon from "@/public/images/vb.png";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ViscanScript",
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
      <body className={inter.className}>
        <AuthContextProvider>
          <div className="shadow-md">
          {/* <Navbar /> */}
          </div>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
