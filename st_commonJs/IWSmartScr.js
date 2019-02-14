/*!
 * etag
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 *
 * see: https://cn.vuejs.org/v2/api/#vm-watch  (取消回调的办法)
 */

'use strict'
import Vue from "vue"
import { fail } from "assert";
if(typeof IWNativeCore == "undefined"){
  console.log('IWsmart must running in ShuTuo Android platform');
}
/**
 * params:
 * {
 *      "appId": "10001",
 *      "module": [],
 *  }
 *
 */
let _vm = undefined
window.IWSmartScr = undefined
let initFunc = undefined
let tryTimer;
let oldLog;
let debugEle;
IWSmartScr = function (config,_vue) {
    self.appId = config.appId
    self.module = config.module
    self.faceInfoList = [] // limit = 10
    self.faceInfo = {}
    self.nearInfo = {}
    self.scanCodeInfo = {}
    self.getDeviceInfoFailed = {}
    self.getDeviceInfoSuccess = {}
    self.takePictureSuccessCallback = {}
    self.takePictureFailedCallback = {}
    self.captureFaceSuccessCallback = {}
    self.captureFaceFailedCallback = {}
    self.recordSuccessCallback = {}
    self.recordFailedCallback = {}
    self.obtainFaceIdSuccessCallback = {}
    self.obtainFaceIdFailedCallback = {}
    self.nfcMessage = {}
    self.scannerMessage = {}
    self.inputDeviceInfo = {}
    self.requestApiFailed = {}
    self.requestApiSuccess = {}
    self.requestIMMessage = {}
    self.netWorkState = {}
    self.socketServerGetMsg = {}
    self.socketClientGetMsg = {}
    self.socketConnectedState = {}
    self.socketServerState = {}
    self.socketClientState = {}
    self.socketSendMsg = {}
    self.socketInit = {}
    self.peripheralDeviceState = {}
    self.personStateCallback = {}
    self.depthTrackingStateCallback = {}
    self.depthHeadPointCallback = {}
    self.mergeVideoSuccessCallback = {}
    self.mergeVideoFailedCallback = {}
    self.obtainFaceInfoSuccessCallback = {}
    self.obtainFaceInfoFailedCallback = {}
    self.deleteFileSuccess = {}
    self.deleteFileFailed = {}
    self.shareVideoGenQRCode = {}
    self.shareVideoUploadFinish = {}
    self.shareVideoError = {}
    self.netWorkSpeed = {}
    self.videoUpSchedule = {}
    self.faceImageSuccessCallback = {}
    self.faceImageFailCallback = {}
    self.hasFaceIn = {}
    self.configData = {
        "appId": self.appId,
        "module": self.module,
        "envData": {},
        "faceInfoList": self.faceInfoList,
        "faceInfo": self.faceInfo,
        "nearInfo": self.nearInfo,
        "scanCodeInfo": self.scanCodeInfo,
        "getDeviceInfoSuccess": self.getDeviceInfoSuccess,
        "getDeviceInfoFailed": self.getDeviceInfoFailed,
        "takePictureSuccessCallback" : self.takePictureSuccessCallback,
        "takePictureFailedCallback" : self.takePictureFailedCallback,
        "captureFaceSuccessCallback" : self.captureFaceSuccessCallback,
        "captureFaceFailedCallback" : self.captureFaceFailedCallback,
        "recordSuccessCallback" : self.recordSuccessCallback,
        "recordFailedCallback" : self.recordFailedCallback,
        "obtainFaceIdSuccessCallback" : self.obtainFaceIdSuccessCallback,
        "obtainFaceIdFailedCallback" : self.obtainFaceIdFailedCallback,
        "nfcMessage" : self.nfcMessage,
        "scannerMessage" : self.scannerMessage,
        "requestApiSuccess": self.requestApiSuccess,
        "requestApiFailed": self.requestApiFailed,
        "requestIMMessage": self.requestIMMessage,
        "netWorkState": self.netWorkState,
        "socketServerGetMsg": self.socketServerGetMsg,
        "socketClientGetMsg": self.socketClientGetMsg,
        "socketConnectedState": self.socketConnectedState,
        "socketServerState": self.socketServerState,
        "socketClientState": self.socketClientState,
        "socketSendMsg": self.socketSendMsg,
        "socketInit": self.socketInit,
        "hasFaceIn": self.hasFaceIn,
        "peripheralDeviceState": self.peripheralDeviceState,
        "personStateCallback": self.onPersonStateCallback,
        "depthTrackingStateCallback": self.onDepthTrackingStateCallback,
        "depthHeadPointCallback": self.onDepthHeadPointCallback,
        "mergeVideoSuccessCallback": self.mergeVideoSuccessCallback,
        "mergeVideoFailedCallback": self.mergeVideoFailedCallback,
        "generateVideoThumbnailSuccessCallback": self.generateVideoThumbnailSuccessCallback,
        "generateVideoThumbnailFailedCallback": self.generateVideoThumbnailFailedCallback,
        "obtainFaceInfoSuccessCallback": self.obtainFaceInfoSuccessCallback,
        "obtainFaceInfoFailedCallback": self.obtainFaceInfoFailedCallback,
        "deleteFileSuccess": self.deleteFileSuccess,
        "deleteFileFailed": self.deleteFileFailed,
        "shareVideoGenQRCode": self.shareVideoGenQRCode,
        "shareVideoUploadFinish": self.shareVideoUploadFinish,
        "shareVideoError": self.shareVideoError,
        "netWorkSpeed": self.netWorkSpeed,
        "videoUpSchedule": self.videoUpSchedule,
        "inputDeviceInfo": self.inputDeviceInfo,
        "faceImageSuccessCallback": self.faceImageSuccessCallback,
        "faceImageFailCallback": self.faceImageFailCallback
    }
    // if(_vue && !_vm){
    //     for(var k in self.configData){
    //         console.log(k,self.configData[k])
    //         _vue.$set(k,self.configData[k])
    //     }
    //     self.vm = _vm = _vue
    // }else
    if(_vm){
        self.vm = _vm
    }else{
        self.vm =_vm = new Vue({"data": self.configData})
    }
    initFunc(self)
    self.ready = function(callback){
        if(!self.module || self.module.length==0){
            callback()
            return
        }
        this.console.log(self.module, JSON.stringify(self.module))
        IWNativeCore.getInitInfo(JSON.stringify(self.module))
        self._closeWatch("envData")
        self.vm.$watch("envData", function(res) {
            self.envData = self.configData["envData"] = res
            callback(res)
        }, {

        })
        self._addWatchName("envData")
    }
    return self
}
initFunc = function (self) {
    // get deviceInfo API

    /**
     * return:
     * {
     *      "screenId": "10001",
     *      "screenName": "abcdefg",
     *      "orientation": "h",     // "h" or "v"
     *      "bindState": 1,
     *      "shopInfo": {},
     *      "engine": "stRender",
     *      "engineVer": "1.0.2"
     *  }
     *
     */
    self.getDeviceInfo = function(callback) {
        console.log("enter getDeviceInfo ", callback )
        IWNativeCore.getDeviceInfo()
         self._closeWatch("getDeviceInfoSuccess")
        self.vm.$watch("getDeviceInfoSuccess", function(res) {
            callback(res)
        }, {

        })
        self._addWatchName("getDeviceInfoSuccess")
    }
    self.onNearLevelChanged = function(params, callback) {
        IWNativeCore.openNearLevelChanged()
        self._closeWatch("nearInfo")
        self.vm.$watch("nearInfo", function(data){
             callback(data)
        }, {

        })
        self._addWatchName("nearInfo")
    }

    self.closeNearLevelChanged = function () {
        self._closeWatch("nearInfo")
        IWNativeCore.closeNearLevelChanged()
    }
    
    self.closeApp = function(){
        IWNativeCore.closeApp()
    }

    /**
     * 背景视频
     */
    self.loadDefaultVideoBackground = function() {
        IWNativeCore.loadDefaultVideoBackground();
    }
    self.loadDefaultVideoBackground = function(param) {
        IWNativeCore.loadDefaultVideoBackground(param);
    }
    self.closeVideoBackground = function() {
        IWNativeCore.closeVideoBackground();
    }
    // video
    self.playVideo = function(param) {
        IWNativeCore.playVideo(JSON.stringify(param));
    }
    self.stopVideo = function() {
        IWNativeCore.stopVideo();
    }

    //
    self.setViewToFront = function(param) {
        IWNativeCore.setViewToFront(param);
    }
    self.setBgColor = function(param) {
        IWNativeCore.setBackgroundColor(JSON.stringify(param));
    }
    //

    /**
     * 扫码枪
     */
    self.scanCode = function(callback){
        // respCode -> int, 0: call succeed; or other error code;
        // data -> execute scan job result string;
        self.vm.$watch("scanCodeInfo", callback, {

        })
    }

    /**
     * 开启体感传感器
     */
    self.openMotionSensing = function(callback) {
        IWNativeCore.openMotionSensing()
        self._closeWatch("openMotionSensing")
        self.vm.$watch("openMotionSensing", function(data){
             callback(data)
        }, {

        })
        self._addWatchName("openMotionSensing")
    }

    /**
     * 关闭体感传感器
     */
    self.closeMotionSensing = function () {
        self._closeWatch("closeMotionSensing")
        IWNativeCore.closeMotionSensing()
    }

    /**
     * 模式2 有无人状态      0为无人  1为有人
     */
    self.onPersonStateCallback = function(callback) {
        self.vm.$watch("personStateCallback", callback, {

        })
    }

    /**
     * 0有人经过 1保持特定姿势 2绑定成功
     */
    self.onDepthTrackingStateCallback = function(callback) {
        self.vm.$watch("depthTrackingStateCallback", callback, {
            
        })
    }

    /**
     * 体感传感器头部追踪
     */
    self.onDepthHeadPointCallback = function(callback) {
        self.vm.$watch("depthHeadPointCallback", callback, {
            
        })
    }

    
//--------------------------------------------------------------------------------
    /**
     *
     * @param video_config
     *  {
     *       "buffSize": "720",
     *      "camId": 1,
     *       "videoPosition": [0,0,1920,1080],
     *       "videoFilter": "mirrBody",
     *       "startRecord": 0,
     *       "durationRecord": 0
     *   }
     */
    self.camVideoBackground = function(video_config){
        self.video_config = {
            "buffSize": 720,
            "camId": 1,
            "full_screen": 0,
            "videoPosition": {"x":0, "y":0, "width":1920, "height": 1080},
            "videoFilter": "mirrBody",
            "camRotation": 0,
            "startRecord": 0,
            "durationRecord": 0,
            "level":0
        }
        if(video_config.buffSize){
            self.video_config.buffSize = video_config.buffSize
        }
        if(video_config.camRotation){
            self.video_config["camRotation"] = video_config.camRotation
        }
        if(video_config.full_screen){
            self.video_config["full_screen"] = video_config.full_screen
        }

        if (video_config.videoPosition){
            var x = video_config.videoPosition["x"]
            var y = video_config.videoPosition["y"]
            var w = video_config.videoPosition["width"]
            var h = video_config.videoPosition["height"]
            function chp(p){
                if(0<=parseInt(p)<=1920){
                    return p
                }else{
                    return 0
                }
            }
            self.video_config.videoPosition = {"x":chp(x), "y":chp(y), "width": chp(w), "height":chp(h)}
        }else{
            console.log("error videoPosition")
        }
        if(video_config.level){
            self.video_config["level"] = video_config.level
        }

        console.log("video config", self.video_config)
        IWNativeCore.camVideoBackground(JSON.stringify(self.video_config))
    }

    // self.closeCamVideoBackground = function(camConfig,callback){
    //     IWNativeCore.closeCamVideoBackground(JSON.stringify(camConfig))
    // }
    //
    self.closeCamVideoBackground = function(){
        IWNativeCore.closeCamVideoBackground()
    }


    /**
     * takePicture
     *
     * @param {*} callback
     */
    self.listenHasFaceIn = function(callback){
        IWNativeCore.obtainFaceInListener()
        self._closeWatch("hasFaceIn")
        self.vm.$watch("hasFaceIn", function(res) {
            console.log('listenHasFaceIn', res)
            callback(res)
        }, {
            //console.log("captureFace success : ", res)
        })
        self._addWatchName("hasFaceIn")
    }
    /**
     * takePicture
     *
     * @param {*} callback
     */
    
    // self.takePicture = function(callback) {
    //     console.log("enter takePicture : ", callback)
    //     IWNativeCore.takePicture()

    //     self.vm.$watch("takePictureSuccessCallback", function(res) {
    //         callback.success(res)
    //     }, {
    //         //console.log("take success : ", res)
    //     })

    //     self.vm.$watch("takePictureFailedCallback", function(res){
    //         callback.failed(res)
    //     }, {
    //         //console.log("take failed : ", res)
    //     })
    // }
    self.takePicture = function(callback) {
        console.log("call native takePicture : ", '')
        
        const date = new Date()
        // const reqId = date.getTime()
        let reqId = '';
        // IWNativeCore.takePicture(reqId)
        IWNativeCore.takePicture()

        const methodSuccess ='takePictureSuccessCallback'+ reqId
        const methodFail ='takePictureFailedCallback'+ reqId
        self._closeWatch(methodSuccess)
        self._closeWatch(methodFail)

        self.vm.$set(self.vm.takePictureSuccessCallback, methodSuccess, '__')
        self.vm.$set(self.vm.takePictureFailedCallback, methodFail, '__')
        let watchSuccessMethod = "takePictureSuccessCallback."+ methodSuccess
        let watchFailMethod = "takePictureFailedCallback."+ methodFail
        self.vm.$watch(watchSuccessMethod, function(res) {
            self._closeWatch(methodSuccess)
            callback.success(res)
        }, {
            //console.log("faceImageFile success : ", res)
        })
        self._addWatchName(methodSuccess)
        
        self.vm.$watch(watchFailMethod, function(res){
            self._closeWatch(methodFail)
            callback.failed(res)
        }, {
            //console.log("faceImageFile failed : ", res)
        })
        self._addWatchName(methodFail)
    }

    self.capture = function(callback){
        IWNativeCore.capture()
        self._closeWatch("takePictureSuccessCallback")
        self.vm.$watch("takePictureSuccessCallback", function(data) {
            callback(data)
        }, {
            //console.log("take success : ", res)
        })
        self._addWatchName("takePictureSuccessCallback")
    }
    /**
     * record
     * 
     * @param {*} callback 
     */
    self.record = function(params, callback) {
        console.log("call native record : ", params)
        IWNativeCore.record(params)

        self._closeWatch("recordSuccessCallback")
        self._closeWatch("recordFailedCallback")
        self.vm.$watch("recordSuccessCallback", function(res){
            callback.success(res)
        }, {
            //console.log("record failed : ", res)
        })
        self._addWatchName("recordSuccessCallback")
        
        self.vm.$watch("recordFailedCallback", function(res){
            callback.failed(res)
        }, {
            //console.log("record failed : ", res)
        })

        self._addWatchName("recordFailedCallback")
    }

//--------------------------------------------------------------------------------
    /**
     *
     * @param query_params
     *  {"mode": "listen" } "once"
     */

    self.queryNearFaceInfo = function(query_params, callback) {
        let queryLevel = "feature"
        if(query_params && query_params.queryLevel){
          queryLevel =  query_params.queryLevel
        }
        let rst_data = IWNativeCore.queryNearFaceInfo (JSON.stringify({
           queryLevel: queryLevel,  // ‘feature’ or ‘recognize’
        }))
        callback(rst_data)
    }
    self.onNearFaceInfo = function(query_params, callback) {
         let queryLevel = "feature"
         if(query_params && query_params.queryLevel){
            queryLevel =  query_params.queryLevel
         }
         IWNativeCore.openNearFaceInfo(JSON.stringify({
            queryLevel: queryLevel,  // ‘feature’ or ‘recognize’
            interval:  1,    // when mode=='listen', query loop interval  >=1, <=30
         }))
         self._closeWatch("faceInfoList")
         self.vm.$watch("faceInfoList", callback, {

          })
         self._addWatchName("faceInfoList")
    }
    /**
     *
     * @param close_params
     *  {"mode": "listen" } "once"
     */
    self.closeNearFaceInfo = function (close_params) {
        if(!close_params){
            self.mode = "listen"
        }else{
            self.mode = close_params.mode
        }
        self._closeWatch("faceInfoList")
        if(IWNativeCore.closeNearFaceInfo){
            IWNativeCore.closeNearFaceInfo()
            // IWNativeCore.closeNearFaceInfo(JSON.stringify({"mode": self.mode}))
        }else{
            console.log("closeNearFaceInfo error")
        }
    }

//--------------------------------------------------------------------------------

    /**
     * 获取摄像头识别的人脸信息
     * 
     * @param {*} query_params 
     * @param {*} callback 
     */
    self.obatinFaceInfo = function(query_params, callback) {
        let queryLevel = "feature"
        if(query_params && query_params.queryLevel){
            queryLevel =  query_params.queryLevel
        }
        console.log('call obatinFaceInfo ' + query_params)
        self._closeWatch("obtainFaceInfoSuccessCallback")
        self._closeWatch("obtainFaceInfoFailedCallback")
        IWNativeCore.openNearFaceInfo(JSON.stringify({
            queryLevel: queryLevel,  // ‘feature’ or ‘recognize’
            interval:  1,    // when mode=='listen', query loop interval  >=1, <=30
        }))

        self.vm.$watch("obtainFaceInfoSuccessCallback", function(res) {
            callback.success(res)
        }, {
            //console.log("obtainFaceInfo success : ", res)
        })
        self._addWatchName("obtainFaceInfoSuccessCallback")
        self.vm.$watch("obtainFaceInfoFailedCallback", function(error) {
            callback.failed(error)
        }, {
            //console.log("obtainFaceInfo failed : ", error)
        })
        self._addWatchName("obtainFaceInfoFailedCallback")
    }

//--------------------------------------------------------------------------------
     /**
     * caputreFace
     *
     * @param {} args
     * @param {*} callback
     */
    self.captureFace = function(args, callback) {
        console.log("enter captureFace : ", args)

        // args = {"count": 1, 'timeout': 1500}
        var date = new Date()
        var reqId = date.getTime()
        args['reqId'] = reqId;
        IWNativeCore.captureFace(JSON.stringify(args))

        let methodSuccess = 'captureSuccess'+ reqId
        let methodFail ='captureFail'+ reqId
        self._closeWatch(methodSuccess)
        self._closeWatch(methodFail)
        
        self.vm.$set(self.vm.captureFaceSuccessCallback, methodSuccess, '__')
        self.vm.$set(self.vm.captureFaceFailedCallback, methodFail, '__')
        let watchSuccessMethod = "captureFaceSuccessCallback."+ methodSuccess
        let watchFailMethod = "captureFaceFailedCallback."+ methodFail
        self.vm.$watch(watchSuccessMethod, function(res) {
            self._closeWatch(methodSuccess)
            callback.success(res)
        }, {
            //console.log("captureFace success : ", res)
        })
        self._addWatchName(methodSuccess)
        
        self.vm.$watch(watchFailMethod, function(res){
            self._closeWatch(methodFail)
            callback.failed(res)
        }, {
            //console.log("captureFace failed : ", res)
        })
        self._addWatchName(methodFail)
    }

    /**
     * caputreFace
     *
     * @param {} args
     * @param {*} callback
     */
    self.obtainFaceId = function(args, callback) {
        console.log("enter obtainFaceId : ", args)

        const timestamp = Date.parse(new Date())/1000;
        args['reqId'] = timestamp;
        IWNativeCore.obtainFaceId(JSON.stringify(args), 1)
        self._closeWatch("obtainFaceIdSuccessCallback")
        self.vm.$watch("obtainFaceIdSuccessCallback", function(res) {
            callback.success(res)
        }, {
        })
        self._addWatchName("obtainFaceIdSuccessCallback")
        
        self._closeWatch("obtainFaceIdFailedCallback")
        self.vm.$watch("obtainFaceIdFailedCallback", function(res){
            callback.failed(res)
        }, {
        })
        self._addWatchName("obtainFaceIdFailedCallback")
    }
    /**
     * NFC
    */
    self.openInputDevice = function(data){
        IWNativeCore.openInputDevice(data)
    }
    self.closeInputDevice = function(){
        IWNativeCore.closeInputDevice()
    }
    self.onInputDeviceInfo = function(data, callback) {
        IWNativeCore.openInputDevice(JSON.stringify(data))
        const deviceVar = 'inputDeviceInfo'+ data.deviceType
        self._closeWatch(deviceVar)
        self.vm.$set(self.vm.inputDeviceInfo, deviceVar, '__')
        const watchSuccessMethod = "inputDeviceInfo."+ deviceVar
        // console.log(`%crequestApi_______methodSuccess___________${methodSuccess}`, 'color: green;')
        
        self.vm.$watch(watchSuccessMethod, function(res) {
            if( res == '__' ) return;
            // self._closeWatch(deviceVar)
            callback(res)
        }, {
            //console.log("take success : ", res)
        })
        self._addWatchName(deviceVar)
    }
    /**
     * NFC
    */
    self.startNFC = function() {
        IWNativeCore.startNFC()
    }


    self.stopNFC = function() {
        IWNativeCore.stopNFC()
    }

    self.onNFCMessage = function(callback) {
        self._closeWatch("nfcMessage")
        self.vm.$watch("nfcMessage", callback, {

        })
        self._addWatchName("nfcMessage")
    }
    self.onRequestIMMessage = function(data,callback){
        console.log('requestIMMessage',data)
        IWNativeCore.onIMMessage(data)
        self._closeWatch("requestIMMessage")
        self.vm.$watch("requestIMMessage", callback, {

        })
        self._addWatchName("requestIMMessage")
    }
    self.sendIMMessage = function(data){
        IWNativeCore.sendIMMessage(data)
    }
    self.closeRequestIMMessage = function(data){
        IWNativeCore.closeIMMessage()

    }

    /**
     * scanner device 扫码枪
    */
    self.startScanner = function() {
        IWNativeCore.startScanner()
    }

    self.stopScanner = function() {
        IWNativeCore.stopScanner()
    }

    self.onScannerMessage = function(callback) {
        self.vm.$watch("scannerMessage", callback, {

        })
    }

    /*

    */
    self.eventUpt = function (params, callback){
        defaultParams = {
            "appId": "",
            "screenId": 0,
            "eventCate": "",
            "eventAction": "",
            "eventName": "",    
            "eventVersion": "1",
            "uid": "",
            "extend": {} 
        }
        for (var attr in defaultParams) {
            if(params[attr]!=undefined){
                defaultParams[attr] = params[attr];
            }else if(["screenId", "eventCate", "eventName"].indexOf(attr)==-1){
                callback.failed({"error_msg": "params error", "error_code": 400})
            }
        }
        var date_ = new Date();
        date_ = date_.valueOf();
        date_ = date_/1000;
        self.requestApi({
            "id": 118,  /* the request id */
            "nodeName": "GC",
            "apiPath" : "/geo/api_ds/json",
            "postPram": [{
                "sid": params.screenId,    // Required, integer
                "e_c": params.eventCate,  // event_category, "GAME_WAWAJI" / "GAME_LINGHONGBAO" / "YUNHUOJIA" / "SHIYIJING"
                "e_a": params.eventAction,  // event_action
                "e_n": params.eventName,  // event_name
                "e_v": params.eventVersion,  // event_value, string of (float or int)
                "e_t": date_,  // event_timestamp, string of (second, NOT millisecond)
                "uid": params.uid,  // event action user_id, optional
                "extend": params.extend  // other params, optional
            }],
            "apiMethod" : "event_upt_simple"
        },  //param
        {
            success : function(data) {
                callback.success(data)
            },
            failed : function(error) {
                callback.failed(data)
            }
        })
    }

    /**
     * request api
     */
     self.requestApi = function(param, callback) {
        console.log("enter requestApi : ", param, callback )
        const method = param['apiMethod']
        const date = new Date()
        // const reqId = date.getTime()
        const reqId = Number(String(Math.random()).split('.')[1]);
        IWNativeCore.requestApi(JSON.stringify(param), 1, reqId)
        const methodSuccess = method + 'Success'+ reqId
        const methodFail = method + 'Fail'+ reqId
        self._closeWatch(methodSuccess)
        self._closeWatch(methodFail)
        
        // self._closeWatch("requestApiSuccess")
        // self._closeWatch("requestApiFailed")
        self.vm.$set(self.vm.requestApiSuccess, methodSuccess, '__')
        self.vm.$set(self.vm.requestApiFailed, methodFail, '__')
        const watchSuccessMethod = "requestApiSuccess."+ methodSuccess
        const watchFailMethod = "requestApiFailed."+ methodFail
        // console.log(`%crequestApi_______methodSuccess___________${methodSuccess}`, 'color: green;')
        self.vm.$watch(watchSuccessMethod, function(res) {
            if( res == '__' ) return;
            // console.log(`%crequestApi________requestApi__________${self.vm.requestApiSuccess}`, 'color: green;')
            // console.log(`%crequestApi__________________${watchSuccessMethod}`, 'color: green;')
            self._closeWatch(methodSuccess)
            callback.success(res)
        }, {
            //console.log("take success : ", res)
        })
        self._addWatchName(methodSuccess)
        self.vm.$watch(watchFailMethod, function(res){
            if( res == '__' ) return;
            self._closeWatch(methodFail)
            callback.failed(res)
        }, {
            //console.log("take failed : ", res)
        })
        self._addWatchName(methodFail)
    }
    self._closeWatch = function (watchName) {
      let len = self.vm._watchers.length
      console.log("close watch: "+watchName+"  len is "+len)
      while (len--) {
            if(watchName){
              if(self.vm._watchers[len].expression==watchName){
                self.vm._watchers[len].teardown()
              }
            }else{
              self.vm._watchers[len].teardown()
            }
      }
    }
    self._addWatchName = function(watchName){
        var len = self.vm._watchers.length
        if(len){
           self.vm._watchers[len-1].expression =  watchName
        }
    }
    self.userFaceRecognition =  function(params, callback){
        let retryMaxNumber = params["retryMaxNumber"]
        let retryInterval = params["retryInterval"]
        var ret_need = params["ret_need"];
        if(tryTimer && tryTimer != 0){
            clearInterval(tryTimer)
            tryTimer = 0
        }
         // 获取 设备信息
        self.getDeviceInfo(function(data){
          if (typeof(data) != "object"){
             data = JSON.parse(data)
          }
          const screenId = data.screenInfo.screenId;
          const shopId = data.shopInfo.shopId;
          const timestamp = Date.parse(new Date())/1000;
          // 获取 sessionID
          self.requestApi({
              "nodeName": "GC",
              "apiPath" : "/dsadm/api/json",
              "postPram" : [{
                "sid": screenId,
                "ts": timestamp
              }],
              "apiMethod" : "get_h5_session_info"
            },  //param
            {
              success : function(res) {
                var responseData = res;
                console.log('sessionId___________', responseData)
                var sessionId = responseData.h5_sess
                tryTimer = 0
                // 截图获取图片
                function  obtainFaceId(sessionId){
                    self.captureFace({"count": 1, 'timeout': 500},  {
                        success : function(fileUrls) {
                            let filesArr = fileUrls["files"]
                            console.log('一张图片', filesArr)
                            if(filesArr && filesArr[0]){
                                var files = JSON.stringify({"files": filesArr})
                                console.log('一张图片',files);
                                var postParams = {"files": files, "h5_sess": sessionId}
                                if(ret_need) { postParams['ret_need'] = ret_need };
                                // let url_ = filesArr[0].split('https://instwall_image');
                                // 获取faceID
                                self.obtainFaceId(postParams, {
                                    success : function(data) {
                                        console.log("obtainFaceId", data)
                                        clearInterval(tryTimer)
                                        tryTimer = 0
                                        data['sessionId'] = sessionId
                                        data['filesFaceId'] = files
                                        callback.success(data)
                                        
                                        // self.deleteFile(url_[1],{
                                        //     success : function(res) {
                                        //         console.log('delete file success : ', res);
                                        //     },
                                        //     failed : function(error) {
                                        //         console.log('delete file failed : ', error);
                                        //     }
                                        // })
                                    },
                                    failed : function(error) {
                                        console.log('脸部 faceID', error)
                                        
                                        // callback.failed(error)
                                        if(hadTryCount < retryMaxNumber){
                                            return
                                        }
                                        callback.failed(error)
                                    }
                                })
                            }
                        },
                        failed : function(error) {
                            console.log('capture face failed : ', error)
                            if(hadTryCount < retryMaxNumber){
                                return
                            }
                            callback.failed(error)
                        }
                    })
                }
                var hadTryCount = 1
                obtainFaceId(sessionId)

                tryTimer = setInterval(function(){
                    hadTryCount += 1
                    obtainFaceId(sessionId)
                    if(hadTryCount >= retryMaxNumber){
                       clearInterval(tryTimer)
                       tryTimer = 0
                    }
                }, retryInterval*1000)
              },
              failed : function(error) {
                console.log('failed : ', error)
              }
            })
        })
    }
    self.listenMembershipConvert = function(params, callback){
        const waitTime = params['waitTime']
        const sessionId = params['sessionId']
        const screenId = params['screenId']
        let canGo = true
        let listenTimer = setTimeout(function(){
             canGo = false
             self.requestApi({
                  "nodeName": "GC",
                  "apiPath" : "/dsadm/api/json",
                  "postPram" : [{
                    "coll_sess_id": sessionId,
                    "coll_screen_id": screenId
                  }],
                  "apiMethod" : "check_member_conversion"
                },  //param
                {
                  success : function(res) {
                    var responseData = res;
                    callback.success(responseData)
                   },
                  failed : function(error_msg){
                    callback.failed(error_msg)
                  }
              }
            )
            
        }, waitTime*1000)
        self.onRequestIMMessage({}, function(data){
            if(data && canGo){
                clearTimeout(listenTimer)
                self.closeIMMessage()
                callback.success(callback)
            }
        })
    }
    self.listenNetworkState = function(callback){
        IWNativeCore.listenNetworkState()
        self._closeWatch("netWorkState")
        self.vm.$watch("netWorkState", function(res) {
            console.log('listenNetworkState', res)
            callback(res)
        }, {
            //console.log("captureFace success : ", res)
        })
        self._addWatchName("netWorkState")
    }
    
    /**
     * socketConnectedState / socketServerState / socketClientState
     * 
     * 
     * @param {*} callback 
    */
    self.socketConnectedState = function(callback){
        self._closeWatch("socketConnectedState")
        self.vm.$watch("socketConnectedState", function(res) {
            console.log('socketConnectedState', res)
            callback(res)
        }, {
            //console.log("captureFace success : ", res)
        })
        self._addWatchName("socketConnectedState")
    }
    self.socketServerState = function(callback){
        self._closeWatch("socketServerState")
        self.vm.$watch("socketServerState", function(res) {
            console.log('socketServerState', res)
            callback(res)
        }, {
            //console.log("captureFace success : ", res)
        })
        self._addWatchName("socketServerState")
    }
    self.socketClientState = function(callback){
        self._closeWatch("socketClientState")
        self.vm.$watch("socketClientState", function(res) {
            console.log('socketClientState', res)
            callback(res)
        }, {
            //console.log("captureFace success : ", res)
        })
        self._addWatchName("socketClientState")
    }
    /**
     * socketServerGetMsg / socketClientGetMsg / socketSendMsg / socketInit
     * 
     * @param {*} callback 
    */
    self.socketServerGetMsg = function(callback){
        self._closeWatch("socketServerGetMsg")
        self.vm.$watch("socketServerGetMsg", function(res) {
            console.log('socketServerGetMsg', res)
            callback(res)
        }, {
            //console.log("captureFace success : ", res)
        })
        self._addWatchName("socketServerGetMsg")
    }
    self.socketClientGetMsg = function(callback){
        self._closeWatch("socketClientGetMsg")
        self.vm.$watch("socketClientGetMsg", function(res) {
            console.log('socketClientGetMsg', res)
            callback(res)
        }, {
            //console.log("captureFace success : ", res)
        })
        self._addWatchName("socketClientGetMsg")
    }
    self.socketInit = function(){
        console.log('%csocketInit___', 'color: pink;')
        IWNativeCore.initSocket();
    }
    self.socketSendMsg = function(params, callback){
        console.log('socketSendMsg', params);
        IWNativeCore.sendSocketMessage(JSON.stringify(params));
    }
    /**
     * checkNetworkSpeed
     * 
     * @param {*} callback 
    */
    self.checkNetworkSpeed = function(params, callback){
       IWNativeCore.checkNetworkSpeed(JSON.stringify(params))
       self._closeWatch("netWorkSpeed")
       self.vm.$watch("netWorkSpeed", function(res) {
            console.log('netWorkSpeed', res)
            callback(res)
        }, {
            //console.log("captureFace success : ", res)
        })
       self._addWatchName("netWorkSpeed")
    }
    /**
     * listenPeripheralDeviceState
     * 外设状态监听~
     * 
     * @param {*} callback 
    */
    self.listenPeripheralDeviceState = function(callback){
        // IWNativeCore.listenPeripheralDeviceState()
        self._closeWatch("peripheralDeviceState")
        self.vm.$watch("peripheralDeviceState", function(res) {
            console.log('listenPeripheralDeviceState', res)
            callback(res)
        }, {
            //console.log("captureFace success : ", res)
        })
        self._addWatchName("peripheralDeviceState")
    }
//--------------------------------------------------------------------------------

    /**
     * mergeVideo
     * 
     * @param {*} callback 
     */
    self.mergeVideo = function(params, callback) {
        console.log("call native mergeVideo : ", params)
        IWNativeCore.mergeVideo(JSON.stringify(params))
        self._closeWatch("mergeVideoSuccessCallback")
        self._closeWatch("mergeVideoFailedCallback")

        self.vm.$watch("mergeVideoSuccessCallback", function(res) {
            callback.success(res)
        }, {
            //console.log("mergeVideo success : ", res)
        })
        self._addWatchName("mergeVideoSuccessCallback")

        self.vm.$watch("mergeVideoFailedCallback", function(res){
            callback.failed(res)
        }, {
            //console.log("mergeVideo failed : ", res)
        })
        self._addWatchName("mergeVideoFailedCallback")
    }

    /**
    *
    *listenVideoUptProgress
    *
    **/
    self.listenVideoUptProgress = function(callback){
        self._closeWatch("videoUpSchedule")
        self._addWatchName("videoUpSchedule")
        self.vm.$watch("videoUpSchedule", function(res) {
            callback(res)
        }, {
        })
    }
    /**
     * faceFileForTake Pic
     * 
     * @param {*} params 
     * @param {*} callback 
     */
    self.faceImageFileForTakePicture = function(params, callback) {
        console.log("call native faceImageFileForTakePicture : ", params)
        
        const date = new Date()
        const reqId = date.getTime()
        IWNativeCore.faceImageFileForTakePicture(params, reqId)

        const methodSuccess ='faceImageSuccess'+ reqId
        const methodFail ='faceImageFail'+ reqId
        self._closeWatch(methodSuccess)
        self._closeWatch(methodFail)

        self.vm.$set(self.vm.faceImageSuccessCallback, methodSuccess, '__')
        self.vm.$set(self.vm.faceImageFailCallback, methodFail, '__')
        let watchSuccessMethod = "faceImageSuccessCallback."+ methodSuccess
        let watchFailMethod = "faceImageFailCallback."+ methodFail
        self.vm.$watch(watchSuccessMethod, function(res) {
            self._closeWatch(methodSuccess)
            callback.success(res)
        }, {
            //console.log("faceImageFile success : ", res)
        })
        self._addWatchName(methodSuccess)
        
        self.vm.$watch(watchFailMethod, function(res){
            self._closeWatch(methodFail)
            callback.failed(res)
        }, {
            //console.log("faceImageFile failed : ", res)
        })
        self._addWatchName(methodFail)
    }


    /**
     * generateVideoThumbnail
     * 
     * @param {*} params 
     * @param {*} callback 
     */
    self.generateVideoThumbnail = function(params, callback) {
        console.log("call native generateVideoThumbnail : ", params)
        IWNativeCore.generateVideoThumbnail(params)
        self._closeWatch("generateVideoThumbnailSuccessCallback")
        self._closeWatch("generateVideoThumbnailFailedCallback")
        self.vm.$watch("generateVideoThumbnailSuccessCallback", function(res) {
            callback.success(res)
        }, {
            //console.log("generate video thumbnail success : ", res)
        })
        self._addWatchName("generateVideoThumbnailSuccessCallback")
        self.vm.$watch("generateVideoThumbnailFailedCallback", function(res){
            callback.failed(res)
        }, {
            //console.log("generate video thumbnail failed : ", res)
        })
        self._addWatchName("generateVideoThumbnailFailedCallback")
    }

    /**
     * 分享视频
     * @param {*} params 
     */
    self.shareVideoFile = function(params, callback) {
        console.log("call native shareVideo  : ", params)
        IWNativeCore.shareVideoFile(JSON.stringify(params))
        self._closeWatch("shareVideoGenQRCode")
        self._closeWatch("shareVideoUploadFinish")
        self._closeWatch("shareVideoError")

        self.vm.$watch("shareVideoGenQRCode", function(res) { 
            console.log('shareVideoGenQRCode', res)
            callback.success(res) 
        }, { } )
        self._addWatchName("shareVideoGenQRCode")
        self.vm.$watch("shareVideoUploadFinish", function(res) {  
            console.log('shareVideoUploadFinish', res)
            callback.finish(res)
        }, { } )
        self._addWatchName("shareVideoUploadFinish")
        self.vm.$watch("shareVideoError", function(res) {  
            console.log('shareVideoError', res)
            callback.failed(res)
        }, { } )
        self._addWatchName("shareVideoError")
    }

    /**
     * delete file
     * @param {*} param 
     */
    self.deleteFile = function(param, callback) {
        console.log("call native delete file : ", param)
        self._closeWatch("deleteFileSuccess")
        self._closeWatch("deleteFileFailed")
        IWNativeCore.deleteFile(param)


        self.vm.$watch("deleteFileSuccess", function(res) {
            callback.success(res)
        }, {
            //console.log("delete file success : ", res)
        })
        self._addWatchName("deleteFileSuccess")

        self.vm.$watch("deleteFileFailed", function(res) {
            callback.failed(res)
        }, {
            //console.log("delete file failed : ", res)
        })
        self._addWatchName("deleteFileFailed")
    }

    /**
     * startApp
     * 
     * @param {*} param 
     */
    self.startApp = function(param) {
        console.log("call startApp : ", param)
        IWNativeCore.startApp(JSON.stringify(param))
    }

    /**
     * startScreen
     * 
     * @param {*} param 
     */
    self.startScreen = function() {
        console.log("call startScreen : ", 'come in')
        IWNativeCore.startScreen()
    }
    /**
     * closeScreen
     * 
     * @param {*} param 
     */
    self.closeScreen = function() {
        console.log("call closeScreen : ", 'come in')
        IWNativeCore.closeScreen()
    }
    /**
     * adjustScreenLight
     * 
     * @param {*} param 
     */
    self.adjustScreenLight = function(degree) {
        console.log("call adjustScreenLight : ", degree)
        IWNativeCore.adjustScreenLight(degree)
    }
    /**
     * openInstwallSettings
     * 
     * @param {*} param 
     */
    self.openInstwallSettings = function() {
        console.log("call openInstwallSettings : ", '__');
        IWNativeCore.openInstallwallSettings();
    }
    

    self._moveDebugDiv = function(el, dv){

        //获取元素
        var x = 0;
        var y = 0;
        var l = 0;
        var t = 0;
        var isDown = false;
        //鼠标按下事件
        el.ontouchstart = function(e) {
            //   console.log('start')
            var e = e.touches[0];
            //获取x坐标和y坐标
            x = e.clientX;
            y = e.clientY;

            //获取左部和顶部的偏移量
            l = dv.offsetLeft;
            t = dv.offsetTop;
            //开关打开
            isDown = true;
            //设置样式  
            el.style.cursor = 'move';
        }
        //鼠标移动
        el.ontouchmove = function(e) {
            // console.log('move', e)
              var e = e.touches[0];
            if (isDown == false) {
                return;
            }
            //获取x和y
            var nx = e.clientX;
            var ny = e.clientY;
            //计算移动后的左偏移量和顶部的偏移量
            var nl = nx - (x - l);
            var nt = ny - (y - t);

            dv.style.left = nl + 'px';
            dv.style.top = nt + 'px';
        }
        //鼠标抬起事件
        el.ontouchend = function() {
            //开关关闭
            isDown = false;
            el.style.cursor = 'default';
        }
    }
    
    self._openDebug = function(){
        oldLog = console.log;
        
        
        debugEle = document.getElementById("__shutuo_src_debug")
        debugCon = document.getElementById("debug_con")
        if(!debugEle){
            debugEle = document.createElement("div")
            debugEle.id = "__shutuo_src_debug"
            document.body.appendChild(debugEle)
        }
        debugEle.style.cssText = "top:0;left:0;margin:0;overflow: hidden;width:80%;height:500px;background-color:rgba(3,101,204,0.7);position:absolute;z-index:999999;font-size:14px;color:#fff;"
        
        // tab drag
        var debugTab = document.getElementById("debug_tab")
        if(!debugTab){
            debugTab = document.createElement("div")
            debugTab.innerText = 'debug'
            debugTab.id = "debug_tab"
            debugEle.appendChild(debugTab)
        }
        
        debugTab.style.cssText = "width: 100%; text-indent: 10px;height: 40px;line-height: 40px;text-align: left;background-color: #fff;color: #000;"
        // tab drag

        // inner con
        var debugCon = document.getElementById("debug_con")
        if(!debugCon){
            debugCon = document.createElement("div")
            debugCon.id = "debug_con"
            debugEle.appendChild(debugCon)
        }
        debugCon.style.cssText = "width: 100%;height: 500px;overflow-x: auto;padding: 10px 10px;"
        // tab drag

        self._moveDebugDiv(debugTab, debugEle)
        console.log = function(){
            let pListEle = debugEle.getElementsByTagName('p')
            if(pListEle.length>50){
                let idx = 0
                for(i in pListEle){
                    if(idx<=20){
                        pListEle[i].remove()
                        idx += 1
                    }
                }
            }
            let pEle = document.createElement("p")
            let append_str = "日志: "
            for (var i=0;i<arguments.length;i++){
                let str = arguments[i]
                if(typeof(str) == "object"){
                   str = JSON.stringify(str)
                }
                append_str += str
            }
            var timestamp = (new Date()).valueOf();
            append_str = append_str + " 时间戳:"+ timestamp
            pEle.innerText = append_str
            debugCon.appendChild(pEle)
            debugCon.scrollTop = debugCon.scrollHeight
            oldLog.apply(console,arguments);
        }
    }
    self._closeDebug = function(){
        if(oldLog){
          console.log = oldLog  
        }
        debugEle = document.getElementById("__shutuo_src_debug")
        if(debugEle){
            debugEle.remove()
        }
    }

//--------------------------------------------------------------------------------

    // for Android call
    self.core = function () {
        self.notifyFaceInfo = function (faceInfo) {
            // if(self.faceInfoList.length==10){
            //    self.vm.faceInfoList.shift()
            //    self.vm.faceInfoList.push(faceInfo)
            // }else{
            //     self.vm.faceInfoList.push(faceInfo)
            // }
            self.vm.faceInfoList= faceInfo
        }
        self.notifyScanInfo = function (scanInfo) {
            self.vm.scanCodeInfo = scanInfo
        }
        self.notifyNearInfo = function (nearInfo) {
            self.vm.nearInfo = nearInfo
        }
        self.notifyGetDeviceInfoSuccess = function (data) {
            self.vm.getDeviceInfoSuccess = data
        }
        self.notifyGetDeviceInfoFailed = function (data) {
            self.vm.getDeviceInfoFailed = res
        }
        self.notifyTakePictureSuccess = function (data) {
            // self.vm.takePictureSuccessCallback = data
            // let reqId = data["reqId"]
            let reqId = ''
            let method = "takePictureSuccessCallback"+ reqId
            console.log('notifyTakePictureSuccess_______', data, method)
            self.vm.takePictureSuccessCallback[method] = data
        }
        self.notifyTakePictureFailed = function (data) {
            // self.vm.takePictureFailedCallback = data
            // let reqId = data["reqId"]
            let reqId = ''
            let method = "takePictureFailedCallback"+ reqId
            console.log('notifyTakePictureFailed_______', data, method)
            self.vm.takePictureFailedCallback[method] = data
        }      
        self.notifyFaceFileForTakePicture = function(data){
            let reqId = data["reqId"]
            let method = "faceImageSuccess"+ reqId
            console.log('notifyFaceFileForTakePicture_______', data, method)
            
            self.vm.faceImageSuccessCallback[method] = data

        }
        self.notifyFaceFileForTakePictureSuccess = function(data){
            // let reqId = data["reqId"]
            let reqId = ''
            let method = "faceImageSuccess"+ reqId
            self.vm.faceImageSuccessCallback[method] = data
        }

        self.notifyFaceFileForTakePictureFailed = function(data){
            // let reqId = data["reqId"]
            let reqId = ''
            let method = "faceImageFail"+ reqId
            self.vm.faceImageFailCallback[method] = data
        }

        self.notifyCaptureFaceSuccess = function (data) {
            let reqId = data["reqId"]
            let method = "captureSuccess"+ reqId
            self.vm.captureFaceSuccessCallback[method] = data
        }
        self.notifyCaptureFaceFailed = function (data) {
            let reqId = data["reqId"]
            let method = "captureFail"+ reqId
            self.vm.captureFaceFailedCallback[method] = data
        }
        self.notifyRecordSuccess = function (data) {
            self.vm.recordSuccessCallback = data
        }
        self.notifyRecordFailed = function (data) {
            self.vm.recordFailedCallback = data
        }
        self.notifyObtainFaceIdSuccess = function (data) {
            console.log('notifyObtainFaceIdSuccess: ', data)
            self.vm.obtainFaceIdSuccessCallback = data
        }
        self.notifyObtainFaceIdFailed = function (data) {
            console.log('notifyObtainFaceIdFailed: ', data)
            self.vm.obtainFaceIdFailedCallback = data
        }
        self.notifyNFCMessage = function (data) {
            var date = new Date()
            self.vm.nfcMessage = {"time":date.getTime(), "key":data}
        }
        self.notifyScannerMessage = function (data) {
            var date = new Date()
            self.vm.scannerMessage = {"time":date.getTime(), "key":data}
        }
        self.notifyRequestApiSuccess = function (_data) {
            console.log('RequestApiSuccess===', _data)
            let data = _data["requestData"]
            let reqId = _data["requestId"]
            let method = ''
            if(data.method){
                method = data.method
            }else{
                method = data.req_method
            }
            const notify_method = method + 'Success'+ reqId
            self.vm.requestApiSuccess[notify_method] = data['data'][0]
            // self.vm.requestApiSuccess = data
        }
        self.notifyRequestApiFailed = function (_data) {
            console.log('requestApiFailed===', _data)
            let data = _data["requestData"]
            let reqId = _data["requestId"]
            let method = ''
             if(data.method){
                method = data.method
            }else{
                method = data.req_method
            }
            const notify_method = method + 'Fail' + reqId
            console.log(notify_method)
            self.vm.requestApiFailed[notify_method] = data
            // self.vm.requestApiFailed = data
        }
        self.notifyIMMessage = function (data) {
            self.vm.requestIMMessage = data;
        }
        self.notifyEnvData = function (data) {
            self.vm.envData = data;
        }
        self.notifyNetWorkState = function(data) {
            var date = new Date()
            self.vm.netWorkState = {"time": date.getTime(), "data": data}
        }
        self.notifySocketServerNewClientMsg = function(data) {
            var date = new Date();
            console.log('notifySocketServerNewClientMsg', data);
            self.vm.socketServerGetMsg = {"time": date.getTime(), "data": data}
        }
        self.notifySocketClientNewPacket = function(data) {
            var date = new Date();
            console.log('notifySocketClientNewPacket', data);
            self.vm.socketClientGetMsg = {"time": date.getTime(), "data": data}
        }
        self.notifySocketServerConnectedClientStateChanged = function(data) {
            var date = new Date();
            console.log('notifySocketServerConnectedClientStateChanged', data);
            self.vm.socketConnectedState = {"time": date.getTime(), "data": data}
        }
        self.notifySocketServerStateChanged = function(data) {
            var date = new Date();
            console.log('notifySocketServerStateChanged', data);
            self.vm.socketServerState = {"time": date.getTime(), "data": data}
        }
        self.notifySocketClientStateChanged = function(data) {
            var date = new Date();
            console.log('notifySocketClientStateChanged', data);
            self.vm.socketClientState = {"time": date.getTime(), "data": data}
        }
        self.notifyFaceInState = function(data) {
            var date = new Date()
            console.log('notifyFaceInState', data)
            self.vm.hasFaceIn = {"time": date.getTime(), "data": data}
        }
        self.notifyPeripheralDeviceState = function(data) {
            var date = new Date()
            self.vm.peripheralDeviceState = {"time": date.getTime(), "data": data}
        }
        self.notifyVideoUpSchedule = function(data){
            self.vm.videoUpSchedule = data
        }
        self.notifyInputDeviceInfo = function(_data){
            // console.log('notifyInputDeviceInfo_________________', _data)
            let data = _data["data"]
            let deviceType = data["deviceType"]
            const deviceVar = 'inputDeviceInfo'+ deviceType
            const nowTime = new Date()
            const nowTimeStamp = nowTime.getTime()
            data["timeStamp"] = nowTimeStamp    
            self.vm.inputDeviceInfo[deviceVar] = data
        }
        self.notifyPersonStateCallback = function (data) {
            self.vm.personStateCallback = data
        }
        self.notifyDepthTrackingStateCallback = function (data) {
            self.vm.depthTrackingStateCallback = data
        }
        self.notifyDepthHeadPointCallback = function (data) {
            self.vm.depthHeadPointCallback = data
        }
        self.notifyMergeVideoSuccess = function (data) {
            var date = new Date()
            self.vm.mergeVideoSuccessCallback = {"time":date.getTime(), "data":data}
        }
        self.notifyMergeVideoFailed = function (data) {
            var date = new Date()
            self.vm.mergeVideoFailedCallback = {"time":date.getTime(), "data":data}
        }
        self.notifyGenerateVideoThumbnailSuccess = function (data) {
            var date = new Date()
            self.vm.generateVideoThumbnailSuccessCallback = {"time":date.getTime(), "data":data}
        }
        self.notifyGenerateVideoThumbnailFailed = function (data) {
            self.vm.generateVideoThumbnailFailedCallback = data
        }
        self.notifyObtainFaceInfoSuccessCallback = function (data) {
            self.vm.obtainFaceInfoSuccessCallback = data
        }
        self.notifyObtainFaceInfoFailedCallback = function (data) {
            self.vm.obtainFaceInfoFailedCallback = data
        }
        self.notifyDeleteFileSuccess = function (data) {
            var date = new Date()
            self.vm.deleteFileSuccess = {"time":date.getTime(), "data":data}
        }
        self.notifyDeleteFileFailed = function (data) {
            var date = new Date()
            self.vm.deleteFileFailed = {"time":date.getTime(), "data":data}
        }
        self.notifyShareVideoGenQRCode = function (data) {
            //console.log('notifyShareVideoGenQRCode :', data)
            var date = new Date()
            self.vm.shareVideoGenQRCode = {"time":date.getTime(), "data":data}
        }
        self.notifyShareVideoUploadFinish = function (data) {
            self.vm.shareVideoUploadFinish = data
        }
        self.notifyShareVideoError = function (data) {
            self.vm.shareVideoError = data
        }
        self.notifyNetWorkSpeed = function (data){
            self.vm.netWorkSpeed = data 
        }
        self.openDebug = function(){
            self._openDebug()
        }
        self.closeDebug = function(){
            self._closeDebug()
        }
        return self
    }

}

window.app = function(self) {
    console.log('this is test')
}

export default IWSmartScr
