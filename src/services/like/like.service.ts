import { Like } from "../../models/";
import { Op } from "sequelize";

export class LikeService {
  async getLikesByPostId(postId: string) {
    const likes = await Like.findAll({
      where: {
        postId: postId,
      },
    });
    return likes;
  }

  async getLike(postId: string, userId: string) {
    const like = await Like.findOne({
      where: {
        postId: postId,
        userId: userId,
      },
    });
    return like;
  }
  async createLike(postId: string, userId: string) {
    const newLike = await Like.create(
      {
        postId: postId,
        userId: userId,
      },
      {
        fields: ["postId", "userId"],
      }
    );
    return newLike;
  }

  async removeLike(postId: string, userId: string) {
    await Like.destroy({
      where: {
        postId: postId,
        userId: userId,
      },
    });
  }

  async likeExists(postId: string, userId: string): Promise<boolean> {
    const like = await Like.findOne({
      where: {
        postId: postId,
        userId: userId,
      },
    });
    return like !== null;
  }
}
