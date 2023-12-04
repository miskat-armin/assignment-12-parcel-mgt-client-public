import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Avatar, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [imageUrl, setImageUrl] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: "afc8c694e18a5ea37d748c1c5bc84eac", // Replace with your ImgBB API key
          },
        }
      );

      const imageLink = response.data.data.url;
      setImageUrl(imageLink);
      updateUserProfile(user?.displayName, imageLink);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-md">
        <div className="flex items-center space-x-4 mb-8">
          <Avatar src={imageUrl || user?.photoURL} alt="profilePic" size="xxl" />
          <div>
            <Typography className="font-bold text-2xl">
              {user?.displayName}
            </Typography>
            <Typography className="text-gray-500">{user?.email}</Typography>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <div
            {...getRootProps()}
            className={`w-48 h-48 border-2 border-dashed rounded-lg flex items-center justify-center ${
              isDragActive ? "bg-blue-100 border-blue-500" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-gray-600">Drop the image here...</p>
            ) : (
              <p className="text-gray-600">
                Drag 'n' drop an image here, or click to select one to update
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
