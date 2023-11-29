import React from "react";
import ImageList from "./components/ImageList";
import "./styles.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
      imageUrl: ""
    };
  }

  // Function to add image to local storage
  addImageToLS = () => {
    localStorage.setItem(
      "images",
      JSON.stringify([...this.state.images, this.state.imageUrl])
    );
    this.setState({ imageUrl: "" }) //clear the input field after adding
  };

  // Function to get images from the local storage
  getImagesFromLS = () => {
    const images = localStorage.getItem("images");
    if (!images) {
      localStorage.setItem("images", JSON.stringify([]));
      return [];
    }
    return JSON.parse(images);
  };

  onAddImage = (e) => {
    e.preventDefault();
    this.addImageToLS(); //calling the dunction to add image to the local storage
    this.getImagesFromLS();
  };

  // Create function to set image url
  setImageUrl = (e) => {
    this.setState({ imageUrl: e.target.value }); //set the state with new url
  }

  // Use appropriate lifecycle method to get images
  componentDidMount(){
    this.setState({ images: this.getImagesFromLS() }); //get the images from local storage 
  }

  render() {
    return (
      <>
        <form onSubmit={this.onAddImage}>
          <input
            type="text"
            placeholder="Image URL"
            value={this.state.imageUrl}
            onChange={this.setImageUrl} //set the image url when the input changes
          />
          <button>Add Image</button>
        </form>
        <ImageList images={this.state.images} />
      </>
    );
  }
}
