<!-- @format -->

<template>
  <div class="home">
    <Row>
      <i-col span="8" offset="8">
        <Card>
          <h1>Vanguard</h1>
          <h2>The Artifact Puzzle Builder</h2>
          <img :src="image" style="width:100%; border-radius: 25px;" >
          <br />
          <h3>What is a Artifact puzzle?</h3>
          <p>
            Every artifact player has played at least one puzzle even if they did not know it. 
            The tutorial, or the the 2 forced matches when you first started playing artifact where set up as puzzles (In fact you can recreate that tutorial with this tool).
            A puzzle is a txt file that is loaded via the console in artifact where the player has a match against an AI where there is set broad state and set of actions for each turn for the AI.
          </p>
          <br />
          <h3>What is this tool?</h3>
          <p>
            This tool will guide you through the process of creating the txt file for a puzzle.
            Currently you can create the puzzles and then download them locally. This means you can not save puzzles currently.
            Although we have a lot of options we do not cover every use case. 
            We only handled the most common ones, if you come across a element, rule, command, etc. that you think should be added reach out to us.
          </p>
          <br />
          <p>
            Provide any feedback about this project to <a href="https://twitter.com/DotaHGV" target="_blank">@DotaHGV</a> or open an issue on <a href="https://github.com/HighGroundVision/Vanguard/issues" target="_blank">GitHub</a>
          </p>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      image: require('../assets/imgs/main.jpg')
    };
  }
};
</script>


<style scoped>
p {
  font-size: 1.3em;
}
</style>