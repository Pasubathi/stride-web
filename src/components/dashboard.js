import React, { Component } from 'react'
import Helmet from "react-helmet";
import '../my-sass.scss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Header from "../common/header";
import { asset } from "../common/assets"; 
import ProfileSidebar from "../common/profile-sidebar";
import { addStoreRating, getStoreRating } from "../actions/user";
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)


class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            percent_value: 80,
            percent_value_2: 80,
            rating: 0,
        }
    }

    async componentDidMount() {
        const { user, sfid } = this.props;
        let data = {
            user_sfid: sfid
        }
        this.props.dispatch(getStoreRating(data));
        this.handleLimitChart1();
        this.handleLimitChart2();
    }

    handleLimitChart1 = () => {
        var options1 = {
            type: 'doughnut',
            data: {
                labels: ["Red"],
                datasets: [
                    {
                        data: [this.state.percent_value, 100 - this.state.percent_value],
                        backgroundColor: ['rgba(255, 59, 106, 1) rgba(255, 255, 255, 0)', 'rgba(216, 202, 255, 1)'],
                        borderWidth: 5
                    }
                ]
            },
            options: {
                circumference: 180,
                rotation: -90,
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                },
                cutout: '85%'
            }
        }

        var ctx1 = document.getElementById('chartJSContainer').getContext('2d');
        new Chart(ctx1, options1);
    }

    handleLimitChart2 = () => {
        var options2 = {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        label: '# of Votes',
                        data: [this.state.percent_value_2, (100 - this.state.percent_value_2)],
                        backgroundColor: ['rgba(78, 67, 111, 1)', 'rgba(196, 196, 196, 1)'],
                        borderWidth: 5
                    }
                ]
            },
            options: {
                rotation: -145,
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                },
                cutout: "80%"
            }
        }
        var ctx2 = document.getElementById('chartJSContainer_2').getContext('2d');
        new Chart(ctx2, options2);
    }

    handleRating = (value) =>{
        const { dispatch, sfid } = this.props
        let data = {
            user_sfid: sfid, rating: value
        }
        dispatch(addStoreRating(data))
        this.setState({ rating: value});
    }

    render() {
        const { user, profile, isLoading, store_rating, sfid } = this.props;
        if (!sfid) {
            return <Redirect to="/login" />;
        }
        let userdetails = profile && profile.profile ? profile.profile : ''
        return (
            <>

                <Helmet>
                    <title>Profile</title>
                </Helmet>
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
                <Header
                    user={user}
                />

                <div className='dashboard-body'>

                    <div className='container mt-5'>
                        <div className='row'>
                            <div className='col'>
                                <h4>Hello, {userdetails && userdetails.first_name__c ? userdetails.first_name__c : ''}</h4>
                                <p className='text-gray'>Welcome Back!</p>
                            </div>
                        </div>
                        <div className='row'>
                            <ProfileSidebar
                                history={this.props.history}
                                profile= {this.props.profile}
                                recentProd={this.props.recentProd}
                                user = {this.props.user}
                            />
                            <div className='col-xl-9 col-lg-8'>
                                <div className='box_bg mb-3'>
                                    <div className='row'>
                                        <div className='col-xl-5 pr-0'>
                                            <div className='px-xl-5 pt-xl-5 p-4'>
                                                <h5>Current Credit Limit</h5>
                                                <div className='dash amount_'><i className='rupee'>`</i>{userdetails && userdetails.ipa_basic_bureau__c ? userdetails.ipa_basic_bureau__c.toLocaleString('en-IN') : '0'}
                                                </div>
                                                <div className='d-flex align-items-center border-top px-xl-5 p-4 pb-xl-5'>
                                                    <div className='mr-3'><img src={asset+"images/dashboard/money-icon.png"} className="img-fluid" /></div>
                                                    <div>
                                                        <p className='mb-0'>You can still get a loan for a higher amount <button className='link'>Learn how</button> </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-xl-7 pl-0 border-left'>
                                            <div className='px-xl-5 py-xl-4 px-3 py-3'>
                                                <div className='row justify-content-center align-items-center'>
                                                    <div className='col-lg-5 position-relative'>
                                                        <canvas id="chartJSContainer"></canvas>
                                                        <p className="percent">
                                                            89%
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* <img src={asset+"images/dashboard/pie3.jpg"} className="img-fluid"/> */}

                                                <p className='text-right mb-0 px-xl-5'>
                                                    <button className='link'>Increase your limit
                                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0.992617 7.15457L10.9277 7.15457L7.65905 10.5218C7.56593 10.6169 7.49202 10.7301 7.44158 10.8548C7.39114 10.9795 7.36517 11.1133 7.36517 11.2484C7.36517 11.3835 7.39114 11.5173 7.44158 11.642C7.49202 11.7667 7.56593 11.8799 7.65905 11.9751C7.84519 12.1657 8.097 12.2727 8.35947 12.2727C8.62194 12.2727 8.87375 12.1657 9.05989 11.9751L13.322 7.57419C13.6952 7.19208 13.906 6.67311 13.9082 6.13111C13.9034 5.59266 13.6928 5.07786 13.322 4.69826L9.05989 0.297358C8.96726 0.202604 8.85741 0.127573 8.73663 0.07655C8.61585 0.0255265 8.4865 -0.000490668 8.35596 -1.57271e-05C8.22541 0.000460168 8.09624 0.0274186 7.97581 0.0793205C7.85538 0.131221 7.74606 0.207051 7.65408 0.302476C7.5621 0.397903 7.48926 0.511059 7.43973 0.635482C7.3902 0.759905 7.36495 0.89316 7.36541 1.02764C7.36587 1.16212 7.39204 1.29518 7.44242 1.41924C7.4928 1.5433 7.56641 1.65592 7.65905 1.75068L10.9277 5.10764L0.992617 5.10764C0.729123 5.10764 0.47642 5.21547 0.290101 5.40741C0.103783 5.59935 -0.000889385 5.85967 -0.000889361 6.13111C-0.000889338 6.40255 0.103783 6.66287 0.290102 6.85481C0.47642 7.04674 0.729124 7.15457 0.992617 7.15457Z" fill="#1251F1" />
                                                        </svg></button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <div className='col-xl-6 mb-xl-0 mb-lg-3'>
                                        <div className='box_bg d-flex flex-column justify-content-between h-100'>
                                            <div className='d-flex'>
                                                <div className='pl-xl-5 pt-xl-5 mr-4 pl-3 pt-3'>
                                                    <h5>3 Months Streak</h5>
                                                    <p className='mb-0'>In publishing and graphic design, Lorem ipsum is a </p>
                                                </div>
                                                <div className='pt-xl-4'>
                                                    <img src={asset+"images/dashboard/flame.png"} className="img-fluid" />
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center pt-xl-4 pt-3 pb-4'>
                                                <div className='pl-xl-5 pl-3'>
                                                    <img src={asset+"images/dashboard/auto-pay.png"} className="img-fluid" />
                                                </div>
                                                <div className='pr-4'>
                                                    <button type='button' onClick={()=>this.props.history.push('/virtual-no-card')} className='forward_btn tutu'>
                                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0.992617 7.15457L10.9277 7.15457L7.65905 10.5218C7.56593 10.6169 7.49202 10.7301 7.44158 10.8548C7.39114 10.9795 7.36517 11.1133 7.36517 11.2484C7.36517 11.3835 7.39114 11.5173 7.44158 11.642C7.49202 11.7667 7.56593 11.8799 7.65905 11.9751C7.84519 12.1657 8.097 12.2727 8.35947 12.2727C8.62194 12.2727 8.87375 12.1657 9.05989 11.9751L13.322 7.57419C13.6952 7.19208 13.906 6.67311 13.9082 6.13111C13.9034 5.59266 13.6928 5.07786 13.322 4.69826L9.05989 0.297358C8.96726 0.202604 8.85741 0.127573 8.73663 0.07655C8.61585 0.0255265 8.4865 -0.000490668 8.35596 -1.57271e-05C8.22541 0.000460168 8.09624 0.0274186 7.97581 0.0793205C7.85538 0.131221 7.74606 0.207051 7.65408 0.302476C7.5621 0.397903 7.48926 0.511059 7.43973 0.635482C7.3902 0.759905 7.36495 0.89316 7.36541 1.02764C7.36587 1.16212 7.39204 1.29518 7.44242 1.41924C7.4928 1.5433 7.56641 1.65592 7.65905 1.75068L10.9277 5.10764L0.992617 5.10764C0.729123 5.10764 0.47642 5.21547 0.290101 5.40741C0.103783 5.59935 -0.000889385 5.85967 -0.000889361 6.13111C-0.000889338 6.40255 0.103783 6.66287 0.290102 6.85481C0.47642 7.04674 0.729124 7.15457 0.992617 7.15457Z" fill="#000000" />
                                                        </svg>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-xl-6'>
                                        <div className='box_bg d-flex flex-column justify-content-between h-100'>
                                            <div className='d-flex align-items-end'>
                                                <div className='pl-xl-5 pt-xl-5 mr-4 pl-3 pt-3'>
                                                    <h5>Upload Additional Documents</h5>
                                                    <p className='mb-0'>In publishing and graphic design, Lorem </p>
                                                </div>
                                                <div className='pt-xl-4'>
                                                    <img src={asset+"images/dashboard/img2.png"} className="img-fluid" />
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-end align-items-center pt-xl-4 pb-4'>

                                                <div className='pr-4'>
                                                    <button className='forward_btn lavvendar'>
                                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0.992617 7.15457L10.9277 7.15457L7.65905 10.5218C7.56593 10.6169 7.49202 10.7301 7.44158 10.8548C7.39114 10.9795 7.36517 11.1133 7.36517 11.2484C7.36517 11.3835 7.39114 11.5173 7.44158 11.642C7.49202 11.7667 7.56593 11.8799 7.65905 11.9751C7.84519 12.1657 8.097 12.2727 8.35947 12.2727C8.62194 12.2727 8.87375 12.1657 9.05989 11.9751L13.322 7.57419C13.6952 7.19208 13.906 6.67311 13.9082 6.13111C13.9034 5.59266 13.6928 5.07786 13.322 4.69826L9.05989 0.297358C8.96726 0.202604 8.85741 0.127573 8.73663 0.07655C8.61585 0.0255265 8.4865 -0.000490668 8.35596 -1.57271e-05C8.22541 0.000460168 8.09624 0.0274186 7.97581 0.0793205C7.85538 0.131221 7.74606 0.207051 7.65408 0.302476C7.5621 0.397903 7.48926 0.511059 7.43973 0.635482C7.3902 0.759905 7.36495 0.89316 7.36541 1.02764C7.36587 1.16212 7.39204 1.29518 7.44242 1.41924C7.4928 1.5433 7.56641 1.65592 7.65905 1.75068L10.9277 5.10764L0.992617 5.10764C0.729123 5.10764 0.47642 5.21547 0.290101 5.40741C0.103783 5.59935 -0.000889385 5.85967 -0.000889361 6.13111C-0.000889338 6.40255 0.103783 6.66287 0.290102 6.85481C0.47642 7.04674 0.729124 7.15457 0.992617 7.15457Z" fill="#000000" />
                                                        </svg>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <div className='col-xl-6 mb-xl-0 mb-lg-3'>
                                        <div className='box_bg h-100'>
                                            <div className='row'>
                                                <div className='col-6'>
                                                    <div className='pl-xl-4 position-relative chartJSContainer_2'>
                                                        <canvas id="chartJSContainer_2"></canvas>
                                                        {/* <img src={asset+"images/dashboard/pie2.png"} className="img-fluid" /> */}
                                                        <p className="percent mb-0">
                                                            <span className='d-block font-weight-bold'>810</span>
                                                            <i className='fa fa-caret-up text-success ml-2'></i>
                                                            <i className='fa fa-caret-down text-gray'></i>
                                                        </p>
                                                    </div>
                                                    <div className='pl-xl-5 pr-xl-4 pb-4'>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div className='text-center'>
                                                                <div className='dot-gray'></div>
                                                                <p className='fs-17 font-weight-bold'>300</p>
                                                            </div>
                                                            <div className='text-center'>
                                                                <div className='dot-gray'></div>
                                                                <p className='fs-17 font-weight-bold'>900</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-6'>

                                                    <div className='pt-4 pr-4 pb-4'>
                                                        <h5>Your credit score has increased</h5>
                                                        <p className='mb-0'>In publishing and graphic design, Lorem ipsum is a </p>
                                                    </div>


                                                    <div className='d-flex justify-content-end pb-4 pr-4'>
                                                        <button className='forward_btn tutu'>
                                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0.992617 7.15457L10.9277 7.15457L7.65905 10.5218C7.56593 10.6169 7.49202 10.7301 7.44158 10.8548C7.39114 10.9795 7.36517 11.1133 7.36517 11.2484C7.36517 11.3835 7.39114 11.5173 7.44158 11.642C7.49202 11.7667 7.56593 11.8799 7.65905 11.9751C7.84519 12.1657 8.097 12.2727 8.35947 12.2727C8.62194 12.2727 8.87375 12.1657 9.05989 11.9751L13.322 7.57419C13.6952 7.19208 13.906 6.67311 13.9082 6.13111C13.9034 5.59266 13.6928 5.07786 13.322 4.69826L9.05989 0.297358C8.96726 0.202604 8.85741 0.127573 8.73663 0.07655C8.61585 0.0255265 8.4865 -0.000490668 8.35596 -1.57271e-05C8.22541 0.000460168 8.09624 0.0274186 7.97581 0.0793205C7.85538 0.131221 7.74606 0.207051 7.65408 0.302476C7.5621 0.397903 7.48926 0.511059 7.43973 0.635482C7.3902 0.759905 7.36495 0.89316 7.36541 1.02764C7.36587 1.16212 7.39204 1.29518 7.44242 1.41924C7.4928 1.5433 7.56641 1.65592 7.65905 1.75068L10.9277 5.10764L0.992617 5.10764C0.729123 5.10764 0.47642 5.21547 0.290101 5.40741C0.103783 5.59935 -0.000889385 5.85967 -0.000889361 6.13111C-0.000889338 6.40255 0.103783 6.66287 0.290102 6.85481C0.47642 7.04674 0.729124 7.15457 0.992617 7.15457Z" fill="#000000" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='col-xl-6'>
                                        <div className='box_bg d-flex flex-column justify-content-between h-100'>
                                            <div className='refer pt-4'>
                                                <div className='position-absolute refer-txt'>
                                                    <h4>Refer &amp; Earn</h4>
                                                    <p className='mb-0'>You earn <i className='rupee'>`</i> 1000, your friend earns  `1000 on every transactions via referral.</p>
                                                </div>
                                                <img src={asset+"images/dashboard/img.png"} className="img-fluid" />
                                            </div>

                                            <div className='d-flex justify-content-end pb-4 pr-4'>
                                                <button className='share_'>
                                                    <span>Share </span>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.1145 12.2221C15.4851 12.2226 14.8653 12.3764 14.3086 12.6702C13.7519 12.9641 13.275 13.3891 12.919 13.9086L7.50101 11.4596C7.88583 10.5294 7.88732 9.48445 7.50517 8.55309L12.9156 6.09156C13.4432 6.85548 14.2269 7.40479 15.1244 7.63985C16.0219 7.8749 16.9739 7.78014 17.8076 7.37274C18.6413 6.96534 19.3016 6.27229 19.6686 5.41931C20.0356 4.56633 20.0851 3.60991 19.808 2.72354C19.531 1.83717 18.9458 1.07956 18.1586 0.588138C17.3713 0.0967128 16.4342 -0.0959783 15.5173 0.0450173C14.6003 0.186013 13.7642 0.651356 13.1605 1.35664C12.5569 2.06192 12.2258 2.96042 12.2273 3.88917C12.2308 4.10899 12.2531 4.32811 12.2938 4.54414L6.54211 7.16067C5.9897 6.64254 5.29813 6.29724 4.55237 6.16719C3.80662 6.03713 3.03916 6.12798 2.34427 6.42859C1.64939 6.72919 1.05734 7.22644 0.640881 7.85927C0.224418 8.49209 0.0016726 9.23291 9.38271e-06 9.99073C-0.00165383 10.7485 0.217838 11.4903 0.631519 12.125C1.0452 12.7596 1.63505 13.2595 2.32861 13.5631C3.02217 13.8668 3.78923 13.961 4.53555 13.8343C5.28187 13.7075 5.97494 13.3652 6.52963 12.8495L12.2963 15.4561C12.2563 15.6719 12.2343 15.8907 12.2306 16.1102C12.2304 16.8794 12.4581 17.6314 12.8849 18.2711C13.3117 18.9108 13.9184 19.4094 14.6283 19.7038C15.3382 19.9983 16.1193 20.0753 16.873 19.9253C17.6266 19.7753 18.3189 19.4049 18.8622 18.8609C19.4055 18.317 19.7755 17.624 19.9254 16.8695C20.0753 16.1151 19.9983 15.3331 19.7041 14.6224C19.41 13.9118 18.912 13.3044 18.273 12.8771C17.634 12.4499 16.8829 12.2219 16.1145 12.2221ZM16.1145 1.66679C16.5536 1.66662 16.9828 1.79682 17.348 2.04092C17.7132 2.28502 17.9979 2.63205 18.166 3.03812C18.3342 3.4442 18.3783 3.89107 18.2927 4.32223C18.2071 4.75338 17.9958 5.14945 17.6853 5.46034C17.3749 5.77123 16.9793 5.98297 16.5487 6.06879C16.118 6.15461 15.6716 6.11065 15.2659 5.94247C14.8603 5.77428 14.5135 5.48944 14.2695 5.12395C14.0256 4.75846 13.8953 4.32875 13.8953 3.88917C13.8958 3.30004 14.1297 2.73515 14.5457 2.31849C14.9618 1.90183 15.526 1.66745 16.1145 1.66679ZM3.9068 12.2221C3.4677 12.2222 3.03842 12.092 2.67324 11.8479C2.30806 11.6038 2.02339 11.2568 1.85524 10.8507C1.68709 10.4447 1.64301 9.99779 1.72857 9.56663C1.81414 9.13548 2.0255 8.73941 2.33593 8.42852C2.64637 8.11763 3.04192 7.90588 3.47257 7.82007C3.90322 7.73425 4.34963 7.77821 4.75532 7.94639C5.16101 8.11457 5.50777 8.39942 5.75174 8.76491C5.9957 9.1304 6.12592 9.5601 6.12592 9.99969C6.12526 10.5888 5.89128 11.1535 5.47528 11.5701C5.05928 11.9867 4.49522 12.2212 3.9068 12.2221ZM16.1145 18.3326C15.6754 18.3326 15.2462 18.2022 14.8811 17.958C14.516 17.7138 14.2315 17.3668 14.0635 16.9607C13.8955 16.5546 13.8515 16.1077 13.9372 15.6766C14.0228 15.2455 14.2342 14.8495 14.5447 14.5387C14.8552 14.2279 15.2507 14.0163 15.6814 13.9305C16.112 13.8448 16.5584 13.8888 16.964 14.057C17.3696 14.2252 17.7164 14.51 17.9603 14.8755C18.2042 15.241 18.3344 15.6707 18.3344 16.1102C18.334 16.6995 18.0999 17.2645 17.6837 17.6812C17.2675 18.0979 16.7031 18.3321 16.1145 18.3326Z" fill="black" />
                                                    </svg>
                                                </button>


                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className='box_bg overflow-hidden'>
                                    <div className='row  align-items-center'>
                                        <div className='col-lg-6'>
                                            <div className='mr-3'><img src={asset+"images/dashboard/img3.png"} className="img-fluid" /></div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='px-xl-5 py-xl-4 px-3 py-3'>
                                                <h5>Rate your experience with our product...</h5>
                                                {/* <img src={asset+"images/dashboard/emoji.png"} className="img-fluid" /> */}
                                                <>
                                                <ul className="feedback">
                                                    <li className={`angry ${store_rating===1?"active":""}`}>
                                                    <div onClick={()=>this.handleRating(1)}>
                                                        <svg className="eye left">
                                                        <use xlinkHref="#eye"></use>
                                                        </svg>
                                                        <svg className="eye right">
                                                        <use xlinkHref="#eye"></use>
                                                        </svg>
                                                        <svg className="mouth">
                                                        <use xlinkHref="#mouth"></use>
                                                        </svg>
                                                    </div>
                                                    </li>
                                                    <li className={`sad ${store_rating===2?"active":""}`}>
                                                    <div onClick={()=>this.handleRating(2)}>
                                                        <svg className="eye left">
                                                        <use xlinkHref="#eye"></use>
                                                        </svg>
                                                        <svg className="eye right">
                                                        <use xlinkHref="#eye"></use>
                                                        </svg>
                                                        <svg className="mouth">
                                                        <use xlinkHref="#mouth"></use>
                                                        </svg>
                                                    </div>
                                                    </li>
                                                    <li className={`ok ${store_rating===3?"active":""}`}>
                                                    <div onClick={()=>this.handleRating(3)} />
                                                    </li>
                                                    <li className={`good ${store_rating===4?"active":""}`} >
                                                    <div onClick={()=>this.handleRating(4)}>
                                                        <svg className="eye left">
                                                        <use xlinkHref="#eye"></use>
                                                        </svg>
                                                        <svg className="eye right">
                                                        <use xlinkHref="#eye"></use>
                                                        </svg>
                                                        <svg className="mouth">
                                                        <use xlinkHref="#mouth"></use>
                                                        </svg>
                                                    </div>
                                                    </li>
                                                    <li onClick={()=>this.handleRating(5)} className={`happy ${store_rating===5?"active":""}`}>
                                                    <div>
                                                        <svg className="eye left">
                                                        <use xlinkHref="#eye"></use>
                                                        </svg>
                                                        <svg className="eye right">
                                                        <use xlinkHref="#eye"></use>
                                                        </svg>
                                                    </div>
                                                    </li>
                                                </ul>
                                                <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                                                    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" id="eye">
                                                    <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1" />
                                                    </symbol>
                                                    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 7" id="mouth">
                                                    <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5" />
                                                    </symbol>
                                                </svg>
                                                </>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                </div>

            </>
        )
    }
}

function mapStateToProps(state) {
    const { user, sfid, isLoading } = state.auth;
    const { profile, recentProd, store_rating } = state.user;
    return {
        user,
        sfid,
        store_rating,
        recentProd,
        isLoading,
        profile,
    };
}

export default connect(mapStateToProps)(Dashboard);