import React, { Component } from "react";
import PropTypes from 'prop-types';
import { asset } from "../../common/assets";
import { reduxForm, propTypes } from 'redux-form';
import { Link } from 'react-router-dom';

class SelfEmployed extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      successful: false,
      isDisabled: true,
      mincome:'',
      cname:'',
      waddress:'',
    };
  }

  handleChange = (e) => {
      this.setState(
        {[e.target.name]: e.target.value}
      );
  }

  handleSubmit(e) {
    e.preventDefault();
    const { incomeUpdate, incomeSource, sub_source, user, sfid } = this.props; 
    let data = {
      user_sfid: sfid,
      amount: parseFloat(this.state.mincome),
      compant_name: this.state.cname,
      work_address: this.state.waddress,
      isProfessional: parseInt(sub_source),
      source: incomeSource
    }
    incomeUpdate(data);
  }

  redirPage = (url) =>{
    this.props.redirectPage(url);
  }

  render() {
    const { sub_source, userMessage, isSuccess } = this.props;
    const styles = {background: '#1F1F2D',borderRadius: '10px',color: '#ffffff'};
    return (
     <>
      <section className="kyc_pages">
        <div className="container-zero">
          <div className="flex-w flex-tr">
            <div className="kyc_leftbar">

     <h4 onClick={() => this.redirPage('/home')} className="cursor-point mtext-105 cl6">eduvanz.</h4>
     <div className="navigations">
      <ul className="breadcrumps">
          <li className="b_back"><Link to="/ed_salary">Back</Link></li>
          <li>KYC</li>
          <li>Basic Details</li>
      </ul>
     </div>
     <h1 className="titfnt">
     <span className="d-block">Basic</span> Details
     </h1>
     <ul className="left_tabs">
     <li className="bgmoney active"><h5>Income Source</h5><p>Make sure you're in a well lit room for capturing your picture</p></li>
     <li className="bghome"><h5>Current Residential</h5><p>Keep your Aadhaar card ready</p></li>
     </ul>
     </div>
            <div className="kyc_rightbar flex-col-m justify-content-center">
              <div className="form_width_1">
              <div className="tab_highlighter">
                  <span className="cl1"></span>
                  <span></span>
              </div>
              <div className="form_details">
                <h4 className="text-center">
                  Income source
                </h4>
                <h6>Self employed <img className="float-right" src={asset+"images/icons/btn_Salaried.png"} /><span>{sub_source==1?"Professional":"Non-professional"}</span></h6>
                
                <form  onSubmit={this.handleSubmit} className="otpform otpform-others fullwidth" >
                <div className="form_spacing mn_height_1 mt-4">
                <div className="form-group">
                <span className="has-float-label">
                  <input onChange={this.handleChange} className="rupeeprefix" id="mincome" name="mincome" type="text" placeholder=" "/>
                  <label htmlFor="mincome">Monthly Income</label>
                </span>
                </div>
                <div className="form-group">
                <span className="has-float-label">
                  <input onChange={this.handleChange} id="cname" name="cname" type="text" placeholder=" "/>
                   <label htmlFor="cname">Company Name</label>
                </span>
              </div>
              <div className="form-group">
                <span className="has-float-label">
                  <input onChange={this.handleChange} id="waddress" name="waddress" type="text" placeholder=" "/>
                   <label htmlFor="waddress">Work Address</label>
                </span>
              </div>
                </div>
                <div className="form_spacing">
                    <button 
                    type="submit"
                    disabled={this.state.cname !=='' && this.state.mincome !=='' && this.state.waddress !==''?false:true}
                    className={"flex-c-m stext-101 cl0 size-121 bor1 p-lr-15  mb-3"}
                    style={this.state.cname !=='' && this.state.mincome !=='' && this.state.waddress !==''?styles:{}}
                    >
                    Continue
                    </button>
                    {
                       userMessage !='' && isSuccess ==0?(
                          <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            {userMessage}
                          </div>
                        </div>
                        ):''
                      }
                      {
                       userMessage !='' && isSuccess ==1?(
                          <div className="form-group">
                          <div className="alert alert-success" role="alert">
                            {userMessage}
                          </div>
                        </div>
                        ):''
                      }
                    <p className="text-center">
                  <Link to="/ed_salary" className="blue_link">Not Self employed?</Link>
                </p>
                </div>
                </form>
                </div>
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

SelfEmployed.propTypes = {
  ...propTypes,
  incomeUpdate: PropTypes.func.isRequired,
  incomeSource: PropTypes.string.isRequired,
  sub_source: PropTypes.any.isRequired,
  redirectPage: PropTypes.func.isRequired,
  user: PropTypes.number.isRequired,
  sfid: PropTypes.string.isRequired,
  userMessage: PropTypes.string,
  isSuccess: PropTypes.number
}

export default reduxForm({form: 'self'})(SelfEmployed);
