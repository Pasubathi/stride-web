import React, { Component } from "react"
import PropTypes from 'prop-types';
import { asset } from "../common/assets"; 
import { reduxForm, propTypes } from 'redux-form';
import { OverlayTrigger, Popover } from "react-bootstrap";

class WishListData extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    removeFavProduct = (pid) => {
        this.props.removeProduct(pid);
    }

    handleBuy = (pid) => {
        this.props.handleProBuy(pid)
    }

    render() {
        const { favProduct } = this.props
        return (
            <>
                {favProduct && favProduct.length > 0 && favProduct.map((item, index) => (
                    <div key={`favorite-card-${index}`} className="card border-0 rounded-4 mb-4">
                        <div className="row g-0">
                            <div className="col-md-4 cursor-point" onClick={() => window.location = `/product-details/${item.sfid}`}>
                                <img src={item.image_url__c} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h5 className="card-title">{item && item.name ? item.name : ''}</h5>
                                    <p className="mb-1">No Cost EMI starting </p>
                                    <p className="font-weight-bold">₹ 3,500/mo</p>
                                </div>
                            </div>
                            <div className="col-md-2 ">
                                <div className="mt-4 align-items-center text-center mr-2">
                                    <OverlayTrigger
                                        placement="left"
                                        trigger="click"
                                        overlay={(
                                            <Popover className="border-0 shadow">
                                                <div className="card border-0">
                                                    <div className="card-body py-2 px-4">
                                                        <span className="font-weight-bold"> Remove this item?</span> <button type="button" className="btn btn-dark btn-sm mx-1 px-3">No</button> <button type="button" onClick={() => this.removeFavProduct(item.fav_id)} className="btn btn-sm btn-outline-dark px-3">Yes</button>
                                                    </div>
                                                </div>
                                            </Popover>
                                        )}>
                                        <i className="fa fa-trash-o h5 font-weight-normal mb-0 text-dark" style={{ cursor: 'pointer' }} ></i>
                                    </OverlayTrigger>
                                    <button type="button" onClick={()=>this.handleBuy(item.sfid)} className="mt-2 btn btn-primary btn-button-signin px-lg-4">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    }
}

WishListData.propTypes = {
    ...propTypes,
    favProduct: PropTypes.any,
    removeProduct: PropTypes.func,
    handleProBuy: PropTypes.func,
}

export default reduxForm({ form: 'Favorite-List' })(WishListData);
