const {checkPassword} = require("./Utils/leakCheck");

const humanReadableCheck = (password) => {
    if (!password) {
        console.error("No password given");
        return null;
    } else {
        checkPassword(password).then(response => {
            if (response.leaked) {
                let string = `${password}:\n ${response.hash} has been found ${response.instances} times before. Choose another password!`;
                
                console.info(string);
                return string;
            } else {
                let string = `${password}:\n ${response.hash} has not been found before.`;
                
                console.warn(string);
                return string;
            }
        }, err => {
            console.warn(err);
            return err;
        });
    }
};

module.exports = {checkPassword, humanReadableCheck};