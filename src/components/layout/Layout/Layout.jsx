import Notification from "@/components/ui/Notification/Notification";
import NotificationContext from "@/store/notification-context";
import { Fragment, useContext } from "react";
import MainHeader from "../MainHeader/MainHeader";

const Layout = ({ children }) => {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
};

export default Layout;
