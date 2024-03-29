! function(t) {
    t.fn.twentytwenty = function(e) {
        var e = t.extend({
            default_offset_pct: .5,
            orientation: "horizontal"
        }, e);
        return this.each(function() {
            var n = e.default_offset_pct,
                i = t(this),
                a = e.orientation,
                s = "vertical" === a ? "down" : "left",
                d = "vertical" === a ? "up" : "right";
            i.wrap("<div class='twentytwenty-wrapper twentytwenty-" + a + "'></div>"), i.append("<div class='twentytwenty-overlay'></div>");
            var r = i.find("img:first"),
                w = i.find("img:last");
            i.append("<div class='twentytwenty-handle'></div>");
            var c = i.find(".twentytwenty-handle");
            c.append("<span class='twentytwenty-" + s + "-arrow'></span>"), c.append("<span class='twentytwenty-" + d + "-arrow'></span>"), i.addClass("twentytwenty-container"), r.addClass("twentytwenty-before"), w.addClass("twentytwenty-after");
            var o = i.find(".twentytwenty-overlay");
            o.append("<div class='twentytwenty-before-label'></div>"), o.append("<div class='twentytwenty-after-label'></div>");
            var f = function(t) {
                    var e = r.width(),
                        n = r.height();
                    return {
                        w: e + "px",
                        h: n + "px",
                        cw: t * e + "px",
                        ch: t * n + "px"
                    }
                },
                l = function(t) {
                    "vertical" === a ? r.css("clip", "rect(0," + t.w + "," + t.ch + ",0)") : r.css("clip", "rect(0," + t.cw + "," + t.h + ",0)"), i.css("height", t.h)
                },
                v = function(t) {
                    var e = f(t);
                    c.css("vertical" === a ? "top" : "left", "vertical" === a ? e.ch : e.cw), l(e)
                };
            t(window).on("resize.twentytwenty", function(t) {
                v(n)
            });
            var p = 0,
                y = 0;
            c.on("movestart", function(t) {
                (t.distX > t.distY && t.distX < -t.distY || t.distX < t.distY && t.distX > -t.distY) && "vertical" !== a ? t.preventDefault() : (t.distX < t.distY && t.distX < -t.distY || t.distX > t.distY && t.distX > -t.distY) && "vertical" === a && t.preventDefault(), i.addClass("active"), p = i.offset().left, offsetY = i.offset().top, y = r.width(), imgHeight = r.height()
            }), c.on("moveend", function(t) {
                i.removeClass("active")
            }), c.on("move", function(t) {
                i.hasClass("active") && (n = "vertical" === a ? (t.pageY - offsetY) / imgHeight : (t.pageX - p) / y, 0 > n && (n = 0), n > 1 && (n = 1), v(n))
            }), i.find("img").on("mousedown", function(t) {
                t.preventDefault()
            }), t(window).trigger("resize.twentytwenty")
        })
    }
}(jQuery);