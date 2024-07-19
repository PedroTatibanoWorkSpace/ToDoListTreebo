import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="font-sans text-lg tracking-wide">©2024 TREEBO TO DO LIST APP</p>
        <p className="font-sans text-sm mt-2">Developed by Pedro Tatibano</p>
        <div className="flex justify-center mt-4">
          <a
            href="https://github.com/PedroTatibano"
            className="text-gray-300 hover:text-gray-100 px-3 transition-colors duration-300 underline"
          >
            GitHub
          </a>
          <span className="text-gray-300">•</span>
          <a
            href="https://www.linkedin.com/in/pedro-tatibano/"
            className="text-gray-300 hover:text-gray-100 px-3 transition-colors duration-300 underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
