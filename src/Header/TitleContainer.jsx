import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

const Logo = styled.div({
  fontSize: '25px',
});

const LogoScale = styled.div({
  transition: 'transform 0.5s ease-out',
  ':hover': {
    transform: 'scale(1.3)',
  },
});

const List = styled.ul({
  display: 'flex',
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
  function handleClick() {
    return (event) => {
      event.preventDefault();
      onClickCategories(event.currentTarget.pathname);
    };
  }

  return (
    <Container>
      <a
        href="/"
        onClick={handleClick()}
      >
        <Logo>
          <LogoScale>
            <FontAwesomeIcon
              className="logo"
              title="chair"
              icon={faChair}
              color="#EAEAEA"
            />
          </LogoScale>
        </Logo>
      </a>
      <List>
        {[
          { path: '/search', title: 'All' },
          { path: '/search/new', title: 'New Arrivals' },
          { path: '/search/featured', title: 'Featured' },
        ].map((item) => (
          <Item>
            <a
              href={item.path}
              onClick={handleClick()}
            >
              {item.title}
            </a>
          </Item>
        ))}
      </List>
    </Container>
  );
}
