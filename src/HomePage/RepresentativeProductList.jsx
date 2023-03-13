import MainProduct from './RepresentativeProductList/MainProduct';
import SecondaryProduct from './RepresentativeProductList/SecondaryProduct';

export default function RepresentativeProductList(
  { name, productList },
) {
  const { topProductList } = productList;

  const [main, ...secondary] = topProductList;

  return (
    name === 'main'
      ? (
        <>
          <MainProduct productList={main} />
          <SecondaryProduct productList={secondary} />
        </>
      )
      : (
        <>
          <SecondaryProduct productList={secondary} />
          <MainProduct productList={main} />
        </>
      )
  );
}
