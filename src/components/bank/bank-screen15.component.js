import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import Select from 'react-select';
import { asset } from "../../common/assets";
import { getBanks, updateBank } from "../../actions/user";

class BankScreen15 extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null,
            selectedBank: null,
            myBank: null
        }
    }

    componentDidMount()
    {
        const { user, dispatch } = this.props
        dispatch(getBanks());
    }

    brandChange = (e) =>{
        this.setState({selectedBank: e.value, myBank: {name: e.value, icon:e.img }});
    }

    handlebank = (name, icon) =>{
        this.setState({selectedBank: name, myBank:{name: name, icon: icon }});
    }

    handleContinue = () =>{
        const { dispatch, history } = this.props
        dispatch(updateBank(this.state.myBank));
        history.push("/ed_bank_details");
    }


    render() {
        const { isLoading, banks } = this.props
        const { selectedBank } = this.state
        let bankOptions = [];
        let bankData;
        if(banks)
        {
            bankData = banks.slice(0,6);
            for(var i = 0; i < banks.length; i++){
                bankOptions.push({ value: banks[i].bank_name, label: banks[i].bank_name, img: banks[i].bank_icon });
            }
        }
      
        return (
            <>
            <Helmet>
                <title> Bank screen 15 </title>
                <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            {isLoading?(
                    <div className="loading">Loading&#8230;</div>
            ):''}
            {/* <Header/> */}
            <section className='bank_details_wrapper'>
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
                        <div className='col-sm-9'>
                            <div className='w-100 mb-5 c_p_m_b pb-4'>
                            <div className='form_header px-3 py-4'>
                                <h4 className='text-center m-0 form_header_h4'>Enter bank details</h4>
                            </div>
                            <div  className='d-flex align-items-center justify-content-center pt-3'>
                                <div className='d-flex align-items-center mx-3 stext-111'>
                                <span style={{"width":"10px"}} className="d-inline-block mr-1"><img src={asset+"images/icons/lock_icon.png"} alt="mc" className='img-fluid'/></span>
                                100% Secure
                                </div>
                                <div className='d-flex align-items-center mx-3 stext-111'>
                                <span style={{"width":"10px"}} className="d-inline-block mr-1"><img src={asset+"images/icons/security_icon.png"} alt="mc" className='img-fluid'/></span> 
                                Trusted by millions
                                </div>
                            </div>

                            <div className='back_search_wrapper'>
                                <div className='mt-lg-5 mt-4'>
                                    <div className='label'>
                                            <Select 
                                            options={bankOptions}
                                            placeholder="Search your bank"
                                            name="brand"
                                            onChange={this.brandChange}
                                        />
                                    </div>
                                </div>
                            <ul className='list-unstyled m-0 bank_list d-flex flex-wrap mt-4'>
                            {bankData && bankData.length >0 &&(
                                bankData.map((item, index)=>(
                                <li key={"bank-"+index} onClick={()=>this.handlebank(item.bank_name, item.bank_icon)} className={`cursor-point bank d-flex align-items-center justify-content-center flex-column ${selectedBank === item.bank_name?'active':''}`}>
                                    <div className='bank_logo'>
                                    <img src={item.bank_icon} alt="icon-ind2" className='img-fluid'/>
                                    </div>
                                    <p className='bank_name text-uppercase m-0 mt-3'>{item.bank_name}</p>
                                </li>
                                ))
                                )
                                }
                            </ul>
                            {selectedBank && (
                            <div className='row'>
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
                            )}
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
    const { banks } = state.user;
    const { salesForceToken, user, isLoading } = state.auth;
    return {
        salesForceToken,
        banks,
        user,
        isLoading
    };
}

export default connect(mapStateToProps)(BankScreen15)