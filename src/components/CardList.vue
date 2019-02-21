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

function copyCollection(collection) {
  let copies = collection.map(src => {
      let obj = Object.assign({}, src);
      obj.key = uuidv4();
      return obj;
    });
  return copies;
}

export default {
  name: "CardList",
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
    onSelectedChange(sourceSelectedKeys, targetSelectedKeys) {
      if (sourceSelectedKeys.length === 0 && targetSelectedKeys.length === 0) {
        this.selection.image = require('../assets/imgs/empty.png');
        return;
      }

      let keys = [].concat(sourceSelectedKeys).concat(targetSelectedKeys);
      let addation = keys.find(_ => this.selection.collection.includes(_) == false);
      this.selection.collection = keys;

      let template = this.source.find(function(v) { return v.key === addation; });
      if(template) {
        this.selection.image = template.image;
      }
    },
    onChange(targets, direction, keys) {
      // console.log("newTargetKeys", targets);
      // console.log("direction", direction);
      // console.log("moveKeys", keys);
      
      this.selection.image = require('../assets/imgs/empty.png');
      this.selection.collection = [];

      if(targets.length === 0) {
        let source = this.cards;
        source.sort(function(lhs, rhs) { return lhs.label.localeCompare(rhs.label);});
        this.source = source;
        this.target = [];
        this.$emit('input', []);
        this.$emit('on-change');
      } else if(direction == 'right') {
        let movement = this.source.filter(_ => keys.includes(_.key) == true);
        let copies = copyCollection(movement);
        this.source = this.source.concat(copies);
        this.source.sort(function(lhs, rhs) { return lhs.label.localeCompare(rhs.label);});

        this.target = targets;
        let value = this.source.filter(_ => targets.includes(_.key) == true);
        this.$emit('input', value);
        this.$emit('on-change');
      } else if(direction == 'left') {
        this.source = this.source.filter(_ => keys.includes(_.key) == false);

        this.target = targets;
        let value = this.source.filter(_ => targets.includes(_.key) == true);
        this.$emit('input', value);
        this.$emit('on-change');
      }
    }
  },
  data() {
    let copies = copyCollection(this.value);
    let source = this.cards.concat(copies);
    source.sort(function(lhs, rhs) { return lhs.label.localeCompare(rhs.label);});

    let target = this.value.map(_ => _.key);

    return {
      source: source,
      target: target,
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