/**
 * app/page.jsx
 *
 * entry point
 */

// sample commit
import React from "react";
import HomePage from "./home/page";

export default function App() {
  return <HomePage />;
}

// export default function Home() {
//   return <div className="flex flex-col h-screen bg-black">This is home</div>;
// }

// Header
// <header className="w-full h-16 border-b border-gray-200 flex items-center justify-between px-6">
//   {/* Logo placeholder */}
//   <div className="h-32 w-32">
//     <Image src="/images/logo-ver2.png" alt="Logo" width={180} height={180} />
//   </div>
//   {/* Other header content goes here */}
// </header>

// {/* Main content */}
// <main className="flex flex-1">
//   {/* Sidebar */}
//   <aside className="w-1/4 border-r border-gray-200 p-6">
//     {/* Sidebar content goes here */}
//   </aside>

//   {/* Main window */}
//   <section className="flex-1 bg-light-blue-200 p-6">
//     {/* Main window content goes here */}
//   </section>
// </main>
