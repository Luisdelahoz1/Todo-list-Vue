<script>
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import RadioButton from "primevue/radiobutton";
import Dropdown from "primevue/dropdown";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import Dialog from "primevue/dialog";

export default {
  components: {
    InputText,
    InputNumber,
    RadioButton,
    Dropdown,
    DataTable,
    Column,
    ConfirmDialog,
    Dialog,
  },

  setup() {
    const toast = useToast();
    const confirm = useConfirm();
    const displayConfirmation = ref(false);
    const showModal = ref(false);
    const personToDelete = ref(null);

    const persons = ref([]);

    const newPerson = ref({
      firstName: "",
      lastName: "",
      country: "",
      age: null,
      gender: "Masculino",
      active: true,
    });

    const countries = ["Colombia", "Brasil", "Chile", "Argentina"];
    const activeOptions = [
      { label: "Activo", value: true },
      { label: "Inactivo", value: false },
    ];

    const isFormValid = computed(() => {
      return isPersonValid();
    });

    const closeModal = () => {
      showModal.value = false;
    };

    const showToast = (severity, summary, detail) => {
      toast.add({
        severity,
        summary,
        detail,
        life: 3000,
      });
    };

    const addPerson = () => {
      if (isFormValid.value) {
        const id = Math.floor(Math.random() * 1000);
        const newPersonData = { id, ...newPerson.value };
        persons.value.push(newPersonData);
        showToast("success", "Éxito", "Persona agregada correctamente");
        showModal.value = false;
        resetForm();
      } else {
        showToast("error", "Error", "Por favor, complete todos los campos.");
      }
    };

    const confirmDelete = (index) => {
      personToDelete.value = persons.value[index];
      confirm.require({
        message: "¿Estás seguro de que quieres eliminar este usuario?",
        header: "Confirmación",
        icon: "pi pi-info-circle",
        rejectClass: "p-button-text p-button-text",
        acceptClass: "p-button-danger p-button-text",
        accept: () => {
          deletePerson(index);
        },
        reject: () => {
          personToDelete.value = null;
          toast.add({
            severity: "warn",
            summary: "Cancelado",
            detail: "Eliminación cancelada",
            life: 1500,
          });
        },
      });
    };

    const deletePerson = (index) => {
      if (index !== 1) {
        persons.value.splice(index, 1);
        showToast("success", "Éxito", "Persona eliminada correctamente");
        personToDelete.value = null;
      }
    };

    const toggleModal = () => {
      showModal.value = !showModal.value;
    };

    const isPersonValid = () => {
      const isFirstNameValid = newPerson.value.firstName.trim() !== "";
      const isLastNameValid = newPerson.value.lastName.trim() !== "";
      const isCountryValid = newPerson.value.country.trim() !== "";
      const isAgeValid = newPerson.value.age !== null;

      return (
        isFirstNameValid && isLastNameValid && isCountryValid && isAgeValid
      );
    };

    const resetForm = () => {
      newPerson.value = {
        firstName: "",
        lastName: "",
        country: "",
        age: null,
        gender: "Masculino",
        active: newPerson.value.active,
      };
    };

    return {
      newPerson,
      isFormValid,
      resetForm,
      showToast,
      showModal,
      toggleModal,
      countries,
      activeOptions,
      displayConfirmation,
      addPerson,
      closeModal,
      deletePerson,
      persons,
      personToDelete,
      confirmDelete,
    };
  },
};
</script>
