



/* 접근성 아코디언 */
var accordionDom = '.accordion'
var accordionTitle = '.accordion .accortionTitle'
var accordionInit = '.accordion .accortionTitle .accordionTrigger'
var accordionTrigger = '.accordionTrigger'
var accordionPanel = '.accordionPanel'
var accordionItem = '.accordionItem'

$.accordionAccessibility = function() {
  class Accordion {
    constructor(domNode) {
      this.rootEl = domNode;
      this.buttonEl = this.rootEl.querySelector('[aria-expanded]');
      // console.log(this.buttonEl)
      const controlsId = this.buttonEl.getAttribute('aria-controls');
      this.contentEl = document.getElementById(controlsId);
      this.open = this.buttonEl.getAttribute('aria-expanded') === 'true';
      this.buttonEl.evt = this.onButtonClick;
      this.buttonEl.This = this;
    }
    onButtonClick(e , This) {
      const accordionOption = This.buttonEl.closest('[accordion-option]').getAttribute('accordion-option');
      if (accordionOption === 'only') { //only type
        var status = This.buttonEl.parentNode.parentNode.classList.contains('isOpen');
        if (status == false) { //close 
          This.buttonEl.closest('[accordion-option]').querySelectorAll(`${accordionTrigger}`).forEach((trigger) => {
            trigger.setAttribute('aria-expanded', 'false');
            This.buttonEl.setAttribute('aria-expanded', 'true');
          })
          This.buttonEl.closest('[accordion-option]').querySelectorAll(`${accordionPanel}`).forEach((panel) => {
            panel.closest(`${accordionItem}`)?.classList.remove('isOpen')
            panel.setAttribute('aria-hidden',true);
            This.contentEl.removeAttribute('aria-hidden',false);
          });
          This.buttonEl.parentNode.parentNode.classList.add('isOpen')
        } else { // open
          This.buttonEl.parentNode.parentNode.classList.remove('isOpen')
          This.buttonEl.setAttribute('aria-expanded', false);
          This.contentEl.setAttribute('aria-hidden',true);
        }
      } else { //toggle type
        This.toggle(!This.open);
      }
    }
    toggle(open) {
      if (open === this.open) {
        return;
      }
      this.open = open;
      this.buttonEl.setAttribute('aria-expanded', `${open}`);
      if (open) {
        this.contentEl.removeAttribute('aria-hidden',true);
      } else {
        this.contentEl.setAttribute('aria-hidden',true);
      }
    }
    open() {
      this.toggle(true);
    }
    close() {
      this.toggle(false);
    }
  }
  const accordions = document.querySelectorAll(`${accordionTitle}`);
  
  $(document).on('click', `${accordionInit}`,  function(e){
    if(!e.target.This){
      new Accordion(e.target.parentNode);
    }
    e.target.evt(e, e.target.This)
  });

}  

