! function(n, i, e) {
    "use strict";
    var t = i.Modernizr,
        s = n("body");
    n.DLMenu = function(i, e) {
        this.$el = n(e), this._init(i)
    }, n.DLMenu.defaults = {
        animationClasses: {
            classin: "dl-animate-in-1",
            classout: "dl-animate-out-1"
        },
        onLevelClick: function(n, i) {
            return !1
        },
        onLinkClick: function(n, i) {
            return !1
        }
    }, n.DLMenu.prototype = {
        _init: function(i) {
            this.options = n.extend(!0, {}, n.DLMenu.defaults, i), this._config();
            var e = {
                    WebkitAnimation: "webkitAnimationEnd",
                    OAnimation: "oAnimationEnd",
                    msAnimation: "MSAnimationEnd",
                    animation: "animationend"
                },
                s = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    msTransition: "MSTransitionEnd",
                    transition: "transitionend"
                };
            this.animEndEventName = e[t.prefixed("animation")] + ".dlmenu", this.transEndEventName = s[t.prefixed("transition")] + ".dlmenu", this.supportAnimations = t.cssanimations, this.supportTransitions = t.csstransitions, this._initEvents()
        },
        _config: function() {
            this.open = !1, this.$trigger = this.$el.children(".second-menu"), this.$menu = this.$el.children("ul.dl-menu"), this.$menuitems = this.$menu.find("li:not(.dl-back)"), this.$el.find("ul.dl-submenu").prepend('<li class="dl-back"><a href="#">back</a></li>'), this.$back = this.$menu.find("li.dl-back")
        },
        _initEvents: function() {
            var e = this;
            this.$trigger.on("click.dlmenu", function() {
                return event.stopPropagation(), n(i).width() > 990 ? void 0 : (e.open ? e._closeMenu() : e._openMenu(), !1)
            }), this.$menuitems.on("click.dlmenu", function(t) {
                if (t.stopPropagation(), !(n(i).width() > 990)) {
                    var s = n(this),
                        o = s.children("ul.dl-submenu");
                    if (o.length > 0) {
                        var a = o.clone().css("opacity", 0).insertAfter(e.$menu),
                            l = function() {
                                e.$menu.off(e.animEndEventName).removeClass(e.options.animationClasses.classout).addClass("dl-subview"), s.addClass("dl-subviewopen").parents(".dl-subviewopen:first").removeClass("dl-subviewopen").addClass("dl-subview"), a.remove()
                            };
                        return setTimeout(function() {
                            a.addClass(e.options.animationClasses.classin), e.$menu.addClass(e.options.animationClasses.classout), e.supportAnimations ? e.$menu.on(e.animEndEventName, l) : l.call(), e.options.onLevelClick(s, s.children("a:first").text())
                        }), !1
                    }
                    e.options.onLinkClick(s, t)
                }
            }), this.$back.on("click.dlmenu", function(i) {
                var t = n(this),
                    s = t.parents("ul.dl-submenu:first"),
                    o = s.parent(),
                    a = s.clone().insertAfter(e.$menu),
                    l = function() {
                        e.$menu.off(e.animEndEventName).removeClass(e.options.animationClasses.classin), a.remove()
                    };
                return setTimeout(function() {
                    a.addClass(e.options.animationClasses.classout), e.$menu.addClass(e.options.animationClasses.classin), e.supportAnimations ? e.$menu.on(e.animEndEventName, l) : l.call(), o.removeClass("dl-subviewopen");
                    var n = t.parents(".dl-subview:first");
                    n.is("li") && n.addClass("dl-subviewopen"), n.removeClass("dl-subview")
                }), !1
            })
        },
        closeMenu: function() {
            this.open && this._closeMenu()
        },
        _closeMenu: function() {
            var n = this,
                i = function() {
                    n.$menu.off(n.transEndEventName), n._resetMenu()
                };
            this.$menu.removeClass("dl-menuopen"), this.$menu.addClass("dl-menu-toggle"), this.$trigger.removeClass("dl-active"), this.supportTransitions ? this.$menu.on(this.transEndEventName, i) : i.call(), this.open = !1
        },
        openMenu: function() {
            this.open || this._openMenu()
        },
        _openMenu: function() {
            var i = this;
            s.off("click").on("click.dlmenu", function() {
                i._closeMenu()
            }), this.$menu.addClass("dl-menuopen dl-menu-toggle").on(this.transEndEventName, function() {
                n(this).removeClass("dl-menu-toggle")
            }), this.$trigger.addClass("dl-active"), this.open = !0
        },
        _resetMenu: function() {
            this.$menu.removeClass("dl-subview"), this.$menuitems.removeClass("dl-subview dl-subviewopen")
        }
    };
    var o = function(n) {
        i.console && i.console.error(n)
    };
    n.fn.dlmenu = function(i) {
        if ("string" == typeof i) {
            var e = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var t = n.data(this, "dlmenu");
                return t ? n.isFunction(t[i]) && "_" !== i.charAt(0) ? void t[i].apply(t, e) : void o("no such method '" + i + "' for dlmenu instance") : void o("cannot call methods on dlmenu prior to initialization; attempted to call method '" + i + "'")
            })
        } else this.each(function() {
            var e = n.data(this, "dlmenu");
            e ? e._init() : e = n.data(this, "dlmenu", new n.DLMenu(i, this))
        });
        return this
    }
}(jQuery, window);