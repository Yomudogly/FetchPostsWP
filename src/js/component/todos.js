import React, { useState, useEffect } from "react";

//create your first component
export let Todos = () => {
	const [todos, setTodos] = useState([]);
	const [tempInputvalue, setTemp] = useState("");
	const [run, setRun] = useState(false);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/yomudogly")
			.then(resp => {
				//console.log(resp.ok); // will be true if the response is successfull
				//console.log(resp.status); // the status code = 200 or code = 400 etc.
				//console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(list => {
				setTodos(
					list.map(item => ({
						text: item.label,
						done: item.done,
						id: Math.floor(Math.random() * 100000)
					}))
				);

				console.log(list);
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	}, []);

	useEffect(
		() => {
			if (run) {
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/yomudogly",
					{
						method: "PUT",
						body: JSON.stringify(
							todos.map(todo => ({
								label: todo.text,
								done: todo.done
							}))
						),
						headers: {
							"Content-Type": "application/json"
						}
					}
				)
					.then(resp => {
						//console.log(resp.ok); // will be true if the response is successfull
						//console.log(resp.status); // the status code = 200 or code = 400 etc.
						//console.log(resp.text()); // will try return the exact result as string
						return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
					})
					.then(list => {
						console.log("FETCH", todos.length);
						console.log(list);
					})
					.catch(error => {
						//error handling
						console.log(error);
					});

				setRun(false);
			}
		},
		[run]
	);

	return (
		<div>
			<h1 className="text-center mt-5">
				{<i className="fa fa-check-square" />} To Do List
			</h1>
			<div className="container d-flex justify-content-center">
				<div className="card bg-light">
					<div className="card-body">
						<div className="input-group input-group-lg card-title mb-5">
							<input
								type="text"
								className="form-control border border-dark"
								placeholder="Type your next todo..."
								aria-label="Type your next todo..."
								aria-describedby="button-addon2"
								onChange={e => setTemp(e.target.value)}
								onKeyUp={e => {
									//listen to the key up and wait for the return key to be pressed (KeyCode === 13)
									if (e.keyCode === 13) {
										console.log("BEFORE SET", todos.length);
										setRun(true);
										setTodos(
											[
												{
													text: e.target.value,
													done: false,
													id: Math.floor(
														Math.random() * 100000
													)
												}
											].concat(todos)
										);
										console.log("AFTER SET", todos.length);

										setTemp("");
									}
								}}
								value={tempInputvalue}
							/>
							<div className="input-group-append">
								<button
									className="btn btn-outline-dark"
									type="button"
									id="button-addon2"
									onClick={() => {
										setRun(true);
										setTodos(
											[
												{
													text: tempInputvalue,
													done: false,
													id: Math.floor(
														Math.random() * 100000
													)
												}
											].concat(todos)
										);
										setTemp("");
									}}>
									Add
								</button>
							</div>
						</div>

						<ul className="list-group list-group-flush">
							{todos.map(t => (
								<li
									key={t.id}
									className="list-group-item bg-light d-flex justify-content-between align-items-center">
									<span
										className={`${
											t.done ? "done" : "notDone"
										}`}
										onClick={() => {
											setRun(true);
											setTodos(
												todos
													.map(todo => {
														if (todo.id === t.id) {
															todo.done = !todo.done;
														}

														return todo;
													})
													.sort(
														todo =>
															todo.done >
															!todo.done
																? 1
																: -1
													)
											);
										}}>
										{t.text}
									</span>
									<button
										type="button"
										className="btn btn-outline-dark"
										onClick={() => {
											setRun(true);
											setTodos(
												todos.filter(
													todo => todo.id != t.id
												)
											);
										}}>
										X
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
