import React from 'react';
import ReactDOM from 'react-dom/client';

import { Editor } from '@/components/Editor';

import './userWorker';

import './styles.module.scss';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <h1>Monaco Editor For React Vite</h1>
    <Editor />
  </React.StrictMode>
);
