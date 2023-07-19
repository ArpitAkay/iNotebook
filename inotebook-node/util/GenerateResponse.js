const generateResponse = async (type, value, msg, path, location) => {
    let returnObj = {
    }
    if(type !== null) {
        returnObj.type = type;
    }
    if(value !== null) {
        returnObj.value = value;
    }
    returnObj.msg = msg
    if(path !== null) {
        returnObj.path = path;
    }
    if(location !== null) {
        returnObj.location = location;
    }

    let error = [
        returnObj
    ]

    return error;
}

module.exports = generateResponse;