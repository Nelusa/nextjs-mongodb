import NotificationContext from "@/store/notification-context";
import { useContext, useRef } from "react";
import styles from "./NewsletterRegistration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter...",
      status: "pending",
    });

    const reqBody = {
      email: enteredEmail,
    };

    fetch(`/api/newsletter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
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
          message: "Successfully registered for newsletter!",
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
  }

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
