import styled from '@emotion/styled';

import {
  Routes,
  Route,
} from 'react-router-dom';

import HomePage from './HomePage/HomePage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import FooterPage from './Footer/FooterPage';
import HeaderPage from './Header/HeaderPage';
import ListPage from './List/ListPage';
import ProductDetailPage from './List/ProductDetailPage';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '950px',
  minHeight: '100vh',
  paddingTop: '74px',
});

export default function App() {
  return (
    <Container>
      <HeaderPage />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="search/*" element={<ListPage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <FooterPage />
    </Container>
  );
}
