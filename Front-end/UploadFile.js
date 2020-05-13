import React, { Component } from 'react';
import FileService from "../../../services/FileService";
import {Form, Button} from "react-bootstrap";
import { faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(event) {
        this.setState({selectedFile:event.target.files[0]
        });

    }

    async onFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        try {
            FileService.upload(formData)
                .then(response => {
                    console.log(response.data);
                    alert("File uploaded successfully.")
                    this.setState(this.state.selectedFile)
                })
        }
        catch(err) {
            if (err.response.status === 500) {
                alert('There was a problem with the server');
            } else {
                alert(err.response.data.msg);
            }
        }
    }
    render(){
        return(
            <div className="col-md-6">
                <Form onSubmit={this.onFormSubmit}>
                    <div className="mb-3">

                        <Form.File

                            type="file"
                            className="form-control"
                            name="file"
                            onChange={this.onChange}
                        /><br />
                        <Button variant="warning" onClick={this.onFormSubmit}>
                            <FontAwesomeIcon icon={faUpload} /> Upload
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}
export default UploadFile;
