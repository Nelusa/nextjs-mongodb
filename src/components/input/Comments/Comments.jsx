import NotificationContext from "@/store/notification-context";
import { useContext, useEffect, useState } from "react";

import CommentList from "../CommentList/CommentList";
import NewComment from "../NewComment/NewComment";
import styles from "./Comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`, {})
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    //notification

    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored into a database...",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    }) //stačí začít lomítkem, nemusíme mít root URL
      .then((response) => {
        if (response.ok) {
          //pokud je všechno ok
          return response.json();
        }
        //toto musíme udělat, abychom se dokázali dostat do catch bloku (jinak bychom se tam prakticky nikdy nedostali)
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Your comment was saved!",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });

    // send data to API
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    }) //stačí začít lomítkem, nemusíme mít root URL
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingComments && "Loading..."}
    </section>
  );
}

export default Comments;
