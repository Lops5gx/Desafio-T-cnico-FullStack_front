import { createApp } from 'vue'
import App from './App.vue'


// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import PrimeVue from "primevue/config";
import Button from 'primevue/button';
import InputText from "primevue/inputtext";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputNumber from 'primevue/inputnumber';
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';


const app = createApp(App); 
app.use(PrimeVue);


// app.use(BootstrapVue);
// app.use(IconsPlugin);
app.component('Dropdown-Parcelas', Dropdown);
app.component('MultiSelect', MultiSelect);
app.component("InputNumber", InputNumber);
app.component("Button-prime", Button);
app.component("InputText", InputText);
app.component("Data-Table", DataTable);
app.component("Column-table", Column);


app.mount('#app');
