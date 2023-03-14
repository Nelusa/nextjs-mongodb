import styles from "./CommentList.module.css";

function CommentList({ comments }) {
  console.log(comments);
  return (
    <ul className={styles.comments}>
      {/* Render list of comments - fetched from API */}

      {comments.map((comment) => {
        return (
          <li key={comment._id}>
            <p>{comment.text}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
