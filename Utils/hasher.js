const crypto = require("crypto");

const hash = (password) => {
    if (!password) {
        return null;
    } else {
        let hash = crypto.createHash("sha1");

        hash.update(password);

        let hashed = hash.digest("hex").toUpperCase();

        return hashed;
    }
};

module.exports = {hash};