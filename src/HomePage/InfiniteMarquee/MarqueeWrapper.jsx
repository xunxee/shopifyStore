export default function MarqueeWrapper({ productList }) {
  return (
    <div>
      {productList.map(({
        id, title, mainImage,
      }) => (
        <a key={id} href={`product/${id}`}>
          <div>
            <span>{title}</span>
          </div>
          <img src={mainImage} alt={title} />
        </a>
      ))}
    </div>
  );
}
