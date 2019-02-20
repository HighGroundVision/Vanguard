<template>
  <Form :label-width="200">
    <FormItem label="Setup">
      <RadioGroup v-model="actor.mode" :vertical="true">
        <Radio label="1">You Supply the Deck(s)</Radio>
        <Radio label="2">Player Supplies the Deck</Radio>
      </RadioGroup>
    </FormItem>
    <div v-if="actor.mode == '1'">
      <FormItem label="Deck Code">
        <Input v-model="actor.deck.code" placeholder="..." />
      </FormItem>
      <FormItem>
        <Button type="info" @click="loadDeck(actor)" :disabled="actor.deck.code == ''">Load Deck</Button>
      </FormItem>
      <FormItem label="Name">
        <Input v-model="actor.deck.name" placeholder="..." />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="addDeck(actor)" :disabled="!actor.deck.loaded">Add Deck</Button>
      </FormItem>
      <FormItem>
        <Card>
          <p slot="title">Decks</p>
          <CellGroup>
            <template v-for="(deck) in value">
              <Cell :key="deck.code" :title="deck.name" :label="deck.code">
                <ButtonGroup  slot="extra">
                  <Button type="info" @click="deck.show = true">View</Button>
                  <Button type="error" @click="removeDeck(actor, deck.key)">Remove</Button>
                </ButtonGroup>
              </Cell>
            </template>
          </CellGroup>
        </Card>
        <template v-for="(deck) in value">
          <Drawer :key="deck.code" :title="deck.name" :closable="false" v-model="deck.show" width="400">
            <Divider>Heroes</Divider>
              <template v-for="(card) in deck.cards.heroes">
                <div :key="card.key">
                  <img :src="card.data.large_image.default" style="width: 300px;">
                </div>
              </template>
              <Divider>Library</Divider>
              <template v-for="(card) in deck.cards.library">
                <div :key="card.key">
                  <img :src="card.data.large_image.default" style="width: 300px;">
                </div>
              </template>
              <Divider>Items</Divider>
              <template v-for="(card) in deck.cards.items">
                <div :key="card.key">
                  <img :src="card.data.large_image.default" style="width: 300px;">
                </div>
              </template>
          </Drawer>
        </template>
      </FormItem>
    </div>
  </Form>
</template>

<script>
import * as cardsCollection from "@/assets/data/cards.json";

import { decodeDeck } from "node-artifact-api";

let uuidv4 = require("uuid/v4");

let clone = require('clone');

export default {
  name: "DeckSelection",
  props: {
    actor: Object,
    value: Array,
  },
  methods: {
    loadDeck(actor) {
      let code = actor.deck.code;
      if(!code) {
        return;
      }

      let sets = clone(cardsCollection.default);
      let deck = decodeDeck(code);

      if(deck.name == "Invalid Code") {
        return;
      }
      
      actor.deck.name = deck.name;
      actor.deck.cards.heroes = [];
      actor.deck.cards.library = [];
      actor.deck.cards.items = [];

      for (const item of deck.heroes) {
        let template = sets.find(function(_) { return _.card_id == item.id; });
         actor.deck.cards.heroes.push({ key: uuidv4(), data: template, turn: item.turn });

        for (const ref of template.references) {
          if (ref.ref_type == "includes") {
            let refTemplate = sets.find(function(_) { return _.card_id == ref.card_id; });
            for (let i = 0; i < ref.count ; i++) {
              actor.deck.cards.library.push({ key: uuidv4(), data: refTemplate });
            }
          }
        }
      }
      for (const item of deck.cards) {
        let template = sets.find(function(_) { return _.card_id == item.id; });
        for (let i = 0; i < item.count ; i++) {
          if(template.card_type == "Item") {
            actor.deck.cards.items.push({ key: uuidv4(), data: template });
          } else {
            actor.deck.cards.library.push({ key: uuidv4(), data: template });
          }
        }
      }

      actor.deck.cards.heroes.sort(function(lhs, rhs) { return lhs.turn - rhs.turn; });
      actor.deck.cards.library.sort(function(lhs, rhs) { return lhs.data.card_name.english.localeCompare(rhs.data.card_name.english); });
      actor.deck.cards.items.sort(function(lhs, rhs) { return lhs.data.card_name.english.localeCompare(rhs.data.card_name.english); });

      actor.deck.loaded = true;
    },
    addDeck(actor) {
      let code = actor.deck.code;
      if(!code) {
        return;
      }
      let name = actor.deck.name;
      if(!name) {
        return;
      }

      let deck = clone(actor.deck);
      deck.key = uuidv4();
      actor.decks.push(deck);

      actor.deck.code = "";
      actor.deck.name = "";
      actor.deck.loaded = false;

      this.$emit('input', actor.decks);
    },
    removeDeck(actor, key) {
      actor.decks = actor.decks.filter(_ => _.key != key);

      this.$emit('input', actor.decks);
    }
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>