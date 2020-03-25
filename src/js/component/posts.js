import React, { useState, useEffect } from "react";

//create your first component
export let Posts = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch("https://ss.snkrden.us/article/wp-json/wp/v2/posts?per_page=25")
			.then(response => {
				// console.log(response.ok); // will be true if the response is successfull
				// console.log(response.status); // the status code = 200 or code = 400 etc.
				// console.log(response.text()); // will try return the exact result as string
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(list => {
				setPosts(
					list.map(item => ({
						title: item.title.rendered,
						id: item.id,
						text: item.excerpt.rendered
					}))
				);

				console.log(list);
			})
			.catch(error => {
				//error handling
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	return (
		<div>
			<h1 className="text-center mt-5">Posts List</h1>
			<div className="container d-flex justify-content-center">
				<div className="card bg-light">
					<div className="card-body">
						<ul className="list-group list-group-flush">
							{posts.map(t => (
								<li
									key={t.id}
									className="list-group-item bg-light d-flex flex-column box">
									<div
										style={{
											fontWeight: "bold"
										}}
										dangerouslySetInnerHTML={{
											__html: t.title
										}}
									/>
									<span />
									<div
										style={{
											fontSize: "1rem"
										}}
										dangerouslySetInnerHTML={{
											__html: t.text
										}}
									/>
									<div
										style={{
											fontSize: "1rem"
										}}>
										Post Id: {t.id}
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
