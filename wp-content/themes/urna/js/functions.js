'use strict';

/**
 * @preserve
 * Project: Bootstrap Hover Dropdown
 * Author: Cameron Spear
 * Version: v2.2.1
 * Contributors: Mattia Larentis
 * Dependencies: Bootstrap's Dropdown plugin, jQuery
 * Description: A simple plugin to enable Bootstrap dropdowns to active on hover and provide a nice user experience.
 * License: MIT
 * Homepage: http://cameronspear.com/blog/bootstrap-dropdown-on-hover-plugin/
 */
(function ($, window, undefined$1) {
    var $allDropdowns = $();
    $.fn.dropdownHover = function (options) {
        if('ontouchstart' in document) return this;
        $allDropdowns = $allDropdowns.add(this.parent());
        return this.each(function () {
            var $this = $(this),
                $parent = $this.parent(),
                defaults = {
                    delay: 500,
                    hoverDelay: 0,
                    instantlyCloseOthers: true
                },
                data = {
                    delay: $(this).data('delay'),
                    hoverDelay: $(this).data('hover-delay'),
                    instantlyCloseOthers: $(this).data('close-others')
                },
                showEvent   = 'show.bs.dropdown',
                hideEvent   = 'hide.bs.dropdown',
                settings = $.extend(true, {}, defaults, options, data),
                timeout, timeoutHover;
            $parent.hover(function (event) {
                if(!$parent.hasClass('open') && !$this.is(event.target)) {
                    return true;
                }
                openDropdown();
            }, function () {
                window.clearTimeout(timeoutHover);
                timeout = window.setTimeout(function () {
                    $this.attr('aria-expanded', 'false');
                    $parent.removeClass('open');
                    $this.trigger(hideEvent);
                }, settings.delay);
            });
            $this.hover(function (event) {
                if(!$parent.hasClass('open') && !$parent.is(event.target)) {
                    return true;
                }
                openDropdown();
            });
            $parent.find('.dropdown-submenu').each(function (){
                var $this = $(this);
                var subTimeout;
                $this.hover(function () {
                    window.clearTimeout(subTimeout);
                    $this.children('.dropdown-menu').show();
                    $this.siblings().children('.dropdown-menu').hide();
                }, function () {
                    var $submenu = $this.children('.dropdown-menu');
                    subTimeout = window.setTimeout(function () {
                        $submenu.hide();
                    }, settings.delay);
                });
            });
            function openDropdown(event) {
                if($this.parents(".navbar").find(".navbar-toggle").is(":visible")) {
                    return;
                }
                window.clearTimeout(timeout);
                window.clearTimeout(timeoutHover);
                timeoutHover = window.setTimeout(function () {
                    $allDropdowns.find(':focus').blur();
                    if(settings.instantlyCloseOthers === true)
                        $allDropdowns.removeClass('open');
                    window.clearTimeout(timeoutHover);
                    $this.attr('aria-expanded', 'true');
                    $parent.addClass('open');
                    $this.trigger(showEvent);
                }, settings.hoverDelay);
            }
        });
    };
    $(document).ready(function () {
        $('[data-hover="dropdown"]').dropdownHover();
    });
})(jQuery, window);

class StickyHeader {
  constructor() {
    if (jQuery('#tbay-header').length === 0 && jQuery('#tbay-customize-header').length === 0) return;

    if (jQuery('#tbay-header').length > 0) {
      this.tbayHeader = jQuery('#tbay-header');
      this.tbayHeaderMain = jQuery('#tbay-header .header-main');
    }

    if (jQuery('#tbay-customize-header').length > 0) {
      this.tbayHeader = jQuery('#tbay-customize-header');
      this.tbayHeaderMain = jQuery('#tbay-customize-header .header-main');
    }

    if (this.tbayHeader.hasClass('main-sticky-header') && this.tbayHeaderMain.length > 0) {
      this._initStickyHeader();
    }

    jQuery('.search-min-wrapper .btn-search-min').click(this._onClickSeachMin);
    jQuery('.tbay-search-form .overlay-box').click(this._onClickOverLayBox);
    this._intSearchOffcanvas;
    let sticky_header = jQuery('.element-sticky-header');

    if (sticky_header.length > 0) {
      this._initELementStickyheader(sticky_header);
    }
  }

  _initStickyHeader() {
    var _this = this;

    var tbay_width = jQuery(window).width();

    var header_height = _this.tbayHeader.outerHeight();

    var headerMain_height = _this.tbayHeaderMain.outerHeight();

    var admin_height = jQuery('#wpadminbar').length > 0 ? jQuery('#wpadminbar').outerHeight() : 0;

    var sticky = _this.tbayHeaderMain.offset().top;

    if (tbay_width >= 1024) {
      if (sticky == 0 || sticky == admin_height) {
        if (_this.tbayHeader.hasClass('sticky-header')) return;

        _this._stickyHeaderOnDesktop(headerMain_height, sticky, admin_height);

        _this.tbayHeaderMain.addClass('sticky-1');

        jQuery(window).scroll(function () {
          if (jQuery(this).scrollTop() > header_height) {
            _this.tbayHeaderMain.addClass('sticky-box');
          } else {
            _this.tbayHeaderMain.removeClass('sticky-box');
          }
        });
      } else {
        jQuery(window).scroll(function () {
          if (!_this.tbayHeader.hasClass('main-sticky-header')) return;

          if (jQuery(this).scrollTop() > sticky - admin_height) {
            if (_this.tbayHeader.hasClass('sticky-header')) return;

            _this._stickyHeaderOnDesktop(headerMain_height, sticky, admin_height);
          } else {
            _this.tbayHeaderMain.css("top", 0).css("position", "relative").removeClass('sticky-header').parent().css('padding-top', 0);

            _this.tbayHeaderMain.prev().css('margin-bottom', 0);
          }
        });
      }
    }
  }

  _stickyHeaderOnDesktop(headerMain_height, sticky, admin_height) {
    this.tbayHeaderMain.addClass('sticky-header').css("top", admin_height).css("position", "fixed");

    if (sticky == 0 || sticky == admin_height) {
      this.tbayHeaderMain.parent().css('padding-top', headerMain_height);
    } else {
      this.tbayHeaderMain.prev().css('margin-bottom', headerMain_height);
    }
  }

  _onClickSeachMin() {
    jQuery('.tbay-search-form.tbay-search-min form').toggleClass('show');
    jQuery(this).toggleClass('active');
  }

  _onClickOverLayBox() {
    jQuery('.search-min-wrapper .btn-search-min').removeClass('active');
    jQuery('.tbay-search-form.tbay-search-min form').removeClass('show');
  }

  _intSearchOffcanvas() {
    jQuery('[data-toggle="offcanvas-main-search"]').on('click', function () {
      jQuery('#wrapper-container').toggleClass('show');
      jQuery('#tbay-offcanvas-main').toggleClass('show');
    });
    let box_totop = jQuery('#tbay-offcanvas-main, .search');
    jQuery(window).on("click.Bst", function (event) {
      if (box_totop.has(event.target).length == 0 && !box_totop.is(event.target)) {
        jQuery('#wrapper-container').removeClass('show');
        jQuery('#tbay-offcanvas-main').removeClass('show');
      }
    });
  }

  _initELementStickyheader(elements) {
    var el = elements.first();

    let _this = this;

    var scroll = false,
        sum = 0,
        prev_sum = 0;
    if (el.parents('.tbay_header-template').length === 0) return;
    var adminbar = jQuery('#wpadminbar').length > 0 ? jQuery('#wpadminbar').outerHeight() : 0,
        sticky_load = el.offset().top - jQuery(window).scrollTop() - adminbar,
        sticky = sticky_load;
    el.prevAll().each(function () {
      prev_sum += jQuery(this).outerHeight();
    });
    elements.each(function () {
      if (jQuery(this).parents('.element-sticky-header').length > 0) return;
      sum += jQuery(this).outerHeight();
    });

    _this._initELementStickyheaderContent(sticky_load, sticky, sum, prev_sum, elements, el, adminbar, scroll);

    jQuery(window).scroll(function () {
      scroll = true;
      if (jQuery(window).scrollTop() === 0) sticky = 0;

      _this._initELementStickyheaderContent(sticky_load, sticky, sum, prev_sum, elements, el, adminbar, scroll);
    });
  }

  _initELementStickyheaderContent(sticky_load, sticky, sum, prev_sum, elements, el, adminbar, scroll) {
    if (jQuery(window).scrollTop() < prev_sum && scroll || jQuery(window).scrollTop() === 0 && scroll) {
      if (el.parent().children().first().hasClass('element-sticky-header')) return;
      el.css('top', '');

      if (sticky === sticky_load || sticky === 0) {
        elements.last().next().css('padding-top', '');
      } else {
        el.prev().css('margin-bottom', '');
      }

      el.parent().css('padding-top', '');
      elements.each(function () {
        jQuery(this).removeClass("sticky");

        if (jQuery(this).prev('.element-sticky-header').length > 0) {
          jQuery(this).css('top', '');
        }
      });
    } else {
      if (jQuery(window).scrollTop() < prev_sum && !scroll) return;
      elements.each(function () {
        if (jQuery(this).parents('.element-sticky-header').length > 0) return;
        jQuery(this).addClass("sticky");

        if (jQuery(this).prevAll('.element-sticky-header').length > 0) {
          let total = 0;
          jQuery(this).prevAll('.element-sticky-header').each(function () {
            total += jQuery(this).outerHeight();
          });
          jQuery(this).css('top', total + adminbar);
        }
      });
      el.css('top', adminbar);

      if (sticky === sticky_load || sticky === 0) {
        el.addClass("sticky");
        el.parent().css('padding-top', sum);
      } else {
        el.prev().css('margin-bottom', sum);
      }
    }
  }

}

