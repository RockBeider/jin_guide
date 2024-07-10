/** comonent - btn_scroll **/
var scrollingChkStatus = true;
$.btnScroll = function () {
  var scrollArea = $('.list_template');
  var scrollWrap = $('.scroll_wrap');
  var scrollArr = []; // offset.top
  var scrollIdx = 0; // category index
  var scrollBtns = $('.scroll_menu');
  function scrollInit() {
    getTop(scrollIdx); // category top 가져오기
    console.log('getTop 실행!!');
    getScrollIdx(); // scroll index 가져오기 + btnChange(idx)
    scrollBtns.each(function () {
      // disable 제외 버튼 클릭 시 scroll 이동
      this.btns = $('.btn:not(:disabled)', this);
      this.cont = $('.scroll_menu', this);
      this.btns.each(function (n) {
        this.n = n;
        this.parent = $(this).parent();
      }).on('click', function () {
        console.log('this.n', this.n);
        goScroll(this.n);
      });
    });
  }
  scrollInit();
  function getTop(set) {
    scrollArr = [];
    var scrollWrapTop = scrollWrap.offset().top;
    var category = $('.scroll_wrap .g_category');
    // console.log('scrollWrapTop', scrollWrapTop) 
    category.each(function () {
      var sum = Math.floor($(this).offset().top - scrollWrapTop + 10);
      // console.log('sum', sum)
      scrollArr.push(sum);
    });
    //  console.log('scrollArr',scrollArr)
  }
  function getScrollIdx() {
    scrollArea.scroll(function () {
      var curScrollTop = scrollArea.scrollTop();
      var idx = 0;
      if (!scrollingChkStatus) {
        return false;
      }
      scrollArr.forEach(function (arr, i) {
        if (arr < curScrollTop) {
          idx = i;
          return false;
        }
      });
      btnChange(idx);
    });
  }
  function goScroll(n) {
    scrollingChkStatus = false;
    scrollArea.stop().scrollTop(scrollArr[n]);
    // console.log('scrollTop',  scrollArr[n])
    setTimeout(() => {
      btnChange(n);
      scrollingChkStatus = true;
    }, 50);
  }
  function btnChange(idx) {
    var This = scrollBtns.find('.btn').eq(idx);
    // console.log('scrollBtns.btns', scrollBtns.find('.btn'))
    scrollBtns.find('.btn').removeClass('is_active');
    This.addClass('is_active');
    // console.log('This',This[0])
  }
};

// tab
$.tab = function () {
  $('[class^="tab_menu"] .tab_btn').each(function (index, item) {
    const _this = $(item);
    if (this.clickInit) return true;
    this.clickInit = true;
    _this.click(function () {
      const $tab_id = _this.attr('data-tab');
      const $tab = _this.parent('[class^="tab_menu"]');
      const $tab_btns = $tab.find('.tab_btn'); // 탭 버튼 전체
      const $tab_content = $tab.siblings('.tab_cont_wrap').find('.tab_cont[ data-id="' + $tab_id + '"]');
      const $tab_content_all = $tab.siblings('.tab_cont_wrap').children('.tab_cont'); // 탭 컨텐츠 전체
      const $tab_content_p = $tab.siblings('.tab_cont_wrap');
      $tab_btns.removeClass('is_active');
      _this.addClass('is_active');
      $tab_content_all.removeClass('is_active');
      $tab_content.addClass('is_active');
      $tab_content_p.scrollTop(0);
    });
  });
};

