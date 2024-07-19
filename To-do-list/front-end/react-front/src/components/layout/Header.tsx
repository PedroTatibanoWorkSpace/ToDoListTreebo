import React, { useState } from 'react';

import { FaHistory } from 'react-icons/fa';
import SideModal from '../common/SideModal';
import TreeboIcon from '../../assets/treebo-icon.png';

const Header: React.FC = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleHistoryClick = () => {
    setIsHistoryOpen(true);
  };

  const handleCloseHistory = () => {
    setIsHistoryOpen(false);
  };

  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={TreeboIcon} alt="TreeboIcon" className="h-8 mr-2" /> {/* Inclui o ícone aqui */}
          <div>
            <h1 className="font-sans text-3xl tracking-wide">
              TREEBO TO DO LIST
            </h1>
            <p className="font-sans mt-2 text-sm">Sua lista de tarefas pessoal</p>
          </div>
        </div>
        <div>
          <button
            className="text-white p-2 rounded-full hover:bg-gray-800"
            onClick={handleHistoryClick}
          >
            <FaHistory className="text-xl" />
          </button>
        </div>
      </div>
      <SideModal isOpen={isHistoryOpen} onClose={handleCloseHistory} />
    </header>
  );
};

export default Header;
