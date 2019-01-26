<template>
   <el-container class="dashboard">
      <el-header style="text-align: right; font-size: 12px">

         <el-menu :default-active="String(activeIndex)" class="el-menu" mode="horizontal">
            
            <el-menu-item index="1" class="logo">xq</el-menu-item>
            <el-submenu index="2" class="options">
               <template slot="title">File</template>
               <el-menu-item index="2-1" v-on:click="createNewNote()"> <i class="el-icon-circle-plus"></i>New</el-menu-item>
               <el-menu-item index="2-2" v-on:click="saveNote()"><i class="el-icon-document"></i>Save</el-menu-item>

            </el-submenu>

            <el-submenu index="3" class="gh">
               <template slot="title">GitHub</template>
               <el-menu-item index="3-1"><a href="https://github.com/silvia-odwyer/xq/issues"><i class="el-icon-bell"></i>Submit Issue</a></el-menu-item>
               <el-menu-item index="3-2"><a href="https://github.com/silvia-odwyer/xq/"><i class="el-icon-news"></i>View Repo</a></el-menu-item>

            </el-submenu>
            <el-menu-item index="4" class="logout" v-on:click="signOut">
               Logout
            </el-menu-item>
         </el-menu>
         
      </el-header>
      <el-container>
		  
         <el-aside width="200px" class="outer_aside"> 
           
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
               <el-menu :default-openeds="['1', '3']" :collapse="isCollapse">
                  <el-button type="primary" plain icon="el-icon-edit" class="new_note" v-on:click="createNewNote()">New Note</el-button>
                  <el-submenu index="1">
                     <template slot="title"><i class="el-icon-message"></i>Your Notes</template>
                     <el-menu-item-group>
                        <template slot="title">Recently Added</template>
                        <el-menu-item :index="String(note.id)" v-for="note in markdown_notes" v-on:click="displayNote(note); changeActiveFileListing($event)" class="note_listing" v-bind:key="note.id">
							{{note.filename}}
                        <a @click.prevent="markdown_notes.splice(markdown_notes.indexOf(file), 1)" class="delete pull-right" href="#">x</a>
                        </el-menu-item>
                     </el-menu-item-group>
                    </el-submenu>
                 <el-submenu index="2">
                     <template slot="title"><i class="el-icon-menu"></i>Themes</template>
                     <el-menu-item-group class="themes_drawer">
                        <template slot="title">All Themes Available</template>
                        <el-menu-item index="1-1" v-for="theme in themes" v-on:click="changeTheme(theme)" v-bind:key="theme">{{theme}}</el-menu-item>
                     </el-menu-item-group>
                </el-submenu>
                    <el-submenu index="3">
                     <template slot="title"><i class="el-icon-setting"></i>More</template>

					<el-menu-item-group>
                        <template slot="title"></template>
                        <el-menu-item index="3-1">
							<el-checkbox v-model="isTabNav">Enable Tabs</el-checkbox>
						</el-menu-item>
                     </el-menu-item-group>
					 
					<el-menu-item-group>
                        <template slot="title"></template>
                        <el-menu-item index="3-2">
							<el-checkbox v-model="isOnePane">One Pane Only</el-checkbox>
						</el-menu-item>
                     </el-menu-item-group>

					<!-- <el-menu-item-group>
                        <template slot="title"></template>
                        <el-menu-item index="3-2">
							<el-checkbox v-model="isCollapse">Collapse</el-checkbox>
						</el-menu-item>
                     </el-menu-item-group> -->

                     <el-menu-item-group>
                        <template slot="title"></template>
                        <el-menu-item index="3-3" v-on:click="signOut">Logout</el-menu-item>
                     </el-menu-item-group>
                    </el-submenu>
               </el-menu>
              <small class="creds">
                Powered by Vue, Blockstack, and loads of regex. 
                Source code on <a href="https://github.com/silvia-odwyer/xq" target="_blank">GitHub</a>
              </small>
            </el-aside>

         </el-aside>
         <el-main>
			<el-row v-if="isTabNav" > 
				<el-menu class="el-menu" mode="horizontal">
					<el-menu-item  v-for="note in markdown_notes" :index="String(note.id)" v-on:click="displayNote(note)" v-bind:key="note.id">
						{{note.filename}}
					</el-menu-item>
         		</el-menu>
			</el-row>
           <el-row>
             <el-col :span="24">
              <el-input placeholder="Note Name" v-model="filename" class="title_input"></el-input>
            </el-col>
            </el-row>

            <section class="live_area">

			<!-- If the user wishes to have the markdown and rendered HTML in different and separate panes,
			these panes will display. -->

            	<codemirror v-model="content" class="editor" :options="cmOptions" v-if="isOnePane == false"></codemirror>

            <section id="content" v-html="markdownToHTML" v-if="isOnePane == false">
            </section>

			<!-- WYSIWYG Editor -->
			<!-- If the user wishes to have the HTML rendered in the same pane, only this pane should display. -->
			<div>
				
				<div class="toolbar" v-if="isOnePane">
					<i class="el-icon-edit" data-command='h2' v-on:click="createH2()"></i>
					<i class="el-icon-minus"></i>
					<i class="el-icon-sort"></i>
					<i class="el-icon-document"></i>
				</div>
				<div contenteditable class="editor" id="singlePane" v-if="isOnePane" v-html="markdownToHTML" @input="renderWYSIWYG()"></div>
            </div>
            </section>

              <el-button type="primary" plain icon="el-icon-circle-check-outline" v-on:click="saveNote()">Save</el-button>
                <form @submit.prevent="saveNote()" :disabled="! content">
                </form>
                
         </el-main>
      </el-container>
   </el-container>
