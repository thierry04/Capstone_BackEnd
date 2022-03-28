import Comments from "../models/comments";

class commentsService {
  static async createComment(comment) {
    const shareComment = await Comments.create(comment);
    return shareComment;
  }

  static async deleteAllComments(){
    const deleteComments = await Comments.deleteMany({});
    return deleteComments
  }
}
export default commentsService;
