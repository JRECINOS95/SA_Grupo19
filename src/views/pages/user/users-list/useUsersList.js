import { ref, watch, computed } from '@vue/composition-api';

// Notification
import { useToast } from 'vue-toastification/composition';

export default async function useUsersList() {
  // Use toast
  const toast = useToast();

  const refUserListTable = ref(null);

  // Table Handlers
  const tableColumns = [
    { key: 'primer_nombre', sortable: true, visible: true },
    { key: 'primer_apellido', sortable: true, visible: true },
    { key: 'username', sortable: true },
    { key: 'rol', sortable: true },
    { key: 'actions' },
  ];
  const perPage = ref(10);
  const totalUsers = ref(0);
  const currentPage = ref(1);
  const perPageOptions = [10, 25, 50, 100];
  const searchQuery = ref('');
  const sortBy = ref('id');
  const isSortDirDesc = ref(true);
  const roleFilter = ref(null);
  const planFilter = ref(null);
  const statusFilter = ref(null);

  const dataMeta = computed(() => {
    const localItemsCount = refUserListTable.value ? refUserListTable.value.localItems.length : 0;
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalUsers.value,
    };
  });

  const refetchData = () => {
    refUserListTable.value.refresh();
  };

  const resolveUserStatusVariant = (status) => {
    if (status === 'PENDIENTE') return 'warning';
    if (status === 'ACTIVO') return 'success';
    if (status === 'INACTIVO') return 'secondary';
    return 'primary';
  };

  watch([currentPage, perPage, searchQuery, roleFilter, planFilter, statusFilter], () => {
    refetchData();
  });

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveUserRoleVariant = (role) => {
    if (role === 'ADMINISTRADOR') return 'primary';
    if (role === 'EDITORIAL') return 'warning';
    if (role === 'CLIENTE') return 'success';
    
    return 'primary';
  };

  const resolveUserRoleIcon = (role) => {
    if (role === 'ADMINISTRADOR') return 'UserIcon';
    
    if (role === 'EDITORIAL') return 'SettingsIcon';
    
    if (role === 'CLIENTE') return 'DatabaseIcon';
    return 'UserIcon';
  };

  return {
    tableColumns,
    perPage,
    currentPage,
    totalUsers,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refUserListTable,
    resolveUserStatusVariant,
    resolveUserRoleVariant,
    resolveUserRoleIcon,
    refetchData,

    // Extra Filters
    roleFilter,
    planFilter,
    statusFilter,
  };
}