// modal
$.modal = function () {
  var btns = $('.modal_open');
  btns.on('click', function () {
    layerOpen(this.getAttribute('aria-controls'), this);
    return false;
  });
  $(document).on('click', '.dimmer', function () {
    var modalWrap = $(this).closest('.modal_wrap');
    modalWrap.removeClass('is_show');
    modalWrap[0].focusTarget.focus();
    return false;
  });
  $(document).on('click', '.modal_close', function () {
    var modalWrap = $(this).closest('.modal_wrap');
    modalWrap.removeClass('is_show');
    modalWrap[0].focusTarget.focus();
    return false;
  });
};
/* modal control  */
function layerOpen(target, obj) {
  $('html').css({
    overflow: 'hidden'
  });
  var layer = $(`[data-modal=${target}]`);
  layer.addClass('is_show');
  layer.find('.modal').attr({
    tabindex: 0
  }).focus();
  layer[0].focusTarget = obj;
  if ($('.modal_wrap').hasClass('type_bar')) {
    // bar 타입의 경우
    let startY;
    let isDragging = false;
    let popupHeight;
    const $popup = $('.modal_wrap.type_bar .modal');
    const $popupBtn = $('.modal_wrap.type_bar .modal_close');
    $popup.css({
      height: 'auto'
    });
    $popupBtn.on('touchstart', function (e) {
      startY = e.originalEvent.touches[0].clientY;
      popupHeight = $popup.outerHeight();
      isDragging = true;
    });
    $popupBtn.on('touchmove', function (e) {
      if (!isDragging) return;
      const touchY = e.originalEvent.touches[0].clientY;
      const moveY = touchY - startY;
      if (moveY > 0) {
        $popup.css('height', popupHeight - moveY + 'px');
      }
    });
    $popupBtn.on('touchend', function (e) {
      isDragging = false;
      const touchY = e.originalEvent.changedTouches[0].clientY;
      const moveY = touchY - startY;
      if (moveY > 100) {
        $popup.css({
          height: '0',
          padding: '0'
        });
        setTimeout(() => {
          layerClose(target);
        }, 200);
      } else {
        $popup.css('height', 'auto');
      }
    });
  }
}
function layerClose(target) {
  $('html').css({
    overflow: 'auto'
  });
  var layer = $(`[data-modal=${target}]`);
  layer.removeClass('is_show');
  layer.find('.modal').attr({
    tabindex: -1
  });
  layer[0]?.focusTarget?.focus();
}

// Toast
$.toast = function () {
  var toastbtns = $('.toast_open');
  toastbtns.on('click', function () {
    console.log('click');
    toastOpen(this.getAttribute('aria-controls'), this);
    return false;
  });
};
// toastOpen
function toastOpen(target) {
  $(`[data-toast=${target}]`).addClass('is_show');
  setTimeout(function () {
    toastClose(target);
  }, 3000);
}
function toastClose(target) {
  $(`[data-toast=${target}]`).removeClass('is_show').one('transitionend', function () {
    !$(`[data-toast=${target}]`).hasClass('is_show');
  });
}
$.accordion = function () {
  $('.accordion > .acc_header.is_active').next('.acc_cont').slideDown();
  $(document).on("click", '.accordion > .acc_header', function (e) {
    var _this = $(this);
    var open = _this.closest(".accordion").find('.acc_header.is_active');
    if (open[0] != _this[0]) open.removeClass('is_active').next('.acc_cont').slideUp('ease-out');
    _this.toggleClass('is_active').next('.acc_cont').slideToggle('ease-out');
  });
};
$.contentExpand = function () {
  $('.content_expand').each(function () {
    if (!this.heightChk) {
      var This = $(this);
      var btns = $(this).siblings().find('.open_btn');
      var hei = This.height();
      this.heightChk = true;
      if (hei > 40) {
        This.closest('.content_expand_wrap').addClass('closed');
        this.showChk = false;
        This.off('click');
        btns.on('click', function () {
          if (!this.showChk) {
            This.css({
              height: 'auto'
            });
            this.showChk = true;
            hei = This.height();
            This.closest('.content_expand_wrap').removeClass('closed');
            This.stop().css({
              height: 40
            }).animate({
              height: hei
            });
          } else {
            this.showChk = false;
            This.closest('.content_expand_wrap').addClass('closed');
            This.stop().animate({
              height: 40
            });
          }
        });
      } else {
        btns.remove();
      }
    }
  });
};
var btnScroll = null;
$(function () {
  $.modal();
  $.toast();
  $.contentExpand();
  $.tab();
  btnScroll = $.btnScroll();
  $.accordion();
});