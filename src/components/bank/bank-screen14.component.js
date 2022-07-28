import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { asset } from "../../common/assets";
import { Redirect } from 'react-router-dom';
import { updateLimit, checkIfsc, checkAccount, updateUserBank, updateBankDetails, getBankDetails } from "../../actions/user";

class BankScreen14 extends Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAccountType = this.handleAccountType.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleIfscChange = this.handleIfscChange.bind(this);
        this.state = {
            savings: "active",
            bankData: null,
            current: null,
            account_no: "",
            ifsc: "",
            isValidNumber: false,
            isValidIfsc: true,
            branch_name: null,
            account_holder_name: "",
            account_type: "",
            isAccountError: false,
            isIfscError: false,
            isNameError: false,
            isInCorrect: true,
            status: 0
        }
    }


    componentDidMount(){
        $('.label input').change(function(){
            var $this = $(this);
            if($this.val())
                $this.addClass('filled')
            else
                $this.removeClass('filled')
            })
            let data = {
                user_sfid: this.props.sfid
            }

            this.props.dispatch(getBankDetails(data)).then((response)=>{
                if(response.status ==="success")
                {
                    let getData = response.data;
                    this.setState({
                        ifsc: getData?getData.ifsc__c:'',
                        account_holder_name: getData?getData.bank_account_holder_name__c:'',
                        account_no: getData?parseInt(getData.account_number__c):''
                    });
                }
            });

            $("input").trigger('change');
           
    }

    componentDidUpdate(){
        $('.error-close').click(function(){
           
            $(this).siblings('input').removeClass('filled')
        })
    }

handleAccountType = (type) => {
    if(type=="current")
    {
        this.setState({ savings:"", current:"active", account_type:"current"});
    }
    else if(type=="savings")
    {
        this.setState({ current:"", savings:"active", account_type:"savings"})
    }
}
clearMessage = (type) => {
    if(type=="account_no")
    {
        this.setState({ account_no:"" });
    }
    else if(type=="ifsc")
    {
        this.setState({ ifsc:"" })
    }
    else if(type=="account_holder_name")
    {
        this.setState({ account_holder_name:""})
    }
}

handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
}

 handleNumber = (e) => {
    var pattern = new RegExp(/^[0-9\b]+$/);
    if(e.target.value !=='')
    {
      if (!pattern.test(e.target.value)) {
        this.setState({isValidNumber: true, account_no : ""});
      }else
      {
        this.setState({isValidNumber: false, account_no : e.target.value});
      }
    }else{
      this.setState({isValidNumber: false, account_no : e.target.value});
    }
  }

    handleSubmit = async () => {
        const { selectedBank ,dispatch, user, sfid } = this.props
        let account_no = this.state.account_no;
        let ifsc = this.state.ifsc;
        let account_holder_name = this.state.account_holder_name;
        console.log(account_no);
        console.log(ifsc);
        console.log(account_holder_name);
        if(account_no !=='')
        {
            if(ifsc !=='' && this.state.isValidIfsc)
            {
                if(account_holder_name !=='')
                {
                    this.setState({status: 1});
                    let obj = {"account_number": this.state.account_no, "ifsc_code": this.state.ifsc}
                    let data = {
                        bank: selectedBank?selectedBank.name:'',
                        account_number: this.state.account_no,
                        ifsc: this.state.ifsc,
                        name: this.state.account_holder_name,
                        account_type: this.state.account_type,
                        branch_name: this.state.branch_name,
                        user_sfid: sfid,
                    }
                    dispatch(updateUserBank(data));
                    
                    await dispatch(checkAccount(obj)).then(async (response)=>{
                        if(response.status ==="success")
                        {
                            await dispatch(updateUserBank(data)).then((response)=>{
                                if(response.status ==="success")
                                {
                                    dispatch(updateBankDetails(this.state.account_no));
                                    this.setState({status: 2});
                                }else{
                                this.setState({status: 1});
                                }
                        });
                        }else{
                         this.props.history.push('/ed_bank_upload');
                        }
                });
                }
                else
                {
                    this.setState({ isNameError:true})
                }
            }
            else
            {
                this.setState({ isIfscError:true})
            }
        }
        else
        {
            this.setState({ isAccountError:true})
        }
    
    }

    handleIfscChange = async (event) =>{
        event.persist();
        let ifsc = event.target.value;
        var reg = /[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/; 
        if(ifsc.length == 11)
        {
        if(ifsc.match(reg))
        {
            this.setState({isValidIfsc: true, ifsc: event.target.value});
            let data = {
            ifsc: event.target.value
            }
            await this.props.dispatch(checkIfsc(data)).then((response) => {
            if(response.status == 'success')
            {
                const resData = response.data;
                this.setState({isValidIfsc: true, ifsc: event.target.value, branch_name: resData && resData.branch?resData.branch:'' });
            }else{
                if(ifsc.match(reg))
                {
                    this.setState({isValidIfsc: true, ifsc: event.target.value});
                }else{
                    this.setState({isValidIfsc: false, ifsc: event.target.value});
                }
            }
            });
        }else{
            this.setState({isValidIfsc: false, ifsc:''});
        }
        }else{
        this.setState({isValidIfsc: true, ifsc: event.target.value});
        }
    }

    handleContinue = async () =>{
        const { higherLimit, dispatch, history, user, sfid } = this.props
        if(higherLimit)
        {
            let data = {
                user_sfid: sfid
            }
            await dispatch(updateLimit(data)).then((response)=>{
                    history.push("/ed_limit");
             });
        }else{
            history.push('/ed_enach');
        }
    }

    render() {
            const { selectedBank, isLoading } = this.props
            const { status, isInCorrect } = this.state
            if(!selectedBank){
                return <Redirect to="/ed_select_bank" />
             }
        return (
            <>
            <Helmet>
                <title>Bank screen 14</title>
                <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            {isLoading?(
                    <div className="loading">Loading&#8230;</div>
            ):''}
            <section className='bank_details_wrapper mt-0 pt-5'>
                <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-sm-3'>
                        <h4 onClick={ () => this.props.history.push('/home')} className="cursor-point mtext-105 cl6">eduvanz.</h4>
                        <div className="navigations">
                            <ul className="breadcrumps">
                                <li className="b_back cursor-point"><a href={void(0)} onClick={() => this.props.history.goBack()} >Back</a></li>
                            </ul>
                        </div>

                        <ul className="kyc_timeline">
                            <li className="complete">Registration</li>
                            <li className="complete">Limit Approval</li>
                            <li className="complete">Identity Verifcation</li>
                            <li className="has_child ongoing">Auto pay
                            <span className="sheading">Set up auto-pay and we automatically debit your account on due dates </span>
                            <ul className="sub_timeline">
                                <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_select_bank')} className="active">Bank Account</li>
                                <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_enach')} >NACH</li>
                            </ul>
                            </li>
                            <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
                        </ul>
                    </div>
                    {status === 1?(
                        <>
                        <div className='col-sm-9 text-center'>
                            <img src={asset+'images/gif1.png'} alt="" />
                            <h1>Please wait..</h1>
                            <p>While we are depositing `1 in your bank account for verfication</p>
                        </div>
                        </>
                    ):status === 2?(
                        <>
                        <div className='col-sm-9 text-center'>
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <div>
                            <img src={asset+'images/image_processing2.png'} alt="" />
                            <h1>Verified</h1>
                            <p>Awesome! We have verified your account successfully</p>
                            <div className='row mt-5'>
                                <div className='col-sm-12 text-center'>
                                    <button
                                        type='submit'
                                        className='d-inline-block continue-btn'
                                        onClick={this.handleContinue}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
                        </>
                    ):(
                    <div className='col-sm-9'>
                    <div className='w-100 mb-5 c_p_m_b pb-4'>
                        <div className='form_header px-3 py-4'>
                            <h4 className='text-center m-0 form_header_h4'>Enter bank details</h4>
                        </div>
                        <div  className='d-flex align-items-center justify-content-center pt-3'>
                            <div className='d-flex align-items-center mx-3 stext-111'>
                            <span style={{"width":"10px"}} className="d-inline-block mr-1"><img src={asset+"images/icons/lock_icon.png"} alt="lock" className='img-fluid'/></span>
                            100% Secure
                            </div>
                            <div className='d-flex align-items-center mx-3 stext-111'>
                            <span style={{"width":"10px"}} className="d-inline-block mr-1"><img src={asset+"images/icons/security_icon.png"} alt="security" className='img-fluid'/></span> 
                            Trusted by millions
                            </div>
                         </div>
                        <div className='hr-line my-3'></div>
                        <div className='d-flex justify-content-center'>
                            <div className='d-flex align-items-center'>
                            <span style={{"width":"38px"}} className="d-inline-block mr-1"><img src={selectedBank?`${selectedBank.icon}`:''} alt="state-bank" className='img-fluid'/></span>
                            {selectedBank?selectedBank.name:''} 
                            <span style={{"width":"10px"}} className="cursor-point d-inline-block ml-1" onClick={() => this.props.history.push('/ed_select_bank')}><img src={asset+"images/icons/icon_Edit.png"} alt="icon_Edit" className='img-fluid'/></span>
                            </div>
                        </div>
                        
                    
                        <div className='row justify-content-center py-4'>
                            <div className='col-sm-10'>
                                <div className='row'>
                                    <div className='col-12'>
                                    {!isInCorrect && (
                                        <div className='py-4'>
                                            <div className='alert alert-warning d-flex justify-content-center'>
                                                <p className='mb-0'>Penny drop failed due to incorrect details</p>
                                            </div>
                                        </div>
                                    
                                    )}
                                                </div>
                                </div>
                                <div className='row pt-4 pb-lg-5 pb-4'>
                                    <div className='col-lg-6'>
                                        <button onClick={()=>this.handleAccountType('savings')} className= {`account-type-tab ${this.state.savings}`}>Saving</button></div>
                                    <div className='col-lg-6'>
                                    <button onClick={()=>this.handleAccountType('current')} className={`account-type-tab ${this.state.current}`}>Current</button>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                    <div className='label'>
                                        <input type="text" placeholder='' onChange={this.handleNumber} value={this.state.account_no?this.state.account_no:''} name="account_no"/>
                                        <span>Account Number</span>
                                        { this.state.isAccountError === true || this.state.isValidNumber === true?(
                                        <p className='error-msg_ m-0'>Enter Valid Account Number</p>
                                        ):''
                                        }
                                        { this.state.isAccountError ||  this.state.isValidNumber ?(
                                        <button onClick={()=>this.clearMessage('account_no')} className='error-close'>
                                        <img src={asset+"images/icons/red-close.png"} alt="close" className='img-fluid'/>
                                        </button>
                                          ):''
                                        }
                                    </div>
                                    </div>
                                    <div className='col-lg-6'>
                                    <div className='label'>
                                        <input type="text" placeholder='' onChange={this.handleIfscChange} maxLength={11} value={this.state.ifsc?this.state.ifsc:''} name="ifsc"/>
                                        <span>IFSC Code</span>
                                       
                                         {this.state.isIfscError === true || !this.state.isValidIfsc?(
                                        <p className='error-msg_ m-0'>Enter Valid IFSC Code</p>
                                        ):''
                                        }
                                        { this.state.isIfscError || !this.state.isValidIfsc?(
                                        <button onClick={()=>this.clearMessage('ifsc')} className='error-close'>
                                        <img src={asset+"images/icons/red-close.png"} alt="close" className='img-fluid'/>
                                        </button>
                                           ):''
                                        }
                                         { this.state.ifsc =="" ?(
                                            <a className='cursor-point' href={void(0)} >Search for IFSC</a>
                                         ):''
                                         }
                                    </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                    <div className='label'>
                                        <input type="text" placeholder='' onChange={this.handleChange} value={this.state.account_holder_name?this.state.account_holder_name:''} name="account_holder_name"/>
                                        <span>Account Holder Name</span>
                                        { this.state.isNameError === true?(
                                            <p className='error-msg_ m-0'>Enter Account Holder Name</p>
                                        ):''
                                        }
                                        { this.state.isNameError?(
                                            <button  onClick={()=>this.clearMessage('account_holder_name')}  className='error-close'>
                                                <img src={asset+"images/icons/red-close.png"} alt="close" className='img-fluid'/>
                                            </button>
                                          ):''
                                        }
                                    </div>
                                    </div>
                                </div>
                                <div className='row mb-4'>
                                    <div className='col-lg-12 d-flex justify-content-center'>
                                        <button onClick={this.handleSubmit} className='continue-btn'>Continue</button>
                                    </div>
                                </div>
                                <p className='text-center'><span className='d-inline-block r_s_i_circle mr-2'><i className='rupee'>`</i></span>We will deposit `1 in your bank account for customer verfication</p>
                            </div>
                        </div>
                     
                        <div className='enach-footer p-3 pr-5 shadow'>
                              <div className='d-flex justify-content-lg-end justify-content-center'>
                                <div className='d-flex align-items-center'>
                                    <div className='mx-3 d-flex align-items-center text-nowrap'>Get our App <span className='ml-2'><img src={asset+"images/icons/app-icon.png"} alt="app" /></span></div>
                                    <div className="s-l" style={{"height":"27px"}}></div>
                                    <div className='mx-3 d-flex align-items-center text-nowrap'>Help <span className='help-icon ml-2'>?</span></div>
                                </div>
                              </div>
                            </div>
                    </div>
                    </div>
                    )}
                </div>
                </div>
            </section>
     
            </>
        )
    }
}

function mapStateToProps(state) {
    const { banks, selectedBank, higherLimit } = state.user;
    const { user, isLoading, sfid } = state.auth;
    return {
        selectedBank,
        higherLimit,
        isLoading,
        banks,
        sfid,
        user
    };
}

export default connect(mapStateToProps)(BankScreen14);