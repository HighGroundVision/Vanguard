<template>
  <div class="build">
    <Card>
      <h1>Build Puzzle</h1>
      <p>Vivamus mi elit, vehicula vel augue in, ullamcorper molestie leo.</p>
      <br />
      <Steps :current="0">
        <Step
          title="Section"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ></Step>
        <Step
          title="Section"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ></Step>
        <Step
          title="Section"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        ></Step>
      </Steps>
    </Card>
  </div>
</template>

<script>
export default {
  name: "build"
};
</script>
