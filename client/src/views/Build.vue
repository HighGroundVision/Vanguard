<template>
  <div class="build">
    <Card>
      <h1>Build Puzzle</h1>
      <Divider dashed />
      <div>
        <span>Name</span>
        <Input v-model="puzzel.name" />
      </div>
      <div>
        <span>Description</span>
        <Input v-model="puzzel.description" />
      </div>
      <Divider dashed />
      <p>
        <Icon type="md-warning" color="#ff9900" size="24" /> WARNING <br />
        Each Section is handled by Artifact as diferent match. As far as I can
        tell artifact will lock the user into these matches and they will not be
        able to continue normal game play until all sections are complete. You
        should generaly not need more then one section.
      </p>
      <br />
      <Button @click="addSection" type="primary">Add Section</Button>
      <Divider dashed />
      <Collapse v-model="options.active_section" accordion>
        <template v-for="(section, index) in puzzel.sections">
          <Panel :name="index.toString()" :key="index">
            {{ section.name }}
            <Button
              type="warning"
              class="float-right"
              @click="removeSection(section.name)"
              >X</Button
            >
            <div slot="content">
              <div>
                <h1>Decks</h1>
                <Row>
                  <Col span="12">
                    <span>Player</span>
                    <br />
                    <RadioGroup
                      v-model="section.decks.player.mode"
                      :vertical="true"
                    >
                      <Radio label="1"
                        >Supply a deck code for the player to use</Radio
                      >
                      <Radio label="2">User brings their own deck</Radio>
                      <Radio label="3" disabled
                        >The user can pick from one of the following
                        decks</Radio
                      >
                    </RadioGroup>
                    <Divider dashed />
                    <div v-if="section.decks.player.mode === '1'">
                      <div>
                        <span>Deck Code</span>
                        <Input v-model="section.decks.player.deck_code">
                          <Button
                            slot="append"
                            type="primary"
                            @click="loadPlayerDeck"
                            >Load</Button
                          >
                        </Input>
                      </div>
                      <br />
                      <div>
                        <span>Deck Order</span>
                        <br />
                        <small
                          >You do not need to give a deck order if you want it
                          to be random.</small
                        >
                      </div>
                      <div>
                        <img
                          :src="options.selected_image"
                          class="float-right"
                          style="height: 400px;"
                        />
                        <Transfer
                          :data="section.decks.player.deck_cards"
                          :target-keys="section.decks.player.draw_order"
                          :titles="['Cards in Deck', 'Draw Order']"
                          :list-style="{ width: '250px', height: '400px' }"
                          not-found-text="Empty"
                          @on-change="playerCardOrderChanged"
                          @on-selected-change="playerCardOrderSeletionChanged"
                        ></Transfer>
                      </div>
                    </div>
                    <div v-if="section.decks.player.mode === '3'">
                      <span>Test</span>
                    </div>
                  </Col>
                  <Col span="12">
                    <span>Ai</span>
                    <br />
                    <RadioGroup
                      v-model="section.decks.ai.mode"
                      :vertical="true"
                    >
                      <Radio label="1"
                        >Supply a deck code for the Ai to use</Radio
                      >
                      <Radio label="3" disabled
                        >The user can pick from one of the following
                        decks</Radio
                      >
                    </RadioGroup>
                  </Col>
                </Row>
                <Divider />
                <h1>Rules</h1>
                <Divider />
                <h1>Sequence</h1>
              </div>
            </div>
          </Panel>
        </template>
      </Collapse>
    </Card>
  </div>
</template>

<script>
import { decodeDeck } from "node-artifact-api";
import * as library from "../assets/cards.json";
let uuidv4 = require("uuid/v4");

