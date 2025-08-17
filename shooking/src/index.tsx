import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';

async function startMocks() {
    const { worker } = await import('./mocks/browser');
    const base = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
    await worker.start({
        serviceWorker: { url: `${base}/mockServiceWorker.js` },
        onUnhandledRequest: 'bypass',
    });
}

startMocks().finally(() => {
    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );
    root.render(
        <React.StrictMode>
            <RecoilRoot>
                <App />
            </RecoilRoot>
        </React.StrictMode>
    );
});
