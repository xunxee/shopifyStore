import {
  Routes,
  Route,
} from 'react-router-dom';

import HomePage from './HomePage';
import LoginPage from './LoginPage/LoginPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import FooterPage from './Footer/FooterPage';
import HeaderPage from './Header/HeaderPage';

export default function App() {
  return (
    <>
      <HeaderPage />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <FooterPage />
    </>
  );
}