const TREE_VIEW_OPTION_MEGA_MENU = {
  animated: 300,
  collapsed: true,
  unique: true,
  persist: "location"
};
const TREE_VIEW_OPTION_MOBILE_MENU = {
  animated: 300,
  collapsed: true,
  unique: true,
  hover: false
};
const DEVICE = {
  ANDROID: /Android/i,
  BLACK_BERRY: /BlackBerry/i,
  IOS: /iPhone|iPad|iPod/i,
  OPERA: /Opera Mini/i,
  WINDOW: /IEMobile/i,
  ANY: /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
};

(function ($) {
  jQuery.extend(jQuery.fn, {
    swapClass: function (c1, c2) {
      var c1Elements = this.filter('.' + c1);
      this.filter('.' + c2).removeClass(c2).addClass(c1);
      c1Elements.removeClass(c1).addClass(c2);
      return this;
    },
    replaceClass: function (c1, c2) {
      return this.filter('.' + c1).removeClass(c1).addClass(c2).end();
    },
    hoverClass: function (className) {
      className = className || "hover";
      return this.hover(function () {
        $(this).addClass(className);
      }, function () {
        $(this).removeClass(className);
      });
    },
    heightToggle: function (animated, callback) {
      animated ? this.animate({
        height: "toggle"
      }, animated, callback) : this.each(function () {
        jQuery(this)[jQuery(this).is(":hidden") ? "show" : "hide"]();
        if (callback) callback.apply(this, arguments);
      });
    },
    heightHide: function (animated, callback) {
      if (animated) {
        this.animate({
          height: "hide"
        }, animated, callback);
      } else {
        this.hide();
        if (callback) this.each(callback);
      }
    },
    prepareBranches: function (settings) {
      if (!settings.prerendered) {
        this.filter(":last-child:not(ul)").addClass(CLASSES.last);
        this.filter((settings.collapsed ? "" : "." + CLASSES.closed) + ":not(." + CLASSES.open + ")").find(">ul").hide();
      }

      return this.filter(":has(>ul),:has(>.dropdown-menu)");
    },
    applyClasses: function (settings, toggler) {
      this.filter(":has(>ul):not(:has(>a))").find(">span").click(function (event) {
        toggler.apply($(this).next());
      }).add($("a", this)).hoverClass();

      if (!settings.prerendered) {
        this.filter(":has(>ul:hidden),:has(>.dropdown-menu:hidden)").addClass(CLASSES.expandable).replaceClass(CLASSES.last, CLASSES.lastExpandable);
        this.not(":has(>ul:hidden),:has(>.dropdown-menu:hidden)").addClass(CLASSES.collapsable).replaceClass(CLASSES.last, CLASSES.lastCollapsable);
        this.prepend("<div class=\"" + CLASSES.hitarea + "\"/>").find("div." + CLASSES.hitarea).each(function () {
          var classes = "";
          jQuery.each($(this).parent().attr("class").split(" "), function () {
            classes += this + "-hitarea ";
          });
          $(this).addClass(classes);
        });
      }

      this.find("div." + CLASSES.hitarea).click(toggler);
    },
    treeview: function (settings) {
      settings = jQuery.extend({
        cookieId: "treeview"
      }, settings);

      if (settings.add) {
        return this.trigger("add", [settings.add]);
      }

      if (settings.toggle) {
        var callback = settings.toggle;

        settings.toggle = function () {
          return callback.apply($(this).parent()[0], arguments);
        };
      }

      function treeController(tree, control) {
        function handler(filter) {
          return function () {
            toggler.apply($("div." + CLASSES.hitarea, tree).filter(function () {
              return filter ? $(this).parent("." + filter).length : true;
            }));
            return false;
          };
        }

        $("a:eq(0)", control).click(handler(CLASSES.collapsable));
        $("a:eq(1)", control).click(handler(CLASSES.expandable));
        $("a:eq(2)", control).click(handler());
      }

      function toggler() {
        $(this).parent().find(">.hitarea").swapClass(CLASSES.collapsableHitarea, CLASSES.expandableHitarea).swapClass(CLASSES.lastCollapsableHitarea, CLASSES.lastExpandableHitarea).end().swapClass(CLASSES.collapsable, CLASSES.expandable).swapClass(CLASSES.lastCollapsable, CLASSES.lastExpandable).find(">ul,>.dropdown-menu").heightToggle(settings.animated, settings.toggle);

        if (settings.unique) {
          $(this).parent().siblings().find(">.hitarea").replaceClass(CLASSES.collapsableHitarea, CLASSES.expandableHitarea).replaceClass(CLASSES.lastCollapsableHitarea, CLASSES.lastExpandableHitarea).end().replaceClass(CLASSES.collapsable, CLASSES.expandable).replaceClass(CLASSES.lastCollapsable, CLASSES.lastExpandable).find(">ul,>.dropdown-menu").heightHide(settings.animated, settings.toggle);
        }
      }

      function serialize() {

        var data = [];
        branches.each(function (i, e) {
          data[i] = $(e).is(":has(>ul:visible)") ? 1 : 0;
        });
        jQuery.cookie(settings.cookieId, data.join(""));
      }

      function deserialize() {
        var stored = jQuery.cookie(settings.cookieId);

        if (stored) {
          var data = stored.split("");
          branches.each(function (i, e) {
            $(e).find(">ul")[parseInt(data[i]) ? "show" : "hide"]();
          });
        }
      }

      this.addClass("treeview");
      var branches = this.find("li").prepareBranches(settings);

      switch (settings.persist) {
        case "cookie":
          var toggleCallback = settings.toggle;

          settings.toggle = function () {
            serialize();

            if (toggleCallback) {
              toggleCallback.apply(this, arguments);
            }
          };

          deserialize();
          break;

        case "location":
          var current = this.find("a").filter(function () {
            return this.href.toLowerCase() == location.href.toLowerCase();
          });

          if (current.length) {
            current.addClass("selected").parents("ul, li").add(current.next()).show();
          }

          break;
      }

      branches.applyClasses(settings, toggler);

      if (settings.control) {
        treeController(this, settings.control);
        $(settings.control).show();
      }

      return this.bind("add", function (event, branches) {
        $(branches).prev().removeClass(CLASSES.last).removeClass(CLASSES.lastCollapsable).removeClass(CLASSES.lastExpandable).find(">.hitarea").removeClass(CLASSES.lastCollapsableHitarea).removeClass(CLASSES.lastExpandableHitarea);
        $(branches).find("li").andSelf().prepareBranches(settings).applyClasses(settings, toggler);
      });
    }
  });
  var CLASSES = jQuery.fn.treeview.classes = {
    open: "open",
    closed: "closed",
    expandable: "expandable",
    expandableHitarea: "expandable-hitarea",
    lastExpandableHitarea: "lastExpandable-hitarea",
    collapsable: "collapsable",
    collapsableHitarea: "collapsable-hitarea",
    lastCollapsableHitarea: "lastCollapsable-hitarea",
    lastCollapsable: "lastCollapsable",
    lastExpandable: "lastExpandable",
    last: "last",
    hitarea: "hitarea"
  };
  jQuery.fn.Treeview = jQuery.fn.treeview;
})(jQuery);

let tbaysetCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
};
let tbaygetCookie = cname => {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
};
let isDevice = device => {
  navigator.userAgent.match(device);
};

class Mobile {
  constructor() {
    this._topBarDevice();

    this._fixVCAnimation();

    this._mobileMenu();

    this._SidebarShopMobile();

    this._SearchFocusActive();

    this._SearchOnClickSearchHeader();

    this._PopupLoginMobile();

    this._Select_change_form();

    jQuery(window).scroll(() => {
      this._topBarDevice();

      this._fixVCAnimation();
    });
  }

  _topBarDevice() {
    var scroll = jQuery(window).scrollTop();
    var objectSelect = jQuery(".topbar-device-mobile").height();
    var scrollmobile = jQuery(window).scrollTop();
    jQuery(".topbar-device-mobile").toggleClass("active", scroll <= objectSelect);
    jQuery("#tbay-mobile-menu").toggleClass("offsetop", scrollmobile == 0);
  }

  _fixVCAnimation() {
    if (jQuery(".wpb_animate_when_almost_visible").length > 0 && !jQuery(".wpb_animate_when_almost_visible").hasClass('wpb_start_animation')) {
      let animate_height = jQuery(window).height();
      let wpb_not_animation_element = jQuery(".wpb_animate_when_almost_visible:not(.wpb_start_animation)");
      var next_scroll = wpb_not_animation_element.offset().top - jQuery(window).scrollTop();

      if (isDevice(DEVICE.ANY)) {
        wpb_not_animation_element.removeClass('wpb_animate_when_almost_visible');
      } else if (next_scroll < animate_height - 50) {
        wpb_not_animation_element.addClass("wpb_start_animation animated");
      }
    }
  }

