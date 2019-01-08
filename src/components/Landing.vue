<template>
  <div class="landing">
    <div class="content">
      <h1>xq</h1>
      <p>A live markdown editor and storage bin based on <a href="https://blockstack.org" target="_blank">Blockstack</a></p>
      <button class="btn btn-default" @click.prevent="signIn">Sign In With Blockstack</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'landing',
  data () {
    return {
      blockstack: window.blockstack
    }
  },

  methods: {
    signIn () {
      const blockstack = this.blockstack
      blockstack.redirectToSignIn()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.landing {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

* {
  font-family: "Helvetica Neue", sans-serif;
}

h1 {
  font-size: 3em;
  text-align: center;
  border: solid black 0.1em;
  border-radius: 0.5em;
  padding: 0.5em;
  display: inline;
  margin-right: auto;
  margin-left: auto;
}
</style>