$.accordion = function() {
  class Accordion {
    constructor(domNode) {
      this.rootEl = domNode;
      this.buttonEl = this.rootEl.querySelector('[aria-expanded]');
      // console.log(this.buttonEl)
      const controlsId = this.buttonEl.getAttribute('aria-controls');
      this.contentEl = document.getElementById(controlsId);
      this.open = this.buttonEl.getAttribute('aria-expanded') === 'true';
      this.buttonEl.evt = this.onButtonClick;
      this.buttonEl.This = this;
    }
    onButtonClick(e , This) {
      const accordionOption = This.buttonEl.closest('[accordion-option]').getAttribute('accordion-option');
      if (accordionOption === 'only') { //only type
        var status = This.buttonEl.parentNode.parentNode.classList.contains('isOpen');
        if (status == false) { //close 
          This.buttonEl.closest('[accordion-option]').querySelectorAll(`${accordionTrigger}`).forEach((trigger) => {
            trigger.setAttribute('aria-expanded', 'false');
            This.buttonEl.setAttribute('aria-expanded', 'true');
          })
          This.buttonEl.closest('[accordion-option]').querySelectorAll(`${accordionPanel}`).forEach((panel) => {
            panel.closest(`${accordionItem}`)?.classList.remove('isOpen')
            panel.setAttribute('aria-hidden',true);
            This.contentEl.removeAttribute('aria-hidden',false);
          });
          This.buttonEl.parentNode.parentNode.classList.add('isOpen')
        } else { // open
          This.buttonEl.parentNode.parentNode.classList.remove('isOpen')
          This.buttonEl.setAttribute('aria-expanded', false);
          This.contentEl.setAttribute('aria-hidden',true);
        }
      } else { //toggle type
        This.toggle(!This.open);
      }
    }
    toggle(open) {
      if (open === this.open) {
        return;
      }
      this.open = open;
      this.buttonEl.setAttribute('aria-expanded', `${open}`);
      if (open) {
        this.contentEl.removeAttribute('aria-hidden',true);
      } else {
        this.contentEl.setAttribute('aria-hidden',true);
      }
    }
    open() {
      this.toggle(true);
    }
    close() {
      this.toggle(false);
    }
  }
  const accordions = document.querySelectorAll(`${accordionTitle}`);
  
  $(document).on('click', `${accordionInit}`,  function(e){
    if(!e.target.This){
      new Accordion(e.target.parentNode);
    }
    e.target.evt(e, e.target.This)
  });

} 


/** comonent - btn_scroll **/
var scrollingChkStatus = true;
$.btnScroll = function () {
  var scrollArea = $('.list_template');
  var scrollWrap = $('.scroll_wrap');
  var scrollArr = []; // offset.top
  var scrollIdx = 0; // category index

  // var tabBtns = $('.tab_menu .tab_btn');
  var scrollBtns = $('.scroll_menu');

  // if (!tabBtns.length) return false;
 
  function scrollInit() {
    getTop(scrollIdx); // category top 가져오기
    console.log('getTop 실행!!')
    getScrollIdx(); // scroll index 가져오기 + btnChange(idx)
    scrollBtns.each(function () { // disable 제외 버튼 클릭 시 scroll 이동
      this.btns = $('.btn:not(:disabled)', this);
      this.cont = $('.scroll_menu', this);
      this.btns.each(function (n) { 
        this.n = n;
				this.parent = $(this).parent()
      }).on('click', function () {
        console.log('this.n', this.n)
        goScroll(this.n)
      })
    })
  } 
  scrollInit();

  function getTop(set) {  
    scrollArr = [];
    var scrollWrapTop = scrollWrap.offset().top; 
    var category = $('.scroll_wrap .g_category');
    // console.log('scrollWrapTop', scrollWrapTop) 
    category.each(function () {
      var sum = Math.floor($(this).offset().top - scrollWrapTop + 10)
      // console.log('sum', sum)
      scrollArr.push(sum)
    })
    //  console.log('scrollArr',scrollArr)
  }

  // console.log(scrollWrap.length)
  function getScrollIdx(){ 
    scrollArea.scroll(function () { 
      var curScrollTop = scrollArea.scrollTop();
      var idx = 0;
      if (!scrollingChkStatus) {
        return false;
      }
      scrollArr.forEach(function (arr, i) {
        if (arr < curScrollTop) {
          idx = i
          return false;
        }
      });
      btnChange(idx)
    })
  }
  
  function goScroll(n) {
    scrollingChkStatus = false;
    scrollArea.stop().scrollTop( scrollArr[n] )
    // console.log('scrollTop',  scrollArr[n])
    setTimeout(()=>{
      btnChange(n);
      scrollingChkStatus = true;
    },50)
  }

  function btnChange(idx) {
    var This = scrollBtns.find('.btn').eq(idx)
    // console.log('scrollBtns.btns', scrollBtns.find('.btn'))
    scrollBtns.find('.btn').removeClass('is_active')
    This.addClass('is_active')
    // console.log('This',This[0])
  }

  // function btnsToCenter(obj) { // 버튼 센터 이동
  //   var wrap = $(obj);
  //   var btnWrap = obj.parent
  //   var myScrollPos = Math.floor(wrap.offset().left + wrap.outerWidth() / 2 + btnWrap.scrollLeft() - btnWrap.outerWidth() / 2) ;
  //   btnWrap.stop().animate({ 'scrollLeft': myScrollPos })
  //   console.log('wrap',wrap)
  //   console.log('myScrollPos',myScrollPos)
  // }

  // function chnageTab(n) {
  //   scrollWrap.hide().eq(n).show()
  //   scrollWrap.removeClass('is_active').eq(n).addClass('is_active');
  //   scrollArea.scrollTop(0)
  //   getTop(n)
  //   scrollIdx = n;
  //   tabCont.each(function () {
  //     this.btns.removeClass('is_active').eq(0).addClass('is_active')
  //     this.cont.stop().scrollLeft(0)
  //   })
  // } 
  // tabBtns.on('click',function () {
  //   chnageTab($(this).index())
  //   return;
  // });
}



