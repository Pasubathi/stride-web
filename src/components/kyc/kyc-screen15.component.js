import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import 'react-image-crop/dist/ReactCrop.css'
import { isEmail } from "validator";
import { asset } from "../../common/assets";
import { submitCoApplicant } from "../../actions/user";

class KycScreen15 extends Component {

  constructor(props) {
      super(props)
      this.state = {
        isValidPan: true,
        isValidemail: true,
        fname: null,
        lname: null,
        mobile: null,
        email: null,
        pan: null,
        relation: null,
        isValid: null,
        errorMsg: null,
        isSubmit: true,
        submitMsg: ''
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleMobile = this.handleMobile.bind(this)
  }

  componentDidMount(){
    const { user, history, sfid } = this.props;
    if(!sfid)
    {
      history.push("/login");
    }

    $('.select-style select').change(function(){
        
        var $this = $(this);
        console.log($this);
        if($this.val())
            $this.addClass('filled')
        else
            $this.removeClass('filled')
    })

    $('.label input').change(function(){
        var $this = $(this);
        if($this.val())
            $this.addClass('filled')
        else
            $this.removeClass('filled')
        })
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    
  validateEmail = (email) =>{
    let response = true;
    if (!isEmail(email)) {
      this.setState({isValidemail: false});
      response = false;
    }else{
      this.setState({isValidemail: true});
      response = true;
    }
    return response;
  }

  validatePan = (pan) =>{
    var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    let response = true;
    if(!regex.test(pan))
    {
      this.setState({isValidPan: false});
      response = false;
    }else{
      this.setState({isValidPan: true});
      response = true;
    }
    return response;
  }

    handleMobile = (e) => {
        const reg = /^[0]?[6789]\d{9}$/;
        var pattern = new RegExp(/^[0-9\b]+$/);
        if(e.target.value !=='')
        {
          if (!pattern.test(e.target.value)) {
            this.setState({isValid : false, errorMsg : "Please enter only number.", mobile : ""});
          }else if(e.target.value.length === 10)
          {
            if(reg.test(e.target.value))
            {
             this.setState({isValid  : true, errorMsg : "", mobile : e.target.value});
            }else{
              this.setState({isValid : false, errorMsg : "Please enter valid mobile number.", mobile : e.target.value});
            }
          }else{
            this.setState({isValid  : true, errorMsg : "", mobile : e.target.value});
          }
        }else{
          this.setState({isValid  : false, errorMsg : "", mobile : e.target.value});
        }
    }

    handleClearEmail = () =>{
        this.setState({ email: null, isValidemail: true});
    }

    handleClearPan = () =>{
        this.setState({ pan: null, isValidPan: true});
    }

    handleSubmit = () =>{
        const { history, dispatch, sfid } = this.props
        const { fname, lname, mobile, email, pan, relation, isValid } = this.state
        let isValidEmail = this.validateEmail(email)
        let isValidPan = this.validatePan(pan)
        if(isValidEmail && isValidPan)
        {
            let data = {
                mobileNumber: mobile, 
                first_name: fname,
                last_name: lname,
                email: email,
                pan: pan,
                sfid: sfid,
                relation: relation
            }

            dispatch(submitCoApplicant(data)).then((response)=>{
                if(response.status ==="success")
                {
                    this.setState({isSubmit: true, submitMsg: 'Submitted SuccessFully'});
                    setTimeout(() => {
                        history.push("/ed_coapplicant_details")
                      }, 5000);
                }else{
                    this.setState({isSubmit: false, submitMsg: response.message})
                }
            });
        }
    }





    render() {
       
        const { isLoading } = this.props;
        const { isValidemail, isValidPan, fname, lname, mobile, email, pan, relation, isValid, errorMsg } = this.state
        return (
            <>
            <Helmet>
            <title> Co Applicant Form </title>
            <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            {isLoading?(
              <div className="loading">Loading&#8230;</div>
             ):''}
            <section className="kyc_pages">
               
            
                    <div className="flex-w flex-tr">
                        <div className="kyc_leftbar bg-1">
                            <h4 onClick={() => this.props.history.push("/home")} className="mtext-105 cl6 cursor-point">eduvanz.</h4>
                            <div className="navigations">
                                <ul className="breadcrumps">
                                    <li className="b_back"><Link to="/ed_limit">Back</Link></li>
                                </ul>
                            </div>
                    
                            <ul className="kyc_timeline">
                                <li className="complete">Registration</li>
                                <li className="complete">Limit Approval</li>
                                <li className="complete">Identity Verifcation</li>
                                <li className="complete">
                                    <div className='white_box'>
                                        <h5>Add co-borrower</h5>
                                        <p>Co-borrower downloads App and starts transacting on your behalf</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="kyc_rightbar bg-none d-flex justify-content-center pt-lg-5 mt-4">

                            <div className='col-sm-6 mb-5'>
                                <div className='form_details mb-5'>
                                    <h4 className='bg-3 text-center imgaligned'>Co-borrowers details</h4>
                                    <div className='px-lg-5 px-3 pt-5 c_b_d_f pb-4'>
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <div className='label'>
                                                <input type="text" placeholder='' onChange={this.handleChange} name="fname" value={fname?fname:''}/>
                                                <span>First Name</span>
                                               {/*  <p className='error-msg_ m-0'>Error msg</p>
                                                <button className='error-close'>
                                                <img src={asset+"images/icons/red-close.png" alt="close" className='img-fluid'/>
                                                </button> */}
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className='label'>
                                                <input type="text" placeholder='' name="lname" onChange={this.handleChange} value={lname?lname:''}/>
                                                <span>Last Name</span>
                                               {/*  <p className='error-msg_ m-0'>Error msg</p>
                                                <button className='error-close'>
                                                <img src={asset+"images/icons/red-close.png" alt="close" className='img-fluid'/>
                                                </button> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <div className='select-style'>
                                            <select onChange={this.handleChange} name="relation" value={relation?relation:''}>
                                                <option value={""}>&nbsp;</option>
                                                <option value={"Mother"}>Mother</option>
                                                <option value={"Father"}>Father</option>
                                                <option value={"Brother"}>Brother</option>
                                                <option value={"Sister"}>Sister</option>
                                            </select>
                                            <span>Relation with co-borrower</span>
                                        </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <div className='label'>
                                                <input type="text" placeholder='' maxLength={10} name="mobile" onChange={this.handleMobile} value={mobile?mobile:''}/>
                                                <span>Mobile Number</span>
                                               {isValid ===false && errorMsg !=='' && ( 
                                                <>
                                               <p className='error-msg_ m-0'>Please enter valid mobile number</p>
                                                <button className='error-close'>
                                                <img src={asset+"images/icons/red-close.png"} alt="close" className='img-fluid'/>
                                                </button>
                                                </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <div className='label'>
                                                <input type="text" placeholder='' onChange={this.handleChange}  name="email" value={email?email:''} />
                                                <span>Email ID</span>
                                               {isValidemail ===false && ( 
                                                <>
                                                    <p className='error-msg_ m-0'>Please enter valid email ID</p>
                                                    <button onClick={this.handleClearEmail} className='error-close'>
                                                    <img src={asset+"images/icons/red-close.png"} alt="close" className='img-fluid'/>
                                                    </button>
                                                </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <div className='label'>
                                                <input type="text" placeholder='' maxLength={10} onChange={this.handleChange} name="pan" value={pan?pan:''}/>
                                                <span>PAN</span>
                                               {isValidPan ===false && (
                                                <>
                                                    <p className='error-msg_ m-0'>Please enter valid PAN number</p>
                                                    <button  onClick={this.handleClearPan} className='error-close'>
                                                    <img src={asset+"images/icons/red-close.png"} alt="close" className='img-fluid'/>
                                                    </button>
                                                </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.isSubmit && this.state.submitMsg?(
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="alert alert-success" role="alert">
                                            {this.state.submitMsg}
                                            </div>
                                        </div>
                                    </div>
                                    ):''
                                    }

                                    {!this.state.isSubmit && this.state.submitMsg?(
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="alert alert-danger" role="alert">
                                            {this.state.submitMsg}
                                            </div>
                                        </div>
                                    </div>
                                    ):''
                                    }

                                    <button
                                        type='button'
                                        onClick={this.handleSubmit}
                                        disabled={ isValid && isValidPan && lname && fname && relation && pan && mobile.length ===10 && email ?false:true}
                                        className='d-inline-block continue-btn w-100'
                                    >
                                    Continue
                                    </button>
                                </div>
                                </div>
                                
                            

                            </div>

                           
                        </div>
                    </div>
                
            </section>
            </>
        )
    }
}

function mapStateToProps(state) {
  const { salesForceToken, user, sfid, isLoading } = state.auth;
  const { message } = state.message;
  const { userMessage } = state.user;
  return {
      salesForceToken,
      user,
      sfid,
      isLoading,
      message,
      userMessage
  };
}

export default connect(mapStateToProps)(KycScreen15)