"use client";

export default function Footer() {
  return (
    <>
      <footer className="bg-white rounded-lg shadow dark:bg-gray-900 mt-5 w-full fixed bottom-0">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              User Management
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
