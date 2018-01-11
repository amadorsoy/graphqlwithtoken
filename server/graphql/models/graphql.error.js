import { GraphQLError } from 'graphql';

class ValidationError extends GraphQLError {
  constructor(errors) {
    super('Ups, error.');
    this.state = errors.reduce((result, error) => {        
        if (Object.prototype.hasOwnProperty.call(result, error.key)) {
          result[error.key].push(error.message);
        } else {
            result[error.key] = [error.message];
        }
        return result;
  }, {});
  }
}

export default ValidationError;