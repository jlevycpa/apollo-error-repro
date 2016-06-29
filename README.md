This repo is intended to be a repoduction of this [issue](https://github.com/apollostack/react-apollo/issues/57).

To get started:

1. `npm install`
2. `npm start`
3. Browse to http://localhost:8080/test
4. You may need to point the client at a real graphQL server in `app.js` and adjust the query in `Container.jsx` to a valid query. The query results are not used, so it can be any query.

You should see the following output in the browser:
```
theApp
theContainer
theItem
```

Each of those lines is produced by a seperate component by outputing a string inside of JSX like this: `{'theApp'}`

Things start to get interesting when you remove the single quotes to create a reference to an undefined variable: `{theApp}`

The results are different for each case:

1. **App** - when removing these quotes you should see the expected behavior: An error in the console: `Uncaught ReferenceError: theApp is not defined`
2. **Container** - when removing these quotes you will see no error in the console, and `{}` output to the DOM. Even though there is no error `theItem` is not rendered. If you inspect the props using the React dev tools you will see that there is an Apollo ReferenceError in the `errors:` key.
3. **Item** - when removing these quotes you will see a very unhelpful error message in the console: `Uncaught (in promise) TypeError: Cannot read property 'replaceChild' of null(…)`. Again inspection of props will show the Apollo error.
