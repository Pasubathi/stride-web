import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { asset } from "../common/assets"; 
import { verifyOtp, sendOtp, salesForceLogin, clearAuthMessage } from "../actions/auth";
import { clearLocalStorage } from "../actions/user";

class VerifyOtp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: localStorage.getItem('mobile'),
      loading: false,
      timerOn: true,
      isSubmit: '',
      timer: '00:18',
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      viewResend: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount()
  {
    this.props.dispatch(clearLocalStorage());
    this.startTimer();
  }

  handleChange(value1, event) {
    this.setState({ [value1]: event.target.value });
    if(value1 === 'otp4')
    {
        this.handleSubmit(event.target.value);
    }
  }

  handleSubmit(value) {
    const { dispatch, history, verifivation_id, previousPath, mobile } = this.props;
    var pattern = new RegExp(/^[0-9\b]+$/);
    if(pattern.test(this.state.otp1) && pattern.test(this.state.otp3) && pattern.test(value) && pattern.test(this.state.otp2))
    {
        const givenOtp = parseInt(this.state.otp1+this.state.otp2+this.state.otp3+value);
        let data = { 
            otp: givenOtp,
            logId: parseInt(verifivation_id),
            mobile_no: mobile,
          }
        dispatch(verifyOtp(data))
        .then((response) => {
          if(response.status ==='success')
          {
            let getObj = response.data;
            const isNewUser = response.isNewUser?response.isNewUser:'';
            let parnerDet = getObj.account_partner__c?getObj.account_partner__c:null;
            const address = getObj.current_address_id__c?getObj.current_address_id__c:null;
            let obj = { id: this.props.user , token: this.props.token }
            dispatch(salesForceLogin(obj));
            if(previousPath)
            {
              dispatch(clearLocalStorage());
              history.push(previousPath);
            }else if(isNewUser)
            {
              history.push("/ed_custdetails");
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
              /* history.push("/edonebanklist"); */
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

  inputfocus = (elmnt, getvalue) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus()
      }
    }
    else {
      const pattern = /^[0-9]$/;
      if(pattern.test(elmnt.target.value))
      {
        const next = elmnt.target.tabIndex;
        if (next < 4) {
          elmnt.target.form.elements[next].focus()
        }
      }else{
        this.setState({[getvalue]: ''});
        document.getElementById(getvalue).value = '';
      }
    }

  }

  startTimer() {
    var presentTime = this.state.timer;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = this.checkSecond((timeArray[1] - 1));
    if(s==59){m=m-1}
    if(m === '00' && s === '00')
    {
      this.setState({viewResend: true});
    }
    if(m<0){
      return
    }
    this.setState({timer:  m + ":" + s});
    setTimeout(this.startTimer, 1000);
  }

  checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec};
    if (sec < 0) {sec = "59"};
    return sec;
  }

  handleClear = () =>{
    this.setState({otp1:'', otp2:'', otp3:'', otp4:''});
    this.props.dispatch(clearAuthMessage());
  }
  

  sendOtp = () =>{
    const { dispatch, pro_id, mobile } = this.props;
    let data = {
      log_id: parseInt(pro_id),
      mobile_no: mobile
    }
    dispatch(sendOtp(data))
    .then(() => {
       // window.location.reload();
    });
  }

  

  render() {
     const { isLoading, successMsg, errorMsg, isValid, history } = this.props;
    return (
          <>
          <Helmet>
              <title>Verify Otp</title>
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
                      <h4 onClick={ () => history.push('/home')} className="mtext-105 cl2 txt-left p-b-30 cursor-point">eduvanz.</h4>
                    </div>
                      <div className="login-img">
                        <img src={asset+"images/login-left2.png"} />
                      </div>
                    </div>
                  </div>
                  <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
                    <div className="loginform">
                      <div  className="cl2 txt-center p-b-30 form-title form-primary-card">
                        <h4 className="mtext-114">
                        <img src={asset+"images/icons/icon_Otp.svg"} /> We just texted you
                        </h4>
                      </div>
                      <form className="otpform" onSubmit={this.handleSubmit}>
                      <div className="row">
                          <div className="col-md-12">
                            <h3>Please enter the verification code we sent to +91-{this.state.mobile}.</h3>
                          </div>
                          
                      </div>
                      {successMsg !=='' && isValid ===1?(
                      <div className="row">
                          <div className="col-md-12">
                            <div className="alert alert-success" role="alert">
                              {successMsg}
                            </div>
                          </div>
                      </div>
                      ):''
                      }
                       
                      <div className="mr-btn-sty">
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
                              placeholder={0}
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
                              placeholder={0}
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
                              placeholder={0}
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
                              placeholder={0}
                              onKeyUp={e => this.inputfocus(e,"otp4")}
                            />
                            {this.state.isValid || isValid ===0?(
                              <img style={{marginLeft: '10px', cursor: 'pointer'}} onClick={this.handleClear}  className="img-error" src={asset+"images/error.png"} />
                          ):''}
                          </div>
                          
                        
                      {errorMsg !=='' && isValid ===0?(
                          <div className="col-md-12 text-center">
                            <div className="d-inline-block mt-2 alert alert-danger" role="alert">
                              Invalid verification code. Please try again!
                            </div>
                          </div>
                      ):''
                      }
                      </div>
                      </div>
                      
                      <div className="text-center valignimg pb-4">
                        <img src={asset+"images/icons/icon-ind.png"} /> Verification code valid for next
                        {' '+this.state.timer} min
                      </div>
                      {this.state.viewResend?(
                        <div className="col-md-12 text-center mr-btn-sty">
                           <span style={{cursor:'pointer', color:'#007bff', fontWeight: 600}} onClick={this.sendOtp}> Didn't get code?</span>
                        </div>   
                        ):''
                      }
                       
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
  const { mobile, isLoggedIn, onBording, token, pro_id, isLoading, verificationType, verifivation_id, successMsg, errorMsg, isValid, user, isNewUser, previousPath } = state.auth;
  const { product_id } = state.user
  const { message } = state.message;
  return {
    isLoggedIn,
    isLoading,
    product_id,
    pro_id,
    token,
    mobile,
    isNewUser,
    previousPath,
    verificationType,
    verifivation_id,
    successMsg,
    errorMsg,
    message,
    isValid,
    onBording,
    user
  };
}

export default connect(mapStateToProps)(VerifyOtp);
