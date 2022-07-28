import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import Helmet from "react-helmet";
import { GoogleLogin  } from 'react-google-login';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { connect } from "react-redux";
import { updateProfile } from "../actions/auth";
import { getAccountProfile, updateBre1 } from "../actions/user";
import { asset } from "../common/assets";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 1 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: "",
      fname: "",
      lname: "",
      email: "",
      password: "",
      id:"0",
      googleData:{},
      successful: false,
      isDisabled: true,
    };
  }

  componentDidMount()
  {
    //const { dispatch, user } = this.props;
  }

  componentDidUpdate(prevProps)
  {
    if(prevProps.userData != this.props.userData)
    {
      let user = this.props.userData
      this.setState({
        fname: user.first_name,
        lname: user.last_name,
        email: user.email
      });
    }
  }

  handleChange = (e) => {
      e.persist();
      this.setState(
        {[e.target.name]: e.target.value}
      );
  }

  async handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });
    const { history, user, token, sfid } = this.props;
    if (this.checkBtn.context._errors.length === 0) {
      let mobileNo = localStorage.getItem('mobile');

      let data = {
        first_name: this.state.fname,
        last_name: this.state.lname,
        user_sfid: sfid,
        google_id: this.state.id,
        token: token,
        email: this.state.email,
        mobile: mobileNo
      }
      this.props.dispatch(
          updateProfile(data)
        )
        .then(async (response) => {
          if(response.status === "success")
          {
            let getdata = response.data;
            const isUpdated = response && response.isUpdated !==undefined? response.isUpdated:false;
            const isBre1Called = response && response.isBre1Called !==undefined? response.isBre1Called:false;
            const isPanStatusCalled = response && response.isPanStatusCalled !==undefined? response.isPanStatusCalled:false;
            const isPanProfileCalled = response && response.isPanProfileCalled !==undefined? response.isPanProfileCalled:false;
            const limit = getdata && getdata.IPA_Basic_Bureau__c !==undefined && getdata.IPA_Basic_Bureau__c?getdata.IPA_Basic_Bureau__c:null;
            const qd1   = getdata && getdata.Is_QDE_1_form_done__c !==undefined && getdata.Is_QDE_1_form_done__c?getdata.Is_QDE_1_form_done__c:null;
            const pan   = getdata && getdata.PAN_Verified__c !==undefined && getdata.PAN_Verified__c?getdata.PAN_Verified__c:null;
            let data = { user_sfid: sfid}
            getdata.user_sfid = sfid;
            getdata.isBre1Called = isBre1Called;
            getdata.isPanStatusCalled = isPanStatusCalled;
            getdata.isPanProfileCalled = isPanProfileCalled;
            if(!isUpdated)
            {
              await this.props.dispatch(updateBre1(getdata));
            }
            this.props.dispatch(getAccountProfile(data));
            if(!pan){
              history.push("/ed_pan_update");
            }else if(!qd1){
              history.push("/ed_qdform");
            }else if(!limit){
              history.push("/edonebanklist");
            }else
            {
              history.push("/ed_limit");
            }
          }
        });
    }
  }

  responseGoogle = (response) => {
    console.log(response.profileObj);
    if(typeof response.profileObj !== 'undefined')
    {
        let givenData = response.profileObj;
        this.setState({
          googleData : givenData,
          id:givenData.googleId,
          fname: givenData.name,
          lname: givenData.givenName,
          email: givenData.email
        });
    }
}

  render() {
    const { message, isLoading, errorMsg, isValid, user, history, sfid } = this.props;
    const btnStyle = {
      background: '#1F1F2D',
      borderRadius: '10px',
      color: '#ffffff'
    }
    if(!sfid){
      return <Redirect to="/login" />
    }

    return (
      <>
       <Helmet>
              <title> Personal Details </title>
              <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
       </Helmet>
       {isLoading?(
       <div className="loading">Loading&#8230;</div>
      ):''}
      <section className="bg0 login page_registration">
              <div className="container-zero">
                <div className="flex-w flex-tr">
                  <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md  primary-card">
                    <div className="d-flex flex-column">
                    <div className="textpart">
                    <h4 onClick={ () => history.push('/home')} className="cursor-point mtext-105 cl2 txt-center p-b-30">eduvanz.</h4>
                      <h1 className="titfnt">
                        Get all your dream brands at one place.
                      </h1>
                    </div>
                      <div className="login-img">
                        <img src={asset+"images/login-left2.png"} />
                       </div>
                    </div>
                  </div>
            <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
              <div className="loginform personal_details">
                <div  className="cl2 txt-center p-b-30 form-title form-primary-card">
                <h4 className="mtext-114">
                  <img src={asset+"images/icons/icon_Comment.svg"} /> Personal Details
                </h4>
                </div>
                <Form ref={(c) => {
                        this.form = c;
                      }}
                       onSubmit={this.handleRegister}
                >
                      <div className="row">
                          <div className="col-md-12">
                        <h3><span className="d-block">Tell us a bit about yourself.</span> We just need the basics.</h3>
                      </div>
                      </div>
                  {!this.state.successful && (
                <>
                  <div className="bor8 m-b-5 how-pos4-parent">
                    <Input
                      className="stext-111 cl2 plh3 size-116"
                      type="text"
                      name="fname"
                      placeholder="First Name"
                      validations={[required, vusername]}
                      onChange={this.handleChange}
                      value={this.state.fname?this.state.fname:''}
                    />
                  </div>
                  <div className="bor8 m-b-5 how-pos4-parent">
                    <Input
                      className="stext-111 cl2 plh3 size-116"
                      type="text"
                      name="lname"
                      placeholder="Last Name"
                      validations={[required, vusername]}
                      onChange={this.handleChange}
                      value={this.state.lname?this.state.lname:''}
                    />
                  </div>
                  <div className="bor8 m-b-5 how-pos4-parent">
                    <Input
                      className="stext-111 cl2 plh3 size-116"
                      type="email"
                      name="email"
                      placeholder="Email ID"
                      validations={[required, email]}
                      onChange={this.handleChange}
                      value={this.state.email?this.state.email:''}
                    />
                  </div>
                 
                  <button type="submit" disabled={this.state.fname !=='' && this.state.lname !=='' && this.state.email !==''?false:true} className={"flex-c-m stext-101 cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty"} style={this.state.fname !=='' && this.state.lname!=='' && this.state.email !=='' ?btnStyle:{}}>
                    Continue 
                  </button>
                  {message || (errorMsg !=='' && isValid ===0)?(
                      <div className="row">
                          <div className="col-md-12">
                            <div className="alert alert-danger" role="alert">
                              {message?message:errorMsg?errorMsg:''}
                            </div>
                          </div>
                      </div>
                      ):''
                      }
                    <div className="row" style={{justifyContent: 'center'}}>
                        <p className="text-center mb-0">OR</p>
                    </div>
                    <GoogleLogin
                        clientId="25625761608-g8iccn0kbrpa3mtos40cfk5dc1k8mqke.apps.googleusercontent.com"
                        buttonText="Connect with"
                        render={renderProps => (
                          <button className="flex-c-m cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty btn-normal imgvalign" onClick={renderProps.onClick} disabled={renderProps.disabled}>Connect with <img src={asset+"images/google-logo.ico"} width="26" height="26" /></button>
                        )}
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        style={{width: '100% !important', textAlign: 'center !important', justifyContent: 'center !important'}}
                    />
                  </>
                 )}
                  <CheckButton
                    style={{ display: "none" }}
                    ref={(c) => {
                      this.checkBtn = c;
                    }}
                  />
                
                </Form>
                <div className="pos_abs">
                        <ul className="text_icons">
                          <li><Link to="" className="getappsty">
                            Get our App <img src={asset+"images/icons/app-icon.png"} />
                          </Link>
                          </li>
                          <li>
                          <Link to="" className="getappsty">
                            Help <img src={asset+"images/icons/qustionmark.png"} />
                          </Link>
                       </li>
                      </ul>                      
                    </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  const { onBording, isLoading, successMsg, errorMsg, isValid, user, token, userData, sfid} = state.auth;
  return {
    userData,
    message,
    isLoading,
    onBording,
    successMsg,
    errorMsg,
    isValid,
    sfid,
    user,
    token
  };
}

export default connect(mapStateToProps)(PersonalDetails);
