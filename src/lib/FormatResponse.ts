import { HttpCode } from '../util/httpCode';
import logger from '../util/logger';

class FormatResponse {
  success: boolean;
  statusCode: HttpCode;
  message: string;
  data: null | object;
  /**
   * @param {Boolean} success true/false
   * @param {number} statusCode response code
   * @param {string} message addition message
   * @param {object} data response data
   */
  constructor(
    success: boolean,
    statusCode: HttpCode,
    message: string | any,
    data: object | null
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.log();
  }

  log(): void {
    if (!this.success) {
      logger.error(`status_code: ${this.statusCode}, message: ${this.message}`);
    }
  }
}

export default FormatResponse;
