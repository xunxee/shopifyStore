import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

import PALETTE from '../../styles/palette';

import LIST_CATEGORIES from '../../../fixtures/List/listCategoriesCollection';

const { dark, paleDark } = PALETTE;

const StyledWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

const StyledLogo = styled.div({
  fontSize: '25px',
});

const StyledLogoScale = styled.div({
  transition: 'transform 0.5s ease-out',
  ':hover': {
    transform: 'scale(1.3)',
  },
});

const StyledList = styled.ul({
  display: 'flex',
});

const StyledItem = styled.li({
  '& a': {
    marginLeft: '24px',
    fontSize: '18px',
    textDecoration: 'none',
    color: paleDark,
    cursor: 'pointer',
    transition: 'color 300ms ease-in-out',
    '&:focus': {
      color: dark,
    },
    '&:hover': {
      color: dark,
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
    <StyledWrapper>
      <a href="/" onClick={handleClick()}>
        <StyledLogo>
          <StyledLogoScale>
            <FontAwesomeIcon
              className="logo"
              title="chair"
              icon={faChair}
              color={dark}
            />
          </StyledLogoScale>
        </StyledLogo>
      </a>
      <StyledList>
        {LIST_CATEGORIES.headerCategories.map(({ title, name }) => (
          <StyledItem key={title}>
            <a
              name={name}
              href={name === 'all' ? '/search' : `/search/${name}`}
              onClick={handleClick()}
            >
              {title}
            </a>
          </StyledItem>
        ))}
      </StyledList>
    </StyledWrapper>
  );
}
