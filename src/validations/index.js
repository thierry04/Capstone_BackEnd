import * as userValidation from './user.validation';
import * as articleValidation from './article.validation';
import * as queryValidation from './query.validation';
import * as commentValidation from './comment.validation'

function validate(schema, value){
    const {error} = schema.validate(value);
    if(error) return error;
    return false
}

export {
    validate, userValidation,articleValidation, queryValidation, commentValidation
}