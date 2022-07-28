import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
class Compare extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            category: null,
            subCategory: null,
            compareLabelsLaptop:[
                {name:'Battery',key:'battery__c'},
                {name:'Cache',key:'cache__c'},
                {name:'Camera Specifications',key:'camera_specifications__c'},
                {name:'Color',key:'color__c'},
                {name:'Connectivity Specifications',key:'connectivity_specifications__c'},
                {name:'Core',key:'core__c'},
                {name:'Delivery Mode',key:'delivery_mode__c'},
                {name:'Delivery Tax',key:'delivery_tat__c'},
                {name:'Dimensions',key:'dimensions__c'},
                {name:'Display Specifications',key:'display_specifications__c'},
                {name:'Exchange',key:'exchange__c'},
                {name:'Generation',key:'generation__c'},
                {name:'Graphics',key:'graphics__c'},
                {name:'Image',key:'image_url'},
                {name:'Keyboard_Specifications__c',key:'keyboard_specifications__c'},
                {name:'Memory',key:'memory__c'},
                {name:'Merchant Name',key:'merchant_name__c'},
                {name:'Model Name Number',key:'model_name_number__c'},
                {name:'MOP',key:'mop__c'},
                {name:'MRP',key:'mrp__c'},
                {name:'Name',key:'name'},
                {name:'Keyboard_Specifications__c',key:'keyboard_specifications__c'},
                {name:'Network Support',key:'network_support__c'},
                {name:'Operating System',key:'operating_system__c'},
                {name:'Overview of the product',key:'overview_of_the_product__c'},
                {name:'Package Inclusion',key:'package_inclusion__c'},
                {name:'Processor',key:'processor__c'},
                {name:'Product Rating',key:'product_rating__c'},
                {name:'RAM',key:'ram__c'},
                {name:'RAM Bus Speed',key:'ram_bus_speed__c'},
                {name:'Screen Size',key:'screen_size__c'},
                {name:'Seller Information',key:'seller_information__c'},
                {name:'Series',key:'series__c'},
                {name:'SSD',key:'ssd__c'},
                {name:'Stock Unit',key:'stockkeepingunit'},
                {name:'Stoage Size',key:'storage_size__c'},
                {name:'URL',key:'url__c'},
                {name:'Utility',key:'utility__c'},
                {name:'Video URL',key:'video_url__c'},
                {name:'Warranty Available',key:'warranty_available__c'},
                {name:'Weight',key:'weight__c'},
            ],
            compareLabelsMobile:[
                {name:'Battery',key:'battery__c'},
                {name:'Cache',key:'cache__c'},
                {name:'Camera Specifications',key:'camera_specifications__c'},
                {name:'Color',key:'color__c'},
                {name:'Connectivity Specifications',key:'connectivity_specifications__c'},
                {name:'Core',key:'core__c'},
                {name:'Delivery Mode',key:'delivery_mode__c'},
                {name:'Delivery Tax',key:'delivery_tat__c'},
                {name:'Dimensions',key:'dimensions__c'},
                {name:'Display Specifications',key:'display_specifications__c'},
                {name:'Exchange',key:'exchange__c'},
                {name:'Generation',key:'generation__c'},
                {name:'Graphics',key:'graphics__c'},
                {name:'Keyboard Specifications',key:'keyboard_specifications__c'},
                {name:'Memory',key:'memory__c'},
                {name:'Merchant Name',key:'merchant_name__c'},
                {name:'Model Name Number',key:'model_name_number__c'},
                {name:'MOP',key:'mop__c'},
                {name:'MRP',key:'mrp__c'},
                {name:'Name',key:'name'},
                {name:'Network Support',key:'network_support__c'},
                {name:'Operating System',key:'operating_system__c'},
                {name:'Overview of the product',key:'overview_of_the_product__c'},
                {name:'Package Inclusion',key:'package_inclusion__c'},
                {name:'Processor',key:'processor__c'},
                {name:'Product Rating',key:'product_rating__c'},
                {name:'RAM',key:'ram__c'},
                {name:'RAM Bus Speed',key:'ram_bus_speed__c'},
                {name:'Screen Size',key:'screen_size__c'},
                {name:'Seller Information',key:'seller_information__c'},
                {name:'Series',key:'series__c'},
                {name:'SSD',key:'ssd__c'},
                {name:'Stock Unit',key:'stockkeepingunit'},
                {name:'Stoage Size',key:'storage_size__c'},
                {name:'URL',key:'url__c'},
                {name:'Utility',key:'utility__c'},
                {name:'Video URL',key:'video_url__c'},
                {name:'Warranty Available',key:'warranty_available__c'},
                {name:'Weight',key:'weight__c'},
            ]

        }
    }

    componentDidMount()
    {
        const { selected } = this.props
        const row = selected && selected.length > 0?selected[0]:null;
        this.setState({
            category: row && row.product_category__c?row.product_category__c:null,
            subCategory: row && row.product_sub_category__c?row.product_sub_category__c:null,
        });
    }

    render()
    {
        const { selected } = this.props
        const { category, subCategory } = this.state
        return(
            <>
            {/* banner */}
            <div className="pdesc-banner before-d-none">
                <div className="inner-page">
                    <div className="container banner-content">
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='breadCrumb_wrapper pt-3'>
                                    <ul className="breadcrumb_menu d-flex flex-wrap">
                                        <li><a href="#">Store</a></li>
                                        {category && (<li><a href="#">{category}</a></li>)}
                                        {subCategory && (<li><a href="#">{subCategory}</a></li>)}
                                        <li>Compare Products</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* banner */}
            <div className='inner-page'>
            <div className='container'>
                <div className='row mb-4'>
                    <div className='col-12'>
                            <h4 className='mb-4'>Compare Products</h4>
                            <div className='compare-section'>
                            <table>
                            <thead>
                                    <tr>
                                    <th>
                                        <div className='addToCompareBox'>
                                            <p className='text-left'>Product Name</p>
                                            <p className='text-left'>Offer Price</p>
                                        </div>
                                    </th>
                                    {selected && selected.length > 0 && (
                                        selected.map((item, index) => (
                                            <th key={`offer-${index}`}>
                                                <div className='addToCompareBox'>
                                                    <button type='button' onClick={() => this.props.handleRemoveCompare(item)} className="close">
                                                        <img src="/images/icons/icon-close2.png" alt="upgard" className="img-fluid"/>
                                                    </button>
                                                    <div className='pro-img'>
                                                        <img src={`${item.image_url__c && item.image_url__c.length > 0 && item.image_url__c[0].base64 ? "data:image/jpg;base64," + item.image_url__c[0].base64 : "/images/products/lap-01.png"}`} alt="upgard" className="img-fluid"/>
                                                    </div>
                                                    <p>{item.name.slice(0, 15)}</p>
                                                    <h5>
                                                        <small className='d-block mb-2'>EMI Starting</small>
                                                        ₹3,000/month
                                                    </h5>
                                                    <button type='button' onClick={() => this.props.handleBuy(item.sfid)} className='apply-btn'>Buy Now</button>
                                                    <p className='mt-3'>Stride Price ₹{item.mrp__c} </p>
                                                </div>
                                            </th>
                                        ))
                                    )}
                                    <th>
                                        <div className='addToCompareBox'>
                                                <button type='button' onClick={this.props.handleAddProduct} className='atc_btn'>
                                                    <span>+</span>
                                                    <p>Add to compare</p>
                                                </button>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='addToCompareBox'>
                                            <button type='button' onClick={this.props.handleAddProduct} className='atc_btn'>
                                                <span>+</span>
                                                <p>Add to compare</p>
                                            </button>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.props.comingFrom === "Laptop" &&
                                this.state.compareLabelsLaptop.map((label,index)=>(
                                    <tr>
                                        <td>{label.name}</td>
                                        {selected && selected.length > 0 && (
                                            selected.map((item, index) => (
                                                <td key={`${label.key}-${index}`}>{item[label.key]?item[label.key]:''}</td>
                                            )))}
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))
                            }
                              {this.props.comingFrom === "Mobile" &&
                                this.state.compareLabelsMobile.map((label,index)=>(
                                    <tr>
                                        <td>{label.name}</td>
                                        {selected && selected.length > 0 && (
                                            selected.map((item, index) => (
                                                <td key={`${label.key}-${index}`}>{item[label.key]?item[label.key]:''}</td>
                                            )))}
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))
                            }
                             </tbody>
                            </table>
                            </div>
                    </div>
                </div>
                
            </div>
            </div>
        </>
        );
    }


}
Compare.propTypes = {
    ...propTypes,
    selected: PropTypes.any,
    handleRemoveCompare: PropTypes.func,
    handleBuy: PropTypes.func,
    handleAddProduct: PropTypes.func,
}

export default reduxForm({form: 'Compare'})(Compare);