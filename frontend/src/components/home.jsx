import React, { useState, useRef } from "react";
import axios from "axios";
//import "../App.css"; // Custom CSS file
import "./home.css"
import { IoCloudUploadOutline } from "react-icons/io5";
import { Link } from "react-router-dom";




function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);



  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (!file) return;
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        // Set max dimensions
        const MAX_WIDTH = 256;
        const MAX_HEIGHT = 256;
  
        // Create a canvas to resize the image
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        // Set new dimensions
        canvas.width = MAX_WIDTH;
        canvas.height = MAX_HEIGHT;
  
        // Draw the resized image
        ctx.drawImage(img, 0, 0, MAX_WIDTH, MAX_HEIGHT);
  
        // Convert canvas back to a Blob (image file)
        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
  
          setSelectedFile(resizedFile);
          setImagePreview(URL.createObjectURL(resizedFile));
        }, "image/jpeg", 0.8); // 0.8 = 80% image quality
      };
    };
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please upload an image file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:8000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPrediction(response.data);
    } catch (error) {
      console.error("Error during prediction:", error);
      alert("Error occurred while predicting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
   
      <div className="upload-wrapper">
        <div className="app">
          <h1>Potato Leaf Disease Detection</h1>

          <form onSubmit={handleSubmit}>

            <label htmlFor="image-upload-input">
              {imagePreview ? <div className="image-preview">
                <img src={imagePreview} alt="Selected" className="imgg" />
              </div> : <div> <IoCloudUploadOutline className="icon" /></div>
              }
              <div>
                {imagePreview ? false : "Click to Chose an Image"}
              </div>
            </label>

            <input id="image-upload-input" type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />

            <button type="submit" disabled={loading}>
              {loading ? "Analyzing..." : "Predict"}
            </button>

          </form>

          {prediction && (
            <div className="result">
              <h2>Prediction Result:</h2>
              <div className="mainresult">
                <p>
                  <strong>Disease:</strong> {prediction.class}
                </p>
                <p>
                  <strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(2)}%
                </p>

              </div>
              {prediction.class === "Early Blight" && (
                <button className="btn"> <Link to={"/Early-Blight"} className="link">Show Solution</Link></button>
              )}
               {prediction.class === "Late Blight" && (
                <button className="btn"> <Link to={"/Late-Blight"} className="link">Show Solution</Link></button>
              )}
            </div>
          )}
        </div>
      </div>

    </>
  );
}

export default ImageUpload;