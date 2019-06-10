// The HTML and CSS in this component were adapted from a template provided by Cruip. 
// This was used by me for rapid prototyping, but will be moving to a custom solution over the Summer.
// Their templates are available for open-source developers and startups. 
// This particular template is available here: https://demo.cruip.com/holly/
// If you would like to use this template in your own work, please visit the above link
// and make sure to follow the licenses.
<template>
<body class="has-animations">
    <div class="">
        <header class="site-header">
            <div class="container">
                <div class="site-header-inner">
                    <div class="brand header-brand">
                        <h1 class="m-0">
                            <a href="#">
                                <span class="logo">xenon</span>
                            </a>
                        </h1>
                    </div>
                </div>
            </div>
        </header>

        <main>
            <section class="hero">
				<div class="hero-left-decoration"></div>
				<div class="hero-right-decoration"></div>
                <div class="container">
                    <div class="hero-inner">
						<div class="hero-copy">
	                        <h1 class="hero-title mt-0">Create and edit notes with confidence.</h1>
	                        <p class="hero-paragraph">Xenon is a note editor for the decentralized web, allowing you to create and save notes. Also includes Markdown support.</p>

	                        <p class="hero-cta mb-0">
								<a class="button button-primary button-shadow" href="#" @click.prevent="signIn" >Get started</a>
							</p>
						</div>
						<div class="hero-illustration">
						</div>
                    </div>
                </div>
            </section>

			<section class="features section text-center">
                <div class="container">
                    <div class="features-inner section-inner has-top-divider">
						<div class="features-header text-center">
							<div class="container-sm">
								<h2 class="section-title mt-0">Meet Xenon</h2>
								<p class="section-paragraph mb-0">Xenon helps you take notes, and save them on the decentralized web. New features are 
                                    always on the way.
                                </p>
							</div>
						</div>
                        <div class="features-wrap">
                            <div class="feature">
                                <div class="feature-inner">
                                    <div class="feature-icon">
                                        <img src="../assets/images/feature-icon-01.svg" alt="Feature 01">
                                    </div>
                                    <h4 class="feature-title">Privacy</h4>
                                    <p class="text-sm">Only you can view your notes.</p>
                                </div>
                            </div>
                            <div class="feature">
                                <div class="feature-inner">
                                    <div class="feature-icon">
                                        <img src="../assets/images/feature-icon-02.svg" alt="Feature 02">
                                    </div>
                                    <h4 class="feature-title">Stored on the blockchain</h4>
                                    <p class="text-sm">All notes are stored with Gaia storage, giving you total piece of mind.</p>
                                </div>
                            </div>
                            <div class="feature">
                                <div class="feature-inner">
                                    <div class="feature-icon">
                                        <img src="../assets/images/feature-icon-03.svg" alt="Feature 03">
                                    </div>
                                    <h4 class="feature-title">No server outages</h4>
                                    <p class="text-sm">Centralized solutions lead to downtime if servers go down. Not with Xenon.</p>
                                </div>
                            </div>
                            <div class="feature">
                                <div class="feature-inner">
                                    <div class="feature-icon">
                                        <img src="../assets/images/feature-icon-04.svg" alt="Feature 04">
                                    </div>
                                    <h4 class="feature-title">Customizable</h4>
                                    <p class="text-sm">With over 30 editor themes to choose from, you can make Xenon look and behave as you wish. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

			<section class="features-tabs section">
                <div class="container">
                    <div class="features-tabs-inner section-inner has-top-divider">
						<div class="tabs-container">
							<ul class="tabs-links">
								<li class="">
									<a  class="tab-link" @click="setActiveTab(0)">
										<img src="../assets/images/tabs-icon-01.svg" alt="Tabs icon 01">
										<span class="h4 m-0">Organise your notes</span>
									</a>
								</li>
								<li>
									<a class="tab-link"  @click="setActiveTab(1)">
										<img src="../assets/images/tabs-icon-02.svg" alt="Tabs icon 02">
										<span class="h4 m-0">Total customisation</span>
									</a>
								</li>
								<li>
									<a class="tab-link"  @click="setActiveTab(2)">
										<img src="../assets/images/tabs-icon-03.svg" alt="Tabs icon 03">
										<span class="h4 m-0">Ease of use</span>
									</a>
								</li>
							</ul>
							<div class="tabs-content">
								<div id="tab-1" class="tab-panel is-active" >
									<h2>Discover</h2>
									<p>Discover the multitude of ways you can access your notes, from your smartphone to your desktop browser. Access your notes anytime, anywhere.</p>
									<p class="mb-0">Whether you're editing your notes at home or on the go, there's an option for you.</p>
								</div>
								<div id="tab-2" class="tab-panel">
									<h2>Power of customisation</h2>
									<p>Customise Xenon's editor with over 30 built-in themes and an additional Dark Mode for those late-night editing sessions.</p>
									<p class="mb-0">We're always developing new features for Xenon, so keep an eye out for these in the future.</p>
								</div>
								<div id="tab-3" class="tab-panel">
									<h2>Keep it simple</h2>
									<p>A lightweight and minimal interface means no lag.</p>
									<p class="mb-0">Access your notes quickly and easily, and less time rummagging means more time editing.</p>
								</div>
							</div>
						</div>
                    </div>
                </div>
            </section>

			<section class="cta section">
				<div class="container">
					<div class="cta-inner section-inner">
						<h3 class="section-title mt-0">Get started with Xenon for free</h3>
						<div class="cta-cta">
							<a class="button button-primary button-shadow" href="#" @click.prevent="signIn">Sign-up</a>
						</div>
					</div>
				</div>
			</section>
        </main>

        <footer class="site-footer">
            <div class="container">
                <div class="site-footer-inner">
                    <div class="brand footer-brand">
                        <!-- <a href="#">
                            <img src="dist/images/logo.svg" alt="Blue logo">
                        </a> -->
                    </div>
                    <ul class="footer-links list-reset">
                        <li>
                            <a href="https://github.com/silvia-odwyer">Contact</a>
                        </li>
                        <li>
                            <a href="https://github.com/silvia-odwyer/xenon">GitHub</a>
                        </li>
                        <li>
                            <a href="#">Product Hunt</a>
                        </li>
                        <li>
                            <a href="#">Support</a>
                        </li>
                    </ul>
                    <ul class="footer-social-links list-reset">
                        <li>
                            <a href="#">
                                <span class="screen-reader-text">Facebook</span>
                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z" fill="#FFF"/>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="screen-reader-text">Twitter</span>
                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z" fill="#FFF"/>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span class="screen-reader-text">Google</span>
                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" fill="#FFF"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                    <div class="footer-copyright">&copy; 2019 Xenon. All rights reserved.</div>
                </div>
            </div>
        </footer>
    </div>
</body>
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
      displayStatus: "none",
      heroDesktopBg: ""
    }
  },
  mounted () {
    let app = this;
    // window.setTimeout(() => {
    //   app.displayMarkdownAnimation();
    // }, 1000);

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
    setActiveTab(tab_num) {
        console.log("setactive")
        let tabs = document.querySelectorAll(".tab-panel");
        for (let k=0; k < tabs.length; k++) {
            let tab = tabs[k];
            tab.classList.remove("is-active");
        }
        tabs[tab_num].className += " is-active";
    }


    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro|Roboto:100,300,400,500|Montserrat|Fira+Sans:400,400i,500,700');
@import '../assets/assets/scss/style.scss';

a {
  padding-left: 2px;
}

.tab-panel {
cursor: pointer;
}

.logo {
font-size: 0.6em;
}

.site-header {
    padding: 0px;
}
</style>