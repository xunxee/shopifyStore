const listCategoriesCollection = {
  initialCategoryList: {
    product: '',
    category: '',
    sort: '',
    material: '',
  },
  url: {
    pathnames: ['product', 'category'],
    searches: ['sort', 'material'],
  },
  headerCategories: [
    { title: 'All', name: 'all' },
    { title: 'New Arrivals', name: 'new' },
    { title: 'Featured', name: 'featured' },
  ],
  categories: {
    title: 'All Categories',
    belong: 'category',
    data: [
      { subHeading: 'New Arrivals', value: 'new' },
      { subHeading: 'Featured', value: 'featured' },
    ],
  },
  products: {
    title: 'All Products',
    belong: 'product',
    data: [
      { subHeading: 'Beds', value: 'beds' },
      { subHeading: 'Sofas', value: 'sofas' },
      { subHeading: 'Tables & desks', value: 'tables' },
      { subHeading: 'Chairs', value: 'chairs' },
    ],
  },
  sort: {
    title: 'Sort',
    belong: 'sort',
    data: [
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
  },
  material: {
    title: 'Material',
    belong: 'material',
    data: [
      { subHeading: 'Fabric', value: 'fabric' },
      { subHeading: 'Wood', value: 'wood' },
      { subHeading: 'Metal', value: 'metal' },
      { subHeading: 'Glass', value: 'glass' },
    ],
  },
};

export default listCategoriesCollection;
