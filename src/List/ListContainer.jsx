import styled from '@emotion/styled';

import CategoryBar from './CategoryBar';
import RelevanceBar from './RelevanceBar';
import ItemPage from './ItemPage';

const Container = styled.div({
  display: 'flex',
  maxWidth: '1300px',
  minHeight: 'calc(100vh - 110px)',
  marginRight: 'auto',
  marginLeft: 'auto',
  backgroundColor: 'green',
});

export default function ListContainer() {
  return (
    <Container>
      <CategoryBar />
      <ItemPage />
      <RelevanceBar />
    </Container>
  );
}
