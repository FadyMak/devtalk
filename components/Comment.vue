<template lang="html">
  <div class="comment">
    <div class="content">
      <a class="author">{{ author }}</a>
      <div class="metadata">
        <span class="date">{{ dateFromNow }}</span>
      </div>
      <div class="text">
        <p>{{{ renderedHtml }}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import renderMd from '../utils/render-md'

export default {
  props: ['author', 'date', 'text'],
  computed: {
    renderedHtml () {
      return renderMd(this.text)
    },
    dateFromNow () {
      return moment(this.date).fromNow()
    }
  }
}
</script>

<style>
@import "../node_modules/highlight.js/styles/monokai-sublime.css";

.hljs {
  border-radius: 3px;
}

.author {
  color: #6e7c96 !important;
}
</style>
