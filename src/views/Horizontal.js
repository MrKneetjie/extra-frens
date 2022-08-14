import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Post from 'components/post/Post';

const HorizontalPage = () => {
  const history = useHistory();
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);

  if (!isLogin) {
    history.push('/login');
  }

  const title = 'Subscriptions';
  const description = 'View Subscriptions';

  const breadcrumbs = [{ to: '', text: 'Home' }];

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://extrafrens-api.vercel.app/api/getPosts');
      const body = await result.json();
      setPosts(body.posts);
    }

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
              <Col xl="8" xxl="9" className="mb-5">
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
              <Col xl="4" xxl="3">
                <h2 className="small-title">Tags</h2>
                <div className="card">
                  <div className="mb-n1 card-body">
                    <button type="button" className="mb-1 me-1 btn btn-outline-primary btn-sm">
                      Kyle (12)
                    </button>
                    <button type="button" className="mb-1 me-1 btn btn-outline-primary btn-sm">
                      Is (3)
                    </button>
                    <button type="button" className="mb-1 me-1 btn btn-outline-primary btn-sm">
                      Waiting (1)
                    </button>
                    <button type="button" className="mb-1 me-1 btn btn-outline-primary btn-sm">
                      On (3)
                    </button>
                    <button type="button" className="mb-1 me-1 btn btn-outline-primary btn-sm">
                      Onlybands (5)
                    </button>
                    <button type="button" className="mb-1 me-1 btn btn-outline-primary btn-sm">
                      Now (7)
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </section>
          {/* Title End */}
        </Col>
      </Row>
    </>
  );
};

export default HorizontalPage;
