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
    onChange(keys) {
      let self = this;
      self.selection.image = require('../assets/imgs/empty.png');
      self.selection.collection = [];
      let value = [];

      // DELTA
      let add = keys.filter(function(i) {return self.target.indexOf(i) < 0;});
      let remove = self.target.filter(function(i) {return keys.indexOf(i) < 0;});

      if(add.length > 0) {
        // Convert add from key to card
        let collection = this.cards.filter(_ => add.includes(_.key) == true);
        value = this.value.concat(collection);
      }

      if(remove.length > 0) {
        value = this.value.filter(_ => remove.includes(_.key) == false);
      }

      this.$emit('input', value);
      this.$emit('on-change');

      /*
      for (const key of keys) {
        for (const card of self.cards) {
          if(card.key == key) {
            value.push(card);
          }
        }
      }
      */
      // let value = this.cards.filter(_ => newTargetKeys.includes(_.key) == true);
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
    let image = require('../assets/imgs/empty.png'); 
    if(this.value.length == 1) {
      image = this.value[0].image;
    }

    return {
      selection: {
        image: image,
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