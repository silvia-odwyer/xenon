<template>
   <el-container class="dashboard">
      <el-header style="text-align: right; font-size: 12px">

         <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            
            <el-menu-item index="1">File</el-menu-item>
            <el-submenu index="2">
               <template slot="title">File</template>
               <el-menu-item index="2-1">New</el-menu-item>
               <el-menu-item index="2-2">Save</el-menu-item>
               <el-menu-item index="2-3">Help Desk</el-menu-item>
               <el-submenu index="2-4">
                  <template slot="title">Appearance</template>
                  <el-menu-item index="2-4-1">Code Editor Theme</el-menu-item>
                  <el-menu-item index="2-4-2">Dark Mode</el-menu-item>
                  <el-menu-item index="2-4-3">Sidebar</el-menu-item>
               </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>Info</el-menu-item>
            <span>
              <img :src="user.avatarUrl() ? user.avatarUrl() : '/avatar-placeholder.png'" class="avatar" height="30px" width="30px">
              <small>
                <span class="sign-out">(<a href="#" @click.prevent="signOut">Sign Out</a>)</span>
              </small>
         </span>
         </el-menu>
         
      </el-header>
      <el-container>
         <el-aside width="200px">
           
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
               <el-menu :default-openeds="['1', '3']">
                  <el-button type="primary" plain icon="el-icon-edit" v-on:click="createNewNote()">New Note</el-button>
                  <el-submenu index="1">
                     <template slot="title"><i class="el-icon-message"></i>Your Notes</template>
                     <el-menu-item-group>
                        <template slot="title">Recently Added</template>
                        <el-menu-item index="1-1" v-for="note in markdown_notes" v-on:click="displayNote(note)">{{note.filename}}</el-menu-item>
                     </el-menu-item-group>
                     <el-menu-item-group title="Group 2">
                        <el-menu-item index="1-3">Option 3</el-menu-item>
                     </el-menu-item-group>
                     <el-submenu index="1-4">
                        <template slot="title">Option4</template>
                        <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
                     </el-submenu>
                  </el-submenu>
               </el-menu>
            </el-aside>
         </el-aside>
         <el-main>
           <el-row>
             <el-col :span="24">
              <el-input placeholder="Note Name" v-model="filename"></el-input>
            </el-col>
            </el-row>
            
            <section class="live_area">
              <codemirror v-model="content" id="editor" :options="cmOptions"></codemirror>

            <!-- <ul class="list-group">
               <li v-for="note in md_notes"
                  class="list-group-item"
                  :class="{completed: note.completed}"
                  :key="note.id">
                  <label>
                  <input type="checkbox" v-model="note.completed">{{ note.text }}
                  </label>
                  <a @click.prevent="md_notes.splice(md_notes.indexOf(note), 1)"
                     class="delete pull-right"
                     href="#">X</a>
               </li>
            </ul> -->
            <section class="preview" v-model="markdownToHTML">
            {{markdownToHTML}}
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

export default {
  name: 'dashboard',
  props: ['user'],
  data () {
    return {
      blockstack: window.blockstack,
      markdown_notes: [],
      todo: '',
      uidCount: 0,
      content: "# Sample note",
      color: "#890912",
      cmOptions: {
        // Configuring codemirror options.
        tabSize: 4,
        mode: "markdown",
        theme: 'base16-dark',
        lineNumbers: true,
        autofocus: true,
        styleActiveLine: true,
        line: true,
        lineWrapping: true
      }, 
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
      // Some may a bit buggy; submit Issues if you see any bugs. 
      console.log("CONTENT:", this.content)

      // Look for beginning of a line that contains a hashtag, and replace the token in h1 tags. 
      let markdown = this.content.replace(/^\>(.+)/gm, "<blockquote>$1</blockquote>");

      // h5
      markdown = markdown.replace(/[\#]{5}(.+)/g, "<h5>$1</h5>");

      // h4
      markdown = markdown.replace(/[\#]{4}(.+)/g, "<h4>$1</h4>");

      // h3
      markdown = markdown.replace(/[\#]{3}(.+)/g, "<h3>$1</h3>");
      
      // h2
      markdown = markdown.replace(/[\#]{2}(.+)/g, "<h2>$1</h2>")

      // h1
      markdown = markdown.replace(/[\#]{1}(.+)/g, "<h1>$1</h1>")

      return(markdown); 
    }
  },
  watch: {
    markdown_notes: {
      handler: function (markdown_notes) {
        const blockstack = this.blockstack

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
        console.log("LANGMODE", this.cmOptions.mode)
        this.showSnackbar = true;
        console.log("ALL FILE IDS AFTR", this.all_file_ids);
      }
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
      })
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
  
  .el-main {
    color: #333;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
    padding: 5vh;
  }

  .el-input {
    margin-bottom: 1em;
  }

  .live_area {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

.dashboard {
  height: 100vh;
}

#editor {
  width: 50%;
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
</style>
