export default function DetailOptionButton({ sizes }) {
  return (
    <div>
      {sizes.map((size) => (
        <button
          type="button"
          key={size}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
