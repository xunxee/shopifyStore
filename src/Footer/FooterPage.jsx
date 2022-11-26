import FooterTopContainer from './FooterTopContainer';

function FooterBottomContainer() {
  return (
    <div>2022 Shopify Store, Inc. All rights reserved.</div>
  );
}

const Container = styled.div({
  zIndex: '2',
});

export default function FooterPage() {
  return (
    <>
      <FooterTopContainer />
      <FooterBottomContainer />
    </>
  );
}
