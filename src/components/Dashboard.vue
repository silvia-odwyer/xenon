<template>
   <el-container class="dashboard">
      <el-header style="text-align: right; font-size: 12px">

         <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal">
            
            <el-menu-item index="1">xq</el-menu-item>
            <el-submenu index="2" class="options">
               <template slot="title">File</template>
               <el-menu-item index="2-1" v-on:click="createNewNote()">New</el-menu-item>
               <el-menu-item index="2-2" v-on:click="saveNote()">Save</el-menu-item>

            </el-submenu>
            <el-submenu index="3" class="gh">
               <template slot="title">GitHub</template>
               <el-menu-item index="3-1"><a href="https://github.com/silvia-odwyer/xq">View Repo</a></el-menu-item>
               <el-menu-item index="3-2"><a href="https://github.com/silvia-odwyer/xq/issues">Submit Issue</a></el-menu-item>

            </el-submenu>
            <el-menu-item index="4" class="logout" v-on:click="signOut">
               Logout
            </el-menu-item>
              <!-- <el-button type="primary" class="sign-out" icon="el-icon-edit"></el-button>
  -->
         </el-menu>
         
      </el-header>
      <el-container>
         <el-aside width="200px" class="outer_aside"> 
           
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
               <el-menu :default-openeds="['1', '3']">
                  <el-button type="primary" plain icon="el-icon-edit" class="new_note" v-on:click="createNewNote(); displayFileMessage('New note created!')">New Note</el-button>
                  <el-submenu index="1">
                     <template slot="title"><i class="el-icon-message"></i>Your Notes</template>
                     <el-menu-item-group>
                        <template slot="title">Recently Added</template>
                        <el-menu-item :index="String(note.id)" v-for="note in markdown_notes" v-on:click="displayNote(note)" class="note_listing">{{note.filename}}
                        <a @click.prevent="markdown_notes.splice(markdown_notes.indexOf(file), 1)" class="delete pull-right" href="#">x</a>

                        </el-menu-item>
                     </el-menu-item-group>
                    </el-submenu>
                 <el-submenu index="2">
                     <template slot="title"><i class="el-icon-menu"></i>Themes</template>
                     <el-menu-item-group>
                        <template slot="title">All Themes Available</template>
                        <el-menu-item index="1-1" v-for="theme in themes" v-on:click="changeTheme(theme)">{{theme}}</el-menu-item>
                     </el-menu-item-group>
                </el-submenu>
                    <el-submenu index="3">
                     <template slot="title"><i class="el-icon-setting"></i>Settings</template>
                     <el-menu-item-group>
                        <template slot="title">Options</template>
                        <el-menu-item index="3-2">Enable Auto-Save</el-menu-item>
                     </el-menu-item-group>
                    </el-submenu>
                  </el-submenu>
               </el-menu>
              <small class="creds">
                Powered by Vue, Blockstack, and loads of regex. 
                Source code on <a href="https://github.com/blockstack/blockstack-todos" target="_blank">Github</a>
              </small>
            </el-aside>

         </el-aside>
         <el-main>
           <el-row>
             <el-col :span="24">
              <el-input placeholder="Note Name" v-model="filename" class="title_input"></el-input>
            </el-col>
            </el-row>

            <section class="live_area">

            <codemirror v-model="content" id="editor" :options="cmOptions"></codemirror>
            
            <section id="content" v-html="markdownToHTML">
            <!-- {{markdownToHTML}} -->
            </section>


            </section>

              <el-button type="primary" plain icon="el-icon-circle-check-outline" v-on:click="saveNote()">Save</el-button>
                <form @submit.prevent="saveNote()" :disabled="! content">
                </form>
                
         </el-main>
      </el-container>
   </el-container>
</template>

<script>
import {codemirror} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/abcdef.css'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/selection/mark-selection.js'
/*eslint-disable*/

var STORAGE_FILE = 'markdown_files.json'
var themes = ["3024-day", "3024-night", "abcdef", "ambiance", "ambiance-mobile", "base16-dark", "base16-light", "bespin", "blackboard", "cobalt", "colorforth", "darcula", "duotone-dark", "duotone-light", "eclipse", "elegant", "erlang-dark",
"gruvbox-dark", "hopscotch", "ice-coder", "idea", "isotope", "lesser-dark", "liquibyte", "lucario", "material", "mbo", "mdn-like", "midnight", "monokai", "neat", "neo", "night", "oceanic-next", "panda-syntax", "paraiso-dark", "paraiso-light", "pastel-on-dark", "railscasts", "rubyblue", "seti", "shadowfox", "solarized", "ssms", "the-matrix", "tomorrow-night-bright", "tomorrow-night-eighties", "ttcn", "twilight", "vibrant-ink", "xq-dark", "xq-light", "yeti", "zenburn"];

