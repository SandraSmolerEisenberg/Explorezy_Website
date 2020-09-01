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

## System Definition (MS0)

### Purpose

The system(named Explorezy) allows the user to view and search for different travel information by location such as restaurants, accommodations, city sightseeing, and different activities available at the selected location. Furthermore, the user can create an account. When logged in the user can manage (add and remove) favorite places for repeated access to locations of interest. Logged-in users can also create trips and add places to them.

### Pages

The Homepage consists of the main navigation bar where the user can choose to log in or register. The page has a map where the user can search for locations. A search box above the map facilitates a known-item search. If the user is logged in, the home page also displays “My favorites” and “My trips” in the global navigation bar. Once the user selects a location, a new component is loaded. 

If a visitor uses the search function or the map on the Homepage, they are redirected to a new sub-page where the map is zoomed in on that location and displays all the places of interest in the area. If a user selects a place on the map, the side panel displays information about that chosen place. If the user is logged in they will have the option to add it to their favorites or to any existing trip.

More sub-pages are divided by categories and display specific content of interest such as accommodation, food and drink, and more in a list view. If the user is logged in they will have the option to add an item to their list of favorites or trips. 

The sub-pages “My favorites” and “My Trips” are available from the global navigation bar as a logged-in user. This is where the user can manage their own favorite saved places and create and manage trips. Once a trip is created the user will have the option to add a place of interest to the trip. The user can also log out and view and update their profile.

[UI Prototype](https://drive.google.com/file/d/1J8VwD1p_1uqvXKWKEhklpzzby-T5zfD4/view?usp=sharing)

### Entity-Relationship (ER) Diagram

![ER Diagram](./images/er_diagram.png)

## Teaser (MS3)

![Teaser](./images/teaser.png)
