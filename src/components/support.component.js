import React, { Component } from "react"
import Helmet from "react-helmet";
import HeaderNew from "../common/headerNew";
import { connect } from 'react-redux';
import { asset } from "../common/assets"; 
import $ from "jquery"
import About from "../common/about";

class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
    };
  }

  componentDidMount() {
    $('.fds_accordion .tab').click(function () {
      $(this).parent().siblings().children('.tab').removeClass('show');
      $(this).addClass('show')
      $(this).parent().siblings().children('.content').slideUp();
      $(this).next().slideToggle();

    })
  }

  render() {
    const { user, username, isSearching, searchDet } = this.props
    return (
      <>
        <Helmet>
          <title> Support </title>
          <link rel="icon" type="image/png" href="images/icons/favicon.png" />
        </Helmet>
        <HeaderNew
          username={username ? username : ''}
          user={user ? user : ''}
          history={this.props.history}
          isSearching={isSearching}
          searchDet={searchDet}
        />
        <div className="inner-page support">
          <div className="container mb-5">
            <div className='row'>
              <div className='col-lg-12'>
                <div className='breadCrumb_wrapper pt-3'>
                  <ul className="breadcrumb_menu d-flex flex-wrap">
                    <li><a href="#">Store</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Help & Support</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="d-lg-flex justify-content-between align-items-center mt-3">
              <div className="col-lg-6 p-0">
                <h3>Help & Support</h3>
              </div>
              <div className="col-lg-6 p-0">
                <div className="search___ support">
                  <input
                    name='sub_search'
                    placeholder='Search for the laptop that suits you' />
                  <button className='bg-transparent'>
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
            <h4 className="my-3">Categories</h4>
            <div className="row mx-0 mt-4">
              <div className="col-lg-5 p-0 pr-lg-3">
                <ul className="list-group list-group-flush support">
                  <li className="list-group-item p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <img src={asset+"images/support/packing.png"} className="mr-3" />
                        Order Related
                      </div>
                      <div className="mr-5 angle">
                        <i className="fa fa-angle-right h5 font-weight-bold"></i>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <img src={asset+"images/support/customer.png"} className="mr-3" />
                        General Issues
                      </div>
                      <div className="mr-5 angle">
                        <i className="fa fa-angle-right h5 font-weight-bold"></i>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <img src={asset+"images/support/handshake.png"} className="mr-3" />
                        Partner Onboarding
                      </div>
                      <div className="mr-5 angle">
                        <i className="fa fa-angle-right h5 font-weight-bold"></i>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <img src={asset+"images/support/exam.png"} className="mr-3" />
                        Legal, Terms & Conditions
                      </div>
                      <div className="mr-5 angle">
                        <i className="fa fa-angle-right h5 font-weight-bold"></i>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item border-bottom p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <img src={asset+"images/support/question.png"} className="mr-3" />
                        FAQs
                      </div>
                      <div className="mr-5 angle">
                        <i className="fa fa-angle-right h5 font-weight-bold"></i>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-lg-7 p-0 pl-lg-3">
                <div className="fds_accordion_wrap support">
                  <div className="fds_accordion">
                    <div className="tab rounded-1">How can I Pay?</div>
                    <div className="content">
                      <p>Your payments are automatically withdrawn from your connected card according to the agreed payment schedule, but you can make early payments anytime you wish.</p>
                      <p>To make a manual payment:</p>
                      <ul className="support list-style-decimal mb-5">
                        <li>Go to Payments </li>
                        <li>Tap Payments and navigate between the purchase/statement you would like to pay</li>
                        <li>Tap Payment options and follow the instructions</li>
                      </ul>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>Was this answer helpful? <img src={asset+"images/support/thumb-down-1.png"} className="mr-2" />  <img src={asset+"images/support/thumb-down-2.png"} /></div>
                        <div><span className="mr-2">Still need help? Contact us</span> <button className="btn btn-dark rounded px-4" data-toggle="modal" data-target="#writetous">Write to us</button></div>
                      </div>
                    </div>
                  </div>
                  <div className="fds_accordion">
                    <div className="tab rounded-1">How can I extend my due date?</div>
                    <div className="content">How can I extend my due date?</div>
                  </div>
                  <div className="fds_accordion">
                    <div className="tab rounded-1">Transmission</div>
                    <div className="content">Transmission</div>
                  </div>
                  <div className="fds_accordion">
                    <div className="tab rounded-1">When is my payment due?</div>
                    <div className="content">When is my payment due?</div>
                  </div>
                  <div className="fds_accordion">
                    <div className="tab rounded-1">What happens if I can’t pay on time?</div>
                    <div className="content">What happens if I can’t pay on time?</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mx-0 mt-5">
              <div className="col-lg-12 mb-4">
                <div className="card border-0 rounded-1 " style={{ background: 'radial-gradient(85.89% 97.41% at 52.05% 56.7%, rgba(246, 214, 206, 0.15) 9.88%, #F6D6CE 85.94%)' }}>
                  <div className="card-body p-0">
                    <div className="row mx-0 justify-content-around">
                      <div className="col-lg-3 position-relative p-0">
                        <img src={asset+"images/support/hand@2x 1.png"} width='400' className="position-lg-absolute bottom-0 w-full-sm" />
                      </div>
                      <div className="col-lg-4 mt-5">
                        <h3>Solve your problems quickly with the Stride app.</h3>
                        <p>Track your delivery, handle returns and manage your payments in the stride app. Get 24/7 help in our chat, come and go, you'll never miss a message. </p>
                        <div className="my-5">
                          <img src={asset+"images/support/apple-store.png"} className="mr-3 mb-3" />
                          <img src={asset+"images/support/g-play.png"} />
                        </div>
                      </div>
                      <div className="col-lg-2 text-center mt-5">
                        <img src={asset+"images/support/qr-code.png"} width='122' />
                        <p className="mx-5 font-weight-bold ">Get the stride app on your phone</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mx-0 mt-3 align-items-center">
              <span className="mr-4 font-weight-bold h5">Still need help? Contact us</span> <button className="btn btn-dark rounded px-4" data-toggle="modal" data-target="#writetous_before_login">Write to us</button>
            </div>
          </div>
          <About />

          <div className="modal fade" id="writetous" tabIndex="-1" role="dialog" aria-labelledby="writetousTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <h4 className="modal-title text-center mb-2 font-weight-bold">Write to us</h4>
                <p className="text-center mx-4 text-dark">Please select your query type and share the details with us. Our team will get back to you within 48 Hrs.</p>
                <div className="modal-body">
                  <form >
                    <div className="form-group">
                      <select className="form-control border-top-0 border-right-0 border-left-0 rounded-0" id="query">
                        <option defaultValue>Select the type of your query</option>
                        <option>Inquiring for Partnership</option>
                        <option>Inquire for Loans</option>
                        <option>Queries regarding repayment of EMI</option>
                        <option>I cannot find my Course / Institute   </option>
                        <option>General Query</option>
                      </select>
                    </div>
                    <div className="form-group position-relative">
                      <textarea className="form-control" id="detail" rows="10" placeholder="Please enter the details of your request. Our support staff will respond as soon as possible."></textarea>
                      <p className="font-weight-bold position-absolute bottom-0 right-0 pr-3"><img src={asset+'images/support/fi-rr-clip.png'} /><span>Attach</span> </p>
                      <p className="font-weight-bold position-absolute bottom-20 right-0 pr-3"><img src={asset+'images/support/fi-rr-document.png'} /><span>payment_deduction_screenshot01.jpeg</span><img src={asset+'images/support/fi-cross-small.png'} /> </p>
                    </div>
                  </form>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-dark" disabled>Submit</button>
                </div>
              </div>
            </div>
          </div>


          <div className="modal fade" id="writetous_before_login" tabIndex="-1" role="dialog" aria-labelledby="writetous_before_loginTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <h4 className="modal-title text-center mb-2 font-weight-bold">Write to us</h4>
                <p className="text-center mx-4 text-dark">Please select your query type and share the details with us. Our team will get back to you within 48 Hrs.</p>
                <div className="modal-body">
                  <form >
                    <div className="form-group">
                      <input type="text" className="form-control border-top-0 border-right-0 border-left-0 rounded-0" id="" placeholder="Enter your full name (Required)" />
                    </div>
                    <div className="form-group">
                      <input type="tel" className="form-control border-top-0 border-right-0 border-left-0 rounded-0" id="" placeholder="Enter your mobile number (Required)" />
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-control border-top-0 border-right-0 border-left-0 rounded-0" id="" placeholder="Enter your email id (Required)" />
                    </div>
                    <div className="form-group">
                      <select className="form-control border-top-0 border-right-0 border-left-0 rounded-0" id="query">
                        <option defaultValue>Select the type of your query</option>
                        <option>Inquiring for Partnership</option>
                        <option>Inquire for Loans</option>
                        <option>Queries regarding repayment of EMI</option>
                        <option>I cannot find my Course / Institute   </option>
                        <option>General Query</option>
                      </select>
                    </div>
                    <div className="form-group position-relative">
                      <textarea className="form-control" id="detail" rows="10" placeholder="Please enter the details of your request. Our support staff will respond as soon as possible."></textarea>
                      <p className="font-weight-bold position-absolute bottom-0 right-0 pr-3"><img src={asset+'images/support/fi-rr-clip.png'} /><span>Attach</span> </p>
                      <p className="font-weight-bold position-absolute bottom-20 right-0 pr-3"><img src={asset+'images/support/fi-rr-document.png'} /><span className="mx-2">payment_deduction_screenshot01.jpeg</span><img src={asset+'images/support/fi-rr-cross-small.png'} /> </p>
                    
                    </div>
                  </form>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-dark" disabled>Submit</button>
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

export default connect(mapStateToProps)(Support);
