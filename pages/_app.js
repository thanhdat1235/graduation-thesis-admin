import "../styles/verifyotp.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/posts/create-post.scss";
import "../styles/style.scss";
import "../public/js/main";
import "../public/css/sb-admin-2.css";
import "../public/vendor/jquery/jquery.min.js";
import "../public/vendor/bootstrap/js/bootstrap.bundle.min.js";
import "../public/vendor/jquery-easing/jquery.easing.min.js";
import "../public/js/sb-admin-2";
import "../styles/globals.css";
import "../public/vendor/fontawesome-free/css/all.min.css";

import "../styles/loader/loaderStyle.scss";

// import "../public/vendor/datatables/jquery.dataTables.min.js";
// import "../public/vendor/datatables/dataTables.bootstrap4.min.js";
// import "../public/js/demo/datatables-demo.js";
import toast, { Toaster } from "react-hot-toast";

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

function MyApp({ Component, ...pageProps }) {
  return (
    <>
      <Toaster
        reverseOrder={false}
        position="bottom-right"
        containerStyle={{ zIndex: 999999 }}
      />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
