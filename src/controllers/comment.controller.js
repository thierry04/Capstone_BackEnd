import commentsService from "../services/comment.service";
import articleServices from "../services/article.service";
import { commentValidate, validate } from "../validations";
import Response from "../utils";

const { readSingleArticle } = articleServices;
const { createComment } = commentsService;
class commentsController {
  static async createComments(req, res) {
    try {
      const { name, comment } = req.body;
      const { details: errors } = validate(
        commentValidate.commentSchema,
        req.body
      );
      if (errors)
        return Response.error(
          res,
          400,
          `please provide ${errors[0].context.key} of at least ${errors[0].context.limit} character length`
        );
      const findPost = await readSingleArticle({ id: req.params.id });
      if (!findPost) return Response.error(res, 404, 'post does not exist');
      const commentsData = await createComment({
        name,
        comment,
        time: Date.now(),
      });
      if (!commentsData) return Response.error(res, 500, 'post not commented');
      findPost.comments.push(commentsData.id);
      findPost.commentsCount += 1;
      await findPost.save();
      return Response.success(
        res,
        201,
        'successfully commentd on a post',
        commentsData
      );
    } catch (error) {
      return Response.error(res, 500, 'internal server error');
    }
  }

  static async getAllComments(req, res) {
    try {
      const findPosts = await readSingleArticle({ id: req.params.id });
      if (!findPosts) return Response.error(res, 404, 'post not found');
      return Response.success(
        res,
        200,
        'successfully retrieved all comments',
        findPosts
      );
    } catch (error) {
      return Response.error(res, 500, 'internal server error');
    }
  }

  static async likeArticle(req, res) {
    try {
      const getPost = await readSingleArticle({ id: req.params.id });
      if (!getPost) return Response.error(res, 404, 'post does not exist');
      getPost.likes += 1;
      await getPost.save();
      return Response.success(res, 200, 'successfully liked a post', getPost);
    } catch (err) {
      return Response.error(res, 500, 'could not be able to like an article');
    }
  }
}
export default commentsController;
