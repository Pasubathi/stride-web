import React, { Component } from "react";
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { asset } from "../common/assets";
import { getAccountProfile, updateAccount } from "../actions/user";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import moment from 'moment';

const initial = {
  otp1:'',
  otp2:'',
  otp3:'',
  otp4:'',
  otp5:'',
  otp6:'',
  user: [],
  gender: '',
  error: '',
  startDate: null,
  successful: false,
  isDisabled: true,
  isLoading: false
}

class OtherDetails extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = initial;
  }

  componentDidMount()
  {
    const { user, sfid } = this.props;
    let data = {
      user_sfid: sfid
    }
    this.props.dispatch(getAccountProfile(data))
    .then((response) => {  
      if(response.status ==='success')
      {
        let obj = {
          gender: '',
          startDate: null,
        }
        let resdata = response.accountDet;
        const date = moment(resdata.date_of_birth_applicant__c);
        const pincode = resdata.approved_pin_code__c?resdata.approved_pin_code__c.toString():'';
        const gender = resdata.gender__c?resdata.gender__c.toLowerCase():'';
        if(pincode)
        {
          var digits = pincode.toString().split('');
          digits.forEach((item, index) => {
              this.setState({[`otp${index+1}`]: item});
          });
        }
        
        obj.gender = gender;
        if(date)
        {
          const user_dob = date.format('MMM-DD-YYYY');
          obj.startDate = user_dob;
        }
        this.setState(obj);
      }
    });
  }

  setStartDate = (date) =>{
    this.setState({ startDate: date});
  }

  handleChange = (e) => {
      this.setState(
        {[e.target.name]: e.target.value}
      );
  }

  handleGender = (value) =>{
      this.setState({ gender: value});
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
        if (next < 6) {
          elmnt.target.form.elements[next].focus()
        }
      }else{
        this.setState({[getvalue]: ''});
        document.getElementById(getvalue).value = '';
      }
    }

  }

  handleSubmit(e) {
    e.preventDefault();
    const { history, dispatch, user, sfid } = this.props; 
    this.setState({ isLoading: true});
    var dateString = this.state.startDate;
    // console.log(e.target.dob.value);
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if(age >= 21)
    {
      let data = {
        pin: (this.state.otp1+this.state.otp2+this.state.otp3+this.state.otp4+this.state.otp5+this.state.otp6),
        gender: this.state.gender.toUpperCase(),
        user_sfid: sfid,
        dob: this.state.startDate
      }
      dispatch(updateAccount(data)).then((response) => {  
         this.setState({ isLoading: false});
         const accountDet = response && response.accountDet?response.accountDet:null;
         const d2cData = response && response.d2cData?response.d2cData: null;
        if(accountDet.ipa_basic_bureau__c && accountDet.pan_verified__c)
        {
          history.push("/ed_limit");
        }if(accountDet.ipa_basic_bureau__c && !accountDet.pan_verified__c)
        {
          history.push("/edawaiting");
        }else if(!accountDet.ipa_basic_bureau__c && !accountDet.pan_verified__c)
        {
            history.push("/edreject");
        }else if(!accountDet.ipa_basic_bureau__c && accountDet.pan_verified__c)
        {
          history.push("/edonebanklist");
        }
      })
      .catch(() => {
        this.setState({ isLoading: false});
      });
    }else{
         this.setState({ isLoading: false});
        this.setState({error: 'Your age must over 21 or 21+'});
    }
    // console.log(age);
    
  }

  render() {
    const { userMessage, isSuccess, history } = this.props;
    return (
      <>
      <Helmet>
              <title>Eduvanz - Other Details</title>
              <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
      </Helmet>
      {this.state.isLoading?(
        <div className="loading">Loading&#8230;</div>
     ):''}
      <section className="bg0 login page_registration othersbg">
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
              <div className="loginform">
                <div className="cl2 txt-center p-b-30 form-title form-primary-card">
                <h4 className="mtext-114">
                  <img src={asset+"images/icons/icon_OtherDetails.svg"} /> Other Details
                </h4>
                </div>
                <form
                       onSubmit={this.handleSubmit}
                       className="otpform otpform-others"
                     >
                      <div className="row">
                          <div className="col-md-12">
                        <h3>Tell us a bit about yourself. We just need the basics.</h3>
                      </div></div>
                      <div className="row">
                        <div className="col-md-12 pt-3">
                          <h6>Pincode</h6>
                        </div>
                      </div>
                      <div className="pb-1">
                        <div className="row">
                          <div className="col-sm-12 flux-dir">
                            <input
                              className="otp mr-ri"
                              name="otp1"
                              id="otp1"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp1?this.state.otp1:''}
                              onKeyPress={this.keyPressed}
                              onChange={this.handleChange}
                              tabIndex="1" 
                              maxLength="1"
                              onKeyUp={e => this.inputfocus(e,"otp1")}
                            />
                            <input
                              className="otp bor8 mr-ri"
                              name="otp2"
                              id="otp2"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp2?this.state.otp2:''}
                              onKeyPress={this.keyPressed}
                              onChange={this.handleChange}
                              tabIndex="2" 
                              maxLength="1"
                              onKeyUp={e => this.inputfocus(e,"otp2")}
                            />
                            <input
                              className="otp bor8 mr-ri"
                              name="otp3"
                              id="otp3"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp3?this.state.otp3:''}
                              onKeyPress={this.keyPressed}
                              onChange={this.handleChange}
                              tabIndex="3" 
                              maxLength="1"
                              onKeyUp={e => this.inputfocus(e,"otp3")}
                            />
                            <input
                              className="otp mr-ri"
                              name="otp4"
                              id="otp4"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp4?this.state.otp4:''}
                              onKeyPress={this.keyPressed}
                              onChange={this.handleChange}
                              tabIndex="4" 
                              maxLength="1"
                              onKeyUp={e => this.inputfocus(e,"otp4")}
                            />
                            <input
                              className="otp mr-ri"
                              name="otp5"
                              id="otp5"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp5?this.state.otp5:''}
                              onKeyPress={this.keyPressed}
                              onChange={this.handleChange}
                              tabIndex="5" 
                              maxLength="1"
                              onKeyUp={e => this.inputfocus(e,"otp5")}
                            />
                            <input
                              className="otp mr-ri"
                              name="otp6"
                              id="otp6"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp6?this.state.otp6:''}
                              onKeyPress={this.keyPressed}
                              onChange={this.handleChange}
                              tabIndex="6" 
                              maxLength="1"
                              onKeyUp={e => this.inputfocus(e,"otp6")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="valignimg">
                         <img src={asset+"images/icons/icon-ind.png"} />  This should be your current address pincode.
                      </div>
                      <div className="row">
                        <div className="col-md-12 pt-3">
                          <h6>Date of Birth</h6>
                        </div>
                        <div className="col-md-12 pb-2">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              format="dd-MM-yyyy"
                              error={false}
                              helperText={null}
                              value={this.state.startDate?this.state.startDate:''}
                              name="dob"
                              onChange={this.setStartDate}
                            />
                            </MuiPickersUtilsProvider>
                        </div>
                      </div>
                      <div className="valignimg">
                         <img src={asset+"images/icons/icon-ind.png"} />  Must be 18+ years.
                      </div>
                      <div className="row">
                        <div className="col-md-12 pt-3">
                          <h6>Gender</h6>
                        </div>
                        <div className="col-md-12 ">
                          <button type="button" onClick={() => this.handleGender('male')} className={this.state.gender ==='male'?"active-gender":"primary-btn"}><img className="btn-img" src={asset+"images/gender.png"} />Male</button>
                          <button type="button" onClick={() => this.handleGender('female')} className={this.state.gender ==='female'?"active-gender":"primary-btn"} ><img className="btn-img" src={asset+"images/gender.png"} />Female</button>
                          <button type="button" onClick={() => this.handleGender('others')} className={this.state.gender ==='others'?"active-gender":"primary-btn"} ><img className="btn-img" src={asset+"images/gender.png"} />Other</button>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 pt-3 text-center">
                          <div className="error-txt">
                            {this.state.error}
                          </div>
                          {this.state.error !=='' &&(
                          <div className="col-md-12 text-center mr-btn-sty">
                            <Link to="/ed_limit">Continue with co-applicant </Link>
                          </div>
                          )}
                        </div>
                      </div>
                      <button 
                      type="submit"
                      disabled={this.state.otp1 !="" &&
                      this.state.otp2 !="" && this.state.otp3 !="" && this.state.otp4 !="" && this.state.otp5 !="" && this.state.otp6 !="" &&
                      this.state.startDate !="" && this.state.gender !="" ?false:true}
                      className={this.state.otp1 !="" &&
                      this.state.otp2 !="" && this.state.otp3 !="" && this.state.otp4 !="" && this.state.otp5 !="" && this.state.otp6 !="" &&
                      this.state.startDate !="" && this.state.gender !="" ?"flex-c-m stext-101 cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty valid-btn":"flex-c-m stext-101 cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty "}>
                        Continue
                      </button>
                      <div className="col-md-12 text-center mr-btn-sty">
                        <Link to="/success">Cancel</Link>
                      </div>
                  {userMessage && isSuccess ===0?(
                    <div className="form-group">
                      <div className={ "alert alert-danger" } role="alert">
                        {userMessage}
                      </div>
                    </div>
                  ):''}
                </form>
                
              </div>
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
      </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  const {isLoading, user, token, sfid } = state.auth;
  const { userData, userMessage, isSuccess } = state.user;
  return {
    message,
    isLoading,
    userData,
    userMessage,
    isSuccess,
    user,
    sfid,
    token
  };
}

export default connect(mapStateToProps)(OtherDetails);
