<template>
  <div class="container mx-auto mt-5">
      <div class="value-container mx-auto pa-1 mt-5">
          <h2>{{name}}</h2>
      </div>
      <div class="value-container mx-auto pa-1 mb-n5">
          <h2>${{currValue}}</h2>
      </div>
      <div class="value-container mx-auto pa-1 mt-5 mb-10"  :class="{ red: !color, green: color}" >
          {{percentChange}}%
      </div>
  </div>
</template>

<script>
export default {
    props: ['currValue', 'percentChange', 'name', 'increase'],
    data() {
        return {
            color: this.increase
        }
    }
}
</script>

<style scoped>
.container {
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-content: center;
    width: 400px;
    height: 100px;
}

.value-container {
    display:flex;
    text-align: center;
    flex-direction:column;
    justify-content: center;
}

.red{
    background-color: rgb(248, 45, 45);

}

.green{
    background-color: rgb(86, 207, 86);
}
</style>