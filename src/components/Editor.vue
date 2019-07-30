<template>
    <div contenteditable="true" @input="updateHTML" class="textareaRoot"></div>
</template>
<script>
/*eslint-disable*/

export default {
  // Custom textarea
  name: "textEditor",
  props: ["value"],
  mounted: function() {
    this.$el.innerHTML = this.value;
  },
  methods: {
    updateHTML: function(e) {
      this.$emit("input", e.target.innerHTML);
      console.log("change", e.target.innerHTML);
    }
  },
};
</script>