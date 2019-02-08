<template>
  <div class="build">
    <div>
      <b-form-group>
        <b-form-input type="text" v-model="puzzle.name" placeholder="Enter Name">
        </b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input type="text" v-model="puzzle.description" placeholder="Enter Description">
        </b-form-input>
      </b-form-group>
      <b-form-group>
        <p>
          NOTE: Each section is a diferent match. 
          Artifact will not let the player continue normal play until both sections are complete. 
          I have found not way to stop/interupt this behaviour
        </p>
        <b-button variant="primary" @click="addSection">Add Section</b-button>
      </b-form-group>
    </div>
    <div>
      <template v-for="(section, index) in puzzle.sections">
        <div :key="index" class="border border-primary rounded p-1 m-1">
          <b-alert variant="primary" show><h1>Part {{ index }}</h1></b-alert>
          <div>

          </div>
          <div>
            <h2>Deck Player</h2>
            <h3>Deck Code</h3>
            <p>...</p>
            <h3>Deck Order</h3>
            <p>...</p>

            <h2>Deck Ai</h2>
            <h3>Deck Code</h3>
            <p>...</p>
            <h3>Deck Order</h3>
            <p>...</p>
            
            <h2>Rules</h2>
            <ul>
              <template v-for="(item, key) in section.rules">
                <li :key="key">
                  {{ key }} 
                </li>
              </template>
            </ul>
            <h2>Sequences</h2>
            <p>...</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "build",
  data() {
    return {
      puzzle: {
        name: "",
        description: "",
        sections: []
      },
      options: {}
    };
  },
  methods: {
    addSection() {
      let data = {
        rules: {
          initial_heroes: "3",
				  initial_heroes_ai: "3"
        },
        deck_player: {
          use_deck: "",
          allow_user_decks: "1",
          additional_decks: [],
          validator: {}
        },
        deck_ai: {
          use_deck: "",
          allow_user_decks: "1",
          additional_decks: [],
          validator: {}
        },
        deck_order_player: [],
        deck_order_ai: [],
        sequences: []
      };
      this.puzzle.sections.push(data);
    }
  }
};
</script>
