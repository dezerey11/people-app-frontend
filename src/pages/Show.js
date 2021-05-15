import { useState } from "react";

function Show(props) {
  // grab the id from the url
  const id = props.match.params.id;
  // put the people array in its variable
  const people = props.people;
  // find the individual person in people
  const person = people.find((p) => {
    return p._id === id;
  });

  // state for form
  const [editForm, setEditForm] = useState(person);

  // handleChange function for form
  const handleChange = (event) => {
    setEditForm({
      ...editForm,
      [event.target.name]: event.target.value,
    });
  };

  // handle for when form is submitted
  const handleSubmit = (event) => {
    // to prevent refresh
    event.preventDefault();
    // update the person
    props.updatePeople(editForm, person._id);
    // redirect people back to index
    props.history.push("/");
  };

  const removePerson = () => {
    props.deletePeople(person._id);
    props.history.push("/");
  };

  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      <img src={person.image} alt={person.name} />
      <button id="delete" onClick={removePerson}>
        DELETE
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Update Person" />
      </form>
    </div>
  );
}

export default Show;