$.btnScrollType2 = function() {
	// A - Z	브랜드 검색
	var tabArea = $('.tab_brand_wrap .tab_menu').find('button');
	tabArea.each(function (index, item) {

		const _this = $(item);
		_this.click(function () {
			
			//버튼이 클릭되면 ABC버튼 각 영어,한글은 초기화
			$(".tab_menu button").removeClass("is_active");
			$('section[class^="tab_lang_wrap"]').removeClass("is_active");
			
			//ABC / ㄱㄴㄷ 버튼
			const $tab_id   = _this.attr('data-tab'); //영문,한글
			if( $tab_id != null){
			   if($tab_id == "tab_e"){
				  $($('section[class^="tab_lang_wrap"][data-id="tab_e"]')).addClass("is_active");
				  _this.addClass('is_active');
			   }else{
				  $($('section[class^="tab_lang_wrap"][data-id="tab_k"]')).addClass("is_active");
				  _this.addClass('is_active');
			   }
			}
   
			
			if($(this).attr('data-target').includes("e_")){
			   
			   if($('section[class^="tab_lang_wrap"][data-id="tab_e"]')){
				  $($('section[class^="tab_lang_wrap"][data-id="tab_e"]')).addClass("is_active");
				  $($('button[data-tab="tab_e"]')).addClass("is_active");
			   }
			}else{
			   if($('section[class^="tab_lang_wrap"][data-id="tab_k"]')){
				  $($('section[class^="tab_lang_wrap"][data-id="tab_k"]')).addClass("is_active");
				  $($('button[data-tab="tab_k"]')).addClass("is_active");
			   }
			}
			_this.addClass('is_active'); //해당 버튼 abc ㄱㄴㄷ 
			scroll_tab($(this).attr('data-target')); // 스크롤 이동
			
		});
	});


  var scrollBox = $(".search_result_brand_wrap .auto_complete_wrap .tab_lang_wrap");
  var tabBtns = $(".search_brand_wrap  .tab_style7 button")
  var tabBtns_word = $(".search_brand_wrap .search_brand_lang_wrap")
  var cont = scrollBox;
  var tabNow = 0;
	var sizeArr = [];
	var sumTopPos = 0;

  if($(".total_search_word_wrap").length){
     scrollBox = $(".total_search_word_wrap .tab_lang_wrap");
     tabBtns = $(".total_search_word_wrap  .tab_style7 button")
     tabBtns_word = $(".total_search_word_wrap .search_brand_lang_wrap")
     cont = scrollBox;
  } 
  
  if(scrollBox.length == 0) return false;
   
  /* 한/영 선택 */
	tabBtns.off("click.tabBtns")
	tabBtns.on("click.tabBtns",function () {
    var n = $(this).index();
    cont.hide().eq(n).show();
		tabBtns_word.removeClass("is_active").eq(n).addClass("is_active");
		scrollBox.scrollTop(0);
		getTop(n);
		tabNow = n;
		tabBtns_word.each(function () {
			this.btns.removeClass("is_active").eq(0).addClass("is_active");
			this.cont.scrollLeft(0);
		})
	});

  /* 포지션 리셋 */
	function getTop(n) {
    scrollBox.stop().scrollTop(0);
		sizeArr = [];
		var contTop = cont.eq(n).offset().top - sumTopPos;
		var section = $("section", cont[n]);
		// console.log(contTop) 
		section.each(function () {
			var sum = Math.ceil($(this).offset().top) - contTop
			sizeArr.push(sum)
		})
		//  console.log(sizeArr)
	}
  /* 단어별 클릭 셋팅 */
	function wordInit() {
    var cont = scrollBox.closest(".cont").not(".is_active");
    cont.show()
    scrollSet()
		getTop(tabNow);
		tabBtns_word.each(function () {
			this.btns = $("button:not(:disabled)", this);
			this.btns2 = $("button", this);
			this.btns2.each(function (n) { this.nn = n })
			this.btns2.off("click.word")
			this.cont = $(".tab_sub", this);
      var btns = this.btns;
			this.btns.off("click.word");
			this.btns.each(function (n) {
				this.n = n;
				this.$ = $(this)
				this.scroll = this.$.parent()
				this.width = this.scroll.width();
        this.friend = btns
			}).on("click.word", function () {
        
        scrollSet()
        getTop(tabNow);
				var n = this.n;
        scrollBox.stop().scrollTop( sizeArr[n]  );
        setTimeout(()=>{wordChange(n),50})
        // scrollBox.stop().animate({ scrollTop: sizeArr[n] - 2  },
        // {
        //   step: function () {
        //     // sticky.css({ top: 0 })
        //   }, done: function () {
        //     wordChange(n);
        //   }
        // })
        
			})
		})
    wordChange(0)
    
    cont.hide()
	}
	wordInit();
  
  
  function wordChange(idx){
		var This = tabBtns_word[tabNow].btns.removeClass("is_active").eq(idx)
		This.addClass("is_active")
  }


	var wordNow = 0;
	function scrollSet(){
    scrollBox.each(function(){
      var This = $(this);
      var cont = $(".search_filter_modal .content_scroll_wrap");
  
      This.scroll(function () {
        var now = This.scrollTop();
        var idx = 0;
        // console.log(now)
        sizeArr.forEach(function (chk, i) {
          //console.log(chk , now)
          if (chk < now+2) {
            idx = i
            return false;
          }
        });
        if (wordNow != idx) {
          wordNow = idx;
          wordChange(wordNow)
        }
      })
      
    })
  }
  return {init:wordInit}
	
	
};


