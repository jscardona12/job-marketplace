import React, {Component} from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    openProfileModal(){
        return;
    }


    render() {
        return (
            <div >
                <nav id ="navbar" className="navbar navbar-light navbar-fixed-top" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse"
                                    data-target=".navbar-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>

                            <a href="/" id="navbar-brand" className="navbar-brand">
                                <img
                                    className="logo"
                                    src="../images/logo1.png"
                                    alt="logo"/>
                            </a>
                        </div>
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li><AccountsUIWrapper/></li>
                                <li><a id="navbar-list" href="/findJob">Find Job</a></li>
                                <li><a id="navbar-list" href="/publishJobs">Publish Jobs</a></li>
                                <li><a id="navbar-list" onClick={this.openProfileModal.bind(this)} href="#">Profile</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <br/>
                <br/>
                <br/>
                <br/>
                <div>
                    <div>
                        {this.props.main}
                    </div>
                </ div >
            </ div >
        )
    };
}
export default App;
