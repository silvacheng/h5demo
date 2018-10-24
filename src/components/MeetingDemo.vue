<template>
  <div class="hello">
    <divider> 第{{requestIndex}}次请求</divider>
    <flexbox ref="flexBox" :gutter="10" class="flexbox" id="flexbox">
      <flexbox-item v-for="(listItem, index) in list" :key="index">
        <div class="flex-demo" v-for="(item, index) in listItem" :key="index">
          <dl>
            <dt>
              <img :src="item.image" alt="" width="80" height="80">
            </dt>
            <dd>
              {{item.userName}}
            </dd>
            <dd>
              {{item.now}}
            </dd>
          </dl>
        </div>
      </flexbox-item>
      <!-- <flexbox-item v-for="(listItem, index) in arr" :key="index">
        <div class="flex-demo">
          {{listItem}}
        </div>
      </flexbox-item> -->
    </flexbox>
  </div>
</template>

<script>
  import { Divider, Flexbox, FlexboxItem, AjaxPlugin } from 'vux'
  import { setInterval, clearInterval, setTimeout } from 'timers'
  import animations from 'create-keyframe-animation'

  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Divider
    },
    data() {
      return {
        list: new Array(8),
        timer: null,
        delay: 5000,
        requestIndex: 0
      }
    },
    computed: {
      win_width() {
        return window.innerWidth
      }
    },
    mounted () {
      // this.timer = setInterval(() => {
      //   this._getData()
      // }, this.delay)
    },
    methods: {
      _getData() {
        let url = 'https://www.easy-mock.com/mock/5ba3971c00424530fc9db8ae/mockApi/meetingList'
        AjaxPlugin.$http.post(url).then(res => {
          if(res.data.code === 0) {
            this.requestIndex++
            this.list.unshift(res.data.result.list)
            if(this.list.length >= 8) {
              this.list = this.list.slice(0, 8)
            }

            if(this.requestIndex !== 1) {
              this.$refs.flexBox.$el.style.animation = ''
              animations.unregisterAnimation('move')
            }

            this.$nextTick(() => {
              this._setAnimation()
            })
            // this._setAnimation()
          }
        })
      },
      _setAnimation() {
        let animation = {
          0: {
            transform: `translate(0, 0)`
          },
          100: {
            // transform: `translate(${this.win_width / 8}px, 0)`
            transform: `translate(12%, 0)`
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
