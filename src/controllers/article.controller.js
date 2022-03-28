import articleServices from "../services/article.service";
import Response from "../utils";
import { articleValidate, validate } from "../validations";
import cloudinary from "../config/cloudinary";

const {
  createArticle,
  readAllArticles,
  readSingleArticle,
  updateArticle,
  deleteArticle,
} = articleServices;

class articleController {
  static async createArticle(req, res) {
    try {
      const results = await cloudinary.uploader.upload(req.file.path);
      const { title, content } = req.body;
      const { details: errors } = validate(
        articleValidate.createArticleSchema,
        req.body
      );
      if (errors)
        return Response.error(
          res,
          409,
          `please provide ${errors[0].context.key} of at least ${errors[0].context.limit} character length`
        );
      const articleCreate = await createArticle({
        title,
        content,
        imageUrl: results.url,
        cloudinary_id: results.public_id,
      });
      if (!articleCreate)
        return Response.error(res, 404, 'article not created');
      articleCreate.save();

      return Response.success(
        res,
        201,
        'article created successfully',
        articleCreate
      );
    } catch (error) {
      return Response.error(res, 500, 'internal server error', error);
    }
  }

  static async readAllArticles(req, res) {
    try {
      const findAllArticles = await readAllArticles();
      if (!findAllArticles)
        return Response.error(res, 404, 'No article was found');
      return Response.success(
        res,
        200,
        'Retrieved all saved article',
        findAllArticles
      );
    } catch (error) {
      return Response.error(res, 500, 'internal server error', error);
    }
  }

  static async singleArticle(req, res) {
    try {
      const singleArticle = await readSingleArticle({ id: req.params.id });
      if (!singleArticle)
        return Response.error(res, 404, 'Provide an id for an article');

      return Response.success(
        res,
        200,
        'article retrieved successfully',
        singleArticle
      );
    } catch (error) {
      return Response.error(res, 500, 'internal server error', error);
    }
  }

  static async updateOneArticle(req, res) {
    try {
      const findArticle = await readSingleArticle({ id: req.params.id });
      if (!findArticle) return Response.error(res, 404, 'article not found!');

      const { details: errors } = validate(
        articleValidate.updateArticleSchema,
        req.body
      );
      if (errors)
        return Response.error(
          res,
          400,
          `please provide ${errors[0].context.key} of at least ${errors[0].context.limit} character length`
        );

      await cloudinary.uploader.destroy(findArticle.cloudinary_id);
      const results = await cloudinary.uploader.upload(req.file.path);
      const data = {
        title: req.body.title || findArticle.title,
        content: req.body.content || findArticle.content,
        imageUrl: results.url || findArticle.imageUrl,
        cloudinary_id: results.public_id || findArticle.cloudinary_id,
      };
      const updatedArticle = await updateArticle(
        {
          id: req.params.id,
        },
        data
      );
      if (!updateArticle)
        return Response.error(res, 500, 'article not updated');

      return Response.success(
        res,
        200,
        'successfuly updated an article',
        updatedArticle
      );
    } catch (error) {
      return Response.error(res, 500, 'internal server error', error);
    }
  }

  static async removeArticle(req, res) {
    const removeArticle = await deleteArticle({ id: req.params.id });
    if (!removeArticle) return Response.error(res, 404, 'article not found');
    await cloudinary.uploader.destroy(removeArticle.cloudinary_id);
    return Response.success(res, 200, 'Article deleted successfuly');
  }
}

export default articleController;
