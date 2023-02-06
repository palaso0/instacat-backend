import { Post } from "../../models/";
import { Op } from "sequelize";

export class PostService {
  async getPosts() {
    const Posts = await Post.findAll({
      attributes: ["postId", "photos", "description", "createdAt"],
    });
  }

  async createPost(photos: string[], description: string, userId: string) {
    const newPost = await Post.create(
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
    const post = await Post.findOne({
      where: {
        postId: id,
      },
    });
    return post;
  }

  async removePost(id: string) {
    await Post.destroy({
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
    const post: any = await Post.findByPk(id);
    post.photos = photos;
    post.description = description;
    post.userId = userId;
    await post.save();
  }
  async getPostsByUserId(userId: string) {
    const posts = await Post.findAll({
      where: {
        userId: userId,
      },
    });
    return posts;
  }
}
