class FormatResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data:  null | object;
  /**
   * @param {Boolean} success true/false
   * @param {number} statusCode response code
   * @param {string} message addition message
   * @param {object} data response data
   */
  constructor(success: boolean, statusCode: number, message: string, data: object) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export default FormatResponse;
