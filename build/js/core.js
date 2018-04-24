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
 * DEFAULT
 *  order : 判断是有序预加载还是无序预加载
 *  each  : 加载完一张之后的回调函数
 *  all   : 全部都加载完之后的回调函数
 * 
 * 1.有序预加载
 *  $.preload(imgs,{
 *    order:"ordered"
 *  })
 * 
 * 2.无序预加载
 *  $.preload(imgs,{
 *    order:"unordered"
 *  })
 * 
 */

(function($) {

  function PreLoad(imgs, options) {
    this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
    this.opts = $.extend({}, PreLoad.DEFAULT, options);
    if (this.opts.order === "ordered") {
      this._ordered()
    } else {
      this._unordered()
    }
  }

  PreLoad.DEFAULT = {
    each: null, // 每一个加载完之后
    all: null, // 所有的都加载好之后
    order: "unordered" //无序预加载
  }

  PreLoad.prototype._ordered = function() {
    var imgs = this.imgs,
      opts = this.opts,
      count = 0,
      len = imgs.length;
    load()
      // 有序预加载
    function load() {
      var imgObj = new Image();
      $(imgObj).on("load error", function() {
        opts.each && opts.each(count)
        if (count >= len) {
          // 所有图片已经加载完
          opts.all && opts.all()
        } else {
          load()
        }
        count++
      })
      imgObj.src = imgs[count]
    }
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
          opts.all && opts.all()
        }
        count++;
      })
      imgObj.src = src
    })
  }

  $.extend({
    preload: function(imgs, opts) {
      return new PreLoad(imgs, opts)
    }
  })

})(jQuery)