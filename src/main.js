import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Button from "primevue/button";
import Checkbox from 'primevue/checkbox';
import  Dialog  from 'primevue/dialog';
import  InputText  from 'primevue/inputtext';
import  InputNumber  from 'primevue/inputnumber';
import  RadioButton  from 'primevue/radiobutton';
import  Dropdown  from 'primevue/dropdown';
import  DataTable  from 'primevue/datatable';
import Column  from 'primevue/column';


import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(router);
app.use(PrimeVue);

app.component('Button', Button);
app.component('Checkbox', Checkbox);
app.component('DataTable', DataTable);
app.component('Column', Column);

app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('RadioButton', RadioButton);
app.component('Dropdown', Dropdown);
app.component('Dialog', Dialog);

app.mount('#app')
