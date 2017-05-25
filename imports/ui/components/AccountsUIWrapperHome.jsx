import React, {Component} from 'react';
import Modal from 'react-modal';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import Dropbox from 'dropbox';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-20%',
        transform: 'translate(-50%, -50%)',
        background: 'rgb(0, 0, 0)',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '30px',
        color: '#e5e5e5',
        width: '30%'
    }
};


export default class AccountsUIWrapperHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            name: '',
            lastname: '',
            CV: '',
            CVLink: '',
            email: '',
            password: '',
            cpassword: '',

        };

        this.up = false;
    }

    registerUser() {
        if (this.state.password === this.state.cpassword) {
            // this.uploadFile();
            // if(this.up) {
            Accounts.createUser({
                username: this.state.email,
                password: this.state.password,
                profile: {
                    name: this.state.name,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    CV: this.state.CVLink
                }
            });
            //     this.up = false;
            // }
            // var fileInput = document.getElementById('file-upload');
            // Meteor.call('jobs.update',fileInput);
            this.closeModal();
        }
        else {
            console.log("T P A N T S");
            alert("The passwords are not the same");
        }
    }

    uploadFile() {
        console.log("ENTRO");
        var file = document.getElementById("file-upload").files[0];
        console.log(file);
        //
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('200 OK');
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
        xhr.setRequestHeader('Authorization', 'Bearer ' + process.env.DROPBOX_ACCESS_TOKEN);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.setRequestHeader('Dropbox-API-Arg', '{"path":"/CV}" )');

        xhr.send(file);
        // $.ajax({
        //     url: 'https://content.dropboxapi.com/2/files/upload',
        //     type: 'post',
        //     data: file.da,
        //     processData: false,
        //     contentType: 'application/octet-stream',
        //     headers: {
        //         "Authorization": "Bearer"+ process.env.DROPBOX_ACCESS_TOKEN,
        //         "Dropbox-API-Arg": '{"path": "/test_upload.txt","mode": "add","autorename": true,"mute": false}'
        //     },
        //     success: function (file) {
        //         console.log(file);
        //     }
        // })
        this.up = true;

    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        // Just render a placeholder container that will be filled in
        return (
            <div>
                <h2 onClick={this.openModal.bind(this)}> Register</h2>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal.bind(this)}
                           contentLabel="Register"
                           shouldCloseOnOverlayClick={true} style={customStyles}>
                        <form onSubmit={this.registerUser.bind(this)}>
                            <div className="text-center">
                                <h3>Register</h3>
                            </div>
                            <h5> First Name </h5>
                            <div>
                                <input id="sinput" type="text" value={this.state.name} placeholder="Name" required
                                       onChange={(event) => {
                                           this.setState({name: event.target.value})
                                       }}/>
                            </div>
                            <h5> Last Name </h5>
                            <div>
                                <input id="sinput" type="text" value={this.state.lastname} placeholder="Lastname"
                                       required onChange={(event) => {
                                    this.setState({lastname: event.target.value})
                                }}/>
                            </div>
                            <h5> Email </h5>
                            <div>
                                <input id="sinput" type="email" value={this.state.email} placeholder="Email" required
                                       onChange={(event) => {
                                           this.setState({email: event.target.value})
                                       }}/>
                            </div>
                            <h5> Password </h5>
                            <div>
                                <input id="sinput" type="password" value={this.state.password} placeholder="Password"
                                       required onChange={(event) => {
                                    this.setState({password: event.target.value})
                                }}/>
                            </div>
                            <h5> Confirm Password </h5>
                            <div>
                                <input id="sinput" type="password" value={this.state.cpassword}
                                       placeholder="Confirm Password"
                                       required onChange={(event) => {
                                    this.setState({cpassword: event.target.value})
                                }}/>
                            </div>
                            <h5> Curriculum </h5>
                            <div>

                                <input id="file-upload" type="file" value={this.state.CV} placeholder="Select your CV"
                                       required onChange={(event) => {
                                    this.setState({CV: event.target.value})
                                }}/>
                            </div>

                            <div className="row" id="registerButtons">
                                <div className="col-md-6 text-center">
                                    <button type="button submit" className="btn btn-lg btn-primary"
                                            onClick={this.closeModal.bind(this)}>Close
                                    </button>
                                </div>
                                <div className="col-md-6 text-center">
                                    <button type="submit" className="btn btn-lg btn-primary">Add
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Modal>
                    <div className="col-md-3"></div>
                </div>
            </div>
        )
    }
}
