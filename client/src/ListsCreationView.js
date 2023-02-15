import React, { Fragment, useState } from "react";
import "./index.css";

const postList = async (name, occasion, present, url) => {
  const response = await fetch("http://localhost:3000/lists/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      owner: name,
      name: occasion,
      presentName: present,
      url: url,
    }),
  });
  return response.json();
};

export default function ListsCreationView() {
  const [error, setError] = useState("");
  let [response, setResponse] = useState("");

  const [list, setList] = useState({
    name: "",
    occasion: "",
    present: "",
    url: "",
  });

  //creating another const to save the present and url info
  //put them inside of an array so I can have more than one at time
  /*const [addInput, setAddInput] = useState([
		{
			present: "",
			url: ""
		}
	]);

	const addInputField = () => {
		setAddInput([
			...addInput, //adding the information that I already have
			{
				//creating a new object to add more presents and url
				present: "",
				url: ""
			}
		]);
	};*/

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setList({
      ...list,
      [name]: value,
    });
  };

  /*const onPresentNameChange = index => event => {
		const value = event.target.value;
		setAddInput(
			addInput.map((input, inputIndex) =>
				index === inputIndex
					? {
							present: value,
							url: addInput[index].url
					  }
					: input
			)
		);
	};

	const onUrlChange = index => event => {
		const value = event.target.value;
		setAddInput(
			addInput.map((input, inputIndex) =>
				index === inputIndex
					? {
							present: addInput[index].present,
							url: value
					  }
					: input
			)
		);
	};*/
  //handleSubmit saves the information writen in my input and resets the form
  const handleSubmit = (event) => {
    event.preventDefault(); //prevents from refreshing
    postList(list.name, list.occasion, list.present, list.url) //sending the input info to the back end
      //the back end is gonna return an answer with the listId (used on post back end)
      .then((fetchResponse) => {
        //the api returns the id that it's created
        console.log(fetchResponse.listId);
        setResponse(fetchResponse.listId);
      })

      .catch((error) => {
        setError(`List was not created: ${error}`); //in case of error returns it
      });

    setList({
      //reset the form
      name: "",
      occasion: "",
      present: "",
      url: "",
    });
  };

  return (
    <div>
      <div>
        <h2>Start your list</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            name="name"
            onChange={handleInputChange}
            value={list.name}
            placeholder="Your name"
          />
        </div>
        <div>
          <label>Occasion: </label>
          <input
            name="occasion"
            onChange={handleInputChange}
            value={list.occasion}
            placeholder="e.g: Bday"
          />
        </div>
        <section>
          <div>
            <label>Present: </label>
            <input
              name="present"
              onChange={handleInputChange}
              value={list.present}
              placeholder={"Present that you want"}
            />
          </div>
          <div>
            <label>Link: </label>
            <input
              name="url"
              onChange={handleInputChange}
              value={list.url}
              placeholder="Link to buy the present"
            />
          </div>
        </section>
        <button type="submit" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Submit
        </button>
       {/* <button onClick={addInputField} type="button" className="add-more">
          Add more presents
        </button> */} 
      </form>
      {response ? (
        <a href={`/view-presents?list_id=${response}`}>List created!</a>
      ) : null}
      {error ? <h1>{error}</h1> : null}
    </div>
  );
}


