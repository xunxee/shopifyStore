import styled from '@emotion/styled';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
});

const Logo = styled.div({
  position: 'absolute',
  top: '-25%',
  left: 0,
  fontSize: '25px',
  transitionDuration: '0.3s',
  ':hover': {
    fontSize: '28px',
  },
});

const List = styled.ul({
  display: 'flex',
  paddingLeft: '20px',
});

const Item = styled.li({
  '& a': {
    marginLeft: '24px',
    fontSize: '18px',
    textDecoration: 'none',
    color: '#888888',
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
        <Logo>
          <FontAwesomeIcon
            className="logo"
            title="chair"
            icon={faChair}
            color="#EAEAEA"
          />
        </Logo>
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
