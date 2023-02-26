export default function Review(
  { evaluation: { starRating, review } },
) {
  return (
    <>
      <div>{starRating}</div>
      <div>{review.length}</div>
    </>
  );
}
