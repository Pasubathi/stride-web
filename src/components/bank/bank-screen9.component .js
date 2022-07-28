import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import Header from "../../common/header";
import { asset } from "../../common/assets"
import { selectPlan, getPlans, getUserProduct } from "../../actions/payment";
import { getProductById, updateTransApp } from "../../actions/user";
import { updatePreviousPath } from "../../actions/auth";

class BankScreen9 extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null
        }
    }
    async componentDidMount() {
        const { user, dispatch, id, sfid } = this.props
        if(!sfid)
        {
            const path = window.location.pathname;
            dispatch(updatePreviousPath(path));
            this.props.history.push('/login');
        }

        let data = {
            user_sfid: sfid,
        }
        
        window.scrollTo(0, 0)
        await dispatch(getPlans(data));
        await dispatch(getUserProduct(data));
        let obj = {
            sfid: id,
        }
        this.props.dispatch(getProductById(obj));
         // expand single
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
        // expand all
        $("input[name='expandAll']").change(function(){
            if($(this).is(":checked")) {
                $('.p-o-b').addClass("open_");
                $(".dd-close").show();
                $(".dd-open").hide();
            } else {
                $('.p-o-b').removeClass("open_");
                $(".dd-close").hide();
                $(".dd-open").show();
            }
        });
        
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

    handlePlan = (plan_id, sfid) =>{
        const { dispatch, history, id } = this.props 
        dispatch(selectPlan(plan_id));
        let obj = {
            stage: 'Select Plan',
            plan: sfid,
            sfid: this.props.opp_id
        }
        dispatch(updateTransApp(obj));
        history.push(`/edplan_details/${id}/${plan_id}`);
    }

    handleBack = () =>{
        const { history, id } = this.props
        history.push(`/product-details/${id}`);
    }

    render() {
        const { plans, product, user, isLoading } = this.props
      
        return (
            <>
            <Helmet>
                <title>Eduvanz | Plans</title>
            </Helmet>
            {isLoading?(
            <div className="loading">Loading&#8230;</div>
            ):''}
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
                               <h2 className="back-btn-text m-0">Select Payment plans</h2>
                               </div>
                        </div>
                   </div>
                   <div className='row mt-4'>
                       <div className='col-lg-6'>
                        <div className='d-flex justify-content-between align-items-center product-item-box mb-lg-0 mb-3'>
                            <h3 className='product-name m-0'>{product.name?product.name:''}</h3>
                            {product.name?'':(
                            <div className='brand-name'>
                             <span><img src={asset+"images/icons/apple.png"} alt="apple" /></span>
                            </div>
                        )}
                        </div>
                       </div>
                       <div className='col-lg-6'>
                       <div className='d-flex justify-content-between align-items-center product-item-box'>
                            <h3 className='product-name m-0'>Loan Amount:</h3>
                            {product.mrp__c ?(
                            <div className='a-e d-flex align-items-center'>
                                <span className='loan-amount'><i className='rupee'>`</i>{product.mrp__c.toLocaleString('en-IN')}</span>
                                <button className='edit-btn ml-3'>Edit</button>
                            </div>
                            ):''
                            }
                        </div>
                       </div>
                   </div>
                   <div className='row my-4'>
                       <div className='col-sm-12'>
                           <div className='d-md-flex justify-content-md-between align-items-center'>
                                <div>
                                    <h3 className='m-lg-0 mb-3 p-o-t'>Payment options</h3>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <div className='no-cost'>No Cost <span><img src={asset+"images/icons/icon-ind2.png"} alt="icon-ind2" /></span></div>
                                    <div className='moratorium ml-2'>Moratorium <span><img src={asset+"images/icons/icon-ind2.png"} alt="icon-ind2" /></span></div>
                                </div>
                           </div>
                       </div>
                   </div>
               </div>
            </section>
            <section>
                <div className='container'>
                    <div className='row payment-option-list'>
                        {plans && plans.length > 0 && plans.map((item, index)=>(
                        <div className='col-lg-4 col-md-6' key={`item-${index}`}>
                            <div className='p-o-b d-flex flex-column justify-content-between'>
                                {/* top */}
                                <div className='d-flex align-items-center justify-content-between p-o-b_top'>
                                    <div className='d-flex flex-column justify-content-start'>
                                        <div className='mb-2'>
                                            <span className='n-c d-inline-block'>Moratorium</span>
                                        </div>
                                        <div>
                                           <span className='mtm d-inline-block'> No Cost</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button className='calender rounded-circle'>
                                        <img src={asset+"images/icons/calendar.png"} alt="calendar" />
                                        </button>
                                    </div>
                                </div>
                                {/* top */}
                            {/* bottom */}
                                <div style={{cursor:'pointer'}} onClick={()=>this.handlePlan(item.id, item.sfid)} className='p-o-b_bottom'>
                                   <h2 className='m-txt'>{item.net_tenure__c} {"Months"}</h2>
                                   <div className='d-flex justify-content-between align-items-center'>
                                   <div className='pm-a'>{item.currencyisocode ==='INR'?(<i className='d-inline-block r-s rupee'></i>):'$'}<span>{item.disbursal_amount__c?item.disbursal_amount__c.toLocaleString('en-IN'):0}</span>/Per month</div>
                                </div>
                                </div>
                                {/* end bottom */}
                                {/* middme */}
                                <div className='p-o-b_middle'>
                                    <p className='p-o-txt_ mb-2'>Due today: <i></i> <span>{item.emi_amount__c?item.emi_amount__c.toLocaleString('en-IN'):0}</span></p>
                                    <p className='p-o-txt_ mb-2'>Interest ({item.fixed_rate__c}% p.a): <i></i> <span>{((item.fixed_rate__c/100)*item.emi_amount__c).toFixed(2).toLocaleString('en-IN')}</span></p>
                                    <p className='p-o-txt_ mb-3'>Total: {item.currencyisocode ==='INR'?(<i className='rupee'>`</i>):'$'} <span>{(((item.fixed_rate__c/100)*item.emi_amount__c)+item.emi_amount__c).toFixed(2).toLocaleString('en-IN')}</span></p>
                                    <p className='p-o-txt_ mb-2'>Down Payment: <i></i> <span>{item.down_payment__c?item.down_payment__c.toLocaleString('en-IN'):0}</span></p>

                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='pm-a'>
                                            <button className='loan-info-modal-btn' data-toggle="modal" data-target={`#viewMoratorium${index}`}>View Moratorium</button>
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
                                <input type="checkbox" name="expandAll"/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                    )}
                </div>
            </section>
            <div className="modal fade" id={`viewMoratorium0`} tabIndex="-1" role="dialog" aria-labelledby="viewMoratoriumTitle" aria-hidden="true">
            <div className="modal-dialog viewMoratoriumModal modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">3 Months with Moratorium</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body px-lg-5 px-4 pb-lg-5 pb-4">
                    <div className='row'>
                        <div className='col-lg-4 m_s_e_s_txt'>
                            <h5>Moratorium Starts</h5>
                            <p>June 2022 to September 2022</p>
                        </div>
                        <div className='col-lg-8 m_s_e_s_txt'>
                            <h5>EMI Starts</h5>
                            <p>October 2022 to December 2022</p>
                        </div>
                    </div>
                    <div className='m_s_b mt-3'>
                        <div className='d-flex flex-wrap'>
                            <div className='m_start'><i className='rupee'>`</i> 500 <span>per month</span></div>
                            <div className='e_start'><i className='rupee'>`</i> 17,000 <span>per month</span></div>
                        </div>
                        <div className="range-slider">
                            <div className='handel left' style={{'left':"0%"}}>
                                <span>Nov21</span>
                            </div>
                            <div className='handel' style={{'left':"30%"}}>
                                <span>Jan21</span>
                            </div>
                            <div className='range range-dotted'></div>
                            <div className='range range-solid' style={{"width":"70%"}}></div>
                            <div className='handel right' style={{'left':"100%"}}>
                                <span>May21</span>
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

function mapStateToProps(state) {
    const { salesForceToken, user, isLoading, sfid } = state.auth;
    const { plans } = state.payment;
    const { productId, product } = state.user;
    return {
        salesForceToken,
        productId,
        sfid,
        user,
        plans,
        product,
        isLoading
    };
  }

export default connect(mapStateToProps)(BankScreen9)