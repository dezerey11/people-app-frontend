import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  const [people, setPeople] = useState(null);

  const URL = "https://people-api-backend-de.herokuapp.com/people/";

  const getPeople = async () => {
    const response = await fetch(URL); // this gives you raw data
    const data = await response.json(); // turns into a javascript object (usable data)
    setPeople(data);
  };

  // whatever you did in postman do here
  const createPeople = async (person) => {
    await fetch(URL, {
      method: "post",
      headers: {
        //header that tells api what data you are sending over
        "Content-Type": "application/json",
      },
      // turn person(js) object into JSON string and send this body
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };

  const updatePeople = async (person, id) => {
    // make the put reques to update a person
    await fetch(URL + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };

  const deletePeople = async (id) => {
    // make delete request to delete a person
    await fetch(URL + id, {
      method: "delete",
    });
    // update list of people
    getPeople();
  };

  useEffect(() => getPeople(), []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index people={people} createPeople={createPeople} />
        </Route>
        <Route
          path="/people/:id"
          render={(rp) => (
            <Show
              people={people}
              updatePeople={updatePeople}
              deletePeople={deletePeople}
              {...rp}
            />
          )}
        />
      </Switch>
    </main>
  );
}
export default Main;
