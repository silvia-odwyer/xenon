<template>
<div>
  <div class="bg-img">
  </div>
      <section class="main">
      <transition name="fadepointone" appear>  
        <h1 v-if="show" >xq</h1>
      </transition>
      
      <transition name="fade" appear>
        <span>A live and decentralized</span>
      </transition>

      <transition name="fade" appear>
        <span v-if="showSlogan" id="markdown">markdown</span>
      </transition>

      <transition name="fade" appear>
        <span v-if="showSlogan">editor</span>
      </transition>
      
      <transition name="fadebutton" appear>

      <button class="btn btn-default" @click.prevent="signIn">Get Started</button>
      </transition>

      <div class="loader-anim" v-bind:style="{ display: displayStatus }">
        <div></div>
        <div></div>
        <div></div>
        </div>
        
      
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
      showSlogan: true,
      displayStatus: "none"
    }
  },
  mounted () {
    let app = this;
    window.setTimeout(() => {
      app.displayMarkdownAnimation();
    }, 1000);
  },
  methods: {
    signIn () {
      const blockstack = this.blockstack;
      let button = document.getElementById("signInButton");
      this.displayStatus = "flex";

      blockstack.redirectToSignIn();
    },
    displayMarkdownAnimation() {
      let markdown_elem = document.getElementById("markdown");
      let app = this;
      var interval_id = window.setInterval(function(){app.animateText(markdown_elem);}, 900);

    },
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    animateText(current_message){
        let colors = ["red", "navy", "blue"];
        current_message.style.color = colors[this.getRandomNumber(0, colors.length - 1)];

        let styles = ["oblique", "italic", "normal", "underline"];
        current_message.style.fontStyle = styles[this.getRandomNumber(0, styles.length - 1)];

        let weights = ["bold", "normal"]
        current_message.style.fontWeight = weights[this.getRandomNumber(0, weights.length - 1)];

        let decorations = ["underline", "line-through", "none", "underline wavy blue", "undeline wavy red"];
        current_message.style.textDecoration = decorations[this.getRandomNumber(0, decorations.length - 1)];

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
  display: block;
  width: 20%;
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
  top: 10vh;
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
  margin-top: 1em;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  margin-right: auto;
  margin-left: auto;
  font-size: 1.2em;
  border: none;
  border-radius: 0.2em;

}

button:hover {
  font-weight: 500
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
  transition-delay: 4s;
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

@keyframes loader-anim {
to {
  opacity: 0.1;
  transform: translate3d(0, -1rem, 0);
  }
}
  
  .loader-anim {
    display: "none";
    justify-content: center;
  }

  .loader-anim > div:nth-child(2) {
    animation-delay: 0.2s;
  }

  .loader-anim > div:nth-child(3) {
    animation-delay: 0.4s;
  }

  .loader-anim > div {
    width: 1rem;
    height: 1rem;
    margin: 3rem 0.2rem;
    background: #8385aa;
    border-radius: 50%;
    animation: loader-anim 0.6s infinite alternate;
    }
</style>