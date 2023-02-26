<template>
  <h1>Empresta Mais</h1>

  <row class="row">
    <label class="inputs" for="valor_emprestimo">Valor do Empréstimo</label>
    <InputNumber
      class="inputs"
      id="valor_emprestimo"
      tpe="number"
      v-model="valor_emprestimo"
      mode="currency"
      currency="BRL"
      locale="pt-br"
    />

    <MultiSelect
      class="inputs"
      v-model="selectedInstituicao"
      :options="instituicoes"
      optionLabel="chave"
      optionValue="valor"
      placeholder="Selecione a(as) Instituição(ões)"
    />
    <MultiSelect
      class="inputs"
      v-model="selectedConvenio"
      :options="convenio"
      optionLabel="chave"
      optionValue="valor"
      placeholder="Selecione o(s) Convênio(os)"
    />

    <Dropdown-Parcelas
      class="inputs"
      v-model="selectedParcela"
      :options="parcelas"
      optionLabel="name"
      optionValue="code"
      placeholder="Selecione a Parcela"
    ></Dropdown-Parcelas>
    <Button-prime class="inputs" v-on:click="simular" label="Simular" />
  </row>
  <div>
    <div v-for="dados in dataTable" :key="dados.chave">
      <ul>
        <li>Instituição: {{ dados.instituicao }}</li>
        <li>Valor Solicitado: {{this.valor_emprestimo }}</li>
        <li>Parcelas: {{ dados.parcelas}} X R$ {{ dados.valor_parcela||currency }}</li>
        <li>Convênio: {{ dados.convenio }}</li>
        <hr>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

export default {
  data() {
    return {
      selectedInstituicao: null,
      instituicoes: [],

      selectedConvenio: null,
      convenio: [],

      selectedParcela: null,
      parcelas: [
        { name: "36", code: "36" },
        { name: "48", code: "48" },
        { name: "60", code: "60" },
        { name: "72", code: "72" },
        { name: "84", code: "84" },
      ],
      teste:null,
      dataTable: [],
      valor_emprestimo: 0,
    };
  },

  methods: {
    getConvenio() {
      axios.get("http://localhost:8000/api/convenio").then((respostaConvenio) =>{''
        this.convenio = respostaConvenio.data;
      }).catch((error) =>{
        console.log(error);
      })
    },
    // getConvenio() {
    //   axios
    //     .get("http://localhost:3001/convenios")
    //     .then((respostaConvenio) => {
    //       this.convenio = respostaConvenio.data;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

    getInstituicao(){
      axios.get("http://localhost:8000/api/instituicao",{headers}).then((res) =>{
        this.instituicoes = respostaInstituicao.data;
      }).catch((error) =>{
        console.log(error);
      })
    },
    // getInstituicao() {
    //   axios
    //     .get("http://localhost:3001/instituicoes", { headers })
    //     .then((respostaInstituicao) => {
    //       this.instituicoes = respostaInstituicao.data;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

    simular(){
      const dados = {"valor_emprestimo": this.valor_emprestimo, "instituicoes": this.instituicao,"convenio": this.convenio,"parcela": this.parcela};
      axios.post("http://localhost:8000/api/simular", dados).then((res) =>{
        let data= respostaSimualcao.data;
        const newData = [];

        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const array = data[key];
            const objArray = array.map(obj => ({...obj, instituicao: key}));
            newData.push(...objArray);
          }
        }

      this.dataTable = newData;

      }).catch((error) =>{
        console.log(error);
      })
    }
    
    // simular() {
    //   axios
    //     .get("http://localhost:3001/taxas_instituicoes")
    //     .then((respostaSimualcao) => {
    //       let data= respostaSimualcao.data;
    //     // let data = {"BMG":[{"taxa":2.05,"parcelas":72,"valor_parcela":390.6,"convenio":"INSS"}],"PAN":[{"taxa":2.08,"parcelas":72,"valor_parcela":426.45,"convenio":"INSS"}]};
    //     const newData = [];

    //     for (const key in data) {
    //       if (Object.prototype.hasOwnProperty.call(data, key)) {
    //         const array = data[key];
    //         const objArray = array.map(obj => ({...obj, instituicao: key}));
    //         newData.push(...objArray);
    //       }
    //     }

    //     this.dataTable = newData;

    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
  },


  mounted() {
    this.getConvenio();
    this.getInstituicao();
  },
};
</script>

<style>
.inputs {
  margin-left: 10px;
  margin-top: 10px;
  text-align: center;
}
ul {
  list-style: none;
}
button {
  margin-left: 10px !important;
  margin-top: 10px !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
