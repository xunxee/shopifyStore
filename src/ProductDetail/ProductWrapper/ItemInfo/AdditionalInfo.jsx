import styled from '@emotion/styled';

import { useCallback } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div({
  marginTop: '1.5rem',
});

const StyledCollapseRoot = styled.div({
  padding: '1rem 0',
  borderBottom: '1px solid #eaeaea',
});

const StyledCollapseHeader = styled.div(({ isCareInfoOpen }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  '& div': {
    marginRight: '.75rem',
    transition: 'all .3s',
    transform: isCareInfoOpen ? 'rotate(90deg)' : '',
  },
  '& span': {
    lineHeight: '1.5rem',
    fontWeight: '500',
  },
}));

const StyledCollapseContent = styled.div(({ isCareInfoOpen }) => ({
  overflow: 'hidden',
  height: isCareInfoOpen ? '60px' : 0,
  opacity: isCareInfoOpen ? 1 : 0,
  transition: 'all .3s',
  '& div': {
    paddingTop: '.75rem',
    paddingLeft: '2rem',
  },
}));

export default function AdditionalInfo(
  {
    name,
    product,
    isCareInfoOpen,
    onClickAdditionalInfo,
  },
) {
  const { care } = product;

  const handleClick = useCallback((category) => {
    onClickAdditionalInfo(category);
  }, [onClickAdditionalInfo]);

  return (
    <Wrapper>
      <StyledCollapseRoot>
        <StyledCollapseHeader
          isCareInfoOpen={isCareInfoOpen}
          onClick={() => handleClick(name)}
        >
          <div>
            <FontAwesomeIcon icon={faGreaterThan} size="xs" />
          </div>
          <span>Care</span>
        </StyledCollapseHeader>
        <StyledCollapseContent isCareInfoOpen={isCareInfoOpen}>
          <div>{care}</div>
        </StyledCollapseContent>
      </StyledCollapseRoot>
    </Wrapper>
  );
}
