import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { asset } from "../../common/assets";
import { validatePan, faceMatch, getProfileDocument, uploadDocument, getPanDocument, removeDocument, getAccountProfile, fraudCheck } from "../../actions/user"
import { openPdfModel } from "../../actions/model";
import { IFFT } from '@tensorflow/tfjs'

class KycScreen14 extends Component {

  constructor(props) {
      super(props)
      this.state = {
          isFrontUploading: false,
          isFrontDraged: false,
          isFileDrag: false,
          profile: null,
          frontType:'',
          frontFile:'',
          frontBase:'',
          frontSrc:'',
          isFrontCrop: false,
          isSuccess: false,
          isUpload: false,
          isSaved: false,
          isSubmitted: false,
          isPanVerified: false,
          panId: null,
          errorMsg: '',
          successMsg:'',
          validPic: true,
          frontFileType: 0,
          accountDet: null,
          attempt: 0,
          crop: {
            unit: '%',
            x: 10,
            y: 10,
            width: 80,
            height: 50,
          //  aspect: 16 / 9
          }
      }
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount(){
    const { user, sfid, userBase} = this.props;
    let data = {
      sfid: sfid
    }
    await this.props.dispatch(getPanDocument(data)).then((response)=>{
      if(response.status ==="success")
      {
           const getData = response.data;
           if(getData && getData.base64 !==undefined && getData.base64 !=="")
           {
              const base = getData && getData.base64?getData.base64:null;
              const base64 = base && base.base64?base.base64:null;
              let type = 0;
              let DocBase = ""
              let fileTy = '';
              if(getData.filetype !==null )
              {
                  if(getData.filetype ==="PDF" || getData.filetype ==="pdf")
                  {
                      type=2;
                      fileTy = `application/${getData.filetype}`;
                      DocBase = base64?`data:application/pdf;base64,${base64}`:null;
                  }else{
                      type=1;
                      fileTy = `image/${getData.filetype}`;
                      DocBase =  base64?`data:image/${getData.filetype};base64,${base64}`:null;
                  }
                  
              } 
               this.setState({
                  frontFileType: type,
                  frontType: fileTy,
                  frontSrc: DocBase,
                  frontBase: DocBase,
                  isFrontCrop: false,
                  isSubmitted: true,
                  panId: null
                });
           }
      }
    });

    let obj = {
      user_sfid: sfid,
    }
    this.props.dispatch(getAccountProfile(obj)).then((response)=>{
      if(response.status ==="success")
      {
          const getData = response.accountDet?response.accountDet:null;
          this.setState({ accountDet: getData, isPanVerified: getData && getData.is_pan_document_verified__c?getData.is_pan_document_verified__c:false});
      }
    });

    this.props.dispatch(getProfileDocument(data)).then((response)=>{
      if(response.status ==="success")
      {
           const getData = response.data;
           if(getData && getData.base64 !==undefined && getData.base64 !=="")
           {
               const base = getData && getData.base64?getData.base64:null;
               const base64 = base && base.base64?base.base64:null;
               this.profileDataURLtoFile(base64?`data:image/${getData.filetype};base64,${base64}`:'', "profile.jpg")
           }else{
                this.profileDataURLtoFile(userBase?`data:image/jpg;base64,${userBase}`:'', "profile.jpg");
           }
      }
    });
  }

  dragOver = (e) => {
      e.preventDefault();
      this.setState({ isFrontDraged: true});
  }

  dragEnter = (e) => {
      e.preventDefault();
    //  this.setState({ isFrontDraged: true});
  }

  dragLeave = (e) => {
      e.preventDefault();
      this.setState({ isFrontDraged: false});
  }

  fileDrop = async (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      let type = files[0].type;
      this.setState({isFrontDraged: false,frontFile:files[0], isFileDrag: false});
      var reader = new FileReader();
      var url = reader.readAsDataURL(files[0]);
      let sizeError = 0;
      let fileError = 0;
      let fileSize = files[0].size / 1024 / 1024;
      let fname = files[0].name;
      var re = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG|\.pdf)$/i;;
      if(fileSize > 5)
      {
          sizeError = 1;
      }
      if(!re.exec(fname))
      {
          fileError = 1;
      }
      if(fileError === 1 || sizeError === 1)
      {
          if(fileError === 1)
          {
              this.setState({isFileDrag: false, validPic: false, errorMsg: "File extension not supported!"});
          }else if(sizeError === 1){
              this.setState({isFileDrag: false, validPic: false, errorMsg: "File size exceeds 5 MB"});
          }
      }else{
      reader.onloadend = function (e) {
          let doctype =1;
          if(type ==="application/pdf")
          {
              doctype = 2;
          }
          this.setState({
            frontFileType: doctype,
            frontType: type,
            frontBase: reader.result,
            frontSrc: [reader.result],
            isFileDrag: false
           // isFrontCrop: true
          })
          }.bind(this);
          const checkData = await this.checkFraud(files[0]);
            if(!checkData.status)
            {
                this.setState({
                  isSaved: false,
                  isFileDrag: false
                })
            }else {
              if(checkData.type !=="pan")
              {
                this.setState({
                  isSaved: false,
                  isFileDrag: false
                })
              }else{
                this.setState({
                  isSaved: true
                });
              }
          }
      }
  }

