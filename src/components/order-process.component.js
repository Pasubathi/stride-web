import React, { Component } from "react"
import Helmet from "react-helmet";
import HeaderNew from "../common/headerNew";
import { connect } from 'react-redux';
import { asset } from "../common/assets";

class OrderProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view : false
    };
  }

  showDetail = ()=>{
    this.setState({view:true})
  }
  hideDetail = ()=>{
    this.setState({view:false})
  }

  render() {
    const { user, username, isSearching, searchDet, isLoading } = this.props
    return (
      <>
        <Helmet>
          <title>Order Process </title>
          <link rel="icon" type="image/png" href="images/icons/favicon.png" />
        </Helmet>
        <HeaderNew
          username={username ? username : ''}
          user={user ? user : ''}
          history={this.props.history}
          isSearching={isSearching}
          searchDet={searchDet}
        />
        <div className="inner-page">
          <div className="container">
            <div className="row mx-0 mt-lg-5">
              <div className="d-flex align-items-start">
                <img src={asset+'images/orders/process.png'} className='d-inline-block' width='32' />
                <div className="ml-3">
                  <h3 className="d-inline-block font-weight-bold mb-3">Order Under Process</h3>
                  <h5 className="font-weight-bold mb-1">Hello Neel,</h5>
                  <p className="">Your Order has been confirmed and will be shipping with next  two days</p>
                </div>
              </div>
            </div>
            <div className="row mx-0 mt-3">
              <div className="col-lg-8 mb-4">
                <div className="card border-0 rounded-1">
                  <div className="card-body p-2 p-lg-5">
                    <div className="row mx-0">
                      <div className="col-lg-3">
                        <img src={asset+'images/orders/laptop.png'} className='' />
                      </div>
                      <div className="col-lg-5">
                        <img src={asset+'images/orders/apple-icon.png'} className='mb-4' />
                        <h4>2021 Apple MacBook Pro(14-inch/35.97cm, Apple m1 pro)</h4>
                        <p className="text-capitalize">Quantity : 1</p>
                        <p className="text-capitalize">offer price : ₹ 1,10000</p>
                        <p className="text-capitalize">Order ID : SJ9821D</p>
                      </div>
                      <div className="col-lg-4">
                        <div className="d-flex align-items-start">
                          <img src={asset+'images/orders/home-location-alt.png'} className='' />
                          <div className="ml-3">
                            <h4>Delivery Address</h4>
                            <p>1206, Jainam elysuim, LBS Road, Near jainam hall, opp bhandup police station Bhandup west, Mumbai - 400078</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <ol className="step-indicator">
                      <li className="active">
                        <div className="step"><img src={asset+'images/orders/vector.png'} className='d-inline-block' /></div>
                        <div className="caption hidden-xs hidden-sm">
                          <div className="d-flex  justify-content-center align-items-center mb-2">
                            <img src={asset+'images/orders/process.png'} className='d-inline-block' width='24' />
                            <h6 className="d-inline-block font-weight-bold mb-0 ml-2">Order Under Process</h6>
                          </div>
                          <div className="">
                            <p className="mb-0">Your Product is being packed</p>
                            <p className="text-center text-muted">March 16, 2022</p>
                          </div>
                        </div>
                      </li>
                      <li className="">
                        <div className="step"><img src={asset+'images/orders/truck.png'} className='d-inline-block' width='62px' /></div>
                        <div className="caption hidden-xs hidden-sm">
                          <div className="d-flex  justify-content-center align-items-center mb-2">
                            <h6 className="d-inline-block font-weight-bold mb-0 ml-2">Product Shipped</h6>
                          </div>
                          <div className="">
                            <p className="mb-0">Your Product is yet to be Shipped </p>
                          </div>
                        </div>
                      </li>
                      <li className="">
                        <div className="step"><img src={asset+'images/orders/home.png'} className='d-inline-block' /></div>
                        <div className="caption hidden-xs hidden-sm">
                          <div className="d-flex  justify-content-center align-items-center mb-2">
                            <h6 className="d-inline-block font-weight-bold mb-0 ml-2">Product Deliverd</h6>
                          </div>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="row mx-0 mt-lg-5 mt-3 align-items-stretch">
                  <div className="col-lg-8 pl-lg-0 mb-3 p-0 pr-lg-3">
                    <div className="card shadow border-0 rounded-1">
                      <div className="card-body">
                        <div className="d-flex align-items-center px-4">
                          <img src={asset+'images/orders/rating.png'} className='d-inline-block' width='80px' />
                          <div className="ml-lg-5 text-center">
                            <h5 className="font-weight-normal mb-3">Rate your experience withour service </h5>
                            <img src={asset+'images/orders/mask_group.png'} className='d-inline-block' width="100%" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 pl-lg-3 mb-3 p-0 pr-lg-0">
                    <div className="card shadow border-0 rounded-1">
                      <div className="card-body text-center">
                        <img src={asset+'images/orders/chat.png'} className='d-inline-block' />
                        <p className="my-4">Need help with anything?</p>
                        <button className="btn btn-outline-dark rounded mb-2">Contact Us</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-3" >
                <div className="p-4" style={{ backgroundImage: `url("${asset}images/orders/union.png")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                  <h2 className="text-capitalize text-center pt-5 px-5 pb-3 mt-3">payment details</h2>
                  <hr className="dotted mb-5" />
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h4 font-weight-normal" >Order Total</p>
                    <p className="h4 font-weight-bold" > ₹ 1,10,000</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h4 font-weight-normal">Amount Paid</p>
                    <p className="h4 font-weight-bold"> ₹ 10,000</p>
                  </div>
                  {this.state.view === true &&
                  <>
                  <hr className="dotted mb-5" />
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-bold">Total Product Cost</p>
                    <p className="h5 font-weight-bold"> ₹ 1,20,000</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Instant Discount</p>
                    <p className="h5 font-weight-bold text-success"> - 10,000</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-bold">Loan Details</p>
                    <p className="h5 font-weight-bold"> ₹ 1,10,000</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Tenure</p>
                    <p className="h5 font-weight-normal"> 12 Months</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Interest</p>
                    <p className="h5 font-weight-normal"> 12%</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Auto-Pay</p>
                    <p className="h5 font-weight-normal"> Active</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">First EMI Due Date</p>
                    <p className="h5 font-weight-normal"> 12/08/2022</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Last EMI Due Date</p>
                    <p className="h5 font-weight-normal">12/08/2023</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-bold">Upfront amount paid</p>
                    <p className="h5 font-weight-bold"> ₹ 1,20,000</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Downpayment</p>
                    <p className="h5 font-weight-normal">₹ 10,000</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Processing Fee</p>
                    <p className="h5 font-weight-normal">₹ 4,000</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Delivery Fee</p>
                    <p className="h5 font-weight-normal">₹ 100</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Reward Points</p>
                    <p className="h5 font-weight-bold text-success">₹ 10,000</p>
                  </div>
                  <div className="text-center">
                    <button className="py-3 h5 text-primary" onClick={this.hideDetail} >View Less Details</button>
                  </div>
                  </>
                  }
                  {this.state.view !== true &&
                  <>
                  <div className="text-center">
                    <button className="py-3 h5 text-primary" onClick={this.showDetail} >View More Details</button>
                  </div>
                  </>
                  }
                  {/* <div className="text-center">
                    <button className="py-3 h5 text-primary" onClick={setView(true)} >View More Details</button>
                    <button className="py-3 h5 text-primary" onClick={setView(true)} >View Less Details</button>
                  </div> */}
                </div>
              </div>
            </div>

          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { user, sfid, username, isLoading } = state.auth;
  const { isSearching, searchDet } = state.product
  return {
    isSearching,
    isLoading,
    searchDet,
    username,
    user,
    sfid
  };
}

export default connect(mapStateToProps)(OrderProcess);
