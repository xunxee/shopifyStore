import styled from '@emotion/styled';

const Wrapper = styled.div({
  gridColumn: '11 / span 2',
  '& button': {
    border: '0',
    fontSize: '16px',
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
});

export default function FooterTopInfo() {
  return (
    <Wrapper>
      <button type="button">GitHub</button>
    </Wrapper>
  );
}
