<template>
  <!--v-show="isShowPicker"-->
  <div class="date-picker-wrap" catchtouchmove="true" >
    <view class="date-picker"
          catchtouchmove="true">
      <view>{{ year }}年{{ month }}月{{ day }}日</view>
      <view class="btn-wrap">
        <text class="cancer" @click="handleCancel">取消</text>
        <text class="confirm" @click="handleChooseTimeDone">确定</text>
      </view>
      <picker-view
        class="date-wrap"
        :value="value"
        indicator-style="height: 50px;"
        style="width: 100%; height: 76%;color:#000"
        @change="handleBindChange"
      >
        <picker-view-column>
          <view
            v-for="(y, indexY) in years" :key="indexY"
            style="line-height: 50px">{{ y }}年</view>
        </picker-view-column>
        <picker-view-column>
          <view
            v-for="(m, indexM) in months" :key="indexM"
            style="line-height: 50px">{{ m }}月</view>
        </picker-view-column>
        <picker-view-column>
          <view
            v-for="(d, indexD) in days" :key="indexD"
            style="line-height: 50px">{{ d }}日</view>
        </picker-view-column>
      </picker-view>
    </view>
  </div>
</template>

<script>
  export default {
    props: {
      isShowPicker: {
        type: Boolean
      },
      choseDate: {
        type: String,
      }
    },
    data() {
      //初始化数据放到data内
      const date = new Date()
      const years = []
      const months = []
      const days = []
      for (let i = 1990; i <= date.getFullYear(); i++) {
        years.push(i)
      }
      for (let i = 1; i <= 12; i++) {
        months.push(i)
      }

      for (let i = 1; i <= 31; i++) {
        days.push(i)
      }
      let data = {
        years,
        months,
        days,
      }
      //初始化date--根据传入的choseDate为 '选择时间' 或者为 'year-month-day' 分别进行初始化
      if( this.choseDate !== '' && this.choseDate !== '选择时间'){
        const [year,month,day] = this.choseDate.split('-').map(Number)
        data.year=year
        data.month=month
        data.day=day
      }else{
        data.year=date.getFullYear()
        data.month=date.getMonth() + 1
        data.day=date.getDate()
      }
      data.value = [data.year-1990, data.month-1, data.day-1]

      console.log("初始化--data",data);

      return {
        years,
        year: data.year,
        months,
        month: data.month,
        days,
        day: data.day,
        value: data.value
      }
    },
    methods: {
      handleCloseDialog(){
        this.$emit('closeDialog')
      },
      handleChooseTimeDone() {
        this.isShowPicker = false
        let date = `${this.year}-${this.month}-${this.day}`
        this.$emit('changeDatePicker',this.isShowPicker, date)
        // this.handleCloseDialog()
      },
      handleBindChange(e) {
        const val = e.target.value
        this.value = val
        this.year = this.years[val[0]]
        this.month = this.months[val[1]]
        this.day = this.days[val[2]]
        console.log("handleBindChange--->",this.year,this.month,this.day);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .date-picker-wrap {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    text-align: center;
    .date-picker {
      background: #fff;
      width: 100%;
      height: 40%;
      position: fixed;
      bottom: 0;
      .btn-wrap {
        display: flex;
        justify-content: space-between;
        padding: 15px 24px 15px;
        color: #000;
      }
    }
  }
  .active{
    display:block;
  }
</style>
