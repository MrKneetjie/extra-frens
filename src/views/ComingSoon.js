
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import Countdown from 'react-countdown';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { MAILCHIMP } from 'constants.js';
import { useSelector } from 'react-redux';

const mailchimp = require("@mailchimp/mailchimp_marketing");

const simulateNetworkRequest = () => {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

const ComingSoon = () => {
  const [isLoading, setLoading] = useState(false);
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  console.log(isLogin, currentUser);

  const event = {
    name: "Extra Frens MailList"
  };
  
  const footerContactInfo = {
    company: "ExtraFrens",
    address1: "Extra",
    address2: "Frens",
    city: "Las Vegas",
    state: "NV",
    zip: "88901",
    country: "US"
  };
  
  const campaignDefaults = {
    from_name: "Extra Frens",
    from_email: "extrafrens@example.com",
    subject: "Extra Frens MailList",
    language: "EN_US"
  };

  const listId = "YOUR_LIST_ID";

  const subscribingUser = {
    firstName: "Prudence",
    lastName: "McVankab",
    email: "prudence.mcvankab@example.com"
  };

  useEffect(() => {
    if (isLoading) {
      mailchimp.setConfig({
        apiKey: MAILCHIMP.ApiKey,
        server: "US12",
      });

      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const title = 'Coming Soon';
  const description = 'ExtraFrens will be available soon!';

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const firstDate = new Date(2022, 7, 5);
  const secondDate = new Date();

  const diffDays = Math.round(Math.abs((firstDate - secondDate) / day));
  const diffHours = Math.round(Math.abs((firstDate - secondDate) / hour));
  const diffMinutes = Math.round(Math.abs((firstDate - secondDate) / minute));

  const date = diffDays * day + diffHours * hour + diffMinutes * minute;


  const submitEmail = async () => {
    console.log(await await mailchimp.ping.get())

    const response = await mailchimp.lists.createList({
      name: event.name,
      contact: footerContactInfo,
      permission_reminder: "permission_reminder",
      email_type_option: true,
      campaign_defaults: campaignDefaults,
    });

    console.log(
      `Successfully created an audience. The audience id is ${response.id}.`
    );

    // const response = await mailchimp.lists.addListMember(listId, {
    //   email_address: subscribingUser.email,
    //   status: "subscribed",
    //   merge_fields: {
    //     FNAME: subscribingUser.firstName,
    //     LNAME: subscribingUser.lastName
    //   }
    // });
  
    // console.log(
    //   `Successfully added contact as an audience member. The contact's id is ${
    //     response.id
    //   }.`
    // );
}

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <p>Completed</p>;
    }
    // Render a countdown
    return (
      <div id="timer">
        <Row className="g-2">
          <Col xs="3">
            <div className="display-5 text-primary mb-1">{days}</div>
            <div>Days</div>
          </Col>
          <Col xs="3">
            <div className="display-5 text-primary mb-1">{hours}</div>
            <div>Hours</div>
          </Col>
          <Col xs="3">
            <div className="display-5 text-primary mb-1">{minutes}</div>
            <div>Minutes</div>
          </Col>
          <Col xs="3">
            <div className="display-5 text-primary mb-1">{seconds}</div>
            <div>Seconds</div>
          </Col>
        </Row>
      </div>
    );
  };

  // rightSide
  const rightSide = (
    <div className="sw-lg-80 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border full-page-content-border">
      <div className="sw-lg-60 px-5">
        <div className="sh-11">
          <NavLink to="/">
            <h1>ExtraFrens</h1>
          </NavLink>
        </div>
        <div className="mb-3">
          <h2 className="cta-1 mb-0 text-primary">ExtraFrens will be available soon!</h2>
        </div>
        <div className="mb-5 sh-9">
          <Countdown date={new Date(2022, 7, 5)} intervalDelay={0} precision={3} renderer={renderer} />
        </div>
        <div className="mb-3">
          <p className="h6 lh-1-5">
            To receive our newsletter please complete the form below. We take your privacy seriously and we will not share your information with others.
          </p>
        </div>

        <div>
          <form>
            <div className="mb-3 filled">
              <CsLineIcons icon="email" />
              <input className="form-control" id="password" type="password" placeholder="Email" />
            </div>
            <Button className="btn-icon btn-icon-end" onClick={!isLoading ? submitEmail : null}>
              <span>Submit</span>
              <CsLineIcons icon="chevron-right" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

  // leftSide
  const leftSide = <></>;

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage right={rightSide} left={leftSide} />
    </>
  );
};

export default ComingSoon;
