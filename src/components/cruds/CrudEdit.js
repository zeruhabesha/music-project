import React, { useState, useEffect } from "react";
import { get, patch } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import axios from "axios";

function CrudEdit(props) {
  const initialState = {
    title: "",
    artist: "",
    album: "",
    genre: "",
    imageFile: null,
    songFile: null,
  };
  const [crud, setCrud] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getCrud() {
      try {
        const response = await axios.get(`http://localhost:4000/api/songs/view/${_id}`);

        if (response.data && response.data.song) {
          setCrud(response.data.song);
        } else {
          console.error("Invalid data", response.data);
          setError("Error fetching data: Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    }
    getCrud();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    async function updateCrud() {
      try {
        const formData = new FormData();
        formData.append("title", crud.title);
        formData.append("artist", crud.artist);
        formData.append("album", crud.album);
        formData.append("genre", crud.genre);
        formData.append("imageFile", crud.imageFile);
        formData.append("songFile", crud.songFile);

        await patch(`http://localhost:4000/api/songs/update/${_id}`, formData);
        navigate(`/home`);
      } catch (error) {
        console.log(error);
      }
    }
    updateCrud();
  }

  function handleChange(event) {
    if (event.target.name === "imageFile" || event.target.name === "songFile") {
      setCrud({ ...crud, [event.target.name]: event.target.files[0] });
    } else {
      setCrud({ ...crud, [event.target.name]: event.target.value });
    }
  }

  function handleCancel() {
    navigate(`/home`);
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Edit {crud.title}</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              name="title"
              type="text"
              value={crud.title}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Artist</label>
            <input
              name="artist"
              type="text"
              required
              value={crud.artist}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Album</label>
            <input
              name="album"
              type="text"
              required
              value={crud.album}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Genre</label>
            <input
              name="genre"
              type="text"
              required
              value={crud.genre}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Image File</label>
            <input
              name="imageFile"
              type="file"
              onChange={handleChange}
              className="form-control-file"
            />
          </div>
          <div className="form-group">
            <label>Song File</label>
            <input
              name="songFile"
              type="file"
              onChange={handleChange}
              className="form-control-file"
            />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-danger">
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default CrudEdit;
