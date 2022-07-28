import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { asset } from "../common/assets";
import { reduxForm, propTypes } from 'redux-form';
import { getProfileById } from "../actions/user";

class ProfileSidebar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            path: ''
        }
    }

    componentDidMount()
    {
        const pathArray = window.location.pathname.split("/");
        const segment_1 = pathArray[1];
        this.setState({path: segment_1});
    }

    handleLogOut = () =>
    {
        localStorage.clear();
        window.location = "/login"
    }

    componentDidUpdate(prevProps)
    {
        const { user } = this.props
        if(!prevProps.profile)
        {
            let data = {
                id: user,
            }
            this.props.dispatch(getProfileById(data));
        }
    }


    render() {
        const { history, profile, recentProd } = this.props
        const { path } = this.state
        let userdetails = profile && profile.profile ? profile.profile : ''
        let proPic = profile && profile.photo && profile.photo.base64 ? profile.photo.base64 : ''
        return (
            <>
            <div className="col-lg-3 pl-lg-0 mb-3 mb-lg-0">
                    <div className="card rounded-4 border border-white bg-wish-card">
                        <div className="card-body p-lg-4">
                            <div className="text-center">
                                <div className=' user-avator'>
                                {profile && profile !== undefined && profile.length > 0 ?
                                    (<img src={`data:image/jpg;base64,${proPic.base64}`} className="object-cover" />) :
                                    (
                                        <img src={asset+"images/default_profile.png"} className="object-cover" />
                                    )
                                }
                                </div>
                               
                                <h5 className="mt-3 font-weight-bold">{userdetails && userdetails.first_name__c ? userdetails.first_name__c : ''}</h5>
                            </div>
                            <div className="my-5">
                                {userdetails && userdetails.phone && (
                                <div className="d-flex align-items-center mb-4">
                                    <img src={asset+'images/wishlist/phone_icon.png'} className='mr-3' />
                                    <h5 className="mb-0">{userdetails.phone}</h5>
                                </div>
                                )}
                                {userdetails && userdetails.email__c && (
                                <div className="d-flex align-items-center mb-4">
                                    <img src={asset+'images/wishlist/mail_icon.png'} className='mr-3' />
                                    <h5 className="mb-0 ">{userdetails.email__c}</h5>
                                </div>
                                )}
                            </div>
                            <hr />
                            {recentProd && recentProd !== undefined && recentProd.length > 0 && (
                            <>
                            <div className="my-5">
                                <h5 className="mb-3">Recent History</h5>
                                {recentProd.map((item, index) => (
                                    <p key={`item-recent-${index}`} className="rounded-pill bg-rec py-2 px-3 text-dark fs-13 font-weight-bold mr-2 d-line-block mb-3">{item.search__c.slice(0, 15)}</p>
                                ))}
                            </div>
                            <hr />
                            </>
                            )}
                            <div className="my-5">
                                <ul className="cursor-point list-group list-group-flush wish-list bg-transparent sidebar_menu">
                                    <li  onClick={() => history.push('/dashboard')} className={`profile list-group-item border-0 rounded-3 mb-2 position-relative ${path ==="dashboard"?"active":""}`}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                Profile
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li className={`order cursor-point list-group-item border-0  rounded-3 mb-2 position-relative ${path ==="order"?"active":""}`}>
                                        <div className="d-flex justify-content-between align-items-center">
                                           {/*  <div className="red-dot"></div> */}
                                            <div>
                                                Order
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li onClick={() => history.push('/wish-list')} className={`wishlist cursor-point list-group-item border-0  rounded-3 mb-2 position-relative ${path ==="wish-list"?"active":""}`}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                Wishlist
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li onClick={() => history.push('/notification')} className={`notification cursor-point list-group-item border-0  rounded-3 mb-2 position-relative ${path ==="notification"?"active":""}`}>
                                        {/* <div className="red-dot"></div> */}
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                Notifications
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li onClick={() => history.push('/support')} className={`support cursor-point list-group-item border-0  rounded-3 mb-2 position-relative ${path ==="support"?"active":""}`}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                Support
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li className={`settings cursor-point list-group-item border-0  rounded-3 mb-2 position-relative ${path ==="settings"?"active":""}`}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                Settings
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li onClick={this.handleLogOut} className="logout cursor-point list-group-item border-0  rounded-3 mb-2 position-relative">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                Logout
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
           </>
        )
    }
}

ProfileSidebar.propTypes = {
    ...propTypes,
    username: PropTypes.string,
    history: PropTypes.any,
    profile: PropTypes.any,
    recentProd: PropTypes.any,
    user: PropTypes.any
}

export default reduxForm({form: 'Profile'})(ProfileSidebar);