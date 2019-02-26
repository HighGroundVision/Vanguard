<!-- @format -->

<template>
  <div class="build">
    <Card>
      <h1>Build Puzzle</h1>
      <p>
        Currently you can create the puzzles and then download them locally.
        This means you can not save puzzles currently.
        We want to add, in the future, a system to save, publish and share your puzzles with others.
      </p>
      <p>
        Although we have a lot of options we do not cover every use case.
        We only handled the most common ones, if you come across a element, rule, command, etc. that you think should be added reach out to us.
      </p>
      <Divider dashed/>

      <Form :label-width="200">
        <FormItem label="Name">
          <Input v-model="puzzle.name" placeholder="..." />
        </FormItem>
      </Form>
      <Divider dashed/>

      <h2>Matches</h2>
      <p>Each match is a different game of Artifact. This is like how the tutorial forces you play the two matches before the rest of the game is unlocked.</p>
      <p>You should not need more then one match, but we left the option open for those that want to do a gauntlet of matches.</p>
      <br />
      <Alert type="error">WARNING: Artifact seems to lock the player into these matches until the collection of matches is over. This could be very annoying for the player.</Alert>
      <br />

      <div>
        <Button type="primary" @click="addMatch">Add Match</Button>
      </div>
      <Divider dashed/>

      <Collapse v-model="options.match.active" accordion>
        <template v-for="(match, skey) in puzzle.matches">
          <Panel :key="match.key" :name="match.key">
            {{ getMatchName(skey) }}
            <Button type="error" class="float-right" @click="removeMatch(match.key)">Remove</Button>
            <div slot="content">
 
              <h2>Decks</h2>
              <p>
                Each side needs a deck. The simplest option is let the player supply the decks for both the player and Ai.
              </p>
              <p>
                When you supply the decks you can supply one or multiple if you want to user to pick from a collection.
                But some options are only available if you supply a single valid deck, this is because the deck needs to be known to use these options.
              </p>
              <br />

              <Divider><strong>Player</strong></Divider>
              <DeckSelection :actor.sync="match.player" />
              
              <Divider><strong>Ai</strong></Divider>
              <DeckSelection :actor.sync="match.ai" />
              
              <Divider dashed />
              <h2>Setup</h2>
              <p>
                These are the initial Rules that can be controlled at the begin of the match.
                Some of these Rules can be changed during the flow of the match.
                Some sections will list additional rules we are looking to implement.
                Rules are either general and apply to both sides, or they apply to the player or Ai.
              </p>
              <br />
              <Alert type="info">NOTE: If the default are not inline with a regular match please let use know so we can fixed it.</Alert>
              <br />

              <h3>Time</h3>
              <AdditionalRules :rules="['shotclock_only','time_penalty_for_expired_shot_clock']" />
              <p>
                These are rules that control the flow of time in the match.
                If timeout is enabled and what the value of say timeout would be.
              </p>
              
              <Form :label-width="200">
                <FormItem label="No Timeout">
                  <i-switch v-model="match.rules.clock.no_shotclock" />
                </FormItem>
                <FormItem label="Time Per Turn" v-if="match.rules.clock.no_shotclock === false">
                  <InputNumber :max="9999" :min="0" v-model="match.rules.clock.shotclock_base_time"></InputNumber>
                </FormItem>
              </Form>

              <h3>Deployment - Heroes</h3>
              <AdditionalRules :rules="['deploy_heroes_enabled', 'this_turn_hero_deployment_order']" />
              <p>
                These are rules that control the initial hero deployment, better known as the flop.
                This includes the number of heroes to flop and which lane the heroes are deployed to.
              </p>

              <Divider><strong>Player</strong></Divider>
              <HeroDeployment :actor.sync="match.player" />

              <Divider><strong>Ai</strong></Divider>
              <HeroDeployment :actor.sync="match.ai" />

              <h3>Deployment - Creeps</h3>
              <p>
                These are rules that control the initial creep development.
                This includes the pathing, spread, list, and amount.
              </p>
              <p>
                The creep amount and counts do not need to match, but the number should be at least equal to the number of creeps in the list so that one of each will spawn. 
                If you want more of each type then use the increase the count. You can also increase the odds of deployment by adding the same creep multiple times.
              </p>
              <br />
              <Alert type="info">
                EXAMPLE: Two Meele Creeps and one Centaur Hunter is added to creep list but the count is one. This means that the odds of getting a Meele Creep is 2/3 vs 1/3 for a Centaur Hunter.
              </Alert>
              
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
                    <Radio label="2">The creeps toward lane 1 the first</Radio>
                    <Radio label="3">The creeps will always land across from heroes first</Radio>
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
              <AdditionalRules :rules="['tower_armor', 'tower_current_mana', 'tower_attribute']" />
              <p>
                These are rules that control the structures setup.
                This includes the initial mana, tower health in each lane, and ancient health in each lane.
              </p>
              
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
              <AdditionalRules :rules="['card_draw_initial', 'can_have_duplicates', 'can_have_signatures']" />
              <p>
                These are rules that control the library. This is different then your deck, as these are just the cards you draw.
                This includes the initial library order and draw amount.
              </p>
              <br />
              <Alert type="info">
                NOTE: The library order is only available if you have set a single deck.
              </Alert>
  
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
              <AdditionalRules :rules="['pass_to_combat', 'ai_lookahead_limit', 'scale_ai_difficulty']" />
              <p>
                These are rules that control the Ai's combat.
                This includes the pass change and play in draw order options.
              </p>

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
              <p>
                These are rules that control the shopping phase.
                This includes if the shop is enabled the store order and forcing the secret shop item.
              </p>
              <br />
              <Alert type="info">
                NOTE: The shop order is only available if you have set a single deck.
              </Alert>
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
              <p>
                These are rules that add more victory conditions
                This includes gold, units, and kills.
              </p>
              <p>
                These just add another victory condition, the match will end when normal conditions are satisfied even if these options are enabled. 
              </p>
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
              <p>
                Although you can update most rules each turn using flows. 
                Sometimes it is just simpler to set the value and let the engine do the work. 
                Each of these rules run each turn.
              </p>
              <br />
              
              <h3>Extras</h3>
              <p>
                These are rules that add bonuses to each side ever turn.
                This includes gold and mana.
              </p>
              
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
              <p>
                These are rules that control the cards drawn each turn.
                This includes the amount of cards to draw and any additional cards.
              </p>
              <br />
              <Alert type="info">
                NOTE: These additional cards are not drawn from the deck but are created on fly.
              </Alert>

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
              <p>
                These are rules that control how creeps are deployed each turn.
                This includes the amount of creeps from the creep list. 
                This is so that initial can be different then each turn.
              </p>
              <br />
              <Alert type="info">
                NOTE: You can use the flow to change the creep list and amount each turn.
              </Alert>

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
              <p>
                The flow of the match is not something you can control only react to. 
                To this end we have hidden a lot of mess of track turns and lanes. 
                So you can just state what you wish to change when and the system will handle building the correct sequence so that event will be triggered in correct turn and lane.
              </p>
              <br />
              <Alert type="info">
                NOTE: Shopping and Deployment happen between lane 3 and and lane 1 of next turn. 
                So if you want to change the shop or deployment options you should do it on lane 3 so they are active before the shopping and deployment.
                <br />
                Like wise if you want to the player to auto quit at the end of 3 turn then the player quit command should be on turn 4 lane 1.
              </Alert>
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
                
                <p>
                  A flow allows you to invoke a command or change rules at given turn and lane. Most rules in the Setup / Turn sections can be changed here.
                </p>
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
      <strong>Load Your Puzzle</strong>
      <div style="padding-left: 25px;">
        <ol>
          <li>right click artifact in your steam library, click properties, click set launch options, and type in "-dev -console"</li>
          <li>get {{filename}}.txt from the download location, and place it in "../steam/steamapps/common/artifact/game/dcg/puzzles" (if the folder 'puzzles' doesn't exist, create one)</li>
          <li>launch artifact, and press the tilde (`) key. It's the key above tab. If the console doesn't pop up, go back to step 1</li>
          <li>in the console, type "load_puzzle {{filename}}" and press enter</li>
          <li>press tilde (`) again to close console as game starts</li>
        </ol>
      </div>
      <br />
      <strong>Test Your Puzzle</strong>
      <p>You should always test your puzzles before you publish them.</p>
      <br />
      <div>
        <Button type="success" @click="downloadPuzzle">Download</Button>
        <Button type="success" @click="copyPuzzle" class="step-right">Copy</Button>
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
import AdditionalRules from "@/components/AdditionalRules.vue";

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
    HeroDeployment,
    AdditionalRules
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
      let data = exportPuzzle(this.puzzle);
      download(data, this.filename + ".txt", "text/plain");
    },
    copyPuzzle() {
      let data = exportPuzzle(this.puzzle);

      const el = document.createElement('textarea');
      el.value = data;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      
      this.$Notice.success({ title: 'Copied To Clipboard' });
    }
  },
  computed: {
    filename: function() {
      return str(this.puzzle.name).trim().underscored().value();
    },
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
    setTimeout(() => this.addMatch(), 1000);
    setTimeout(() => this.options.match.active = this.puzzle.matches[0].key, 1500);

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