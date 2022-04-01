# BACKEND PORTFOLIO PROJECT

<p>Welcome to my very first app. I have created it as part of the Northcoders bootcamp.</p>

<p>I have made a simple app with several endpoints (all of which can be viewed in the endpoints.json file.)<br> 
The aim was to create a news app which could provide the client with information about news articles, comments, users and topics.<br> It also allows for posting of new comments, deletion of comments by id and the patching of articles.</p>

<p>The app was made using a TDD process and utilising an MVC model to access data from tables from a small database using SQL.</p>

---

## STEP BY STEP

<p>There are a few things you'll need to do if you want to get it up and running.</p>

<p>If you want to clone the repo I would recommend forking first incase you want to make any changes.<br>
You will then want to copy the url for your new repo for use in cloning locally.</p>

<p>Then you will want to clone the repo to a local directory.
first navigate to the folder you wish to copy the directory into and clone it using the git clone command in your terminal:

`git clone <YOUR_URL_HERE> `

once the files are cloned you will need to install the dependencies</p>

### DEPENDENCIES

<p>to install the dependencies I have used you will need to use the prompt:

`npm i `

They should include: dotenv, express, postgres, supertest, jest, jest-sorted, jest-extended, husky and pg-format. They should be in the package.json like this:</p>
<code> "devDependencies": {<br>
"husky": "^7.0.4",<br>
"jest": "^27.5.1",<br>
"jest-extended": "^2.0.0",<br>
"jest-sorted": "^1.0.14",<br>
"pg-format": "^1.0.4"<br>
},<br>
"dependencies": {<br>
"dotenv": "^16.0.0",<br>
"express": "^4.17.3",<br>
"pg": "^8.7.3",<br>
"supertest": "^6.2.2"<br>
},</code>

### SETUP DATABASE

<p>You will need to make sure you connect the two databases (development and test).
To do this you will need to create individual **.env** files using the **.env-example** as a template.<br>

You will require a **.env.test** and a **.env.development** file to be able to connect to the appropriate database. </p>

<p>to seed the databases you will need to run the command

`npm run setup-dbs `

this will allow the app to run as intended.</p>

---

## MINIMUM REQUIREMENTS:

<br>

minimum node requirements v17.4.0

minimum PostgreSQL v14.2

---

if you would like to see a hosted version of the app you can visit:

https://ojs-news-app1.herokuapp.com/

There is not much else to say other than enjoy.
