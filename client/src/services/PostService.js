import { Api } from '@/Api'

class PostService {
  async getAllPosts() {
    return await Api.get('/posts')
  }

  async getAllPostsForUser(id) {
    return await Api.get('/posts?user=' + id)
  }

  async createPost(post) {
    return await Api.post('/posts', post)
  }

  async updatePost(post) {
    return await Api.put('/posts/' + post._id, post)
  }

  async deletePost(post) {
    return await Api.delete('/posts/' + post._id)
  }
}

export default new PostService()
