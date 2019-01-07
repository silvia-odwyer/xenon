<template>
   <el-container class="dashboard">
      <el-header style="text-align: right; font-size: 12px">
         <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
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
                  <el-submenu index="1">
                     <template slot="title"><i class="el-icon-message"></i>Your Notes</template>
                     <el-menu-item-group>
                        <template slot="title">Recently Added</template>
                        <el-menu-item index="1-1" v-for="note in markdown_notes">{{note}}</el-menu-item>
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
           <el-input placeholder="Note Name" v-model="filename"></el-input>
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
                <form @submit.prevent="saveNote()" :disabled="! content">
               <div class="input-group">
                  <span class="input-group-btn">
                  <button class="btn btn-default" type="submit" :disabled="! content">Save</button>
                  </span>
               </div>
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
      markdown_notes: ["Note 1", "Note 2", "Note 3"],
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
      activeIndex: 1,
      alertMessage: "",
      filename: "",
      noMarkdownAlert: false, 
      noFilenameAlert: false,
      isNewFile: false 
    }
  },
  computed: {
    markdownToHTML() {
      console.log(this.content)
      return("To HTML:" + this.content); 
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

          let current_file = this.codefiles.filter(file => file.hash_id == this.file.hash_id)[0];
          console.log(current_file)

          // Save code
          current_file.code = this.code;

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
    getDateNow() {
      let time = Date.now();
      return time;
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

  }
  
  .el-main {
    color: #333;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
    padding: 5vh;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

.dashboard {
  height: 100vh;
}

#editor {
  width: 50%;
  margin: 0;
  padding: 0;
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
