

<template>
  <div>
    <div>
      <h1> This website is for Splatoon 3 private battle. </h1>
      <p> This is made by Herain </p>
      <p> If there is any problem, please contact me on Discord: herain_yayo </p>
      <p> There is no discord server for this website so far, if there are more users I might consider to establish one
      </p>
      <p> My website: <a href="https://herainic.com">https://herainic.com</a> </p>
      <h1>Credit</h1>
      <p>
        <a href="https://www.simplethread.com/comment-threads-with-recursive-components-in-vue-3/">Comment Component</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.chatFooter {
  position: relative;
  height: 150px;
  max-width: 1124px;
  width: 100%;
  bottom: 0;
  background-color: rgb(244, 244, 244);
  position: fixed;

}

.inputTextArea {
  height: 120px;
  width: 100%;
  border: none;
  background-color: rgb(244, 244, 244);
  resize: none;
}
</style>