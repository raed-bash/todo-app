# Todo App

## Description

This app will help you manage your employees' tasks, and it has two roles: `Admin` and `Employee`.

> Note: This link provides a service for the app [Todo Service](https://github.com/raed-bash/todo-service)

---

## Table of Contents

- [Features](#Features)
- [Installation](#Installation)
  - [Todo App](#Todo-App-Installation)
  - [Todo Service](#Todo-Service-Installation)
- [Running the app](#Running-the-app)
  - [Todo Service](#Running-the-Todo-Service)
  - [Todo App](#Running-the-Todo-App)
- [Login](#Login)
- [Running Docker Containers](#Runnig-Docker-Containers)

---

## Features

- **Create tasks** for employees or for yourself as an admin
- Change the user's role
- Reset the user's password
- Send messages to a specific user, or multiple users, or all users, or users with a specific role

---

## Installation

### Prerequisites

Make sure you have the following technologies installed:

- [**Node.js**](https://nodejs.org/en/download/package-manager) Runtime Environment
- **npm** or **yarn** Package Managers
- **MySQL** Database

> Note: When you install Node.js, npm will be installed along with it.

#

### Todo App Installation

1. Clone the repo

```bash
$ git clone https://github.com/raed-bash/todo-app.git
```

2.  Install dependencies

```bash
# Go to the project
$ cd todo-app

# Start install
$ npm install
# Or
$ yarn install
```

#

### Todo Service Installation

1. Clone the repo

```bash
$ git clone https://github.com/raed-bash/todo-service
```

2. Install dependencies

```bash
# Go to the project
$ cd todo-service

# Start Install
$ npm install
# Or
$ yarn install
```

---

## Running the app

### MySQL Database

If you have a MySQL Shell, You can running this commands, Otherwise create todo Database.

```bash
# Config with MySQL, -u username
$ mysql -u root -p

# Create todo Database
mysql> CREATE DATABASE todo;
```

#

### Running the Todo Service

#### Make Configuration with MySQL server.

`Bash Terminal`

```bash
# Go to the project
$ cd todo-service

# Create .env file
$ touch .env
```

`Command Line Interface (cmd)`

```cmd
> cd todo-service

> cd.> .env
```

`PowerShell`

```powershell
> cd todo-service

> New-Item .env
```

Inside the .env file

```.env
DATABASE_URL = mysql://yourUsername:yourPassword@localhost:3306/todo

PORT = Any port do you want # Default Port is 3001

DEFAULT_USERNAME = root # Any username do you want

DEFAULT_PASSWORD = password # Any password do you want
```

Then run this command to generate database

```bash
$ npm run prisma:generate
```

Run this command to put seed to login into the project

```bash
$ npx prisma db seed
```

Now you are ready to run the todo service

```bash
$ npm run start:dev
```

### Running the Todo App

#### Make Configuration with the server.

`Bash Terminal`

```bash
# Go to the project
$ cd todo-app

# Create .env file
$ touch .env
```

`Command Line Interface (cmd)`

```cmd
> cd todo-app

> cd.> .env
```

`PowerShell`

```powershell
> cd todo-app

> New-Item .env
```

Inside the .env file

```.env
REACT_APP_API = http://localhost:3001 # Put service port
```

Now you are ready to run the todo app

```bash
$ npm run start
```

---

## Login

#### Login by root user you put it in todo service .env file

```txt
USERNAME = root
PASSWORD = password
```

### Runnnig Docker Containers

#### Run this commmand to pull the images and start the all system containers

```bash
$ docker compose -f ./todo-sys-compose.yml up
```

Now You can go to http://localhost:8080 and login by [**credentials**](#Login)
