class SuccessResponse<T = unknown>{
    status:true;
    code:number;
    additional?:T;
    message:string;

    constructor(message:string,code:number,additional?:T){
        this.message = message;
        this.code = code;
        this.additional = additional;
        this.status = true
    }
    serialize(){
        return{
            status:this.status,
            code:this.code,
            message:this.message,
            additional:this.additional
        };
    }
}

export type SuccessResponseType<T = unknown> = {
    status: true;
    code: number;
    message: string;
    additional?: T;
}
export { SuccessResponse };