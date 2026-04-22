"use strict";

(function ($) {
    var NAVBAR_SCROLL_OFFSET = 50;
    var HEADER_SMALL_CLASS = "navbar-small";
    var COLLAPSED_CLASS = "collapsed";
    var ACTIVE_CLASS = "active";

    function toggleSmallNavbar() {
        var scrollTop = $(window).scrollTop();
        var headerHeight = $("#header").height() || 0;

        $("#header").toggleClass(HEADER_SMALL_CLASS, scrollTop >= headerHeight);
    }

    function animateContentOnViewport() {
        $('[data-scrollview="true"]').each(function () {
            var $section = $(this);
            var watcher = scrollMonitor.create($section, -20);

            watcher.enterViewport(function () {
                $section.find("[data-animation=true]").each(function () {
                    var $element = $(this);
                    var animationType = $element.attr("data-animation-type");

                    if ($element.hasClass("contentAnimated")) {
                        return;
                    }

                    if (animationType === "number") {
                        var finalNumber = parseInt($element.attr("data-final-number"), 10) || 0;

                        $({ animateNumber: 0 }).animate(
                            { animateNumber: finalNumber },
                            {
                                duration: 1000,
                                easing: "swing",
                                step: function () {
                                    var current = Math.ceil(this.animateNumber)
                                        .toString()
                                        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

                                    $element.text(current).addClass("contentAnimated");
                                }
                            }
                        );

                        return;
                    }

                    $element.addClass(animationType + " contentAnimated");
                    setTimeout(function () {
                        $element.addClass("finishAnimated");
                    }, 1500);
                });
            });
        });
    }

    function bindSmoothScroll() {
        $("[data-click=scroll-to-target]").on("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            var targetSelector = $(this).attr("href");
            var $target = $(targetSelector);

            if (!$target.length) {
                return;
            }

            $("html, body").animate({
                scrollTop: $target.offset().top - NAVBAR_SCROLL_OFFSET
            }, 500);
        });
    }

    function bindThemeSwitcher() {
        $('[data-click="theme-settings-expand"]').on("click", function () {
            $(".theme-settings").toggleClass(ACTIVE_CLASS);
        });

        $(".theme-list [data-theme]").on("click", function () {
            var themePath = "css/color/" + $(this).attr("data-theme") + ".css";
            $("#theme").attr("href", themePath);

            $(".theme-list [data-theme]").not(this).closest("li").removeClass(ACTIVE_CLASS);
            $(this).closest("li").addClass(ACTIVE_CLASS);
        });
    }


    function bindDarkModeSwitch() {
        var body = $("body");
        var switchSelector = "#dark-mode-switch";
        var storageKey = "mx-dark-mode";
        var savedPreference = localStorage.getItem(storageKey);
        var isDarkModeEnabled = savedPreference ? savedPreference === "enabled" : false;

        body.toggleClass("dark-mode", isDarkModeEnabled);
        $(switchSelector).prop("checked", isDarkModeEnabled);

        $(document).on("change", switchSelector, function () {
            var enabled = $(this).is(":checked");
            body.toggleClass("dark-mode", enabled);
            localStorage.setItem(storageKey, enabled ? "enabled" : "disabled");
        });
    }

    function bindNavbarToggle() {
        $(document).on("click", ".nav a", function () {
            $(".navbar-collapse").removeClass("in");
            $(".navbar-toggle .fa-bars").show();
            $(".navbar-toggle .fa-close").hide();
            $(".navbar-toggle").addClass(COLLAPSED_CLASS);
        });

        $(document).on("click", ".navbar-toggle." + COLLAPSED_CLASS, function () {
            $(".navbar-toggle .fa-bars").hide();
            $(".navbar-toggle .fa-close").show();
        });
    }

    function bindPortfolioFilter() {
        $(document).on("click", ".filter-button", function () {
            var value = $(this).attr("data-filter");

            $(".filter-button").removeClass(ACTIVE_CLASS);
            $(this).addClass(ACTIVE_CLASS);

            if (value === "all") {
                $(".filter").show(1000);
                return;
            }

            $(".filter").not("." + value).hide(3000);
            $(".filter").filter("." + value).show(3000);
        });
    }

    function bindScrollTopButton() {
        $(window).on("scroll", function () {
            var shouldShow = $(this).scrollTop() >= NAVBAR_SCROLL_OFFSET;
            $("#scroll-to-top").stop(true, true)[shouldShow ? "fadeIn" : "fadeOut"](200);
        });

        $(document).on("click", "#scroll-to-top", function () {
            $("body, html").animate({ scrollTop: 0 }, 500);
        });
    }

    $(window).on("scroll load", toggleSmallNavbar);

    $(document).ready(function () {
        $("#main-container").addClass("in");
        animateContentOnViewport();
        bindSmoothScroll();
        bindThemeSwitcher();
        bindDarkModeSwitch();
        bindNavbarToggle();
        bindPortfolioFilter();
        bindScrollTopButton();
    });
})(jQuery);
