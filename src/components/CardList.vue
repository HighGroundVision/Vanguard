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
    onChange(newTargetKeys) {
      this.selection.image = "";
      this.selection.collection = [];

      let value = this.cards.filter(_ => newTargetKeys.includes(_.key) == true);
      this.$emit('input', value);
    },
    onSelectedChange(sourceSelectedKeys, targetSelectedKeys) {
      if (sourceSelectedKeys.length === 0 && targetSelectedKeys.length === 0) {
        this.selection.image = "";
        return;
      }

      let keys = [].concat(sourceSelectedKeys).concat(targetSelectedKeys);
      let addation = keys.find(_ => this.selection.collection.includes(_) == false);
      this.selection.collection = keys;

      let template = this.cards.find(function(v) { return v.key === addation; });
      this.selection.image = template.image;
    }
  },
  computed: {
    source: function () {
      return this.cards.slice();
    },
    target: function () {
      return this.value.map(_ => _.key);
    }
  },
  data() {
    return {
      selection: {
        image: '',
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