  _mobileMenu() {
    jQuery('[data-toggle="offcanvas"], .btn-offcanvas').click(function () {
      jQuery('#wrapper-container').toggleClass('active');
      jQuery('#tbay-mobile-menu').toggleClass('active');
    });
    jQuery("#main-mobile-menu .caret").click(function () {
      jQuery("#main-mobile-menu .dropdown").removeClass('open');
      jQuery(event.target).parent().addClass('open');
    });
  }

  _SidebarShopMobile() {
    let btn_filter = jQuery(".button-filter-mobile"),
        btn_close = jQuery(".filter-mobile .close");
    btn_filter.on("click", function (e) {
      jQuery('.filter-mobile').addClass('active');
      jQuery("body").addClass('filter-mobile-active');
    });
    btn_close.on("click", function (e) {
      jQuery('.filter-mobile').removeClass('active');
      jQuery("body").removeClass('filter-mobile-active');
    });
    let win_canvas = jQuery(window);
    let box_canvas = jQuery('.filter-mobile .content, .button-filter-mobile, .filter-mobile .close');
    win_canvas.on("click.Bst,click touchstart tap", event => {
      if (!jQuery('.filter-mobile').hasClass('active')) return;

      if (box_canvas.has(event.target).length == 0 && !box_canvas.is(event.target)) {
        jQuery('.filter-mobile').removeClass('active');
        jQuery("body").removeClass('filter-mobile-active');
      }
    });
  }

  _SearchFocusActive() {
    let search_mobile = jQuery('.tbay-search-mobile .tbay-search');
    let search_cancel = jQuery('.tbay-search-mobile .button-search-cancel');
    search_mobile.focusin(function () {
      jQuery(search_mobile.parents('#tbay-mobile-menu-navbar')).addClass('search-mobile-focus');
      search_mobile.parent().find('.button-search-cancel').addClass('cancel-active');
    });
    search_cancel.on("click", function () {
      jQuery(search_cancel.parents('#tbay-mobile-menu-navbar')).removeClass('search-mobile-focus');
      search_cancel.removeClass('cancel-active');
    });
  }

  _SearchOnClickSearchHeader() {
    let search_mobile = jQuery('.search-device .search-icon');
    let search_cancel = jQuery('.search-device .button-search-cancel');
    search_mobile.on("click", function () {
      jQuery(search_mobile.parent()).addClass('active-search-mobile');
    });
    search_cancel.on("click", function () {
      jQuery(search_cancel.parents('.search-device')).removeClass('active-search-mobile');
      search_cancel.removeClass('cancel-active');
    });
  }

  _PopupLoginMobile() {
    let popup_login_mobile = jQuery('.mmenu-account .popup-login a, .footer-device-mobile > .device-account > a.popup-login');
    popup_login_mobile.on("click", function () {
      let api = jQuery("#tbay-mobile-menu-navbar").data("mmenu");
      jQuery('#custom-login-wrapper').modal('show');
      jQuery(popup_login_mobile.parents('#tbay-mobile-menu-navbar')).removeClass('mm-menu_opened');
      api.close();
    });
  }

  _Select_change_form() {
    jQuery('.topbar-device-mobile > form select').on('change', function () {
      this.form.submit();
    });
  }

}

class AccountMenu {
  constructor() {
    this._slideToggleAccountMenu(".tbay-login");

    this._slideToggleAccountMenu(".topbar-mobile");

    this._urnaClickNotMyAccountMenu();
  }

  _urnaClickNotMyAccountMenu() {
    let win_my_account = jQuery(window);
    var box_my_account = jQuery('.tbay-login .dropdown .account-menu,.topbar-mobile .dropdown .account-menu,.tbay-login .dropdown .account-button,.topbar-mobile .dropdown .account-button');
    win_my_account.on("click.Bst", function (event) {
      if (box_my_account.has(event.target).length == 0 && !box_my_account.is(event.target)) {
        jQuery(".tbay-login .dropdown .account-menu").slideUp(500);
        jQuery(".topbar-mobile .dropdown .account-menu").slideUp(500);
      }
    });
  }

  _slideToggleAccountMenu(parentSelector) {
    jQuery(parentSelector).find(".dropdown .account-button").click(function () {
      jQuery(parentSelector).find(".dropdown .account-menu").slideToggle(500);
    });
  }

}

class BackToTop {
  constructor() {
    this._init();
  }

  _init() {
    jQuery(window).scroll(function () {
      var isActive = jQuery(this).scrollTop() > 400;

      if (jQuery('.tbay-to-top').length > 0) {
        jQuery('.tbay-to-top').toggleClass('active', isActive);
      }

      if (jQuery('.tbay-category-fixed').length > 0) {
        jQuery('.tbay-category-fixed').toggleClass('active', isActive);
      }
    });

    if (jQuery('#back-to-top-mobile').length > 0 || jQuery('#back-to-top').length > 0) {
      jQuery('#back-to-top-mobile, #back-to-top').click(this._onClickBackToTop);
    }
  }

  _onClickBackToTop() {
    jQuery('html, body').animate({
      scrollTop: '0px'
    }, 800);
  }

}

class CanvasMenu {
  constructor() {
    this._init();

    this._remove_click_Outside();

    this._initCanvasMenuSidebar();

    this._initCanvasMenu();
  }

  _init() {
    jQuery("#tbay-offcanvas-main .btn-toggle-canvas").on("click", function () {
      jQuery('#wrapper-container').removeClass('active');
    });
    jQuery("#main-menu-offcanvas .caret").click(function () {
      jQuery("#main-menu-offcanvas .dropdown").removeClass('open');
      jQuery(this).parent().addClass('open');
      return false;
    });
    jQuery('[data-toggle="offcanvas-main"]').on('click', function () {
      jQuery('#wrapper-container').toggleClass('active');
      jQuery('#tbay-offcanvas-main').toggleClass('active');
    });
  }

  _remove_click_Outside() {
    let win = jQuery(window);
    win.on("click.Bst,click touchstart tap", function (event) {
      let box_popup = jQuery('#tbay-offcanvas-main, .btn-toggle-canvas');

      if (box_popup.has(event.target).length == 0 && !box_popup.is(event.target)) {
        jQuery('#wrapper-container').removeClass('active');
        return;
      }
    });
  }

  _initCanvasMenuSidebar() {
    jQuery(document).on('click', '.canvas-menu-sidebar .btn-canvas-menu', function () {
      jQuery('body').toggleClass('canvas-menu-active');
    });
    jQuery(document).on('click', '.close-canvas-menu, .bg-close-canvas-menu', function () {
      jQuery('body').removeClass('canvas-menu-active');
    });
  }

  _initCanvasMenu() {
    let menu_canvas = jQuery(".element-menu-canvas");
    if (menu_canvas.length === 0) return;
    menu_canvas.each(function () {
      jQuery(this).find('.canvas-menu-btn-wrapper > a').on('click', function (event) {
        jQuery(this).parent().parent().addClass('open');
        event.stopPropagation();
      });
    });
    jQuery(document).on('click', '.canvas-overlay-wrapper', function (event) {
      jQuery(this).parent().removeClass('open');
      event.stopPropagation();
    });
  }

}

class FuncCommon {
  constructor() {
    var _this = this;

    _this._progressAnimation();

    _this._createWrapStart();

    jQuery('.mod-heading .widget-title > span').wrapStart();

    _this._urnaActiveAdminBar();

    _this._urnaResizeMegamenu();

    _this._urnaTooltip();

    _this._initHeaderCoverBG();

    _this._initCanvasSearch();

    _this._initTreeviewMenu();

    _this._categoryMenu();

    _this._initContentMinHeight();

    jQuery(window).scroll(() => {
      _this._urnaActiveAdminBar();
    });
    jQuery(window).on("resize", () => {
      _this._urnaResizeMegamenu();
    });
    setTimeout(function () {
      jQuery(document.body).on('tbay_load_html_click', () => {
        _this._urnaResizeMegamenu();
      });
    }, 2000);

    _this._addAccordionLoginandCoupon();

    _this._initFix_vc_full_width_row();
  }

  _urnaActiveAdminBar() {
    var objectSelect = jQuery("#wpadminbar");

    if (objectSelect.length > 0) {
      jQuery("body").addClass("active-admin-bar");
    }
  }

  _urnaTooltip() {
    if (jQuery.fn.tooltip === undefined) return;
    jQuery('[data-toggle="tooltip"]').tooltip();
  }

  _createWrapStart() {
    jQuery.fn.wrapStart = function () {
      return this.each(function () {
        var $this = jQuery(this);
        var node = $this.contents().filter(function () {
          return this.nodeType == 3;
        }).first(),
            text = node.text().trim(),
            first = text.split(' ', 1).join(" ");
        if (!node.length) return;
        node[0].nodeValue = text.slice(first.length);
        node.before('<b>' + first + '</b>');
      });
    };
  }

