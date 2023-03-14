import Layout from "@/components/layout/Layout/Layout";
import { NotificationContextProvider } from "@/store/notification-context";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
