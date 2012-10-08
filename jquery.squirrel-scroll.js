// Usage: $('.element-to-be-always-visible').squirrelScroll();
//
// Options:
// Usage: $('.element-to-be-always-visible').squirrelScroll({topOffset: 20, bottomOffset: 20});
//
// author: Paulo Ragonha
// see: https://github.com/pirelenito/jquery.squirrel-scroll

(function() {

  $.fn.squirrelScroll = function(options) {
    var $content, $window, fixedOn, previousScroll, topOffset, update;
    $content = $(this);
    $window = $(window);

    $content.css('position', 'absolute');

    previousScroll = 0;
    fixedOn = 'none';

    options = options || {};
    topOffset = options.topOffset || $content.offset().top;
    bottomOffset = options.bottomOffset || 0;

    function isContentSmallerThanWindow () {
      return $content.height() <= ($window.height() - topOffset);
    }

    function isContentsTopHidden () {
      return ($window.scrollTop() + topOffset) < $content.offset().top;
    }

    function isContentsBottonHidden () {
      return ($window.scrollTop() + $window.height()) > ($content.offset().top + $content.height() + bottomOffset);
    }

    function isContentFixedAndScrolling () {
      var scrollDelta;
      scrollDelta = $window.scrollTop() - previousScroll;
      previousScroll = $window.scrollTop();

      return fixedOn === 'top' && scrollDelta > 0 || fixedOn === 'bottom' && scrollDelta < 0;
    }

    function fixContentOnTop () {
      $content.css({
        position: 'fixed',
        top: topOffset,
        bottom: ''
      });
      return fixedOn = 'top';
    }

    function fixContentOnBottom () {
      $content.css({
        position: 'fixed',
        top: '',
        bottom: bottomOffset
      });
      return fixedOn = 'bottom';
    }

    function leaveContentOnAbsolutePosition () {
      $content.css({
        position: 'absolute',
        top: $content.offset().top,
        bottom: ''
      });
      return fixedOn = 'none';
    }

    function update () {
      if (isContentSmallerThanWindow()) { return fixContentOnTop(); }
      if (isContentFixedAndScrolling()) { return leaveContentOnAbsolutePosition() }
      if (isContentsTopHidden()) { return fixContentOnTop(); }
      if (isContentsBottonHidden()) { return fixContentOnBottom(); }
    }

    $window.scroll(update);
  };

}).call(this);