  _progressAnimation() {
    jQuery("[data-progress-animation]").each(function () {
      var $this = jQuery(this);
      $this.appear(function () {
        var delay = $this.attr("data-appear-animation-delay") ? $this.attr("data-appear-animation-delay") : 1;
        if (delay > 1) $this.css("animation-delay", delay + "ms");
        setTimeout(function () {
          $this.animate({
            width: $this.attr("data-progress-animation")
          }, 800);
        }, delay);
      }, {
        accX: 0,
        accY: -50
      });
    });
  }

  _urnaResizeMegamenu() {
    var window_size = jQuery('body').innerWidth();
    if (jQuery('.tbay_custom_menu').length === 0) return;

    if (jQuery('.tbay_custom_menu').length > 0 && jQuery('.tbay_custom_menu').hasClass('tbay-vertical-menu')) {
      if (window_size > 767) {
        this._resizeMegaMenuOnDesktop();
      } else {
        this._initTreeViewForMegaMenuOnMobile();
      }
    }

    if (jQuery('.tbay-megamenu').length > 0 && jQuery('.tbay-megamenu,.tbay-offcanvas-main').hasClass('verticle-menu') && window_size > 767) {
      this._resizeMegaMenuVertical();
    }
  }

  _resizeMegaMenuVertical() {
    var full_width = parseInt(jQuery('#main-container.container').innerWidth());
    var menu_width = parseInt(jQuery('.verticle-menu').innerWidth());
    var w = full_width - menu_width;
    jQuery('.verticle-menu').find('.aligned-fullwidth').children('.dropdown-menu').css({
      "max-width": w,
      "width": full_width - 30
    });
  }

  _resizeMegaMenuOnDesktop() {
    let maxWidth = jQuery('#main-container.container').innerWidth() - jQuery('.tbay-vertical-menu').innerWidth();
    let width = jQuery('#main-container.container').innerWidth() - 30;
    jQuery('.tbay-vertical-menu').find('.aligned-fullwidth').children('.dropdown-menu').css({
      'max-width': maxWidth,
      "width": width
    });
  }

  _initTreeViewForMegaMenuOnMobile() {
    if (typeof jQuery.fn.treeview === "undefined") return;
    jQuery(".tbay-vertical-menu > .widget_nav_menu >.nav > ul").each(function () {
      if (jQuery(this).hasClass('treeview')) return;
      jQuery(this).treeview(TREE_VIEW_OPTION_MEGA_MENU);
    });
  }

  _addAccordionLoginandCoupon() {
    jQuery('.showlogin, .showcoupon').click(function (event) {
      jQuery(event.currentTarget).toggleClass('active');
    });
  }

  _initHeaderCoverBG() {
    if (jQuery('#tbay-header').length === 0 && jQuery('#tbay-customize-header').length === 0) return;
    let menu = jQuery('.tbay-horizontal .navbar-nav.megamenu > li, #primary-menu.navbar-nav > li, #tbay-header .recent-view .urna-recent-viewed-products, #tbay-customize-header .recent-view .urna-recent-viewed-products'),
        search = jQuery('.tbay-search-form .tbay-search'),
        btn_category = jQuery('.category-inside .category-inside-title'),
        cart_click = jQuery('.cart-popup');
    menu.mouseenter(function () {
      if (jQuery(this).children('.dropdown-menu, ul, .content-view').length == 0) return;
      jQuery('#tbay-header').addClass('nav-cover-active-1');
      jQuery('#tbay-customize-header').addClass('nav-cover-active-1');
    }).mouseleave(function () {
      jQuery('#tbay-header').removeClass('nav-cover-active-1');
      jQuery('#tbay-customize-header').removeClass('nav-cover-active-1');
    });
    search.focusin(function () {
      if (search.parents('.sidebar-canvas-search').length > 0) return;
      jQuery('#tbay-header').addClass('nav-cover-active-2');
      jQuery('#tbay-customize-header').addClass('nav-cover-active-2');
    }).focusout(function () {
      jQuery('#tbay-header').removeClass('nav-cover-active-2');
      jQuery('#tbay-customize-header').removeClass('nav-cover-active-2');
    });
    cart_click.on('shown.bs.dropdown', function (event) {
      jQuery(event.target).closest('#tbay-header').addClass('nav-cover-active-3');
      jQuery(event.target).closest('#tbay-customize-header').addClass('nav-cover-active-3');
    }).on('hidden.bs.dropdown', function (event) {
      jQuery(event.target).closest('#tbay-header').removeClass('nav-cover-active-3');
      jQuery(event.target).closest('#tbay-customize-header').removeClass('nav-cover-active-3');
    });

    if (btn_category.parents('#tbay-header')) {
      jQuery(document.body).on('urna_category_inside_open', () => {
        jQuery('#tbay-header').addClass('nav-cover-active-4');
      });
      jQuery(document.body).on('urna_category_inside_close', () => {
        jQuery('#tbay-header').removeClass('nav-cover-active-4');
      });
    }

    if (btn_category.parents('#tbay-customize-header')) {
      jQuery(document.body).on('urna_category_inside_open', () => {
        jQuery('#tbay-customize-header').addClass('nav-cover-active-4');
      });
      jQuery(document.body).on('urna_category_inside_close', () => {
        jQuery('#tbay-customize-header').removeClass('nav-cover-active-4');
      });
    }
  }

  _initCanvasSearch() {
    let input_search = jQuery('#tbay-search-form-canvas .sidebar-canvas-search .sidebar-content .tbay-search');
    input_search.focusin(function () {
      input_search.parent().addClass('search_cv_active');
    }).focusout(function () {
      input_search.parent().removeClass('search_cv_active');
    });
  }

  _initTreeviewMenu() {
    jQuery("#category-menu").addClass('treeview');
    jQuery(".treeview-menu .menu, #category-menu").treeview(TREE_VIEW_OPTION_MEGA_MENU);
    jQuery("#main-mobile-menu, #main-mobile-menu-xlg").treeview(TREE_VIEW_OPTION_MOBILE_MENU);
  }

  _categoryMenu() {
    jQuery(".category-inside .category-inside-title").click(function () {
      jQuery(event.target).parents('.category-inside').toggleClass("open");

      if (jQuery(event.target).parents('.category-inside').hasClass('open')) {
        jQuery(document.body).trigger('urna_category_inside_open');
      } else {
        jQuery(document.body).trigger('urna_category_inside_close');
      }
    });
    let $win = jQuery(window);
    $win.on("click.Bst,click touchstart tap", function (event) {
      if (typeof urna_settings !== "undefined" && urna_settings.category_open === 'open') return;
      let $box = jQuery('.category-inside .category-inside-title, .category-inside-content');
      if (jQuery('#tbay-header').length === 0 && jQuery('#tbay-customize-header').length === 0) return;
      if (!jQuery('.category-inside').hasClass('open') && (!jQuery('#tbay-header').hasClass('nav-cover-active-4') || !jQuery('#tbay-customize-header').hasClass('nav-cover-active-4'))) return;

      if ($box.has(event.target).length == 0 && !$box.is(event.target)) {
        jQuery('.category-inside').removeClass('open');
        jQuery('#tbay-header').removeClass('nav-cover-active-4');
        jQuery('#tbay-customize-header').removeClass('nav-cover-active-4');
      }
    });
  }

  _initContentMinHeight() {
    if (jQuery('#tbay-header').length === 0 && jQuery('#tbay-customize-header').length === 0) return;
    let window_size = jQuery('body').innerWidth(),
        $screen = jQuery(window).height(),
        $content = jQuery('#tbay-main-content').outerHeight();

    if (jQuery('#tbay-header').length > 0) {
      var $header = jQuery('#tbay-header').outerHeight();
    }

    if (jQuery('#tbay-customize-header').length > 0) {
      var $header = jQuery('#tbay-customize-header').outerHeight();
    }

    if ($content < $screen && window_size > 1200) {
      jQuery('#tbay-main-content').css('min-height', $screen - $header);
    }
  }

  _initFix_vc_full_width_row() {
    function vc_row_full_width(event) {
      var vcFullWidth = jQuery('[data-vc-full-width="true"]');
      jQuery.each(vcFullWidth, function () {
        if (jQuery("html").attr("dir") == "rtl") {
          if (parseInt(jQuery('body').css('padding-right')) > 0) {
            let width = parseInt(jQuery('body').css('width')) - parseInt(jQuery('body').css('padding-right')),
                offset = (width - parseInt(jQuery('#main-container').css('width'))) / 2,
                right = offset;
            if (jQuery(this).data("vc-stretch-content")) offset = '';
            jQuery(this).css('width', width).css('right', -right).css('left', '').css('padding-left', offset).css('padding-right', offset);
          }
        } else {
          if (parseInt(jQuery('body').css('padding-left')) > 0) {
            let width = parseInt(jQuery('body').css('width')) - parseInt(jQuery('body').css('padding-left')),
                offset = (width - parseInt(jQuery('#main-container').css('width'))) / 2,
                left = offset;
            if (jQuery(this).data("vc-stretch-content")) offset = '';
            jQuery(this).css('width', width).css('left', -left).css('padding-left', offset).css('padding-right', offset);
          }
        }
      });
    }

    jQuery(document).on('vc-full-width-row-single', vc_row_full_width);
  }

}

class NewsLetter {
  constructor() {
    this._init();
  }