//버튼클릭이동 -> 부드럽게
function scroll_tab(anchor_id, speed) {
  if (!speed) var speed = "slow";
  var a_tag = $("#" + anchor_id);
  if (a_tag.length > 0) {

    $("html, body").stop().scrollTop(a_tag.offset().top - $(".sticky").height() - 100)
    // $("html, body").stop().animate(
    //   {
    //     scrollTop: a_tag.offset().top - $(".sticky").height() - 100, //sticky class 높이 제외하고 100정도 밑
    //   },
    //   speed
    // );
  } else {
    console.log("no target");
  }

  var scrollValue;
  var a_tag = $("#" + anchor_id);
  if (anchor_id.includes("e_")) {
    // console.log("영")
    $('section[class^="tab_lang_wrap"][data-id="tab_e"]').scrollTop(0);
    scrollValue = a_tag.offset().top - $('section[class^="tab_lang_wrap"][data-id="tab_e"]').offset().top;
  } else {
    // console.log("한")
    $('section[class^="tab_lang_wrap"][data-id="tab_k"]').scrollTop(0);
    scrollValue = a_tag.offset().top - $('section[class^="tab_lang_wrap"][data-id="tab_k"]').offset().top;
  }

  if (!speed) var speed = "slow";

  //console.log("아이디:" + $('.tab_lang_wrap').offset().top);
  // console.log("아이디:" + anchor_id);
  // console.log("아이디:" + scrollValue);

  if (a_tag.length > 0) {
    $(".tab_lang_wrap").stop().animate(
      {
        scrollTop: scrollValue,
      },
      speed
    );
  } else {
    console.log("no target");
  }
}

