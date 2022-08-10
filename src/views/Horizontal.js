import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const HorizontalPage = () => {
  const history = useHistory();
  const { isLogin, currentUser } = useSelector((state) => state.auth);

  if (!isLogin) {
    history.push('/login');
  }

  const title = 'Subscriptions';
  const description = 'View Subscriptions';

  const breadcrumbs = [{ to: '', text: 'Home' }];

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
                <div className="mb-5 card">
                  <a href="/pages/blog/detail">
                    <img src="https://i.kym-cdn.com/entries/icons/original/000/038/027/cover2.jpg" className="card-img-top sh-35" alt="card image" />
                  </a>
                  <div className="card-body">
                    <h4 className="mb-3">
                      <a href="/pages/blog/detail">Basic Introduction to Pimpin</a>
                    </h4>
                    <p className="clamp text-alternate mb-0">
                      Pimpin hoes is like aging fine wine. It takes time to get it right. But once you do get it right, it's amazing</p>
                  </div>
                  <div className="border-0 pt-0 card-footer">
                    <div className="align-items-center row">
                      <div className="col-6">
                        <div className="d-flex align-items-center">
                          <div className="sw-5 d-inline-block position-relative me-3">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcVHAFW54RCcKkJH4OWZ26gmqfcHE9QEGiyXNjznaTZKnp2WubCdl1q-BMrorF6h2QXxg&usqp=CAU"
                              className="img-fluid rounded-xl"
                              alt="thumb"
                            />
                          </div>
                          <div className="d-inline-block">
                            <a aria-current="page" className="active" href="/pages/blog/list">
                              Andrew Tate
                            </a>
                            <div className="text-muted text-small">Creator</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="g-0 justify-content-end row">
                          <div className="ps-3 col-auto">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="15"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="cs-icon eye text-primary me-1"
                            >
                              <path d="M2.47466 10.8418C2.15365 10.3203 2.15365 9.67971 2.47466 9.15822C3.49143 7.50643 6.10818 4 10 4C13.8918 4 16.5086 7.50644 17.5253 9.15822C17.8464 9.67971 17.8464 10.3203 17.5253 10.8418C16.5086 12.4936 13.8918 16 10 16C6.10818 16 3.49143 12.4936 2.47466 10.8418Z" />
                              <path d="M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12Z" />
                            </svg>
                            <span className="align-middle">421</span>
                          </div>
                          <div className="ps-3 col-auto">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="15"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="cs-icon message text-primary me-1"
                            >
                              <path d="M14.5 2C15.9045 2 16.6067 2 17.1111 2.33706C17.3295 2.48298 17.517 2.67048 17.6629 2.88886C18 3.39331 18 4.09554 18 5.5L18 10.5C18 11.9045 18 12.6067 17.6629 13.1111C17.517 13.3295 17.3295 13.517 17.1111 13.6629C16.6067 14 15.9045 14 14.5 14L10.4497 14C9.83775 14 9.53176 14 9.24786 14.0861C9.12249 14.1241 9.00117 14.1744 8.88563 14.2362C8.62399 14.376 8.40762 14.5924 7.97487 15.0251L5.74686 17.2531C5.47773 17.5223 5.34317 17.6568 5.2255 17.6452C5.17629 17.6404 5.12962 17.6211 5.0914 17.5897C5 17.5147 5 17.3244 5 16.9438L5 14.6C5 14.5071 5 14.4606 4.99384 14.4218C4.95996 14.2078 4.79216 14.04 4.57822 14.0062C4.53935 14 4.4929 14 4.4 14V14C4.0284 14 3.8426 14 3.68713 13.9754C2.83135 13.8398 2.16017 13.1687 2.02462 12.3129C2 12.1574 2 11.9716 2 11.6L2 5.5C2 4.09554 2 3.39331 2.33706 2.88886C2.48298 2.67048 2.67048 2.48298 2.88886 2.33706C3.39331 2 4.09554 2 5.5 2L14.5 2Z" />
                            </svg>
                            <span className="align-middle">5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xl="4" xxl="3">
                <h1>test</h1>
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
