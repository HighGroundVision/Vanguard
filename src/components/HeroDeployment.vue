<template>
  <Form :label-width="200">
    <FormItem label="Heroes Initial Deployment">
      <RadioGroup v-model="actor.rules.flop.mode" :vertical="true">
        <Radio label="1">The hero flop is random</Radio>
        <Radio label="2">The hero flop is based on deck order</Radio>
        <Radio label="3" v-if="actor.decks.length == 1">Supply the flop order</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="# Heroes to flop" v-if="actor.rules.flop.mode !== '3'">
      <InputNumber :max="5" :min="0" v-model="actor.rules.flop.heroes"></InputNumber>
    </FormItem>

    <div v-if="actor.rules.flop.mode === '3'">
      <FormItem label="Hero in Lane 1">
        <Select v-model="actor.rules.flop.lane_1">
          <Option v-for="item in actor.decks[0].cards.heroes" :value="item.data.card_id" :key="item.data.card_id">{{ item.data.card_name.english }}</Option>
        </Select>    
      </FormItem>
      <FormItem label="Hero in Lane 2">
        <Select v-model="actor.rules.flop.lane_2">
          <Option v-for="item in actor.decks[0].cards.heroes" :value="item.data.card_id" :key="item.data.card_id">{{ item.data.card_name.english }}</Option>
        </Select>
      </FormItem>
      <FormItem label="Hero in Lane 3">
        <Select v-model="actor.rules.flop.lane_3">
          <Option v-for="item in actor.decks[0].cards.heroes" :value="item.data.card_id" :key="item.data.card_id">{{ item.data.card_name.english }}</Option>
        </Select>
      </FormItem>
    </div>
  </Form>
</template>

<script>
let uuidv4 = require("uuid/v4");
let clone = require('clone');

export default {
  name: "HeroDeployment",
  props: {
    actor: Object,
  },
  methods: {
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>