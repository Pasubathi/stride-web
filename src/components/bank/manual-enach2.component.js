import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { asset } from "../../common/assets";
import { getBanks, getBankDetails, createRazorPayOrder, updateAccountStatus } from "../../actions/user";
import { updatePreviousPath } from "../../actions/auth";

class ManualEnach2 extends Component {
  constructor() {
    super()
    this.state = {
        selectedBank: null,
        bankDetails: null,
        status: 0,
        myBank: null,
        selectedTab: 1,
        ifsc: null,
        account_holder_name: null,
        account_no:null,
    }
}

  componentDidMount()
  {
      const { user, dispatch, sfid } = this.props
      if(!sfid)
      {
        const path = window.location.pathname;
        dispatch(updatePreviousPath(path));
        this.props.history.push('/login');
      }
      dispatch(getBanks());
      $('.label input').change(function(){
          var $this = $(this);
          if($this.val())
              $this.addClass('filled')
          else
              $this.removeClass('filled')
        })

        $('.b_c_a_tabs_conteiner .b_c_a_tabs_content').hide();
        $(".b_c_a_tabs_conteiner .b_c_a_tabs_content").eq(0).show()

        $('.b_c_a_tabs button').on('click', function(){
            var tab_id2 = $(this).attr('data-target');
            $('.b_c_a_tabs_content').hide();
            console.log($("#"+ tab_id2));
            $(this).addClass('active');
            $(this).parent().siblings().find('button').removeClass('active');
            $("#" + tab_id2).show();
        })

        let data = {
          user_sfid: this.props.sfid
        }

        this.props.dispatch(getBankDetails(data)).then((response)=>{
          if(response.status ==="success")
          {
              let getData = response.data;
             // let bankData = getData && getData.bank_list?getData.bank_list:null;
              this.setState({
                  ifsc: getData && getData && getData.ifsc__c?getData.ifsc__c:'',
                  account_holder_name: getData && getData.bank_account_holder_name__c?getData.bank_account_holder_name__c:'',
                  account_no: getData && getData.account_number__c?getData.account_number__c:'',
                  bankDetails: getData,
                  selectedBank: getData && getData.bank_name?getData.bank_name:''
              });
          }
      });
  }

