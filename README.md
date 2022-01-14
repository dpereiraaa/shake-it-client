# Shake it

<br>

## Description

[Deployed App Link\](https://gracious-lumiere-0fab2c.netlify.app/)

Have friends over and don't know which cocktail to make? No worries.. With this app, you can search any cocktail's recipe!

I've used [CocktailsDB API](https://www.thecocktaildb.com/api.php)

## User Stories

-  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anonymous user I can sign up on the platform so that I can search for cocktail recipes.
-  **Login:** As a user I can login to the platform so that I can access my profile and start searching for recipes and post pictures of what I made.
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.
-  **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see my favorite cocktails.
-  **Cocktails:** As a user I want to click and visit each cocktail page, so I can see the recipe and images of it.
-  **Random cocktail:** As a use i want to click on the random cocktail, so I can get a random cocktail recipe to surprise myself.
-  **Add posts:** As a user I can add a post with a picture of the cocktail that I made, so people can see.
-  **By ingridient:** As a user I want to search a cocktail by an ingridient.
-  **View Ranks:** As a user I want to see the feed so that I can see what people are posting.

<br>

## Backlog

<br>


# Client / Frontend

## React Router Routes (React App)

| **Path** | **Component** | **Permissions** | **Behavior** |
| ---------- | ---------- | ----------- | ---------- |
| `/login`                     | LoginPage            | anon only `&lt;AnonRoute&gt;`    | Login form, navigates to home page after login.           |
| `/signup`                    | SignupPage           | anon only  `&lt;AnonRoute&gt;`   | Signup form, navigates to home page after signup.         |
| `/`                          | HomePage             | public `&lt;Route&gt;`           | Home page.                                                |
| `/user-profile`              | ProfilePage          | user only `&lt;PrivateRoute&gt;` | User profile for the current user.             |
| `/user-profile/edit`         | EditProfilePage      | user only `&lt;PrivateRoute&gt;` | Edit user profile form.                                   |
| `/cocktail/:cocktailId`           | CocktailDetailsPage | public `&lt;Route&gt;` | See cocktail details.                               |
| `/random/:cocktailId`               | RandomCocktail   | user only `&lt;PrivateRoute&gt;` | Random cocktail details page.                                         |
| `/byIngridient` | byIngridient | user only `&lt;PrivateRoute&gt;` | Search cocktails by Ingridient. |
| `/posts-feed`    | PostsFeed    | user only `&lt;PrivateRoute&gt;` | Users can see what other users are posting feed.                                    |



## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- EditProfilePage

- CocktailDetailsPage

- RandomCocktail

- byIngridient

- PostsFeed
  

Components:

- CocktailsCard
- PostsCard
- ProfileCard
- Navbar






## Services

- **Auth Service**

  - \`authService\` :
    \- `.login(user)`
    \- `.signup(user)`
    \- `.logout()`
    \- `.validate()`

- **User Service**

  - \`userService\` :
    \- `.updateCurrentUser(id, userData)`
    \- `.getCurrentUser()`

- **Cocktails Service**

  \- \`Cocktails Service\` :
    \- `.searchCocktails`
    \- `.getRandomCocktail()`
    \- `.searchByIngridient(id)`

  



<br>

# Server / Backend


## Models

**User model**

```javascript
{
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  profilePic_URL: { type: String },
  user_posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  favorite_drinks: { [ type: String ]},
}
```



**Posts model**

```javascript
  {
    title: { type: String, required: true },
    picture: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }

```


**Comments model**

```javascript
COMMENTS: 
  {
    comment_user: { type: Schema.Types.ObjectId, ref: "User" },
    comment_text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
```




<br>


## API Endpoints (backend routes)

| **HTTP Method** | **URL**                    | **Request Body**                 | **Success status** | **Error Status** | **Description**                                                  |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| GET         | `/auth/profile    `    | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`         | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                                            |
| GET         | `/api/cocktails`     |                              |    200         | 400          | Show all cocktails                                         |
| GET         | `/api/cocktails/:id` |                              |   200         |              | Show specific cocktail                                     |
| GET         | `/api/random/cocktail/:id` |                              |   200         |              | Show specific cocktail                                     |
| GET         | `/api/by-ingridient/cocktail/:id` |                              |   200         |              | Show cocktails by ingridient                                     |
| GET         | `/api/posts-feed` |                              |   200         |              | Show all posts on feed                                     |
| POST         | `/api/posts-feed` |                              |   200         |              | Show all posts on feed                                     |


<br>


## Links

### Git

The url to your repository and to your deployed project

[Client repository Link\](https://github.com/dpereiraaa/shake-it-client)

[Server repository Link\](https://github.com/dpereiraaa/shake-it-server)

[Deployed App Link\](https://gracious-lumiere-0fab2c.netlify.app/)
