# Github-Profile-Viewer
To search github users with there names and view their profile and repositories.
Using `https://api.github.com/`


## Getting started
1. Ensure you have [nodejs] installed
2.  Fork this repository using command `git clone https://github.com/akshitarora921/github-profile-viewer.git`
3.	Run `npm install` to install all dependencies
4.	Run `npm start` to start server
5.	Goto http://localhost:3000

## General Guideline
1. The api has request limit of 60 calls per hour.


# Fetch data and display user profile
1.	Github user api: `https://api.github.com/search/users?q=eric` takes a search string to search users in github. The search string could be passed as parameter q
2.	Create a textbox in the home component to take user by using the above mentioned api
3.  Display first 10 users in the search result and then lazy load others.
4.  You can see full profile of the user on clicking on the user at home page.



