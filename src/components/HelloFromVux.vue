<template>
  <div>
    <group>
      <selector placeholder="请选择功能" v-model="demo01" title="功能选项" name="district" :options="list" @on-change="_onChange"></selector>
    </group>
    &nbsp;&nbsp;&nbsp;
    <x-button type="primary" mini @click.native="_getParams">获取参数</x-button>
    &nbsp;&nbsp;&nbsp;
    <x-button type="primary" mini @click.native="_call">调用</x-button>
    &nbsp;&nbsp;&nbsp;
    <x-button type="primary" mini @click.native="_empty">清空参数</x-button>
  
    <x-table class="table">
      <thead>
        <tr>
          <th>参数</th>
          <th>后台返回的数据</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>BUSI_TYPE</td>
          <td>{{backUpData?backUpData.BUSI_TYPE:''}}</td>
        </tr>
        <tr>
          <td>SIGNATURE</td>
          <td>{{backUpData?backUpData.SIGNATURE:''}}</td>
        </tr>
        <tr>
          <td>transactionID</td>
          <td>{{backUpData?backUpData.transactionID:''}}</td>
        </tr>
        <tr>
          <td>msOpcode</td>
          <td>{{backUpData?backUpData.msOpcode:''}}</td>
        </tr>
        <tr>
          <td>provCode</td>
          <td>{{backUpData?backUpData.provCode:''}}</td>
        </tr>
        <tr>
          <td>channelId</td>
          <td>{{backUpData?backUpData.channelId:''}}</td>
        </tr>
        <tr>
          <td>name</td>
          <td>{{backUpData?backUpData.name:''}}</td>
        </tr>
        <tr>
          <td>cardNo</td>
          <td>{{backUpData?backUpData.cardNo:''}}</td>
        </tr>
        <tr>
          <td>funcName</td>
          <td>{{backUpData?backUpData.funcName:''}}</td>
        </tr>
        <tr>
          <td>funcDesc</td>
          <td>{{backUpData?backUpData.funcDesc:''}}</td>
        </tr>
      </tbody>
    </x-table>
    <alert v-model="showAlert" :title="alertTitle" :content="alertContent" @on-hide="closeAlert"></alert>
    <loading :show="showLoading" :text="loadingText"></loading>
  </div>
</template>

<script>
  import {
    Group,
    XButton,
    Selector,
    PopupRadio,
    Loading,
    Alert,
    XTable
  } from 'vux'
  import {
    AjaxPlugin
  } from 'vux'
  export default {
    components: {
      Group,
      Selector,
      PopupRadio,
      XButton,
      Loading,
      Alert,
      XTable
    },
    data() {
      return {
        demo01: null,
        list: [{
            key: '01',
            value: 'SJGYJ-849(拍照组件)'
          },
          {
            key: '02',
            value: 'SJGYJ-958(封装只刷身份证组件)'
          },
          {
            key: '03',
            value: 'SJGYJ-955(NFC人证比对组件)'
          },
          {
            key: '04',
            value: 'SJGYJ-1110(D1人证比对能力组件)'
          },
          {
            key: '05',
            value: 'SJGYJ-850(无纸化合成PDF组件及人证比对组件优化)'
          },
          {
            key: '06',
            value: 'SMZ-2514(合成PDF组件优化)'
          },
          {
            key: '07',
            value: 'SJGYJ-951(手输身份证号唤起人证比对能力)'
          }
        ],
        selectVal: '00',
        showLoading: false,
        loadingText: '正在加载..',
        showAlert: false,
        alertTitle: '提示',
        alertContent: '请选择功能',
        backUpData: null
      }
    },
    methods: {
      _onChange(val) {
        // console.log(val)
        this.selectVal = val
        this.backUpData = null
      },
      _getParams() {
        // console.log(this.selectVal)
        this.backUpData = null
        if (this.selectVal === null) {
          this.showAlert = true
          return
        }
        this.showLoading = true
  
        let busiType = this.selectVal,
          _this = this
        // let url = '/zh/edcaiom/imitate/invoking'
        let url = '/edcaiom/imitate/invoking'
        AjaxPlugin.$http.post(url, {
          "busiType": busiType
        }).then((res) => {
          // console.log(res.data)
          let data = res.data
          if (data.returnCode === '0000') {
            _this.backUpData = data.bean
            _this.showLoading = false;
          } else {
            _this.showLoading = false;
            _this.alertContent = data.returnMessage
            _this.showAlert = true
          }
        }).catch(err => {
          _this.showLoading = false;
          _this.alertContent = '请求后台数据失败'
          _this.showAlert = true
        })
  
      },
      closeAlert() {
        this.alertContent = '请选择功能'
      },
      _call() {
        if (this.backUpData === null) {
          this.alertContent = '还未获取到后台返回数据'
          this.showAlert = true
          return
        }
        let busiType = this.selectVal,
          params = this.backUpData
  
        if (busiType === '01') {
          // SJGYJ-849(拍照组件)
          window.smrz.callTakePhoto(params.SIGNATURE, params.transactionID, params.BUSI_TYPE)
  
        } else if (busiType === '02') {
          // SJGYJ-958(封装只刷身份证组件)
          window.smrz.readIdCard(params.SIGNATURE, params.transactionID, params.BUSI_TYPE)
  
        } else if (busiType === '03') {
          // SJGYJ-955(NFC人证比对组件)
          window.smrz.call(params.SIGNATURE, params.transactionID, params.BUSI_TYPE)
  
        } else if (busiType === '04') {
          // SJGYJ-1110(D1人证比对能力组件)
          window.smrz.call(params.SIGNATURE, params.transactionID, params.BUSI_TYPE)
  
        } else if (busiType === '05') {
          // SJGYJ-850(无纸化合成PDF组件及人证比对组件优化)
          window.smrz.callPaperless(params.SIGNATURE, params.transactionId, params.BUSI_TYPE, params.provCode, params.msOpcode, params.channelId)
  
        } else if (busiType === '06') {
          // SMZ-2514(合成PDF组件优化)
          window.smrz.callPaperless(params.SIGNATURE, params.transactionId, params.BUSI_TYPE, params.provCode, params.msOpcode, params.channelId)
  
        } else if (busiType === '07') {
          // SJGYJ-951(手输身份证号唤起人证比对能力)
          window.smrz.shootCompare(params.SIGNATURE, params.transactionId, params.BUSI_TYPE, params.name, params.cardNo)
  
        }
      },
      _empty() {
        if (this.backUpData === null) {
          return
        }
        this.backUpData = null
      },
      onSuccess() {
        this.alertContent = '调用安卓组件成功'
        this.showAlert = true
      },
      onError(code, message) {
        this.alertContent = `调用安卓组件失败  code:${code} message:${message}`
        this.showAlert = true
      }
    }
  }
</script>

<style>
  .table {
    margin-top: 10px;
  }
  
  .table thead tr th:nth-child(2) {
    text-align: left;
  }
  
  .table tbody tr td:nth-child(2) {
    text-align: left;
  }
</style>
