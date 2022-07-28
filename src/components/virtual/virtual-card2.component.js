import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import Header from "../../common/header";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import { asset } from "../../common/assets";
import { getAccountProfile, setLoanAmount } from "../../actions/user";

class VirtualCard2 extends Component {

    constructor(props) {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null,
            value: 10000,
            minValue: 10000,
            limit: 0,
            errorMsg:null,
            minAmt: 0,
            min:10000,
        }
    }

    async componentDidMount() {
        
        const { user, dispatch, sfid } = this.props;
        let userDet = {
            user_sfid: sfid,
        }
        await dispatch(getAccountProfile(userDet)).then((response)=>{
            if(response.status ==="success")
            {
                this.setState({limit: Number(response.accountDet.ipa_basic_bureau__c)});
            }
        });
    }

    handleChange = value => {
        this.setState({
          value: value
        })
        console.log(value);
      };

    handleSubmit = () =>{
        const { dispatch, history } = this.props;
        dispatch(setLoanAmount(this.state.value));
        if(this.state.value)
        {
            history.push("/virtual_card3");
        }
        else{
            this.setState({ errorMsg: true});
        }
       
    }

    render() {
        const { user, sfid } = this.props;
        if(!sfid)
        {
          window.location="/login";
        }
        const { value } = this.state
        const stepValue = parseInt((this.state.limit/6).toFixed(0));
        return (
            <>
            <Helmet>
                <title>Virtual Card 2</title>
                <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            <Header
              user = {user}
            />

            <section className="kyc_pages bank_screen">
               <div className='container'>
                   <div className='row'>
                       <div className='col-sm-12'>
                           <div className='d-flex align-items-center'>
                               <button type='button' onClick={() => this.props.history.goBack()} className='back-btn rounded-circle mr-3 mr-lg-4'>
                                   back
                               </button>
                               <h2 className="back-btn-text m-0">Virtual Card</h2>
                               </div>
                        </div>
                   </div>
                   <div className='row mt-4'>
                    <div className='col-sm-12'>
                        <div className='w-100 virtual_card_process'>
                            <div>
                                <ul className='d-flex list-unstyled m-0 '>
                                    <li className='active'>
                                        <span><img src={asset+"images/icons/apple_logo.png"} alt="apple_logo" className='img-fluid'/></span> 
                                        Apple India
                                        <button type='button' onClick={()=> this.props.history.push("/virtual_card1")} className='edit-btn ml-3'>Edit</button>
                                    </li>
                                    <li className='active'>
                                        <span><img src={asset+"images/icons/amount_icon.png"} alt="amount_icon" className='img-fluid'/></span>
                                        Enter Amount
                                    </li>
                                    <li>
                                        <span><img src={asset+"images/icons/payplan_icon.png"} alt="payplan_icon" className='img-fluid'/></span>
                                        Payment plan
                                    </li>
                                    <li>
                                        <span><img src={asset+"images/icons/summary_icon.png"} alt="summary_icon" className='img-fluid'/></span>
                                        Summary
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                   </div>
                  
               </div>
            </section>
         
            <section>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='w-100 shopping_content_wrapper mt-4'>
                                <div className='maxWidth850'>
                                    <h4 className='text-center mb-5 s_c_title'>I'd like to borrow</h4>
                                    <div className='amount-slider'>
                                        <div className='d-flex justify-content-center text-center mb-5'>
                                            <div className='value-txt '><i className='rupee'>`</i> {value}</div>
                                        </div>
                                        
                                        <Slider
                                            min={this.state.minValue}
                                            max={this.state.limit}
                                            value={value}
                                            onChange={this.handleChange}
                                            tooltip={false}
                                            step={stepValue}
                                        />
                                        <div className='d-flex justify-content-between'>
                                            <div className='step_line'></div>
                                            <div className='step_line'></div>
                                            <div className='step_line'></div>
                                            <div className='step_line'></div>
                                            <div className='step_line'></div>
                                            <div className='step_line'></div>
                                        </div>
                                        <div className='d-flex justify-content-between amount-between mt-4'>

                                            <div><i className='rupee'>`</i> {this.state.minValue}</div>

                                            <div><i className='rupee'>`</i> {this.state.limit}</div>
                                        </div>
                                      
                                   </div>
                                  <br></br><br></br>
                                  {this.state.errorMsg?(
                                        <span className='d-inline-block invalid_otp'>Please select loan amount</span>
                                    ):''}
                                   <div className='product_url_box position-relative'>
                                        <input type="text" placeholder='Product URL'/>
                                        <button className='text-uppercase position-absolute'>Optional</button>
                                   </div>
                                
                                   <div className='mt-5 text-center'>
                                       <p className='otp-txt mt-4 mb-4'><img src={asset+"images/icons/icon-ind.png"} /> Please round up to the nearest figure, include shipping as well.</p>
                                       <button onClick={this.handleSubmit} className='d-inline-block continue-btn'>Next</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                   
                    <div className='row mt-5'>
                        <div className='col-sm-12 t-c'>
                            <h4>Terms &amp; Conditions</h4>
                            <p>Price may also include trade-in credit. Pricing with a trade-in is after trade-in of a specific device. Trade-in values vary based on the condition, year, and configuration of your trade-in device. You must be at least 18 years old. Additional terms from Apple or Apple’s trade-in partner may apply.
                                </p>
                                <p>Representative example: Based on purchase of ₹17430. Total amount payable ₹18462 paid over 9 months as 9 monthly payments of ₹2051 at an interest rate of 14% paper annum. Total interest paid to bank: ₹1032.</p>
                                <p>
                                §No-Cost EMI available for purchases made using qualifying credit cards on 12-month tenure only. Offer available on qualifying purchases made after 1:30 PM IST on 6 December 2021 and before 11:59 PM IST on 19 January 2022. Minimum order spend applies as per your credit card’s issuing bank threshold. Offer cannot be combined with Apple Store for Education or Corporate Employee Purchase Plan pricing. Credit card eligibility is subject to terms and conditions between you and your credit card issuing bank. Offer may be revised or withdrawn at any time without any prior notice. Offer valid for limited period. Terms &amp; Conditions apply.</p>
                        </div>
                    </div>
                </div>

            </section>
            </>
        )
    }
}

const mapSTP = state => {
    const { user, sfid } = state.auth;
    return {
        currentUser: state.currentUser,
        sfid,
        user
    }
}

export default connect(mapSTP)(VirtualCard2)