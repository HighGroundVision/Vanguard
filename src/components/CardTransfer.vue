<template>
  <div>
  <img :src="selection.image" class="float-right" style="height: 400px;">
  <Transfer
    :data="source"
    :target-keys="target"
    :titles="tiles"
    :list-style="{ width: '250px', height: '400px' }"
    not-found-text="Empty"
    @on-change="onChange"
    @on-selected-change="onSelectedChange"
  ></Transfer>
  </div>
</template>

<script>
let uuidv4 = require("uuid/v4");

export default {
  name: "CardTransfer",
  props: {
    tiles: {
      type: Array,
      required: true
    },
    cards: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: []
    },
  },
  methods: {
    onChange(newTargetKeys) {
      this.selection.image = require('../assets/imgs/empty.png');
      this.selection.collection = [];
      let value = this.cards.filter(_ => newTargetKeys.includes(_.key) == true);
      this.$emit('input', value);
      this.$emit('on-change');
    },
    onSelectedChange(sourceSelectedKeys, targetSelectedKeys) {
      if (sourceSelectedKeys.length === 0 && targetSelectedKeys.length === 0) {
        this.selection.image = require('../assets/imgs/empty.png');
        return;
      }

      let keys = [].concat(sourceSelectedKeys).concat(targetSelectedKeys);
      let addation = keys.find(_ => this.selection.collection.includes(_) == false);
      this.selection.collection = keys;

      let template = this.cards.find(function(v) { return v.key === addation; });
      if(template) {
        this.selection.image = template.image;
      }
    }
  },
  computed: {
    source: function () {
      let source = this.cards;
      source.sort(function(lhs, rhs) {
        return lhs.label.localeCompare(rhs.label);
      });
      return source;
    },
    target: function () {
      return this.value.map(_ => _.key);
    }
  },
  data() {
    return {
      selection: {
        image: require('../assets/imgs/empty.png'),
        collection: [],
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .float-right {
    float: right;
    margin: 3px;
  }
</style>