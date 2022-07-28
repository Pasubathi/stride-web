import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { asset } from "../common/assets";
import { verifyMpin, sendOtp, salesForceLogin, clearAuthMessage } from "../actions/auth";
import { clearLocalStorage } from "../actions/user";

class SigninMpin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: localStorage.getItem('mobile'),
      loading: false,
      timerOn: true,
      timer: '00:16',
      isValid: false,
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount()
  {
    this.props.dispatch(clearLocalStorage());
  }

  handleChange(value1, event) {
    this.setState({ [value1]: event.target.value });
    if(value1 === 'otp4')
    {
        this.handleSubmit(event.target.value);
    }

  }

  handleSubmit(value) {
    const { previousPath, dispatch, history, verifivation_id, pro_id } = this.props;
    var pattern = new RegExp(/^[0-9\b]+$/);
    if(pattern.test(this.state.otp1) && pattern.test(this.state.otp3) && pattern.test(value) && pattern.test(this.state.otp2))
    {
      const givenOtp = parseInt(this.state.otp1+this.state.otp2+this.state.otp3+value);
      let data = { 
          mpin: givenOtp,
          account_profile_id: parseInt(pro_id),
          logId: parseInt(verifivation_id)
        }
      dispatch(verifyMpin(data))
      .then((response) => {
        if(response.status === "success")
        {
          let getObj = response.data;
          let parnerDet = getObj.account_partner__c?getObj.account_partner__c:null;
          const address = getObj.current_address_id__c?getObj.current_address_id__c:null;
          console.log("address", address);
          let obj = { id: this.props.user , token: this.props.token }
          dispatch(salesForceLogin(obj));
            if(previousPath)
            {
              dispatch(clearLocalStorage());
              history.push(previousPath);
            }
            else if(getObj.account_status__c === "Full User")
            {
              history.push("/home");
            }else if(!getObj.email__c)
            {
              history.push("/ed_custdetails");
            }/* else if(getObj.pan_number__c && !getObj.pan_verified__c)
            {
              history.push("/ed_pan_update");
            } */
            else if(!getObj.pan_number__c)
            {
              history.push("/ed_pan_update");
            }else if(!getObj.is_qde_1_form_done__c)
            {
              history.push("/ed_qdform");
            }else if(parnerDet)
            {
              history.push("/ed_coapplicant_details");
            }else if(!getObj.ipa_basic_bureau__c && !getObj.pan_verified__c)
            {
              history.push("/edreject");
            }else if(!getObj.ipa_basic_bureau__c && getObj.pan_verified__c)
            {
              history.push("/edonebanklist");
            }else if(getObj.ipa_basic_bureau__c && !getObj.pan_verified__c)
            {
              history.push("/edawaiting");
            }/* else if(getObj.ipa_basic_bureau__c && getObj.pan_verified__c && !isLimitConfirmed)
            {
              history.push("/ed_limit");
            } */else if(!getObj.is_qde_2_form_done__c)
            {
              history.push("/ed_salary");
            }else if(!address)
            {
              history.push("/ed_address");
            }else if(!getObj.is_kyc_document_verified__c)
            {
              history.push("/ed_doc_profile");
            }else if(!getObj.is_bank_detail_verified__c)
            {
              history.push("/ed_bank_details");
            }else if(!getObj.is_nach_approved__c)
            {
              history.push("/ed_enach");
            }else 
            {
              history.push("/home");
            }
        }
      });
    }
  }

  forgotMpin = () =>{
    const { dispatch, history} = this.props;
    const mobile = localStorage.getItem('mobile');
    let data = {
      mobile_no: mobile,
      log_id: this.props.verifivation_id
    }
    dispatch(sendOtp(data))
    .then(() => {
         localStorage.setItem('next', 1);
         history.push("/check_otp");
    });
  }

  sendOtp = () =>{
    const { dispatch, history} = this.props;
    const mobile = localStorage.getItem('mobile');
    let data = {
      mobile_no: mobile,
      log_id: this.props.verifivation_id
    }
    dispatch(sendOtp(data))
    .then(() => {
         history.push("/edotp");
    });
  }

  inputfocus = (elmnt, getvalue) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus()
      }
    }
    else {
      console.log("next");     
      const pattern = /^[0-9]$/;
      if(pattern.test(elmnt.target.value))
      {
        const next = elmnt.target.tabIndex;
       // console.log('next', next);
        if (next < 4) {
          elmnt.target.form.elements[next].focus()
        }
      }else{
        this.setState({[getvalue]: ''});
        document.getElementById(getvalue).value = '';
      }
    }

  }

  handleClear = () =>{
    this.setState({otp1: '', otp2:'', otp3:'', otp4:''});
    this.props.dispatch(clearAuthMessage());
  }

  render() {
     const { mpinMsg,isLoading, errorMsg, isValid, history  } = this.props; 
     const vector = {
        position: 'absolute',
        width: '45.28px',
        height: '45.28px',
        background: '#04B983',
        borderRadius: '31px',
        right: '47%',
      }
    return (
          <>
          <Helmet>
              <title>Verify Mpin</title>
              <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
        </Helmet>
        {isLoading?(
              <div className="loading">Loading&#8230;</div>
            ):''}
          <section className="bg0 login">
              <div className="container-zero">
                <div className="flex-w flex-tr">
                  <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md primary-card">
                  <div className="d-flex flex-column">
                    <div className="textpart">
                    <h4 onClick={ () => history.push('/home')} className="cursor-point mtext-105 cl2 txt-left p-b-30">eduvanz.</h4>
                    </div>
                      <div className="login-img">
                        <img src={asset+"images/login-left2.png"} />
                      </div>
                    </div>
                  </div>
                  <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
                    <div className="loginform">
                        {this.state.loading === false?(
                    <>
                      <div  className="cl2 txt-center p-b-30 form-title form-primary-card">
                        <h4 className="mtext-114">
                        <img src={asset+"images/icons/icon_Mpin.png"} /> Sign in with mPIN
                        </h4>
                      </div>
                      <form className="otpform" onSubmit={this.handleSubmit}>
                      <div className="row">
                          <div className="col-md-12 ">
                            <h3>Please enter the mPIN you have created for +91-{this.state.mobile}.</h3>
                          </div>
                          
                        </div>
                        {mpinMsg !=='' && isValid ===1?(
                      <div className="row">
                          <div className="col-md-12">
                            <div className="alert alert-success" role="alert">
                              {mpinMsg}
                            </div>
                          </div>
                      </div>
                      ):''
                      }
                      
                      <div className="text-center mr-btn-sty">
                        <div className="row">
                          <div className={`col-sm-12 margin_5 ${errorMsg !=='' && isValid ===0 ? 'error' : ''}`}>
                            <input
                              className="otp"
                              name="otp1"
                              id="otp1"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp1}
                              onKeyPress={this.keyPressed}
                              onChange={e => this.handleChange("otp1", e)}
                              tabIndex="1" 
                              maxLength="1" 
                              // placeholder={0}
                              onKeyUp={e => this.inputfocus(e,"otp1")}
                            />
                            <input
                              className="otp"
                              name="otp2"
                              id="otp2"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp2}
                              onKeyPress={this.keyPressed}
                              onChange={e => this.handleChange("otp2", e)}
                              tabIndex="2" 
                              maxLength="1" 
                              // placeholder={0}
                              onKeyUp={e => this.inputfocus(e,"otp2")}
                            />
                            <input
                              className="otp"
                              name="otp3"
                              id="otp3"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp3}
                              onKeyPress={this.keyPressed}
                              onChange={e => this.handleChange("otp3", e)}
                              tabIndex="3" 
                              maxLength="1" 
                              // placeholder={0}
                              onKeyUp={e => this.inputfocus(e,"otp3")}
                            />
                            <input
                              className="otp"
                              name="otp4"
                              id="otp4"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp4}
                              onKeyPress={this.keyPressed}
                              onChange={e => this.handleChange("otp4", e)}
                              tabIndex="4" 
                              maxLength="1" 
                              // placeholder={0}
                              onKeyUp={e => this.inputfocus(e,"otp4")}
                            />
                             {this.state.isValid || isValid ===0?(
                              <img style={{marginLeft: '10px', cursor:'pointer'}} onClick={this.handleClear} src={asset+"images/error.png"} />
                          ):''}
                          </div>
                         
                        </div>
                      </div>
                      {errorMsg !=='' && isValid ===0?(
                      <div className="row">
                          <div className="col-md-12 text-center">
                            <div className="alert alert-danger" role="alert">
                              {errorMsg}
                            </div>
                          </div>
                      </div>
                      ):''
                      }
                      
                      <div className="row loginCustomied text-center no_right_border pt-5 pb-3">
                          <div className="col-md-6">
                            <p className="form-p-sty">
                             Forgot mPIN?<span style={{cursor:'pointer', color:'#007bff', fontWeight: 600}} onClick={this.forgotMpin} > Click Here</span>
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p className="form-p-sty">
                            <span style={{cursor:'pointer', color:'#007bff', fontWeight: 600}} onClick={this.sendOtp}> Sign in using OTP</span>
                          </p>
                        </div>
                      </div>
                      </form>
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
                      </>
                      ):(
                          <>
                          <div className="col-md-12 mr-t padd-0 text-center">
                                <span style={vector}><img src={asset+"images/success.png"} style={{marginTop: '11px'}} /></span>
                          </div>
                          <div className="col-md-12 mr-t padd-0 text-center" style={{marginTop: '58px'}}>
                            <p className="mr-t padd-0 balockfnt fntsizesub">
                                 Processing...
                            </p>
                          </div>
                          <div className="col-md-12 mr-t padd-0 text-center">
                            <p className="mr-t padd-0 balockfnt fntsizesub">
                              Please wait while we redirect you to the Personal Details page.
                            </p>
                          </div>
                        </>
                      )}
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
  const { previousPath, isLoggedIn, pro_id, isLoading, token, onBording, verifivation_id, successMsg, errorMsg, mpinMsg, user, isValid, isNewUser  } = state.auth;
  const { product_id } = state.user
  const { message } = state.message;
  return {
    previousPath,
    isLoggedIn,
    product_id,
    message,
    isLoading,
    token,
    verifivation_id,
    successMsg,
    errorMsg,
    mpinMsg,
    isValid,
    isNewUser,
    onBording,
    pro_id,
    user
  };
}

export default connect(mapStateToProps)(SigninMpin);
