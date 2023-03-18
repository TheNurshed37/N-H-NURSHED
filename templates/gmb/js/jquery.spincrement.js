! function(e) {
    e.extend(e.easing, {
        spincrementEasing: function(e, t, n, a, i) {
            return t == i ? n + a : a * (-Math.pow(2, -10 * t / i) + 1) + n
        }
    }), e.fn.spincrement = function(t) {
        function n(e) {
            if (e = e.toFixed(i.decimalPlaces), i.decimalPlaces > 0 && "." != i.decimalPoint && (e = e.replace(".", i.decimalPoint)), i.thousandSeparator)
                for (; o.test(e);) e = e.replace(o, "$1" + i.thousandSeparator + "$2");
            return e
        }
        var a = {
                from: 0,
                to: !1,
                decimalPlaces: 0,
                decimalPoint: ".",
                thousandSeparator: ",",
                duration: 1e3,
                leeway: 50,
                easing: "spincrementEasing",
                fade: !0
            },
            i = e.extend(a, t),
            o = new RegExp(/^(-?[0-9]+)([0-9]{3})/);
        return this.each(function() {
            var t = e(this),
                a = i.from,
                o = 0 != i.to ? i.to : parseFloat(t.html()),
                r = i.duration;
            i.leeway && (r += Math.round(i.duration * ((2 * Math.random() - 1) * i.leeway / 100))), t.css("counter", a), i.fade && t.css("opacity", 0), t.animate({
                counter: o,
                opacity: 1
            }, {
                easing: i.easing,
                duration: r,
                step: function(e) {
                    t.css("visibility", "visible"), t.html(n(e * o))
                },
                complete: function() {
                    t.css("counter", null), t.html(n(o))
                }
            })
        })
    }
}(jQuery);