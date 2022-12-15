import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

import LIST_CATEGORIES from '../../fixtures/listCategoriesCollection';

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
    '&:focus': {
      color: '#FFF',
    },
    '&:hover': {
      color: '#FFF',
    },
  },
});

export default function TitleBar({ onClick }) {
  function handleClick() {
    return (event) => {
      event.preventDefault();
      onClick({
        url: event.currentTarget.pathname,
        name: event.currentTarget.name,
      });
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
        {LIST_CATEGORIES.headerCategories.map(({
          title, name, path,
        }) => (
          <Item
            key={title}
          >
            <a
              name={name}
              href={path}
              onClick={handleClick()}
            >
              {title}
            </a>
          </Item>
        ))}
      </List>
    </Container>
  );
}
