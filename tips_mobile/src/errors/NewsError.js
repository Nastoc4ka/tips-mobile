import BaseError from './BaseError';

class NewsError extends BaseError {
  constructor(msg) {
    super(msg);
  }
}

export default NewsError;
