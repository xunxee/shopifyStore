import styled from '@emotion/styled';

import { useCallback } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div({
  marginTop: '1.5rem',
  cursor: 'pointer',
});

const StyledCollapseRoot = styled.div({
  padding: '1rem 0',
  borderBottom: '1px solid #eaeaea',
});

const StyledCollapseHeader = styled.div(({ isInfoOpen }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  '& div': {
    marginRight: '.75rem',
    transition: 'all .3s',
    transform: isInfoOpen ? 'rotate(90deg)' : '',
  },
  '& span': {
    lineHeight: '1.5rem',
    fontWeight: '500',
  },
}));

const StyledCollapseContent = styled.div(({ isInfoOpen }) => ({
  overflow: 'hidden',
  height: isInfoOpen ? '60px' : 0,
  opacity: isInfoOpen ? 1 : 0,
  transition: 'all .3s',
  '& div': {
    paddingTop: '.75rem',
    paddingLeft: '2rem',
  },
}));

export default function AdditionalInfo(
  {
    name,
    title,
    product,
    isInfoOpen,
    onClickAdditionalInfo,
  },
) {
  const content = product[name];

  const handleClick = useCallback((category) => {
    onClickAdditionalInfo(category);
  }, [onClickAdditionalInfo]);

  return (
    <Wrapper>
      <StyledCollapseRoot>
        <StyledCollapseHeader
          isInfoOpen={isInfoOpen}
          onClick={() => handleClick(name)}
        >
          <div>
            <FontAwesomeIcon icon={faGreaterThan} size="xs" />
          </div>
          <span>{title}</span>
        </StyledCollapseHeader>
        <StyledCollapseContent isInfoOpen={isInfoOpen}>
          <div>{content}</div>
        </StyledCollapseContent>
      </StyledCollapseRoot>
    </Wrapper>
  );
}
