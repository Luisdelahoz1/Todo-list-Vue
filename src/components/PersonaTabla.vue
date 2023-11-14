<script>

export default {
  data() {
    return {
      persons: [],
      newPerson: {
        firstName: '',
        lastName: '',
        country: '',
        age: null,
        gender: 'Masculino',
        active: false,
      },
      showModal: false,
    };
  },
  methods: {

    toggleModal() {
      this.showModal = !this.showModal;
    },

    closeModal() {
      this.showModal = false;
    },

    addPerson() {
      if (this.isPersonValid()) {
        this.persons.push({ ...this.newPerson });
        this.resetForm();
        this.closeModal();
      }
    },

    removePerson(index) {
      this.persons.splice(index, 1);
    },

    isPersonValid() {
      return (
        this.newPerson.firstName.trim() !== '' &&
        this.newPerson.lastName.trim() !== '' &&
        this.newPerson.country.trim() !== '' &&
        this.newPerson.age !== null
      );
    },

    resetForm() {
      this.newPerson = {
        firstName: '',
        lastName: '',
        country: '',
        age: null,
        gender: 'Masculino',
        active: false,
      };
    },
  },
};

</script>