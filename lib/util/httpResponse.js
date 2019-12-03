"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpResponse {
    constructor(code, success, error, message, data, blobArr) {
        this.code = code;
        this.success = success;
        this.error = error;
        this.message = message;
        this.data = data;
        this.blobArr = blobArr;
    }
    toJson() {
        return {
            code: this.code,
            success: this.success,
            error: this.error,
            message: this.message,
            data: this.data,
            blobArr: this.blobArr
        };
    }
}
exports.HttpResponse = HttpResponse;
//# sourceMappingURL=httpResponse.js.map