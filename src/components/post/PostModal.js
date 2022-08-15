import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const PostModal = ({ show, setShow }) => {
  return (
    <Modal id="postModal" className="modal-under-nav modal-search modal-close-out" size="xl" show={show} onHide={() => setShow(false)}>
      <Modal.Header>
        <Modal.Title as="h5">Post new content!</Modal.Title>
        <button type="button" className="btn-close" onClick={setShow} />
      </Modal.Header>
      <Modal.Body className="ps-5 pe-5 pb-0 border-0">
        <h4>Test Body</h4>
      </Modal.Body>
      <Modal.Footer className="border-top justify-content-start ps-5 pe-5 pb-3 pt-3 border-0">
        <Button variant="secondary" onClick={setShow}>
          <CsLineIcons name="close" />
          <span className="ml-2">Cancel</span>
        </Button>
        <Button variant="primary">
          <CsLineIcons name="check" />
          <span className="ml-2">Post</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostModal;
