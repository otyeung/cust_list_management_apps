import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';


interface IState {
    customers: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { customers: [] }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:5000/customers`).then(data => {
            this.setState({ customers: data.data })
        })
    }

    public deleteCustomer(id: number) {
        axios.delete(`http://localhost:5000/customers/${id}`).then(data => {
            const index = this.state.customers.findIndex(customer => customer.id === id);
            this.state.customers.splice(index, 1);
            this.props.history.push('/');
        })
    }

    public render() {
        const customers = this.state.customers;
        return (
            <div>

                <div className="text-center">
                    <h1>Customer List Management Apps</h1>
                    <p> Built by Taiger </p>
                </div>
                
                {customers.length === 0 && (
                    <div className="text-center">
                        <h2>No customer found at the moment</h2>
                    </div>
                )}

                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers && customers.map(customer =>
                                    <tr key={customer.id}>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.phone}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`edit/${customer.id}`} className="btn btn-sm btn-outline-secondary">Edit Customer </Link>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteCustomer(customer.id)}>Delete Customer</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}
