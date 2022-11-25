import styled from '@emotion/styled';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const List = styled.ul({
  display: 'flex',
});

const Item = styled.li({
  '& a': {
    color: '#888888',
    marginLeft: '24px',
    fontSize: '18px',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      color: '#FFFFFF',
      transition: 'color 300ms ease-in-out',
    },
  },
});

export default function TitleContainer() {
  return (
    <Container>
      <Link to="/">
        <FontAwesomeIcon
          title="chair"
          icon={faChair}
          size="2x"
          color="#EAEAEA"
        />
      </Link>
      <List>
        <Item>
          <Link to="/search">All</Link>
        </Item>
        <Item>
          <Link to="/search/new">New Arrivals</Link>
        </Item>
        <Item>
          <Link to="/search/featured">Featured</Link>
        </Item>
      </List>
    </Container>
  );
}
