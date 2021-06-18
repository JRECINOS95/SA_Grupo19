import { ref } from '@vue/composition-api';
import store from '@/store';

export const useShopFiltersSortingAndPagination = () => {
  const filters = ref({
    q: '',
    priceRangeDefined: 'all',
    priceRange: [0, 100],
    categories: [],
    brands: [],
    ratings: null,
    page: 1,
    perPage: 9,
  });
  

  const filterOptions = {
    priceRangeDefined: [
      { text: 'Todos', value: 'all' },
      { text: '<= Q10', value: '<=10' },
      { text: 'Q10 - Q100', value: '10-100' },
      { text: 'Q100 - Q500', value: '100-500' },
      { text: '>= Q500', value: '>=500' },
    ],
    categories: [
      'Novela',
      'Fábula',
      'Cuento',
      'Mito',
      'Leyenda',
      'Poema',
      'Épico',
      'Oda',
      'Tragedia',
      'Comedia',
    ],
  };
  

  // Sorting
  const sortBy = ref({ text: 'Featured', value: 'featured' });
  const sortByOptions = [
    { text: 'Featured', value: 'featured' },
    { text: 'Lowest', value: 'price-asc' },
    { text: 'Highest', value: 'price-desc' },
  ];

  return {
    // Filter
    filters,
    filterOptions,

    // Sort
    sortBy,
    sortByOptions,
  };
};

export const useShopUi = () => {
  const itemView = 'grid-view';
  const itemViewOptions = [
    { icon: 'GridIcon', value: 'grid-view' },
    { icon: 'ListIcon', value: 'list-view' },
  ];

  // Pagination count <= required by pagination component
  const totalProducts = ref(null);

  
  return {
    itemView,
    itemViewOptions,
    totalProducts,
  };
};
