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
          I have found not way to stop/interupt this behaviour.
          Therefore I am only letting you create a single Section for now...
        </p>
        <!--
        <b-button variant="primary" @click="addSection">Add Section</b-button>
        -->
      </b-form-group>
    </div>
    <div>
      <template v-for="(section, index) in puzzle.sections">
        <div :key="index" class="border border-primary rounded p-1 m-1">
          <b-alert variant="primary" show><h1>Section {{ (index+1) }}</h1></b-alert>
          <div>
            
          </div>
          <div>
            <h2>Deck Player</h2>
            <b-form-group label="Mode" description="Use one of the following options to supply a vaild deck for the player or allow the player to select their own">
              <b-form-radio-group  v-model="section.deck_player.mode">
                <b-form-radio value="1">Deck Code</b-form-radio>
                <b-form-radio value="2">User Supplied</b-form-radio>
                <b-form-radio value="3" disabled>User Choice</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
            <div v-if="section.deck_player.mode == '1'">
              <b-form-group  label="Deck Code" description="">
                <b-input-group>
                  <b-form-input type="text" v-model="section.deck_player.deck_code"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="primary" @click="test(index)">Process Deck</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
              <b-form-group  label="Deck Order" description="Supply the order the cards are to be drawn">
              </b-form-group>
            </div>
            <hr />
            <h2>Deck Ai</h2>
            <b-form-group label="Mode" description="Use one of the following options to supply a vaild deck for the player or allow the player to select their own">
              <b-form-radio-group  v-model="section.deck_ai.mode">
                <b-form-radio value="1">Deck Code</b-form-radio>
                <b-form-radio value="2">User Supplied</b-form-radio>
                <b-form-radio value="3" disabled>User Choice</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
            <div v-if="section.deck_ai.mode == '1'">
              <b-form-group  label="Deck Code" description="">
                <b-input-group>
                  <b-form-input type="text" v-model="section.deck_ai.deck_code"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="primary" @click="test(index)">Process Deck</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
              <b-form-group  label="Deck Order" description="Supply the order the cards are to be drawn">
              </b-form-group>
            </div>
            <hr />
            <h2>Rules</h2>
            <ul>
              <template v-for="(item, key) in section.rules">
                <li :key="key">
                  {{ key }} 
                </li>
              </template>
            </ul>
            <hr />
            <h2>Sequences</h2>
            <p>...</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { decodeDeck } from 'node-artifact-api';

export default {
  name: "build",
  data() {
    return {
      puzzle: {
        name: "",
        description: "",
        sections: [
          {
            rules: {
              initial_heroes: "3",
              initial_heroes_ai: "3"
            },
            deck_player: {
              mode: "0",
              deck_code: "",
              additional_decks: [],
              validator: {}
            },
            deck_ai: {
              mode: "0",
              deck_code: "",
              additional_decks: [],
              validator: {}
            },
            deck_order_player: [],
            deck_order_ai: [],
            sequences: []
          }
        ]
      },
      options: {}
    };
  },
  methods: {
    test(index) {
      let code = this.puzzle.sections[index].deck_player.deck_code;

      let deck = decodeDeck(code);
      console.log(deck);
    }
  }
};
</script>
