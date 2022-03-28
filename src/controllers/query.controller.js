import queryMessage from "../services/query.service";
import Response from "../utils";
import { validate, queriesValidate } from "../validations";

const { sendMessage, findAllQueries } = queryMessage;

class queryController {
  static async sendMessages(req, res) {
    const { guestName, email, message } = req.body;
    const { details: errors } = validate(
      queriesValidate.CreateQueriesSchema,
      req.body
    );
    if (errors) return Response.error(res, 400, "all fields are required");
    const Messages = await sendMessage({
      guestName,
      email,
      message,
    });

    Messages.save();
    return Response.success(res, 201, "Message sent successfully", Messages);
  }

  static async findQueries(req, res) {
    const Queries = await findAllQueries();
    if (!Queries) return Response.error(res, 404, "Messages not found");
    return Response.success(
      res,
      200,
      "retrieved all messages successfully",
      Queries
    );
  }
}

export default queryController;
