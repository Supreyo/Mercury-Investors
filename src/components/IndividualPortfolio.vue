<template>
    <div>
      <button type="button" v-on:click="test()" >
        <td style="width: 410px">
          {{ pName }}
        </td>
        <td style="width: 135px">
          {{ Currency }}
        </td>
      </button>


    </div>
</template>

<script>


export default ({
    props: {
    pName: String,
    Currency: String,

  },
  methods:{
      test(){
        console.log('test')

      }
  }

}) ;



</script>

