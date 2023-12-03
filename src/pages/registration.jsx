import { Card, Input, Option, Select, Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState("User");
  const [isVisible, setIsVisible] = useState(false);

  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const { state } = useLocation();
  const from = state?.from || "/";

  const { Registration, GoogleSignIn, updateUserProfile } = useAuth();

  const handlePasswordVisibilityChange = () => {
    setIsVisible((visible) => !visible);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleGoogleLogin = () => {
    GoogleSignIn()
      .then(async (res) => {
        await fetch(import.meta.env.VITE_EXPRESS_API + "/users/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            username,
            type: "user",
          }),
        });

        toast.success("Successful Registration");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain uppercase letters");
      return;
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
      toast.error("Password must contain special characters");
      return;
    }

    Registration(email.trim(), password)
      .then(async (res) => {
        const ImgBBUrl = await uploadToImgBB(profilePicture);

        console.log(ImgBBUrl);

        updateUserProfile(username, ImgBBUrl.data.url).then(() => {
          fetch(import.meta.env.VITE_EXPRESS_API + "/users/create-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              username,
              type: selectedVersion,
            }),
          })
            .then((data) => data.json())
            .then((res) => {
              if (res.data.insertedId) {
                console.log("user added to the database");
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        });

        //navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    return await fetch(
      "https://api.imgbb.com/1/upload?key=afc8c694e18a5ea37d748c1c5bc84eac",
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());
  };

  return (
    <div className="flex justify-center items-center min-h-screen mx-auto mt-5 md:mt-0">
      <Card className="flex justify-center shadow-xl md:min-h-[80vh] md:w-[90%] mx-2 rounded-lg w-full border-2">
        <div className="flex flex-col-reverse md:flex-row justify-center items- mx-2">
          <form
            className="w-full md:w-1/2 flex flex-col items-start lg:pl-32 md:pl-16 gap-4"
            onSubmit={handleSubmit}
          >
            <p className="text-3xl lg:text-5xl font-extrabold mb-4">
              Registration
            </p>
            <div className="w-full max-w-sm">
              <Input
                id="username"
                label="Username"
                required
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="py-2 rounded-lg border-gray-300 max-w-sm"
              />
            </div>

            <div className="w-full max-w-sm">
              <Input
                id="email1"
                label="Email"
                required
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="py-2 rounded-lg border-gray-300 max-w-sm"
              />
            </div>
            <div className="w-full max-w-sm">
              <Input
                id="password1"
                label="Password"
                required
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className="py-2 rounded-lg border-gray-300 max-w-sm"
              />
            </div>

            <label htmlFor="profilePicture">ProfilePicture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="py-2 rounded-lg border-gray-300 focus:outline-none focus:ring focus:ring-indigo-500"
            />

            <div className="w-72">
              <Select
                label="Select Version"
                value={selectedVersion}
                onChange={(value) => setSelectedVersion(value)}
              >
                <Option value="user">User</Option>
                <Option value="deliveryMen">DeliveryMen</Option>
              </Select>
            </div>

            <Button
              type="submit"
              className="btn w-32 self-center md:self-start"
            >
              Register
            </Button>
            <div className="border-b-2 w-full max-w-xs lg:max-w-sm"></div>
            <p className="text-lg">Or login with</p>
            <FcGoogle
              className="cursor-pointer"
              onClick={handleGoogleLogin}
              size={32}
            />

            <Link
              to={"/login"}
              className="md:hidden self-center text-blue-500 underline"
            >
              Already logged in?
            </Link>
          </form>
          <div className="w-full md:w-1/2 px-4 flex flex-col items-center mb-10 md:mb-0 mt-10 md:mt-0">
            <img src="/Signup.svg" alt="signup" className="lg:w-[90%]" />
            <Link
              to={"/login"}
              className="hidden md:block mt-5 text-blue-500 underline"
            >
              Already logged in?
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Registration;
