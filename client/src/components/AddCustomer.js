import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const AddCustomer = (props) => {

    // const [show, setShow] = useState(false);
    // const [formData, setFormData] = useState({
    //     name: '',
    //     city: '',
    //     dob: '',
    //     mobile: '',
    // });

    const {
        id,
        name,
        city,
        dob,
        mobile,
        onChange,
        showPopup,
        handleClose,
        handleShow
    } = props;


    // const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSave = (e) => {
        console.log('id', id);
        console.log('city', city);
        console.log('dob', dob);
        console.log('mobile', mobile);
        if (id) {
            axios.post(`http://localhost:5000/update`, {
                id,
                name,
                city,
                dob,
                mobile
            })
                .then(function (response) {
                    console.log(response);
                    handleClose();
                    window.location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                });

        } else {
            axios.post(`http://localhost:5000/add`, {
                name,
                city,
                dob,
                mobile
            })
                .then(function (response) {
                    console.log(response);
                    handleClose();
                    window.location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                });

        }

    }
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
        <>
            <div className="home">
                <Button variant="primary" onClick={handleShow}>
                    Add Customer
                </Button>

                <Modal show={showPopup} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Customer Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input className="form-control" type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} />
                        <input className="form-control" type="text" placeholder="City" name="city" value={city} onChange={e => onChange(e)} />
                        <input className="form-control" type="text" placeholder="DOB (YYYY-MM-DD)" name="dob" value={dob} onChange={e => onChange(e)} />
                        <input className="form-control" type="text" placeholder="Mobile" name="mobile" value={mobile} onChange={e => onChange(e)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>


        </>
    );
}

export default AddCustomer;