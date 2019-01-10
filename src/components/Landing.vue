<template>
<div>
  <div class="bg-img">
  </div>
      <section class="main">
      <transition name="fadeslogan" appear>  
        <h1 v-if="show">xq</h1>
      </transition>
      
      <transition name="fade" appear>
        <span>A live and decentralized</span>
      </transition>

      <transition name="bold" appear>
        <span v-if="showSlogan">markdown</span>
      </transition>

      <transition name="fade" appear>
        <span v-if="showSlogan">editor</span>
      </transition>

      <transition name="fadepointone" appear>
        <p>Decentralized</p>
      </transition>
      
      <transition name="fadebutton" appear>

      <button class="btn btn-default" @click.prevent="signIn">Sign In With Blockstack</button>
      </transition>
      
      <transition name="fadefooter" appear>
        <small>2019 | Created By Silvia O'Dwyer | View on <a href="https://github.com/silvia-odwyer/xq">GitHub</a></small>
      </transition>
    </section>

  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: 'landing',
  data () {
    return {
      blockstack: window.blockstack,
      show: true,
      showSlogan: true
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

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro|Roboto:100,300,400,500');

* {
  box-sizing: border-box;
}

h1, small {
font-family: "Roboto", sans-serif;
text-align: center;
}

span {
  font-family: "Source Sans Pro";
  font-size: 1.5em;
  font-weight: 400;
}

/* span {
  font-size: 2em;
  font-family: "Roboto 400", sans-serif;
  /* color: rgb(89, 100, 117); */


.bg-img {
    -webkit-filter: blur(2px) brightness(50%);;
    min-height: 100vh;
}

.main {
  top: 30vh;
  right: 50vh;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  padding: 2em;
  text-align: center;
  width: 50%;
  font-family: "Roboto 100", sans-serif;
}

.landing {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  display: block;
  padding: 0.7em;
  margin-bottom: 2em;
  color: gray;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  margin-right: auto;
  margin-left: auto;
  font-size: 1.2em;

}

button:hover {
  background-color: rgb(67, 77, 78);
}

.main {
  margin-left: auto;
  margin-right: auto;
}

small {
  
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fadeslogan-enter-active, .fadeslogan-leave-active {
  transition: opacity 2s;
  transition-delay: 1s;
}
.fadeslogan-enter, .fadeslogan-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fadebutton-enter-active, .fadeslogan-leave-active {
  transition: opacity 2s;
  transition-delay: 2s;
}
.fadebutton-enter, .fadeslogan-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fadefooter-enter-active, .fadefooter-leave-active {
  transition: opacity 2s;
  transition-delay: 3s;
}

.fadefooter-enter, .fadefooter-leave-to {
  opacity: 0;
}

.fadepointone-enter-active, .fadepointone-leave-active {
  transition: opacity 2s;
  transition-delay: 3s;
}

.fadepointone-enter, .fadepointone-leave-to {
  opacity: 0;
}


.slide-in-enter-active, .slide-in-leave-active {
  transition: opacity 2s;
  transition-delay: 4s;
}

.slide-in-enter, .slide-in-leave-to {
  opacity: 0;

}

.bold-enter-active, .bold-leave-active {
  transition: opacity 2s;
  transition-delay: 1s;
}

.bold-enter, .bold-leave-to {
  opacity: 0;

}
</style>