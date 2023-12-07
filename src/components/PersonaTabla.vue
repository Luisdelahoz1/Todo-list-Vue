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
      active: null,
    });

    const countries = ["Colombia", "Brasil", "Chile", "Argentina"];

    const activeOptions = [
      { label: "Activo", activeOptions: true },
      { label: "Inactivo", activeOptions: false },
    ];

    const isFormValid = computed(() => {
      return isPersonValid();
    });

    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      resetForm();
      editModeIndex.value = -1;
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
        const existingPersonIndex = persons.value.findIndex(
          (p) => p.id === newPerson.value.id
        );

        if (existingPersonIndex !== -1) {
          persons.value.splice(existingPersonIndex, 1, { ...newPerson.value });
          showToast("success", "Éxito", "Persona editada correctamente");
        } else {
          const id = Math.floor(Math.random() * 1000);
          const newPersonData = { id, ...newPerson.value };
          persons.value.push(newPersonData);
          showToast("success", "Éxito", "Persona agregada correctamente");
        }

        resetForm();
        showModal.value = false;
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

    const editPerson = (person) => {
      newPerson.value = { ...person };
      showModal.value = true;
    };

    const removePerson = (person) => {
      const index = persons.value.findIndex((p) => p.id === person.id);
      if (index !== -1) {
        persons.value.splice(index, 1);
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
      const isGenderValid = newPerson.value.gender !== null;
      const isActiveValid = newPerson.value.active !== null;

      return (
        isFirstNameValid &&
        isLastNameValid &&
        isCountryValid &&
        isAgeValid &&
        isGenderValid &&
        isActiveValid
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
      editPerson,
    };
  },
};
</script>
