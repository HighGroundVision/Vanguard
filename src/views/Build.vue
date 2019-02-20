<!-- @format -->

<template>
  <div class="build">
    <Card>
      <h1>Build Puzzle</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
      <Divider dashed/>

      <Form :label-width="200">
        <FormItem label="Name">
          <Input v-model="puzzle.name" placeholder="..." />
        </FormItem>
         <FormItem label="Description">
          <Input v-model="puzzle.description" placeholder="..." />
        </FormItem>
      </Form>
      <Divider dashed/>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
      <br />

      <div style="text-align: center;">
        <Button type="primary" @click="addMatch">Add Match</Button>
      </div>
      <Divider dashed/>

      <Collapse v-model="options.match.active" accordion>
        <template v-for="(match, skey) in puzzle.matches">
          <Panel :key="match.key" :name="skey.toString()">
            {{ getMatchName(skey) }}
            <Button type="error" class="float-right" @click="removeMatch(match.key)">X</Button>
            <div slot="content">
            
              <h2>Decks</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              <br />

              <h3>Player</h3>
              <DeckSelection :actor="match.player" v-model="match.player.decks" />
              
              <h3>Ai</h3>
              <DeckSelection :actor="match.ai" v-model="match.ai.decks" />
              

              <Divider dashed/>
              <h2>Setup</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>

              <h3>Time</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              <Form :label-width="200">
                <FormItem label="No Timeout">
                  <i-switch v-model="match.rules.no_shotclock" />
                </FormItem>
                <FormItem label="Time Per Turn" v-if="match.rules.no_shotclock === false">
                  <Input v-model="match.rules.shotclock_base_time" placeholder="45" />
                </FormItem>
              </Form>

              <h3>Deployment - Heroes</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              <br />

              <h4>Player</h4>
              <Form :label-width="200">
                <FormItem label="Heroes Initial Deployment">
                  <RadioGroup v-model="match.player.rules.deployment.mode" :vertical="true">
                    <Radio label="1">The hero flop is random</Radio>
                    <Radio label="2">The hero flop is based on deck order</Radio>
                    <Radio label="3" v-if="match.player.decks.length == 1">Supply the flop order</Radio>
                  </RadioGroup>
                </FormItem>

                <FormItem label="# Heroes to flop" v-if="match.player.rules.deployment.mode !== '3'">
                  <Input v-model="match.player.rules.deployment.heroes" placeholder="3" />
                </FormItem>

                <div v-if="match.player.rules.deployment.mode === '3'">
                  <FormItem label="Hero in Lane 1">
                    <Select v-model="match.player.rules.deployment.lane_1">
                      <Option v-for="item in match.player.decks[0].cards.heroes" :value="item.data.card_id" :key="item.data.card_id">{{ item.data.card_name.english }}</Option>
                    </Select>    
                  </FormItem>
                  <FormItem label="Hero in Lane 2">
                    <Select v-model="match.player.rules.deployment.lane_2">
                      <Option v-for="item in match.player.decks[0].cards.heroes" :value="item.data.card_id" :key="item.data.card_id">{{ item.data.card_name.english }}</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="Hero in Lane 3">
                    <Select v-model="match.player.rules.deployment.lane_3">
                      <Option v-for="item in match.player.decks[0].cards.heroes" :value="item.data.card_id" :key="item.data.card_id">{{ item.data.card_name.english }}</Option>
                    </Select>
                  </FormItem>
                </div>
              </Form>

              <!--
              <h4>Ai</h4>
              <Form :label-width="200">
                <FormItem label="Heroes Initial Deployment">
                  <RadioGroup v-model="hero_flop" :vertical="true">
                    <Radio label="1">The hero flop is random</Radio>
                    <Radio label="2">The hero flop is based on deck order</Radio>
                    <Radio label="3" v-if="match.ai.decks.length == 1">Supply the flop order</Radio>
                  </RadioGroup>
                </FormItem>

                <FormItem label="# Heroes to flop" v-if="true">
                  <Input v-model="initial_heroes_ai" placeholder="3" />
                </FormItem>

                <div v-if="true">
                  <FormItem label="Hero for Lane 1">
                    <Input v-model="hero1_ai" placeholder="..." />
                  </FormItem>
                  <FormItem label="Hero for Lane 2">
                    <Input v-model="hero2_ai" placeholder="..." />
                  </FormItem>
                  <FormItem label="Hero for Lane 3">
                    <Input v-model="hero3_ai" placeholder="..." />
                  </FormItem>
                </div>
              </Form>
              -->

              <!-- initial_heroes -->
              <!-- initial_heroes_ai -->

              <!-- heroes_initial_lane_random -->
              
              <!-- hero1_player -->
              <!-- hero2_player -->
              <!-- hero3_player -->
              <!-- hero1_ai -->
              <!-- hero2_ai -->
              <!-- hero3_ai -->

              <h3>Deployment - Creeps</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>

              <!-- creeps_first_turn -->
              <!-- creeps_first_turn_ai -->

              <!-- creep_list -->
              <!-- creep_list_ai -->

              <!-- creeps_lanes_player_1each -->
              <!-- creeps_lanes_random -->
              <!-- only_flop_across_from_heroes -->

              <h3>Towers / Ancients</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              <!-- tower1_health -->
              <!-- tower2_health -->
              <!-- tower3_health -->

              <!-- tower1_health_ai -->
              <!-- tower2_health_ai -->
              <!-- tower3_health_ai -->

              <!-- ancient1_health -->
              <!-- ancient2_health -->
              <!-- ancient3_health -->

              <!-- ancient1_health_ai -->
              <!-- ancient2_health_ai -->
              <!-- ancient3_health_ai -->

              <!-- initial_mana -->
              <!-- initial_mana_ai -->

              <h3>Library</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              <!-- draw_order -->
              <!-- draw_order_ai -->
              <!-- cards_first_turn -->
              <!-- cards_first_turn_ai -->

              <h3>Combat</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              <!-- ai_pass_chance_multiplier -->
              <!-- force_combat_manager_rand_to_zero -->
              <!-- ai_action_choice_non_random -->

              <h3>Shopping</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              <!-- store_enabled -->

              <h3>Victory</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              <!-- gold_victory -->
              <!-- units_victory -->
              <!-- kills_victory -->

              <Divider dashed/>
              <h2>Each Turn</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>

              <h3>Extras</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              <!-- mana_boost_per_turn -->
              <!-- mana_boost_per_turn_ai -->
              <!-- gold_per_turn -->
              <!-- gold_per_turn_ai -->

              <h3>Cards</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              <!-- cards_per_turn -->
              <!-- cards_per_turn_ai -->

              <!-- free_cards_per_turn -->
              <!-- free_cards_per_turn_ai -->

              <h3>Creeps</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              <!-- creeps_per_turn -->
              <!-- creeps_per_turn_ai -->

            </div>
          </Panel>
        </template>
      </Collapse>
    </Card>
  </div>
