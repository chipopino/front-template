import React from 'react';
import ReactDOM from 'react-dom/client';
import { ContextProvider } from 'components/base/Context';
import Modal from 'components/base/Modal';
import Main from 'components/base/Main';
import Loader from 'components/base/Loader';
import { cn } from 'methods/global';
import './index.css';

function App() {
  return <div className={cn(
    'overflow-hidden w-full h-full',
    'bg-background flex flex-col'
  )}>
    <ContextProvider>
      <Loader />
      <Modal />
      <Main />
    </ContextProvider>
  </div>

};

//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);