function scroll_tab01(anchor_id,speed) {

	var scrollValue;
	var a_tag = $("#"+anchor_id);
	var scrollBox = $('.tab_lang_wrap');
	var targetScroll = scrollBox[0]
	
	if(targetScroll.__overlayScrollbars__){
		
		if(anchor_id.includes("e_")){
			// console.log("영")
			targetScroll = scrollBox[0]
			targetScroll.__overlayScrollbars__.scroll({top:0})
			scrollValue = a_tag.offset().top - $('section[class^="tab_lang_wrap"][data-id="tab_e"]').offset().top;
		}else{
			// console.log("한")
			targetScroll = scrollBox[1]
			targetScroll.__overlayScrollbars__.scroll({top:0})
			scrollValue = a_tag.offset().top - $('section[class^="tab_lang_wrap"][data-id="tab_k"]').offset().top;
		}

	}else{
			
		if(anchor_id.includes("e_")){
			// console.log("영")
			$('section[class^="tab_lang_wrap"][data-id="tab_e"]').scrollTop(0);
			scrollValue = a_tag.offset().top - $('section[class^="tab_lang_wrap"][data-id="tab_e"]').offset().top;
		}else{
			// console.log("한")
			$('section[class^="tab_lang_wrap"][data-id="tab_k"]').scrollTop(0);
			scrollValue = a_tag.offset().top - $('section[class^="tab_lang_wrap"][data-id="tab_k"]').offset().top;
		}
	}
		
	if( !speed ) var speed = 'slow';
	//console.log("아이디:" + $('.tab_lang_wrap').offset().top);
	// console.log("아이디:" + anchor_id);
	// console.log("아이디:" + scrollValue);
	
	if(a_tag.length > 0){
		if(targetScroll.__overlayScrollbars__){
			targetScroll.__overlayScrollbars__.scroll({top:scrollValue})
		}else{
			scrollBox.stop().animate({
			   scrollTop: scrollValue
			}, speed);
		}
	}else{
	   console.log("no target"); 
	}

	//aa[0].__overlayScrollbars__.scroll({top:100})

}


