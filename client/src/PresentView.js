import React, { useState, useEffect } from "react";

//i can use the id to get the info that I need from the back end
// need another get fetch
export default function PresentView() {
	const [list, setList] = useState(null);
	const [error, setError] = useState("");
	const searchParams = new URLSearchParams(window.location.search); //variable that holds all query parameters in the browser with ?my_parameter=xxx
	const id = searchParams.get("list_id"); //variable that holds the id

	useEffect(() => {
		fetch(`http://localhost:5000/lists/${id}`)
			.then(res => res.json())
			.then(lists => {
				// upon success, update tasks
				setList(lists);
			})
			.catch(err => {
				// upon failure, show error message
				console.log(err);
				setError(`Oops! Couldn't get the presents list. ${err.message}`);
			});
	}, []);
	console.log(list);
	//console.log(list.presents[0].name);

   const deletePresent = async id => {
		try {
		  await fetch(`http://localhost:5000/lists/delete/${id}`, {
			method: "DELETE",
			headers: {
			  "Content-Type": "application/json"
			},
			
		  });
		  setList(null);
		  
		} catch (error) {
		  setError("Try again later");
		} 
	  };
	

	

	return (
		<div>
			<h2>View presents</h2>
			{list ? (
				<div>
					<h2>{list.owner}</h2>
					<h3>{list.name}</h3>
					<h3>{list.presents[0].name}</h3>
					<img alt={list.presents[0].name} src={list.presents[0].url} />
					<div>
						<button onClick={() => deletePresent(id)} className="delete_button">Delete

						</button>
						</div>
					
	
				</div>

				
				
				
			) : null}
			{error ? <h2>{error}</h2> : null}
		</div>
	);
}
