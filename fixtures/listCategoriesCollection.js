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
      { id: 1, title: 'New Arrivals', name: 'new' },
      { id: 2, title: 'Featured', name: 'featured' },
    ],
  products: [
    { id: 1, title: 'Beds', name: 'beds' },
    { id: 2, title: 'Sofas', name: 'sofas' },
    { id: 3, title: 'Tables & desks', name: 'tables' },
    { id: 4, title: 'Chairs', name: 'chairs' },
  ],
  sort: [
    {
      id: 1,
      title: 'Trending',
      name: 'trending',
    },
    {
      id: 2,
      title: 'Latest arrivals',
      name: 'latestArrivals',
    },
    {
      id: 3,
      title: 'Price: Low to high',
      name: 'lowToHigh',
    },
    {
      id: 4,
      title: 'Price: High to low',
      name: 'highToLow',
    },
  ],
  material: [
    { id: 1, title: 'Fabric', name: 'fabric' },
    { id: 2, title: 'Wood', name: 'wood' },
    { id: 3, title: 'Metal', name: 'metal' },
    { id: 4, title: 'Glass', name: 'glass' },
  ],
};

export default listCategoriesCollection;