// tab
$.tab = function () {
  $('[class^="tab_menu"] .tab_btn').each(function (index, item) {
    const _this = $(item);
    if(this.clickInit) return true;
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



// // Modal full popup
// function ModalFPOpen(target) {
//   var _getTarget = $('[data-modal='+target+']');
// 	_getTarget.css({ 'z-index': '1100' });
// 	dimmVisible();
// 	_getTarget.addClass('');
// }
// function ModalFPClose(id) {
// 	_getTarget.removeClass('');

// 	// 남아있는 모달이 없는 경우 초기화
// 	if ($('.modal_wrap.').length == 0) {
// 		dimmHidden();
// 	}
// }

// // Alert popup
// function ModalAlertOpen(target) {
//   var _getTarget = $('[data-modal='+target+']');
// 	_getTarget.css({ 'z-index': '1300' });
// 	dimmVisible();
// 	_getTarget.addClass('is_show');
// }
// function ModalAlertClose(id) {
// 	_getTarget.removeClass('is_show').one('transitionend', function () {
// 		if (!_getTarget.hasClass('is_show')) {
// 			_getTarget.removeClass('');

// 			// 남아있는 모달이 없는 경우 초기화
// 			if ($('.modal_wrap.').length == 0) {
// 				dimmHidden();
// 			}
// 		}
// 	})
// }

// // Dimmed popup
// function ModalOpen(target) {
//   var _getTarget = $('[data-modal='+target+']');
// 	_getTarget.css({ 'z-index': '1300' });
// 	dimmVisible();
// 	_getTarget.addClass('is_show');

// 	$('.dimmer').click(function (e){
// 		_getTarget.removeClass('is_show').one('transitionend', function () {
// 			if (!_getTarget.hasClass('is_show')) {
// 				_getTarget.removeClass('');
	
// 				// 남아있는 모달이 없는 경우 초기화
// 				if ($('.modal_wrap.').length == 0) {
// 					dimmHidden();
// 				}
// 			}
// 		})
// 		//console.log(e.target);
// 	});
// }
// function ModalOpenClose(target) {
//   var _getTarget = $('[data-modal='+target+']');
// 	_getTarget.removeClass('is_show').one('transitionend', function () {
//     if (!_getTarget.hasClass('is_show')) {
//       _getTarget.removeClass('');

// 			// 남아있는 모달이 없는 경우 초기화
// 			if ($('.modal_wrap.').length == 0) {
// 				dimmHidden();
// 			}
// 		}
// 	})
// }
// // ToastOpen
// function ToastOpen(target) {
//   var _getTarget = $('[data-modal='+target+']');
// 	_getTarget.addClass('is_show');
// 	setTimeout(function () { ToastClose(target) }, 3000);
// }
// function ToastClose(target) {
// 	_getTarget.removeClass('is_show').one('transitionend', function () {
// 		!_getTarget.hasClass('is_show') && _getTarget.removeClass('');
// 	})
// }


// modal
$.modal = function () {
  var btns = $('.modal_open');
  btns.on('click', function(){
    layerOpen(this.getAttribute('aria-controls'),this);
    return false;
  })
  $(document).on('click', '.dimmer' , function(){
    var modalWrap = $(this).closest('.modal_wrap');
    modalWrap.removeClass('is_show')
    modalWrap[0].focusTarget.focus()
    return false;
  })
  $(document).on('click', '.modal_close', function(){
    var modalWrap = $(this).closest('.modal_wrap');
    modalWrap.removeClass('is_show');
    modalWrap[0].focusTarget.focus();
    return false;
  })
}
/* modal control  */
function layerOpen(target , obj){
  // $('html').css({overflow:'hidden'})
  var layer = $(`[data-modal=${target}]`)
  layer.addClass('is_show');
  layer.find('.modal').attr({tabindex:0}).focus();
  layer[0].focusTarget = obj;
}

function layerClose(target){
  // $('html').css({overflow:'auto'})
  var layer = $(`[data-modal=${target}]`)
  layer.removeClass('is_show');

  layer.find('.modal').attr({tabindex:-1});
  layer[0]?.focusTarget?.focus();
}

// Toast
$.toast = function () {
  var toastbtns = $('.toast_open');
  toastbtns.on('click', function(){
    toastOpen(this.getAttribute('aria-controls'),this);
    return false;
  })
}
// toastOpen
function toastOpen(target) {
	$(`[data-modal=${target}]`).addClass('is_show');
	setTimeout(function () { toastClose(target) }, 3000);
}
function toastClose(target) {
	$(`[data-modal=${target}]`).removeClass('is_show').one('transitionend', function () {
		!$(`[data-modal=${target}]`).hasClass('is_show');
	})
}



var btnScroll = null
var btnScrollType2 = null
$(function(){
  $.modal(); 
  $.toast(); 
  console.log('!')

  $.tab();
  btnScroll = $.btnScroll();
  btnScrollType2 = $.btnScrollType2();

  $.accordion();
});



