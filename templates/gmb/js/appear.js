! function(e) {
    e.fn.appear = function(a, t) {
        var n = e.extend({
            data: void 0,
            one: !0,
            accX: 0,
            accY: 0
        }, t);
        return this.each(function() {
            var t = e(this);
            if (t.appeared = !1, !a) return void t.trigger("appear", n.data);
            var r = e(window),
                o = function() {
                    if (!t.is(":visible")) return void(t.appeared = !1);
                    var e = r.scrollLeft(),
                        a = r.scrollTop(),
                        o = t.offset(),
                        p = o.left,
                        c = o.top,
                        f = n.accX,
                        i = n.accY,
                        l = t.height(),
                        s = r.height(),
                        u = t.width(),
                        d = r.width();
                    c + l + i >= a && a + s + i >= c && p + u + f >= e && e + d + f >= p ? t.appeared || t.trigger("appear", n.data) : t.appeared = !1
                },
                p = function() {
                    if (t.appeared = !0, n.one) {
                        r.unbind("scroll", o);
                        var p = e.inArray(o, e.fn.appear.checks);
                        p >= 0 && e.fn.appear.checks.splice(p, 1)
                    }
                    a.apply(this, arguments)
                };
            n.one ? t.one("appear", n.data, p) : t.bind("appear", n.data, p), r.scroll(o), e.fn.appear.checks.push(o), o()
        })
    }, e.extend(e.fn.appear, {
        checks: [],
        timeout: null,
        checkAll: function() {
            var a = e.fn.appear.checks.length;
            if (a > 0)
                for (; a--;) e.fn.appear.checks[a]()
        },
        run: function() {
            e.fn.appear.timeout && clearTimeout(e.fn.appear.timeout), e.fn.appear.timeout = setTimeout(e.fn.appear.checkAll, 20)
        }
    }), e.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function(a, t) {
        var n = e.fn[t];
        n && (e.fn[t] = function() {
            var a = n.apply(this, arguments);
            return e.fn.appear.run(), a
        })
    })
}(jQuery),
function(e) {
    e.fn.countTo = function(a) {
        a = e.extend({}, e.fn.countTo.defaults, a || {});
        var t = Math.ceil(a.speed / a.refreshInterval),
            n = (a.to - a.from) / t;
        return e(this).each(function() {
            function r() {
                c += n, p++, e(o).html(c.toFixed(a.decimals)), "function" == typeof a.onUpdate && a.onUpdate.call(o, c), p >= t && (clearInterval(f), c = a.to, "function" == typeof a.onComplete && a.onComplete.call(o, c))
            }
            var o = this,
                p = 0,
                c = a.from,
                f = setInterval(r, a.refreshInterval)
        })
    }, e.fn.countTo.defaults = {
        from: 0,
        to: 100,
        speed: 1e3,
        refreshInterval: 100,
        decimals: 0,
        onUpdate: null,
        onComplete: null
    }
}(jQuery);