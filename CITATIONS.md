Please enumerate the references you used in a list here:

* Created a project in Nodejs for stringinator
* Added most frequent chracter in input per api call
* Added logic to return stats with most frequent words and longest word in the string inputs
* Added logger for monitoring - https://www.npmjs.com/package/winston
* Added string manupulation functions (reverse, palindrome etc)
* Added rate limiter to restrict multiple call from same IP address
* Added basic authentication security for routes 
* Added error handling to unchecked exception
* Used regex for removing the special chacracters 
* Created html to call string api (localhost:8080/ui)
* Concider to protect sql injection from UI

## Known Limitations
1. In-memory statistics are lost on server restart
2. Rate limiting is per process (not distributed)
3. No persistent storage for long-term analytics
4. Basic authentication should compare with the hashed password
5. Concorrency call to stats is will not be accurate

