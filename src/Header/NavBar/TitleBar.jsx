import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

import LIST_CATEGORIES from '../../../fixtures/List/listCategoriesCollection';

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

      const {
        currentTarget: { pathname, name },
      } = event;

      onClick({ pathname, name });
    };
  }

  return (
    <Container>
      <a href="/" onClick={handleClick()}>
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
        {LIST_CATEGORIES.headerCategories.map(({ title, name }) => (
          <Item key={title}>
            <a
              name={name}
              href={name === 'all' ? '/search' : `/search/${name}`}
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
