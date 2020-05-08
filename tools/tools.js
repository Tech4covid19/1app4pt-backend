const crypto = require('crypto');

//
// Crypto functions
//

generate_random = (size) => {
    return crypto.randomBytes(size).toString('hex');
};

//
// Sanitize logs
//

sanitize_log = (error, message) => {
    const error_id = generate_random(4);
    const msg = `ERROR|${error_id}|${message || "-"}|`;
    console.log(msg, error);
    return {
        error: message || 'An unexpected error has occurred.',
        error_id: error_id
    };
}

//
// Validate email
//

validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Exports
exports.sanitize_log = sanitize_log;
exports.validateEmail = validateEmail;