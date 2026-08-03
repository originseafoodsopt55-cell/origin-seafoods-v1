import React from 'react';

export function FloatingContact() {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 animate-smooth-bounce">
      <a
        href="#contact"
        className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-md text-sm font-bold hover:shadow-lg transition-shadow"
      >
        ติดต่อเรา
      </a>
      <a
        href="#contact"
        className="w-14 h-14 bg-[#F37021] hover:bg-[#d95d13] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        aria-label="ติดต่อเรา"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </a>
    </div>
  );
}
