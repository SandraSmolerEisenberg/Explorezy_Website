## System Definition (MS0)

### Purpose

The system (named Explorezy) allows the user to view popular travel sights in New York and read other users posts. Furthermore, the user can create an account and modify their profile once logged in. When logged in the user can add/delete favorite places and create/delete trips and adding places to it. The user can share a trip with others by making it public in which case both other logged in and not logged in users will be able to see it. Users can also create/delete/edit posts which are displayed to all visitors of the website.

### Pages

The website displays a global navigation bar where the user can navigate to the “Places”, "Posts", "Trips" pages, choose to log in, or register as a user. The Home Page displays posts made by users and places. If the user is logged in, the navigation bar also displays “My favorites”, “My trips” and "Profile" as well as a "Logout" button.

The page “Places” displays all places in the database. A "next" and "previous" button allows the user to navigate throughout the list displaying five places on each page. The user can click on a place to view more details. Here, the user can also add the place to "MyFavoruites" list if they are logged in. When viewed on a smaller screen the places are instead displayed in an "accordion" style type of view.

The page “My favorites” displays a list of places which have been added to favourites by the user. The user has the option to remove a favourited Place from the list on the page.

The page “My trips” shows a list of all trips for the currently logged in user. The user can create a trip where they can mark them as public (public trips can be seen by everyone including not logged in users) or private and they have the option to add places to a specific trip. The user can also delete a trip or choose to remove all their trips.

On the "Profile" page the user can view their profile information as well as choose to update their profile. When a user has set a first name and is logged in the navigation bar displays ther first name instead of "Profile".

The "Login" page consists of a simple log in form which requires correct email and password.

The "Registration" page allows the user to create an account by providing email and password (required) and first name and last name (optional)

The "Posts" page lists all posts created by all users. When logged in the user has the option to create a post, update their post or delete a post they have created.

The "Trips" page displays all public trips for both logged in and not logged in users.

### Entity-Relationship (ER) Diagram

![ER Diagram](./images/er_diagram.png)

## Teaser (MS3)

![Teaser](./images/teaser.png)

# Backend and Frontend Template

Latest version: https://git.ita.chalmers.se/courses/dit341/group-00-web (public Github [mirror](https://github.com/dit341/group-00-web))

## Project Structure

| File        | Purpose           | What you do?  |
| ------------- | ------------- | ----- |
| `server/` | Backend server code | All your server code |
| [server/README.md](server/README.md) | Everything about the server | **READ ME** carefully! |
| `client/` | Frontend client code | All your client code |
| [client/README.md](client/README.md) | Everything about the client | **READ ME** carefully! |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Free online production deployment | Deploy your app online in production mode |
| [docs/LOCAL_DEPLOYMENT.md](docs/LOCAL_DEPLOYMENT.md) | Local production deployment | Deploy your app local in production mode |

## Requirements

The version numbers in brackets indicate the tested versions but feel free to use more recent versions.
You can also use alternative tools if you know how to configure them (e.g., Firefox instead of Chrome).

* [Git](https://git-scm.com/) (v2) => [installation instructions](https://www.atlassian.com/git/tutorials/install-git)
  * [Add your Git username and set your email](https://docs.gitlab.com/ce/gitlab-basics/start-using-git.html#add-your-git-username-and-set-your-email)
    * `git config --global user.name "YOUR_USERNAME"` => check `git config --global user.name`
    * `git config --global user.email "email@example.com"` => check `git config --global user.email`
  * > **Windows users**: We recommend to use the [Git Bash](https://www.atlassian.com/git/tutorials/git-bash) shell from your Git installation or the Bash shell from the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to run all shell commands for this project.
* [Chalmers GitLab](https://git.ita.chalmers.se/) => Login with your **Chalmers CID** choosing "Sign in with" **Chalmers Login**. (contact [support@chalmers.se](mailto:support@chalmers.se) if you don't have one)
  * DIT341 course group: https://git.ita.chalmers.se/courses/dit341
  * [Setup SSH key with Gitlab](https://docs.gitlab.com/ee/ssh/)
    * Create an SSH key pair `ssh-keygen -t ed25519 -C "email@example.com"` (skip if you already have one)
    * Add your public SSH key to your Gitlab profile under https://git.ita.chalmers.se/profile/keys
    * Make sure the email you use to commit is registered under https://git.ita.chalmers.se/profile/emails
  * Checkout the [Backend-Frontend](https://git.ita.chalmers.se/courses/dit341/group-00-web) template `git clone git@git.ita.chalmers.se:courses/dit341/group-00-web.git`
* [Server Requirements](./server/README.md#Requirements)
* [Client Requirements](./client/README.md#Requirements)

## Getting started

```bash
# Clone repository
git clone git@git.ita.chalmers.se:courses/dit341/group-00-web.git

# Change into the directory
cd group-00-web

# Setup backend
cd server && npm install
npm run dev

# Setup frontend
cd client && npm install
npm run serve
```

> Check out the detailed instructions for [backend](./server/README.md) and [frontend](./client/README.md).

## Visual Studio Code (VSCode)

Open the `server` and `client` in separate VSCode workspaces or open the combined [backend-frontend.code-workspace](./backend-frontend.code-workspace). Otherwise, workspace-specific settings don't work properly.
