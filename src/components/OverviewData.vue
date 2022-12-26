<template>
  <div class="overview-container mx-auto">
      <div class="info-container mx-auto pa-3">
          <div class="title-container">
                <p class="sector-container pa-2">
                    SECTOR: {{sector}}
                </p>
                <p class="industry-container pa-2 pt-n5">
                    INDUSTRY: {{industry}}
                </p>
          </div>
            <p class="blurb-container pa-2 mx-auto">
                {{information}}
            </p>
      </div>
  </div>
</template>

<script>
export default {
    props: ['information', 'sector', 'industry']

}
</script>

<style scoped>

.overview-container {
    display:flex;
    flex-direction: column;
    width: 950px;
}

.info-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #0d1017;
}

.title-container {
    display: flex;
    justify-content: center;
    flex-direction: row;
    color: darkgrey;

}

.blurb-container {
    text-align: center;
}

</style>