export default {
  name: 'dashboard',
  props: ['user'],
  data () {
    return {
      blockstack: window.blockstack,
      markdown_notes: [],
      sample_notes: [{id: this.uidCount++,
            hash_id: String(this.getDateNow()),
            content: "Sample note",
            filename: "Sample Note",
            language: "markdown",
            completed: false,
            date: this.getDateStamp()},
            
            {
              id: this.uidCount++,
              hash_id: String(this.getDateNow()),
              content: "Welcome!",
              filename: "README",
              language: "markdown",
              completed: false,
              date: this.getDateStamp()
            }],
      todo: '',
      uidCount: 0,
      content: "# Sample note",
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
      file : ""
    }
  },
  computed: {
    markdownToHTML() {
      // Renders markdown in HTML using regex.
      // Some may a bit buggy; submit an issue if you see any bugs. 
      console.log("CONTENT:", this.content);

      // Look for beginning of a line that contains a hashtag, and replace the token in h1 tags. 
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
	  
      //ul
      markdown = markdown.replace(/^\s*\n\*/gm, '<ul>\n*');
      markdown = markdown.replace(/^\*(.+)/gm, '<li>$1</li>');
      
      //ol
      markdown = markdown.replace(/^\s*\n\d\./gm, '<ol>\n1.');
      markdown = markdown.replace(/^\d\.(.+)/gm, '<li>$1</li>');
	  
      // code 
      markdown = markdown.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>');

      // bold text
      markdown = markdown.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>');
      
      // em should technically be for placing emphasis on certain words,
      // so [TODO] add a check for single-words only.
      markdown = markdown.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>');

      // Strikethrough
      markdown = markdown.replace(/\~~([^\~]+)\~~/g, '<del>$1</del>');

      return(markdown); 
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
  mounted () {
    this.fetchData()
  },
  methods: {
    saveNote() {
      console.log(this.content);
      if (!this.content.trim()) {
        console.log("No markdown entered in the editor.")
        this.noMarkdownAlert = true;  
        return;
      }
      else if (this.filename == "") {
        // TODO: Add modal which pops up to alert the user to enter a title.
        console.log("No title entered");
        this.alertMessage = "No title entered!"
        this.noFilenameAlert = true;
        this.displayFileMessage('No title entered!')
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

          console.log(this.markdown_notes);
          this.alertMessage = `New file ${this.filename} saved!`;
          this.isNewFile = false;
        }

        else {
          console.log("file already exists");
          console.log("this.file", this.file);

          let current_file = this.markdown_notes.filter(file => file.hash_id == this.file.hash_id)[0];
          console.log(current_file)

          // Save code
          current_file.content = this.content;

          // Save title
          this.updateTitle(current_file);

          // Update language
          current_file.language = this.cmOptions.mode;

          // Update datestamp
          current_file.datestamp = datestamp

          this.alertMessage = "Saved file!"

        }
        this.displayFileMessage('Saved note!')
        console.log("LANGMODE", this.cmOptions.mode)
        this.showSnackbar = true;
        console.log("ALL FILE IDS AFTR", this.all_file_ids);
      }
    },
	displayFileMessage(message_content) {
		this.$message(message_content);
	},
    updateTitle(file) {
      if (this.filename == "") {
            // TODO: Add a modal popup saying that the title must not be empty.
          }
          else {
            file.filename = this.filename;
      }
    },
    displayNote(file) {
      this.file = file; 
      console.log("DSPLYNOTES: ", this.markdown_notes);
      console.log("displayCode for ", file);
      
      // Update code in the code editor
      this.content = file.content;
      console.log("current markdown content is", this.content);

      // Update the file's title
      this.filename = file.filename;
      this.current_file_id = file.id;
      console.log("CURRENT FILE ID: ", this.current_file_id);

      // Update language mode
      this.cmOptions.mode = file.language;
      
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    },
    getDateNow() {
      let time = Date.now();
      return time;
    },
    createNewNote() {
      this.content = "";
      this.filename = "";
      this.isNewFile = true;
    },
    getDateStamp() {
      let date = new Date();
      let dd = date.getDate();
      let mm = date.getMonth() + 1;
      let yy = date.getFullYear();
      
      let datestamp = `${dd}/${mm}/${yy}`
      return datestamp;
    },
    fetchData () {
      const blockstack = this.blockstack
      blockstack.getFile(STORAGE_FILE) // decryption is enabled by default
      .then((todosText) => {
        var markdown_notes = JSON.parse(todosText || '[]')
        markdown_notes.forEach(function (note, index) {
          note.id = index
        })
        this.uidCount = markdown_notes.length
        this.markdown_notes = markdown_notes
        this.file = this.markdown_notes[0];
        this.content = this.markdown_notes[0].content;
        this.filename = this.markdown_notes[0].filename;

        if (this.markdown_notes.length == 0) {
          this.markdown_notes = this.sample_notes;
        }
      })
    },
    changeTheme(theme) {
      console.log("Theme changed to", theme);
      this.getTheme(theme);
      this.cmOptions.theme = theme;
    },
    getTheme(theme) {
      return import('codemirror/theme/' + theme + '.css');
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    },

    signOut () {
      this.blockstack.signUserOut(window.location.href)
    }
  },
  components : {
    codemirror
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .dashboard {

  }

  .el-header, .el-footer {
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
}

#editor {
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

#editor, #content {
  display: inline-block;
  flex-grow: 1;
  width: calc(100% * (1/2) - 10px - 1px);
  vertical-align:top;
}

.CodeMirror {
  font-family: sans-serif;
  height: 100vh;
  color: black;
  direction: ltr;
}

.note_listing{
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

.logout, .gh, .options {

}

.options {
  margin-left: 59vw;
}

.el-menu-item, .el-menu-item a {
  font-family: "Helvetica Neue", sans-serif;
  color: #909399;
  font-style: "none";
}
</style>