  _init() {
    let popup = jQuery('#popupNewsletterModal');
    if (popup.length === 0 || jQuery('body.elementor-editor-active').length > 0) return;
    popup.on('hidden.bs.modal', function () {
      tbaysetCookie('hiddenmodal', 1, 0.1);
    });
    setTimeout(function () {
      var hiddenmodal = tbaygetCookie('hiddenmodal');

      if (hiddenmodal == "") {
        popup.modal('show');
      }
    }, 3000);
  }

}

class Banner {
  constructor() {
    this._bannerWidget();

    this._bannerAddon();
  }

  _bannerWidget() {
    let btnRemove = jQuery('#banner-remove');
    if (btnRemove.length === 0) return;
    btnRemove.on('click', function (event) {
      jQuery(event.target).parents('.widget_urna_banner_image').slideUp("slow");
      tbaysetCookie('banner_remove', 1, 0.1);
    });
  }

  _bannerAddon() {
    let btnRemove = jQuery('.banner-remove');

    if (btnRemove.length === 0) {
      jQuery('.elementor-widget-tbay-banner-close').each(function () {
        jQuery(this).closest('section').addClass('section-banner-close');
      });
    } else {
      btnRemove.on('click', function (event) {
        let id = jQuery(this).data('id');
        if (typeof id === "undefined") return;
        jQuery(this).parents('.elementor-widget-tbay-banner-close').slideUp("slow");
        Cookies.set('banner_remove_' + id, 'hidden', {
          expires: 0.1,
          path: '/'
        });
        event.preventDefault();
      });
    }
  }

}

class Search {
  constructor() {
    this._init();
  }

  _init() {
    this._urnaSearchMobile();

    this._searchToTop();

    this._searchCanvasForm();

    this._searchCanvasFormV3();

    jQuery('.button-show-search').click(() => jQuery('.tbay-search-form').addClass('active'));
    jQuery('.button-hidden-search').click(() => jQuery('.tbay-search-form').removeClass('active'));
  }

  _urnaSearchMobile() {
    jQuery(".topbar-mobile .search-popup, .search-device-mobile").each(function () {
      jQuery(this).find(".show-search").click(event => {
        jQuery(this).find(".tbay-search-form").slideToggle(500);
        jQuery(this).find(".tbay-search-form .input-group .tbay-search").focus();
        jQuery(event.currentTarget).toggleClass('active');
      });
    });
    jQuery(window).on("click.Bst,click touchstart tap", function (event) {
      let box = jQuery('.footer-device-mobile > div i, .topbar-device-mobile .search-device-mobile i ,.search-device-mobile .tbay-search-form form');
      if (!jQuery(".search-device-mobile .show-search").hasClass('active')) return;

      if (box.has(event.target).length == 0 && !box.is(event.target)) {
        jQuery(".search-device-mobile .tbay-search-form").slideUp(500);
        jQuery(".search-device-mobile .show-search").removeClass('active');
        jQuery("body").removeClass('mobile-search-active');
      }
    });
    jQuery('.topbar-mobile .dropdown-menu').click(function (e) {
      e.stopPropagation();
    });
  }

  _searchCanvasForm() {
    let searchform = jQuery('#tbay-search-form-canvas');
    searchform.find('button.search-open').click(function () {
      jQuery(event.target).parents('#tbay-search-form-canvas').toggleClass("open");
      jQuery('body').toggleClass("active-search-canvas");
    });
    let window_searchcanvas = jQuery(window);
    let forcussidebar = jQuery('#tbay-search-form-canvas .search-open, #tbay-search-form-canvas .sidebar-content');
    window_searchcanvas.on("click.Bst", function (event) {
      if (!searchform.hasClass('open')) return;

      if (forcussidebar.has(event.target).length == 0 && !forcussidebar.is(event.target)) {
        searchform.removeClass("open");
        jQuery('body').removeClass("active-search-canvas");
      }
    });
    searchform.find('button.btn-search-close').click(function () {
      if (!searchform.hasClass('open')) return;
      searchform.removeClass("open");
      jQuery('body').removeClass("active-search-canvas");
    });
  }

  _searchToTop() {
    jQuery('.search-totop-wrapper .btn-search-totop').click(function () {
      jQuery('.search-totop-content').toggleClass('active');
      jQuery(this).toggleClass('active');
    });
    var box_totop = jQuery('.search-totop-wrapper .btn-search-totop, .search-totop-content');
    jQuery(window).on("click.Bst", function (event) {
      if (box_totop.has(event.target).length == 0 && !box_totop.is(event.target)) {
        jQuery('.search-totop-wrapper .btn-search-totop').removeClass('active');
        jQuery('.search-totop-content').removeClass('active');
      }
    });
  }

  _searchCanvasFormV3() {
    let searchform = jQuery('#tbay-search-form-canvas-v3');
    searchform.find('button.search-open').click(function () {
      jQuery(event.target).parents('#tbay-search-form-canvas-v3').toggleClass("open");
      jQuery('body').toggleClass("active-search-canvas");
    });
    let window_searchcanvas = jQuery(window);
    let forcussidebar = jQuery('#tbay-search-form-canvas-v3 .search-open, #tbay-search-form-canvas-v3 .sidebar-content');
    window_searchcanvas.on("click.Bst", function (event) {
      if (!searchform.hasClass('open')) return;

      if (forcussidebar.has(event.target).length == 0 && !forcussidebar.is(event.target)) {
        searchform.removeClass("open");
        jQuery('body').removeClass("active-search-canvas");
      }
    });
    searchform.find('button.btn-search-close').click(function () {
      if (!searchform.hasClass('open')) return;
      searchform.removeClass("open");
      jQuery('body').removeClass("active-search-canvas");
    });
  }

}

class TreeView {
  constructor() {
    this._tbayTreeViewMenu();
  }

  _tbayTreeViewMenu() {
    if (typeof jQuery.fn.treeview === "undefined" || typeof jQuery('.tbay-treeview') === "undefined" || jQuery('.tbay-treeview').length === 0) return;
    jQuery(".tbay-treeview").each(function () {
      if (jQuery(this).find('.hitarea').length > 0) return;
      if (jQuery(this).find('> ul').hasClass('treeview')) return;
      jQuery(this).find('> ul').treeview({
        animated: 400,
        collapsed: true,
        unique: true,
        persist: "location"
      });
    });
  }

}

class Section {
  constructor() {
    this._tbayMegaMenu();

    this._tbayRecentlyView();
  }

  _tbayMegaMenu() {
    let menu = jQuery('.elementor-widget-tbay-nav-menu > .elementor-widget-container > .tbay-addon-nav-menu');
    if (menu.length === 0) return;
    menu.each(function () {
      if (typeof jQuery(this).attr('data-wrapper') === 'undefined' || jQuery(this).data('wrapper').layout !== "horizontal") return;

      if (!jQuery(this).closest('.elementor-top-column').hasClass('tbay-column-static')) {
        jQuery(this).closest('.elementor-top-column').addClass('tbay-column-static');
      }

      if (!jQuery(this).closest('section').hasClass('tbay-section-static')) {
        jQuery(this).closest('section').addClass('tbay-section-static');
      }
    });
  }

  _tbayRecentlyView() {
    let recently = jQuery('.tbay-addon-header-recently-viewed');
    if (recently.length === 0) return;
    recently.each(function () {
      if (!jQuery(this).closest('.elementor-top-column').hasClass('tbay-column-static')) {
        jQuery(this).closest('.elementor-top-column').addClass('tbay-column-static');
      }

      if (!jQuery(this).closest('.elementor-top-column').hasClass('tbay-column-recentlyviewed')) {
        jQuery(this).closest('.elementor-top-column').addClass('tbay-column-recentlyviewed');
      }

      if (!jQuery(this).closest('section').hasClass('tbay-section-recentlyviewed')) {
        jQuery(this).closest('section').addClass('tbay-section-recentlyviewed');
      }

      if (!jQuery(this).closest('section').hasClass('tbay-section-static')) {
        jQuery(this).closest('section').addClass('tbay-section-static');
      }
    });
  }

}

class Preload {
  constructor() {
    this._init();
  }

  _init() {
    if (jQuery.fn.jpreLoader) {
      var $preloader = jQuery('.js-preloader');
      $preloader.jpreLoader({}, function () {
        $preloader.addClass('preloader-done');
        jQuery('body').trigger('preloader-done');
        jQuery(window).trigger('resize');
      });
    }

    jQuery('.tbay-page-loader').delay(100).fadeOut(400, function () {
      jQuery('body').removeClass('tbay-body-loading');
      jQuery(this).remove();
    });

    if (jQuery(document.body).hasClass('tbay-body-loader')) {
      setTimeout(function () {
        jQuery(document.body).removeClass('tbay-body-loader');
        jQuery('.tbay-page-loader').fadeOut(250);
      }, 300);
    }
  }

}

class Tabs {
  constructor() {
    jQuery('ul.nav-tabs li a').on('show.bs.tab', event => {
      jQuery(document.body).trigger('urna_lazyload_image');
    });
    jQuery('.wc-tabs li a').on('click', event => {
      jQuery(document.body).trigger('urna_lazyload_image');
    });
  }

}

