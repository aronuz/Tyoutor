<template>
  <ui-button @click="addAreaRow">Add More</ui-button>
  <form @submit.prevent="submitForm">
    <div class="actions" ref="area-rows">
      <AreaRow
        v-for="index in inputCount"
        :key="index"
        :ix="index"
        :area-id="'newArea_' + index"
      />
      <ui-button v-show="formIsValid">Save</ui-button>
    </div>
  </form>
</template>

<script>
import AreaRow from "./AreaRow.vue";

export default {
  components: {
    AreaRow,
  },
  emits: ["add-area"],
  data() {
    return {
      areaList: [],
      formIsValid: false,
    };
  },
  computed: {
    inputCount() {
      return document.querySelectorAll(".form-control").length;
    },
  },
  methods: {
    addToList(e) {
      const e_target = e.target;
      const area = e_target.value;
      const self = this;
      if (
        area !== null &&
        area.trim().length > 0 &&
        (this.areaList.length === 0 || !this.areaList.includes(area.trim()))
      ) {
        this.areaList.push(area.trim());
        this.formIsValid = true;
        e_target.disabled = true;
        e_target.insertAdjacentHTML(
          "afterend",
          `<span name="${this.areaIndex}">X</span>`
        );
        e_target.nextElementSibling.addEventListener("click", function () {
          self.areaList.splice(self.areaList.indexOf(e_target.value), 1);
          e_target.value = "";
          e_target.disabled = false;
          this.remove();
        });
      } else {
        e.target.parentNode.classList.addClass("invalid");
        this.formIsValid = false;
      }
    },
    addAreaRow() {
      this.inputCount += 1;
      // const newRow = `<div class="form-control" ref="row_${this.areaIndex}">
      //   <label for="newArea_${this.areaIndex}">New Expertise (${this.areaIndex})</label>
      //   <input type="text" id="newArea_${this.areaIndex}" v-model.trim="newArea" />
      //   </div>`;
      // ----
      // const newRow = `<areaRow :area-id="newArea_${this.areaIndex}"></areaRow>`;
      // this.$refs["area-rows"].insertAdjacentHTML("beforeend", newRow);
    },
    submitForm() {
      if (!this.formIsValid) {
        return;
      }
      this.$emit("add-area", { areaList: this.areaList });
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

.invalid label {
  color: red;
}

.invalid input {
  border: 1px solid red;
}

.actions {
  text-align: center;
}
</style>
