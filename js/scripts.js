"use strict";
$(window).on("scroll load", function () {
    var t = $(window).scrollTop(),
            a = $("#header").height();
    t >= a ? $("#header").addClass("navbar-small") : $("#header").removeClass("navbar-small")
}), $(document).ready(function () {
    $("#main-container").addClass("in"), $('[data-scrollview="true"]').each(function () {
        var t = $(this),
                a = scrollMonitor.create(t, -20);
        a.enterViewport(function () {
            $(t).find("[data-animation=true]").each(function () {
                var t = $(this).attr("data-animation-type"),
                        a = $(this);
                if (!$(a).hasClass("contentAnimated"))
                    if ("number" == t) {
                        var e = parseInt($(a).attr("data-final-number")),
                                n = function (t) {
                                    return t.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                                };
                        $({
                            animateNumber: 0
                        }).animate({
                            animateNumber: e
                        }, {
                            duration: 1e3,
                            easing: "swing",
                            step: function () {
                                var t = n(Math.ceil(this.animateNumber));
                                $(a).text(t).addClass("contentAnimated")
                            }
                        })
                    } else
                        $(this).addClass(t + " contentAnimated"), setTimeout(function () {
                            $(a).addClass("finishAnimated")
                        }, 1500)
            })
        })
    }), $("[data-click=scroll-to-target]").on("click", function (t) {
        t.preventDefault(), t.stopPropagation();
        var a = $(this).attr("href"),
                e = 50;
        $("html, body").animate({
            scrollTop: $(a).offset().top - e
        }, 500)
    }),
        $('[data-click="theme-settings-expand"]').on("click", function () {
        var t = ".theme-settings",
                a = "active";
        $(t).hasClass(a) ? $(t).removeClass(a) : $(t).addClass(a)
    }), $(".theme-list [data-theme]").on("click", function () {
        var t = "css/color/" + $(this).attr("data-theme") + ".css";
        $("#theme").attr("href", t), $(".theme-list [data-theme]").not(this).closest("li").removeClass("active"), $(this).closest("li").addClass("active")
    })

});
$(document).on('click', '.nav a', function () {
    $('.navbar-collapse').removeClass('in');
    $('.navbar-toggle .fa-bars').css('display', 'block');
    $('.navbar-toggle .fa-close').css('display', 'none');
    $('.navbar-toggle').addClass('collapsed');
});
$(document).on('click', '.navbar-toggle.collapsed', function () {
    $('.navbar-toggle .fa-bars').css('display', 'none');
    $('.navbar-toggle .fa-close').css('display', 'block');
});
$(document).on('click', '.filter-button', function () {
    var value = $(this).attr('data-filter');

    if ($(".filter-button").removeClass("active")) {
        $(this).removeClass("active");
    }
    $(this).addClass("active");

    if (value == "all"){
        $('.filter').show('1000');
    }
    else{
        $(".filter").not('.' + value).hide('3000');
        $('.filter').filter('.' + value).show('3000');

    }
});
$(".popup-img").popupimg({
    openEffect: "none",
    closeEffect: "none"
});

$(document).ready(function () {
    $(document).on('click', '#submit_contact', function () {
        var name = $('#name').val();
        var email = $("#email").val();
        var subject = $("#subject").val();
        var tel = $("#tel").val();
        var message = $("#message").val();

        if (name != '' && email != '' && tel != '' && message != ''){
            $.ajax({
                url: "send_mail_contact.php",
                method: "POST",
                data: $('#contact-form').serialize(),
                success: function (data) {
                    $(".successmsg").show().delay(5000).fadeOut();
                    $("#contact-form")[0].reset();
                }
            });
        }
    });
});
function KeycheckOnlyNumeric(e){
    var _dom = 0;
    _dom = document.all ? 3 : (document.getElementById ? 1 : (document.layers ? 2 : 0));
    if (document.all)
        e = window.event;
    var ch = '';
    var KeyID = '';
    if (_dom == 2) {
        if (e.which > 0)
            ch = '(' + String.fromCharCode(e.which) + ')';
        KeyID = e.which;
    }
    else{
        if (_dom == 3) {
            KeyID = (window.event) ? event.keyCode : e.which;
        }
        else {
            if (e.charCode > 0)
                ch = '(' + String.fromCharCode(e.charCode) + ')';
            KeyID = e.charCode;
        }
    }
    if ((KeyID >= 65 && KeyID <= 90) || (KeyID >= 97 && KeyID <= 122) || (KeyID >= 33 && KeyID <= 47) || (KeyID >= 58 && KeyID <= 64) || (KeyID >= 91 && KeyID <= 96) || (KeyID >= 123 && KeyID <= 126) || (KeyID == 32)){
        return false;
    }
    return true;
}
$(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {
        $('#scroll-to-top').fadeIn(200);
    } else {
        $('#scroll-to-top').fadeOut(200);
    }
});
$(document).on('click', '#scroll-to-top', function () {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
});