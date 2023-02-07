import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const location = useLocation();
  const userid = parseInt(location.pathname.split("/")[2]);
  const queryClient = useQueryClient();

  const { isLoading, error, data: userData } = useQuery(["user", userid], () =>
    makeRequest.get("/users/find/" + userid).then((res) => {
      return res.data;
    })
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    {
      queryKey: ["relationship", {id: userid}],
      queryFn: () => {
        return makeRequest.get("/relationships?followeduserid=" + userData.id).then((res) => {
          return res.data;
        })
      },
      enabled: userData?.id != null
    }
  );

  

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userid=" + userid);
      return makeRequest.post("/relationships", { userid });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
        queryClient.invalidateQueries(["relationshipSidebar"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  const profilepic = userData?.profilepic?.length > 0 ? `http://localhost:8800/images/${userData.profilepic}` :  "https://static.thenounproject.com/png/3672322-200.png"
  const coverpic = userData?.coverpic?.length > 0 ? `http://localhost:8800/images/${userData.coverpic}` :  "https://www.fg-a.com/facebook-images/2021-beach-fun-cover.jpg"

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={coverpic} alt="" className="cover" />
            <img src={profilepic} alt="" className="profilepic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="#">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="#">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="#">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="#">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="#">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{userData.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{userData.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{userData.website}</span>
                  </div>
                </div>
                {rIsLoading ? (
                  "loading"
                ) : userid === parseInt(currentUser.id) ? (
                  <button onClick={() => setOpenUpdate(true)}>Update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userid={userid} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={userData} />}
    </div>
  );
};

export default Profile;
