export class PostService {
  Post: any;
  constructor(Post: any) {
    this.Post = Post;
  }
  async getPosts() {
    const Posts = await this.Post.findAll({
      attributes: ["postId", "photos", "description", "createdAt"],
    });
    return Posts;
  }

  async createPost(photos: string[], description: string, userId: number) {
    const newPost = await this.Post.create(
      {
        photos: photos,
        description: description,
        userId: userId,
      },
      {
        fields: ["photos", "description", "userId"],
      }
    );
    return newPost;
  }

  async findPostById(id: string) {
    const post = await this.Post.findOne({
      where: {
        postId: id,
      },
    });
    return post;
  }

  async removePost(id: string) {
    await this.Post.destroy({
      where: {
        PostId: id,
      },
    });
  }
  async updatePost(
    id: string,
    photos: string[],
    description: string,
    userId: string
  ) {
    const post: any = await this.Post.findByPk(id);
    post.photos = photos;
    post.description = description;
    post.userId = userId;
    await post.save();
  }
  async getPostsByUserId(userId: string) {
    const posts = await this.Post.findAll({
      where: {
        userId: userId,
      },
    });
    return posts;
  }
}
