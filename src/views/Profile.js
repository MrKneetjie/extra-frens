import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Post from 'components/post/Post';

const ProfilePage = () => {
  const history = useHistory();
  const { userId } = useParams();
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);

  if (!isLogin) {
    history.push('/login');
  }

  const title = 'Profile';
  const description = 'View Profile';

  const breadcrumbs = [{ to: '', text: 'Home' }];

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        account: userId,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch('https://extrafrens-api.vercel.app/api/getProfileInfo', requestOptions)
        .then((response) => {
          if (response.status === 200) {
            console.log('Successful Fetch');

            response
              .json()
              .then((data) => {
                setProfile(data.account);
              })
              .catch((error) => console.log('error', error));
          } else {
            console.log(`Looks like there was a problem. Status Code: ${response.status}`);
          }
        })
        .catch((error) => console.log('error', error));
    };

    fetchData();
  }, []);

  useCustomLayout({ placement: MENU_PLACEMENT.Horizontal, layout: LAYOUT.Boxed });

  return (
    <>
      <HtmlHead title={title} description={description} />
      <Row>
        <Col>
          {/* Title Start */}
          <section className="scroll-section" id="title">
            <div className="page-title-container">
              <h1 className="mb-0 pb-0 display-4">{title}</h1>
              <BreadcrumbList items={breadcrumbs} />
            </div>
            <Row className="g-5">
              <Col xl="4" xxl="3" className="mb-5">
                <h2 className="small-title">Profile</h2>
                <div className="mb-5 card">
                  <div className="card-body">
                    <div className="d-flex align-items-center flex-column mb-4">
                      <div className="d-flex align-items-center flex-column">
                        <div className="sw-13 position-relative mb-3">
                          <img src={profile.thumb} className="img-fluid rounded-xl" alt="thumb" />
                        </div>
                        <div className="h5 mb-0">{profile.name}</div>
                        <div className="text-muted">{profile.role}</div>
                        {/* <div className="text-muted">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="cs-icon pin me-1"
                          >
                            <path d="M3.5 8.49998C3.5 -0.191432 16.5 -0.191368 16.5 8.49998C16.5 12.6585 12.8256 15.9341 11.0021 17.3036C10.4026 17.7539 9.59777 17.754 8.99821 17.3037C7.17467 15.9342 3.5 12.6585 3.5 8.49998Z" />
                          </svg>
                          <span className="align-middle">Montreal, Canada</span>
                        </div> */}
                      </div>
                    </div>
                    <div className="flex-column nav" role="tablist">
                      <a
                        role="tab"
                        data-rr-ui-event-key="overview"
                        id="profileStandard-tab-overview"
                        aria-controls="profileStandard-tabpane-overview"
                        aria-selected="true"
                        className="px-0 border-bottom border-separator-light cursor-pointer nav-link active"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="cs-icon activity me-2"
                        >
                          <path d="M2 10H4.82798C5.04879 10 5.24345 10.1448 5.3069 10.3563L7.10654 16.3551C7.25028 16.8343 7.93071 16.8287 8.06664 16.3473L11.905 2.75299C12.0432 2.26379 12.7384 2.26886 12.8693 2.76003L14.701 9.62883C14.7594 9.84771 14.9576 10 15.1841 10H18" />
                        </svg>
                        <span className="align-middle">Overview</span>
                      </a>
                      {/* <a
                        role="tab"
                        data-rr-ui-event-key="projects"
                        id="profileStandard-tab-projects"
                        aria-controls="profileStandard-tabpane-projects"
                        tabIndex="-1"
                        className="px-0 border-bottom border-separator-light cursor-pointer nav-link"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="cs-icon suitcase me-2"
                        >
                          <path d="M14.5 5C15.9045 5 16.6067 5 17.1111 5.33706C17.3295 5.48298 17.517 5.67048 17.6629 5.88886C18 6.39331 18 7.09554 18 8.5L18 14.5C18 15.9045 18 16.6067 17.6629 17.1111C17.517 17.3295 17.3295 17.517 17.1111 17.6629C16.6067 18 15.9045 18 14.5 18L5.5 18C4.09554 18 3.39331 18 2.88886 17.6629C2.67048 17.517 2.48298 17.3295 2.33706 17.1111C2 16.6067 2 15.9045 2 14.5L2 8.5C2 7.09554 2 6.39331 2.33706 5.88886C2.48298 5.67048 2.67048 5.48298 2.88886 5.33706C3.39331 5 4.09554 5 5.5 5L14.5 5Z" />
                          <path d="M14 5L13.9424 4.74074C13.6934 3.62043 13.569 3.06028 13.225 2.67266C13.0751 2.50368 12.8977 2.36133 12.7002 2.25164C12.2472 2 11.6734 2 10.5257 2L9.47427 2C8.32663 2 7.75281 2 7.29981 2.25164C7.10234 2.36133 6.92488 2.50368 6.77496 2.67266C6.43105 3.06028 6.30657 3.62044 6.05761 4.74074L6 5" />
                          <path d="M18 9L11.855 12.8406C11.0846 13.3221 10.6994 13.5629 10.2784 13.622C10.0937 13.648 9.90629 13.648 9.72161 13.622C9.30056 13.5629 8.91537 13.3221 8.145 12.8406L2 9" />
                          <path d="M11 9H10H9" />
                        </svg>
                        <span className="align-middle">Projects</span>
                      </a>
                      <a
                        role="tab"
                        data-rr-ui-event-key="permissions"
                        id="profileStandard-tab-permissions"
                        aria-controls="profileStandard-tabpane-permissions"
                        tabIndex="-1"
                        className="px-0 border-bottom border-separator-light cursor-pointer nav-link"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="cs-icon lock-off me-2"
                        >
                          <path d="M5 12.6667C5 12.0467 5 11.7367 5.06815 11.4824C5.25308 10.7922 5.79218 10.2531 6.48236 10.0681C6.73669 10 7.04669 10 7.66667 10H12.3333C12.9533 10 13.2633 10 13.5176 10.0681C14.2078 10.2531 14.7469 10.7922 14.9319 11.4824C15 11.7367 15 12.0467 15 12.6667V13C15 13.9293 15 14.394 14.9231 14.7804C14.6075 16.3671 13.3671 17.6075 11.7804 17.9231C11.394 18 10.9293 18 10 18V18C9.07069 18 8.60603 18 8.21964 17.9231C6.63288 17.6075 5.39249 16.3671 5.07686 14.7804C5 14.394 5 13.9293 5 13V12.6667Z" />
                          <path d="M11 15H10 9M13 6V5C13 3.34315 11.6569 2 10 2V2C8.34315 2 7 3.34315 7 5V10" />
                        </svg>
                        <span className="align-middle">Permissions</span>
                      </a>
                      <a
                        role="tab"
                        data-rr-ui-event-key="friends"
                        id="profileStandard-tab-friends"
                        aria-controls="profileStandard-tabpane-friends"
                        tabIndex="-1"
                        className="px-0 border-bottom border-separator-light cursor-pointer nav-link"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="cs-icon heart me-2"
                        >
                          <path d="M8.76342 3.53821L9.38606 4.02249C9.74717 4.30335 10.2528 4.30335 10.6139 4.02249L11.2366 3.53822C13.0089 2.15977 15.5753 2.55317 16.8533 4.39919C18.1181 6.22616 17.9917 8.67633 16.5456 10.3635L10.7593 17.1142C10.3602 17.5798 9.63984 17.5798 9.24074 17.1142L3.45439 10.3635C2.00828 8.67633 1.88189 6.22616 3.14672 4.39919C4.42473 2.55317 6.99113 2.15977 8.76342 3.53821Z" />
                        </svg>
                        <span className="align-middle">Friends</span>
                      </a>
                      <a
                        role="tab"
                        data-rr-ui-event-key="about"
                        id="profileStandard-tab-about"
                        aria-controls="profileStandard-tabpane-about"
                        tabIndex="-1"
                        className="px-0 cursor-pointer nav-link"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="cs-icon user me-2"
                        >
                          <path d="M10.0179 8C10.9661 8 11.4402 8 11.8802 7.76629C12.1434 7.62648 12.4736 7.32023 12.6328 7.06826C12.8989 6.64708 12.9256 6.29324 12.9789 5.58557C13.0082 5.19763 13.0071 4.81594 12.9751 4.42106C12.9175 3.70801 12.8887 3.35148 12.6289 2.93726C12.4653 2.67644 12.1305 2.36765 11.8573 2.2256C11.4235 2 10.9533 2 10.0129 2V2C9.03627 2 8.54794 2 8.1082 2.23338C7.82774 2.38223 7.49696 2.6954 7.33302 2.96731C7.07596 3.39365 7.05506 3.77571 7.01326 4.53982C6.99635 4.84898 6.99567 5.15116 7.01092 5.45586C7.04931 6.22283 7.06851 6.60631 7.33198 7.03942C7.4922 7.30281 7.8169 7.61166 8.08797 7.75851C8.53371 8 9.02845 8 10.0179 8V8Z" />
                          <path d="M16.5 17.5L16.583 16.6152C16.7267 15.082 16.7986 14.3154 16.2254 13.2504C16.0456 12.9164 15.5292 12.2901 15.2356 12.0499C14.2994 11.2842 13.7598 11.231 12.6805 11.1245C11.9049 11.048 11.0142 11 10 11C8.98584 11 8.09511 11.048 7.31945 11.1245C6.24021 11.231 5.70059 11.2842 4.76443 12.0499C4.47077 12.2901 3.95441 12.9164 3.77462 13.2504C3.20144 14.3154 3.27331 15.082 3.41705 16.6152L3.5 17.5" />
                        </svg>
                        <span className="align-middle">About</span>
                      </a> */}
                    </div>
                  </div>
                </div>
              </Col>
              <Col xl="8" xxl="9">
                <h2 className="small-title">Posts</h2>
                {posts &&
                  posts.map((post) => {
                    return (
                      <Post
                        key={post.id}
                        title={post.title}
                        description={post.description}
                        banner={post.banner}
                        user={post.user}
                        views={post.views}
                        comments={post.comments}
                      />
                    );
                  })}
              </Col>
            </Row>
          </section>
          {/* Title End */}
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
