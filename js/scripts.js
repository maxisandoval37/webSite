"use strict";
($(window).on("scroll load", function () {
  var t = $(window).scrollTop(),
    a = $("#header").height();
  t >= a
    ? $("#header").addClass("navbar-small")
    : $("#header").removeClass("navbar-small");
}),
  $(document).ready(function () {
    ($("#main-container").addClass("in"),
      $('[data-scrollview="true"]').each(function () {
        var t = $(this),
          a = scrollMonitor.create(t, -20);
        a.enterViewport(function () {
          $(t)
            .find("[data-animation=true]")
            .each(function () {
              var t = $(this).attr("data-animation-type"),
                a = $(this);
              if (!$(a).hasClass("contentAnimated"))
                if ("number" == t) {
                  var e = parseInt($(a).attr("data-final-number")),
                    n = function (t) {
                      return t
                        .toString()
                        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                    };
                  $({
                    animateNumber: 0,
                  }).animate(
                    {
                      animateNumber: e,
                    },
                    {
                      duration: 1e3,
                      easing: "swing",
                      step: function () {
                        var t = n(Math.ceil(this.animateNumber));
                        $(a).text(t).addClass("contentAnimated");
                      },
                    },
                  );
                } else
                  ($(this).addClass(t + " contentAnimated"),
                    setTimeout(function () {
                      $(a).addClass("finishAnimated");
                    }, 1500));
            });
        });
      }),
      $("[data-click=scroll-to-target]").on("click", function (t) {
        (t.preventDefault(), t.stopPropagation());
        var a = $(this).attr("href"),
          e = 50;
        $("html, body").animate(
          {
            scrollTop: $(a).offset().top - e,
          },
          500,
        );
      }),
      $('[data-click="theme-settings-expand"]').on("click", function () {
        var t = ".theme-settings",
          a = "active";
        $(t).hasClass(a) ? $(t).removeClass(a) : $(t).addClass(a);
      }),
      $(".theme-list [data-theme]").on("click", function () {
        var t = "css/color/" + $(this).attr("data-theme") + ".css";
        ($("#theme").attr("href", t),
          $(".theme-list [data-theme]")
            .not(this)
            .closest("li")
            .removeClass("active"),
          $(this).closest("li").addClass("active"));
      }));
  }));
const syncNavbarToggleState = function () {
  const isMobileMenuOpen = $("#header-navbar").hasClass("in");
  $(".navbar-toggle").toggleClass("collapsed", !isMobileMenuOpen);
};

$(document).on("click", ".nav a", function () {
  $("#header-navbar").collapse("hide");
});

$("#header-navbar").on("shown.bs.collapse hidden.bs.collapse", function () {
  syncNavbarToggleState();
});

$(window).on("resize", function () {
  syncNavbarToggleState();
});

syncNavbarToggleState();
$(document).on("click", ".filter-button", function () {
  var value = $(this).attr("data-filter");

  if ($(".filter-button").removeClass("active")) {
    $(this).removeClass("active");
  }
  $(this).addClass("active");

  if (value == "all") {
    $(".filter").show("1000");
  } else {
    $(".filter")
      .not("." + value)
      .hide("3000");
    $(".filter")
      .filter("." + value)
      .show("3000");
  }
});

$(window).scroll(function () {
  if ($(this).scrollTop() >= 50) {
    $("#scroll-to-top").fadeIn(200);
  } else {
    $("#scroll-to-top").fadeOut(200);
  }
});
$(document).on("click", "#scroll-to-top", function () {
  $("body,html").animate(
    {
      scrollTop: 0,
    },
    500,
  );
});

let body = $("body");
let switchSelector = "#dark-mode-switch";
let storageKey = "mx-dark-mode";
let savedPreference = localStorage.getItem(storageKey);
let isDarkModeEnabled = savedPreference ? savedPreference === "enabled" : false;

body.toggleClass("dark-mode", isDarkModeEnabled);
$(switchSelector).prop("checked", isDarkModeEnabled);

$(document).on("change", switchSelector, function () {
  let enabled = $(this).is(":checked");
  body.toggleClass("dark-mode", enabled);
  localStorage.setItem(storageKey, enabled ? "enabled" : "disabled");
});
