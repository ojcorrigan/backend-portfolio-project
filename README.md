Welcome to my very first app. I have created it as part of the Northcoders bootcamp. 

What I have made is a simple app with several endpoints all of which can be viewed in the endpoints.json file. The aim was to create a news app which could provide the client with information about news articles, comments, users and topics. It also allows for posting of new comments, deletion of comments by id and the patching of articles. 

The app was made using TDD and utilising an MVC model to access data from tables from a small database using SQL. 

There are a few things you'll need to do if you want to get it up and running.

If you want to clone the repo I would recommend forking first incase you want to make any changes then using the command:
git clone <YOUR_URL_HERE>  you will be able to copy the files to your own local repo.

make sure to install all the dependencies first, this can be done using the command line prompt npm i to install all the appropriate dependencies. They should include: dotenv, express, postgres, supertest, jest, jest-sorted, jest-extended, husky and pg-format.

You will need to make sure you connect the two databases (development and test).
To do this you will need to create individual .env files using the .env-example as a template.

to seed the databases you will need to run the command npm run setup-dbs, this will allow the app to run as intended. 

minimum node requirements v16

There is not much else to say other than enjoy.
