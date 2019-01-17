$(function () {
  var provinceName = getQueryString('province') || "全国";
  var r4data;
  $.ajax({
    url: './static/r4data.json?ver=' + new Date().getTime(),
    type: 'GET',
    success: function (data) {
      var swiperStr = '';
      var bgStr = '';
      r4data = data[provinceName];
      for (var i = 0; i < r4data.length; i++) {
        if (r4data[i].type === "1") {
          bgStr = "<div class='swiper-pagination'></div>" +
            "<div class='waves'>" +
            "<img src='./static/" + r4data[i].img + "' />" +
            "</div>";
        } else {
          swiperStr += "<div class='swiper-slide'>" +
            "<img src='./static/" + r4data[i].img + "' />" +
            "</div>";
        }
      }

      // for (var i = 0; i < r4data.length; i++) {
      //   if (r4data[i].type === "1") {
      //     bgStr = '<div class="swiper-pagination"></div>' +
      //       '<div class="waves">' +
      //       '<img width="100%" src="./static/' + r4data[i].img + '" />' +
      //       '</div>';
      //   } else {
      //     swiperStr += '<div class="swiper-slide">' +
      //       '<img src="./static/' + r4data[i].img + '" alt="" width="100%" />' +
      //       '</div>';
      //   }
      // }
      $('.swiper-wrapper').append(swiperStr);
      $('.swiper-wrapper-mask').append(bgStr);
      var swiper = new Swiper(".swiper-container", {
        speed: 600,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        },
        on: {
          tap: function (e) {
            var index = this.clickedIndex === 5 ? 0 : this.clickedIndex - 1;
            // console.log('需要跳转的地址为 ==> ' + r4data[index].url);
            var url = r4data[index].url;
            window.sendParamsToAndroid(url);
          }
        }
      });
    }
  })
});

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}
