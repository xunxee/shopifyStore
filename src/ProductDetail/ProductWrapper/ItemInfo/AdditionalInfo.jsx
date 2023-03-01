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

const StyledCollapseHeader = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  '& div': {
    marginRight: '.75rem',
  },
  '& span': {
    lineHeight: '1.5rem',
    fontWeight: '500',
  },
});

const StyledCollapseContent = styled.div({});

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
          onClick={() => handleClick(name)}
        >
          <div>
            <FontAwesomeIcon icon={faGreaterThan} size="xs" />
          </div>
          <span>Care</span>
        </StyledCollapseHeader>
        {isCareModalOpen
          ? (
            <StyledCollapseContent>
              {care}
            </StyledCollapseContent>
          )
          : null}
      </StyledCollapseRoot>
    </Wrapper>
  );
}
