# jquery.squirrel-scroll

Simple 'JQuery follow scroll' implementation that keeps your content visible without using distracting animations.

production demo: http://rocoh.com.br/stocks/bovespa-petr4

## Usage

Call the setup method on the element you want allways visible:

`$('.element-to-be-always-visible').squirrelScroll();`

You can also specify the content offset:

`$('.element-to-be-always-visible').squirrelScroll({bottomOffset: 20, topOffset: 20});`

## Browser compatibility

IE8+, Chrome, Firefox, Safari and Opera.

## To Do

* iPad support;
* unit testing;