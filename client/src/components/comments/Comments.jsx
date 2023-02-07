import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postid }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments", postid], () =>
    makeRequest.get("/comments?postid=" + postid).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments", postid]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ description: desc, postid });
    setDesc("");
  };

  
  const profilepic = currentUser?.profilepic?.length > 0 ? `http://localhost:8800/images/${currentUser.profilepic}` :  "https://static.thenounproject.com/png/3672322-200.png"
  return (
    <div className="comments">
      <div className="write">
        <img src={profilepic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comment) => {
            const commentuserprofilepic = comment?.profilepic?.length > 0 ? `http://localhost:8800/images/${comment.profilepic}` :  "https://static.thenounproject.com/png/3672322-200.png"
            return <div className="comment" key={comment.id}>
              <img src={commentuserprofilepic} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.description}</p>
              </div>
              <span className="date">
                {moment(comment.createdat).fromNow()}
              </span>
            </div>
          }
        )}
    </div>
  );
};

export default Comments;
