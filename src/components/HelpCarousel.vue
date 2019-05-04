<template>
  <el-carousel :interval="4000" type="card" height="50vh">
    <el-carousel-item :key="1">
      <h3>
          Welcome to Xenon!
      </h3>
      <p>Getting started couldn't be easier.</p>
      <p>Here's a quick walkthrough, in case you get stuck.</p>
    </el-carousel-item>

    <el-carousel-item :key="2">
      <h3 class="title">
          Create A New Note
      </h3>
      <p>To create a new note, click on the "Create New Note" button in the top left-hand corner.</p>
      <p>Enter a filename, and you're good to go!</p>
    </el-carousel-item>

    <el-carousel-item :key="3">
      <h3 class="main_title">
          Edit Notes
      </h3>
      <p>To edit your notes, just click on a note you'd like to note from the left-hand sidebar.</p>
      <p>Enter your markdown in the editable text editor to the left hand side, and you'll see the rich text alternative on the right.</p>
    </el-carousel-item>
    
    <el-carousel-item :key="4">
      <h3>
        Delete A Note
      </h3>
      <p>To delete a note, navigate to the list of notes on the left, hover over the note you wish to delete, then click on the red X which appears.</p>
      <p>Deleting notes is final, they cannot be retrieved again, so make sure to choose carefully!</p>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
module.exports = {
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>
* {
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;

}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
