import axios from "axios";

const WebServiceInvokerRest = async (uri, methodType, params, authToken, requestBody) => {

    let host = process.env.REACT_APP_HOST;


    try {
        let config = {
            "url": host + uri,
            "method": methodType,
            "headers": {
                "content-type": 'application/json',
            }
        }

        if (params) {
            config.params = params;
        }
        if (authToken) {
            config.headers.Authorization = "Bearer " + authToken;
        }
        if (requestBody) {
            config.data = requestBody;
        }

        let response = await axios(config)
        console.log(response);
        return response;
    }
    catch (error) {
        console.log(error.response);
        return error.response;
    }
};

export default WebServiceInvokerRest;