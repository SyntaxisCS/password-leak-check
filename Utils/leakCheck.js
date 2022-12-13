const axios = require("axios");
const {hash} = require("./hasher");

const checkPassword = async (password) => {
    return new Promise((resolve, reject) => {
        if (!password) {
            reject("No password given");
        } else { 
            // hash password from helper
            let hashedPassword = hash(password);

            // get first five characters (k-anonymity)
            let stringSlice = hashedPassword.slice(0, 5);

            // Api call
            axios.get(`https://api.pwnedpasswords.com/range/${stringSlice}`, {
                headers: { "Accept-Encoding": "gzip,deflate,compress"},
                withCredentials: false
            }).then(response => {
                // If no passwords sent no leaks have been found
                if (!response) {
                    resolve(`${password}:\n No leaks found!`);
                } else {
                    // turn string into array
                    let hashArray = response.data.split("\n");

                    // Check array of hashes
                    hashArray.forEach(hash => {
                        // Split hash and passwords apart
                        let hashSplit = hash.split(":");

                        // remove \r
                        hashSplit[1] = hashSplit[1].split("\r")[0];


                        // Add prefex onto response value (k-anonymity)
                        let completeHash = `${stringSlice}${hashSplit[0]}`;

                        if (completeHash === hashedPassword) {
                            resolve({
                                leaked: true,
                                hash: completeHash,
                                instances: hashSplit[1]
                            });
                        }
                    });

                    // If password is not found
                    resolve({
                        leaked: false,
                        hash: hashedPassword,
                        instances: 0
                    });
                }
            }, err => {
                console.error(err);
                reject("Could not check password");
            });
        }
    });
};

module.exports = {checkPassword};