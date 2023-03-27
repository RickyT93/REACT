// import React from "react";
// import Modal from "react-bootstrap/Modal";

// function JobModal(props) {
//   return (
//     <div
//       className="modal show"
//       style={{ display: "block", position: "initial" }}
//     >
//       <Modal.Dialog isOpen={props.isOpen}>
//         <Modal.Header closeButton onClick={props.onClick}>
//           <Modal.Title>Job Information</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <h5>Pay</h5>
//           {props.job.pay}
//           <h5>Title</h5>
//           {props.job.title}
//           <h5>Summary</h5>
//           {props.job.summary}
//           <h5>Status</h5>
//           {props.job.statusId}
//         </Modal.Body>

//         <Modal.Footer>
//           <button
//             type="button"
//             className="btn btn-secondary"
//             data-bs-dismiss="modal"
//             onClick={props.onClick}
//           >
//             Close
//           </button>
//         </Modal.Footer>
//       </Modal.Dialog>
//     </div>
//   );
// }
// export default JobModal;
import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
function JobsModal(props) {
  const aJobCard = props.job;
  // const closeModal = props.closeCardModal
  console.log(aJobCard);

  const handleClose = (e) => {
    e.preventDefault();
    console.log(e);
    props.updateShow(false);
  };

  return (
    <React.Fragment>
      <Modal isOpen={props.show} toggle={handleClose}>
        <ModalHeader toggle={handleClose}>{aJobCard.title}</ModalHeader>
        <ModalBody>{aJobCard.description}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleClose}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
export default JobsModal;
