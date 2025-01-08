'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white relative">
      {/* Opaque Background Logo */}
      <div className="absolute top-10">
        <img
          src="/Logo.png" // Replace with your logo's file path
          alt="Feedvids Logo"
          className="w-36 h-auto opacity-80 bg-white bg-opacity-20 shadow-md"
        />
      </div>

      <header className="text-center mt-20">
        <h1 className="text-5xl font-bold mb-4">Welcome to Feedvids</h1>
        <p className="text-lg max-w-2xl">
          Feedvids is your one-stop platform to generate stunning, AI-driven videos effortlessly. 
          Let your imagination come alive with the power of Gen-AI. Start creating now!
        </p>
      </header>

      <div className="mt-8">
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-3 text-lg font-medium bg-white text-purple-600 rounded-full shadow-md hover:bg-purple-200 transition duration-300"
        >
          Generate videos using Gen-AI now !
        </button>
      </div>

      <footer className="absolute bottom-5 text-sm text-gray-200">
        © {new Date().getFullYear()} Feedvids. All Rights Reserved.
      </footer>
    </div>
  );
}
