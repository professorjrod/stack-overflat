import React from "react";
import { useState, useEffect } from "react";

const Profile = ({ user }) => {
  const [cardToShow, setCardToShow] = useState("info");
  const [component, setComponent] = useState("");

  //Rerender the correct component based on the cardToShow state
  useEffect(() => {
    renderComponent();
  }, [cardToShow]);

  const handleCardToShow = (e) => {
    console.log(e.target.id);
    setCardToShow(e.target.id);
    renderComponent();
  };

  const renderComponent = () => {
    switch (cardToShow) {
      case "info":
        setComponent(<UserInfo user={user} />);
        break;
      case "submitted":
        setComponent(<SubmittedPosts />);
        break;
      case "comments":
        setComponent(<SubmittedComments />);
        break;
      case "liked":
        setComponent(<LikedPosts />);
        break;
      case "liked_comments":
        setComponent(<LikedComments />);
        break;
      default:
        setComponent(<UserInfo user={user} />);
    }
  };

  return (
    <div className="profile">
      <div className="profileCardSelect w-fit m-auto">
        <span id="info" onClick={handleCardToShow}>
          Info
        </span>
        <span id="submitted" onClick={handleCardToShow}>
          Submissions
        </span>
        <span id="comments" onClick={handleCardToShow}>
          Comments
        </span>
        <span id="liked" onClick={handleCardToShow}>
          Liked Posts
        </span>
        <span id="liked_comments" onClick={handleCardToShow}>
          Liked Comments
        </span>
      </div>
      <div className="cardToShow w-fit m-auto">{component}</div>
    </div>
  );
};

const UserInfo = ({ user }) => {
  return user.username === undefined || user.username === "Anonymous" ? (
    <div>Nothing to display</div>
  ) : (
    <div>
      <ul>
        <li>Username: {user.username}</li>
        <li>Email: {user.email}</li>
        <li>Bio: </li>
      </ul>
    </div>
  );
};

const SubmittedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/me/posts")
      .then((r) => r.json())
      .then((data) => setPosts(data));
  }, []);

  return posts.length > 0 ? <div>{posts}</div> : <div>Nothing to display</div>;
};

const SubmittedComments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("/me/comments")
      .then((r) => r.json())
      .then((data) => setComments(data));
  }, []);

  return comments.length > 0 ? (
    <div>{comments}</div>
  ) : (
    <div>Nothing to display</div>
  );
};

const LikedPosts = () => {
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    fetch("/me/post_likes")
      .then((r) => r.json())
      .then((data) => setLikes(data));
  }, []);

  return likes.length > 0 ? <div>{likes}</div> : <div>Nothing to display</div>;
};

const LikedComments = () => {
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    fetch("/me/comment_likes")
      .then((r) => r.json())
      .then((data) => setLikes(data));
  }, []);

  return likes.length > 0 ? <div>{likes}</div> : <div>Nothing to display</div>;
};
export default Profile;
