<template>
    <div>
      <h1>Todo-list</h1>
      <button class="buttonAgregar" @click="toggleModal">Agregar Persona</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>País</th>
            <th>Género</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(person, index) in persons" :key="index">
            <td>{{ person.firstName }}</td>
            <td>{{ person.lastName }}</td>
            <td>{{ person.age }}</td>
            <td>{{ person.country }}</td>
            <td>{{ person.gender }}</td>
            <td>{{ person.active ? 'Sí' : 'No' }}</td>
            <td>
              <button @click="removePerson(index)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="toggleModal">&times;</span>
        <h2>Añadir Persona</h2>
        <form @submit.prevent="addPerson">
          <div class="form-group">
            <label for="firstName">Nombre:</label>
            <input id="firstName" v-model="newPerson.firstName" required />
          </div>
          <div class="form-group">
            <label for="lastName">Apellido:</label>
            <input id="lastName" v-model="newPerson.lastName" required />
          </div>
          <div class="form-group">
            <label for="age">Edad:</label>
            <input type="number" id="age" v-model="newPerson.age" required />
          </div>
          <div class="form-group">
            <label for="gender">Género:</label>
            <div class="radio-group">
              <input type="radio" id="male" v-model="newPerson.gender" value="Masculino" required />
              <label for="male">Masculino</label>
              <input type="radio" id="female" v-model="newPerson.gender" value="Femenino" required />
              <label for="female">Femenino</label>
            </div>
          </div>
          <div class="form-group">
            <label for="country">Selector de países:</label>
            <select id="country" v-model="newPerson.country" required>
              <option value="Colombia">Colombia</option>
              <option value="Brasil">Brasil</option>
              <option value="Chile">Chile</option>
              <option value="Argentina">Argentina</option>
            </select>
          </div>
          <div class="form-group">
      <label for="active">Estado:</label>
      <select id="active" v-model="newPerson.active" required>
        <option value="true">Activo</option>
        <option value="false">Inactivo</option>
      </select>
    </div>
    <button type="submit">Agregar Persona</button>
  </form>
      </div>
    </div>
  </template>
  
 
  
  <style scoped>

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

  .buttonAgregar{
    width: 17%;
    padding: 10px;
    box-sizing: border-box
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  th {
    background-color: #4caf50;
    color: white;
  }
  
  button {
    background-color: #e53935;
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  button:hover {
    background-color: #c62828;
  }
  
  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin-top: 10px;
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
  </style>  
  

<script src="./PersonaTabla.vue"></script>
