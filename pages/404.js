import React from "react";
import Head from "next/head";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import LogOutModal from "../components/modals/LogOutModal";

const errorPage = () => {
  return (
    <>
      <Head>
        <title>SB Admin 2 - 404 Page</title>
      </Head>
      <div id="page-top">
        {/* <!-- Page Wrapper --> */}
        <div id="wrapper">
          <SideBar />

          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* <!-- Main Content --> */}
            <div id="content">
              <Header />

              {/* <!-- Begin Page Content --> */}
              <div className="container-fluid">
                {/* <!-- 404 Error Text --> */}
                <div className="text-center">
                  <div className="error mx-auto" data-text="404">
                    404
                  </div>
                  <p className="lead text-gray-800 mb-5">Page Not Found</p>
                  <p className="text-gray-500 mb-0">
                    It looks like you found a glitch in the matrix...
                  </p>
                  <a href="/">&larr; Back to Dashboard</a>
                </div>
              </div>
              {/* <!-- /.container-fluid --> */}
            </div>
            {/* <!-- End of Main Content --> */}

            {/* <!-- Footer --> */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2020</span>
                </div>
              </div>
            </footer>
            {/* <!-- End of Footer --> */}
          </div>
          {/* <!-- End of Content Wrapper --> */}
        </div>
        {/* <!-- End of Page Wrapper --> */}

        {/* <!-- Scroll to Top Button--> */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>

        <LogOutModal />
      </div>
    </>
  );
};

export default errorPage;
