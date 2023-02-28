
/**
 * Check a username is not null, blank or contains bad data
 * @param username username to be validated
 * @returns true if valid, false if not
 */
exports.checkUsername = (username) => {

    let acceptableChars = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
        'u', 'v', 'w', 'x', 'y', 'z', ' ', '-', '1', '2',
        '3', '4', '5', '6', '7', '8', '9', '0', '_', '@',
        '#', '$', '%'
    ];

    // check if null or empty
    if (username == null || username.trim() == "") {
        return false;
    
    }


    // check all chars are acceptable
    for (i = 0; i < username.length; i++) {
        
        if (!acceptableChars.includes(username.charAt(i).toLowerCase())) {
            return false;
        }
    }

    // if no other errors, good username
    return true;

}