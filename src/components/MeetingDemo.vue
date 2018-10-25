<template>
  <div class="hello">
    <divider> 第{{requestIndex}}次请求</divider>
    <flexbox ref="flexBox" :gutter="10" class="flexbox" id="flexbox">
      <flexbox-item v-for="(item, index) in list" :key="index">
        <!-- <div class="flex-demo" v-for="(item, index) in listItem" :key="index"> -->
        <div class="flex-demo">
          <dl>
            <dt>
              <img :src="item.picAddr" alt="" width="80" height="80">
            </dt>
            <dd>
              {{item.prsnName}}
            </dd>
            <dd>
              {{_formatTime(item.capturedTime)}}
            </dd>
          </dl>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import { Divider, Flexbox, FlexboxItem, AjaxPlugin } from 'vux'
  import { setInterval, clearInterval, setTimeout } from 'timers'
  import animations from 'create-keyframe-animation'
  import _ from 'lodash'
  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Divider
    },
    data() {
      return {
        list: new Array(10),
        listClone: new Array(10),
        timer: null,
        delay: 300,
        requestIndex: 0,
        registerDelay: 25
      }
    },
    computed: {
      win_width() {
        return window.innerWidth
      }
    },
    mounted () {
      this.timer = setInterval(() => {
        this._getData()
      }, this.delay)
      // this._getData()
    },
    methods: {
      _getData() {
        // let url = 'https://www.easy-mock.com/mock/5ba3971c00424530fc9db8ae/mockApi/meetingList'
        let url = '/iscportal/conferenceSigning/get';
        AjaxPlugin.$http.post(url).then(res => {
 
          if(res.status === 200 && res.data.returnCode === '0000') {
            this.requestIndex++
            if(this.requestIndex === 1) {
              this.list = this._stringToJson(res.data.ext1.abc)
            } else {
              this.list = this.list.concat(this._stringToJson(res.data.ext1.abc))
            }

            // console.log(`当前list的长度为${this.list.length}`)

            // 数组进行排序 时间戳大的排在前面
            this.list.sort((a, b) => b.capturedTime - a.capturedTime)

            if(this.list.length >= 10) {
              this.list = this.list.slice(0, 10)
            }

            // console.log(this.list)
            if(this.requestIndex !== 1) {
              animations.unregisterAnimation('move')
            }
            // let str = this.listClone === this.list ? '数组数据相同' : '数组数据不相同'
            // console.log(str)
            console.log(`----------------->>`)
            console.log(_.isEqual(this.list, this.listClone))
            let isEqual = _.isEqual(this.list, this.listClone)
            if(!isEqual){
              setTimeout(() => {
                this._setAnimation()              
              }, this.registerDelay)
            } else {
              return
            }

            // 备份数组数据
            this.listClone = this.list

          }
          // if(res.data.code === 0) {
          //   this.requestIndex++
          //   this.list.unshift(res.data.result.list)
          //   if(this.list.length >= 8) {
          //     this.list = this.list.slice(0, 8)
          //   }

          //   if(this.requestIndex !== 1) {

          //     animations.unregisterAnimation('move')
          //   }


          //   setTimeout(() => {
          //     this._setAnimation()              
          //   }, this.registerDelay)
          //   // this._setAnimation()
          // }
        })
      },
      _setAnimation() {
        let animation = {
          0: {
            transform: `translate(0, 0)`
          },
          100: {
            transform: `translate(${this.win_width / 8}px, 0)`
            // transform: `translate(12%, 0)`
          }
        }
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: this.delay,
            easing: 'linear'
          }
        })
        // console.log(this.$refs.flexBox.$el)
        animations.runAnimation(this.$refs.flexBox.$el, 'move')        
      },
      _stringToJson(arr) {
        if(!arr) return
        let ret = []
        arr.map((item) => {
          let json = JSON.parse(item)
          ret.push(json)
        })
        return ret
      },
      _formatTime(time) {
          if(time === 'null') {
              return '';
          }
          let date = time? new Date(time): new Date();
          let month = date.getMonth()<9? `0${date.getMonth()+1}`: (date.getMonth()+1);
          let day = date.getDate()<10? `0${date.getDate()}`: date.getDate();
          let hours = date.getHours()<10?`0${date.getHours()}`:date.getHours();
          let min = date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes();
          let sec = date.getSeconds()<10?`0${date.getSeconds()}`:date.getSeconds();
          return date.getFullYear()+'-'+month+'-'+day+ " " +hours+':'+min+':'+sec;        
      }
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  overflow: hidden;
}

.flex-demo{
  text-align: center;
  color: #f90;
  border-radius: 4px;
  background-clip: padding-box;

}

.flex-demo img {
  border-radius: 50%;
}

.flexbox{
  height: 400px;
}

/* #flexbox{
    animation: move 5s linear infinite;
}

@keyframes move{
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform:translate(12%, 0);
  }
} */
</style>
