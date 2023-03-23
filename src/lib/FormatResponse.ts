import { HttpCode } from "../util/httpCode";

class FormatResponse {
  success: boolean;
  statusCode: HttpCode;
  message: string;
  data:  null | object;
  /**
   * @param {Boolean} success true/false
   * @param {number} statusCode response code
   * @param {string} message addition message
   * @param {object} data response data
   */
  constructor(success: boolean, statusCode: HttpCode, message: string | any, data: object | null) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export default FormatResponse;
