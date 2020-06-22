import $ from "jquery"
import "../scss/main.scss"
import "bootstrap/js/dist/util"

$( document ).ready(function(){
    var button = $(".preloader");
    var span = $(".preloader > span");
    var block_preloader = $(".block-preloader");

    var arr_buttons = $(".button");
    var text = $(".text");

    var info_icon = $(".icon-inform > i");



    function addPreloader(elem, span, block) {
        $(elem).click(function() {

            $(span).addClass("load");

            setTimeout(function() {
                $(span).removeClass("load");

                addBlockToUnderPreloader( block );

            }, 2000);
        });
    }

    addPreloader( button, span, block_preloader );

    function addBlockToUnderPreloader(elem) {

        let createElem = $("<div/>", {
            class: "p-2 mt-4 rounded comment-block",
            text: "Lopem psum dolor sit amet lorem omnes delicata:a vim ne rec abhorreant: afficiend ic. Mel vide integre"
        })

        $(elem).append(createElem);
    }

    function addTextToUnderTabs(text, buttons) {

        $(buttons).click(function() {
           $(text).text($(this).text());
        });

    }

    addTextToUnderTabs( text, arr_buttons );

    function activeInfo(icon) {

        $(icon).click(function(event) {
          //  alert( event.clientX );
            createTooltip( this, this.getBoundingClientRect() );

          //  console.log( this.getBoundingClientRect() );
        });

    }

    function createTooltip(elem, cords) {

        let create_close_tooltip = $("<div/>", {
          class: "close-icon",
          text: "x",
        });

        let icon = $("<img/>", {
           src: "/images/windows.png",
           class: "icon-wondows"
        });

        let text = $("<span/>", {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamnco laboris nisi ut aliquip ex ea commodo consequat",
            class: "tooltip-text",
          });

        let block_left = $("<div/>", {
          class: "block-left p-0",
          append: icon
        });

        let block_right = $("<div/>", {
          class: "block-right",
          prepend: text
        })

        let create_tooltip = $("<div/>", {
            class: "tooltip-block",
            append: [block_right, create_close_tooltip],
            prepend: block_left
        });

        closePopap( create_tooltip, create_close_tooltip );

        $(".tooltip-block").length ? false : $(".icon-inform").prepend(create_tooltip);

        let left = 87;

        if(cords.left + create_tooltip.width() > $(window).width()) {

           left = create_tooltip.width() / 2;

           changePositionTriangle( create_tooltip );
        }

        create_tooltip.css({
             top: cords.top - create_tooltip.height() - 35 + "px",
             left: cords.left - left + "px"
        });

    }

    activeInfo( info_icon );

   function closePopap (elem, close) {

     $(close).click(function() {
        $(elem).remove();
     });

   }

   function changePositionTriangle(tooltipe) {

      $(tooltipe).removeClass("tooltip-block").addClass("update-position-triangle");

   }


   function timerBack() {

     let year = $(".year > span");
     let mount = $(".mount > span");
     let day = $(".day > span");

     let hours = $(".hours > span");
     let minute = $(".minute > span");
     let second = $(".seconds > span");

     let end_date = {
         "full_year": "2020",
         "month": "09",
         "day": "01",
         "hours": "00",
         "minutes": "00",
         "seconds": "00"
     }

     let end_date_str = `${end_date.full_year}-${end_date.month}-${end_date.day}T${end_date.hours}:${end_date.minutes}:${end_date.seconds}`;

     timer = setInterval(function () {
         let now = new Date();
         let date = new Date(end_date_str);
         let ms_left = diffSubtract(now, date);

         if (ms_left <= 0) {

             clearInterval(timer);
             alert("Time was end");

         } else {

             let res = new Date(ms_left);

             $(year).text(`${res.getUTCFullYear() - 1970}`);
             $(mount).text(`${res.getUTCMonth()}`);
             $(day).text(`${res.getUTCDate() - 1}`);

             $(hours).text(`${res.getUTCHours()}`);
             $(minute).text(`${res.getUTCMinutes()}`);
             $(second).text(`${res.getUTCSeconds()}`);

         }
     }, 1000);

   }

   timerBack();


   function diffSubtract(date1, date2) {
       return date2 - date1;
   }


});
