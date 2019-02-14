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
    self.requestApiFailed = {}
    self.requestApiSuccess = {}
    self.requestIMMessage = {}
    self.netWorkState = {}
    self.personStateCallback = {}
    self.depthTrackingStateCallback = {}
    self.depthHeadPointCallback = {}
    self.mergeVideoSuccessCallback = {}
    self.mergeVideoFailedCallback = {}
    self.obtainFaceInfoSuccessCallback = {}
    self.obtainFaceInfoFailedCallback = {}

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
        "personStateCallback": self.onPersonStateCallback,
        "depthTrackingStateCallback": self.onDepthTrackingStateCallback,
        "depthHeadPointCallback": self.onDepthHeadPointCallback,
        "mergeVideoSuccessCallback": self.mergeVideoSuccessCallback,
        "mergeVideoFailedCallback": self.mergeVideoFailedCallback,
        "generateVideoThumbnailSuccessCallback": self.generateVideoThumbnailSuccessCallback,
        "generateVideoThumbnailFailedCallback": self.generateVideoThumbnailFailedCallback,
        "obtainFaceInfoSuccessCallback": self.obtainFaceInfoSuccessCallback,
        "obtainFaceInfoFailedCallback": self.obtainFaceInfoFailedCallback
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
        IWNativeCore.getInitInfo(JSON.stringify(self.module))
        self._closeWatch("envData")
        self.vm.$watch("envData", function(res) {
            self.envData = self.configData["envData"] = res
            callback()
        }, {

        })
        var len = self.vm._watchers.length
        if(len){
           self.vm._watchers[len-1].expression =  "envData"
        }
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
        var len = self.vm._watchers.length
        if(len){
           self.vm._watchers[len-1].expression =  "getDeviceInfoSuccess"
        }
    }
    self.onNearLevelChanged = function(params, callback) {
        IWNativeCore.openNearLevelChanged()
        self._closeWatch("nearInfo")
        self.vm.$watch("nearInfo", function(data){
             callback(data)
        }, {

        })
        var len = self.vm._watchers.length
        if(len){
           self.vm._watchers[len-1].expression =   "nearInfo"
        }
    }

    self.closeNearLevelChanged = function () {
        self._closeWatch("nearInfo")
        IWNativeCore.closeNearLevelChanged()
    }
    
    self.closeApp = function(){
        IWNativeCore.closeApp()
    }
    // bgVideo
    self.loadDefaultVideoBackground = function() {
        IWNativeCore.loadDefaultVideoBackground();
    }
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
        var len = self.vm._watchers.length
        if(len){
           self.vm._watchers[len-1].expression =   "openMotionSensing"
        }
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
    self.takePicture = function(callback) {
        console.log("enter takePicture : ", callback)
        IWNativeCore.takePicture()

        self.vm.$watch("takePictureSuccessCallback", function(res) {
            callback.success(res)
        }, {
            //console.log("take success : ", res)
        })

        self.vm.$watch("takePictureFailedCallback", function(res){
            callback.failed(res)
        }, {
            //console.log("take failed : ", res)
        })
    }

    self.capture = function(callback){
        IWNativeCore.capture()
        self._closeWatch("takePictureSuccessCallback")
        self.vm.$watch("takePictureSuccessCallback", function(data) {
            callback(data)
        }, {
            //console.log("take success : ", res)
        })
        var len = self.vm._watchers.length
        if(len){
           self.vm._watchers[len-1].expression =   "takePictureSuccessCallback"
        }
    }
    /**
     * record
     * 
     * @param {*} callback 
     */
    self.record = function(params, callback) {
        console.log("call native record : ", params)
        IWNativeCore.record(params)

        self.vm.$watch("recordSuccessCallback", function(res) {
            callback.success(res)
        }, {
            //console.log("record success : ", res)
        })

        self.vm.$watch("recordFailedCallback", function(res){
            callback.failed(res)
        }, {
            //console.log("record failed : ", res)
        })
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
         var len = self.vm._watchers.length
        if(len){
           self.vm._watchers[len-1].expression =   "faceInfoList"
        }
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

        IWNativeCore.openNearFaceInfo(JSON.stringify({
            queryLevel: queryLevel,  // ‘feature’ or ‘recognize’
            interval:  1,    // when mode=='listen', query loop interval  >=1, <=30
        }))
        // self._closeWatch("faceInfoList")
        // self.vm.$watch("faceInfoList", callback, {
        // })
        // //???不知道是否可以不用
        // var len = self.vm._watchers.length
        // if(len){
        //    self.vm._watchers[len-1].expression =   "faceInfoList"
        // }

        self.vm.$watch("obtainFaceInfoSuccessCallback", function(res) {
            callback.success(res)
        }, {
            //console.log("obtainFaceInfo success : ", res)
        })
        self.vm.$watch("obtainFaceInfoFailedCallback", function(error) {
            callback.failed(error)
        }, {
            //console.log("obtainFaceInfo failed : ", error)
        })
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

        var count = args
        IWNativeCore.captureFace(JSON.stringify({"count":count}))
        self._closeWatch("captureFaceSuccessCallback")
        self.vm.$watch("captureFaceSuccessCallback", function(res) {
            callback.success(res)
        }, {
            //console.log("captureFace success : ", res)
        })
        var len = self.vm._watchers.length
        if(len){
           self.vm._watchers[len-1].expression =   "captureFaceSuccessCallback"
        }
         self._closeWatch("captureFaceFailedCallback")
        self.vm.$watch("captureFaceFailedCallback", function(res){
            callback.failed(res)
        }, {
            //console.log("captureFace failed : ", res)
        })
        var len = self.vm._watchers.length
        if(len){
           self.vm._watchers[len-1].expression =   "captureFaceFailedCallback"
        }
    }

    /**
     * caputreFace
     *
     * @param {} args
     * @param {*} callback
     */
    self.obtainFaceId = function(args, callback) {
        console.log("enter obtainFaceId : ", args)

        IWNativeCore.obtainFaceId(JSON.stringify(args), 1)
        self._closeWatch("obtainFaceIdSuccessCallback")
        self.vm.$watch("obtainFaceIdSuccessCallback", function(res) {
            callback.success(res)
        }, {
        })
        var len = self.vm._watchers.length
        if(len){
           self.vm._watchers[len-1].expression =   "obtainFaceIdSuccessCallback"
        }
        self._closeWatch("obtainFaceIdFailedCallback")
        self.vm.$watch("obtainFaceIdFailedCallback", function(res){
            callback.failed(res)
        }, {
        })
        var len = self.vm._watchers.length
        if(len){
           self.vm._watchers[len-1].expression =   "obtainFaceIdFailedCallback"
        }
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
        var len = self.vm._watchers.length
        if(len){
           self.vm._watchers[len-1].expression =   "nfcMessage"
        }
    }
    self.onRequestIMMessage = function(data,callback){
        console.log('requestIMMessage',data)
        IWNativeCore.onIMMessage(data)
        self._closeWatch("requestIMMessage")
        self.vm.$watch("requestIMMessage", callback, {

        })
         var len = self.vm._watchers.length
        if(len){
           self.vm._watchers[len-1].expression =   "requestIMMessage"
        }
    }
    self.sendIMMessage = function(data){
        IWNativeCore.sendIMMessage(data)
    }
    self.closeRequestIMMessage = function(data){
        IWNativeCore.closeIMMessage()

    }

    /**
     * scanner device
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

    /**
     * request api
     */
     self.requestApi = function(param, callback) {
        console.log("enter requestApi : ", param, callback )
        const method = param['apiMethod']
        const date = new Date()
        const reqId = date.getTime()
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
        var len = self.vm._watchers.length
        if(len){
           self.vm._watchers[len-1].expression = methodSuccess
        }
        self.vm.$watch(watchFailMethod, function(res){
            if( res == '__' ) return;
            self._closeWatch(methodFail)
            callback.failed(res)
        }, {
            //console.log("take failed : ", res)
        })
        var len = self.vm._watchers.length
        if(len){
           self.vm._watchers[len-1].expression =   methodFail
        }
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
    self.userFaceRecognition =  function(params, callback){
        let retryMaxNumber = params["retryMaxNumber"]
        let retryInterval = params["retryInterval"]
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
                console.log(' sessionId', responseData)
                var sessionId = responseData.h5_sess
                tryTimer = 0
                // 截图获取图片
                function  obtainFaceId(sessionId){
                    self.captureFace(1,  {
                        success : function(fileUrls) {
                            let filesArr = [fileUrls]
                            console.log('一张图片', filesArr)
                            if(filesArr && filesArr[0]){
                                var files = JSON.stringify({"files":filesArr})
                                console.log('一张图片',files)
                                var postParams = {"files": files, "h5_sess": sessionId}
                                // 获取faceID
                                self.obtainFaceId(postParams, {
                                    success : function(data) {
                                        console.log("obtainFaceId", data)
                                        clearInterval(tryTimer)
                                        data['sessionId'] = sessionId
                                        data['filesFaceId'] = files
                                        callback.success(data)
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

        self.vm.$watch("mergeVideoSuccessCallback", function(res) {
            callback.success(res)
        }, {
            //console.log("mergeVideo success : ", res)
        })

        self.vm.$watch("mergeVideoFailedCallback", function(res){
            callback.failed(res)
        }, {
            //console.log("mergeVideo failed : ", res)
        })
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

        self.vm.$watch("generateVideoThumbnailSuccessCallback", function(res) {
            callback.success(res)
        }, {
            //console.log("generate video thumbnail success : ", res)
        })

        self.vm.$watch("generateVideoThumbnailFailedCallback", function(res){
            callback.failed(res)
        }, {
            //console.log("generate video thumbnail failed : ", res)
        })
    }

    /**
     * delete file
     * 
     * @param {*} param 
     */
    self.deleteFile = function(param) {
        console.log("call native delete file : ", param)
        IWNativeCore.deleteFile(param)
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

    self._moveDebugDiv = function(dv){
      //获取元素
      var x = 0;
      var y = 0;
      var l = 0;
      var t = 0;
      var isDown = false;
      //鼠标按下事件
      dv.ontouchstart = function(e) {
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
          dv.style.cursor = 'move';
      }
      //鼠标移动
      dv.ontouchmove = function(e) {
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
      dv.ontouchend = function() {
          //开关关闭
          isDown = false;
          dv.style.cursor = 'default';
      }
    }
    self._openDebug = function(){
        oldLog = console.log;
        debugEle = document.getElementById("__shutuo_src_debug")
        if(!debugEle){
            debugEle = document.createElement("div")
            debugEle.id = "__shutuo_src_debug"
            document.body.appendChild(debugEle)
        }
        debugEle.style.cssText = "top:0;left:0;margin:0;overflow-x: auto;padding: 10px 10px;width:80%;height:500px;background-color:rgba(3,101,204,0.7);position:absolute;z-index:999999;font-size:14px;color:#fff;"
        self._moveDebugDiv(debugEle)
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
            debugEle.appendChild(pEle)
            debugEle.scrollTop =  debugEle.scrollHeight
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
            self.vm.takePictureSuccessCallback = data
        }
        self.notifyTakePictureFailed = function (data) {
            self.vm.takePictureFailedCallback = data
        }
        self.notifyCaptureFaceSuccess = function (data) {
            self.vm.captureFaceSuccessCallback = data
        }
        self.notifyCaptureFaceFailed = function (data) {
            self.vm.captureFaceFailedCallback = data
        }
        self.notifyRecordSuccess = function (data) {
            self.vm.recordSuccessCallback = data
        }
        self.notifyRecordFailed = function (data) {
            self.vm.recordFailedCallback = data
        }
        self.notifyObtainFaceIdSuccess = function (data) {
            console.log('notifyObtainFaceIdSuccess', data)
            self.vm.obtainFaceIdSuccessCallback = data
        }
        self.notifyObtainFaceIdFailed = function (data) {
            console.log('notifyObtainFaceIdFailed', data)
            self.vm.obtainFaceIdFailedCallback = data
        }
        self.notifyNFCMessage = function (data) {
            console.log("notifyNFCMessage : data=", data)

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
            console.log('notifyNetWorkState', data)
            var date = new Date()
            self.vm.netWorkState = {"time":date.getTime(), "data":data}
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
            self.vm.mergeVideoSuccessCallback = data
        }
        self.notifyMergeVideoFailed = function (data) {
            self.vm.mergeVideoFailedCallback = data
        }
        self.notifyGenerateVideoThumbnailSuccess = function (data) {
            self.vm.generateVideoThumbnailSuccessCallback = data
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
