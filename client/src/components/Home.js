import React, { Fragment } from 'react';
import axios from 'axios';
import AddCustomer from './AddCustomer';
import Customers from './Customers';
import ReactDOM from 'react-dom';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            name: '',
            city: '',
            dob: '',
            mobile: '',
            showPopup: false,
            id: ''
        }
    }

    componentDidMount() {
        this.getTableData();
    }

    handleClose = () => {
        this.setState({ showPopup: false });
    };
    handleShow = () => {
        this.setState({ showPopup: true });
    };

    getTableData = () => {
        axios.get(`http://localhost:5000/customers`)
            .then(res => {
                console.log(res);
                const customers = res.data;

                this.setState({ customers });
            })
    }

    onChange = e => this.setState({ ...this.state, [e.target.name]: e.target.value });

    handleDelete = (customerId) => {
        // var customerId = e.target.getAttribute('data-id');
        let self = this;
        var r = window.confirm("Are You Sure You Want To Delete Customer Details?");
        if (r == true) {
            console.log('customer Id', customerId);
            axios.post(`http://localhost:5000/delete`, {
                customerId
            })
                .then(function (response) {
                    console.log(response);
                    self.getTableData();
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            return
        }


    }

    handleEdit = (item) => {
        const {
            id,
            name,
            city,
            mobile
        } = item;
        const dob = item.dob.substring(0, 10);
        let self = this;
        console.log('all items', item);
        this.setState({
            id,
            name,
            city,
            dob,
            mobile,
            showPopup: true
        });
    }

    render() {
        const { id, customers, name, city, mobile, dob, showPopup } = this.state;
        return (
            <Fragment>
                <AddCustomer
                    id={id}
                    name={name}
                    city={city}
                    mobile={mobile}
                    dob={dob}
                    onChange={this.onChange}
                    handleClose={this.handleClose}
                    handleShow={this.handleShow}
                    showPopup={showPopup}
                />
                <Customers customers={customers} handleDelete={this.handleDelete} handleEdit={this.handleEdit} />
            </Fragment>
        )
    }
}

export default Home;