class MenuDropdownsAJAX {
  constructor() {
    if (typeof urna_settings === "undefined") return;

    this._initmenuDropdownsAJAX();
  }

  _initmenuDropdownsAJAX() {
    var _this = this;

    jQuery('body').on('mousemove', function () {
      jQuery('.menu').has('.dropdown-load-ajax').each(function () {
        var _menu = jQuery(this);

        if (_menu.hasClass('dropdowns-loading') || _menu.hasClass('dropdowns-loaded')) {
          return;
        }

        if (!_this.isNear(_menu, 50, event)) {
          return;
        }

        _this.loadDropdowns(_menu);
      });
    });
  }

  loadDropdowns(_menu) {
    var _this = this;

    _menu.addClass('dropdowns-loading');

    var storageKey = '',
        unparsedData = '',
        menu_mobile_id = '';

    if (_menu.closest('nav').attr('id') === 'tbay-mobile-menu-navbar') {
      if (jQuery('#main-mobile-menu-mmenu-wrapper').length > 0) {
        menu_mobile_id += '_' + jQuery('#main-mobile-menu-mmenu-wrapper').data('id');
      }

      if (jQuery('#main-mobile-second-mmenu-wrapper').length > 0) {
        menu_mobile_id += '_' + jQuery('#main-mobile-second-mmenu-wrapper').data('id');
      }

      storageKey = urna_settings.storage_key + '_megamenu_mobile' + menu_mobile_id;
    } else {
      storageKey = urna_settings.storage_key + '_megamenu_' + _menu.closest('nav').find('ul').data('id');
    }

    unparsedData = localStorage.getItem(storageKey);
    var storedData = false;

    var $items = _menu.find('.dropdown-load-ajax'),
        ids = [];

    $items.each(function () {
      ids.push(jQuery(this).find('.dropdown-html-placeholder').data('id'));
    });

    try {
      storedData = JSON.parse(unparsedData);
    } catch (e) {
      console.log('cant parse Json', e);
    }

    if (storedData) {
      _this.renderResults(storedData, _menu);

      if (_menu.attr('id') !== 'tbay-mobile-menu-navbar') {
        _menu.removeClass('dropdowns-loading').addClass('dropdowns-loaded');
      }
    } else {
      jQuery.ajax({
        url: urna_settings.ajaxurl,
        data: {
          action: 'urna_load_html_dropdowns',
          ids: ids
        },
        dataType: 'json',
        method: 'POST',
        success: function (response) {
          if (response.status === 'success') {
            _this.renderResults(response.data, _menu);

            localStorage.setItem(storageKey, JSON.stringify(response.data));
          } else {
            console.log('loading html dropdowns returns wrong data - ', response.message);
          }
        },
        error: function () {
          console.log('loading html dropdowns ajax error');
        }
      });
    }
  }

  renderResults(data, _menu) {
    var _this = this;

    Object.keys(data).forEach(function (id) {
      _this.removeDuplicatedStylesFromHTML(data[id], function (html) {
        let html2 = html;
        const regex1 = '<li[^>]*><a[^>]*href=["]' + window.location.href + '["]>.*?<\/a><\/li>';
        let content = html.match(regex1);

        if (content !== null) {
          let $url = content[0];
          let $class = $url.match(/(?:class)=(?:["']\W+\s*(?:\w+)\()?["']([^'"]+)['"]/g)[0].split('"')[1];
          let $class_new = $class + ' active';
          let $url_new = $url.replace($class, $class_new);
          html2 = html2.replace($url, $url_new);
        }

        _menu.find('[data-id="' + id + '"]').replaceWith(html2);

        if (_menu.attr('id') !== 'tbay-mobile-menu-navbar') {
          _menu.addClass('dropdowns-loaded');

          setTimeout(function () {
            _menu.removeClass('dropdowns-loading');
          }, 1000);
        }
      });
    });
  }

  isNear($element, distance, event) {
    var left = $element.offset().left - distance,
        top = $element.offset().top - distance,
        right = left + $element.width() + 2 * distance,
        bottom = top + $element.height() + 2 * distance,
        x = event.pageX,
        y = event.pageY;
    return x > left && x < right && y > top && y < bottom;
  }

  removeDuplicatedStylesFromHTML(html, callback) {
    if (urna_settings.combined_css) {
      callback(html);
      return;
    } else {
      const regex = /<style>.*?<\/style>/mg;
      let output = html.replace(regex, "");
      callback(output);
      return;
    }
  }

}

class MenuClickAJAX {
  constructor() {
    if (typeof urna_settings === "undefined") return;

    this._initmenuClickAJAX();
  }

  _initmenuClickAJAX() {
    jQuery('.element-menu-ajax.ajax-active').each(function () {
      let _menu = jQuery(this);

      _menu.find('.menu-click').off('click').on('click', function (e) {
        e.preventDefault();

        var _this = jQuery(this);

        if (!_this.closest('.element-menu-ajax').hasClass('ajax-active')) return;

        var element = _this.closest('.tbay-element'),
            type_menu = element.data('wrapper')['type_menu'],
            layout = element.data('wrapper')['layout'],
            header_type = element.data('wrapper')['header_type'];

        if (type_menu === 'toggle') {
          var nav = element.find('.category-inside-content > nav');
        } else {
          var nav = element.find('.menu-canvas-content > nav');
        }

        var slug = nav.data('id');
        var storageKey = urna_settings.storage_key + '_' + slug + '_' + layout;
        var storedData = false;
        var unparsedData = localStorage.getItem(storageKey);

        try {
          storedData = JSON.parse(unparsedData);
        } catch (e) {
          console.log('cant parse Json', e);
        }

        if (storedData) {
          nav.html(storedData);
          element.removeClass('load-ajax');

          _this.closest('.element-menu-ajax').removeClass('ajax-active');

          if (layout === 'treeview') {
            jQuery(document.body).trigger('tbay_load_html_click_treeview');
          } else {
            jQuery(document.body).trigger('tbay_load_html_click');
          }
        } else {
          jQuery.ajax({
            url: urna_settings.ajaxurl,
            data: {
              action: 'urna_load_html_click',
              slug: slug,
              type_menu: type_menu,
              layout: layout,
              header_type: header_type
            },
            dataType: 'json',
            method: 'POST',
            beforeSend: function (xhr) {
              element.addClass('load-ajax');
            },
            success: function (response) {
              if (response.status === 'success') {
                nav.html(response.data);
                localStorage.setItem(storageKey, JSON.stringify(response.data));

                if (layout === 'treeview') {
                  jQuery(document.body).trigger('tbay_load_html_click_treeview');
                } else {
                  jQuery(document.body).trigger('tbay_load_html_click');
                }
              } else {
                console.log('loading html dropdowns returns wrong data - ', response.message);
              }

              element.removeClass('load-ajax');

              _this.closest('.element-menu-ajax').removeClass('ajax-active');
            },
            error: function () {
              console.log('loading html dropdowns ajax error');
            }
          });
        }
      });
    });
  }

}

class MenuCanvasDefaultClickAJAX {
  constructor() {
    if (typeof urna_settings === "undefined") return;

    this._initmenuCanvasDefaultClickAJAX();
  }

  _initmenuCanvasDefaultClickAJAX() {
    jQuery('.menu-canvas-click').off('click').on('click', function (e) {
      e.preventDefault();

      var _this = jQuery(this);

      if (!_this.hasClass('ajax-active')) return;
      var element = jQuery('#' + _this.data('id')),
          layout = element.data('wrapper')['layout'],
          nav = element.find('.tbay-offcanvas-body > nav'),
          slug = nav.data('id'),
          storageKey = urna_settings.storage_key + '_' + slug + '_' + layout,
          storedData = false,
          unparsedData = localStorage.getItem(storageKey);

      try {
        storedData = JSON.parse(unparsedData);
      } catch (e) {
        console.log('cant parse Json', e);
      }

      if (storedData) {
        nav.html(storedData);
        element.removeClass('load-ajax');

        _this.removeClass('ajax-active');

        jQuery(document.body).trigger('tbay_load_html_click');
      } else {
        jQuery.ajax({
          url: urna_settings.ajaxurl,
          data: {
            action: 'urna_load_html_canvas_click',
            slug: slug,
            layout: layout
          },
          dataType: 'json',
          method: 'POST',
          beforeSend: function (xhr) {
            element.addClass('load-ajax');
          },
          success: function (response) {
            if (response.status === 'success') {
              nav.html(response.data);
              localStorage.setItem(storageKey, JSON.stringify(response.data));
              jQuery(document.body).trigger('tbay_load_html_click');
            } else {
              console.log('loading html dropdowns returns wrong data - ', response.message);
            }

            element.removeClass('load-ajax');

            _this.removeClass('ajax-active');
          },
          error: function () {
            console.log('loading html dropdowns ajax error');
          }
        });
      }
    });
  }

}

(function ($, sr) {
  var debounce = function (func, threshold, execAsap) {
    var timeout;
    return function debounced() {
      var obj = this,
          args = arguments;

      function delayed() {
        if (!execAsap) func.apply(obj, args);
        timeout = null;
      }
      if (timeout) clearTimeout(timeout);else if (execAsap) func.apply(obj, args);
      timeout = setTimeout(delayed, threshold || 100);
    };
  };

  jQuery.fn[sr] = function (fn) {
    return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
  };
})(jQuery, 'smartresize');

class SumoSelect {
  constructor() {
    if (typeof jQuery.fn.SumoSelect === "undefined") return;
    if (typeof urna_settings === "undefined") return;

    this._init();
  }

