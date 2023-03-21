import MarqueeWrapper from './MarqueeWrapper';

export default function AutoSlide({ productList }) {
  return (
    <>
      <MarqueeWrapper productList={productList} />
      <MarqueeWrapper productList={productList} />
    </>
  );
}
