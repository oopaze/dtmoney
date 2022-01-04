import { useState } from 'react';

import { GlobalStyle } from './styles/global';

import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header/index';
import Modal from 'react-modal';
import { NewTranscationModal } from './components/NewTransactionModal';


Modal.setAppElement('#root')

function App() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal() {
    setIsTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsTransactionModalOpen(false);
  }

  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <NewTranscationModal
        isOpen={isTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <GlobalStyle />
    </>
  );
}

export default App;
