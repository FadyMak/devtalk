<template lang="html">
  <div class="ui one column grid container">
    <div class="column">
      <!-- DevTalk Header -->
      <h2 class="ui center aligned icon header">
        <i class="comment outline circular icon"></i>
        <div class="content">
          DevTalk
          <div class="sub header">
            Markdown-based discussion platform, powered by Auth0 Lock and Webtask
          </div>
        </div>
      </h2>
      <!-- comments header -->
      <h3 class="ui header">
        <a class="ui orange circular label">{{ comments.length }}</a> Comments
        <a href="#" class="user">{{ user }}
          <i v-show="authenticated" class="icon sign out" @click="logout()"></i>
        </a>
      </h3>
      <!-- comments list -->
      <div class="ui segments">
        <div class="ui segment">
          <div class="ui comments" v-for="comment in comments">
            <comment
              :author="comment.author"
              :text="comment.text"
              :date="comment.date">
            </comment>
          </div>
        </div>
        <!-- reply box -->
        <div v-if="authenticated" class="ui secondary segment">
          <form class="ui reply form">
            <div class="field">
              <textarea v-model="commentText"></textarea>
            </div>
            <div class="ui blue labeled submit icon button" @click="postComment()">
              <i class="icon edit"></i> Post Comment
            </div>
          </form>
        </div>
        <!-- login notification -->
        <div v-else class="ui bottom attached warning message">
          <i class="icon sign in"></i>
          <a href="#" @click="login()">Login</a> to post a comment.
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Comment from './Comment.vue'
import { addComment, getComments } from '../utils/webtask-api'
import {
  lock,
  isAuthenticated,
  getUserName,
  setToken,
  removeToken
} from '../utils/auth-service'

export default {
  components: { Comment },
  data () {
    return {
      authenticated: false,
      user: '',
      commentText: '',
      comments: []
    }
  },
  methods: {
    login () {
      lock.show()
    },
    logout() {
      removeToken()
      this.authenticated = false
      this.user = ''
    },
    postComment () {
      let newComment = {
        text: this.commentText,
        author: this.user,
        date: new Date()
      }
      addComment(newComment).then(() => {
        this.comments.push(newComment)
        this.commentText = ''
      })
    }
  },
  ready () {
    getComments().then((comments) => {
      // $set the comments on the VM to ensure they are
      // detected by the reactivity system
      this.$set('comments', comments)
    })

    this.authenticated = isAuthenticated()
    this.user = getUserName()

    lock.on('authenticated', (authResult) => {
      lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.log('An error occured while fetching your profile')
          return
        }
        setToken(authResult, profile)
        this.authenticated = true
        this.user = profile.name
        lock.hide()
      })
    })
  }
}
</script>

<style>
body {
  background-color: #ebf2f6;
}

.grid.container {
  padding-top: 50px
}

.user {
  float: right;
  padding-right: 10px;
  font-weight: 400;
}

.sign.out {
  cursor: pointer;
}

.sign.out:hover {
  opacity: 0.75;
  transition: opacity .25s ease-out
}

.comments {
  min-width: 100%;
}

h3, h3 a,
.header .content,
.comment.icon {
  color: #58657a !important;
}

.header .content {
  font-weight: 400;
}
</style>
