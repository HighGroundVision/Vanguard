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
      </Form>
      <Divider dashed/>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
      <br />

      <div>
        <Button type="primary" @click="addMatch">Add Match</Button>
      </div>
      <Divider dashed/>

      <Collapse v-model="options.match.active" accordion>
        <template v-for="(match, skey) in puzzle.matches">
          <Panel :key="match.key" :name="skey.toString()">
            {{ getMatchName(skey) }}
            <Button type="error" class="float-right" @click="removeMatch(match.key)">Remove</Button>
            <div slot="content">
              
              
              <h2>Decks</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              <br />

              <Divider><strong>Player</strong></Divider>
              <DeckSelection :actor.sync="match.player" />
              
              <Divider><strong>Ai</strong></Divider>
              <DeckSelection :actor.sync="match.ai" />
              
              <Divider dashed />
              <h2>Setup</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              <br />

              <h3>Time</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              
              <Form :label-width="200">
                <FormItem label="No Timeout">
                  <i-switch v-model="match.rules.clock.no_shotclock" />
                </FormItem>
                <FormItem label="Time Per Turn" v-if="match.rules.clock.no_shotclock === false">
                  <InputNumber :max="9999" :min="0" v-model="match.rules.clock.shotclock_base_time"></InputNumber>
                </FormItem>
              </Form>

              <h3>Deployment - Heroes</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>

              <Divider><strong>Player</strong></Divider>
              <HeroDeployment :actor.sync="match.player" />

              <Divider><strong>Ai</strong></Divider>
              <HeroDeployment :actor.sync="match.ai" />

              <h3>Deployment - Creeps</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              
              <Divider><strong>General</strong></Divider>
              <Form :label-width="200">
                <FormItem label="Pathing">
                  <Select v-model="match.rules.deployment.pathing_force">
                    <Option value="Random" >Random</Option>
                    <Option value="Left Path" >Left</Option>
                    <Option value="Right Path" >Right</Option>
                    <Option value="Forward Path" >Forward</Option>
                  </Select>
                </FormItem>
                <FormItem label="Mode">
                  <RadioGroup v-model="match.rules.deployment.mode" :vertical="true">
                    <Radio label="1">Spreads the creeps evenly to all lanes</Radio>
                    <Radio label="2">The creeps toward lane 1 the frist</Radio>
                    <Radio label="3">The creeps will always land across from heroes frist</Radio>
                  </RadioGroup>
                </FormItem>
              </Form>

              <Divider><strong>Player</strong></Divider>
              <Form :label-width="200">
                <FormItem label="Creep List">
                  <CardList 
                    v-model="match.player.rules.creeps.list"
                    :cards="creeps"
                    :tiles="['Creeps', 'Deployment']"
                  />
                </FormItem>
                <FormItem label="Creep Count">
                  <InputNumber :max="100" :min="0" v-model="match.player.rules.creeps.count"></InputNumber>
                </FormItem>
              </Form>

              <Divider><strong>Ai</strong></Divider>
              <Form :label-width="200">
                <FormItem label="Creep List">
                  <CardList 
                    v-model="match.ai.rules.creeps.list"
                    :cards="creeps"
                    :tiles="['Creeps', 'Deployment']"
                  />
                </FormItem>
                <FormItem label="Creep Count">
                  <InputNumber :max="100" :min="0" v-model="match.ai.rules.creeps.count"></InputNumber>
                </FormItem>
              </Form>

              <h3>Towers / Ancients</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              
              <Divider><strong>Player</strong></Divider>
              <Form :label-width="200">
                <FormItem label="">
                  <Row>
                    <i-col span="8">
                      <h4>Lane 1</h4>
                    </i-col>
                    <i-col span="8">
                      <h4>Lane 2</h4>
                    </i-col>
                    <i-col span="8">
                      <h4>Lane 3</h4>
                    </i-col>
                  </Row>
                </FormItem>
                <FormItem label="Mana">
                  <Row>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.player.rules.mana"></InputNumber>
                    </i-col>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.player.rules.mana"></InputNumber>
                    </i-col>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.player.rules.mana"></InputNumber>
                    </i-col>
                  </Row>
                </FormItem>
                <FormItem label="Tower Health">
                  <Row>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.player.rules.towers.lane_1"></InputNumber>
                    </i-col>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.player.rules.towers.lane_2"></InputNumber>
                    </i-col>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.player.rules.towers.lane_3"></InputNumber>
                    </i-col>
                  </Row>
                </FormItem>
                <FormItem label="Ancient Health">
                  <Row>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.player.rules.ancient.lane_1"></InputNumber>
                    </i-col>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.player.rules.ancient.lane_2"></InputNumber>
                    </i-col>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.player.rules.ancient.lane_3"></InputNumber>
                    </i-col>
                  </Row>
                </FormItem>
              </Form>

              <Divider><strong>Ai</strong></Divider>
              <Form :label-width="200">
                <FormItem label="">
                  <Row>
                    <i-col span="8">
                      <h4>Lane 1</h4>
                    </i-col>
                    <i-col span="8">
                      <h4>Lane 2</h4>
                    </i-col>
                    <i-col span="8">
                      <h4>Lane 3</h4>
                    </i-col>
                  </Row>
                </FormItem>
                <FormItem label="Mana">
                  <Row>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.ai.rules.mana"></InputNumber>
                    </i-col>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.ai.rules.mana"></InputNumber>
                    </i-col>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.ai.rules.mana"></InputNumber>
                    </i-col>
                  </Row>
                </FormItem>
                <FormItem label="Tower Health">
                  <Row>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.ai.rules.towers.lane_1"></InputNumber>
                    </i-col>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.ai.rules.towers.lane_2"></InputNumber>
                    </i-col>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.ai.rules.towers.lane_3"></InputNumber>
                    </i-col>
                  </Row>
                </FormItem>
                <FormItem label="Ancient Health">
                  <Row>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.ai.rules.ancient.lane_1"></InputNumber>
                    </i-col>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.ai.rules.ancient.lane_2"></InputNumber>
                    </i-col>
                    <i-col span="8">
                      <InputNumber :max="99" :min="0" v-model="match.ai.rules.ancient.lane_3"></InputNumber>
                    </i-col>
                  </Row>
                </FormItem>
              </Form>
 
              <h3>Library</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>

              <Divider><strong>Player</strong></Divider>
              <Form :label-width="200"> 
                <FormItem label="Draw Order" v-if="match.player.decks.length === 1">
                  <CardTransfer 
                    v-model="match.player.rules.library.order"
                    :cards="match.player.decks[0].cards.library"
                    :tiles="['Library', 'Draw']"
                  />
                </FormItem>
                <FormItem label="# of Cards To Draw">
                  <InputNumber :max="9999" :min="0" v-model="match.player.rules.library.draw"></InputNumber>
                </FormItem>
              </Form>

              <Divider><strong>Ai</strong></Divider>
              <Form :label-width="200">
                <FormItem label="Draw Order" v-if="match.ai.decks.length === 1">
                  <CardTransfer 
                    v-model="match.ai.rules.library.order"
                    :cards="match.ai.decks[0].cards.library"
                    :tiles="['Library', 'Draw']"
                  />
                </FormItem>
                <FormItem label="# of Cards To Draw">
                  <InputNumber :max="9999" :min="0" v-model="match.ai.rules.library.draw"></InputNumber>
                </FormItem>
              </Form>

              <h3>Combat</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>

              <Divider><strong>Ai</strong></Divider>
              <Form :label-width="200">
                <FormItem label="Pass Chance Multiplier">
                  <Slider v-model="match.rules.combat.ai_pass_chance_multiplier" show-input></Slider>
                </FormItem>
                <FormItem label="Play In Draw Order">
                  <i-switch v-model="match.rules.combat.ai_action_choice_non_random" />
                </FormItem>
              </Form>

              <h3>Shopping</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              <br />

              <Divider><strong>General</strong></Divider>
              <Form :label-width="200">
                <FormItem label="Store Enabled">
                  <i-switch v-model="match.rules.store.enabled" />
                </FormItem>
              </Form>
              
              <Divider><strong>Player</strong></Divider>
              <Form :label-width="200">
                <FormItem label="Secret Shop">
                  <Select v-model="match.rules.store.secret">
                    <Option :value="0" >Random</Option>
                    <Option v-for="(item) in items" :value="item.id" :key="item.key">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="Shop Order" v-if="match.player.decks.length === 1">
                  <CardTransfer 
                    v-model="match.player.rules.store.order"
                    :cards="match.player.decks[0].cards.items"
                    :tiles="['Store', 'Order']" 
                  />
                </FormItem>  
              </Form>

              <Divider><strong>Ai</strong></Divider>
              <Form :label-width="200">
                <FormItem label="Shop Order" v-if="match.ai.decks.length === 1">
                  <CardTransfer 
                    v-model="match.ai.rules.store.order"
                    :cards="match.ai.decks[0].cards.items"
                    :tiles="['Store', 'Order']" 
                  />
                </FormItem>
              </Form>

              <h3>Victory</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>

              <br />
              <Form :label-width="200">
                <FormItem label="Gold">
                  <i-switch v-model="match.rules.victory.gold_flag" />
                  <InputNumber :max="9999" :min="0" v-model="match.rules.victory.gold_amount" v-if="match.rules.victory.gold_flag" class="step-right"></InputNumber>
                </FormItem>
                <FormItem label="Units">
                  <i-switch v-model="match.rules.victory.units_flag" />
                  <InputNumber :max="9999" :min="0" v-model="match.rules.victory.units_amount" v-if="match.rules.victory.units_flag" class="step-right"></InputNumber>
                </FormItem>
                <FormItem label="Kills">
                  <i-switch v-model="match.rules.victory.kills_flag" />
                  <InputNumber :max="9999" :min="0" v-model="match.rules.victory.kills_amount" v-if="match.rules.victory.kills_flag" class="step-right"></InputNumber>
                </FormItem>
              </Form>

              <Divider dashed />
              <h2>Each Turn</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              <br />
              
              <h3>Extras</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              
              <Divider><strong>Player</strong></Divider>
              <Form :label-width="200">
                <FormItem label="Mana Boost">
                  <InputNumber :max="9999" :min="0" v-model="match.player.rules.turn.mana"></InputNumber>
                </FormItem>
                <FormItem label="Gold Boost">
                  <InputNumber :max="9999" :min="0" v-model="match.player.rules.turn.gold"></InputNumber>
                </FormItem>
              </Form>

              <Divider><strong>Ai</strong></Divider>
              <Form :label-width="200">
                <FormItem label="Mana Boost">
                  <InputNumber :max="9999" :min="0" v-model="match.ai.rules.turn.mana"></InputNumber>
                </FormItem>
                <FormItem label="Gold Boost">
                  <InputNumber :max="9999" :min="0" v-model="match.ai.rules.turn.gold"></InputNumber>
                </FormItem>
              </Form>

              <h3>Cards</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              <Divider><strong>Player</strong></Divider>
              <Form :label-width="200">
                <FormItem label="# of Cards To Draw">
                  <InputNumber :max="9999" :min="0" v-model="match.player.rules.turn.draw"></InputNumber>
                </FormItem>
                <FormItem label="Extra Cards">
                  <CardList 
                    v-model="match.player.rules.turn.free"
                    :cards="draw"
                    :tiles="['Cards', 'Extra']" 
                  />
                </FormItem>
              </Form>

              <Divider><strong>Ai</strong></Divider>
              <Form :label-width="200">
                <FormItem label="# of Cards To Draw">
                  <InputNumber :max="9999" :min="0" v-model="match.ai.rules.turn.draw"></InputNumber>
                </FormItem>
                <FormItem label="Extra Cards">
                  <CardList 
                    v-model="match.ai.rules.turn.free"
                    :cards="draw"
                    :tiles="['Cards', 'Extra']" 
                  />
                </FormItem>
              </Form>

              <h3>Creeps</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>

              <Divider><strong>Player</strong></Divider>
              <Form :label-width="200">
                <FormItem label="# of Creeps to Deploy">
                  <InputNumber :max="9999" :min="0" v-model="match.player.rules.turn.creeps"></InputNumber>
                </FormItem>
              </Form>

              <Divider><strong>Ai</strong></Divider>
              <Form :label-width="200">
                <FormItem label="# of Creeps to Deploy">
                  <InputNumber :max="9999" :min="0" v-model="match.ai.rules.turn.creeps"></InputNumber>
                </FormItem>
              </Form>
              

              <Divider dashed />
              <h2>Flow</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
              <br />

              <div>
                <Button type="primary" @click="match.sequence.show = true">Add Flow</Button>
              </div>
              <Divider dashed/>

              <Modal
                v-model="match.sequence.show"
                :footer-hide="true"
                title="Sequence Flow"
                width="1000">
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet odio quis est imperdiet tristique. Praesent congue interdum massa at semper. Morbi sit amet auctor elit. Morbi eros leo, tempor eget mattis viverra, tincidunt sed mauris. Quisque id bibendum tellus. Phasellus a est at mauris congue pulvinar. Pellentesque non nunc et orci facilisis porttitor sit amet vel est. Cras fringilla vulputate justo eget malesuada. Etiam eu nisl ut justo accumsan volutpat.</p>
                <br />

                <Form :label-width="100"> 
                  <FormItem label="Turn">
                    <InputNumber :max="9999" :min="1" v-model="match.sequence.flow.turn"></InputNumber>
                  </FormItem>
                  <FormItem label="Lane">
                    <Slider :max="3" :min="1" v-model="match.sequence.flow.lane" show-input></Slider>
                  </FormItem>
                  <FormItem label="Mode">
                    <RadioGroup v-model="match.sequence.flow.mode" :vertical="true">
                      <Radio label="1">Invoke Command</Radio>
                      <Radio label="2">Change Rules</Radio>
                    </RadioGroup>
                  </FormItem>
                  <div v-if="match.sequence.flow.mode === '1'">
                    <FormItem label="Command">
                      <RadioGroup v-model="match.sequence.flow.command" :vertical="true">
                        <Radio label="1">Player Quits</Radio>
                        <Radio label="2">Ai Concedes</Radio>
                        <Radio label="3">Load Match</Radio>
                        <Radio label="4">Load Puzzle</Radio>
                      </RadioGroup>
                    </FormItem>
                    <FormItem label="Load Match" v-if="match.sequence.flow.command === '3'">
                      <Select v-model="match.sequence.flow.commands.load_section">
                        <Option v-for="(item, sKey) in puzzle.matches" :value="sKey" :key="item.key">{{ getMatchName(skey) }}</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="Load Puzzle" v-if="match.sequence.flow.command === '4'">
                      <Input v-model="match.sequence.flow.commands.load_puzzle" placeholder="" />
                    </FormItem>
                  </div>
                  <div v-if="match.sequence.flow.mode === '2'">
                    <FormItem label="Rule">
                      <RadioGroup v-model="match.sequence.flow.rule" :vertical="true">
                        <Radio label="1">Clock</Radio>
                        <Radio label="2">Store</Radio>
                        <Radio label="3">Combat</Radio>
                        <Radio label="4">Victory</Radio>
                        <Radio label="5">Library</Radio>
                        <Radio label="6">Creeps</Radio>
                      </RadioGroup>
                    </FormItem>
                    <div v-if="match.sequence.flow.rule === '1'">
                      <Divider><strong>General</strong></Divider>
                      <FormItem label="No Timeout">
                        <i-switch v-model="match.sequence.flow.rules.clock.no_shotclock" />
                      </FormItem>
                      <FormItem label="Time Per Turn" v-if="match.sequence.flow.rules.clock.no_shotclock === false">
                        <InputNumber :max="9999" :min="0" v-model="match.sequence.flow.rules.clock.shotclock_base_time"></InputNumber>
                      </FormItem>
                    </div>
                    <div v-if="match.sequence.flow.rule === '2'">
                      <Divider><strong>General</strong></Divider>
                      <FormItem label="Store Enabled">
                        <i-switch v-model="match.sequence.flow.rules.store.enabled" />
                      </FormItem>
                      <Divider><strong>Player</strong></Divider>
                      <FormItem label="Secret Shop">
                        <Select v-model="match.sequence.flow.rules.store.secret">
                          <Option :value="0" >Random</Option>
                          <Option v-for="(item) in items" :value="item.id" :key="item.key">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                    </div>
                    <div v-if="match.sequence.flow.rule === '3'">
                      <Divider><strong>Ai</strong></Divider>
                      <FormItem label="Pass Chance Multiplier">
                        <Slider v-model="match.sequence.flow.rules.combat.ai_pass_chance_multiplier" show-input></Slider>
                      </FormItem>
                    </div>
                    <div v-if="match.sequence.flow.rule === '4'">
                      <Divider><strong>General</strong></Divider>
                      <FormItem label="Gold">
                        <i-switch v-model="match.sequence.flow.rules.victory.gold_flag" />
                        <InputNumber :max="9999" :min="0" v-model="match.sequence.flow.rules.victory.gold_amount" v-if="match.sequence.flow.rules.victory.gold_flag" class="step-right"></InputNumber>
                      </FormItem>
                      <FormItem label="Units">
                        <i-switch v-model="match.sequence.flow.rules.victory.units_flag" />
                        <InputNumber :max="9999" :min="0" v-model="match.sequence.flow.rules.victory.units_amount" v-if="match.sequence.flow.rules.victory.units_flag" class="step-right"></InputNumber>
                      </FormItem>
                      <FormItem label="Kills">
                        <i-switch v-model="match.sequence.flow.rules.victory.kills_flag" />
                        <InputNumber :max="9999" :min="0" v-model="match.sequence.flow.rules.victory.kills_amount" v-if="match.sequence.flow.rules.victory.kills_flag" class="step-right"></InputNumber>
                      </FormItem>
                    </div>
                    <div v-if="match.sequence.flow.rule === '5'">
                      <Divider><strong>Player</strong></Divider>
                      <FormItem label="Cards to Draw">
                        <InputNumber :max="9999" :min="0" v-model="match.sequence.flow.actors.player.library.draw"></InputNumber>
                      </FormItem>
                      <FormItem label="Extra Cards">
                        <CardList 
                          v-model="match.sequence.flow.actors.player.library.free"
                          :cards="draw"
                          :tiles="['Cards', 'Extra']" 
                        />
                      </FormItem>
                      <Divider><strong>Ai</strong></Divider>
                      <FormItem label="Cards to Draw">
                        <InputNumber :max="9999" :min="0" v-model="match.sequence.flow.actors.ai.library.draw"></InputNumber>
                      </FormItem>
                      <FormItem label="Extra Cards">
                        <CardList 
                          v-model="match.sequence.flow.actors.ai.library.free"
                          :cards="draw"
                          :tiles="['Cards', 'Extra']" 
                        />
                      </FormItem>
                    </div>
                    <div v-if="match.sequence.flow.rule === '6'">
                      <Divider><strong>General</strong></Divider>
                      <FormItem label="Pathing">
                        <Select v-model="match.sequence.flow.rules.deployment.pathing_force">
                          <Option value="Random">Random</Option>
                          <Option value="Left Path" >Left</Option>
                          <Option value="Right Path" >Right</Option>
                          <Option value="Forward Path" >Forward</Option>
                        </Select>
                      </FormItem>
                      <Divider><strong>Player</strong></Divider>
                      <FormItem label="Creep List">
                        <CardList 
                          v-model="match.sequence.flow.actors.player.creeps.list"
                          :cards="creeps"
                          :tiles="['Creeps', 'Deployment']"
                        />
                      </FormItem>
                      <FormItem label="Creep Count">
                        <InputNumber :max="100" :min="0" v-model="match.sequence.flow.actors.player.creeps.count"></InputNumber>
                      </FormItem>
                      <Divider><strong>Ai</strong></Divider>
                      <FormItem label="Creep List">
                        <CardList 
                          v-model="match.sequence.flow.actors.ai.creeps.list"
                          :cards="creeps"
                          :tiles="['Creeps', 'Deployment']"
                        />
                      </FormItem>
                      <FormItem label="Creep Count">
                        <InputNumber :max="100" :min="0" v-model="match.sequence.flow.actors.ai.creeps.count"></InputNumber>
                      </FormItem>
                    </div>
                  </div>
                  <FormItem label="">
                    <Button type="success" @click="addFlow(match)" v-if="match.sequence.flow.key === 0">Add Flow</Button>
                    <Button type="success" @click="addFlow(match)" v-if="match.sequence.flow.key != 0">Edit Flow</Button>
                    <Button type="info" @click="match.sequence.show = false" class="step-right">Cancel</Button>
                  </FormItem>
                </Form>
              </Modal>

              <Row>
                <template v-for="flow in match.sequence.flows">
                  <i-col :key="flow.key" span="8" style="padding: 5px;">
                    <Card>
                      <p slot="title">Turn {{flow.turn}} - Lane {{flow.lane}}</p>
                      <Button slot="extra" type="info" @click="editFlow(match, flow.key)">Edit</Button>
                      <Button slot="extra" type="error" @click="removeFlow(match, flow.key)" class="step-right">Remove</Button>
                      <CellGroup>
                        <Cell v-if="flow.mode == '1'" title="Mode" extra="Invoke Command" />
                        <Cell v-if="flow.mode == '2'" title="Mode" extra="Change Rules" />
                        <Cell v-if="flow.mode == '1' && flow.command == '1'" title="Command" extra="Player Quits" />
                        <Cell v-if="flow.mode == '1' && flow.command == '2'" title="Command" extra="Ai Concedes" />
                        <Cell v-if="flow.mode == '1' && flow.command == '3'" title="Command" extra="Load Match" />
                        <Cell v-if="flow.mode == '1' && flow.command == '4'" title="Command" extra="Load Puzzle" />
                        <Cell v-if="flow.mode == '2' && flow.rule == '1'" title="Rule" extra="Clock" />
                        <Cell v-if="flow.mode == '2' && flow.rule == '2'" title="Rule" extra="Store" />
                        <Cell v-if="flow.mode == '2' && flow.rule == '3'" title="Rule" extra="Combat" />
                        <Cell v-if="flow.mode == '2' && flow.rule == '4'" title="Rule" extra="Victory" />
                        <Cell v-if="flow.mode == '2' && flow.rule == '5'" title="Rule" extra="Library" />
                        <Cell v-if="flow.mode == '2' && flow.rule == '6'" title="Rule" extra="Creeps" />
                      </CellGroup>
                    </Card>
                  </i-col>
                </template>
              </Row>

            </div>
          </Panel>
        </template>
      </Collapse>

      <Divider dashed/>
      <div>
        <Button type="success" @click="downloadPuzzle">Export</Button>
      </div>

    </Card>
  </div>
