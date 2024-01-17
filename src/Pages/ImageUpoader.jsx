import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ImageUploader = () => {
    const [file, setFile] = useState(null);
    const [imageName, setImageName] = useState('');
    const [data, setData] = useState(null);

    const onDrop = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false,
    });

    const handleSubmit = async () => {
        if (!file || !imageName) {
            alert('Please select an image and enter a name.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async () => {
            const base64String = reader.result.split(',')[1];

            try {
                // Send data to the backend
                // await axios.post('http://localhost:3000/upload', {
                //   imageName,
                //   imageData: base64String,
                // });
                const data = {
                    imageName: imageName,
                    imageData: base64String
                }
                // setData(data)
                console.log("image data--->", data)
                alert('Image uploaded successfully!');
                // Clear the form after successful upload
                setFile(null);
                setImageName('');
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };

        reader.readAsDataURL(file);
    };

    return (
        <div>
            <h2>Image Uploader</h2>
            <div {...getRootProps()} style={dropzoneStyle}>
                <input {...getInputProps()} />
                <p>Drag and drop an image here, or click to select one</p>
            </div>
            {file && (
                <div>
                    <h3>Selected Image:</h3>
                    <img src={URL.createObjectURL(file)} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </div>
            )}
            <label>
                Image Name:
                <input type="text" value={imageName} onChange={(e) => setImageName(e.target.value)} />
            </label>
            <button onClick={handleSubmit}>Upload Image</button>
        </div>
    );
};

const dropzoneStyle = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
};

export default ImageUploader;
