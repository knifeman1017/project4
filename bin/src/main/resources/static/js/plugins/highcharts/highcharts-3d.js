/*
 Highcharts JS v4.0.4 (2014-09-02)

 (c) 2009-2013 Torstein Hønsi

 License: www.highcharts.com/license
 */
(function (d) {
    function x(f, a, b, c) {
        var e, g, j;
        b *= t;
        a *= t;
        var i = [], h, k, o;
        b *= -1;
        h = c.x;
        k = c.y;
        o = (c.z === 0 ? 1.0E-4 : c.z) * (c.vd || 25);
        o = Math.max(500, o);
        var q = l(b), n = m(b), r = l(a), s = m(a), p, v, u;
        d.each(f, function (a) {
            p = a.x - h;
            v = a.y - k;
            u = a.z || 0;
            e = n * p - q * u;
            g = -q * r * p - n * r * u + s * v;
            j = q * s * p + n * s * u + r * v;
            e = e * ((o - j) / o) + h;
            g = g * ((o - j) / o) + k;
            i.push({x: z(e), y: z(g), z: z(j)})
        });
        return i
    }

    function A(f) {
        return f !== void 0 && f !== null
    }

    function w(f, a, b, c, e, g, d, i) {
        var h = [];
        return g > e && g - e > n / 2 + 1.0E-4 ? (h = h.concat(w(f, a, b, c, e, e + n / 2, d, i)), h = h.concat(w(f, a,
            b, c, e + n / 2, g, d, i))) : g < e && e - g > n / 2 + 1.0E-4 ? (h = h.concat(w(f, a, b, c, e, e - n / 2, d, i)), h = h.concat(w(f, a, b, c, e - n / 2, g, d, i))) : (h = g - e, ["C", f + b * m(e) - b * B * h * l(e) + d, a + c * l(e) + c * B * h * m(e) + i, f + b * m(g) + b * B * h * l(g) + d, a + c * l(g) - c * B * h * m(g) + i, f + b * m(g) + d, a + c * l(g) + i])
    }

    function D(f) {
        if (this.chart.is3d()) {
            var a = this.chart.options.plotOptions.column.grouping;
            a !== void 0 && !a && this.group.zIndex !== void 0 && this.group.attr({zIndex: this.group.zIndex * 10});
            var b = this.options, c = this.options.states;
            this.borderWidth = b.borderWidth = b.edgeWidth || 1;
            d.each(this.data, function (a) {
                if (a.y !== null)a = a.pointAttr, this.borderColor = d.pick(b.edgeColor, a[""].fill), a[""].stroke = this.borderColor, a.hover.stroke = d.pick(c.hover.edgeColor, this.borderColor), a.select.stroke = d.pick(c.select.edgeColor, this.borderColor)
            })
        }
        f.apply(this, [].slice.call(arguments, 1))
    }

    var n = Math.PI, t = n / 180, l = Math.sin, m = Math.cos, z = Math.round, B = 4 * (Math.sqrt(2) - 1) / 3 / (n / 2);
    d.SVGRenderer.prototype.toLinePath = function (f, a) {
        var b = [];
        d.each(f, function (a) {
            b.push("L", a.x, a.y)
        });
        b[0] = "M";
        a && b.push("Z");
        return b
    };
    d.SVGRenderer.prototype.cuboid = function (f) {
        var a = this.g(), f = this.cuboidPath(f);
        a.front = this.path(f[0]).attr({zIndex: f[3], "stroke-linejoin": "round"}).add(a);
        a.top = this.path(f[1]).attr({zIndex: f[4], "stroke-linejoin": "round"}).add(a);
        a.side = this.path(f[2]).attr({zIndex: f[5], "stroke-linejoin": "round"}).add(a);
        a.fillSetter = function (a) {
            var c = d.Color(a).brighten(0.1).get(), e = d.Color(a).brighten(-0.1).get();
            this.front.attr({fill: a});
            this.top.attr({fill: c});
            this.side.attr({fill: e});
            this.color = a;
            return this
        };
        a.opacitySetter = function (a) {
            this.front.attr({opacity: a});
            this.top.attr({opacity: a});
            this.side.attr({opacity: a});
            return this
        };
        a.attr = function (a) {
            a.shapeArgs || A(a.x) ? (a = this.renderer.cuboidPath(a.shapeArgs || a), this.front.attr({
                d: a[0],
                zIndex: a[3]
            }), this.top.attr({d: a[1], zIndex: a[4]}), this.side.attr({
                d: a[2],
                zIndex: a[5]
            })) : d.SVGElement.prototype.attr.call(this, a);
            return this
        };
        a.animate = function (a, c, e) {
            A(a.x) && A(a.y) ? (a = this.renderer.cuboidPath(a), this.front.attr({zIndex: a[3]}).animate({d: a[0]},
                c, e), this.top.attr({zIndex: a[4]}).animate({d: a[1]}, c, e), this.side.attr({zIndex: a[5]}).animate({d: a[2]}, c, e)) : a.opacity ? (this.front.animate(a, c, e), this.top.animate(a, c, e), this.side.animate(a, c, e)) : d.SVGElement.prototype.animate.call(this, a, c, e);
            return this
        };
        a.destroy = function () {
            this.front.destroy();
            this.top.destroy();
            this.side.destroy();
            return null
        };
        a.attr({zIndex: -f[3]});
        return a
    };
    d.SVGRenderer.prototype.cuboidPath = function (d) {
        var a = d.x, b = d.y, c = d.z, e = d.height, g = d.width, j = d.depth, i = d.alpha, h = d.beta,
            a = [{x: a, y: b, z: c}, {x: a + g, y: b, z: c}, {x: a + g, y: b + e, z: c}, {x: a, y: b + e, z: c}, {
                x: a,
                y: b + e,
                z: c + j
            }, {x: a + g, y: b + e, z: c + j}, {x: a + g, y: b, z: c + j}, {
                x: a,
                y: b,
                z: c + j
            }], a = x(a, i, h, d.origin), d = ["M", a[0].x, a[0].y, "L", a[7].x, a[7].y, "L", a[6].x, a[6].y, "L", a[1].x, a[1].y, "Z"], b = ["M", a[3].x, a[3].y, "L", a[2].x, a[2].y, "L", a[5].x, a[5].y, "L", a[4].x, a[4].y, "Z"], c = ["M", a[1].x, a[1].y, "L", a[2].x, a[2].y, "L", a[5].x, a[5].y, "L", a[6].x, a[6].y, "Z"], e = ["M", a[0].x, a[0].y, "L", a[7].x, a[7].y, "L", a[4].x, a[4].y, "L", a[3].x, a[3].y, "Z"];
        return [["M", a[0].x, a[0].y,
            "L", a[1].x, a[1].y, "L", a[2].x, a[2].y, "L", a[3].x, a[3].y, "Z"], a[7].y < a[1].y ? d : a[4].y > a[2].y ? b : [], a[6].x > a[1].x ? c : a[7].x < a[0].x ? e : [], (a[0].z + a[1].z + a[2].z + a[3].z) / 4, h > 0 ? (a[0].z + a[7].z + a[6].z + a[1].z) / 4 : (a[3].z + a[2].z + a[5].z + a[4].z) / 4, i > 0 ? (a[1].z + a[2].z + a[5].z + a[6].z) / 4 : (a[0].z + a[7].z + a[4].z + a[3].z) / 4]
    };
    d.SVGRenderer.prototype.arc3d = function (f) {
        f.alpha *= t;
        f.beta *= t;
        var a = this.g(), b = this.arc3dPath(f), c = a.renderer, e = b.zTop * 100;
        a.shapeArgs = f;
        a.top = c.path(b.top).attr({zIndex: b.zTop}).add(a);
        a.side1 = c.path(b.side2).attr({zIndex: b.zSide2});
        a.side2 = c.path(b.side1).attr({zIndex: b.zSide1});
        a.inn = c.path(b.inn).attr({zIndex: b.zInn});
        a.out = c.path(b.out).attr({zIndex: b.zOut});
        a.fillSetter = function (a) {
            this.color = a;
            var b = d.Color(a).brighten(-0.1).get();
            this.side1.attr({fill: b});
            this.side2.attr({fill: b});
            this.inn.attr({fill: b});
            this.out.attr({fill: b});
            this.top.attr({fill: a});
            return this
        };
        a.translateXSetter = function (a) {
            this.out.attr({translateX: a});
            this.inn.attr({translateX: a});
            this.side1.attr({translateX: a});
            this.side2.attr({translateX: a});
            this.top.attr({translateX: a})
        };
        a.translateYSetter = function (a) {
            this.out.attr({translateY: a});
            this.inn.attr({translateY: a});
            this.side1.attr({translateY: a});
            this.side2.attr({translateY: a});
            this.top.attr({translateY: a})
        };
        a.animate = function (a, b, c) {
            A(a.end) || A(a.start) ? (this._shapeArgs = this.shapeArgs, d.SVGElement.prototype.animate.call(this, {_args: a}, {
                duration: b, step: function () {
                    var a = arguments[1], b = a.elem, c = b._shapeArgs, e = a.end, a = a.pos, c = d.merge(c, {
                        x: c.x + (e.x - c.x) * a,
                        y: c.y + (e.y - c.y) * a,
                        r: c.r + (e.r - c.r) * a,
                        innerR: c.innerR + (e.innerR - c.innerR) *
                        a,
                        start: c.start + (e.start - c.start) * a,
                        end: c.end + (e.end - c.end) * a
                    }), e = b.renderer.arc3dPath(c);
                    b.shapeArgs = c;
                    b.top.attr({d: e.top, zIndex: e.zTop});
                    b.inn.attr({d: e.inn, zIndex: e.zInn});
                    b.out.attr({d: e.out, zIndex: e.zOut});
                    b.side1.attr({d: e.side1, zIndex: e.zSide1});
                    b.side2.attr({d: e.side2, zIndex: e.zSide2})
                }
            }, c)) : d.SVGElement.prototype.animate.call(this, a, b, c);
            return this
        };
        a.destroy = function () {
            this.top.destroy();
            this.out.destroy();
            this.inn.destroy();
            this.side1.destroy();
            this.side2.destroy();
            d.SVGElement.prototype.destroy.call(this)
        };
        a.hide = function () {
            this.top.hide();
            this.out.hide();
            this.inn.hide();
            this.side1.hide();
            this.side2.hide()
        };
        a.show = function () {
            this.top.show();
            this.out.show();
            this.inn.show();
            this.side1.show();
            this.side2.show()
        };
        a.zIndex = e;
        a.attr({zIndex: e});
        return a
    };
    d.SVGRenderer.prototype.arc3dPath = function (d) {
        var a = d.x, b = d.y, c = d.start, e = d.end - 1.0E-5, g = d.r, j = d.innerR, i = d.depth, h = d.alpha, k = d.beta, o = m(c), q = l(c), d = m(e), y = l(e), r = g * m(k), s = g * m(h), p = j * m(k);
        j *= m(h);
        var v = i * l(k), u = i * l(h), i = ["M", a + r * o, b + s * q], i = i.concat(w(a, b,
            r, s, c, e, 0, 0)), i = i.concat(["L", a + p * d, b + j * y]), i = i.concat(w(a, b, p, j, e, c, 0, 0)), i = i.concat(["Z"]), k = k > 0 ? n / 2 : 0, h = h > 0 ? 0 : n / 2, k = c > -k ? c : e > -k ? -k : c, t = e < n - h ? e : c < n - h ? n - h : e, h = ["M", a + r * m(k), b + s * l(k)], h = h.concat(w(a, b, r, s, k, t, 0, 0)), h = h.concat(["L", a + r * m(t) + v, b + s * l(t) + u]), h = h.concat(w(a, b, r, s, t, k, v, u)), h = h.concat(["Z"]), k = ["M", a + p * o, b + j * q], k = k.concat(w(a, b, p, j, c, e, 0, 0)), k = k.concat(["L", a + p * m(e) + v, b + j * l(e) + u]), k = k.concat(w(a, b, p, j, e, c, v, u)), k = k.concat(["Z"]), o = ["M", a + r * o, b + s * q, "L", a + r * o + v, b + s * q + u, "L", a + p * o + v, b + j * q +
        u, "L", a + p * o, b + j * q, "Z"], a = ["M", a + r * d, b + s * y, "L", a + r * d + v, b + s * y + u, "L", a + p * d + v, b + j * y + u, "L", a + p * d, b + j * y, "Z"], b = l((c + e) / 2), c = l(c), e = l(e);
        return {
            top: i,
            zTop: g,
            out: h,
            zOut: Math.max(b, c, e) * g,
            inn: k,
            zInn: Math.max(b, c, e) * g,
            side1: o,
            zSide1: c * g * 0.99,
            side2: a,
            zSide2: e * g * 0.99
        }
    };
    d.Chart.prototype.is3d = function () {
        return this.options.chart.options3d && this.options.chart.options3d.enabled
    };
    d.wrap(d.Chart.prototype, "isInsidePlot", function (d) {
        return this.is3d() ? !0 : d.apply(this, [].slice.call(arguments, 1))
    });
    d.getOptions().chart.options3d =
    {
        enabled: !1,
        alpha: 0,
        beta: 0,
        depth: 100,
        viewDistance: 25,
        frame: {
            bottom: {size: 1, color: "rgba(255,255,255,0)"},
            side: {size: 1, color: "rgba(255,255,255,0)"},
            back: {size: 1, color: "rgba(255,255,255,0)"}
        }
    };
    d.wrap(d.Chart.prototype, "init", function (f) {
        var a = [].slice.call(arguments, 1), b;
        if (a[0].chart.options3d && a[0].chart.options3d.enabled)b = a[0].plotOptions || {}, b = b.pie || {}, b.borderColor = d.pick(b.borderColor, void 0);
        f.apply(this, a)
    });
    d.wrap(d.Chart.prototype, "setChartSize", function (d) {
        d.apply(this, [].slice.call(arguments,
            1));
        if (this.is3d()) {
            var a = this.inverted, b = this.clipBox, c = this.margin;
            b[a ? "y" : "x"] = -(c[3] || 0);
            b[a ? "x" : "y"] = -(c[0] || 0);
            b[a ? "height" : "width"] = this.chartWidth + (c[3] || 0) + (c[1] || 0);
            b[a ? "width" : "height"] = this.chartHeight + (c[0] || 0) + (c[2] || 0)
        }
    });
    d.wrap(d.Chart.prototype, "redraw", function (d) {
        if (this.is3d())this.isDirtyBox = !0;
        d.apply(this, [].slice.call(arguments, 1))
    });
    d.Chart.prototype.retrieveStacks = function (f, a) {
        var b = {}, c = 1;
        if (f || !a)return this.series;
        d.each(this.series, function (a) {
            b[a.options.stack || 0] ?
                b[a.options.stack || 0].series.push(a) : (b[a.options.stack || 0] = {series: [a], position: c}, c++)
        });
        b.totalStacks = c + 1;
        return b
    };
    d.wrap(d.Axis.prototype, "init", function (f) {
        var a = arguments;
        if (a[1].is3d())a[2].tickWidth = d.pick(a[2].tickWidth, 0), a[2].gridLineWidth = d.pick(a[2].gridLineWidth, 1);
        f.apply(this, [].slice.call(arguments, 1))
    });
    d.wrap(d.Axis.prototype, "render", function (d) {
        d.apply(this, [].slice.call(arguments, 1));
        if (this.chart.is3d()) {
            var a = this.chart, b = a.renderer, c = a.options.chart.options3d, e = c.alpha, g =
                c.beta * (a.yAxis[0].opposite ? -1 : 1), j = c.frame, i = j.bottom, h = j.back, j = j.side, k = c.depth, o = this.height, q = this.width, l = this.left, m = this.top, c = {
                x: a.plotLeft + a.plotWidth / 2,
                y: a.plotTop + a.plotHeight / 2,
                z: k,
                vd: c.viewDistance
            };
            if (this.horiz)this.axisLine && this.axisLine.hide(), g = {
                x: l,
                y: m + (a.yAxis[0].reversed ? -i.size : o),
                z: 0,
                width: q,
                height: i.size,
                depth: k,
                alpha: e,
                beta: g,
                origin: c
            }, this.bottomFrame ? this.bottomFrame.animate(g) : this.bottomFrame = b.cuboid(g).attr({
                fill: i.color,
                zIndex: a.yAxis[0].reversed && e > 0 ? 4 : -1
            }).css({stroke: i.color}).add();
            else {
                var n = {
                    x: l,
                    y: m,
                    z: k + 1,
                    width: q,
                    height: o + i.size,
                    depth: h.size,
                    alpha: e,
                    beta: g,
                    origin: c
                };
                this.backFrame ? this.backFrame.animate(n) : this.backFrame = b.cuboid(n).attr({
                    fill: h.color,
                    zIndex: -3
                }).css({stroke: h.color}).add();
                this.axisLine && this.axisLine.hide();
                a = {
                    x: (a.yAxis[0].opposite ? q : 0) + l - j.size,
                    y: m,
                    z: 0,
                    width: j.size,
                    height: o + i.size,
                    depth: k + h.size,
                    alpha: e,
                    beta: g,
                    origin: c
                };
                this.sideFrame ? this.sideFrame.animate(a) : this.sideFrame = b.cuboid(a).attr({
                    fill: j.color,
                    zIndex: -2
                }).css({stroke: j.color}).add()
            }
        }
    });
    d.wrap(d.Axis.prototype,
        "getPlotLinePath", function (d) {
            var a = d.apply(this, [].slice.call(arguments, 1));
            if (!this.chart.is3d())return a;
            if (a === null)return a;
            var b = this.chart, c = b.options.chart.options3d, e = c.depth;
            c.origin = {x: b.plotLeft + b.plotWidth / 2, y: b.plotTop + b.plotHeight / 2, z: e, vd: c.viewDistance};
            var a = [{x: a[1], y: a[2], z: this.horiz || this.opposite ? e : 0}, {x: a[1], y: a[2], z: e}, {
                x: a[4],
                y: a[5],
                z: e
            }, {
                x: a[4],
                y: a[5],
                z: this.horiz || this.opposite ? 0 : e
            }], e = b.options.inverted ? c.beta : c.alpha, g = b.options.inverted ? c.alpha : c.beta;
            g *= b.yAxis[0].opposite ?
                -1 : 1;
            a = x(a, e, g, c.origin);
            return a = this.chart.renderer.toLinePath(a, !1)
        });
    d.wrap(d.Axis.prototype, "getPlotBandPath", function (d) {
        if (this.chart.is3d()) {
            var a = arguments, b = a[1], a = this.getPlotLinePath(a[2]);
            (b = this.getPlotLinePath(b)) && a ? b.push(a[7], a[8], a[4], a[5], a[1], a[2]) : b = null;
            return b
        } else return d.apply(this, [].slice.call(arguments, 1))
    });
    d.wrap(d.Tick.prototype, "getMarkPath", function (d) {
        var a = d.apply(this, [].slice.call(arguments, 1));
        if (!this.axis.chart.is3d())return a;
        var b = this.axis.chart, c = b.options.chart.options3d,
            e = {
                x: b.plotLeft + b.plotWidth / 2,
                y: b.plotTop + b.plotHeight / 2,
                z: c.depth,
                vd: c.viewDistance
            }, a = [{x: a[1], y: a[2], z: 0}, {
                x: a[4],
                y: a[5],
                z: 0
            }], g = b.inverted ? c.beta : c.alpha, c = b.inverted ? c.alpha : c.beta;
        c *= b.yAxis[0].opposite ? -1 : 1;
        a = x(a, g, c, e);
        return a = ["M", a[0].x, a[0].y, "L", a[1].x, a[1].y]
    });
    d.wrap(d.Tick.prototype, "getLabelPosition", function (d) {
        var a = d.apply(this, [].slice.call(arguments, 1));
        if (!this.axis.chart.is3d())return a;
        var b = this.axis.chart, c = b.options.chart.options3d, e = {
            x: b.plotLeft + b.plotWidth / 2, y: b.plotTop +
            b.plotHeight / 2, z: c.depth, vd: c.viewDistance
        }, g = b.inverted ? c.beta : c.alpha, c = b.inverted ? c.alpha : c.beta;
        c *= b.yAxis[0].opposite ? -1 : 1;
        return a = x([{x: a.x, y: a.y, z: 0}], g, c, e)[0]
    });
    d.wrap(d.Axis.prototype, "drawCrosshair", function (d) {
        var a = arguments;
        this.chart.is3d() && a[2] && (a[2] = {plotX: a[2].plotXold || a[2].plotX, plotY: a[2].plotYold || a[2].plotY});
        d.apply(this, [].slice.call(a, 1))
    });
    d.wrap(d.seriesTypes.column.prototype, "translate", function (f) {
        f.apply(this, [].slice.call(arguments, 1));
        if (this.chart.is3d()) {
            var a =
                this.chart, b = this.options, c = a.options.chart.options3d, e = b.depth || 25, g = {
                x: a.plotWidth / 2,
                y: a.plotHeight / 2,
                z: c.depth,
                vd: c.viewDistance
            }, j = c.alpha, i = c.beta * (a.yAxis[0].opposite ? -1 : 1), h = (b.stacking ? b.stack || 0 : this._i) * (e + (b.groupZPadding || 1));
            b.grouping !== !1 && (h = 0);
            h += b.groupZPadding || 1;
            d.each(this.data, function (a) {
                if (a.y !== null) {
                    var b = a.shapeArgs, c = a.tooltipPos;
                    a.shapeType = "cuboid";
                    b.alpha = j;
                    b.beta = i;
                    b.z = h;
                    b.origin = g;
                    b.depth = e;
                    c = x([{x: c[0], y: c[1], z: h}], j, i, g)[0];
                    a.tooltipPos = [c.x, c.y]
                }
            })
        }
    });
    d.wrap(d.seriesTypes.column.prototype,
        "animate", function (f) {
            if (this.chart.is3d()) {
                var a = arguments[1], b = this.yAxis, c = this, e = this.yAxis.reversed;
                if (d.svg)a ? d.each(c.data, function (a) {
                    if (a.y !== null && (a.height = a.shapeArgs.height, a.shapey = a.shapeArgs.y, a.shapeArgs.height = 1, !e))a.shapeArgs.y = a.stackY ? a.plotY + b.translate(a.stackY) : a.plotY + (a.negative ? -a.height : a.height)
                }) : (d.each(c.data, function (a) {
                    if (a.y !== null)a.shapeArgs.height = a.height, a.shapeArgs.y = a.shapey, a.graphic && a.graphic.animate(a.shapeArgs, c.options.animation)
                }), this.drawDataLabels(),
                    c.animate = null)
            } else f.apply(this, [].slice.call(arguments, 1))
        });
    d.wrap(d.seriesTypes.column.prototype, "init", function (d) {
        d.apply(this, [].slice.call(arguments, 1));
        if (this.chart.is3d()) {
            var a = this.options, b = a.grouping, c = a.stacking, e = 0;
            if ((b === void 0 || b) && c) {
                b = this.chart.retrieveStacks(b, c);
                c = a.stack || 0;
                for (e = 0; e < b[c].series.length; e++)if (b[c].series[e] === this)break;
                e = b.totalStacks * 10 - 10 * (b.totalStacks - b[c].position) - e
            }
            a.zIndex = e
        }
    });
    d.wrap(d.Series.prototype, "alignDataLabel", function (d) {
        if (this.chart.is3d() &&
            (this.type === "column" || this.type === "columnrange")) {
            var a = this.chart, b = a.options.chart.options3d, c = arguments[4], e = {
                x: c.x,
                y: c.y,
                z: 0
            }, e = x([e], b.alpha, b.beta * (a.yAxis[0].opposite ? -1 : 1), {
                x: a.plotWidth / 2,
                y: a.plotHeight / 2,
                z: b.depth,
                vd: b.viewDistance
            })[0];
            c.x = e.x;
            c.y = e.y
        }
        d.apply(this, [].slice.call(arguments, 1))
    });
    d.seriesTypes.columnrange && d.wrap(d.seriesTypes.columnrange.prototype, "drawPoints", D);
    d.wrap(d.seriesTypes.column.prototype, "drawPoints", D);
    var C = d.getOptions();
    C.plotOptions.cylinder = d.merge(C.plotOptions.column);
    C = d.extendClass(d.seriesTypes.column, {type: "cylinder"});
    d.seriesTypes.cylinder = C;
    d.wrap(d.seriesTypes.cylinder.prototype, "translate", function (f) {
        f.apply(this, [].slice.call(arguments, 1));
        if (this.chart.is3d()) {
            var a = this.chart, b = a.options, c = b.plotOptions.cylinder, b = b.chart.options3d, e = c.depth || 0, g = {
                x: a.inverted ? a.plotHeight / 2 : a.plotWidth / 2,
                y: a.inverted ? a.plotWidth / 2 : a.plotHeight / 2,
                z: b.depth,
                vd: b.viewDistance
            }, j = b.alpha, i = c.stacking ? (this.options.stack || 0) * e : this._i * e;
            i += e / 2;
            c.grouping !== !1 && (i = 0);
            d.each(this.data,
                function (a) {
                    var b = a.shapeArgs;
                    a.shapeType = "arc3d";
                    b.x += e / 2;
                    b.z = i;
                    b.start = 0;
                    b.end = 2 * n;
                    b.r = e * 0.95;
                    b.innerR = 0;
                    b.depth = b.height * (1 / l((90 - j) * t)) - i;
                    b.alpha = 90 - j;
                    b.beta = 0;
                    b.origin = g
                })
        }
    });
    d.wrap(d.seriesTypes.pie.prototype, "translate", function (f) {
        f.apply(this, [].slice.call(arguments, 1));
        if (this.chart.is3d()) {
            var a = this, b = a.chart, c = a.options, e = c.depth || 0, g = b.options.chart.options3d, j = {
                x: b.plotWidth / 2,
                y: b.plotHeight / 2,
                z: g.depth
            }, i = g.alpha, h = g.beta, k = c.stacking ? (c.stack || 0) * e : a._i * e;
            k += e / 2;
            c.grouping !== !1 &&
            (k = 0);
            d.each(a.data, function (b) {
                b.shapeType = "arc3d";
                var c = b.shapeArgs;
                if (b.y)c.z = k, c.depth = e * 0.75, c.origin = j, c.alpha = i, c.beta = h, c = (c.end + c.start) / 2, b.slicedTranslation = {
                    translateX: z(m(c) * a.options.slicedOffset * m(i * t)),
                    translateY: z(l(c) * a.options.slicedOffset * m(i * t))
                }
            })
        }
    });
    d.wrap(d.seriesTypes.pie.prototype.pointClass.prototype, "haloPath", function (d) {
        var a = arguments;
        return this.series.chart.is3d() ? [] : d.call(this, a[1])
    });
    d.wrap(d.seriesTypes.pie.prototype, "drawPoints", function (f) {
        if (this.chart.is3d()) {
            var a =
                this.options, b = this.options.states;
            this.borderWidth = a.borderWidth = a.edgeWidth || 1;
            this.borderColor = a.edgeColor = d.pick(a.edgeColor, a.borderColor, void 0);
            b.hover.borderColor = d.pick(b.hover.edgeColor, this.borderColor);
            b.hover.borderWidth = d.pick(b.hover.edgeWidth, this.borderWidth);
            b.select.borderColor = d.pick(b.select.edgeColor, this.borderColor);
            b.select.borderWidth = d.pick(b.select.edgeWidth, this.borderWidth);
            d.each(this.data, function (a) {
                var c = a.pointAttr;
                c[""].stroke = a.series.borderColor || a.color;
                c[""]["stroke-width"] =
                    a.series.borderWidth;
                c.hover.stroke = b.hover.borderColor;
                c.hover["stroke-width"] = b.hover.borderWidth;
                c.select.stroke = b.select.borderColor;
                c.select["stroke-width"] = b.select.borderWidth
            })
        }
        f.apply(this, [].slice.call(arguments, 1));
        if (this.chart.is3d()) {
            var c = this.group;
            d.each(this.points, function (a) {
                a.graphic.out.add(c);
                a.graphic.inn.add(c);
                a.graphic.side1.add(c);
                a.graphic.side2.add(c)
            })
        }
    });
    d.wrap(d.seriesTypes.pie.prototype, "drawDataLabels", function (f) {
        this.chart.is3d() && d.each(this.data, function (a) {
            var b =
                a.shapeArgs, c = b.r, d = b.depth, f = b.alpha * t, b = (b.start + b.end) / 2, a = a.labelPos;
            a[1] += -c * (1 - m(f)) * l(b) + (l(b) > 0 ? l(f) * d : 0);
            a[3] += -c * (1 - m(f)) * l(b) + (l(b) > 0 ? l(f) * d : 0);
            a[5] += -c * (1 - m(f)) * l(b) + (l(b) > 0 ? l(f) * d : 0)
        });
        f.apply(this, [].slice.call(arguments, 1))
    });
    d.wrap(d.seriesTypes.pie.prototype, "addPoint", function (d) {
        d.apply(this, [].slice.call(arguments, 1));
        this.chart.is3d() && this.update()
    });
    d.wrap(d.seriesTypes.pie.prototype, "animate", function (f) {
        if (this.chart.is3d()) {
            var a = arguments[1], b = this.options.animation, c = this.center,
                e = this.group, g = this.markerGroup;
            if (d.svg)if (b === !0 && (b = {}), a) {
                if (e.oldtranslateX = e.translateX, e.oldtranslateY = e.translateY, a = {
                        translateX: c[0],
                        translateY: c[1],
                        scaleX: 0.001,
                        scaleY: 0.001
                    }, e.attr(a), g)g.attrSetters = e.attrSetters, g.attr(a)
            } else a = {
                translateX: e.oldtranslateX,
                translateY: e.oldtranslateY,
                scaleX: 1,
                scaleY: 1
            }, e.animate(a, b), g && g.animate(a, b), this.animate = null
        } else f.apply(this, [].slice.call(arguments, 1))
    });
    d.wrap(d.seriesTypes.scatter.prototype, "translate", function (f) {
        f.apply(this, [].slice.call(arguments,
            1));
        if (this.chart.is3d()) {
            var a = this.chart, b = this.chart.options.chart.options3d, c = b.alpha, e = b.beta, g = {
                x: a.inverted ? a.plotHeight / 2 : a.plotWidth / 2,
                y: a.inverted ? a.plotWidth / 2 : a.plotHeight / 2,
                z: b.depth,
                vd: b.viewDistance
            }, b = b.depth, j = a.options.zAxis || {min: 0, max: b}, i = b / (j.max - j.min);
            d.each(this.data, function (a) {
                var b = {x: a.plotX, y: a.plotY, z: (a.z - j.min) * i}, b = x([b], c, e, g)[0];
                a.plotXold = a.plotX;
                a.plotYold = a.plotY;
                a.plotX = b.x;
                a.plotY = b.y;
                a.plotZ = b.z
            })
        }
    });
    d.wrap(d.seriesTypes.scatter.prototype, "init", function (d) {
        var a =
            d.apply(this, [].slice.call(arguments, 1));
        if (this.chart.is3d())this.pointArrayMap = ["x", "y", "z"], this.tooltipOptions.pointFormat = this.userOptions.tooltip ? this.userOptions.tooltip.pointFormat || "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>" : "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>";
        return a
    });
    if (d.VMLRenderer)d.setOptions({animate: !1}), d.VMLRenderer.prototype.cuboid = d.SVGRenderer.prototype.cuboid, d.VMLRenderer.prototype.cuboidPath = d.SVGRenderer.prototype.cuboidPath,
        d.VMLRenderer.prototype.toLinePath = d.SVGRenderer.prototype.toLinePath, d.VMLRenderer.prototype.createElement3D = d.SVGRenderer.prototype.createElement3D, d.VMLRenderer.prototype.arc3d = function (f) {
        f = d.SVGRenderer.prototype.arc3d.call(this, f);
        f.css({zIndex: f.zIndex});
        return f
    }, d.VMLRenderer.prototype.arc3dPath = d.SVGRenderer.prototype.arc3dPath, d.Chart.prototype.renderSeries = function () {
        for (var d, a = this.series.length; a--;)d = this.series[a], d.translate(), d.setTooltipPoints && d.setTooltipPoints(), d.render()
    },
        d.wrap(d.Axis.prototype, "render", function (d) {
            d.apply(this, [].slice.call(arguments, 1));
            this.sideFrame && (this.sideFrame.css({zIndex: 0}), this.sideFrame.front.attr({fill: this.sideFrame.color}));
            this.bottomFrame && (this.bottomFrame.css({zIndex: 1}), this.bottomFrame.front.attr({fill: this.bottomFrame.color}));
            this.backFrame && (this.backFrame.css({zIndex: 0}), this.backFrame.front.attr({fill: this.backFrame.color}))
        })
})(Highcharts);
