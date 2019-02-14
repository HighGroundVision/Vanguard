<!-- @format -->

<template>
  <div class="build">
    <Card>
      <h1>Build Puzzle</h1>
      <Divider dashed/>
      <div>
        <span>Name</span>
        <Input v-model="puzzel.name" />
      </div>
      <div>
        <span>Description</span>
        <Input v-model="puzzel.description"  />
      </div>
      <Divider dashed/>
      <Icon type="md-warning" color="#ff9900" size="24"/>WARNING
      <p>
        As far as I can tell artifact will lock the user into these matches and they will not be able to continue normal 
        game play until all matches are complete. You should generaly not need more then one match.
      </p>
      <br>
      <Button type="primary" @click="addSection">Add Match</Button>
      <Divider dashed/>
      <Collapse v-model="options.active_section" accordion>
        <template v-for="(section, skey) in puzzel.sections">
          <Panel :key="skey" :name="skey.toString()">
            {{ section.name }}
            <Button type="error" class="float-right" @click="removeSection(section.name)">X</Button>
            <div slot="content">
              <div>
                <h1>Decks</h1>
                <Row>
                  <i-col span="12" style="padding: 5px;">
                    <h2>Player</h2>
                    <RadioGroup v-model="section.decks.player.mode" :vertical="true">
                      <Radio label="1">Supply a deck code for the player to use (optional: the order the deck is drawn in)</Radio>
                      <Radio label="2">The player can pick from one of the following decks</Radio>
                      <Radio label="3">The player brings their own deck</Radio>
                    </RadioGroup>
                    <br>
                    <div v-if="section.decks.player.mode === '1'">
                      <div>
                        <span>Deck Code</span>
                        <i-input v-model="section.decks.player.deck_code">
                          <Button
                            slot="append"
                            type="primary"
                            style="width: 100px"
                            @click="loadPlayerDeck"
                          >Load</Button>
                        </i-input>
                        <br>
                        <i-input v-model="section.decks.player.deck_name" disabled></i-input>
                      </div>
                      <br>
                      <div>
                        <span>Deck Order</span>
                        <br>
                        <small>
                          You do not need to give a deck order if you want it to be random.
                        </small>
                      </div>
                      <div>
                        <img :src="options.selected_player_image" class="float-right" style="height: 400px;">
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
                    <div v-if="section.decks.player.mode === '2'">
                      <div>
                        <span>Deck Code</span>
                        <i-input v-model="section.decks.player.deck_code">
                          <Button slot="append" style="width: 100px" @click="loadPlayerDeck">Load</Button>
                        </i-input>
                        <i-input v-model="section.decks.player.deck_name">
                          <Button slot="append" style="width: 100px" @click="addPlayerDeck">Add</Button>
                        </i-input>
                      </div>
                      <br>
                      <div>
                        <template v-for="(deck, dKey) in section.decks.player.deck_selection">
                          <Card :key="dKey">
                            <p slot="title">{{ deck.name }}</p>
                            <Button slot="extra" type="error" @click="removePlayerDeck(deck.code)">X</Button>
                            <span>{{ deck.code }}</span>
                          </Card>
                        </template>
                      </div>
                    </div>
                  </i-col>
                  <i-col span="12" style="padding: 5px;">
                    <h2>Ai</h2>
                    <RadioGroup v-model="section.decks.ai.mode" :vertical="true">
                      <Radio label="1">Supply a deck code for the Ai to use (optional: the order the deck is drawn in)</Radio>
                      <Radio label="2">The player can pick from one of the following decks for the Ai</Radio>
                      <Radio label="3">The player brings their own deck for the Ai</Radio>
                    </RadioGroup>
                    <br>
                    <div v-if="section.decks.ai.mode === '1'">
                      <div>
                        <span>Deck Code</span>
                        <i-input v-model="section.decks.ai.deck_code">
                          <Button
                            slot="append"
                            type="primary"
                            style="width: 100px"
                            @click="loadAiDeck"
                          >Load</Button>
                        </i-input>
                        <br>
                        <i-input v-model="section.decks.ai.deck_name" disabled></i-input>
                      </div>
                      <br>
                      <div>
                        <span>Deck Order</span>
                        <br>
                        <small>
                          You do not need to give a deck order if you want it to be random.
                        </small>
                      </div>
                      <div>
                        <img :src="options.selected_ai_image" class="float-right" style="height: 400px;">
                        <Transfer
                          :data="section.decks.ai.deck_cards"
                          :target-keys="section.decks.ai.draw_order"
                          :titles="['Cards in Deck', 'Draw Order']"
                          :list-style="{ width: '250px', height: '400px' }"
                          not-found-text="Empty"
                          @on-change="aiCardOrderChanged"
                          @on-selected-change="aiCardOrderSeletionChanged"
                        ></Transfer>
                      </div>
                    </div>
                    <div v-if="section.decks.ai.mode === '2'">
                      <div>
                        <span>Deck Code</span>
                        <i-input v-model="section.decks.ai.deck_code">
                          <Button slot="append" style="width: 100px" @click="loadAiDeck">Load</Button>
                        </i-input>
                        <i-input v-model="section.decks.ai.deck_name">
                          <Button slot="append" style="width: 100px" @click="addAiDeck">Add</Button>
                        </i-input>
                      </div>
                      <br>
                      <div>
                        <template v-for="(deck, dKey) in section.decks.ai.deck_selection">
                          <Card :key="dKey">
                            <p slot="title">{{ deck.name }}</p>
                            <Button slot="extra" type="error" @click="removeAiDeck(deck.code)">X</Button>
                            <span>{{ deck.code }}</span>
                          </Card>
                        </template>
                      </div>
                    </div>
                  </i-col>
                </Row>
                <Divider/>            
                <h1>Rules</h1>
                <div>
                  <h2>General</h2>
                  <div>
                    <Row style="line-height: 32px;">
                      <i-col span="6">Name</i-col>
                      <i-col span="12">Description</i-col>
                      <i-col span="2">Enabled</i-col>
                      <i-col span="4">Value</i-col>
                    </Row>
                  </div>
                  <template v-for="rule in section.rules.global">
                    <Row :key="rule.key" style="line-height: 32px;">
                      <i-col span="6">{{ rule.name }}</i-col>
                      <i-col span="12">{{ rule.description }}</i-col>
                      <i-col span="2">
                        <i-switch v-model="rule.enabled"/>
                      </i-col>
                      <i-col span="4">
                        <div v-if="rule.valueType == 'bool'">
                          <i-switch v-model="rule.value" :disabled="!rule.enabled"/>
                        </div>
                        <div v-if="rule.valueType == 'number'">
                          <i-input v-model="rule.value" :disabled="!rule.enabled"/>
                        </div>
                        <div v-if="rule.valueType == 'list'">
                          <span>List...</span>
                        </div>
                      </i-col>
                    </Row>
                  </template>
                  <Divider dashed/>
                  <h2>Player</h2>
                  <template v-for="rule in section.rules.player">
                    <Row :key="rule.key" style="line-height: 32px;">
                      <i-col span="6">{{ rule.name }}</i-col>
                      <i-col span="12">{{ rule.description }}</i-col>
                      <i-col span="2">
                        <i-switch v-model="rule.enabled"/>
                      </i-col>
                      <i-col span="4">
                        <div v-if="rule.valueType == 'bool'">
                          <i-switch v-model="rule.value" :disabled="!rule.enabled"/>
                        </div>
                        <div v-if="rule.valueType == 'number'">
                          <i-input v-model="rule.value" :disabled="!rule.enabled"/>
                        </div>
                        <div v-if="rule.valueType == 'list'">
                          <span>List...</span>
                        </div>
                      </i-col>
                    </Row>
                  </template>
                  <Divider dashed/>
                  <h2>Ai</h2>
                  <template v-for="rule in section.rules.ai">
                    <Row :key="rule.key" style="line-height: 32px;">
                      <i-col span="6">{{ rule.name }}</i-col>
                      <i-col span="12">{{ rule.description }}</i-col>
                      <i-col span="2">
                        <i-switch v-model="rule.enabled"/>
                      </i-col>
                      <i-col span="4">
                        <div v-if="rule.valueType == 'bool'">
                          <i-switch v-model="rule.value" :disabled="!rule.enabled"/>
                        </div>
                        <div v-if="rule.valueType == 'number'">
                          <i-input v-model="rule.value" :disabled="!rule.enabled"/>
                        </div>
                        <div v-if="rule.valueType == 'list'">
                          <span>List...</span>
                        </div>
                      </i-col>
                    </Row>
                  </template>
                </div>
                <Divider/>
                
                <h1>Sequence</h1>
                <p>
                  Sequences react to the flow to match. As far as I can tell there is no way to control the match, only react to events.
                </p>
                <br />
                <p>
                  Although that being said, you can build a set of Sequences that react to the flow of the game by using the "on next lane" 
                  event to goto another sequence when the flow moves from one land to the next. This allows you build Sequences that track 
                  the flow of the match to have reactions on a give turn / lane. To that end I have created the standard and custom flows.
                </p>
                <br />
                
                <div v-if="section.sequences.length == 0">
                  <Row>
                    <i-col span="12" style="padding: 5px;">
                      <h2>Standard Flow</h2>
                      <p>
                        The standard flow will track the match through X turns, allowing you control what happens at the end of the Sequence.
                      </p>
                      <br />
                      <div>
                        <span>Turns</span>
                        <br />
                        <i-input v-model="options.sequence.turns" />
                      </div>
                      <br />
                      <div>
                        <Button type="primary" @click="addStandardFlow">Add Standard Flow</Button>
                      </div>
                    </i-col>
                    <i-col span="12" style="padding: 5px;">
                      <h2>Custom Flow</h2>
                      <p>
                        The custom flow will require you to control the flow of Sequences, althought more complex to set up allows for more control over the flow of events, allowing puzzels that do not following the standard game flow.
                      </p>
                      <br />
                      <Button type="primary" @click="addCustomFlow">Add Custom Flow</Button>
                    </i-col>
                  </Row>
                </div>
                <Row>
                  <template v-for="(sequence) in section.sequences">
                    <i-col :key="sequence.key" :span="sequence.span">
                      <Card style="margin: 5px;">
                        <p slot="title">{{sequence.name}}</p>
                        <Button slot="extra" type="primary">
                          <Icon type="md-add" />
                        </Button>
                        <!-- Replace with array for events -->
                        <!-- Replace with array for actions for each event -->
                        <CellGroup>
                          <template v-for="(event) in sequence.events">
                            <Cell :key="event.key" :title="event.name" />
                          </template>
                        </CellGroup>
                      </Card>
                    </i-col>
                  </template>
                </Row>
                <br />
                <div v-if="section.sequences.length > 0">
                  <Button type="error" @click="removeSequence">Remove Sequence</Button>
                </div>
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
import * as cardsCollection from "../assets/cards.json";
import * as rulesCollection from "../assets/rules.json";
let uuidv4 = require("uuid/v4");

