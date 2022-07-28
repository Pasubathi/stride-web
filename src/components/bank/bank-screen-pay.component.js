import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { asset } from "../../common/assets";
import Header from "../../common/header";
import { getUserProduct, getPlanById } from "../../actions/payment";
import { updatePaymentData, getProductById, sendUserOtp, getAddress, addressUpdate, updateUserRent, updateAddressById, getAccountProfile } from "../../actions/user";
import { verifyUserOtp, updatePreviousPath } from "../../actions/auth";
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow, Marker } from 'react-google-maps'

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import Geocode from "react-geocode";
const MAP_API_KEY = process.env.REACT_APP_MAP_API_KEY;
const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;
Geocode.setApiKey(GEO_API_KEY);
Geocode.enableDebug();

class BankScreenPay extends Component {

    constructor() {
        super()
        this.state = {
            logId: null,
            selectedAddress: null,
            editId: null,
            mobile: null,
            email: null,
            username: null,
            address: '',
            house: '',
            street: '',
            road: '',
            city: '',
            area: '',
            state: '',
            pincode: '',
            viewResend: false,
            statesData: ["Tamil Nadu", "Delhi", "Asam"],
            citiesData: ['Chennai'],
            onBording: 0,
            zoom: 15,
            height: 400,
            timer: '00:18',
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
            errorMsg: null,
            downpayment: null,
            gmapsLoaded: false,
            mapPosition: {
                lat: 13.0827,
                lng: 80.2707,
            },
            markerPosition: {
                lat: 13.0827,
                lng: 80.2707,
            },
            isMapEnable: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleOtpChange = this.handleOtpChange.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.textInput1 = React.createRef();
        this.textInput2 = React.createRef();
        this.textInput3 = React.createRef();
        this.textInput4 = React.createRef();
    }

    initMap = () => {
        this.setState({
            gmapsLoaded: true,
        })
    }

    async componentDidMount() {
        const { sfid, history, user, dispatch, selectedplan, selectedAddress, productId, plan_id, product_id } = this.props
        if(!sfid)
        {
            const path = window.location.pathname;
            dispatch(updatePreviousPath(path));
            history.push("/login");
        }
        let data = {
            user_sfid: sfid,
        }
        await dispatch(getUserProduct(data));
        await dispatch(getAddress(data));
        let obj = {
            plan_id: plan_id
        }
        await dispatch(getPlanById(obj)).then((response) => {
            if (response.status === "success") {
                let getData = response.data;
                console.log("downpayment", getData.down_payment__c);
                this.setState({ downpayment: getData.down_payment__c ? getData.down_payment__c : 0 })
            }
        });
        let userDet = {
            user_sfid: sfid
        }
        await dispatch(getAccountProfile(userDet)).then((response) => {
            if (response.status === "success") {
                this.setState({ username: response && response.accountDet?response.accountDet.first_name__c:'',mobile: response && response.accountDet?response.accountDet.phone:'', email: response && response.accountDet?response.accountDet.email__c:'' });
            }
        });
        let proObj = {
            sfid: product_id,
        }
        this.props.dispatch(getProductById(proObj));
        window.initMap = this.initMap
        const gmapScriptEl = document.createElement(`script`)
        gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&libraries=places&callback=initMap`
        document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)

        $('.resend-btn').on('click', function () {
            $(this).parent('.send-otp-fillup-section').hide();
            $('.send-otp-section').fadeIn();
        })

        $('.detectLocation').on('click', function () {
            $('#allAddress, #addressForm').hide();
            $('#locationMap').show();
        })

        $('.enterManually').on('click', function () {
            $('#allAddress, #locationMap').hide();
            $('#addressForm').show();

        })

        $('.addressForm input').change(function () {
            var $this = $(this);
            if ($this.val())
                $this.addClass('filled')
            else
                $this.removeClass('filled')
        })
        $('.select-style select').change(function () {
            var $this = $(this);
            if ($this.val())
                $this.addClass('filled')
            else
                $this.removeClass('filled')
        })
    }

    inputfocus = (elmnt, getvalue) => {
        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
            const next = elmnt.target.tabIndex - 2;
            if (next > -1) {
                console.log("next", next);
                this.reverseFocueInputS(next);
            }
        }
        else {
            const pattern = /^[0-9]$/;
            if (pattern.test(elmnt.target.value)) {
                const next = elmnt.target.tabIndex;
                if (next < 4) {
                    console.log("else next", next);
                    this.focueInputS(next);
                }
            } else {
                this.setState({ [getvalue]: '' });
                document.getElementById(getvalue).value = '';
            }
        }

    }

    reverseFocueInputS = (next) => {
        if (next === 2) {
            this.textInput3.current.focus();
        } else if (next === 1) {
            this.textInput2.current.focus();
        } else if (next === 0) {
            this.textInput1.current.focus();
        }
    }

    focueInputS = (next) => {
        console.log("next----------------->", next);
        if (next === 1) {
            this.textInput2.current.focus();
        } else if (next === 2) {
            this.textInput3.current.focus();
        } else if (next === 3) {
            this.textInput4.current.focus();
        }
    }

    startTimer() {
        var presentTime = this.state.timer;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = this.checkSecond((timeArray[1] - 1));
        if (s == 59) { m = m - 1 }
        if (m === '00' && s === '00') {
            this.setState({ viewResend: true });
        }
        if (m < 0) {
            return
        }
        this.setState({ timer: m + ":" + s });
        setTimeout(this.startTimer, 1000);
    }

    checkSecond(sec) {
        if (sec < 10 && sec >= 0) { sec = "0" + sec };
        if (sec < 0) { sec = "59" };
        return sec;
    }

    refereshAddress = async () => {
        console.log("Referesh Called");
        const { user, dispatch } = this.props
        let data = {
            id: user,
        }
        await dispatch(getAddress(data));
    }

    handleUpdateAddressId = () => {
        const { dispatch, user } = this.props;
        let data = {
            address_id: this.state.selectedAddress,
            id: user
        }
        dispatch(updateUserRent(data)).then((response) => {
            if (response === "success") {
                this.refereshAddress();
                $("#close-addess").trigger("click");
            }
        });
    }

    handlePlacesChange = address => {
        this.setState({ address });
    };


    handleEditAddress = (getData) => {
        let cityData = this.state.citiesData;
        let stateData = this.state.statesData;
        if (!cityData.includes(getData.city__c)) {
            cityData.push(getData.city__c);
            this.setState({ citiesData: cityData });
        }
        if (!stateData.includes(getData.state__c)) {
            stateData.push(getData.state__c);
            this.setState({ statesData: stateData });
        }
        this.setState({
            editId: getData.id,
            address: getData.address__c,
            city: getData.city__c,
            state: getData.state__c,
            pincode: getData.pincode__c
        });
    }

    handleAddresSelect = async () => {
        const { dispatch, user } = this.props;
        let data = {
            address: `${this.state.house ? this.state.house : '0'}${this.state.street ? "," + this.state.street : ''}${this.state.road ? "," + this.state.road : ''}`,
            address1: `${this.state.area ? this.state.area : ''}`,
            state: this.state.state,
            city: this.state.city,
            pincode: this.state.pincode,
            id: user
        }
        dispatch(addressUpdate(data)).then(async (response) => {
            if (response === "success") {
                await this.refereshAddress();
                $("#close-addess").trigger("click");
            }
        });
    }

    handleOtpChange(value1, event) {
        this.setState({ [value1]: event.target.value, errorMsg: '' });
        if (value1 === "otp4" && event.target.value) {
            this.handleSubmitotp(event.target.value);
        }

    }

    handleSubmitotp = (otp4) => {
        const { otp1, otp2, otp3 } = this.state
        const { history, dispatch, plan_id, product_id } = this.props;
        if (otp1 && otp2 && otp3) {
            const givenOtp = parseInt(this.state.otp1 + this.state.otp2 + this.state.otp3 + otp4);
            let data = {
                otp: givenOtp,
                logId: this.state.logId
            }
            dispatch(verifyUserOtp(data))
                .then((response) => {
                    if (response.status === 'success') {
                        this.setState({
                            otp1: '',
                            otp2: '',
                            otp3: '',
                            otp4: ''
                        });
                        console.log("downpayment", this.state.downpayment);
                        if (this.state.downpayment) {
                            history.push(`/ed_payment/${product_id}/${plan_id}`);
                        } else {
                            history.push(`/payment_success`);
                        }

                    } else {
                        this.setState({ errorMsg: true });
                    }
                });
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => results[0])
            .then((getData) => {
                const address = getData.formatted_address,
                    addressArray = getData.address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray),
                    house = this.streetNumber(addressArray),
                    road = this.getRoad(addressArray),
                    nagar = this.getNagar(addressArray),
                    pincode = this.getPincode(addressArray);
                var reHouse = `${house}${road ? "," + road : ''}${nagar ? "," + nagar : ""}`;
                var trimmed = reHouse.split(',').slice(1);
                this.setState({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                    house: trimmed,
                    street: (road) ? road : '',
                    road: (nagar) ? nagar : '',
                    pincode: (pincode) ? pincode : ''
                })
            }).catch(error => console.error('Error', error));
    };

    detectMyAddress = () => {
        this.setState({ isMapEnable: true });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    mapPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    markerPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                },
                    () => {
                        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                            response => {
                                const address = response.results[0].formatted_address,
                                    addressArray = response.results[0].address_components,
                                    city = this.getCity(addressArray),
                                    area = this.getArea(addressArray),
                                    state = this.getState(addressArray),
                                    house = this.streetNumber(addressArray),
                                    road = this.getRoad(addressArray),
                                    nagar = this.getNagar(addressArray),
                                    pincode = this.getPincode(addressArray);
                                console.log('city', city, area, state);
                                this.setState({
                                    address: (address) ? address : '',
                                    area: (area) ? area : '',
                                    city: (city) ? city : '',
                                    state: (state) ? state : '',
                                    house: (house) ? house : '',
                                    street: (road) ? road : '',
                                    road: (nagar) ? nagar : '',
                                    pincode: (pincode) ? pincode : '',
                                })
                            },
                            error => {
                                console.error(error);
                            }
                        );

                    })
            });
        } else {
            console.error("Geolocation is not supported by this browser!");
        }
    }

    hendleManualAddress = async () => {
        const { history, dispatch, user, selectedAddress } = this.props;
        const { editId } = this.state
        let data = {
            address_id: editId,
            type: "Manual",
            address: `${this.state.house ? this.state.house : '0'}${this.state.street ? "," + this.state.street : ''}${this.state.road ? "," + this.state.road : ''}`,
            address1: `${this.state.area ? this.state.area : ''}`,
            state: this.state.state,
            city: this.state.city,
            pincode: this.state.pincode,
            id: user
        }
        if (editId > 0) {
            dispatch(updateAddressById(data)).then(async (response) => {
                if (response === "success") {
                    await this.refereshAddress();
                    $("#close-addess").trigger("click");
                }
            });
        } else {
            dispatch(addressUpdate(data)).then(async (response) => {
                if (response === "success") {
                    await this.refereshAddress();
                    $("#close-addess").trigger("click");
                }
            });
        }
    }

    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat();
        let newLng = event.latLng.lng();
        console.log("newLat", newLat);
        console.log("newLng", newLng);
        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray),
                    house = this.streetNumber(addressArray),
                    road = this.getRoad(addressArray),
                    nagar = this.getNagar(addressArray),
                    pincode = this.getPincode(addressArray);

                this.setState({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                    house: (house) ? house : '',
                    street: (road) ? road : '',
                    road: (nagar) ? nagar : '',
                    pincode: (pincode) ? pincode : '',
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                })
            },
            error => {
                console.error(error);
            }
        );
    }

    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };

    streetNumber = (addressArray) => {
        let streenNumber = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'street_number' === addressArray[i].types[0]) {
                streenNumber = addressArray[i].long_name;
                return streenNumber;
            }
        }
    };

    getRoad = (addressArray) => {
        let road = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'route' === addressArray[i].types[0]) {
                road = addressArray[i].long_name;
                return road;
            }
        }
    };

    getNagar = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_2' === addressArray[i].types[j] || 'political' === addressArray[i].types[j] || 'sublocality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };

    getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };

    getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };

    getPincode = (addressArray) => {
        let pincode = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'postal_code' === addressArray[i].types[0]) {
                    pincode = addressArray[i].long_name;
                    return pincode;
                }
            }
        }
    };

    handleBack = () => {
        const { history, product_id } = this.props
        history.push('/edplans/' + product_id);
    }

    handleAddressSelect = (id) => {
        this.setState({ selectedAddress: id });
    }

    handleAddress = () => {
        this.setState({
            editId: null,
            address: null,
            city: null,
            state: null,
            pincode: null
        });
        $('#locationMap, #addressForm').hide();
        $('#allAddress').show();
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

    handleSendOtp = () => {
        const { user, dispatch } = this.props
        let data = {
            id: parseInt(user)
        }
        $('.send-otp-section').hide();
        $('.send-otp-fillup-section').fadeIn();
        this.startTimer()
        dispatch(sendUserOtp(data)).then((response) => {
            if (response.status === "success") {
                this.setState({ logId: response.logId });
                $('.send-otp-section').hide();
                $('.send-otp-fillup-section').fadeIn();
            }
        });

    }

    handleResendSendOtp = () => {
        const { user, dispatch } = this.props
        let data = {
            id: parseInt(user)
        }
        this.startTimer()
        dispatch(sendUserOtp(data)).then((response) => {
            if (response.status === "success") {
                this.setState({ logId: response.logId });
                $('.send-otp-section').hide();
                $('.send-otp-fillup-section').fadeIn();
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
  
    async openPayModal()
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
            amount: (this.state.downpayment*100), //100000,
            name: 'Eduvanz',
            description: 'Test Transaction',
            image: 'https://eduvanz-web.herokuapp.com/images/icons/favicon.png',
            "handler": async (response) => {
              console.log("response", response);
              let data = {
                  plan: this.props.plan_id,
                  product_id: this.props.product_id
              }
             await this.props.dispatch(updatePaymentData(data));
             this.props.history.push("/payment_success");
            },prefill: {
                name: this.state.username?this.state.username:'',
                email: this.state.email?this.state.email:'',
                contact: this.state.mobile?this.state.mobile:'',
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

    payNow = (type) =>{
        this.openPayModal();
      }


    render() {
        const { user, product, planData, userAddress, currentAddress, isLoading } = this.props
        const { statesData, citiesData, onBording } = this.state
        const proImages = product && product.images ? product.images[0] : null;
        let strMobile = '';
        let hMobile = '';
        if (this.state.mobile) {
            strMobile = this.replaceMiddle(this.state.mobile, 2);
            hMobile = this.replaceMiddle(this.state.mobile, 0);
        }
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
            >
                <Marker
                    draggable={true}
                    onDragEnd={this.onMarkerDragEnd}
                    position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                >
                    <InfoWindow>
                        <div>{this.state.address}</div>

                    </InfoWindow>
                </Marker>
            </GoogleMap>
        ));

        return (
            <>
                <Helmet>
                    <title>Plan Details</title>
                </Helmet>
                <Header
                    user={user}
                />
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
                <section className="kyc_pages bank_screen">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className='d-flex align-items-center'>
                                    <button type='button' onClick={this.handleBack} className='back-btn rounded-circle mr-3 mr-lg-4'>
                                        back
                                    </button>
                                    <h2 className="back-btn-text m-0">Final steps before checkout</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='mt-4'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='p-l'>
                                    {/* <div className='d-flex justify-content-center'>
                                    <span className='d-inline-block pb-2'><img src={asset+"images/icons/apple.png"} alt="apple" className='img-fluid'/></span>
                                </div> */}
                                    <div className='min-height'>
                                        <div className='row align-items-center mt-3'>
                                            <div className='col-md-6'>
                                                <div className='product-thumb d-flex justify-content-center'><img src={proImages ? `data:image/jpg;base64,${proImages.base64}` : asset+"images/mac-book.png"} className='img-fluid' alt="mac-book" /></div>
                                            </div>
                                            <div className='col-md-6 product-details'>
                                                <h3>{product.name ? product.name : '13‑inch MacBook Pro - Silver'}</h3>
                                                <p className='mb-2'>Order value: <i className='rupee'>`</i>{product.mrp__c ? product.mrp__c.toLocaleString('en-IN') : ''}</p>
                                                <p className='mb-2'>Quantity: 01</p>
                                                <p className='mb-2'>Product ID: {product.sfid ? product.sfid : '345678'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='col-lg-6'>
                                <div className='p-r'>
                                    <div className='p-o_head d-flex justify-content-between'>
                                        <div className='p-o_head_l'>
                                            <h3 className='mb-1'>{planData.net_tenure__c} {planData.frequency_of_payments__c}</h3>
                                            <p className='m-0'>Tenure</p>
                                        </div>
                                        <div className='p-o_head_r'>
                                            <h3 className='mb-1'> {planData.currencyisocode === 'INR' ? (<i className='rupee'></i>) : '$'}{planData.disbursal_amount__c ? planData.disbursal_amount__c.toLocaleString('en-IN') : ''}</h3>
                                            <p className='m-0'>Monthly</p>
                                        </div>
                                    </div>
                                    <div className='min-height'>


                                        <div className='d-flex row_emi'>
                                            <div className='emi_l'>
                                                <p className='mb-1'>Due Today <span><img src={asset+"images/icons/icon-ind2.png"} alt="icon-ind2" className='img-fluid' /></span></p>
                                                <h3><i className='rupee'></i>{planData.emi_amount__c ? planData.emi_amount__c.toLocaleString('en-IN') : ''}</h3>
                                            </div>
                                            <div className='emi_r'>
                                                <p className='mb-1'>Tenure</p>
                                                <h3>{planData.net_tenure__c} {planData.frequency_of_payments__c}</h3>
                                            </div>
                                        </div>

                                        <div className='d-flex row_emi'>
                                            <div className='emi_l'>
                                                <p className='mb-1'>Interest (APR)</p>
                                                <h3>{planData.fixed_rate__c}% p.a</h3>
                                            </div>
                                            <div className='emi_r'>
                                                <p className='mb-1'>EMI account</p>
                                                <h3 className='d-flex align-items-center justify-content-end'>*******9172
                                                    <img
                                                        src={asset+"images/bank-icon/bank-2.png"}
                                                        className='img-fluid'
                                                        alt="apple"
                                                        style={{ "width": '18px' }}
                                                    />
                                                </h3>
                                            </div>
                                        </div>

                                        <div className='d-flex row_emi'>
                                            <div className='emi_l'>
                                                <p className='mb-1'>First EMI due date</p>
                                                <h3>12 December, 2022</h3>
                                            </div>
                                            <div className='emi_r'>
                                                <p className='mb-1'>Last EMI due date</p>
                                                <h3>12 December, 2022</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='border-line-dotted'></div>

                                    <div className='d-flex justify-content-center align-items-center py-3'>
                                        <p className='poweredBy m-0 mr-2'>Powered by</p>
                                        <img src={asset+"images/fullerton_india.png"} className='img-fluid' alt="fullerton_india" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-lg-5 mt-3'>
                            <div className='col-sm-12 text-center'>
                                <div className='send-otp-section'>
                                    <button
                                        type='submit'
                                        className='d-inline-block continue-btn'
                                        onClick={this.payNow}
                                    >
                                        Pay Now
                                    </button>
                                </div>
                           </div>
                        </div>
                        <div className='border-line mt-4 mb-4'></div>
                        <div className='row'>
                            <div className='col-sm-12 t-c'>
                                <h4>Terms &amp; Conditions</h4>
                                <p>Price may also include trade-in credit. Pricing with a trade-in is after trade-in of a specific device. Trade-in values vary based on the condition, year, and configuration of your trade-in device. You must be at least 18 years old. Additional terms from Apple or Apple’s trade-in partner may apply.
                                </p>
                                <p>Representative example: Based on purchase of ₹17430. Total amount payable ₹18462 paid over 9 months as 9 monthly payments of ₹2051 at an interest rate of 14% paper annum. Total interest paid to bank: ₹1032.</p>
                                <p>
                                    §No-Cost EMI available for purchases made using qualifying credit cards on 12-month tenure only. Offer available on qualifying purchases made after 1:30 PM IST on 6 December 2021 and before 11:59 PM IST on 19 January 2022. Minimum order spend applies as per your credit card’s issuing bank threshold. Offer cannot be combined with Apple Store for Education or Corporate Employee Purchase Plan pricing. Credit card eligibility is subject to terms and conditions between you and your credit card issuing bank. Offer may be revised or withdrawn at any time without any prior notice. Offer valid for limited period. Terms &amp; Conditions apply.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

function mapStateToProps(state) {
    const { userAddress, currentAddress, product, productId } = state.user;
    const { salesForceToken, user, isLoading, sfid } = state.auth;
    const { selectedplan, planData } = state.payment;
    return {
        salesForceToken,
        currentAddress,
        selectedplan,
        userAddress,
        sfid,
        user,
        productId,
        product,
        planData,
        isLoading
    };
}

export default connect(mapStateToProps)(BankScreenPay)