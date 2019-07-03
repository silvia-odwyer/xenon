<template>
    <el-container id="dashboard">
        <el-header style="text-align: right; font-size: 12px; background-color: #303030">
            <el-menu :default-active="String(activeIndex)" class="el-menu" mode="horizontal" id="el_menu"  background-color="#303030">
                <el-menu-item index="1-a" class="logo">xenon</el-menu-item>
				<el-submenu index="2" class="options">
                    <template slot="title">Notes</template>
                    <el-menu-item :index="String(note.id)" v-for="note in markdown_notes" v-on:click="displayNote(note); changeActiveFileListing($event)" class="note_listing" v-bind:key="note.id">{{note.filename}}</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">File</template>
                    <el-menu-item index="3-1" v-on:click="displayFormDialog()"> <i class="el-icon-circle-plus"></i>New</el-menu-item>
                    <el-menu-item index="3-2" v-on:click="saveNote()"><i class="el-icon-document"></i>Save</el-menu-item>
                    <el-menu-item index="3-3">
                        <el-checkbox v-model="isTabNav">Enable Tabs</el-checkbox>
                    </el-menu-item>

					<el-menu-item index="3-4">
                        <el-checkbox v-model="isDarkMode" v-on:change="toggleDarkMode()">Enable Dark Mode</el-checkbox>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="4" class="gh">
                    <template slot="title">GitHub</template>
                    <el-menu-item index="4-1"><a href="https://github.com/silvia-odwyer/xenon/issues"><i class="el-icon-bell"></i>Submit Issue</a></el-menu-item>
                    <el-menu-item index="4-2"><a href="https://github.com/silvia-odwyer/xenon/"><i class="el-icon-news"></i>View Repo</a></el-menu-item>
                </el-submenu>

                <el-menu-item index="4-b" v-on:click="signOut()">
                    Logout
                </el-menu-item>


            </el-menu>
        </el-header>
        <el-container>
            <el-aside width="200px" class="outer_aside">
                <el-aside width="200px" id="fixed" class="scroll-thin-width">
                    <el-menu :default-openeds="['1', '3']" :collapse="isCollapse" id="sidebar">
                        <el-button type="primary" plain icon="el-icon-edit" class="new_note" v-on:click="displayFormDialog()">New Note</el-button>
                        <el-submenu index="1">
                            <template slot="title" class="title"><i class="el-icon-message"></i>Your Notes</template>
                            <el-menu-item-group>
                                <template slot="title">Recently Added</template>
                                <el-menu-item :index="String(note.id)" v-for="note in markdown_notes" v-on:click="displayNote(note); changeActiveFileListing($event)" class="note_listing" v-bind:key="note.id">
                                    {{note.filename}}
                                    <a @click.prevent="markdown_notes.splice(markdown_notes.indexOf(note), 1) " class="delete pull-right" href="#">x</a>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="2" v-if="isOnePane == false" class="submenu" v-show="isMarkdownMode">
                            <template slot="title" class="title" id="submenu_heading"><i class="el-icon-menu"></i>Themes</template>
                            <el-menu-item-group class="themes_drawer">
                                <template slot="title">All Themes Available</template>
                                <el-menu-item index="1-1" v-for="theme in themes" v-on:click="changeTheme(theme)" v-bind:key="theme">{{theme}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title" class="title"><i class="el-icon-setting"></i>More</template>
                            <el-menu-item-group>
                                <template slot="title"></template>
                                <el-menu-item index="3-1">
                                    <el-checkbox v-model="isTabNav">Enable Tabs</el-checkbox>
                                </el-menu-item>
								<el-menu-item index="3-2">
                                    <el-checkbox v-model="isDarkMode" v-on:change="toggleDarkMode()">Enable Dark Mode</el-checkbox>
                                </el-menu-item>
                            </el-menu-item-group> 

                            <el-menu-item-group>
                                <template slot="title"></template>
								<el-menu-item index="3-3" v-on:click="showHelpCarousel">Help</el-menu-item>
                                <el-menu-item index="3-4" v-on:click="signOut">Logout</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                    <small class="creds">
                    	<p>Saved.</p>
                    </small>
                </el-aside>
            </el-aside>
            <el-main>
                <el-row v-if="isTabNav" >
                    <el-menu class="el-menu tabs" mode="horizontal">
                        <el-menu-item  v-for="note in markdown_notes" :index="String(note.id)" v-on:click="displayNote(note)" v-bind:key="note.id">
                            {{note.filename}}
                        </el-menu-item>
                    </el-menu>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-input placeholder="Note Name" v-model="filename" class="title_input" @input="enableAutoSave"></el-input>

                    </el-col>
					    
					<el-col :span="8" v-show="isMarkdownMode"> 
					 <el-button type="primary" plain v-bind:icon="modeIcon" v-on:click="enableMode('readOnly')">	
							Enable Read-Only Mode
						</el-button>							 
					<el-switch style="display: block" v-model="this.showEditor" v-on:change="enableMode('readOnly')" active-color="#13ce66" inactive-color="#ff4949" active-text="Edit mode" inactive-text="Read-only"> </el-switch>
					<!-- <el-switch style="display: block" v-model="this.isMarkdownMode"  v-on:change="enableEditMode" active-color="#13ce66" inactive-color="#ff4949" active-text="Markdown mode" inactive-text="WYSIWYG"> </el-switch> -->

					</el-col>

                </el-row>

				<el-row>

					<el-col :span="24">
						<section class="live_area"> 
							<!-- If the user wishes to have the markdown and rendered HTML in different and separate panes,
								these panes will display. -->
							<section class="markdown_editor" v-if="isMarkdownMode">
								<codemirror  v-model="content" class="editor scroll-thin-width" :options="cmOptions" @input="enableAutoSave" v-if="showEditor"></codemirror>
								<section id="content" v-html="markdownToHTML" v-if="isOnePane == false"></section>
							</section>

								<section class="rich_text_editor" v-show="!isMarkdownMode">
									<!-- WYSIWYG Editor -->
									<!-- If the user wishes to have the HTML rendered in the same pane, only this pane should display. -->
									<div id="wysiwyg">    
										
										<div class="toolbar">
											<button v-on:click="formatText('bold')">
												<font-awesome-icon icon="bold" />
											</button>
											<button v-on:click="formatText('italic')">
												<font-awesome-icon icon="italic" />
											</button>
											<button  v-on:click="formatText('strikethrough')">
												<font-awesome-icon icon="strikethrough"/>
											</button>
											<button v-on:click="formatText('underline')">
												<font-awesome-icon icon="underline" />
											</button>
											<button v-on:click="addHeading('h2')">
												<font-awesome-icon icon="heading" />
											</button>
											<button v-on:click="copyToClipboard()">
												<font-awesome-icon icon="copy"/>
											</button>
											<button v-on:click="formatText('cut')">
												<font-awesome-icon icon="cut" />
											</button>
											<button v-on:click="formatText('subscript')">
												<font-awesome-icon icon="subscript" />
											</button>
											<button v-on:click="formatText('superscript')">
												<font-awesome-icon icon="superscript" />
											</button>
										</div>

										
									</div>
											
									<div contenteditable class="editme" v-html="tmp" @input="onEdit"></div>
							</section>
						</section>
					</el-col>
				</el-row>

                 <el-dialog title="Filename" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="Filename" label-width="120px">
                            <el-input v-model="filename_input" autocomplete="off"></el-input>
                        </el-form-item>
						<el-form-item>
							  <el-radio v-model="noteFormat" label="wysiwyg">Rich Text (What You See is What You Get)</el-radio>
							  <el-radio v-model="noteFormat" label="markdown">Markdown</el-radio>
						</el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">Cancel</el-button>
                        <el-button type="primary" v-on:click="confirmNoteCreation()">Create Note</el-button>
                    </span>

                </el-dialog>

				<el-dialog title="Help Guide" :visible.sync="displayHelpCarousel" width="80%" >
					<HelpCarousel></HelpCarousel>
                </el-dialog>

            </el-main>
        </el-container>
    </el-container> 


</template>
<script>
/*eslint-disable*/

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/abcdef.css'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/selection/mark-selection.js'
import MenuIcon from 'vue-material-design-icons/Menu.vue'
import FormatBold from 'vue-material-design-icons/FormatBold.vue'
import HelpCarousel from './HelpCarousel.vue'
import Editor from '@/components/Editor.vue'

var STORAGE_FILE = 'markdown_files.json'
var themes = ["3024-day", "3024-night", "abcdef", "ambiance", "ambiance-mobile", "base16-dark", "base16-light", "bespin", "blackboard", "cobalt", "colorforth", "darcula", "duotone-dark", "duotone-light", "eclipse", "elegant", "erlang-dark",
	"gruvbox-dark", "hopscotch", "ice-coder", "idea", "isotope", "lesser-dark", "liquibyte", "lucario", "material", "mbo", "mdn-like", "midnight", "monokai", "neat", "neo", "night", "oceanic-next", "panda-syntax", "paraiso-dark", "paraiso-light", "pastel-on-dark", "railscasts", "rubyblue", "seti", "shadowfox", "solarized", "ssms", "the-matrix", "tomorrow-night-bright", "tomorrow-night-eighties", "ttcn", "twilight", "vibrant-ink", "xq-dark", "xq-light", "yeti", "zenburn"
];

export default {
	name: 'dashboard',
	props: ['user'],
	components: {
		codemirror,
		MenuIcon,
		FormatBold,
		HelpCarousel, 
		Editor
	},
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
			filename_input: "",
			noMarkdownAlert: false,
			noFilenameAlert: false,
			isNewFile: false,
			file: "",
			displayNoteToast: true,
			isTabNav: false,
			isOnePane: false,
			showEditor: true,
			isCollapse: false,
			noteFormat: "wysiwyg",
			selectedText: "",
			dialogFormVisible: false,
			modeIcon: "el-icon-document",
			value4: true,
			displayHelpCarousel: false,
			textInHTML: "<p>You can get started by typing some text, <i>editing it</i> and <b>playing</b> around with <u>formatting</u>.",
			isMarkdownMode: true,
        form: {
          name: '',
        },
		timeoutID: null,
		isDarkMode: false,
		      txt:'This is a <b>text</b> <a href="">link</a>',
      tmp: "<h4>Welcome to Xenon!</h4> <p>You can get started by typing some text, <i>editing it</i> and <b>playing</b> around with <u>formatting</u>."
 
		}
	},
	computed: {
		markdownToHTML() {
			// Renders markdown in HTML using regex.
			// Some may a bit buggy; submit an issue if you see any bugs. 

			// Look for beginning of a line that contains 6 hashtags, and enclose the token in h6 tags. 
			let markdown = this.content.replace(/[\#]{6}(.+)/g, '<h6>$1</h6>');
			markdown = markdown.replace(/[\#]{5}(.+)/g, '<h5>$1</h5>');
			markdown = markdown.replace(/[\#]{4}(.+)/g, '<h4>$1</h4>');
			markdown = markdown.replace(/[\#]{3}(.+)/g, '<h3>$1</h3>');
			markdown = markdown.replace(/[\#]{2}(.+)/g, '<h2>$1</h2>');
			markdown = markdown.replace(/[\#]{1}(.+)/g, '<h1>$1</h1>');

			// uls are started with the hypen (-) symbol
			markdown = markdown.replace(/^\s*\n\-/gm, '<ul>\n-');
			
			markdown = markdown.replace(/^(\-.+)\s*\n([^\-])/gm, '$1\n</ul>\n\n$2');
			markdown = markdown.replace(/^\-(.+)/gm, '<li>$1</li>');
			
			// ol, ie: ordered list
			markdown = markdown.replace(/^\s*\n\d\./gm, '<ol>\n1.');
			markdown = markdown.replace(/^(\d\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2');
			markdown = markdown.replace(/^\d\.(.+)/gm, '<li>$1</li>');
			
			//blockquote
			markdown = markdown.replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>');
			
			// bold text 
			markdown = markdown.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b><b>$1</b></b>');

			// italics 
			markdown = markdown.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>');
			
			// strikethrough
			markdown = markdown.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>');
			
			// p
			markdown = markdown.replace(/^\s*(\n)?(.+)/gm, function(m){
				return  /\<(\/)?(h\d|ul|blockquote|pre|ol|li|img)/.test(m) ? m : '<p>'+m+'</p>';
			});
			  
			return(markdown); 
		},
	},
	watch: {
		markdown_notes: {
			handler: function (markdown_notes) {
				console.log("uploading to blockstack")
				const blockstack = this.blockstack;

				if (markdown_notes.length == 0) {
					console.log("setting to sample notes");
					this.markdown_notes = this.sample_notes;
				}

				console.log(markdown_notes)

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
			// A method to generate sample notes (as they were hardcoded before)
			// which will make sample note generation easier when tailoring sample notes to certain groups (devs vs consumers), 
			// Will be used for creating templates in the future.
			this.sample_notes = [];
			var note_contents = [{
					filename: "Markdown Guide",
					content: "# Welcome to Xenon!\n## Some markdown to get you started\n### H3 heading\n#### H4 Heading\nRegular line with some **bold** and *italic* text. \nImage and link support coming soon!\n> 'Insert some famous or inspirational quote here, because this is a blockquote.' \n> ~ Someone famous\n* Bullet point one\n* Bullet point two\n* Bullet point three\n~~Strikethrough text~~"
				},
				{
					filename: "Sample Note",
					content: "# Xenon \nA markdown editor built for the decentralized web.\nMarkdown is parsed to HTML using regular expressions.\n### Issues or Bugs\nThis is still in alpha, so bugs or issues may arise. If so, please submit an issue. <3 Thanks! \n *Current State*: alpha"
				}
			];


			for (let k = 0; k < note_contents.length; k += 1) {
							
				let generic_note = {
					id: 0,
					hash_id: String(this.getDateNow() + note_contents[0].filename),
					content: note_contents[0].content,
					filename: "Sample Note",
					language: "markdown",
					completed: "false",
					date: this.getDateStamp()
				}
			 	generic_note.id = Number(k);
			 	generic_note.hash_id = String(this.getDateNow() + note_contents[k].filename);
			 	generic_note.content = note_contents[k].content;
				generic_note.filename = note_contents[k].filename;
				generic_note.completed = "false";
			 	this.sample_notes.push(generic_note);
			}
			console.log("sample notes after creation", this.sample_notes);
		},
		confirmNoteCreation() {
			this.isNewFile = true;

			// Re-init default content and filename back to empty strings
			this.content = "";

			// Set the current filename to the filename entered by the user.
			this.filename = this.filename_input;
			
			this.dialogFormVisible = false;
			this.displayFileMessage('New note created!', "success");
			this.saveNewNote();
			
		},
		addHeading(heading_type) {
			document.execCommand("heading", false, heading_type);
		},
		saveNote() {
			if (this.filename == "") {
				this.noFilenameAlert = true;
				this.displayFileMessage('No title entered!', "warning");
			}

			// Both code and title entered
			else {
          			// Retrieve the file of interest
					let current_file = this.markdown_notes.filter(file => file.hash_id == this.file.hash_id)[0];
					console.log("the current file is", current_file);

					// Save 
					if (this.isMarkdownMode) {
						current_file.content = this.content;
						// Update language
						current_file.language = this.cmOptions.mode;
					}
					else {
						current_file.content = this.txt;
					}

					// Save title
					this.updateTitle(current_file);


					// Update datestamp
					current_file.datestamp = this.getDateStamp();

					this.alertMessage = "Saved file!"

				}
				// if (this.displayNoteToast) {
				// 	this.displayFileMessage("Saved note!", "success")
				// 	this.showSnackbar = true;
				// }

			
		this.resetNoteToast();
		},
		   onEdit(evt){
             var src = evt.target.innerHTML
			 this.txt = src
			 this.enableAutoSave();
         },

		autoSaveNote() {

			this.saveNote();
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
		onTextSelected() {
			console.log("text selected")
		},
		displayNote(file) {
			// Save the current note, before moving to the next note.
			this.displayNoteToast = false;
			// this.saveNote();
			
			this.file = file;

			if (this.file.format == undefined) {
				this.file.format = "markdown";
			}

			if (this.file.format == "markdown") {
				// Update code in the code editor
				this.content = file.content;

				// Update language mode
				this.cmOptions.mode = file.language;

				this.isMarkdownMode = true;
			}

			else if (this.file.format == "wysiwyg") {
				this.isMarkdownMode = false;
				this.txt = this.file.content;
				this.tmp = this.file.content;
			}

			
			// Update the file's title
			this.filename = file.filename;
			this.current_file_id = file.id;

			// Scroll to the top of the page
			window.scrollTo(0, 0);

			// Update the relevant tab
			this.activeIndex = file.id;

		},
		formatText(command) {
			document.execCommand(command, false, "");
		},
		getDateNow() {
			let time = Date.now();
			return time;
		},
		displayFormDialog() {
			console.log("CRTNEWNOTE files", this.markdown_notes);

			// Clear the filename
			this.filename_input = "";

			// Display dialog asking for filename
			this.dialogFormVisible = true;

		},
		showHelpCarousel() {
			// Display dialog asking for filename
			console.log("displayHelpCarousel")
			this.displayHelpCarousel = true;
		},
		saveNewNote() {
			let datestamp = this.getDateStamp();
			console.log("uid", this.uidCount);
			this.file = {
				id: this.uidCount++,
				hash_id: String(this.getDateNow()),
				content: "",
				filename: this.filename,
				language: this.cmOptions.mode,
				format: this.noteFormat,
				completed: false,
				date: datestamp
			}
			// Create a new file.
			this.markdown_notes.unshift(this.file);

			console.log(this.markdown_notes);
			if (this.noteFormat == "markdown") {
				this.isMarkdownMode = true;
			}
			else {
				this.isMarkdownMode = false;
				this.file.content = "<h2>Welcome to Xenon!</h2> <p>Type here...</p>";

			}
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
					if (this.file.format == "wysiwyg") {
						this.isMarkdownMode = false;
						this.tmp = this.markdown_notes[0].content;
					}
					this.content = this.markdown_notes[0].content;
					this.filename = this.markdown_notes[0].filename;
				})
			this.resetActiveIndex();
		},
		enableAutoSave() {
			if (this.timeoutID) {
				clearTimeout(this.timeoutID);
			}

			// auto-save after 1000 ms of inactivity from the user.
			this.timeoutID = setTimeout(() => {
				this.autoSaveNote();
			}, 1000);
			
		},
		enableMode(mode) {
			let modeIcons = {true : "el-icon-document", false : "el-icon-edit-outline"}
			if (mode == "readOnly") {
				// toggle the boolean value
				this.showEditor = !this.showEditor;

				// change icon
				let icon = modeIcons[this.showEditor];
				this.modeIcon = icon;
			}
		},
		enableEditMode() {
			// toggle the boolean value
			this.isMarkdownMode = !this.isMarkdownMode;

			console.log("this.markdownToHTML is", this.markdownToHTML)

			if (this.isMarkdownMode == true) {
				this.tmp = this.markdownToHTML;
			}
			else if (this.isMarkdownMode == false) {
				// this.markdownToHTML = this.tmp;
				let markdown_to_html = this.markdownToHTML;
				markdown_to_html.replace(/[<p>\_]{1}([^</p\>\_]+)/g, '# $1')
				this.content = markdown_to_html;
		

			}

		
		},	
		resetActiveIndex() {
			this.activeIndex = 0;
		},	
		changeTheme(theme) {
			console.log("Theme changed to", theme);
			this.getTheme(theme);
			this.cmOptions.theme = theme;
		},
		copyToClipboard() {
			this.$refs.text.select();
      		document.execCommand('copy');
		},
		getTheme(theme) {
			return import ('codemirror/theme/' + theme + '.css');
		},

		changeActiveFileListing(event) {
			event.className += " active";
			console.log(event)
		},
		toggleDarkMode() {
			var dashboard_bg_colour, dashboard_text_colour, cm_theme;

			// Set colour values for each variable
			if (this.isDarkMode) {
				dashboard_bg_colour = "rgb(37, 37, 37)";
				dashboard_text_colour = "#B8B8B8";
				cm_theme = "darcula"
			}
			else {
				dashboard_bg_colour = "white"
				dashboard_text_colour = "black";
				cm_theme = "idea";
			}
			
			// Change the corresponding elements
			// [TODO] Will replace with a theming solution next, this current solution will be adequate for Dark Mode styling without unnecessary use of vuex, etc.,
			let dashboard = document.getElementById("dashboard");
			dashboard.style.backgroundColor = dashboard_bg_colour;

			// let el_menu = document.getElementById("el_menu")
			// el_menu.style.backgroundColor = dashboard_bg_colour;

			// let el_menu_class = document.getElementsByClassName("el-menu")[2];
			// console.log(el_menu_class)
			// el_menu_class.backgroundColor = dashboard_bg_colour;

			// // Select all submenu components.
			let submenus = document.querySelectorAll("#sidebar .el-menu-item-group, #sidebar .el-submenu, .new_note");
			for (var i = 0; i < submenus.length; i++) {
				let submenu = submenus[i];
				submenu.style.backgroundColor = dashboard_bg_colour;
			}

			// Select all title components.
			let titles = document.querySelectorAll(".title, .logo")
			for (var i = 0; i < titles.length; i++) {
				let title = titles[i];
				title.style.color = "#B8B8B8"
			}

			let content = document.getElementById("content");
			content.style.color = dashboard_text_colour;

			dashboard.style.color = dashboard_text_colour;
			this.changeTheme(cm_theme);
			
		},
		signOut() {
			this.blockstack.signUserOut(window.location.href)
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="@/assets/sass/dashboard_styles.scss" lang="scss" scoped></style>