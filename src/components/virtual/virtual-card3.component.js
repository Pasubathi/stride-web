import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import Header from "../../common/header";
import { asset } from "../../common/assets";
import { getPlans, selectPlan, storeDownPayment } from "../../actions/payment";

class VirtualCard3 extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null,
            loan_amount:0,
        }
    }

    async componentDidMount() {
        // expand single
       $('.dd-open').on('click', function(){
           $(this).hide();
           $(this).parent().parent('.p-o-b').addClass('open_');
           $(this).siblings().show();
       })
       // close single
       $('.dd-close').on('click', function(){
           $(this).hide();
           $(this).parent().parent('.p-o-b').removeClass('open_');
           $(this).siblings().show();
       })
       // expand all
       $("#expandall").change(function(){
        console.log('bbbbbbbb')

           if($(this).is(":checked")) {
            alert()
            console.log('dasdasdsad')
            $('.p-o-b').addClass("open_");
            $(".dd-close").show();
            $(".dd-open").hide();
        } else {
            console.log('aaaaaaaa')

            $('.p-o-b').removeClass("open_");
            $(".dd-close").hide();
            $(".dd-open").show();
        }
    });
       const { user, dispatch} = this.props

       let data = {
           id: user,
       }
       await dispatch(getPlans(data));
   }

   componentDidUpdate()
   {
       $('.dd-open').on('click', function(){
           console.log("Clik Open");
           $(this).hide();
           $(this).parent().parent('.p-o-b').addClass('open_');
           $(this).siblings().show();
       })
       // close single
       $('.dd-close').on('click', function(){
           $(this).hide();
           $(this).parent().parent('.p-o-b').removeClass('open_');
           $(this).siblings().show();
       })
   }

   handleSelect = (plan_id, down_payment) =>{
        const { dispatch, history } = this.props 
        dispatch(selectPlan(plan_id));
        dispatch(storeDownPayment(down_payment));
        history.push("/virtual_card4");
    }

    handleExpandChange = () =>{
        if($("input[name='expandAll']").is(":checked")) {
            $('.p-o-b').addClass("open_");
            $(".dd-close").show();
            $(".dd-open").hide();
        } else {
            $('.p-o-b').removeClass("open_");
            $(".dd-close").hide();
            $(".dd-open").show();
        }
    }


    render() {
        const { user, loan_amount, plans, sfid } = this.props;
        if(!sfid)
        {
          window.location="/login";
        }
        this.state.loan_amount = Number(loan_amount);
        return (
            <>
            <Helmet>
                <title>Virtual Card 3</title>
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
                                    <li className='active'>
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
                                <div className='maxWidth965'>
                                    <h4 className='text-center mb-5 s_c_title'>Select Payment Plan</h4>

                                    <div className='w-100 loan-amound-info mb-4'>
                                        <div>
                                            <ul className='m-0 list-unstyled d-flex'>
                                                <li>Loan Amount: <span><i></i>{this.state.loan_amount} </span></li>
                                                <li>Upfront Amount:: <span><i></i>50,000 </span> 
                                                <button 
                                                    className='alert-btn' 
                                                    data-toggle="dropdown" 
                                                    aria-haspopup="true" 
                                                    aria-expanded="false"
                                                >
                                                    <img src={asset+"images/icons/icon-ind2.png"} alt="icon-ind2" className='img-fluid'/>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <h5>Your Loan Amount is greater than your Limit!</h5>
                                                    <p className='m-0'>
                                                    No worries, you can pay us the balance 50000 upfront, and check-out at Apple with the Eduvanz card for 2,00,000
                                                    </p>
                                                    
                                                </div>
                                                </li>
                                                <li>Total Amount:: <span><i></i>2,50,000 </span></li>
                                            </ul>
                                            
                                        </div>
                                        
                                    </div>
                                   
                                  



                                   
                        <div className='row payment-option-list'>
                        {plans && plans.length > 0 && plans.map((item, index)=>(
                        <div className='col-lg-4 col-md-6' key={`item-${index}`}>
                            <div className='p-o-b d-flex flex-column justify-content-between'>
                                {/* top */}
                                <div className='d-flex align-items-center justify-content-end p-o-b_top'>
                                   <div>
                                        <button className='calender rounded-circle'>
                                        <img src={asset+"images/icons/calendar.png"} alt="calendar" />
                                        </button>
                                    </div>
                                </div>
                                {/* top */}
                            {/* bottom */}
                                <div style={{cursor:'pointer'}} onClick={()=>this.handleSelect(item.id, item.down_payment__c)} className='p-o-b_bottom'>
                                   <h2 className='m-txt'>{item.net_tenure__c?item.net_tenure__c:'--'} {"Months"}</h2>
                                   <div className='d-flex justify-content-between align-items-center'>
                                   <div className='pm-a'>{item.currencyisocode ==='INR'?(<i className='d-inline-block r-s rupee'></i>):'$'}<span>{item.disbursal_amount__c?item.disbursal_amount__c.toLocaleString('en-IN'):'--'}</span>/Per month</div>
                                </div>
                                </div>
                                {/* end bottom */}
                                {/* middme */}
                                <div className='p-o-b_middle'>
                                    <p className='p-o-txt_ mb-2'>Due today: <i></i> <span>{item.emi_amount__c?item.emi_amount__c.toLocaleString('en-IN'):'--'}</span></p>
                                    <p className='p-o-txt_ mb-2'>Interest ({item.fixed_rate__c?item.fixed_rate__c:'--'}% p.a):  <i></i> <span>{item.fixed_rate__c?((item.fixed_rate__c/100)*item.emi_amount__c).toFixed(2).toLocaleString('en-IN'):'--'}</span></p>
                                    <p className='p-o-txt_ mb-3'>Total: {item.currencyisocode ==='INR'?(<i className='rupee'>`</i>):'$'} <span>{(((item.fixed_rate__c/100)*item.emi_amount__c)+item.emi_amount__c).toFixed(2).toLocaleString('en-IN')}</span></p>
                                    <p className='p-o-txt_ mb-2'>Down Payment: <i></i> <span>{item.down_payment__c?item.down_payment__c.toLocaleString('en-IN'):'--'}</span></p>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='pm-a'>
                                            <button className='loan-info-modal-btn' data-toggle="modal" data-target="#viewTimeLine">View Timeline</button>
                                        </div>
                                    </div>
                                    </div>
                            {/* end middle */}
                                <div className='dd-btn-set'>
                                    <button className='dropdown-amount dd-open'>
                                        <img src={asset+"images/icons/icon_dd.png"} alt="drop-down" />
                                    </button>
                                    <button className='dropdown-amount dd-close'>
                                        <img src={asset+"images/icons/icon_dd.png"} alt="drop-down" className='rotate180'/>
                                    </button>
                                </div>
                            </div>
                        </div>
                          ))}                     
                
                    </div>
                    {plans && plans.length > 0 && (
                    <div className='row mb-lg-5 mb-3'>
                        <div className='col-sm-12 d-flex justify-content-end align-items-center'>
                            <p className='m-0 w-a-txt mr-3'>Expand all</p>
                            <label className="switch">
                                <input type="checkbox" onChange={this.handleExpandChange} name="expandAll"/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                      )}
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
            <div className="modal fade" id="viewTimeLine" tabIndex="-1" role="dialog" aria-labelledby="viewMoratoriumTitle" aria-hidden="true">
            <div className="modal-dialog viewMoratoriumModal modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Loan Timeline</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body px-lg-5 px-4 pb-lg-5 pb-4">
                    <div className='row'>
                        <div className='col-lg-4 m_s_e_s_txt'>
                            <h5>EMI Starts</h5>
                            <p>May 2021</p>
                        </div>
                        <div className='col-lg-8 m_s_e_s_txt'>
                            <h5>EMI End</h5>
                            <p>November 2021</p>
                        </div>
                    </div>
                    <div className='m_s_b mt-3'>
                        <div className='d-flex flex-wrap'>
                           
                            <div className='e_start w-100 text-center' style={{"flex":"0 0 100%"}}><i className='rupee'>`</i> 17,000 <span>per month</span></div>
                        </div>
                        <div className="range-slider">
                            <div className='handel left' style={{'left':"0%"}}>
                                <span>May21</span>
                            </div>
                            {/* <div className='handel' style={{'left':"30%"}}>
                                <span>Jan21</span>
                            </div> */}
                            <div className='range range-dotted'></div>
                            <div className='range range-solid' style={{"width":"100%"}}></div>
                            <div className='handel right' style={{'left':"100%"}}>
                                <span>Nov21</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                </div>
            </div>
            </div>
            </>
        )
    }
}

const mapSTP = state => {
    const { user, sfid } = state.auth;
    const { loan_amount } = state.user;
    const { plans } = state.payment;
    return {
        currentUser: state.currentUser,
        user,
        sfid,
        loan_amount,
        plans
    }
}

export default connect(mapSTP)(VirtualCard3)