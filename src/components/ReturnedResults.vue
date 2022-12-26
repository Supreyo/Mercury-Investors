<template>
  <div class="returned-results" v-if="returnedResult">
    <section>
       {{ returnedResult }}
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "returnedResult",
  computed: {
    ...mapGetters(["returnedResult", "error"]),
  },
};
</script>

<style lang="css" scoped>
.returned-results {
  position: relative;
  z-index: -1;
}
</style>