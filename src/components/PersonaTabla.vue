<script>

import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import RadioButton from 'primevue/radiobutton';
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  components: {
    InputText,
    InputNumber,
    RadioButton,
    Dropdown,
    DataTable,
    Column,
  },

  setup() {
  const persons = ref([]);
  const newPerson = ref({
    firstName: '',
    lastName: '',
    country: '',
    age: null,
    gender: 'Masculino',
    active: false,
  });

 

  const showModal = ref(false);
  const countries = ['Colombia', 'Brasil', 'Chile', 'Argentina'];

  const activeOptions = ref([
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false },
  ]);

  const toggleModal = () => {
    showModal.value = !showModal.value;
  };

  const closeModal = () => {
    showModal.value = false;
  };

  const addPerson = () => {
    if (isPersonValid()) {
      persons.value.push({ ...newPerson.value });
      resetForm();
      closeModal();
    }
  };

  const removePerson = (index) => {
    persons.value.splice(index, 1);
  };

  const isPersonValid = () => {
    return (
      newPerson.value.firstName.trim() !== '' &&
      newPerson.value.lastName.trim() !== '' &&
      newPerson.value.country.trim() !== '' &&
      newPerson.value.age !== null
    );
  };

  const resetForm = () => {
  newPerson.value = {
    firstName: '',
    lastName: '',
    country: '',
    age: null,
    gender: 'Masculino',
    active: false,
  };
};

  return {
    persons,
    newPerson,
    showModal,
    countries,
    toggleModal,
    closeModal,
    activeOptions,
    addPerson,
    removePerson,
    isPersonValid,
    resetForm,

    };
  },
}
</script>