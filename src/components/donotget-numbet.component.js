import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { asset } from "../common/assets";

class Dontgetotp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      fname: "",
      lname: "",
      email: "",
      password: "",
      phone: localStorage.getItem('mobile'),
      successful: false,
      isDisabled: true,
    };
  }

  textMe = () => {
    const { history } = this.props;
    history.push("/login");
  }

  editMobile = () => {
    const { history } = this.props;
    history.push("/login");
  }

  render() {
    const { history } = this.props;

    return (
      <section className="bg0">
        <div className="container-zero">
          <div className="flex-w flex-tr">
            <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md primary-card" >
              <div className="d-flex flex-column">
                <div className="textpart">
                  <h4 onClick={() => history.push('/home')} className="mtext-105 cl2 txt-left p-b-30 cursor-point">eduvanz.</h4>
                  <h1 className="titfnt">
                    <span className="d-block">Welcome</span>
                    back!
                  </h1>
                </div>
                <div className="login-img">
                  <img src={asset+"images/login-left2.png"} />
                </div>
              </div>
            </div>
            <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
              <div className="loginform">
                <div className="cl2 txt-center p-b-30 form-title form-primary-card" >
                  <h4 className="mtext-114">
                    <img src={asset+"images/key.png"} /> Didn't get the OTP?
                  </h4>
                </div>
                <form>
                  <div className="row">
                    <div className="col-md-12 text-center">
                      {/* <h3 style={{ fontWeight: '700', fontSize: '20px' }}>We’ve sent the verification code to +91-{this.state.phone}.</h3> */}
                      <h3 className="mb-5 mt-3">Try another option to get OTP </h3></div>
                  </div>
                  <button type="button" onClick={this.textMe} className={"btn border-dark btn-outline-dark rounded-3 mb-4 border-dark fs-15 btn-block py-3"}>
                    Text Me
                  </button>
                  <button type="button" onClick={this.textMe} className={"btn border-dark btn-outline-dark rounded-3 mb-4 border-dark fs-15 btn-block py-3"}>
                    Call Me
                  </button>
                  <button type="button" onClick={this.editMobile} className={"btn border-dark btn-outline-dark rounded-3 mb-4 border-dark fs-15 btn-block py-3"}>
                    Edit mobile number
                  </button>

                </form>
                <div className="pos_abs">
                  <ul className="text_icons">
                    <li><button data-toggle="modal" data-target="#appscanner">
                      Get our App <img src={asset+"images/icons/app-icon.png"} />
                    </button>
                    </li>
                    <li>
                      <Link to="" className="getappsty">
                        Help <img src={asset+"images/icons/qustionmark.png"} />
                      </Link>
                    </li>
                  </ul>

                </div>
                {/* <!-- stride app Modal --> */}
                <div className="modal fade" id="appscanner" tabIndex="-1" role="dialog" aria-labelledby="appscannerTitle" aria-hidden="true">
                  <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content rounded-4 pb-4">
                      <div className="modal-header border-0">
                        <button type="button" style={{ color: 'red', fontSize: '40px', fontWeight: 300 }} className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <h5 className="modal-title font-weight-bold text-center fs-25 mb-4" id="exampleModalLongTitle"> <img src="/images/bell.png" /> Download Stride App</h5>
                      <div className="modal-body px-5">
                        <div className="row mx-0">
                          <div className="col-lg-6">
                            <div className="d-flex justify-content-center align-items-center">
                              <div className="text-center">
                                <img src="/images/scanner.png" />
                                <p>Scan the QR code</p>
                              </div>
                              <p>OR</p>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <form>
                              <div className="row">
                                <div className="col-md-12 m-b-5 how-pos4-parent">
                                  <div className="form-label-group">
                                    <label htmlFor="mobile">Enter Mobile Number</label>
                                    <input type="email" id="mobile" className="form-control rounded-0 border-top-0 border-right-0 border-left-0" />
                                  </div>
                                  <button type="button" onClick={this.textMe} className={"btn border-dark btn-outline-dark rounded-3 my-4 border-dark fs-15 btn-block py-3"}>
                                    Text Me
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Dontgetotp);
