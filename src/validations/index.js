import * as userValidate from "./user";
import * as articleValidate from "./article";
import * as commentValidate from "./comment";
import * as queriesValidate from "./queries";

function validate(schema, value) {
  const { error } = schema.validate(value);
  if (error) return error;
  return false;
}

export {
  validate,
  userValidate,
  articleValidate,
  commentValidate,
  queriesValidate,
};
