export default function ItemCard(
  { product: { title, price, img } },
) {
  return (
    <div>
      <div>
        <h3>
          {title}
        </h3>
        <span>{price}</span>
      </div>
      <div>
        <img alt={title} src={img} width="200px" />
      </div>
    </div>
  );
}
