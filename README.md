# password-leak-check

Hashes and checks plaintext passwords against known password leaks. This can be used to amplify account creation forms to ensure higher account security.

## Installation

```
  // const {checkPassword, humanReadableCheck} = require("@syntaxiscs/password-leak-check"); use this way if you don't want to call leakCheck.checkPassword();
  const leakCheck = require("@syntaxiscs/password-leak-check");
```

## Methods

This package includes 2 methods.

### checkPassword
Main method, if you are using package in production use this method.
```
  const password = "Password1!" // (Placeholder) password from wherever (input field, etc, etc)
  
  leakCheck.checkPassword(password).then(response => {
    // This is thrown if password is leaked or not! Please check value!
    
    console.log(response);
    
    /* Leaked Example:
       {
        leaked: true,
        hash: "SHA-1HASH", // complete SHA-1 hash of provided password,
        instances: 73 // amount of times password has been found
       }
    */
    
    /* Safe Example:
       {
        leaked: false,
        hash: "SHA-1HASH", // complete SHA-1 hash of provided password,
        instances: 0 // amount of times password has been found
       }
    */
    
    /
  }, err => {
    // If the password can not be checked or any other errors. Promise is NOT rejected if password is not leaked!
    console.error(err);
    // EX: Could not check password (Full error is logged to console as well)
  })
  // 
```

### humanReadableCheck
This is used for testing purposes only :) Not indended for production as it only returns strings and logs them to the console and not objects but functionally works the same as the main method
```
  leakCheck.humanReadableCheck(password).then(response => {
    // returns a string but it is logged to the console so no need to do anything here
    
    // example safe return: {PlainText}:\n {Hash} has not been found before.
    // example leak return: {PlainText}:\n {Hash} has been found {instances} times before. Choose another password!.
  }, err => {
    // returns err
  })
```