</template>

<script>
// Components
import CardTransfer from "@/components/CardTransfer.vue";
import CardList from "@/components/CardList.vue";
import DeckSelection from "@/components/DeckSelection.vue";

// Deck Code Decoder
import { decodeDeck } from "node-artifact-api";

// Data
import * as cardsCollection from "@/assets/data/cards.json";
import * as rulesCollection from "@/assets/data/rules.json";
import * as matchTempalte from "@/assets/data/match.json";
import * as actorTempalte from "@/assets/data/actor.json";
import { timeout } from 'q';

// ID
let uuidv4 = require("uuid/v4");

// Object Cloning
let clone = require('clone');

// Assets
// let emptyCard = require('../assets/imgs/empty.png');

export default {
  name: "Build",
  components: {
    CardTransfer,
    CardList,
    DeckSelection
  },
  methods: {
    addMatch() {
      let match = clone(matchTempalte.default);
      match.key = uuidv4();
      match.player = clone(actorTempalte.default);
      match.ai = clone(actorTempalte.default);
      this.puzzle.matches.push(match);
    },
    removeMatch(key) {
      this.puzzle.matches = this.puzzle.matches.filter(_ => _.key != key);
    },
    getMatchName(index) {
      return "Match " + (index + 1).toString();
    },
    addFlow() {
      // Add Flow
    },
    removeFlow() {
      // Remove Flow
    }
  },
  computed: {
    heroes: function() {
      return [];
    },
    creeps: function () {
      return [];
    },
    draw: function() {
      return [];
    },
  },
  data() {
    setTimeout(() => { this.addMatch(); }, 1000);

    return {
      test: {
        input: '',
        switch: false,
      },
      puzzle: {
        name: "",
        description: "",
        matches: []
      },
      options: {
        match: {
          active: "0",
        },
        sequence: {
          turns: 3,
        }
      }
    };
  },
};
</script>

<style scoped>
.float-right {
  float: right;
  margin: 3px;
}
.step-right {
  margin-left: 8px;
}
.demo-carousel {
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #506b9e;
}
</style>