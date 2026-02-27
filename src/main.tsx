import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#3b82f6',
          colorBgContainer: '#0f172a',
          colorBgElevated: '#1e293b',
          borderRadius: 12,
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