  async profileDataURLtoFile(dataurl, filename) {
     return new Promise((resolve, reject)=>{
      try {
            var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            const profile = new File([u8arr], filename, {type:mime});
            this.setState({ profile: profile });
            console.log("profile", profile);
            resolve(true);
        } catch (err) {
          reject(err.message ? err.message : err)
      }
    });
 }
/* 
//Usage example:
var file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=','hello.txt');
 */

  handleFrontFileSelect = async (e) => {
      e.preventDefault();
      const files = e.target.files;
      let type = files[0].type;
      this.setState({frontFile:files[0]});
      var reader = new FileReader();
      var url = reader.readAsDataURL(e.target.files[0]);
      let sizeError = 0;
      let fileError = 0;
      let fileSize = files[0].size / 1024 / 1024;
      let fname = files[0].name;
      var re = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG|\.pdf)$/i;;
      if(fileSize > 5)
      {
          sizeError = 1;
      }
      if(!re.exec(fname))
      {
          fileError = 1;
      }
      if(fileError === 1 || sizeError === 1)
      {
          if(fileError === 1)
          {
              this.setState({isFileDrag: false, validPic: false, errorMsg: "File extension not supported!"});
          }else if(sizeError === 1){
              this.setState({isFileDrag: false, validPic: false, errorMsg: "File size exceeds 5 MB"});
          }
      }else{
      reader.onloadend = function (e) {
          let doctype =1;
          if(type ==="application/pdf")
          {
              doctype = 2;
          }
          this.setState({
            frontType: type,
            frontFileType: doctype,
            frontBase: reader.result,
            frontSrc: [reader.result],
            isFileDrag: false
           // isFrontCrop: true
          })
          }.bind(this);
          const checkData = await this.checkFraud(files[0]);
            if(!checkData.status){
                this.setState({
                  isSaved: false,
                  isFileDrag: false
                })
            }else {
              if(checkData.type !=="pan")
              {
                this.setState({
                  isSaved: false,
                  isFileDrag: false
                })
              }else{
                this.setState({
                  isSaved: true,
                })
              }
            }
    }
  }

  frontFileRetry = () => {
      var reader = new FileReader();
      reader.readAsDataURL(this.state.frontFile);
      reader.onloadend = function (e) {
          this.setState({
              frontSrc: [reader.result],
              isFileDrag: false
             // isFrontCrop: true
          })
          }.bind(this);
  }

  frontFileDelete = async (id) =>{
    const { dispatch, salesForceToken } = this.props;
      if(id !=null)
      {
          let data = {
              id: id,
              token: salesForceToken
          }
          await  dispatch(removeDocument(data)); 
      }
      this.setState({
          frontSrc: '',
          frontFile: '',
          isSubmitted: false,
          isSaved: false,
          isFileDrag: false
      })
  }


  onImageLoaded = image => {
      this.imageRef = image
  }

  onCropChange = (crop) => {
      this.setState({ crop });
  }

  onCropComplete = crop => {
      if (this.imageRef && crop.width && crop.height) {
          const croppedImageUrl = this.getCroppedImg(this.imageRef, crop)
          this.setState({ croppedImageUrl })
      }
  }

  getCroppedImg(image, crop) {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");
      
      ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
      )
      const d = new Date()
      const time = d.getTime()
      const reader = new FileReader()
      canvas.toBlob(blob => {
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
              this.dataURLtoFile(reader.result, 'eduvan-web-'+time+'.jpg')
          }
      })
  }

  dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), 
          n = bstr.length, 
          u8arr = new Uint8Array(n);
              
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      let croppedImage = new File([u8arr], filename, {type:mime});
      this.setState({croppedImage: croppedImage }) 
  }

  handleFrontCrop = () =>{
      this.setState({isFrontCrop: true});
  }

  handleFrontCropSave = () =>{
      const reader = new FileReader();
      reader.readAsDataURL(this.state.croppedImage);
      reader.onload = () => {
        this.setState({
          frontType: "image/png",
          frontBase: reader.result,
          frontSrc: [reader.result],
          isFrontCrop: false
      })
      };
  }

  handleFrontCropCancel = () =>{
      this.setState({ isFrontCrop: false, isSaved: true });
  }

  handleSubmit = e => {
      e.preventDefault()
      let frontBase = this.state.frontBase; 
      const fronBase64 = frontBase.replace(`data:${this.state.frontType};base64,`, "");
      let dockType = ["Pan-Front"];
      let fileType = [this.state.frontType];
      let eduFileType = ["PAN"];
      const d = new Date()
      const time = d.getTime()
      const getExt = this.state.frontType.split("/");
      let ext = getExt[1];
        let data = {
            "token": this.props.salesForceToken,
            "parent_id": this.props.sfid,
            "fname": "eduvan-web-"+time+'.'+ext,
            "base64": [fronBase64],
            "doctype": dockType,
            "basetype": fileType,
            "catType": "PAN",
            "fileType": eduFileType,
            "id": parseInt(this.props.user)
        }
        this.props.dispatch(uploadDocument(data)).
        then((reponse) => {

            if(reponse ==="success")
            {
              
              console.log("success");
           //   this.setState({isSuccess : true});
              this.handleContinue();
            }else{
              console.log("Error");
              this.setState({isSuccess : false});
            }
          })
          .catch((error) => {
            console.log(error);
          });
  }

  handlePdfView = (baseData) =>{
    this.props.dispatch(openPdfModel(baseData));
  }

  handleFileDrag = () =>{
    this.setState({ isFileDrag: true});
  }

  handleErrorClose = () =>{
    this.setState({validPic: true, errorMsg:''});
  }

  handleContinue = () =>{
    const { accountDet } = this.state
    this.props.history.push("/ed_select_bank");
  }

  checkFraud = async (file) => {
    const { sfid } = this.props
    const { attempt } = this.state
    return new Promise(async (resolve, reject) => {
        try {
                const { dispatch, sfid } = this.props
                var formdata = new FormData();
                formdata.append("sfid", sfid);
                formdata.append("first_image", file);
                formdata.append("second_image", this.state.profile);
                await dispatch(validatePan(formdata)).then(async (response)=>{
                const panAttempt = attempt+1;
                if(response.status =="success")
                {
                  this.setState({validPic: true, successMsg: "Verification Successful!"});
                  resolve({status: true, type: 'pan'});
                }else{
                    if(panAttempt > 2)
                    {
                      this.setState({validPic: false, errorMsg: 'Your pan document not verified Still you can submit to backend verification'});
                      resolve({status: true, type: 'pan'});
                    }else{
                      this.setState({validPic: false, errorMsg: response.message});
                      resolve({status: false});
                    }
                }
                this.setState({attempt: panAttempt});
            });
        } catch (err) {
            reject(err && err.message ? err.message : err)
        }
    });
}


    render() {
        let frontInputRef;
        const styles = {background: '#1F1F2D',borderRadius: '10px',color: '#ffffff'};
        const { isLoading, history } = this.props;
        const { isPanVerified } = this.state
        return (
            <>
            <Helmet>
            <title> Kyc Screen 14 </title>
            <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            {isLoading?(
              <div className="loading">Loading&#8230;</div>
             ):''}
            <section className="kyc_pages">
            <div className={`container-zero ${!this.state.frontSrc?'dragarea':''} ${this.state.isFileDrag?'active':''}`}>
           
            <div className="flex-w flex-tr">
            <div className="kyc_leftbar bg-2">
       
            <h4 onClick={ () => history.push('/home')} className="cursor-point mtext-105 cl6">eduvanz.</h4>
     <div className="navigations">
      <ul className="breadcrumps">
          <li className="b_back"><Link to="/ed_doc_others">Back</Link></li>
      </ul>
     </div>
     
     <ul className="kyc_timeline">
     <li className="complete">Registration</li>
     <li className="complete">Limit Approval</li>
     <li className="has_child ongoing">Identity Verifcation <span className="sheading">Keep your document ready</span>
        <ul className="sub_timeline">
            <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_doc_profile')} className="complete">Photograph</li>
            <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_digilocker')} className="complete">Identity Card</li>
            <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_doc_pan')} className="active">PAN Card</li>
        </ul>
     </li>
     <li>Auto pay <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
     <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
     </ul>
            </div>
            <div className="kyc_rightbar flex-w flex-col-m justify-content-center">
            <div className="form_width_1 ext8 mb-1 mt-1">
              <div className="form_details">
                <h4 className="bg-1 text-center imgaligned"><img src={asset+"images/icons/icon_briefcase.svg"} /> PAN KYC </h4>
                <ul className="horizontal_list">
                  <li>Max file size 5 MB</li>
                  <li>File should be pdf, JPEG, PNG</li>
                  <li>Image should be clear</li>
                </ul>
                <form  className="otpform otpform-others fullwidth" onDragEnter={this.handleFileDrag}>
                <div className="d-flex flex-col-m mn_height_4">
                  <div className="row justify-content-center">
                    <div className="max-width-700">
                    <div className="row">
                    <div className="col-sm-12 text-center">
                            <h1 className="upload_headings">Front</h1>
                            <div className="upload_box d-block cropped_img">
                            {this.state.frontSrc?(
                            this.state.isFrontCrop?(
                                <>
                                <div className="btn_align_top align-center">
                                  <button type="button" onClick={this.handleFrontCropSave} className="btn btn-default">&nbsp;Ok</button>
                                  <button type="button" onClick={this.handleFrontCropCancel} className="btn btn-default">&nbsp;Cancel</button>
                                  </div>
                                  <ReactCrop
                                      src={this.state.frontSrc}
                                      crop={this.state.crop}
                                      onImageLoaded={this.onImageLoaded}
                                      onComplete={this.onCropComplete}
                                      onChange={this.onCropChange}
                                  /> 
                                </>
                            ):(
                                <>
                                <div className="btn_align_top">
                                  {!this.state.isSubmitted?(
                                  <>
                                    <button type="button" onClick={this.handleFrontCrop} className="btn btn-default"><img src={asset+"images/Vector9.png"} />&nbsp;Crop</button>
                                    <button type="button" onClick={this.frontFileRetry} className="btn btn-default"><img src={asset+"images/Vector-8.png"} />&nbsp;Retry</button>
                                  </>
                                  ):''
                                  }
                                  {!isPanVerified && (
                                    
                                    <button type="button" onClick={()=> this.frontFileDelete(this.state.panId)} className="btn_delete"><img src={asset+"images/Vector-delete.svg"} /></button>
                                  )}
                                </div>
                                {this.state.frontFileType ===2?(
                                    <img style={{cursor:'pointer', width: '53%', padding: '10px'}} onClick={()=>this.handlePdfView(this.state.frontBase)} src={asset+'images/pdf.png'} />
                                ):(
                                    <img src={this.state.frontSrc} />
                                )}
                                </>
                            )
                            ):(
                            <>
                            <div 
                                className={`drop-container singleimg`}
                                onDragOver={this.dragOver}
                                onDragEnter={this.dragEnter}
                                onDragLeave={this.dragLeave}
                                onDrop={this.fileDrop}
                            >
                                <h3>Drag and drop</h3>
                                {this.state.isFrontDraged && (<h5 style={{color: '#a5a5a5'}}>Upload file upto 5MB by dropping in this window</h5>)}

                            </div>
                            <div className="or_type1">or</div>
                            
                            <input
                                type="file"
                                style={{display: 'none'}}
                                ref={refParam => frontInputRef = refParam}
                                onChange={this.handleFrontFileSelect}
                                accept="image/x-png,image/gif,image/jpeg,image/jpg,application/pdf"
                            />
                            <button type="button" onClick={() => frontInputRef.click()} className={"btn btn-upload"}>
                                 Upload Front
                            </button>
                            </>
                            )}
                            {this.state.validPic===false && this.state.errorMsg !='' && (
                              <div className="alert red-danger fade show" role="alert">
                                 {this.state.errorMsg}
                                 <img type="button" onClick={this.handleErrorClose} className="close" data-dismiss="alert" aria-label="Close" src={asset+"images/icons/icon_wrong.svg"} />
                              </div>
                            )}
                            {this.state.isSuccess?
                              (
                              <div className="alert green-success fade show" role="alert">
                                File uploaded successfully
                                <img type="button" className="close" data-dismiss="alert" aria-label="Close" src={asset+"images/icons/icon_right.svg"} />
                              </div>
                              ):''
                            }
                            {this.state.validPic && this.state.successMsg !='' && (
                              <div className="alert green-success fade show" role="alert">
                                {this.state.successMsg}
                                <img type="button" className="close" data-dismiss="alert" aria-label="Close" src={asset+"images/icons/icon_right.svg"} />
                              </div>
                              )
                            }
                            </div>
                        </div>         
                </div>
                 </div>
                 </div>
                 <div className="form_spacing text-center">
                 {!isPanVerified?(
                 <button 
                      type="button" 
                      onClick={this.handleSubmit}
                      disabled={this.state.isSaved && this.state.frontBase && this.state.isFrontCrop ===false?false:true} 
                      className="stext-101 cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300"
                      style={this.state.isSaved && this.state.frontBase && this.state.isFrontCrop ===false?styles:{}}
                      >Submit</button>
                 ):(
                  <button 
                    type="button" 
                    onClick={this.handleContinue}
                    className="stext-101 cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300"
                    style={styles}
                  >Continue</button>
                 )}
                 </div>
                </div>
                </form>
                </div>
              </div>
              <div className="pos_abs">
                        <ul className="text_icons">
                          <li><Link to="" className="getappsty">
                            Get our App <img src={asset+"images/icons/app-icon.png"} />
                          </Link>
                          </li>
                          <li>
                          <Link to="" className="getappsty">
                            Help <img src={asset+"images/icons/qustionmark.png"} />
                          </Link>
                       </li>
                      </ul>                      
                    </div>
            </div>
            </div>
            </div>
            </section>
            </>
        )
    }
}

function mapStateToProps(state) {
  const { salesForceToken, user, sfid, isLoading } = state.auth;
  const { message } = state.message;
  const { userMessage, userBase } = state.user;
  return {
      salesForceToken,
      userBase,
      user,
      sfid,
      isLoading,
      message,
      userMessage
  };
}

export default connect(mapStateToProps)(KycScreen14)