import { Commentary } from "../../models";
import { Op } from "sequelize";

export class CommentaryService {
  async getCommentarysByPostId(postId: string) {
    const likes = await Commentary.findAll({
      where: {
        postId: postId,
      },
    });
    return likes;
  }

  async getCommentary(postId: string, userId: string) {
    const like = await Commentary.findOne({
      where: {
        postId: postId,
        userId: userId,
      },
    });
    return like;
  }

  async createCommentary(postId: string, userId: string, comment: string) {
    const newCommentary = await Commentary.create(
      {
        postId: postId,
        userId: userId,
        comment: comment,
      },
      {
        fields: ["postId", "userId", "comment"],
      }
    );
    return newCommentary;
  }

  async removeCommentary(postId: string, userId: string) {
    await Commentary.destroy({
      where: {
        postId: postId,
        userId: userId,
      },
    });
  }

  async commentaryExists(postId: string, userId: string): Promise<boolean> {
    const commentary = await Commentary.findOne({
      where: {
        postId: postId,
        userId: userId,
      },
    });
    return commentary !== null;
  }
}
