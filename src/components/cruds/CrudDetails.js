import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
// import { Button, Image, Grid, Col, Card } from 'tailwindcss-react';

function CrudDetails(props) {
	const [crud, setCrud] = useState({});

	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function getCrudById() {
				try {
					const response = await axios.get(`localhost:4000/api/songs/view/${_id}`);
					setCrud(response.data);
				} catch (error) {
					console.log("error", error);
				}
			}
			getCrudById();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props]
	);

	async function handleDelete() {
		try {
			await axios.delete(`localhost:4000/api/songs/delete/${_id}`);
			navigate("/home");
		} catch (error) {
			console.error(error);
		}
	}

	return (

		<div><Navbar/>

		<br/><br/><br/>
		<div className="container">
			
			
			<h2>{crud.title}</h2>

			<p>
				<b>artist</b>:  {crud.artist} 
			</p>

			<p>
				<b>album</b>: {crud.album}
			</p>
			<p>
				<b>genre</b>: {crud.genre}
			</p>
			<p>
				<b>Photo</b> :
			<img src={crud.imageFile} alt=""/>
			</p>
			<p>
				<b>Song</b>: {crud.songFile}
			</p>
			<br/><br/>
			<div className="btn-group ">
				<Link to={`/songs/${crud._id}/edit`} className="btn btn-primary">
					Edit
				</Link>
				<button onClick={handleDelete} className="btn btn-danger">
					Delete
				</button>
				<Link to="/home" className="btn btn-secondary">
					Close
				</Link>
			</div>
			<hr />
		
		</div>	<Footer/>
		</div>
	);
}

export default CrudDetails;
