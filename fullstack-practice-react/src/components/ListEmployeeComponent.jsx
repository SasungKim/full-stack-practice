import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }
    componentDidMount(){
        EmployeeService.getEmployees().then((res)=>{
            this.setState({employees: res.data});
        })
    }

    
    addEmployee(){
        //render to /add-employee
        this.props.navigate("/add-employee")
    }

    editEmployee(id){
        this.props.navigate(`/add-employee/${id}`)
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then((res)=>{
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        })
    }

    viewEmployee(id){
        this.props.navigate(`/view-employee/${id}`)
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
                <br/>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee => 
                                    <tr key = {employee.id}>
                                        <td> {employee.firstName} </td>
                                        <td> {employee.lastName} </td>
                                        <td> {employee.emailId} </td>
                                        <td>
                                            <button onClick={() => this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                            <button onClick={() => this.deleteEmployee(employee.id)} style={{marginLeft:"10px"}} className="btn btn-danger">Delete</button>
                                            <button onClick={() => this.viewEmployee(employee.id)} style={{marginLeft:"10px"}} className="btn btn-secondary">View</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default function(props){
    const navigate = useNavigate();
    return <ListEmployeeComponent {...props} navigate = {navigate}/>
}