## Quick Reference
- [framework](./framework/docs/guide.md)
- [json-server](./framework/docs/json-server.md)
- [styling](./framework/docs/styling.md)
- [snippets](./framework/docs/snippets.md)
- [figma mockups](https://www.figma.com/file/587J4t9ZyECOsIrixiXsDj/Lumen?type=design&node-id=0-1&mode=design)

<br>

## Introduction
You will need nodejs to be able to run this application. You can install nodejs [here](https://nodejs.org/en). Using the LTS version would be best.

Enter the commands below in a terminal to be able to install the project dependencies and run the application on a dev server.

<br>

##### Installation
```bash
# git clone git@gitlab-student.macs.hw.ac.uk:ma2106/lumen.git
# cd lumen
# npm install
```

<br>

##### Running the Backend Mock Server
I have used a package called `json-server` to create a backend mock server for us. We will likely have to use this until the backend team can create an API for the frontend to interact with. You can run the mock server using the following command at the **root directory**.
```
npm run server
```
You can find additional documentation on how to work with `json-server` [here](./framework/docs/json-server.md).

<br>

##### Running the Development Server for the Frontend Client
I have used `vite` as our bundler. It includes a a number of things to make our lives as developers considerably easier. One of those things is a development server. When run, whenever we make changes to our code files, the dev server will automatically refresh our webpage so we can instantly see our changes reflected on the browser without having to manually refresh. **In a separate terminal**, you can run the dev server using the following command at the **root directory**.
```
npm run dev
```
After running the dev server, please go to `http://localhost:5173/`. This is where our website will load.

<br>

## Framework
I've set up this application to use a custom mini-framework that will deal with component rendering, state management and rendering for us. Please go **[here](./framework//docs/guide.md)** and read through the documentation before getting started.

<br>

## The Project
You do not need to worry about anything in the root directory. All the code that we will write will be in the **src** directory. I will use `@` to reference the src directory from here onwards.

The src directory contains the following directories:
- `@/app`: contains separate files to register components, pages, state slices, and to setup our router
- `@/api`: used to create queries and mutations
- `@/assets`: contains images and other types of files we may need
- `@/components`: contains all of our custom components
- `@/pages`: contains all of our custom pages
- `@/states`: contains all of our custom state slices
- `@/styles`: contains all of our custom stylesheets (using CSS)
- `@/utils`: contains any utility functions that we may need to create

<br>

## Custom Components
I urge you to check out the following files in the following order, and understand what has been done. This will help you get started.

1. Go to `@/app/router.js`. This is the entry file for all the websites URL paths. It will load components at their associated paths. I have already done some work in the `@/pages/LoginPage.js` component. This component gets rendered when you visit `/login`.
2. Go to `@/app/pages.js`. All of the pages have been registered in this file.
3. Go to `@/app/components.js` All of the custom components will need to be registered in this file.
4. Go to `@/pages/LoginPage.js`. This renders a `Nav` component and the `LoginForm` component.
5. Go to `@/components/LoginForm.js`. This renders an `<x-form />` and 2 `<x-input />` components. These 2 components have been fully styled already. This makes them completely reusable throughout the project. So if styling is not your thing, then like this, we only need to create the component with its styling once, and then we can reuse it unlimited times.
6. Check out the `Form` and `Input` components at `@/components/ui/Form.js` and `@/components/ui/Input.js`

<br>

## Styling
I have used `bootstrap` as our CSS library of choice. It is a library which contains a number of prebuilt css classes that we can use in our code without having to worry about writing css. Please go [here](./framework/docs/styling.md) for additional details.

<br>

## Code Snippets
A snippet allows you to generate a bunch of code by just writing a few letters, for example:
![frcomp snippet example](./framework/docs/assets/snippet-example.gif)

I have created a number of snippets (for components, state slices, querys and mutations) to help with the boilerplate. Please find details [here](./framework/docs/snippets.md) on how to set them up. I HIGHLY recommend that you do. It will make your life considerably easier.

We can change these snippets as needed later. Let me know if you want help to set them up.

<br>

## Git Branches
For now there are 2 branches:
- `main` - This branch will only contain stable, fully-functional, production-ready code. You **must not** directly push to this branch. Every week we will meet, make any necessary changes to the dev branch, and then merge the dev branch onto main.
- `dev` - All changes should be committed and pushed onto this branch

You are free to create any other branches of your choice. Not only are you allowed, but you are encouraged to do this. Therefore any code you write will not affect any other branch until you are sure you're code is working correctly, at which point you can merge it into the dev branch.

<br>

## Final Remarks
If you cannot figure out where to start, just start off by making any component, and write the html for that component in its `render` method (with css classes). Then try to make it interactive through event listeners (using `@click`, `@submit`, etc).

**If you need help, please ask other members of the team. This is a group effort. We can learn so many different things from each other. I would rather you make an effort and ask 1000 questions than make no effort at all. So let's make the most of it. Good luck everyone.**
