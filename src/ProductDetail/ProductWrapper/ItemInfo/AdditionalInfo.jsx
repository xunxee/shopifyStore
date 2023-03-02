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

const StyledCollapseHeader = styled.div(({ isCareModalOpen }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  '& div': {
    marginRight: '.75rem',
    transition: 'all .3s',
    transform: isCareModalOpen ? 'rotate(90deg)' : '',
  },
  '& span': {
    lineHeight: '1.5rem',
    fontWeight: '500',
  },
}));

const StyledCollapseContent = styled.div(({ isCareModalOpen }) => ({
  overflow: 'hidden',
  height: isCareModalOpen ? '60px' : 0,
  opacity: isCareModalOpen ? 1 : 0,
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
    isCareModalOpen,
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
          isCareModalOpen={isCareModalOpen}
          onClick={() => handleClick(name)}
        >
          <div>
            <FontAwesomeIcon icon={faGreaterThan} size="xs" />
          </div>
          <span>Care</span>
        </StyledCollapseHeader>
        <StyledCollapseContent isCareModalOpen={isCareModalOpen}>
          <div>{care}</div>
        </StyledCollapseContent>
      </StyledCollapseRoot>
    </Wrapper>
  );
}
