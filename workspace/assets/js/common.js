

function layerOpenSetting(){
  var btns = $('.open_layer');
  btns.on('click',function(){
    
    layerOpen(this.getAttribute('aria-controls'),this);
    return false;
  })
  $(document).on('click','.layer_dimm' , function(){
    var layerwrap = $(this).closest('.layer_wrap');
    if(layerwrap.hasClass('modal')) return false;
    layerwrap.removeClass('show')
    layerwrap[0].focusTarget.focus()
    return false; 
  })
  $(document).on('click', '.layer_close',function(){
    var layerwrap = $(this).closest('.layer_wrap');
    layerwrap.removeClass('show');
    layerwrap[0].focusTarget.focus();
    return false;
  })
}
/* layer control  */
function layerOpen(id, obj) {
  $('html').css({ overflow: 'hidden' })
  var layer = $('#' + id)
  layer.addClass('show');
  layer.find('.layer_body').attr({ tabindex: 0 }).focus();
  layer[0].focusTarget = obj;
}
function layerClose(id) {
  $('html').css({ overflow: 'auto' })
  var layer = $('#' + id)
  layer.removeClass('show');

  layer.find('.layer_body').attr({ tabindex: -1 });
  layer[0]?.focusTarget?.focus();
}



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
  var scrollArea = $('.guide_template');
  var scrollWrap = $('.scroll_wrap');
  var scrollArr = []; // offset.top
  var scrollIdx = 0; // category index

  var tabBtns = $('.tab_menu .tab_btn');
  var tabCont = $('.tab_wrap .tab_cont');

  if (!tabBtns.length) return false;

  function scrollInit() {
    getTop(scrollIdx); // category top 가져오기
    getScrollIdx(); // scroll index 가져오기 + btnChange(idx)
    tabCont.each(function () { // disable 제외 버튼 클릭 시 scroll 이동
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
    var scrollWrapTop = scrollWrap.eq(set).offset().top; 
    var category = $('.category', scrollWrap[set]);
    // console.log(scrollWrapTop) 
    category.each(function () {
      var sum = Math.floor($(this).offset().top - scrollWrapTop)
      scrollArr.push(sum)
    })
    //  console.log(scrollArr)
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
    setTimeout(()=>{
      btnChange(n);
      scrollingChkStatus = true;
    },50)
  }

  function btnChange(idx) {
    var This = tabCont[scrollIdx].btns.removeClass('is_active').eq(idx)
    This.addClass('is_active')
    console.log('This',This[0])
    console.log('tabCont[scrollIdx]',tabCont[scrollIdx])
    btnsToCenter(This[0])
  }

  function btnsToCenter(obj) { // 버튼 센터 이동
    var wrap = $(obj);
    var btnWrap = obj.parent
    var myScrollPos = Math.floor(wrap.offset().left + wrap.outerWidth() / 2 + btnWrap.scrollLeft() - btnWrap.outerWidth() / 2) ;
    btnWrap.stop().animate({ 'scrollLeft': myScrollPos })
    console.log('wrap',wrap)
    console.log('myScrollPos',myScrollPos)
  }

  function chnageTab(n) {
    scrollWrap.hide().eq(n).show()
    scrollWrap.removeClass('is_active').eq(n).addClass('is_active');
    scrollArea.scrollTop(0)
    getTop(n)
    scrollIdx = n;
    tabCont.each(function () {
      this.btns.removeClass('is_active').eq(0).addClass('is_active')
      this.cont.stop().scrollLeft(0)
    })
  } 
  tabBtns.on('click',function () {
    chnageTab($(this).index())
    return;
  });
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



var btnScroll = null
$(function(){
  layerOpenSetting(); // layer btn search
  console.log('!')

  $.tab();
  btnScroll = $.btnScroll();

  $.accordion();
});



