/**
 * 图片预加载的核心js代码
 * 
 * @description 基于jQuery的图片预加载
 * 
 * @author Chunbao Tsai
 * @email vipcaichunbao@163.com
 * @date 2018年 1月16日 星期二 01时19分59秒 CST
 */


/**
 * 1.有序预加载
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 2.无序预加载
 * 
 * 
 * 
 * 
 */

(function($) {

  function PreLoad(imgs, options) {
    this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
    this.opts = $.extend({}, PreLoad.DEFAULT, options);
    this._unordered()
  }

  PreLoad.prototype._unordered = function() {
    var imgs = this.imgs,
      opts = this.opts,
      count = 0,
      len = imgs.length;

    $.each(imgs, function(i, src) {

      if (typeof src != 'string') return

      var imgObj = new Image();

      $(imgObj).on("load error", function() {

        opts.each && opts.each(count);

        if (count >= len - 1) {
          $(".loading").hide();
          opts.all && opts.all()
        }

        count++;
      })
      imgObj.src = src
    })
  }

  PreLoad.DEFAULT = {
    each: null,
    all: null
  }

  $.extend({
    preload: function(imgs, opts) {
      return new PreLoad(imgs, opts)
    }
  })



})(jQuery)