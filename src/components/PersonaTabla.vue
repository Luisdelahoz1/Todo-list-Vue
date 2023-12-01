<script>
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import Dialog from "primevue/dialog";

export default {
  components: {
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
    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      console.log("Cerrando modal");
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

    const confirmDelete = (person) => {
      showConfirmDialog(person);
    };

    const showConfirmDialog = (person) => {
      if (
        confirm.require({
          message: `¿Seguro desea eliminar a  ${person.firstName} ? `,
          header: "Confirmación",
          icon: "pi pi-info-circle",
          rejectClass: "p-button-text p-button-text",
          acceptClass: "p-button-danger p-button-text",
          accept: () => {
            toast.add({
              severity: "info",
              summary: "Confirmacion",
              detail: " Eliminacion correcta",
              life: 1500,
            });

            removePerson(person);
          },

          reject: () => {
            toast.add({
              severity: "error",
              summary: "Error",
              detail: "Usuaro no eliminado",
              life: 3000,
            });
          },
        })
      ) {
      }
    };

    const removePerson = (person) => {
      if (person !== -1) {
        persons.value.splice(person, 1);
        personToDelete.value = null;
        showModal.value = false;
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
      openModal,
      persons,
      personToDelete,
      confirmDelete,
      showConfirmDialog,
      removePerson,
    };
  },
};
</script>
