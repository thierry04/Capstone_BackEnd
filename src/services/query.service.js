import Query from "../models/Query";

class queryMessage {
  static async sendMessage(message) {
    const Message = await Query.create(message);
    return Message;
  }

  static async findAllQueries() {
    const findAllQueries = await Query.find();
    return findAllQueries;
  }

  static async deleteAllQueries() {
    const deleteAllQueries = await Query.deleteMany({});
    return deleteAllQueries;
  }
}
export default queryMessage;
