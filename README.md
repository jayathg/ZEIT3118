# ZEIT3118
ZEIT3118 Group 5
Passwords without keyboards – authentication for the Web

## Requirements
- NodeJS
- MySQL
- Auth0
-Jest

## Getting Started

To get started, clone the repo to your device
```
git clone https://github.com/jayathg/ZEIT3118.git
```
From here you will need to initialise node with the following command in your ZEIT3118 directory
```
npm init
```
To run the website you will need to run the command
```
node index.js
```
To initialise the database in a seperate terminal you will have to initiate the database if you dont already have it. 
To do this run the commands
```
mysql -u root -p
```
Afer entering the root mysql password, you need to run the command
```
CREATE DATABASE zeit3118;
```
Now exit the mysql shell using the command
```
exit
```
Now run the command on

Windows 
```
node js\databaseConn.js
```
MacOS
```
node js/databaseConn.js
```

##Running unit tests 

```
npm install -g jest
```
Auth0 config, run 
```
npm install express express-openid-connect --save
```
