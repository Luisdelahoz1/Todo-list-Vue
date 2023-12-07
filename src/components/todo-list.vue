<template>
  <div class="container">
    <h1>Todo-list</h1>
    <button
      class="btnAñadir"
      @click="toggleModal"
      :disabled="displayConfirmation || showModal"
    >
      Agregar Persona
    </button>

    <br />
    <br />
    <div class="dataTableContainer">
      <DataTable :value="persons">
        <Column field="firstName" header="Nombre"></Column>
        <Column field="lastName" header="Apellido"></Column>
        <Column field="age" header="Edad"></Column>
        <Column field="country" header="País"></Column>
        <Column field="gender" header="Género"></Column>
        <Column field="active" header="Activo">
          <template #body="slotProps">
            {{ slotProps.data.active.activeOptions ? "Si" : "No " }}
          </template>
        </Column>
        <Column header="Acciones">
          <template #body="slotProps">
            <i class="pi pi-pencil" @click="editPerson(slotProps.data)"></i>
            <i class="pi pi-trash" @click="confirmDelete(slotProps.data)"></i>
          </template>
        </Column>
      </DataTable>
    </div>
    <Dialog :visible="showModal" header="Añadir Persona" @onHide="closeModal">
      <form @submit.prevent="addPerson">
        <div class="form-group">
          <label for="firstName">Nombre:</label>
          <InputText id="firstName" v-model="newPerson.firstName" required />
        </div>
        <div class="form-group">
          <label for="lastName">Apellido:</label>
          <InputText id="lastName" v-model="newPerson.lastName" required />
        </div>
        <div class="form-group">
          <label for="age">Edad:</label>
          <InputNumber id="age" v-model="newPerson.age" required />
        </div>
        <div class="form-group">
          <label for="gender">Género:</label>
          <RadioButton
            v-model="newPerson.gender"
            value="Masculino"
            label="Masculino"
            required
          />
          Masculino
          <RadioButton
            v-model="newPerson.gender"
            value="Femenino"
            label="Femenino"
            required
          />
          Femenino
        </div>
        <div class="form-group">
          <label for="country">Selector de países:</label>
          <Dropdown
            id="country"
            v-model="newPerson.country"
            :options="countries"
            required
            placeholder="Seleccione un estado"
          />
        </div>
        <div class="form-group">
          <label for="active">Estado:</label>
          <Dropdown
            v-model="newPerson.active"
            :options="activeOptions"
            optionLabel="label"
            placeholder="Seleccione un estado"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="!isFormValid"
          class="buttonAgregar"
          :class="{ 'disabled-button': !isFormValid }"
        >
          Guardar
        </button>
      </form>
    </Dialog>

    <ConfirmDialog />
    <Toast />
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.btnAgregar {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  margin-bottom: 20px;
  cursor: pointer;
}

.dataTableContainer {
  margin-top: 20px;
}

.pi {
  font-size: 1.5em;
  cursor: pointer;
  margin-right: 10px;
}

.form-group {
  margin-bottom: 20px;
}

.buttonGuardar {
  background-color: #2838c6;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.buttonGuardar:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.disabled-button {
  opacity: 0.5;
  cursor: not-allowed;
  width: 100%;
}

select {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  appearance: none;
  cursor: pointer;
}
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 60%;
  max-width: 400px;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.btnAñadir {
  width: 15%;
  padding: 10px;
  box-sizing: border-box;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #4caf50;
  color: white;
}

.disabled-button {
  opacity: 0.5;
  cursor: not-allowed;
  width: 100%;
}

button {
  background: #2838c6;
  color: #ffffff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #2838c6;
}

form {
  display: grid;
  justify-content: center;
  align-items: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select,
button,
.radio-group {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.radio-group {
  display: flex;
  justify-content: space-between;
}

input[type="checkbox"] {
  width: auto;
}

.p-dropdown {
  display: inline-flex;
  cursor: pointer;
  position: relative;
  user-select: none;
  width: 100%;
}
</style>

<script src="./PersonaTabla.vue"></script>
