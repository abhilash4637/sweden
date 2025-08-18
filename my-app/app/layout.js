// app/layout.js
'use client';
import Header from './components/Header';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import { store } from '../redux/store'

import '../styles/global.scss';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}

