# json-server
`json-server` is a simple mock server that we can use until the backend team has created an API that the frontend can interact with.

It uses a `/server/db.json` file, which acts as a simple database using json data.

Here's how you can interact with it through our code.

<br>

##### Example
```json
// /server/db.json

// example data
{
  "users": [
    {
      "id": 1,
      "email": "person1@test.com",
      "password": "$2a$10$/d2pcuSIx9COyA1Ys6qYc.Ey9PHcAZc2WMfTk4XOHa51TW89b4H8S" // encrypted password for "123456"
    }
  ],

  "messages": [
    {
      "id": 1,
      "text": "I like cheese",
      "userId": 1
    },
    {
      "id": 2,
      "text": "I like pizza",
      "userId": 1
    }
  ]
}
```

```javascript
import { api, getLoggedInUser } from "@/api/api";

(async function() {
  const userData = {
    // unique `id` will automatically be created by the mock server
    email: "person1@test.com",
    password: "123456"
  }

  // register a new account
  await api.post("register", { json: userData }).json()

  // log into account
  await api.post("login", { json: userData }).json();

  // get details of logged in user
  await api.get("me").json();

  // logout
  await api.post("logout").json();


  const messageData = {
    // unique `id` will automatically be created by the mock server
    text: "I like cheese",
    userId: getLoggedInUser().id // special function to retrieve logged in user's details
  }

  // add a new message
  await api.post("messages", { json: messageData }).json();

  // update a specific message
  await api.patch("messages/1", { json: { text: "I like pizza" } }).json()

  // get all messages
  await api.get("messages").json();

  // get a specific message
  await api.get("messages/1").json();

  // delete a specific message
  await api.delete("messages/1").json();
})()
```
