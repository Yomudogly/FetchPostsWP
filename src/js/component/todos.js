import React, { useState } from "react";

//create your first component
export let Todos = () => {
	const [todos, setTodos] = useState([]);
	const [tempInputvalue, setTemp] = useState("");

	return (
		<div>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Type your next todo..."
					aria-label="Type your next todo..."
					aria-describedby="button-addon2"
					onChange={e => setTemp(e.target.value)}
					onKeyUp={e => {
						//listen to the key up and wait for the return key to be pressed (KeyCode === 13)
						if (e.keyCode === 13) {
							setTodos(
								[
									{
										text: e.target.value,
										done: false,
										id: Math.floor(Math.random() * 100000)
									}
								].concat(todos)
							);
							setTemp("");
						}
					}}
					value={tempInputvalue}
				/>
				<div className="input-group-append">
					<button
						className="btn btn-outline-secondary"
						type="button"
						id="button-addon2"
						onClick={() => {
							setTodos(
								[
									{
										text: tempInputvalue,
										done: false,
										id: Math.floor(Math.random() * 100000)
									}
								].concat(todos)
							);
							setTemp("");
						}}>
						Button
					</button>
				</div>
			</div>

			<ul>
				{todos.map(t => (
					<li
						onClick={() =>
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
											todo.done > !todo.done ? 1 : -1
									)
							)
						}
						key={t.id}
						className={`${t.done ? "done" : "notDone"}`}>
						{t.text}
					</li>
				))}
			</ul>
		</div>
	);
};
