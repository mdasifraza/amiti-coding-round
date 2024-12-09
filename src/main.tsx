import React from 'react';
import ReactDOM from 'react-dom/client';
import { WrappedApp } from './App';
import './index.css';
import Vehicle from './Vehicle';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <WrappedApp /> */}
    <Vehicle />
  </React.StrictMode>
);
