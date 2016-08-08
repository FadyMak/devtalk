import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const WEBTASK_URL = ''

export const addComment = (comment) => {
  return Vue.http.post(WEBTASK_URL, comment)
}

export const getComments = () => {
  return Vue.http.get(WEBTASK_URL).then((response) => {
    return response.json()
  }, (response) => {
    console.log('Could not fetch the comments.')
  })
}
