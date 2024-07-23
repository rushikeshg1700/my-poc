'use client'

import Link from "next/link";

export default function Header() {
  return (
    <>
    <h1>Hello</h1>
      <nav
        className="bg-purple-700 text-white flex md:justify-between flex-col md:flex-row min-h-12
        items-center p-3"
      >
        <div className="logo mx-auto md:mx-0">User Management</div>
        <ul className="flex space-x-3 justify-center md:justify-normal">    
            <Link href="/" className="hover:text-gray-300 cursor-pointer bg-blue-900 p-2">Home</Link>
            <Link href="/about" className="hover:text-gray-300 cursor-pointer bg-blue-900 p-2">About Us</Link>
            <Link href="/about" className="hover:text-gray-300 cursor-pointer bg-blue-900 p-2">Contact Us</Link>
        </ul>
      </nav>
    </>
  );
}
