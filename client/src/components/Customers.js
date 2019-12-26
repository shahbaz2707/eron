import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

class Customers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
        }
    }

    componentDidMount(){
       this.getTableData();
    }

    getTableData = () => {
        axios.get(`http://localhost:5000/customers`)
        .then(res => {
            console.log(res);
          const customers = res.data;
        
          this.setState({ customers });
        })
    }

    handleDelete = (customerId) => {
        // var customerId = e.target.getAttribute('data-id');
        let self = this;
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

    }

  render() {
    const {customers} = this.state;
    return (
      <table className="table table-striped">
          <thead>
              <th>Id</th>
              <th>Name</th>
              <th>City</th>
              <th>DOB</th>
              <th>Mobile</th>
              <th>Actions</th>
            </thead>
            <tbody>
                {customers && customers.map((item)=>{
                    return(<tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.city}</td>
                        <td>{item.dob}</td>
                        <td>{item.mobile}</td>
                        <td><button type="button" data-id={item.id} onClick={e => this.handleDelete(item.id)}><span className="fa fa-trash"></span></button></td>
                    </tr>)
                })}
            </tbody>
        </table>
    )
}
}

export default Customers;