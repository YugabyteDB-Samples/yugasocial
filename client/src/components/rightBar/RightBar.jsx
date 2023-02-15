import { useContext } from "react";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import "./rightBar.scss";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const RightBar = () => {
  const { currentUser } = useContext(AuthContext);
  
  const { isLoading: usersLoading, data: users } = useQuery(
    ["users"],
    () =>
      makeRequest.get("/users?userid=" + currentUser.id).then((res) => {
        return res.data;
      })
  );

  const { isLoading: relationshipsIsLoading, data: relationshipData } = useQuery(
    ["relationshipSidebar"],
    () =>
      makeRequest.get("/relationships?followeruserid=" + currentUser.id).then((res) => {
        return res.data;
      })
  );
  
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({following, userid}) => {
      if (following)
        return makeRequest.delete("/relationships?userid=" + userid);
      return makeRequest.post("/relationships", { userid: userid });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
        queryClient.invalidateQueries(["relationshipSidebar"]);
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleFollow = (userid) => {
    mutation.mutate({following: relationshipData?.includes(userid), userid});
  };

  const filterUsersOnClient = (e, userId) => {
    e.preventDefault(); 
    queryClient.setQueryData(["users"], (oldUsers) => {
      const filtered = oldUsers.filter(user => user.id !== userId);
      return filtered;
    })
  }
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {usersLoading || relationshipsIsLoading ? "Loading..." : 
            users?.map(user => {
              const profPic = user?.profilepic?.length > 0 ? `http://localhost:8800/images/${user.profilepic}` : "https://static.thenounproject.com/png/3672322-200.png";
              return <div className="user" key={user.id}>
                <Link to={`/profile/${user.id}`} style={{textDecoration: "none"}}>
                <div className="userInfo">
                  <img
                    src={profPic}
                    alt=""
                  />
                  <span>{user.name}</span>
                </div>
                </Link>
                <div className="buttons">
                    <button onClick={(e) => { e.preventDefault(); handleFollow(user.id);}} className="follow">
                      {relationshipData?.includes(user.id)
                        ? "Following"
                        : "Follow"}
                    </button>
                  <button className="dismiss" onClick={(e) => filterUsersOnClient(e, user.id)}>Dismiss</button>
                </div>
              </div>
            })
          }
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="http://localhost:8800/images/jing.jpg"
                alt=""
              />
              <p>
                <span>Jing Xu</span> changed their profile picture
              </p>
            </div>
            <span>24 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="http://localhost:8800/images/yana.jpg"
                alt=""
              />
              <div className="online" />
              <span>Yana Shevchenko</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
