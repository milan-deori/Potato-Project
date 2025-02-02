from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image, UnidentifiedImageError
import tensorflow as tf

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173/",
    "https://potato-leaf-diseases-detection.netlify.app"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
MODEL = tf.keras.models.load_model("trained_plant_disease_model.keras")

# Class names
CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]

@app.get("/")
async def hello():
    return "Hello World"

def read_file_as_image(data) -> np.ndarray:
    try:
        # Load the image
        image = Image.open(BytesIO(data))
        # Ensure it's in RGB format
        image = image.convert("RGB")
        # Resize the image to the input shape of the model
        image = image.resize((128, 128))  # Replace with the model's input shape if different
        # Convert to numpy array
        return np.array(image)
    except UnidentifiedImageError:
        # Raise an exception for invalid image files
        raise HTTPException(status_code=400, detail="Invalid image file. Please upload a valid image.")

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    try:
        # Validate file type
        if not file.filename.lower().endswith(("png", "jpg", "jpeg")):
            raise HTTPException(status_code=400, detail="Invalid file format. Please upload a PNG, JPG, or JPEG image.")

        # Read and preprocess the image
        image = read_file_as_image(await file.read())
        img_batch = np.expand_dims(image, 0)

        # Make predictions
        predictions = MODEL.predict(img_batch)

        # Get predicted class and confidence
        predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
        confidence = np.max(predictions[0])

        # Set a confidence threshold (e.g., 60%)
        if confidence < 0.6:
            raise HTTPException(status_code=400, detail="Uncertain prediction. Please upload a clear potato leaf image.")

        # Return the prediction result
        return {
            'class': predicted_class,
            'confidence': float(confidence)
        }

    except HTTPException as http_err:
        raise http_err  # Handle validation errors
    except Exception as e:
        return {"error": str(e)}  # Handle unexpected errors

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)