</template>

<script>

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/abcdef.css'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/selection/mark-selection.js'
/*eslint-disable*/

var STORAGE_FILE = 'markdown_files.json'
var themes = ["3024-day", "3024-night", "abcdef", "ambiance", "ambiance-mobile", "base16-dark", "base16-light", "bespin", "blackboard", "cobalt", "colorforth", "darcula", "duotone-dark", "duotone-light", "eclipse", "elegant", "erlang-dark",
	"gruvbox-dark", "hopscotch", "ice-coder", "idea", "isotope", "lesser-dark", "liquibyte", "lucario", "material", "mbo", "mdn-like", "midnight", "monokai", "neat", "neo", "night", "oceanic-next", "panda-syntax", "paraiso-dark", "paraiso-light", "pastel-on-dark", "railscasts", "rubyblue", "seti", "shadowfox", "solarized", "ssms", "the-matrix", "tomorrow-night-bright", "tomorrow-night-eighties", "ttcn", "twilight", "vibrant-ink", "xq-dark", "xq-light", "yeti", "zenburn"
];

export default {
	name: 'dashboard',
	props: ['user'],
	data() {
		return {
			blockstack: window.blockstack,
			markdown_notes: [],
			sample_notes: [],
			todo: '',
			uidCount: 0,
			content: "",
			color: "#890912",
			cmOptions: {
				// Configuring codemirror options.
				tabSize: 4,
				mode: "markdown",
				theme: 'elegant',
				lineNumbers: true,
				autofocus: true,
				styleActiveLine: true,
				line: true,
				lineWrapping: true
			},
			themes: themes,
			activeIndex: "1",
			alertMessage: "",
			filename: "",
			noMarkdownAlert: false,
			noFilenameAlert: false,
			isNewFile: false,
			file: "",
			displayNoteToast: true,
			isTabNav: false,
			isOnePane: false,
			isCollapse: false
		}
	},
	computed: {
		markdownToHTML() {
			// Renders markdown in HTML using regex.
			// Some may a bit buggy; submit an issue if you see any bugs. 

			// Look for the beginning of a line that contains a greater-than symbol, 
			// and enclose the token in blockquote tags. 
			let markdown = this.content.replace(/^\>(.+)/gm, "<blockquote>$1</blockquote>");

			// h5
			markdown = markdown.replace(/[\#]{5}(.+)/gm, "<h5>$1</h5>");

			// h4
			markdown = markdown.replace(/[\#]{4}(.+)/gm, "<h4>$1</h4>");

			// h3
			markdown = markdown.replace(/[\#]{3}(.+)/gm, "<h3>$1</h3>");

			// h2
			markdown = markdown.replace(/[\#]{2}(.+)/gm, "<h2>$1</h2>")

			// h1
			markdown = markdown.replace(/[\#]{1}(.+)/gm, "<h1>$1</h1>")

			// h1 and h2s that consist of equals/plus signs underneath 
			markdown = markdown.replace(/^(.+)\n\+=/gm, '<h1>$1</h1>');
			markdown = markdown.replace(/^(.+)\n\-+/gm, '<h2>$1</h2>');

			// bold text
			markdown = markdown.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>');

			//ul
			markdown = markdown.replace(/^\*(.+)/gm, '<li>$1</li>');
			markdown = markdown.replace(/^\-(.+)/gm, '<li>$1</li>')

			// code 
			markdown = markdown.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>');

			// em should technically be for placing emphasis on certain words,
			// so [TODO] add a check for single-words only.
			markdown = markdown.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>');

			// Strikethrough
			markdown = markdown.replace(/\~~([^\~]+)\~~/g, '<del>$1</del>');

			// blank lines
			markdown = markdown.replace(/^\s*\n/gm, "<br>");


			return (markdown);
		},
		markdownToWYSIWYG() {
			// Renders markdown to What You See is What You Get-style text.
			// Some may a bit buggy; submit an issue if you see any bugs. 

			// Look for the beginning of a line that contains a greater-than symbol, 
			// and enclose the token in blockquote tags. 
			let markdown = this.content.replace(/^\>(.+)/gm, "<blockquote>$1</blockquote>");

			// h5
			markdown = markdown.replace(/[\#]{5}(.+)/gm, "<h5>$1</h5>");

			// h4
			markdown = markdown.replace(/[\#]{4}(.+)/gm, "<h4>$1</h4>");

			// h3
			markdown = markdown.replace(/[\#]{3}(.+)/gm, "<h3>$1</h3>");

			// h2
			markdown = markdown.replace(/[\#]{2}(.+)/gm, "<h2>$1</h2>")

			// h1
			markdown = markdown.replace(/[\#]{1}(.+)/gm, "<h1>$1</h1>")

			// h1 and h2s that consist of equals/plus signs underneath 
			markdown = markdown.replace(/^(.+)\n\+=/gm, '<h1>$1</h1>');
			markdown = markdown.replace(/^(.+)\n\-+/gm, '<h2>$1</h2>');

			// bold text
			markdown = markdown.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>');

			//ul
			markdown = markdown.replace(/^\*(.+)/gm, '<li>$1</li>');
			markdown = markdown.replace(/^\-(.+)/gm, '<li>$1</li>')

			// code 
			markdown = markdown.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>');

			// em should technically be for placing emphasis on certain words,
			// so [TODO] add a check for single-words only.
			markdown = markdown.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>');

			// Strikethrough
			markdown = markdown.replace(/\~~([^\~]+)\~~/g, '<del>$1</del>');

			// blank lines
			markdown = markdown.replace(/^\s*\n/gm, "<br>");

			return (markdown);
		}
	},
	watch: {
		markdown_notes: {
			handler: function (markdown_notes) {
				const blockstack = this.blockstack;

				if (markdown_notes.length == 0) {
					this.markdown_notes = this.sample_notes;
				}

				// encryption is now enabled by default
				return blockstack.putFile(STORAGE_FILE, JSON.stringify(markdown_notes))
			},
			deep: true
		}
	},
	mounted() {
		this.fetchData();
	},
	methods: {
		generateSampleNotes() {
			console.log("gen sample notes called")
			// A method to generate sample notes (as they were hardcoded before)
			// which will make sample note generation easier when tailoring sample notes to certain groups (devs vs consumers), 

			// Will be used for creating templates in the future.
			this.sample_notes = [];
			var note_contents = [{
					filename: "README",
					content: "# Welcome to xq!\n## Some markdown to get you started\n### H3 heading\n#### H4 Heading\nRegular line with some **bold** and *italic* text. \nImage and link support coming soon!\n> 'Insert some famous or inspirational quote here, because this is a blockquote.' \n> ~ Someone famous\n* Bullet point one\n* Bullet point two\n* Bullet point three\n~~Strikethrough text~~"
				},
				{
					filename: "Sample Note",
					content: "# xq \nA markdown editor built for the decentralized web.\nMarkdown is parsed to HTML using regular expressions.\n### Issues or Bugs\nThis is still in alpha, so bugs or issues may arise. If so, please submit an issue. <3 Thanks! \n *Current State*: alpha"
				}
			];

			let generic_note = {
				id: 0,
				hash_id: "",
				content: "",
				filename: "Sample Note",
				language: "markdown",
				completed: false,
				date: this.getDateStamp()
			}

			for (let k = 0; k < note_contents.length; k++) {
				generic_note.id = k;
				generic_note.hash_id = String(this.getDateNow() + note_contents[k].filename);
				generic_note.content = note_contents[k].content;
				generic_note.filename = note_contents[k].filename;
				console.log("new note created", generic_note);
				this.sample_notes.push(generic_note);
			}
			console.log("sample notes", this.sample_notes);
		},
		saveNote() {
			if (this.filename == "") {
				this.noFilenameAlert = true;
				this.displayFileMessage('No title entered!', "warning")
			}

			// Both code and title entered
			else {
				let datestamp = this.getDateStamp();
				// If all_file_ids contains the current ID, then the file exists already
				// Update the file, rather than create a new one

				if (this.isNewFile) {
					// Create a new file.
					this.markdown_notes.unshift({
						id: this.uidCount++,
						hash_id: String(this.getDateNow()),
						content: this.content.trim(),
						filename: this.filename,
						language: this.cmOptions.mode,
						completed: false,
						date: datestamp
					})

					this.isNewFile = false;
        } 
        else {
          // Retrieve the file of interest
					let current_file = this.markdown_notes.filter(file => file.hash_id == this.file.hash_id)[0];

					// Save 
					current_file.content = this.content;

					// Save title
					this.updateTitle(current_file);

					// Update language
					current_file.language = this.cmOptions.mode;

					// Update datestamp
					current_file.datestamp = datestamp

					this.alertMessage = "Saved file!"

				}
				if (this.displayNoteToast) {
					this.displayFileMessage("Saved note!", "success")
					this.showSnackbar = true;
				}

			}
		this.resetNoteToast();
		},
		resetNoteToast() {
			this.displayNoteToast = true;
		},
		displayFileMessage(message_content, msg_type) {
			this.$message({
				message: message_content,
				type: msg_type
			}
		);
		},
		updateTitle(file) {
			if (this.filename == "") {
				// TODO: Add a modal popup saying that the title must not be empty.
			} else {
				file.filename = this.filename;
			}
		},
		displayNote(file) {
			// Save the current note, before moving to the next note.
			this.displayNoteToast = false;
			// this.saveNote();
			
			this.file = file;

			// Update code in the code editor
			this.content = file.content;

			// Update the file's title
			this.filename = file.filename;
			this.current_file_id = file.id;

			// Update language mode
			this.cmOptions.mode = file.language;

			// Scroll to the top of the page
			window.scrollTo(0, 0);

			// Update the relevant tab
			this.activeIndex = file.id;

		},
		renderWYSIWYG() {
			document.designMode = "on";
			let textarea = document.getElementById("singlePane");
		},
		getDateNow() {
			let time = Date.now();
			return time;
		},
		createNewNote() {
			console.log("CRTNEWNOTE files", this.markdown_notes);
			this.content = "";
			this.filename = "";
			this.isNewFile = true;

			this.displayFileMessage('New note created!', "success")
		},
		getDateStamp() {
			let date = new Date();
			let dd = date.getDate();
			let mm = date.getMonth() + 1;
			let yy = date.getFullYear();

			let datestamp = `${dd}/${mm}/${yy}`
			return datestamp;
		},
		fetchData() {
			const blockstack = this.blockstack
			blockstack.getFile(STORAGE_FILE) // decryption is enabled by default
				.then((todosText) => {
					var markdown_notes = JSON.parse(todosText || '[]')
					markdown_notes.forEach(function (note, index) {
						note.id = index
					})
					this.uidCount = markdown_notes.length
					this.markdown_notes = markdown_notes

					if (this.markdown_notes.length == 0) {
						this.markdown_notes = this.sample_notes;
						this.generateSampleNotes()
					}

					this.file = this.markdown_notes[0];
					this.content = this.markdown_notes[0].content;
					this.filename = this.markdown_notes[0].filename;
				})
			this.resetActiveIndex();
		},
		resetActiveIndex() {
			this.activeIndex = 0;
		},	
		createH2() {
			document.execCommand('formatBlock', false, "h2");
		},
		changeTheme(theme) {
			console.log("Theme changed to", theme);
			this.getTheme(theme);
			this.cmOptions.theme = theme;
		},
		getTheme(theme) {
			return import ('codemirror/theme/' + theme + '.css');
		},
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		changeActiveFileListing(event) {
			event.className += " active";
			console.log(event)
		},

		signOut() {
			this.blockstack.signUserOut(window.location.href)
		}
	},
	components: {
		codemirror
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

* {
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;

}

.el-header,
.el-footer {
	color: #333;
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
}

.el-aside {
	color: #333;
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
	margin-top: 1em;
}

.outer_aside {
	display: flex;
	flex-direction: column;
}

.el-main {
	color: #333;
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
	padding: 5vh;
}

.el-input {
	margin-bottom: 1em;
}

.dashboard {
	height: 100vh;
}

.creds {
	margin-top: auto;
	position: absolute;
}

.editor {
	padding: 0;
	margin-bottom: 1em;
	margin-right: 1em;
}

label {
	margin-bottom: 0;
	// width: 100%;
	cursor: pointer;
	input[type="checkbox"] {
		margin-right: 5px;
	}
}

.list-group-item {
	&.completed label {
		text-decoration: line-through;
	}
	.delete {
		display: none;
	}
	&:hover .delete {
		display: inline;
		color: grey;
		&:hover {
			text-decoration: none;
			color: red;
		}
	}
}

.new_note {
	margin-left: 5em;
}

// Scrollbar styles

/* width */

::-webkit-scrollbar {
	width: 8px;
	border-radius: 0.2em;
}


/* Track */

::-webkit-scrollbar-track {
	background: #f1f1f1;
}


/* Handle */

::-webkit-scrollbar-thumb {
	background: #888;
}


/* Handle on hover */

::-webkit-scrollbar-thumb:hover {
	background: #555;
}

#live_area {
	display: flex;
	flex-wrap: wrap;
}

.editor,
#content {
	display: inline-block;
	flex-grow: 1;
	width: calc(100% * (1/2) - 10px - 1px);
	vertical-align: top;
}

.CodeMirror {
	font-family: sans-serif;
	height: 100vh;
	color: black;
	direction: ltr;
}

.note_listing {
	.delete {
		text-decoration: none;
		display: none;
		cursor: pointer;
	}
	&:hover .delete {
		display: inline;
		color: grey;
		&:hover {
			text-decoration: none;
			color: red;
		}
	}
	.pull-right {
		float: right;
	}
}

.el-submenu .el-menu-item {
	padding: 0px;
	padding-right: 15px;
	
}

.title_input {
	width: 30%;
}

.logout,
.gh,
.options {}

.options {
	margin-left: 39vw;
}

.el-menu-item,
.el-menu-item a {
	font-family: "Helvetica Neue", Helvetica, sans-serif;
	color: #909399;
	font-style: "none";
}

/deep/ h1,
/deep/ h2,
/deep/ h2 {
	font-family: "Helvetica Neue", Helvetica, sans-serif;
}

/deep/ #content h2 {
	font-size: 1.2em;
  margin-top: 0em;
}

/deep/ #content h1 {
	font-size: 1.7em;
	margin-bottom: 0.4em;
	margin-top: 0em;
}

/deep/ #content h3 {
	font-size: 0.93em;
}

/deep/ #content {
  margin-top: 0;
}

/deep/ li {
	margin-left: 0.5em;
}

.themes_drawer {
	max-height: 300px;
	overflow: scroll;
	margin-right: 0.2em;
}

.logo {
	margin-right: 8vw;
}

.active {
	background-color: gray;
}

#singlePane {
	margin-bottom: 5em;
	border: none;
}

.toolbar {
	display: flex;
	flex-direction: row;
	margin-bottom: 3em;
}

i {
	margin-right: 1.2em;
}

</style>
