import {
  Routes,
  Route,
} from 'react-router-dom';

import HomePage from './HomePage';
import LoginPage from './Login/LoginPage';
import NotFoundPage from './NotFoundPage';

export default function App() {
  return (
    <>
      <div>Header</div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <div>Footer</div>
    </>
  );
}
