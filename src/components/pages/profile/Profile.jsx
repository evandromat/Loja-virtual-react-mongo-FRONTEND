import React, { useEffect, useState } from "react";
import "./Profile.css";
import PageMenu from "../../pageMenu/PageMenu";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../card/Card";
import {
  getUser,
  updatePhoto,
  updateUser,
} from "../../../redux/features/auth/authSlice";
import Loader from "../../loader/Loader";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-toastify";




const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_presets = process.env.REACT_APP_UPLOAD_PRESET;
const url = "https://api.cloudinary.com/v1_1/evandro-rocha/image/upload/";
export default function Profile() {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.auth);

  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    photo: user?.photo || "",
    address: {
      address: user?.address?.address || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "",
    },
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  //salvar foto
  const saveProfile = async (e) => {
    e.preventDefault();
    const userData = {
      name: profile.name,
      phone: profile.phone,
      address: {
        address: profile.address,
        state: profile.state,
        country: profile.country,
      },
    };
    await dispatch(updateUser(userData));
  };
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const savePhoto = async (e) => {
    e.preventDefault();
    let imgURL;
    try {
      if (
        profileImage !== null &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("upload_preset", upload_presets);
        image.append("clould_name", cloud_name);
        // salvando imagem no cloudnary
        const config = {
          method: "POST",
          body: image,
        };

        const res = await fetch(url, config);

        const imgdata = await res.json();
        
        imgURL = imgdata.url.toString();
      }
      // salvando imagem no mongoDB
      const userData = {
        photo: profileImage ? imgURL : profile.photo,
      };
      await dispatch(updatePhoto(userData));
      setPreviewImage(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    // const token = localStorage.getItem("token");
    if (user === null || user === "undefined") {
      dispatch(getUser(token));
    }
    // dispatch(getUser(token));
  }, [dispatch, token]);
  useEffect(() => {
    if (user) {
      setProfile({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
        photo: user?.photo,
        address: {
          address: user?.address?.address || "",
          state: user?.address?.state || "",
          country: user?.address?.country || "",
        },
      });
    }
  }, [dispatch, user]);
  return (
    <>
      <section>
        {isLoading && <Loader />}
        <div className="container">
          <PageMenu />
          <h2>Profile</h2>
          <div className="--flex-start profile">
            <Card cardClass={"card"}>
              {!isLoading && (
                <>
                  <div className="profile-photo">
                    <div>
                      <img
                        src={previewImage === null ? user?.photo : previewImage}
                        alt=""
                      />
                      <h3>Papel: {user?.role}</h3>
                      <div className="--center-all">
                        {previewImage !== null && (
                          <button
                            className="--btn --btn-secondary"
                            onClick={savePhoto}
                          >
                            <AiOutlineCloudUpload size={18} />
                            Salvar foto
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <form onSubmit={saveProfile}>
                    <p>
                      <label htmlFor="">Mudar Foto</label>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={(e) => handleImageChange(e)}
                      />
                    </p>
                    <p>
                      <label htmlFor="">Nome</label>
                      <input
                        type="text"
                        name="name"
                        value={profile?.name}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profile?.email}
                        onChange={handleInputChange}
                        disabled
                      />
                    </p>
                    <p>
                      <label htmlFor="">Telefone</label>
                      <input
                        type="text"
                        name="phone"
                        value={profile?.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label htmlFor="">Endereço</label>
                      <input
                        type="text"
                        name="addres"
                        value={profile?.address?.address}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label htmlFor="">Estado</label>
                      <input
                        type="text"
                        name="state"
                        value={profile?.address?.state}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label htmlFor="">País</label>
                      <input
                        type="text"
                        name="country"
                        value={profile?.address?.country}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <button className="--btn --btn-primary --btn-block">
                      Atualizar Perfil
                    </button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
