class ResponseAPI
{
    public list = (data) => {
        return {
            'totals' : data.length,
            'results' : data
        }
    }

    public data = (item) => {
        return item
    }

    public success = (message: string) => {
        return {'message' : [message]}
    }

    public inputError = (input:string, message: string) => {
        return {'message' : {input : [message]}}
    }

    public error = (message: string) => {
        return {'message' : {'non_field_error' : [message]}}
    }
}

export default new ResponseAPI();