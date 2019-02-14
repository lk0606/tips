<template>
  <div class="wrap">
    <div class="img-wrap">
      <img src="http://grayds.instwall.com:80/store/download_snap/custom-874-0-223062-1545203792-sg?for_small=1" alt=""/>
    </div>
    <div class="camera-wrap">
      <img src="../../../static/images/screen_content_upload/camera2.png" alt=""/>
      <p>添加商品图片</p>
    </div>
    <ul class="text-wrap">
      <li>
        <strong>预期完成时间</strong>
        <span @click="handleToggleShowPicker">
          {{choseTime}}
          <i-icon type="enter"></i-icon>
        </span>
      </li>
      <li>
        <h2>备注</h2>
        <textarea
          placeholder-style="color:rgba(195,195,195,1);"
          placeholder-class="area-pl"
          placeholder="模板里有哪些不要的元素或其他文字要求，请在这里说明。"></textarea>
      </li>
      <li>
        <input type="button" value="确定提交"/>
      </li>
    </ul>
    <date-picker
      @changeDatePicker="handleUpdateDatePicker"
      :isShowPicker="show"
      :choseDate="choseTime"
      v-if="show"
      ></date-picker>
  </div>
</template>

<script>
import DatePicker from '../../components/DatePick'
export default {
  components: {
    DatePicker
  },
  data() {
    return {
      choseTime: '选择时间',
      show: false,
    }
  },
  methods: {
    // 接收子值
    handleUpdateDatePicker(isShowPicker, date) {
      console.log(date,'father')
      this.show = isShowPicker
      this.choseTime = date
    },
    // 弹窗Toggle开关
    handleToggleShowPicker () {
      this.show = !this.show
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrap {
    font-size: 17px;
    font-family:PingFang-SC-Medium;
    .img-wrap {
      img {
        width: 375px;
        height: 210px;
      }
    }
    .camera-wrap {
      text-align: center;
      img {
        padding: 39px 0 17px 0;
        width: 47px;
        height: 37px;
      }
      p {
        font-weight:500;
        color:rgba(153,153,153,1);
        padding-bottom: 36px;
        margin-bottom: 17px;
      }
    }
    .text-wrap{
      li:first-of-type {
        padding: 17px 16px;
        display: flex;
        justify-content: space-between;
      }
      li:nth-of-type(2) {
        /*text-indent: 16px;*/
        padding: 0 16px;
        color:rgba(195,195,195,1);
        h2 {
          padding: 17px 0 14px 0;
          line-height:24px;
        }
        textarea {
          width: 100%;
          height: 145px;
          line-height:23px;
          font-size: 14px;
        }
        .area-pl {
          /*line-height:23px;*/
          /*font-size: 14px;*/
        }
        /*textarea::-webkit-input-placeholder {*/
          /*!*color:rgba(195,195,195,1);*!*/
          /*color: red;*/
        /*}*/
      }
      li:nth-of-type(3) {
        text-align: center;
        padding: 20px 0;
        input {
          width:345px;
          height:44px;
          background:rgba(252,200,0,1);
          border-radius:5px;
          font-size:19px;
          color:rgba(56,56,58,1);
        }
      }
    }
  }
</style>