  _init() {
    jQuery(document).ready(function () {
      jQuery('.woocommerce-currency-switcher,.woocommerce-fillter >.select, .woocommerce-ordering > .orderby, .tbay-filter select').SumoSelect({
        csvDispCount: 3,
        captionFormatAllSelected: "Yeah, OK, so everything."
      });
      jQuery('.tbay-search-form select').SumoSelect({
        forceCustomRendering: true
      });
    });
  }

}

class AutoComplete {
  constructor() {
    if (typeof jQuery.Autocomplete === "undefined") return;
    if (typeof urna_settings === "undefined") return;

    this._callAjaxSearch();
  }

  _callAjaxSearch() {
    var _this = this,
        url = urna_settings.ajaxurl + '?action=urna_autocomplete_search&security=' + urna_settings.search_nonce,
        form = jQuery('form.searchform.urna-ajax-search'),
        RegEx = function (value) {
      return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    };

    form.each(function () {
      var _this2 = jQuery(this),
          autosearch = _this2.find('input[name=s]'),
          image = parseInt(_this2.data('thumbnail')),
          price = parseInt(_this2.data('price'));

      autosearch.devbridgeAutocomplete({
        serviceUrl: _this._AutoServiceUrl(autosearch, url),
        minChars: _this._AutoMinChars(autosearch),
        appendTo: _this._AutoAppendTo(autosearch),
        width: '100%',
        maxHeight: 'initial',
        onSelect: function (suggestion) {
          if (suggestion.link.length > 0) window.location.href = suggestion.link;
        },
        onSearchStart: function (query) {
          let form = autosearch.parents('form');
          form.addClass('tbay-loading');
        },
        beforeRender: function (container, suggestion) {
          if (typeof suggestion[0].result != 'undefined') {
            jQuery(container).prepend('<div class="list-header"><span>' + suggestion[0].result + '</span></div>');
          }

          if (suggestion[0].view_all) {
            jQuery(container).append('<div class="view-all-products"><span>' + urna_settings.show_all_text + '</span><i class="linear-icon-chevron-right"></i></div>');
          }
        },
        onSearchComplete: function (query, suggestions) {
          form.removeClass('tbay-loading');
          jQuery(this).parents('form').addClass('open');
          jQuery(document.body).trigger('urna_searchcomplete');
        },
        formatResult: (suggestion, currentValue) => {
          let returnValue = _this._initformatResult(suggestion, currentValue, RegEx, image, price);

          return returnValue;
        },
        onHide: function (container) {
          if (jQuery(this).parents('form').hasClass('open')) jQuery(this).parents('form').removeClass('open');
        }
      });
      jQuery('body').click(function () {
        if (autosearch.is(":focus")) {
          return;
        }

        autosearch.each(function () {
          jQuery(this).devbridgeAutocomplete('hide');
        });
      });
    });
    var cat_change = form.find('[name="product_cat"], [name="category"]');

    if (cat_change.length) {
      cat_change.change(function (e) {
        let se_input = jQuery(e.target).parents('form').find('input[name=s]'),
            ac = se_input.devbridgeAutocomplete();
        ac.hide();
        ac.setOptions({
          serviceUrl: _this._AutoServiceUrl(se_input, url)
        });
        ac.onValueChange();
      });
    }

    jQuery(document.body).on('urna_searchcomplete', function () {
      jQuery(".view-all-products").on("click", function () {
        jQuery(this).parents('form').submit();
      });
    });
  }

  _AutoServiceUrl(autosearch, url) {
    let form = autosearch.parents('form'),
        number = parseInt(form.data('count')),
        postType = form.data('post-type'),
        search_in = form.data('search-in'),
        product_cat = form.find('[name="product_cat"], [name="category"]').val();

    if (number > 0) {
      url += '&number=' + number;
    }

    url += '&search_in=' + search_in;
    url += '&post_type=' + postType;

    if (product_cat) {
      url += '&product_cat=' + product_cat;
    }

    return url;
  }

  _AutoAppendTo(autosearch) {
    let form = autosearch.parents('form'),
        appendTo = typeof form.data('appendto') !== 'undefined' ? form.data('appendto') : form.find('.urna-search-results');
    return appendTo;
  }

  _AutoMinChars(autosearch) {
    let form = autosearch.parents('form'),
        minChars = parseInt(form.data('minchars'));
    return minChars;
  }

  _initformatResult(suggestion, currentValue, RegEx, image, price) {
    if (currentValue == '&') currentValue = "&#038;";
    var pattern = '(' + RegEx(currentValue) + ')',
        returnValue = '';

    if (image && suggestion.image && suggestion.image.length > 0) {
      returnValue += ' <div class="suggestion-thumb">' + suggestion.image + '</div>';
    }

    returnValue += '<div class="suggestion-group">';
    returnValue += '<div class="suggestion-title product-title">' + suggestion.value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/&lt;(\/?strong)&gt;/g, '<$1>') + '</div>';
    if (suggestion.no_found) returnValue = '<div class="suggestion-title no-found-msg">' + suggestion.value + '</div>';

    if (price && suggestion.price && suggestion.price.length > 0) {
      returnValue += ' <div class="suggestion-price price">' + suggestion.price + '</div>';
    }

    returnValue += '</div>';
    return returnValue;
  }

}

class CountDownTimer {
  constructor() {
    if (typeof jQuery.fn.tbayCountDown === "undefined") return;
    if (typeof urna_settings === "undefined") return;
    jQuery('[data-time="timmer"]').each((index, el) => {
      let date = jQuery(el).data('date').split("-"),
          days = jQuery(el).data('days') ? jQuery(el).data('days') : '',
          hours = jQuery(el).data('hours') ? jQuery(el).data('hours') : '',
          mins = jQuery(el).data('mins') ? jQuery(el).data('mins') : '',
          secs = jQuery(el).data('secs') ? jQuery(el).data('secs') : '';
      jQuery(el).tbayCountDown({
        TargetDate: date[0] + "/" + date[1] + "/" + date[2] + " " + date[3] + ":" + date[4] + ":" + date[5],
        DisplayFormat: "<div class=\"times\"><div class=\"day\">%%D%%" + days + "</div><span>:</span><div class=\"hours\">%%H%%" + hours + "</div><span>:</span><div class=\"minutes\">%%M%%" + mins + "</div><span>:</span><div class=\"seconds\">%%S%%" + secs + "</div></div>",
        FinishMessage: ""
      });
    });
    jQuery('[data-countdown="countdown"]').each((index, el) => {
      let date = jQuery(el).data('date').split("-"),
          days = jQuery(el).data('days') ? jQuery(el).data('days') : '',
          hours = jQuery(el).data('hours') ? jQuery(el).data('hours') : '',
          mins = jQuery(el).data('mins') ? jQuery(el).data('mins') : '',
          secs = jQuery(el).data('secs') ? jQuery(el).data('secs') : '';
      jQuery(el).tbayCountDown({
        TargetDate: date[0] + "/" + date[1] + "/" + date[2] + " " + date[3] + ":" + date[4] + ":" + date[5],
        DisplayFormat: "<div class=\"times\"><div class=\"day\">%%D%%" + days + " </div><span>:</span><div class=\"hours\">%%H%%" + hours + " </div><span>:</span><div class=\"minutes\">%%M%%" + mins + " </div><span>:</span><div class=\"seconds\">%%S%%" + secs + " </div></div>",
        FinishMessage: ""
      });
    });
  }

}

class Sticky {
  constructor() {
    if (typeof urna_settings === "undefined") return;

    this._tbayProductSingleStick();

    this._tbayProductSingleCentered();
  }

  _tbayProductSingleStick() {
    if (jQuery('#tbay-header').length === 0 && jQuery('#tbay-customize-header').length === 0) return;

    if (jQuery('.active-stick .summary-left, .active-stick .summary-right, .active-stick .information').length) {
      if (jQuery('#tbay-header').length > 0) {
        var stick_top = jQuery('#tbay-header').hasClass('main-sticky-header') ? 180 : 50;
      }

      if (jQuery('#tbay-customize-header').length > 0) {
        var stick_top = jQuery('#tbay-customize-header').hasClass('main-sticky-header') ? 180 : 50;
      }

      jQuery('.active-stick .summary-left, .active-stick .summary-right, .active-stick .information').hcSticky({
        stickTo: '.active-stick .image-mains',
        top: stick_top
      });
    }
  }

  _tbayProductSingleCentered() {
    if (jQuery('#tbay-header').length === 0 && jQuery('#tbay-customize-header').length === 0) return;

    if (jQuery('.style-centered .summary-left, .style-centered .summary-right').length) {
      jQuery('.style-centered .summary-left, .style-centered .summary-right').hcSticky({
        stickTo: '.style-centered .image-mains-center',
        top: jQuery('#tbay-header').hasClass('main-sticky-header') ? 180 : 50
      });
    }
  }

}

