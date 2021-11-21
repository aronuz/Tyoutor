<template>
  <div class="form-control" :ref="areaId">
    <label :for="areaId"> New Expertise #{{ ix }}: </label>
    <input type="text" :id="areaId" v-model.trim="newArea" @blur="addToList" />
  </div>
</template>

<script>
export default {
  name: "AreaRow",
  props: ["areaId", "ix"],
  methods: {
    addToList() {
      this.$parent.addToList();
    },
  },
};
</script>
