import React from 'react';
// import Navbar from './Navbar';
import { ThemeProvider } from 'next-themes';



export default function HomePage() {
  return (
    <ThemeProvider attribute='class'>
      <div className="flex flex-col px-6 py-5 bg-white">
        <div className="flex justify-center items-center h-screen">
          {/* Empty canvas */}
          <p className="text-xl text-gray-700">Home page is coming soon...</p>
        </div>
        <div>
        </div>
      </div>
    </ThemeProvider>
  );
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
