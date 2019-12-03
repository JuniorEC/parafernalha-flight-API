export class HttpResponse {

    constructor(private code: Number, private success: Boolean, private error: any,
        private message: any, private data?: any, private blobArr?: Array<Buffer>) {

    }

    toJson() {
        return {
            code: this.code,
            success: this.success,
            error: this.error,
            message: this.message,
            data: this.data,
            blobArr: this.blobArr
        }
    }

}
