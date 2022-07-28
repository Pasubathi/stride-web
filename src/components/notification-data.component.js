import React, { Component } from "react"
import { connect } from 'react-redux';
import { asset } from "../common/assets"; 

class NotificationData extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <>
        <div className="card border-0 rounded-4 mb-4 bg-active-nofication">
          <div className="card-body p-lg-4">
            <div className="d-lg-flex align-items-center">
              <div className="text-center mb-3 mb-lg-0 ">
                <div className="w-lg-110">
                  <img src={asset+'images/notification/pik.png'}  />
                </div>
              </div>
              <div className="w-100">
                <div className="row mx-0 mt-2">
                  <div className="col-lg-9 col-7">
                    <div className="d-flex align-items-center mb-2">
                      <img src={asset+"images/notification/truck_icon.png"} alt="" />
                      <p className="font-weight-bold fs-14 ml-2 mb-0">Product Shipped</p>
                    </div>
                    <p className="mb-1">Dell 15 (2021) Athlon Silver 3050U, 4GB, 256GB SSD, Win 11 + MS Office '21, AMD Veg... </p>
                    <p className="fs-10">16h ago</p>
                  </div>
                  <div className="col-lg-3 text-right col-5">
                    <button className="btn btn-primary btn-button-signin px-lg-4">View More</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card border-0 rounded-4 mb-4 bg-active-nofication">
          <div className="card-body p-lg-4">
            <div className="d-lg-flex align-items-center">
              <div className="text-center mb-3 mb-lg-0">
                <div className="w-lg-110">
                  <img src={asset+'images/notification/discount.png'}  />
                </div>
              </div>
              <div className="w-100">
                <div className="row mx-0 mt-2">
                  <div className="col-lg-10 col-7">
                    <div className="d-flex align-items-center mb-2">
                      <img src={asset+"images/notification/tag_icon.png"} alt="" />
                      <p className="font-weight-bold fs-14 ml-2 mb-0">Discount Alert</p>
                    </div>
                    <p className="mb-1">Up to 50% discount on education and electronics </p>
                    <p className="fs-10">16h ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card border-0 rounded-4 mb-4 bg-active-nofication">
          <div className="card-body p-lg-4">
            <div className="d-lg-flex align-items-center">
              <div className="text-center mb-3 mb-lg-0">
                <div className="w-lg-110">
                  <img src={asset+'images/notification/tick.png'}  />
                </div>
              </div>
              <div className="w-100">
                <div className="row mx-0 mt-2">
                  <div className="col-lg-10 col-7">
                    <div className="d-flex align-items-center mb-2">
                      <img src={asset+"images/notification/card_icon.png"} alt="" />
                      <p className="font-weight-bold fs-14 ml-2 mb-0">Payment Successful!</p>
                    </div>
                    <p className="mb-1">Your payment for order id ST71822D completed successfully. </p>
                    <p className="fs-10">16h ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card border-0 rounded-4 mb-4">
          <div className="card-body p-lg-4">
            <div className="d-lg-flex align-items-center">
              <div className="text-center mb-3 mb-lg-0">
                <div className="w-lg-110">
                  <img src={asset+'images/notification/tick.png'}  />
                </div>
              </div>
              <div className="w-100">
                <div className="row mx-0 mt-2">
                  <div className="col-lg-10 col-7">
                    <div className="d-flex align-items-center mb-2">
                      <img src={asset+"images/notification/card_icon.png"} alt="" />
                      <p className="font-weight-bold fs-14 ml-2 mb-0">Payment Successful!</p>
                    </div>
                    <p className="mb-1">Your payment for order id ST71822D completed successfully. </p>
                    <p className="fs-10">16h ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card border-0 rounded-4 mb-4">
          <div className="card-body p-lg-4">
            <div className="d-lg-flex align-items-center">
              <div className="text-center mb-3 mb-lg-0">
                <div className="w-lg-110">
                  <img src={asset+'images/notification/alert.png'}  />
                </div>
              </div>
              <div className="w-100">
                <div className="row mx-0 mt-2">
                  <div className="col-lg-10 col-7">
                    <div className="d-flex align-items-center mb-2">
                      <img src={asset+"images/notification/error_icon.png"} alt="" />
                      <p className="font-weight-bold fs-14 ml-2 mb-0">Payment Failed!</p>
                    </div>
                    <p className="mb-1">Your payment could not processed. Please try again in sometime. </p>
                    <p className="fs-10">16h ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card border-0 rounded-4 mb-4">
          <div className="card-body p-lg-4">
            <div className="d-lg-flex align-items-center">
              <div className="text-center mb-3 mb-lg-0">
                <div className="w-lg-110">
                  <img src={asset+'images/notification/alert.png'}  />
                </div>
              </div>
              <div className="w-100">
                <div className="row mx-0 mt-2">
                  <div className="col-lg-10 col-7">
                    <div className="d-flex align-items-center mb-2">
                      <img src={asset+"images/notification/error_icon.png"} alt="" />
                      <p className="font-weight-bold fs-14 ml-2 mb-0">Payment Failed!</p>
                    </div>
                    <p className="mb-1">Your payment could not processed. Please try again in sometime. </p>
                    <p className="fs-10">16h ago</p>
                  </div>
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

export default connect(mapStateToProps)(NotificationData);
