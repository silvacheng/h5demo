<template>
  <div class="hello">
    <divider> 第{{requestIndex}}次请求</divider>
    <flexbox ref="flexBox" :gutter="10" class="flexbox" id="flexbox">
      <flexbox-item v-for="(item, index) in list" :key="index">
        <!-- <div class="flex-demo" v-for="(item, index) in listItem" :key="index"> -->
        <div class="flex-demo">
          <dl>
            <dt>
              <img :src='baseUrl + item.prsnAvtrUrlAddr' alt="" width="80" height="80">
            </dt>
            <dd>
              {{item.prsnName}}
            </dd>
            <dd>
              后台时间戳：<br>{{item.capturedTime}} <br> {{_formatTime(item.capturedTime)}}
            </dd>
            <dd>
              当前时间戳：<br>{{current}} <br> {{_formatTime(current)}}
            </dd>
            <dd>
              相差：{{
                current - Number(item.capturedTime)
              }}ms
            </dd>
          </dl>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Divider, Flexbox, FlexboxItem, AjaxPlugin } from "vux";
import { setInterval, clearInterval, setTimeout } from "timers";
import animations from "create-keyframe-animation";
import _ from "lodash";
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider
  },
  data() {
    return {
      list: new Array(10),
      listClone: [],
      timer: null,
      delay: 300,
      requestIndex: 0,
      registerDelay: 25,
      baseUrl: "fileupdown/downloadBusiFile?filePath=",
      current: +new Date(),
      intervalArray: new Array(10),
      intervalArrayCopy: new Array(10)
    };
  },
  computed: {
    win_width() {
      return window.innerWidth;
    }
  },
  mounted() {
    // this.timer = setInterval(() => {
    //   this._getData();
    // }, this.delay);
    this._getData()
  },
  methods: {
    _getData() {
      // let url = 'https://www.easy-mock.com/mock/5ba3971c00424530fc9db8ae/mockApi/meetingList'
      let url = "/iscportal/conferenceSigning/get";
      AjaxPlugin.$http.post(url).then(res => {
        if (res.status === 200 && res.data.returnCode === "0000") {
          // 获取后台数据
          let newList = this._stringToJson(res.data.ext1.abc);
          // 判断后台数据与备份数据是否相同
          let isEqual = _.isEqual(newList, this.listClone);

          this.requestIndex++;
          if (this.requestIndex === 1) {
            this.list = newList;
          } else {
            // 后台数据与备份数据相同
            if (isEqual) {
              console.log("后台数据与备份数据相同");
              return;
            }
          }

          // 后台数据与备份数据不相同   更新listClone
          this.listClone = newList;
          // 合并
          this.list = this.list.concat(newList);
          // 去重
          this.list = _.uniq(this.list);

          // 排序
          // 数组进行排序 时间戳大的排在前面
          this.list.sort((a, b) => b.capturedTime - a.capturedTime);
          // console.log("取前十个之前 -----> ");
          // console.log(this.list);
          // 更新当前时间
          this.current = +new Date()
          if (this.list.length >= 10) {
            this.list = this.list.slice(0, 10);
          }
          // console.log("取前十个之后 -----> ");
          // console.log(this.list);
          // console.log(this._addInterval(this.list))
          // 给数组数据添加interval以及timeStamp
          this.intervalArray = this._addInterval(this.list)
          // 备份数组
          this.intervalArrayCopy = this.intervalArray

          if (this.requestIndex !== 1) {
            animations.unregisterAnimation("move");
          }

          // 设置动画
          setTimeout(() => {
            this._setAnimation();
          }, this.registerDelay);

        }
      });
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
      };
      animations.registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: this.delay,
          easing: "linear"
        }
      });
      // console.log(this.$refs.flexBox.$el)
      animations.runAnimation(this.$refs.flexBox.$el, "move");
    },
    _stringToJson(arr) {
      if (!arr) return;
      let ret = [];
      arr.map(item => {
        let json = JSON.parse(item);
        ret.push(json);
      });
      return ret;
    },
    _formatTime(time) {
      if (time === "null") {
        return "";
      }
      if(typeof time === "string") {
        time = Number(time)
      }
      let date = time ? new Date(time) : new Date();
      let month =
        date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
      let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      let hours =
        date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      let min =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      let sec =
        date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
      return (
        date.getFullYear() +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        min +
        ":" +
        sec
      );
    },
    _addInterval(arr) {
      let ret = _.cloneDeep(arr)
      ret.map(item => {
        let interval = this.current - Number(item.capturedTime)
        let timeStamp = +new Date()
        item['interval'] = interval;
        item['timeStamp'] = timeStamp;
        return item
      })
      return ret
    },
    _filterIntervalArray() {
      
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  overflow: hidden;
}

.flex-demo {
  text-align: center;
  color: #f90;
  border-radius: 4px;
  background-clip: padding-box;
}

.flex-demo img {
  border-radius: 50%;
}

.flexbox {
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
