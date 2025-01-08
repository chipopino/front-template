import React from 'react';
import ReactDOM from 'react-dom/client';
import { ContextProvider } from 'components/Context';
import Modal from 'components/Modal';
import Main from './components/Main';
import Loader from './components/Loader';
import { cn } from 'methodes/global';
import './index.css';

function App() {
  return <div className={cn(
    'overflow-hidden w-screen h-screen',
    'bg-background flex flex-col'
  )}>
    <ContextProvider>
      <Modal />
      <Main />
      <Loader/>
    </ContextProvider>
  </div>

};

//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);