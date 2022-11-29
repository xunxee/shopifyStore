import styled from '@emotion/styled';

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
  transition: '0.5s',
  ':hover': {
    transform: 'scale(1.3)',
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
    color: '#888',
    cursor: 'pointer',
    transition: 'color 300ms ease-in-out',
    '&:hover': {
      color: '#FFF',
    },
  },
});

export default function TitleContainer({
  onClickCategories,
}) {
  function handleClick(category) {
    return (event) => {
      event.preventDefault();
      onClickCategories(category);
    };
  }

  return (
    <Container>
      <a
        href="/"
        onClick={handleClick('home')}
      >
        <Logo>
          <FontAwesomeIcon
            className="logo"
            title="chair"
            icon={faChair}
            color="#EAEAEA"
          />
        </Logo>
      </a>
      <List>
        <Item>
          <a
            href="/search"
            onClick={handleClick('All')}
          >
            All
          </a>
        </Item>
        <Item>
          <a
            href="/search/new"
            onClick={handleClick('new')}
          >
            New Arrivals
          </a>
        </Item>
        <Item>
          <a
            href="/search/featured"
            onClick={handleClick('featured')}
          >
            Featured
          </a>
        </Item>
      </List>
    </Container>
  );
}