export default {
  name: "build",
  data() {
    return {
      cards: library.default,
      puzzel: {
        name: "",
        description: "",
        sections: []
      },
      options: {
        active_section: "0",
        selected_image: "",
        selected_cards: {
          soruce: [],
          target: []
        }
      }
    };
  },
  methods: {
    addSection() {
      let results = false;
      if (this.puzzel.sections.length > 0) {
        results = confirm(`Are you sure we wish add more then one section?`);
      } else {
        results = true;
      }

      if (results) {
        var id = this.puzzel.sections.length + 1;
        this.puzzel.sections.push({
          id: id,
          name: "Section " + id,
          rules: {
            store_enabled: true
          },
          decks: {
            player: {
              mode: 0,
              deck_code:
                "ADCJdcKJX2kvAFNCQumuwKGsQGUqgGDkagBh4OlAaQDhVtCXSBTZWlnZXI_",
              deck_cards: [],
              draw_cards: [],
              draw_order: []
            },
            ai: {
              mode: 0,
              deck_code: "",
              deck_cards: [],
              draw_cards: [],
              draw_order: []
            }
          },
          sequences: []
        });
      }
    },
    removeSection(name) {
      let results = confirm(`Are you sure we wish to remove ${name} ?`);
      if (results) {
        this.puzzel.sections = this.puzzel.sections.filter(function(v) {
          return v.name != name;
        });
      }
    },
    loadPlayerDeck() {
      let index = parseInt(this.options.active_section);
      let section = this.puzzel.sections[index];
      let code = section.decks.player.deck_code;
      let deck = decodeDeck(code);
      section.decks.player.deck_cards = [];

      let cards = [];
      for (const item of deck.heroes) {
        let template = this.cards.filter(function(_) {
          return _.card_id == item.id;
        })[0];
        for (const ref of template.references) {
          if (ref.ref_type == "includes") {
            cards.push({ id: ref.card_id, count: ref.count });
          }
        }
      }
      for (const item of deck.cards) {
        cards.push({ id: item.id, count: item.count });
      }

      for (const item of cards) {
        let template = this.cards.filter(function(_) {
          return _.card_id == item.id;
        })[0];
        for (let i = 0; i < item.count; i++) {
          let card = {
            key: uuidv4(),
            id: template.card_id,
            label: template.card_name.english,
            description: template.card_text.english,
            image: template.large_image.default
          };
          section.decks.player.deck_cards.push(card);
          section.decks.player.draw_cards.push(card);
        }
      }

      section.decks.player.deck_cards.sort(function(lhs, rhs) {
        return lhs.label.localeCompare(rhs.label);
      });
    },
    playerCardOrderChanged(newTargetKeys) {
      let index = parseInt(this.options.active_section);
      let section = this.puzzel.sections[index];
      section.decks.player.draw_order = newTargetKeys;

      this.options.selected_cards.soruce = [];
      this.options.selected_cards.target = [];
      this.options.selected_image = "";
    },
    playerCardOrderSeletionChanged(sourceSelectedKeys, targetSelectedKeys) {
      if (sourceSelectedKeys.length === 0 && targetSelectedKeys.length === 0) {
        this.options.selected_image = "";
      } else {
        let differenceSource = sourceSelectedKeys.filter(
          x => !this.options.selected_cards.soruce.includes(x)
        );
        let differenceTarget = targetSelectedKeys.filter(
          x => !this.options.selected_cards.target.includes(x)
        );
        this.options.selected_cards.soruce = sourceSelectedKeys;
        this.options.selected_cards.target = targetSelectedKeys;

        let index = parseInt(this.options.active_section);
        let section = this.puzzel.sections[index];

        if (differenceSource.length > 0) {
          let key = differenceSource[0];
          let item = section.decks.player.deck_cards.filter(function(v) {
            return v.key === key;
          })[0];
          this.options.selected_image = item.image;
        }
        if (differenceTarget.length > 0) {
          let key = differenceTarget[0];
          let item = section.decks.player.deck_cards.filter(function(v) {
            return v.key === key;
          })[0];
          this.options.selected_image = item.image;
        }
      }
    }
  }
};
</script>

<style>
.float-right {
  float: right;
  margin: 3px;
}
</style>