class MMenu {
  constructor() {
    if (typeof jQuery.fn.mmenu === "undefined") return;
    if (typeof urna_settings === "undefined") return;

    this._initMmenu();
  }

  _initMmenu() {
    if (jQuery('body').hasClass('admin-bar')) {
      jQuery('html').addClass('html-mmenu');
    }

    var text_cancel = typeof urna_settings !== "undefined" ? urna_settings.cancel : '';
    var _PLUGIN_ = 'mmenu';

    jQuery[_PLUGIN_].i18n({
      'cancel': text_cancel
    });

    var mmenu = jQuery("#tbay-mobile-smartmenu");
    if (jQuery(mmenu).length === 0) return;
    var themes = mmenu.data('themes');
    var enablesearch = Boolean(mmenu.data("enablesearch"));
    var menu_title = mmenu.data('title');
    var searchcounters = Boolean(mmenu.data('counters'));
    var enabletabs = Boolean(mmenu.data("enabletabs"));
    var tabone = enabletabs ? mmenu.data('tabone') : '';
    var taboneicon = enabletabs ? mmenu.data('taboneicon') : '';
    var tabsecond = enabletabs ? mmenu.data('tabsecond') : '';
    var tabsecondicon = enabletabs ? mmenu.data('tabsecondicon') : '';
    var enablesocial = Boolean(mmenu.data("enablesocial"));
    var socialjsons = '';
    var enableeffects = Boolean(mmenu.data("enableeffects"));
    var effectspanels = enableeffects ? mmenu.data('effectspanels') : '';
    var effectslistitems = enableeffects ? mmenu.data('effectslistitems') : '';
    var mmenuOptions = {
      offCanvas: true,
      navbar: {
        title: menu_title
      },
      counters: searchcounters,
      extensions: [themes, effectspanels, effectslistitems]
    };
    var mmenuOptionsAddition = {
      navbars: [],
      searchfield: {}
    };

    if (enablesearch) {
      mmenuOptionsAddition.navbars.push({
        position: ['top'],
        content: ['searchfield']
      });
      mmenuOptionsAddition.searchfield = {
        panel: {
          add: true
        }
      };
    }

    if (enabletabs) {
      mmenuOptionsAddition.navbars.push({
        type: 'tabs',
        content: ['<a href="#main-mobile-menu-mmenu"><i class="' + taboneicon + '"></i> <span>' + tabone + '</span></a>', '<a href="#mobile-menu-second-mmenu"><i class="' + tabsecondicon + '"></i> <span>' + tabsecond + '</span></a>']
      });
    }

    if (enablesocial) {
      socialjsons = JSON.parse(mmenu.data("socialjsons").replace(/'/g, '"'));
      var content = jQuery.map(socialjsons, function (value) {
        return `<a class="mmenu-icon" href="${value.url}" target="_blank"><i class="${value.icon}"></i></a>`;
      });
      mmenuOptionsAddition.navbars.push({
        position: 'bottom',
        content: content
      });
    }

    mmenuOptions = _.extend(mmenuOptionsAddition, mmenuOptions);
    var mmenuConfigurations = {
      offCanvas: {
        pageSelector: "#tbay-main-content"
      },
      searchfield: {
        clear: true
      }
    };
    jQuery("#tbay-mobile-menu-navbar").mmenu(mmenuOptions, mmenuConfigurations);
    let search = jQuery('#mm-searchfield');

    if (search.length > 0) {
      jQuery("#tbay-mobile-menu-navbar .mm-searchfield").empty();
      search.prependTo(jQuery("#tbay-mobile-menu-navbar .mm-searchfield"));
    }

    jQuery('.mm-panels').css('top', jQuery('.mm-navbars_top').outerHeight());
  }

}

class OnePageNav {
  constructor() {
    if (typeof jQuery.fn.onePageNav === "undefined") return;
    if (typeof urna_settings === "undefined") return;

    this._productSingleOnepagenav();
  }

  _productSingleOnepagenav() {
    if (jQuery('#sticky-menu-bar').length > 0) {
      let offset_adminbar = 0;

      if (jQuery('#wpadminbar').length > 0) {
        offset_adminbar = jQuery('#wpadminbar').outerHeight();
      }

      let offset = jQuery('#sticky-menu-bar').outerHeight() + offset_adminbar;
      jQuery('#sticky-menu-bar').onePageNav({
        currentClass: 'current',
        changeHash: false,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        scrollOffset: offset,
        filter: '',
        easing: 'swing',
        begin: function () {},
        end: function () {},
        scrollChange: function () {}
      });
    }

    var onepage = jQuery('#sticky-menu-bar');

    if (onepage.length > 0) {
      if (jQuery('#tbay-header').length === 0 && jQuery('#tbay-customize-header').length === 0) return;
      var tbay_width = jQuery(window).width();

      if (jQuery('#tbay-header').length > 0) {
        jQuery('#tbay-header').removeClass('main-sticky-header');
      }

      if (jQuery('#tbay-customize-header').length > 0) {
        jQuery('#tbay-customize-header').removeClass('main-sticky-header');
      }

      var btn_cart_offset = jQuery('.single_add_to_cart_button').length > 0 ? jQuery('.single_add_to_cart_button').offset().top : 0;
      var out_of_stock_offset = jQuery('div.product .out-of-stock').length > 0 ? jQuery('div.product .out-of-stock').offset().top : 0;

      if (jQuery('.by-vendor-name-link').length > 0) {
        out_of_stock_offset = jQuery('.by-vendor-name-link').offset().top;
      }

      var sum_height = jQuery('.single_add_to_cart_button').length > 0 ? btn_cart_offset : out_of_stock_offset;

      this._checkScroll(tbay_width, sum_height, onepage);

      jQuery(window).scroll(() => {
        this._checkScroll(tbay_width, sum_height, onepage);
      });
    }

    if (onepage.hasClass('active') && jQuery('#wpadminbar').length > 0) {
      onepage.css('top', jQuery('#wpadminbar').height());
    }
  }

  _checkScroll(tbay_width, sum_height, onepage) {
    if (tbay_width >= 768) {
      var NextScroll = jQuery(window).scrollTop();

      if (NextScroll > sum_height) {
        onepage.addClass('active');

        if (jQuery('#wpadminbar').length > 0) {
          onepage.css('top', jQuery('#wpadminbar').height());
        }
      } else {
        onepage.removeClass('active');
      }
    } else {
      onepage.removeClass('active');
    }
  }

}

class Fancybox {
  constructor() {
    if (typeof jQuery.fn.fancybox === "undefined") return;
    if (typeof urna_settings === "undefined") return;
    jQuery(".fancybox-video").fancybox({
      maxWidth: 800,
      maxHeight: 600,
      fitToView: false,
      width: '70%',
      height: '70%',
      autoSize: false,
      closeClick: false,
      openEffect: 'none',
      closeEffect: 'none'
    });
    jQuery(".fancybox").fancybox();
  }

}

class FastClicker {
  constructor() {
    if (typeof urna_settings === "undefined") return;

    this._initFastClick();
  }

  _initFastClick() {
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
      }, false);
    }
  }

}

jQuery(document).ready(() => {
  new MenuDropdownsAJAX(), new MenuClickAJAX(), new MenuCanvasDefaultClickAJAX(), new StickyHeader(), new Tabs(), new StickyHeader(), new AccountMenu(), new BackToTop(), new CanvasMenu(), new FuncCommon(), new NewsLetter(), new Banner(), new Preload(), new Search(), new TreeView(), new Section(), new AutoComplete(), new CountDownTimer(), new Sticky(), new MMenu(), new OnePageNav(), new Fancybox(), new FastClicker(), new SumoSelect();

  if (typeof urna_settings !== "undefined" && (urna_settings.mobile || jQuery(window).width() < 1025)) {
    new Mobile();
  }

  jQuery(document).on("woof_ajax_done", woof_ajax_done_handler2);

  function woof_ajax_done_handler2(e) {
    new SumoSelect();
  }
});
setTimeout(function () {
  jQuery(document.body).on('tbay_load_html_click_treeview', () => {
    new TreeView();
  });
}, 2000);
jQuery(window).smartresize(function () {
  if (jQuery(window).width() < 1025) {
    try {
      new Mobile();
    } catch (err) {}
  }
});

var CustomTreeViewMenu = function ($scope, $) {
  var treeview = new TreeView();

  treeview._tbayTreeViewMenu();
};

jQuery(window).on('elementor/frontend/init', function () {
  if (typeof urna_settings !== "undefined" && Array.isArray(urna_settings.elements_ready.treeview)) {
    jQuery.each(urna_settings.elements_ready.treeview, function (index, value) {
      elementorFrontend.hooks.addAction('frontend/element_ready/tbay-' + value + '.default', CustomTreeViewMenu);
    });
  }
});

var CountDownTimerHandler = function ($scope, $) {
  new CountDownTimer();
};

jQuery(window).on('elementor/frontend/init', function () {
  if (typeof urna_settings !== "undefined" && Array.isArray(urna_settings.elements_ready.countdowntimer)) {
    jQuery.each(urna_settings.elements_ready.countdowntimer, function (index, value) {
      elementorFrontend.hooks.addAction('frontend/element_ready/tbay-' + value + '.default', CountDownTimerHandler);
    });
  }
});
