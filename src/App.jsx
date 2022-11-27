import styled from '@emotion/styled';

import {
  Routes,
  Route,
} from 'react-router-dom';

import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import FooterPage from './Footer/FooterPage';
import HeaderPage from './Header/HeaderPage';
import ListPage from './List/ListPage';

const Container = styled.div({
  minWidth: '950px',
  minHeight: '100vh',
  paddingTop: '74px',
});

export default function App() {
  return (
    <Container>
      <HeaderPage />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<ListPage />} />
        <Route path="/search/new" element={<ListPage />} />
        <Route path="/search/featured" element={<ListPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <FooterPage />
    </Container>
  );
}
