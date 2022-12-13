const listCategoriesCollection = {
  headerCategories: [
    {
      title: 'All',
      name: 'all',
      path: '/search',
    },
    {
      title: 'New Arrivals',
      name: 'new',
      path: '/search/new',
    },
    {
      title: 'Featured',
      name: 'featured',
      path: '/search/featured',
    },
  ],
  categories:
    [
      { subHeading: 'New Arrivals', value: 'new' },
      { subHeading: 'Featured', value: 'featured' },
    ],
  products: [
    { subHeading: 'Beds', value: 'beds' },
    { subHeading: 'Sofas', value: 'sofas' },
    { subHeading: 'Tables & desks', value: 'tables' },
    { subHeading: 'Chairs', value: 'chairs' },
  ],
  sort: [
    {
      subHeading: 'Trending',
      value: 'trending',
    },
    {
      subHeading: 'Latest arrivals',
      value: 'latestArrivals',
    },
    {
      subHeading: 'Price: Low to high',
      value: 'lowToHigh',
    },
    {
      subHeading: 'Price: High to low',
      value: 'highToLow',
    },
  ],
  material: [
    { subHeading: 'Fabric', value: 'fabric' },
    { subHeading: 'Wood', value: 'wood' },
    { subHeading: 'Metal', value: 'metal' },
    { subHeading: 'Glass', value: 'glass' },
  ],
};

export default listCategoriesCollection;
