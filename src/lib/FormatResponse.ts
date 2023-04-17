import { HttpCode } from '../util/httpCode';
import logger from '../util/logger';

class FormatResponse {
  success: boolean;
  status_code: HttpCode;
  message: string;
  data: null | object;
  /**
   * @param {Boolean} success true/false
   * @param {number} status_code response code
   * @param {string} message addition message
   * @param {object} data response data
   */
  constructor(
    success: boolean,
    status_code: HttpCode,
    message: string | any,
    data: object | null
  ) {
    this.success = success;
    this.status_code = status_code;
    this.message = message;
    this.data = data;
    this.log();
  }

  log(): void {
    if (!this.success) {
      logger.error(
        `status_code: ${this.status_code}, message: ${this.message}`
      );
    }
  }
}

export default FormatResponse;