  loadScript = (src) => {
      return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
              resolve(true);
          };
          script.onerror = () => {
              resolve(false);
          };
          document.body.appendChild(script);
      });
  }

  async openPayModal(cust_id, order_id)
  {
      const res = await this.loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
      }
      var options = {
          key: 'rzp_test_FCJbc6ap4R4xtE',
          order_id: order_id,
          customer_id: cust_id,
          recurring: "1",
          //amount: 100000, //  = INR 1
          name: 'Eduvanz',
          description: 'Test Transaction',
          image: 'https://eduvanz-web.herokuapp.com/images/icons/favicon.png',
          "handler": (response) => {
            console.log("response", response);
            let data = {
              user_id: this.props.user
            }
            this.props.dispatch(updateAccountStatus(data));
            this.setState({status: 1});
          },
          "theme": {
            "color": "#F37254"
          }
        };
        var rzp1 = new window.Razorpay(options);
      /*  document.getElementById('rzp-button1').onclick = function (e) {
          rzp1.open();
          e.preventDefault();
        } */
    /*   const rzp1  = new window.Razorpay(options); */
      rzp1.open();
  }

  handleSubmit = (type) =>{
    const { dispatch, user, sfid } = this.props
      let data = {
        user_sfid: sfid, 
        type: type
      }
      dispatch(createRazorPayOrder(data)).then((response)=>{
          if(response.status === "success")
          {
            const getData = response.data;
            const customer_id = getData && getData.customer_id?getData.customer_id:'';
            const order_id = getData && getData.customer_id?getData.order_id:'';
            this.openPayModal(customer_id, order_id);
          }
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleNumber = (e) => {
    var pattern = new RegExp(/^[0-9\b]+$/);
    if(e.target.value !=='')
    {
        if (!pattern.test(e.target.value)) {
            this.setState({isValidCvv: true, cvv : "", cvvErroMsg: 'Enter Valid CVV'});
        }else
        {
            this.setState({isValidCvv: false, cvv : e.target.value.toString()});
        }
    }else{
        this.setState({isValidCvv: false, cvv : e.target.value.toString()});
    }
  }

  handleExpiry = (e) => {
    var pattern = new RegExp(/^[0-9\b]+$/);
    if(e.target.value !=='')
    {
        if (!pattern.test(e.target.value)) {
            this.setState({isValidExpiry: true, expiry : "", expiryErroMsg: 'Enter Valid CVV'});
        }else
        {
            this.setState({isValidExpiry: false, expiry :  e.target.value.toString(), expiryErroMsg: ''});
        }
    }else{
        this.setState({isValidExpiry: false, expiry : e.target.value.toString(), expiryErroMsg: ''});
    }
  }

  handleCardNumber = (e) =>{
    var cardNo=e.target.value;
    var masterCardRegex=/^(?:5[1-5][0-9]{14})$/;
    var visaCardRegex=/^(?:4[0-9]{12})(?:[0-9]{3})$/;
    var americanExpCardRegex=/^(?:3[47][0-9]{13})$/;
    var pattern = new RegExp(/^[0-9\b]+$/);
    if(cardNo)
    {
        if(pattern.test(e.target.value))
        {
            var cardName="";
            if(masterCardRegex.test(cardNo)){
            cardName="Master Card";
            }else if(visaCardRegex.test(cardNo)){
            cardName="Visa Card";
            }else if(americanExpCardRegex.test(cardNo)){
            cardName="American Express Card";
            }
            if(!cardName)
            {
                this.setState({isvalid: false, cardErroMsg: 'Enter valid card number'});
            }else{
                this.setState({isvalid: true, cardErroMsg: ''});
            }
            this.setState({card_no: cardNo});
        }else{
            this.setState({isvalid: false, cardErroMsg: 'Enter valid card number', card_no: ''});
        }
    }else{
        this.setState({isvalid: true, cardErroMsg: '', card_no: cardNo});
    }
  }

  handlebank = (name, icon) =>{
    this.setState({selectedBank: name, myBank:{name: name, icon: icon }});
    console.log("name ------------------>", name);
  }

  replaceMiddle(string, n) {
    let str;
    if (n > 0) {
        str = string.replace(/^(\+?[\d]{2})\d+(\d{4})$/g, "$1****$2");
    } else {
        str = string.replace(/^(\+?[\d]{0})\d+(\d{4})$/g, "$1XXXXXX$2");
    }
    return str
}

  render() {
    const { isLoading, banks } = this.props
    const { selectedBank, status, bankDetails, account_holder_name, account_no, ifsc } = this.state
    const aAcNumber = this.replaceMiddle(account_no?account_no.toString():'', 2);
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
                <title>Enach </title>
                <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            {isLoading?(
                    <div className="loading">Loading&#8230;</div>
            ):''}
            <section className='bg-light'>
              <div className='container-fluid'>
                  <div className='row justify-content-center'>
                      <div className='col-sm-3 bg-enach px-lg-5'>
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
                      <div className='col-sm-9 mt-5 px-lg-6 py-lg-3 pb-lg-5' >
                          <div className='w-100 mb-5 c_p_m_b pb-4'>
                            <div className='form_header px-3 py-4'>
                                <h4 className='text-center m-0 form_header_h4'>Auto Pay</h4>
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

                            <hr/>

                            <div className='row justify-content-center py-4'>
                              <div className='col-sm-10'>
                                <p className='font-weight-medium text-center'>Set up auto-pay and we automatically debit your account on due dates </p>

                                <div className='top_btn_wrap  mb-3'>
                                  <div className='row mx-0'>
                                    <div className='col-lg-4 mb-3'>
                                      <button className='top_btn clr1'><span>01</span>Enter details <img src={asset+"images/icons/cv01.png"} className='mr-3'/></button></div>
                                    <div className='col-lg-4 mb-3'><button className='top_btn clr2'><span>02</span> Sign via OTP <img src={asset+"images/icons/cv02.png"} className='mr-3'/></button></div>
                                    <div className='col-lg-4 mb-3'><button className='top_btn clr3'><span>03</span> Give Consent <img src={asset+"images/icons/cv03.png"} className='mr-3'/></button></div>
                                  </div>
                                </div>
                              {status ===1?(
                                <>
                                  <div className='col-sm-12 text-center'>
                                    <div className='bank_d_wrap  mb-5'>
                                      <div className='row align-items-center mx-0'>
                                          <div className='col-lg-4 border-right text-center'>
                                          <span className='bank_d font-weight-medium d-flex align-items-center justify-content-center'>
                                                    <img src={bankDetails && bankDetails.bank_icon?bankDetails.bank_icon:asset+'images/bank-icon/bank-1.png'} className='mr-2' style={{"width":"30px"}}/>
                                                    {bankDetails && bankDetails.bank_name?`${bankDetails.bank_name}`:'ICICI'}
                                                  </span>
                                          </div>
                                          <div className='col-lg-4 border-right text-center'>
                                            <span className='bank_d'>
                                            Account Number: {aAcNumber}
                                            </span>
                                            </div>
                                          <div className='col-lg-4 text-center'>
                                            <span className='bank_d'>
                                            IFSC code: {ifsc}
                                            </span>
                                            </div>
                                      </div>
                                    </div>
                                      <img src={asset+'images/orders/check-circel-tick.png'} className='mb-3' alt="success" />
                                      <h1>Verified</h1>
                                      <p>Awesome! We have verified your account successfully</p>
                                      <div className='row mt-5'>
                                          <div className='col-sm-12 text-center'>
                                              <button
                                                  type='submit'
                                                  className='d-inline-block continue-btn'
                                                  onClick={() => this.props.history.push("/home")}
                                              >
                                                  Continue
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                                </>
                              ):(
                              <div className='enach-wrap'>

                              <div className='b_c_a_tabs'>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                    <button type='button' data-target="dc" className='active'>
                                      <img src={asset+"images/icons/debit-card.png"} className='mr-3'/>
                                      Debit Card</button>
                                    </div>
                                    <div className='col-lg-6'>
                                        <button type='button' data-target="nb">
                                        <img src={asset+"images/icons/netbanking.png"} className='mr-3'/>
                                        Net Banking</button> 
                                    </div>
                                </div>
                              </div> 


                              <div className='b_c_a_tabs_conteiner px-5 py-4'>
                                <div className='b_c_a_tabs_content' id="dc">
                                  {/*  <div className='row'>
                                        <div className='col-lg-6'>
                                        <div className='label'>
                                            <input type="text" placeholder=''/>
                                            <span>Card Number</span>
                                        </div>
                                        </div>
                                        <div className='col-lg-6'>
                                        <div className='label'>
                                            <input type="text" placeholder=''/>
                                            <span>Name of the card</span>
                                        </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                        <div className='label'>
                                            <input type="text" placeholder=''/>
                                            <span>Expiry Date(MM/YY)</span>
                                        </div>
                                        </div>
                                        <div className='col-lg-6'>
                                        <div className='label'>
                                            <input type="text" placeholder=''/>
                                            <span>CVV</span>
                                        </div>
                                        </div>
                                    </div> */}
                                      <div className='d-flex justify-content-center'>
                                  <div className='d-flex align-items-center'>
       
                                    <span style={{"width":"38px"}} className="d-inline-block mr-1"><img src={bankDetails && bankDetails.bank_icon?bankDetails.bank_icon:asset+'images/bank-icon/bank-1.png'} alt="state-bank" className='img-fluid'/></span>
                                    {account_holder_name?account_holder_name:''} - {aAcNumber?aAcNumber:''}
                                  </div>
                                </div>
                                    <div className='px-3 text-center'>
                                      <p>On clicking continuing, you will redirected our banking partner</p>
                                      <button type="button" onClick={()=>this.handleSubmit('DebitCard')} className="bg_dark cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300">Continue</button>
                                    </div>
                                </div> 

                                <div className='b_c_a_tabs_content' id="nb">
                                  
                                  {/*  <div className='row mb-4'>
                                    {bankData && bankData.length >0 &&(
                                      bankData.map((item, index)=>(
                                      <div key={"bank-"+index} onClick={()=>this.handlebank(item.bank_name, item.bank_icon)} className={`col-2 text-center bank ${selectedBank === item.bank_name?'active':''}`}>
                                        <div className='bank_logo mb-2'>
                                          <img src={item.bank_icon}/>
                                        </div>
                                        {item.bank_name}
                                      </div>
                                      )))}
                                  </div> */}
                                  {/*  <div className='row'>
                                    <div className='col px-lg-4'>
                                        <div className="search__">
                                            <Select 
                                                options={bankOptions}
                                                placeholder="Search your bank"
                                                name="bank"
                                                onChange={this.brandChange}
                                            />
                                          <input 
                                              name='sub_search'
                                              placeholder='Search your bank'/>
                                          <button className='bg-transparent'>
                                          <i className="fa fa-search" aria-hidden="true"></i> 
                                          </button>
                                        </div>
                                    </div>
                                  </div> */}
                                    <div className='d-flex justify-content-center'>
                                    <div className='d-flex align-items-center'>
                                      <span style={{"width":"38px"}} className="d-inline-block mr-1"><img src={bankDetails?bankDetails.bank_icon:''} alt="state-bank" className='img-fluid'/></span>
                                      {account_holder_name?account_holder_name:''} - {aAcNumber?aAcNumber:''}
                                    </div>
                                  </div>
                                  <div className='px-3 text-center'>
                                      <p>On clicking continuing, you will redirected our banking partner</p>
                                      <button type="button" onClick={()=>this.handleSubmit('NetBanking')} className="bg_dark cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300">Continue</button>
                                  </div>
                                </div> 
                              </div>

                              </div> 
                              )}
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
                    </div>
                </div>
            </section>
           </>
    );
  }
}

function mapStateToProps(state) {
  const { banks } = state.user;
  const { salesForceToken, user, isLoading, sfid } = state.auth;
  return {
      salesForceToken,
      banks,
      sfid,
      user,
      isLoading
  };
}


export default connect(mapStateToProps) (ManualEnach2);
