import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { asset } from "../../common/assets";
import { getProfileDocument, uploadDocument, getDocument, removeDocument, ocrCheck, fraudCheck } from "../../actions/user"
import { openPdfModel } from "../../actions/model"; 

class KycScreen12 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isFrontUploading: false,
            isBackUploading: false,
            isFrontDraged: false,
            isBackDraged: false,
            profile: null,
            frontType:'',
            backType:'',
            frontFile:'',
            backFile:'',
            frontBase:'',
            backBase:'',
            frontSrc:'',
            backSrc:'',
            frontId: null,
            backId: null,
            isFrontChanged: false,
            isBackChanged: false,
            isFrontCrop: false,
            isBackCrop: false,
            isSuccess: false,
            isFrontSaved: false,
            isBackSaved: false,
            isBackSubmitted: false,
            isFrontSubmitted: false,
            isFileDragged: false,
            frontErrorMsg: '',
            validFrontPic: true,
            backErrorMsg: '',
            validBackPic: true,
            frontFileType: 0,
            backFileType: 0,
            isFrontSuccess: false,
            isBackSuccess: false,
            frontSuccessMsg: '',
            backSuccessMsg: '',
            isFrontDeleteEnable: false,
            isBackDeleteEnable: false,
            frontDocAttempt: 0,
            backDocAttempt: 0,
            crop: {
                unit: '%',
                x: 10,
                y: 10,
                width: 80,
                height: 50,
               // aspect: 16 / 9
              },
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const { user, sfid, userBase} = this.props;
        let data = {
            sfid: sfid
        }
        this.props.dispatch(getDocument(data)).then((response)=>
        {
           if(response.status ==="success")
           {
                let getData = response.data;
                const aadharBack = response.aadharbackdata;
                const aadharFront = response.aadharfrontdata;
                if(aadharBack && aadharBack.base64 !==undefined && aadharBack.base64 !=="")
                {
                    const base = aadharBack && aadharBack.base64?aadharBack.base64:null;
                    const base64 = base && base.base64?base.base64:null;
                    let type = 0;
                    let DocBase = ""
                    if(aadharBack.filetype !==null )
                    {
                        if(aadharBack.filetype ==="PDF" || aadharBack.filetype ==="pdf")
                        {
                            type=2;
                            DocBase = base64?`data:application/pdf;base64,${base64}`:null;
                        }else{
                            type=1;
                            DocBase = base64?`data:image/${aadharBack.filetype};base64,${base64}`:null;
                        }
                        
                    }
                    this.setState({ backFileType: type, isBackSubmitted: true,backSrc: DocBase, backId: null, isBackSubmitted: true, backType: aadharBack.filetype, backBase: DocBase});
                }
                if(aadharFront && aadharFront.base64 !==undefined && aadharFront.base64 !=="")
                {
                    const base = aadharFront && aadharFront.base64?aadharFront.base64:null;
                    const base64 = base && base.base64?base.base64:null;
                    let type = 0;
                    let DocBase = "";
                    if(aadharFront.filetype !==null)
                    {
                        if(aadharFront.filetype ==="PDF" || aadharFront.filetype ==="pdf")
                        {
                            type=2;
                            DocBase = base64?`data:application/pdf;base64,${base64}`:null;
                        }else{
                            type=1;
                            DocBase = base64?`data:image/${aadharFront.filetype};base64,${base64}`:null;
                        }
                        
                    }
                    this.setState({ frontFileType: type, isFrontSubmitted: true,frontSrc: DocBase, frontId: null, isFrontSubmitted: true, frontType: aadharFront.filetype, frontBase: DocBase});
                }
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
                     this.profileDataURLtoFile(base64?`data:image/${getData.filetype};base64,${base64}`:'', "profile.jpg");
                    // this.setState({profile:profile});
                 }else{
                    this.profileDataURLtoFile(userBase?`data:image/jpg;base64,${userBase}`:'', "profile.jpg");
                   // this.setState({profile:profile});
                 }
            }
        });
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

    dragOver = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isFrontDraged: true});
    }
    
    dragEnter = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isFrontDraged: true});
    }
    
    dragLeave = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isFrontDraged: false});
    }

    handlePdfView = (baseData) =>{
        this.props.dispatch(openPdfModel(baseData));
    }
    
    fileDrop = async (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        let type = files[0].type;
        this.setState({isFrontDraged: false,frontFile:files[0]});
        var reader = new FileReader();
        var url = reader.readAsDataURL(files[0]);
        let sizeError = 0;
        let fileError = 0;
        let fileSize = files[0].size / 1024 / 1024;
        let fname = files[0].name;
        var re = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG|\.pdf)$/i;
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
                this.setState({isFileDragged: false, validFrontPic: false, frontErrorMsg: "File extension not supported!"});
            }else if(sizeError === 1){
                this.setState({isFileDragged: false, validFrontPic: false, frontErrorMsg: "File size exceeds 5 MB"});
            }
        }else{
            reader.onloadend = function (e) {
                let doctype =1;
                let isSubmit = false;
                if(type ==="application/pdf")
                {
                    doctype = 2;
                    isSubmit = true;
                }
                this.setState({
                    isFrontSubmitted: isSubmit,
                    frontFileType: doctype,
                    frontType: type,
                    frontBase: reader.result,
                    frontSrc: [reader.result],
                    isFileDragged: false,
                    isFrontDeleteEnable: true,
                //  isFrontCrop: true
                })
                }.bind(this);
                const checkData = await this.checkFraud(files[0], 1);
                if(!checkData.status)
                {
                    this.setState({
                        isFrontSubmitted: true,
                        isFrontSaved: false,
                        isFrontChanged: false,
                        isFileDragged: false
                    })
                }else {
                    if(checkData.type !=="aadhaar_front_bottom")
                    {
                        this.setState({
                            isFrontSubmitted: true,
                            isFrontSaved: false,
                            isFrontChanged: false,
                            isFileDragged: false
                        })
                    }else{
                        this.setState({
                            isFrontSaved: true,
                            isFrontChanged: true,
                        })
                    }
                }
        }
    }

    backDragOver = (e) => {
        e.preventDefault();
        this.setState({ isBackDraged: true});
    }
    
    backDragEnter = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isBackDraged: true});
    }
    
    backDragLeave = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isBackDraged: false});
    }
    
    backFileDrop = async (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        let type = files[0].type;
        this.setState({isBackDraged: false, backFile:files[0]});
        var reader = new FileReader();
        var url = reader.readAsDataURL(files[0]);
        let sizeError = 0;
        let fileError = 0;
        let fileSize = files[0].size / 1024 / 1024;
        let fname = files[0].name;
        var re = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG|\.pdf)$/i;
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
                this.setState({isFileDragged: false, validBackPic: false, backErrorMsg: "File extension not supported!"});
            }else if(sizeError === 1){
                this.setState({isFileDragged: false, validBackPic: false, backErrorMsg: "File size exceeds 5 MB"});
            }
        }else{
           
            reader.onloadend = function (e) {
                let doctype =1;
                let isSubmit = false;
                if(type ==="application/pdf")
                {
                    doctype = 2;
                    isSubmit = true;
                }
                this.setState({
                    isBackSubmitted: isSubmit,
                    backFileType: doctype,
                    backType: type,
                    backBase: reader.result,
                    backSrc: [reader.result],
                    isFileDragged: false,
                    isBackDeleteEnable: true,
                //  isBackCrop: true
                })
                }.bind(this);
                const checkData = await this.checkFraud(files[0], 2);
                console.log("checkData", checkData);
                if(!checkData.status)
                {
                    this.setState({
                        isBackSubmitted: true,
                        isBackSaved: false,
                        isBackChanged: false,
                        isFileDragged: false,
                    })
                }else {
                    if(checkData.type !=="aadhaar_back")
                    {
                        this.setState({
                            isBackSubmitted: true,
                            isBackSaved: false,
                            isBackChanged: false,
                            isFileDragged: false,
                        })
                    }else{
                        this.setState({
                            isBackSaved: true,
                            isBackChanged: true,
                        })
                    }
                }
        }
    }

    handleFrontFileSelect = async (e) => {
        e.preventDefault();
        const files = e.target.files;
        let type = files[0].type;
        this.setState({frontFile:files[0]});
        var reader = new FileReader();
        var url = reader.readAsDataURL(files[0]);
        let sizeError = 0;
        let fileError = 0;
        let fileSize = files[0].size / 1024 / 1024;
        let fname = files[0].name;
        var re = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG|\.pdf)$/i;
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
                this.setState({isFileDragged: false, validFrontPic: false, frontErrorMsg: "File extension not supported!"});
            }else if(sizeError === 1){
                this.setState({isFileDragged: false, validFrontPic: false, frontErrorMsg: "File size exceeds 5 MB"});
            }
        }else{
            
            reader.onloadend = function (e) {
                let doctype =1;
                let isSubmit = false;
                if(type ==="application/pdf")
                {
                    doctype = 2;
                    isSubmit = true;
                }
                this.setState({
                isFrontSubmitted: isSubmit,
                frontFileType: doctype,
                frontType: type,
                frontBase: reader.result,
                frontSrc: [reader.result],
                isFileDragged: false,
                isFrontDeleteEnable: true,
                // isFrontCrop: true
                })
                }.bind(this);
            const checkData = await this.checkFraud(files[0], 1);
            console.log("checkData", checkData);
            if(!checkData.status)
            {
                this.setState({
                    isFrontSubmitted: true,
                    isFrontSaved: false,
                    isFrontChanged: false,
                    isFileDragged: false,
                    })
            }else {
                if(checkData.type !=="aadhaar_front_bottom")
                {
                    this.setState({
                        isFrontSubmitted: true,
                        isFrontSaved: false,
                        isFrontChanged: false,
                        isFileDragged: false,
                    })
                }else{
                    this.setState({
                        isFrontSaved: true,
                        isFrontChanged: true,
                    })
                }
            }
        }
    }

    handleBackFileSelect = async (e) => {
        e.preventDefault();
        const files = e.target.files;
        let type = files[0].type;
        this.setState({backFile:files[0]});
        var reader = new FileReader();
        var url = reader.readAsDataURL(files[0]);
        let sizeError = 0;
        let fileError = 0;
        let fileSize = files[0].size / 1024 / 1024;
        let fname = files[0].name;
        var re = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG|\.pdf)$/i;
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
                this.setState({isFileDragged: false, validBackPic: false, backErrorMsg: "File extension not supported!"});
            }else if(sizeError === 1){
                this.setState({isFileDragged: false, validBackPic: false, backErrorMsg: "File size exceeds 5 MB"});
            }
        }else{
            reader.onloadend = function (e) {
                let doctype =1;
                let isSubmit = false;
                if(type ==="application/pdf")
                {
                    doctype = 2;
                    isSubmit = true;
                }
                this.setState({
                    isBackSubmitted: isSubmit,
                    backFileType: doctype,
                    backType: type,
                    backBase: reader.result,
                    backSrc: [reader.result],
                    isFileDragged: false,
                    isBackDeleteEnable: true,
                //  isBackCrop: true,
                })
                }.bind(this);
            const checkData = await this.checkFraud(files[0], 2);
            console.log("checkData", checkData);
            if(!checkData.status)
            {
                this.setState({
                    isBackSubmitted: true,
                    isBackSaved: false,
                    isBackChanged: false,
                    isFileDragged: false,
                })
            }else {
                if(checkData.type !=="aadhaar_back")
                {
                    this.setState({
                        isBackSubmitted: true,
                        isBackSaved: false,
                        isBackChanged: false,
                        isFileDragged: false,
                    })
                }else{
                    this.setState({
                        isBackSaved: true,
                        isBackChanged: true,
                    });
                }
            }
        }
    }

    backFileRetry = () => {
        var reader = new FileReader();
        reader.readAsDataURL(this.state.backFile);
        reader.onloadend = function (e) {
            this.setState({
                backSrc: [reader.result],
               // isBackCrop: true,
            })
            }.bind(this);
    }

    frontFileRetry = () => {
        var reader = new FileReader();
        reader.readAsDataURL(this.state.frontFile);
        reader.onloadend = function (e) {
            this.setState({
                frontSrc: [reader.result],
               // isFrontCrop: true
            })
            }.bind(this);
    }

    backFileDelete = async (id) =>{
        const { dispatch, salesForceToken } = this.props
        if(id !=null)
        {
            let data = {
                id: id,
                token: salesForceToken
            }
            await dispatch(removeDocument(data));
        }
        
        this.setState({
            backSrc: '',
            backFile: '',
            isBackSaved: false,
            isBackSubmitted: false,
            isBackChanged: false,
        })
    }

    frontFileDelete = async (id) =>{
        const { dispatch, salesForceToken } = this.props
        if(id !=null)
        {
            let data = {
                id: id,
                token: salesForceToken
            }
           await dispatch(removeDocument(data));
        }
        
        this.setState({
            frontSrc: '',
            frontFile: '',
            isFrontSaved: false,
            isFrontSubmitted: false,
            isFrontChanged: false,
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
        const reader = new FileReader()
        let baseURL = "";
        reader.readAsDataURL(this.state.croppedImage);
        reader.onload = () => {
          this.setState({
            frontType: "image/png",
            frontBase: reader.result,
            frontSrc: [reader.result],
            isFrontCrop: false,
            isFrontSaved: true,
            isFrontSubmitted: false
        })
        };
    }

    handleFrontCropCancel = () =>{
        this.setState({ isFrontCrop: false, isFrontSaved: false })
    }

    handleBackCrop = () =>{
        this.setState({isBackCrop: true});
    }

    handleBackCropSave = () =>{
        const reader = new FileReader()
        let baseURL = "";
        reader.readAsDataURL(this.state.croppedImage);
        reader.onload = () => {
          this.setState({
            backType: "image/png",
            backBase: reader.result,
            backSrc: [reader.result],
            isBackCrop: false,
            isBackSaved: true,
            isBackSubmitted: false
        })
        };
    }

    handleBackCropCancel = () =>{
          this.setState({ isBackCrop: false })
    }
    
    handleSubmit = e => {
        e.preventDefault()
        let baseData = [];
        let baseType = [];
        let fileType = [];
        let eduFileType = [];
        
        if(this.state.isFrontChanged)
        {
            let frontBase = this.state.frontBase; 
            const fronBase64 = frontBase.replace(`data:${this.state.frontType};base64,`, "");
            baseData.push(fronBase64);
            baseType.push("Aadhar-Front");
            eduFileType.push("Aadhar Front");
            fileType.push(this.state.frontType);
        }

        if(this.state.isBackChanged)
        { 
            let backBase = this.state.backBase;
            const backBase64 = backBase.replace(`data:${this.state.backType};base64,`, "");    
            baseData.push(backBase64);
            baseType.push("Aadhar-Back");
            eduFileType.push("Aadhar Back");
            fileType.push(this.state.backType);
        }
          const d = new Date()
          const time = d.getTime()
          let data = {
              "token": this.props.salesForceToken,
              "parent_id": this.props.sfid,
              "fname": "eduvan-web-"+time+'.jpg',
              "base64": baseData,
              "doctype": baseType,
              "basetype": fileType,
              "catType": "ID Proof",
              "fileType": eduFileType,
              "id": parseInt(this.props.user)
          }
          this.props.dispatch(uploadDocument(data)).
          then((reponse) => {
              if(reponse === "success")
              {
                this.props.history.push("/ed_doc_pan");
                this.setState({isSuccess: true, isFrontSubmitted: true, isBackSubmitted: true});
              }
            })
            .catch((error) => {
              console.log(error);
            });
    }

    handleFileDrag = () =>{
        this.setState({ isFileDragged: true});
    }

    handleFrontErrorClose = () =>{
        this.setState({validFrontPic: true, frontErrorMsg:''});
    }

    handleBackErrorClose = () =>{
        this.setState({validBackPic: true, backErrorMsg:''});
    }

    checkFraud = async (file, type) => {
        const { sfid } = this.props
        const { frontDocAttempt, backDocAttempt } = this.state
        return new Promise(async (resolve, reject) => {
            try {
                    const { dispatch, user } = this.props
                    var formdata = new FormData();
                    formdata.append("sfid", sfid);
                    if(type == 1)
                    {
                        formdata.append("type", "ADHAR-FRONT");
                    }else{
                        formdata.append("type", "ADHAR-BACK");
                    }
                    formdata.append("files", file);
                    await dispatch(fraudCheck(formdata)).then(async (response)=>{
                    console.log("checkFraud", response);
                    if(response.status && response.status =="success")
                    {
                        const res = response.result?response.result:null;
                        const getData = res && res.length > 0 ?res[0]:null;
                        const doctype = getData && getData.type?getData.type:null;
                        if(type == 1)
                        {
                            this.setState({validFrontPic: true, frontSuccessMsg: "Verified Successfully!"});
                            /* var formdata1 = new FormData();
                            formdata1.append("user", user);
                            formdata1.append("imageDetails1", this.state.profile);
                            formdata1.append("imageDetails2", file);
                            formdata1.append("imageDetails3", '');
                            await dispatch(ocrCheck(formdata1)).then((response)=>{
                                if(response.status =="success")
                                {
                                    const result = response.result?response.result:null;
                                    if(result && result.action && result.action == "approve")
                                    {
                                        this.setState({validFrontPic: true,frontErrorMsg:'', frontSuccessMsg: "Verification Successful!"});
                                    }else{
                                        this.setState({validFrontPic: false, frontSuccessMsg:'', frontErrorMsg: "Invalid aadhar front document!"});
                                    }
                                }else{
                                    this.setState({validFrontPic: false, frontSuccessMsg:'', frontErrorMsg: "Invalid aadhar front document!"});
                                }
                            }); */
                        }else if(type == 2)
                        {
                            this.setState({validBackPic: true, frontSuccessMsg:'', backSuccessMsg: "Verified Successfully!"});
                        }else{
                            if(type == 1)
                            {
                                this.setState({validFrontPic: false, backErrorMsg:'', frontErrorMsg: "Invalid aadhar front document!"});
                            }else {
                                this.setState({validBackPic: false, frontSuccessMsg:'', backErrorMsg: "Invalid aadhar back document!"});
                            }
                        }
                        resolve({status: true, type: response.type});
                    }else{
                        if(type == 1)
                        {
                            const doctAttempt = frontDocAttempt+1;
                            this.setState({frontDocAttempt: doctAttempt});
                            if(doctAttempt > 2)
                            {
                                this.setState({validFrontPic: false, frontErrorMsg: "Your adhaar front document not verified Still you can submit to backend verification"});
                                resolve({status: true, type: 'aadhaar_front_bottom'});
                            }else{
                                this.setState({validFrontPic: false, frontErrorMsg: response.message});
                                resolve({status: true});
                            }
                        }else {
                            const doctAttempt = backDocAttempt+1;
                            this.setState({backDocAttempt: doctAttempt});
                            if(doctAttempt > 2)
                            {
                                this.setState({validBackPic: false, backErrorMsg: "Your adhaar back document not verified Still you can submit to backend verification"});
                                resolve({status: true, type: 'aadhaar_back'});
                            }else{
                                this.setState({validBackPic: false, backErrorMsg: response.message});
                                resolve({status: true});
                            }
                        }
                    }
                });
            } catch (err) {
                console.log("Error", err);
                reject({status: true, message: err && err.message ? err.message : err})
            }
        });
    }

    render() {
       
        let inputRef;
        let frontInputRef;
        const styles = {background: '#1F1F2D',borderRadius: '10px',color: '#ffffff'};
        const { isLoading, history } = this.props;
        const { isFrontDeleteEnable, isBackDeleteEnable } = this.state
        return (
            <>
            <Helmet>
            <title> Eduvanz Aadhar </title>
            <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            {isLoading?(
              <div className="loading">Loading&#8230;</div>
             ):''}
            <section className="kyc_pages dragarea">
            <div className={`container-zero ${(!this.state.backSrc || !this.state.frontSrc)?'dragarea':''}  ${this.state.isFileDragged?'active':''}`}>

            <div className="flex-w flex-tr">
            <div className="kyc_leftbar bg-2">
       
            <h4 onClick={ () => history.push('/home')} className="cursor-point mtext-105 cl6">eduvanz.</h4>
            <div className="navigations">
            <ul className="breadcrumps">
                <li className="b_back"><Link to="/ed_digilocker">Back</Link></li>
            </ul>
            </div>
     
            <ul className="kyc_timeline">
                <li className="complete">Registration</li>
                <li className="complete">Limit Approval</li>
                <li className="has_child ongoing">Identity Verifcation <span className="sheading">Keep your document ready</span>
                    <ul className="sub_timeline">
                        <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('ed_doc_profile')} className="complete">Photograph</li>
                        <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('ed_digilocker')} className="active">Identity Card</li>
                        <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('ed_doc_pan')} >PAN Card</li>
                    </ul>
                </li>
                <li>Auto pay <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
                <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
            </ul>
            </div>
            <div className="kyc_rightbar flex-w flex-col-m justify-content-center">
            <div className="form_width_1 ext8 mb-1 mt-1">
              <div className="form_details">
                <h4 className="bg-1 text-center imgaligned"><img src={asset+"images/icons/icon_briefcase.svg"} /> Aadhar KYC </h4>
                <ul className="horizontal_list">
                <li>Max file size 5 MB</li>
                <li>File should be pdf, JPEG, PNG</li>
                <li>Image should be clear</li>
                </ul>
                <form  className={`otpform otpform-others fullwidth`} onDragEnter={this.handleFileDrag} >
                <div className="d-flex flex-col-m mn_height_4">
                  <div className="row justify-content-center">
                    <div className="max-width-700">
                    <div className="row">
                    <div className="col-md-6 text-center">
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
                                {!this.state.isFrontSubmitted?(
                                <>
                                    <button type="button" onClick={this.handleFrontCrop} className="btn btn-default"><img src={asset+"images/Vector9.png"} />Crop</button>
                                    <button type="button" onClick={this.frontFileRetry} className="btn btn-default"><img src={asset+"images/Vector-8.png"} />Retry</button>
                                </>
                                ):''}
                                {isFrontDeleteEnable && (
                                    <button type="button" onClick={()=>this.frontFileDelete(this.state.frontId)} className="btn_delete"><img src={asset+"images/Vector-delete.svg"} /></button>
                                )}
                                </div>
                                {this.state.frontFileType ===2?(
                                    <img style={{cursor:'pointer', width: '53%', padding: '10px'}} onClick={()=>this.handlePdfView(this.state.frontBase)} src='images/pdf.png' />
                                ):(
                                    <img src={this.state.frontSrc} />
                                )}
                                </>
                            )
                            ):(
                            <>
                            <div 
                                className={`drop-container ${!this.state.frontSrc && !this.state.backSrc?"a_front":"singleimg" }`} 
                                onDragOver={this.dragOver}
                                onDragEnter={this.dragEnter}
                                onDragLeave={this.dragLeave}
                                onDrop={this.fileDrop}
                            >
                                <h3>Drag left to upload Front Side!</h3>
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
                            {this.state.isSuccess?
                            (
                                <div className="alert green-success fade show success_img" role="alert">
                                Aadhar uploaded successfully
                                <img style={{maxWidth: 400}} type="button" className="close" data-dismiss="alert" aria-label="Close" src={asset+"images/icons/icon_right.svg"} />
                                </div>
                            ):''
                            }
                            {this.state.validFrontPic && this.state.frontSuccessMsg !=''?
                              (
                              <div className="alert green-success fade show success_img" role="alert">
                                {this.state.frontSuccessMsg}
                                <img style={{maxWidth: 400}} type="button" className="close" data-dismiss="alert" aria-label="Close" src={asset+"images/icons/icon_right.svg"} />
                              </div>
                              ):''
                            }
                            {!this.state.validFrontPic && this.state.frontErrorMsg !=='' &&(
                                <div className="alert red-danger fade show" role="alert">
                                    {this.state.frontErrorMsg}
                                    <img type="button" onClick={this.handleFrontErrorClose} className="close" data-dismiss="alert" aria-label="Close" src={asset+"images/icons/icon_wrong.svg"} />
                                </div>
                            )}
                            </div>
                        </div>
                        <div className="col-md-6 text-center">
                            <h1 className="upload_headings">Back</h1>
                            <div className="upload_box d-block cropped_img">
                            {this.state.backSrc?(
                                 this.state.isBackCrop?(
                                    <>
                                    <div className="btn_align_top align-center">
                                    <button type="button" onClick={this.handleBackCropSave} className="btn btn-default">&nbsp;Ok</button>
                                    <button type="button" onClick={this.handleBackCropCancel} className="btn btn-default">&nbsp;Cancel</button>
                                    </div>
                                    <ReactCrop
                                        src={this.state.backSrc}
                                        crop={this.state.crop}
                                        onImageLoaded={this.onImageLoaded}
                                        onComplete={this.onCropComplete}
                                        onChange={this.onCropChange}
                                    /> 
                                    </>
                                ):(
                                <>
                                   
                                    <div className="btn_align_top">
                                    {!this.state.isBackSubmitted?(
                                    <>
                                        <button type="button" onClick={this.handleBackCrop} className="btn btn-default"><img src={asset+"images/Vector9.png"} />Crop</button>
                                        <button type="button" onClick={this.backFileRetry} className="btn btn-default"><img src={asset+"images/Vector-8.png"} />Retry</button>                                    
                                    </>
                                    ):''}
                                    {isBackDeleteEnable && (
                                        <button type="button" onClick={()=>this.backFileDelete(this.state.backId)} className="btn_delete"><img src={asset+"images/Vector-delete.svg"} /></button>
                                    )}
                                    </div>
                                    {this.state.backFileType===2?(
                                        <img style={{cursor:'pointer', width: '53%', padding: '10px'}} onClick={()=>this.handlePdfView(this.state.backBase)} src={asset+'images/pdf.png'} />
                                    ):(
                                        <img src={this.state.backSrc} />
                                    )}
                                </>
                                )
                            ):(
                            <>
                            <div 
                                className={`drop-container ${!this.state.frontSrc && !this.state.backSrc?"a_back":"singleimg" }`}
                                onDragOver={this.backDragOver}
                                onDragEnter={this.backDragEnter}
                                onDragLeave={this.backDragLeave}
                                onDrop={this.backFileDrop}
                            >
                                <h3>Drag right to upload Back Side!</h3>
                                {this.state.isBackDraged && (<h5 style={{color: '#a5a5a5'}}>Upload file upto 5MB by dropping in this window</h5>)}
                            </div>
                            <div className="or_type1">or</div>
                            <input
                                type="file"
                                style={{display: 'none'}}
                                ref={refParam => inputRef = refParam}
                                onChange={this.handleBackFileSelect}
                                accept="image/x-png,image/gif,image/jpeg,image/jpg,application/pdf"
                            />
                            <button type="button" onClick={() => inputRef.click()} className={"btn btn-upload"}>
                                    Upload Back
                            </button>
                            </>
                            )}
                            {!this.state.validBackPic && this.state.backErrorMsg !=='' &&(
                               <div className="alert red-danger fade show" role="alert">
                                   {this.state.backErrorMsg}
                                   <img type="button" onClick={this.handleBackErrorClose} className="close" data-dismiss="alert" aria-label="Close" src={asset+"images/icons/icon_wrong.svg"} />
                               </div>
                            )}   
                            {this.state.isSuccess?(
                                <div className="alert green-success fade show success_img" role="alert">
                                Aadhar uploaded successfully
                                    <img type="button" className="close" data-dismiss="alert" aria-label="Close" src={asset+"images/icons/icon_right.svg"} />
                                </div>
                             ):''
                            }
                            {this.state.validBackPic && this.state.backSuccessMsg !=='' &&( 
                                <div className="alert green-success fade show success_img" role="alert">
                                    {this.state.backSuccessMsg}
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
                 {(this.state.isFrontChanged || this.state.isBackChanged) && (this.state.frontBase !="" || this.state.backBase !="") && (
                   <button 
                      type="button" 
                      onClick={this.handleSubmit}
                      className="stext-101 cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300"
                      style={styles}
                      >Submit</button>
                 )}
                 </div>
                  <p className="text-center mb-4"><Link className="blue_link" to="/ed_doc_others">Don’t have aadhar?</Link></p>
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
  const { userBase } = state.user
  const { message } = state.message;
  return {
      salesForceToken,
      userBase,
      sfid,
      user,
      isLoading,
      message
  };
}

export default connect(mapStateToProps)(KycScreen12)