</template>

<script>
// Components
import CardTransfer from "@/components/CardTransfer.vue";
import CardList from "@/components/CardList.vue";
import DeckSelection from "@/components/DeckSelection.vue";
import HeroDeployment from "@/components/HeroDeployment.vue";

// Deck Code Decoder
import { decodeDeck } from "node-artifact-api";

// ...
import { exportPuzzle } from "@/assets/js/export.js";

// Data
import * as cardsCollection from "@/assets/data/cards.json";
import * as rulesCollection from "@/assets/data/rules.json";
import * as matchTempalte from "@/assets/data/match.json";
import * as actorTempalte from "@/assets/data/actor.json";
import * as flowTempalte from "@/assets/data/flow.json";


let uuidv4 = require("uuid/v4");
let clone = require('clone');
let download = require("downloadjs");
var str = require("underscore.string");

export default {
  name: "Build",
  components: {
    CardTransfer,
    CardList,
    DeckSelection,
    HeroDeployment
  },
  methods: {
    addMatch() {
      let match = clone(matchTempalte.default);
      match.key = uuidv4();
      match.player = clone(actorTempalte.default);
      match.player.rules.creeps.list = this.creeps.filter(_ => _.id == 1006);
      match.ai = clone(actorTempalte.default);
      match.ai.rules.creeps.list = this.creeps.filter(_ => _.id == 1006);
      match.sequence.flow = clone(flowTempalte.default);
      this.puzzle.matches.push(match);
    },
    removeMatch(key) {
      this.puzzle.matches = this.puzzle.matches.filter(_ => _.key != key);
    },
    getMatchName(index) {
      return "Match " + (index + 1).toString();
    },
    addFlow(match) {
      let flow = match.sequence.flow;
      if(flow.key == 0) {
        flow.key = uuidv4();
        match.sequence.flows.push(flow);
      } else {
        let index = match.sequence.flows.findIndex(_ => _.key == flow.key);
        match.sequence.flows[index] = flow;
      }
      
      match.sequence.flows.sort(function(lhs, rhs) { return (lhs.turn == rhs.turn) ? lhs.lane - rhs.lane : lhs.turn - rhs.turn; });
      
      match.sequence.flow = clone(flowTempalte.default);
      match.sequence.show = false;
    },
    editFlow(match, key) {
      let flow = match.sequence.flows.find(_ => _.key == key);
      match.sequence.flow = flow;
      match.sequence.show = true;
    },
    removeFlow(match, key) {
      match.sequence.flows = match.sequence.flows.filter(_ => _.key != key);
    },
    downloadPuzzle() {
      // let template = document.getElementById("vdf-text").value
      let data = exportPuzzle(this.puzzle);
      //console.log("File", data);
      download(data.body, data.name + ".txt", "text/plain");
    }
  },
  computed: {
    heroes: function() {
      return [];
    },
    creeps: function () {
      let sets = cardsCollection.default;
      let creeps = sets.filter(_ => _.card_type == "Creep");
      let cards = creeps.map(function(_) { 
        return {
          key: uuidv4(),
          id: _.card_id,
          label: _.card_name.english,
          image: _.large_image ? _.large_image.default : '',
          data: _
        };
      });
      return cards;
    },
    draw: function() {
      let sets = cardsCollection.default;
      let libray = sets.filter(_ => _.mana_cost != undefined);
      let cards = libray.map(function(_) {
        return {
          key: uuidv4(),
          id: _.card_id,
          label: _.card_name.english,
          image: _.large_image ? _.large_image.default : '',
          data: _
        };
      });
      return cards;
    },
    items: function() {
      let sets = cardsCollection.default;
      let libray = sets.filter(_ => _.gold_cost != undefined);
      let cards = libray.map(function(_) {
        return {
          key: uuidv4(),
          id: _.card_id,
          label: _.card_name.english,
          image: _.large_image ? _.large_image.default : '',
          data: _
        };
      });
      return cards;
    }
  },
  data() {
    return {
      puzzle: {
        name: "Test Puzzle",
        matches: []
      },
      options: {
        match: {
          active: "0",
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