export default {
  name: "Build",
  data() {
    return {
      cards: cardsCollection.default,
      puzzel: {
        name: "",
        description: "",
        sections: []
      },
      options: {
        active_section: "0",
        selected_ai_image: "",
        selected_player_image: "",
        selected_cards: {
          soruce: [],
          target: []
        },
        sequence: {
          turns: 3
        }
      }
    };
  },
  methods: {
    addSection() {
      let results = false;
      if (this.puzzel.sections.length > 0) {
        results = confirm(`Are you sure we wish add more then one match?`);
      } else {
        results = true;
      }

      if (results) {
        let rules = rulesCollection.default.slice();
        var id = this.puzzel.sections.length + 1;
        let data = {
          id: id,
          name: "Match " + id,
          decks: {
            player: {
              mode: 0,
              deck_code:
                "ADCJdcKJX2kvAFNCQumuwKGsQGUqgGDkagBh4OlAaQDhVtCXSBTZWlnZXI_",
              deck_name: "",
              deck_cards: [],
              draw_cards: [],
              draw_order: [],
              deck_selection: []
            },
            ai: {
              mode: 0,
              deck_code: "",
              deck_name: "",
              deck_cards: [],
              draw_cards: [],
              draw_order: [],
              deck_selection: []
            }
          },
          rules: {
            global: rules.filter(_ => _.group == "global"),
            player: rules.filter(_ => _.group == "player"),
            ai: rules.filter(_ => _.group == "ai")
          },
          sequences: []
        };
        this.puzzel.sections.push(data);
      }
    },
    removeSection(name) {
      this.puzzel.sections = this.puzzel.sections.filter(function(v) {
        return v.name != name;
      });
    },
    loadPlayerDeck() {
      let index = parseInt(this.options.active_section);
      let section = this.puzzel.sections[index];
      let code = section.decks.player.deck_code;
      if (!code) {
        return;
      }

      let deck = decodeDeck(code);
      section.decks.player.deck_cards = [];
      section.decks.player.deck_name = deck.name;

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
      this.options.selected_player_image = "";
    },
    playerCardOrderSeletionChanged(sourceSelectedKeys, targetSelectedKeys) {
      if (sourceSelectedKeys.length === 0 && targetSelectedKeys.length === 0) {
        this.options.selected_player_image = "";
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
          this.options.selected_player_image = item.image;
        }
        if (differenceTarget.length > 0) {
          let key = differenceTarget[0];
          let item = section.decks.player.deck_cards.filter(function(v) {
            return v.key === key;
          })[0];
          this.options.selected_player_image = item.image;
        }
      }
    },
    addPlayerDeck() {
      let index = parseInt(this.options.active_section);
      let section = this.puzzel.sections[index];
      let code = section.decks.player.deck_code;
      let name = section.decks.player.deck_name;

      let results =
        section.decks.player.deck_selection.filter(function(_) {
          return _.code === code;
        }).length === 0;
      if (code && name && results) {
        section.decks.player.deck_selection.push({
          code: code,
          name: name
        });

        section.decks.player.deck_code = "";
        section.decks.player.deck_name = "";
      }
    },
    removePlayerDeck(code) {
      let index = parseInt(this.options.active_section);
      let section = this.puzzel.sections[index];
      section.decks.player.deck_selection = section.decks.player.deck_selection.filter(
        function(_) {
          return _.code !== code;
        }
      );
    },
    loadAiDeck() {
      let index = parseInt(this.options.active_section);
      let section = this.puzzel.sections[index];
      let code = section.decks.ai.deck_code;
      if (!code) {
        return;
      }

      let deck = decodeDeck(code);
      section.decks.ai.deck_cards = [];
      section.decks.ai.deck_name = deck.name;

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
          section.decks.ai.deck_cards.push(card);
          section.decks.ai.draw_cards.push(card);
        }
      }

      section.decks.ai.deck_cards.sort(function(lhs, rhs) {
        return lhs.label.localeCompare(rhs.label);
      });
    },
    aiCardOrderChanged(newTargetKeys) {
      let index = parseInt(this.options.active_section);
      let section = this.puzzel.sections[index];
      section.decks.ai.draw_order = newTargetKeys;

      this.options.selected_cards.soruce = [];
      this.options.selected_cards.target = [];
      this.options.selected_ai_image = "";
    },
    aiCardOrderSeletionChanged(sourceSelectedKeys, targetSelectedKeys) {
      if (sourceSelectedKeys.length === 0 && targetSelectedKeys.length === 0) {
        this.options.selected_ai_image = "";
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
          let item = section.decks.ai.deck_cards.filter(function(v) {
            return v.key === key;
          })[0];
          this.options.selected_ai_image = item.image;
        }
        if (differenceTarget.length > 0) {
          let key = differenceTarget[0];
          let item = section.decks.ai.deck_cards.filter(function(v) {
            return v.key === key;
          })[0];
          this.options.selected_ai_image = item.image;
        }
      }
    },
    addAiDeck() {
      let index = parseInt(this.options.active_section);
      let section = this.puzzel.sections[index];
      let code = section.decks.ai.deck_code;
      let name = section.decks.ai.deck_name;

      let results =
        section.decks.ai.deck_selection.filter(function(_) {
          return _.code === code;
        }).length === 0;
      if (code && name && results) {
        section.decks.ai.deck_selection.push({
          code: code,
          name: name
        });

        section.decks.ai.deck_code = "";
        section.decks.ai.deck_name = "";
      }
    },
    removeAiDeck(code) {
      let index = parseInt(this.options.active_section);
      let section = this.puzzel.sections[index];
      section.decks.ai.deck_selection = section.decks.ai.deck_selection.filter(
        function(_) {
          return _.code !== code;
        }
      );
    },
    addStandardFlow() {
      let index = parseInt(this.options.active_section);
      let section = this.puzzel.sections[index];

      let start = {
        key: `start`,
        name: `Start`,
        span: 24,
        can_remove: false,
        events: [
          {
            name: 'On Enter',
            key: 'auto',
            delay: 0,
            removable: false,
            actions: [],
          }
        ],
      };
      section.sequences.push(start);

      for (let t = 1; t <= this.options.sequence.turns; t++) {
        for (let l = 1; l <= 3; l++) {
          // let next_turn = (l == 3) ? (t+1) : t;
          // let next_lane = (l == 3) ? 1 : (l+1);
          // let at_end = t == this.options.sequence.turns && l === 3;

          let data = {
            key: `turn${t}lane${l}`,
            name: `Turn ${t} - Lane ${l}`,
            span: 8,
            removable: false,
            events: [
                {
                  name: 'On Next Lane',
                  key: 'on_next_lane',
                  delay: 0,
                  removable: false,
                  actions: [],
                }
            ]
          };
          section.sequences.push(data);
        }
      }

      let end = {
        key: `end`,
        name: `End`,
        span: 24,
        removable: false,
        events: [],
      };
      section.sequences.push(end);
    },
    addCustomFlow() {
      let index = parseInt(this.options.active_section);
      let section = this.puzzel.sections[index];

      let start = {
        key: `start`,
        name: `Start`,
        span: 24,
        removable: false,
        events: [],
      };
      section.sequences.push(start);

      let end = {
        key: `end`,
        name: `End`,
        span: 24,
        removable: true,
        events: [],
      };
      section.sequences.push(end);
    },
    removeSequence() {
      let index = parseInt(this.options.active_section);
      let section = this.puzzel.sections[index];
      section.sequences = [];
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
