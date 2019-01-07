<template>
   <el-container height="500px">
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
         </el-menu>
         <img :src="user.avatarUrl() ? user.avatarUrl() : '/avatar-placeholder.png'" class="avatar" height="30px" width="30px">
         <span>            
         <small><span class="sign-out">(<a href="#" @click.prevent="signOut">Sign Out</a>)</span></small></span>
      </el-header>
      <el-container>
         <el-aside width="200px">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
               <el-menu :default-openeds="['1', '3']">
                  <el-submenu index="1">
                     <template slot="title"><i class="el-icon-message"></i>Your Notes</template>
                     <el-menu-item-group>
                        <template slot="title">Recently Added</template>
                        <el-menu-item index="1-1">Note1.md</el-menu-item>
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
            <codemirror v-model="content" id="editor" :options="cmOptions"></codemirror>
            <form @submit.prevent="saveNote()" :disabled="! content">
               <div class="input-group">
                  <input v-model="todo" type="text" class="form-control" placeholder="Paste your code..." autofocus>
                  <span class="input-group-btn">
                  <button class="btn btn-default" type="submit" :disabled="! todo">Add</button>
                  </span>
               </div>
            </form>
            <ul class="list-group">
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
            </ul>
         </el-main>
      </el-container>
   </el-container>
</template>

<script>
import {codemirror} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/abcdef.css'

// Import popular language modes
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/mode/rust/rust.js'

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
      md_notes: [],
      todo: '',
      uidCount: 0,
      content: "Sample note",
      color: "#890912",
      cmOptions: {
        // Configuring codemirror options.
        tabSize: 4,
        mode: "javascript",
        theme: 'base16-dark',
        lineNumbers: true,
        autofocus: true,
        styleActiveLine: true,
        line: true,
        lineWrapping: true
      }, 
    }
  },
  watch: {
    md_notes: {
      handler: function (md_notes) {
        const blockstack = this.blockstack

        // encryption is now enabled by default
        return blockstack.putFile(STORAGE_FILE, JSON.stringify(md_notes))
      },
      deep: true
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    saveNote () {
      if (!this.content.trim()) {
        return
      }
      this.md_notes.unshift({
        id: this.uidCount++,
        text: this.todo.trim(),
        completed: false
      })
      this.todo = ''
    },

    fetchData () {
      const blockstack = this.blockstack
      blockstack.getFile(STORAGE_FILE) // decryption is enabled by default
      .then((todosText) => {
        var md_notes = JSON.parse(todosText || '[]')
        md_notes.forEach(function (note, index) {
          note.id = index
        })
        this.uidCount = md_notes.length
        this.md_notes = md_notes
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
    background-color: #B3C0D1;
    color: #333;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;

  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;

  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;

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
