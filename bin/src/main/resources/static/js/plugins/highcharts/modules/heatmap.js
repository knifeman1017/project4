/*
 Highcharts JS v4.0.4 (2014-09-02)

 (c) 2011-2014 Torstein Honsi

 License: www.highcharts.com/license
 */
(function (h) {
    var k = h.Axis, y = h.Chart, l = h.Color, z = h.Legend, t = h.LegendSymbolMixin, u = h.Series, v = h.SVGRenderer, w = h.getOptions(), i = h.each, r = h.extend, A = h.extendClass, m = h.merge, o = h.pick, x = h.numberFormat, p = h.seriesTypes, s = h.wrap, n = function () {
    }, q = h.ColorAxis = function () {
        this.isColorAxis = !0;
        this.init.apply(this, arguments)
    };
    r(q.prototype, k.prototype);
    r(q.prototype, {
        defaultColorAxisOptions: {
            lineWidth: 0, gridLineWidth: 1, tickPixelInterval: 72, startOnTick: !0, endOnTick: !0, offset: 0, marker: {
                animation: {duration: 50}, color: "gray",
                width: 0.01
            }, labels: {overflow: "justify"}, minColor: "#EFEFFF", maxColor: "#003875", tickLength: 5
        }, init: function (b, a) {
            var c = b.options.legend.layout !== "vertical", d;
            d = m(this.defaultColorAxisOptions, {side: c ? 2 : 1, reversed: !c}, a, {
                isX: c,
                opposite: !c,
                showEmpty: !1,
                title: null,
                isColor: !0
            });
            k.prototype.init.call(this, b, d);
            a.dataClasses && this.initDataClasses(a);
            this.initStops(a);
            this.isXAxis = !0;
            this.horiz = c;
            this.zoomEnabled = !1
        }, tweenColors: function (b, a, c) {
            var d = a.rgba[3] !== 1 || b.rgba[3] !== 1;
            return (d ? "rgba(" : "rgb(") + Math.round(a.rgba[0] +
                (b.rgba[0] - a.rgba[0]) * (1 - c)) + "," + Math.round(a.rgba[1] + (b.rgba[1] - a.rgba[1]) * (1 - c)) + "," + Math.round(a.rgba[2] + (b.rgba[2] - a.rgba[2]) * (1 - c)) + (d ? "," + (a.rgba[3] + (b.rgba[3] - a.rgba[3]) * (1 - c)) : "") + ")"
        }, initDataClasses: function (b) {
            var a = this, c = this.chart, d, e = 0, f = this.options, g = b.dataClasses.length;
            this.dataClasses = d = [];
            this.legendItems = [];
            i(b.dataClasses, function (b, h) {
                var i, b = m(b);
                d.push(b);
                if (!b.color)f.dataClassColor === "category" ? (i = c.options.colors, b.color = i[e++], e === i.length && (e = 0)) : b.color = a.tweenColors(l(f.minColor),
                    l(f.maxColor), g < 2 ? 0.5 : h / (g - 1))
            })
        }, initStops: function (b) {
            this.stops = b.stops || [[0, this.options.minColor], [1, this.options.maxColor]];
            i(this.stops, function (a) {
                a.color = l(a[1])
            })
        }, setOptions: function (b) {
            k.prototype.setOptions.call(this, b);
            this.options.crosshair = this.options.marker;
            this.coll = "colorAxis"
        }, setAxisSize: function () {
            var b = this.legendSymbol, a = this.chart, c, d, e;
            if (b)this.left = c = b.attr("x"), this.top = d = b.attr("y"), this.width = e = b.attr("width"), this.height = b = b.attr("height"), this.right = a.chartWidth -
            c - e, this.bottom = a.chartHeight - d - b, this.len = this.horiz ? e : b, this.pos = this.horiz ? c : d
        }, toColor: function (b, a) {
            var c, d = this.stops, e, f = this.dataClasses, g, j;
            if (f)for (j = f.length; j--;) {
                if (g = f[j], e = g.from, d = g.to, (e === void 0 || b >= e) && (d === void 0 || b <= d)) {
                    c = g.color;
                    if (a)a.dataClass = j;
                    break
                }
            } else {
                this.isLog && (b = this.val2lin(b));
                c = 1 - (this.max - b) / (this.max - this.min || 1);
                for (j = d.length; j--;)if (c > d[j][0])break;
                e = d[j] || d[j + 1];
                d = d[j + 1] || e;
                c = 1 - (d[0] - c) / (d[0] - e[0] || 1);
                c = this.tweenColors(e.color, d.color, c)
            }
            return c
        }, getOffset: function () {
            var b =
                this.legendGroup, a = this.chart.axisOffset[this.side];
            if (b) {
                k.prototype.getOffset.call(this);
                if (!this.axisGroup.parentGroup)this.axisGroup.add(b), this.gridGroup.add(b), this.labelGroup.add(b), this.added = !0;
                this.chart.axisOffset[this.side] = a
            }
        }, setLegendColor: function () {
            var b, a = this.options;
            b = this.horiz ? [0, 0, 1, 0] : [0, 0, 0, 1];
            this.legendColor = {
                linearGradient: {x1: b[0], y1: b[1], x2: b[2], y2: b[3]},
                stops: a.stops || [[0, a.minColor], [1, a.maxColor]]
            }
        }, drawLegendSymbol: function (b, a) {
            var c = b.padding, d = b.options, e = this.horiz,
                f = o(d.symbolWidth, e ? 200 : 12), g = o(d.symbolHeight, e ? 12 : 200), j = o(d.labelPadding, e ? 16 : 30), d = o(d.itemDistance, 10);
            this.setLegendColor();
            a.legendSymbol = this.chart.renderer.rect(0, b.baseline - 11, f, g).attr({zIndex: 1}).add(a.legendGroup);
            a.legendSymbol.getBBox();
            this.legendItemWidth = f + c + (e ? d : j);
            this.legendItemHeight = g + c + (e ? j : 0)
        }, setState: n, visible: !0, setVisible: n, getSeriesExtremes: function () {
            var b;
            if (this.series.length)b = this.series[0], this.dataMin = b.valueMin, this.dataMax = b.valueMax
        }, drawCrosshair: function (b,
                                    a) {
            var c = !this.cross, d = a && a.plotX, e = a && a.plotY, f, g = this.pos, j = this.len;
            if (a)f = this.toPixels(a.value), f < g ? f = g - 2 : f > g + j && (f = g + j + 2), a.plotX = f, a.plotY = this.len - f, k.prototype.drawCrosshair.call(this, b, a), a.plotX = d, a.plotY = e, !c && this.cross && this.cross.attr({fill: this.crosshair.color}).add(this.labelGroup)
        }, getPlotLinePath: function (b, a, c, d, e) {
            return e ? this.horiz ? ["M", e - 4, this.top - 6, "L", e + 4, this.top - 6, e, this.top, "Z"] : ["M", this.left, e, "L", this.left - 6, e + 6, this.left - 6, e - 6, "Z"] : k.prototype.getPlotLinePath.call(this,
                b, a, c, d)
        }, update: function (b, a) {
            i(this.series, function (a) {
                a.isDirtyData = !0
            });
            k.prototype.update.call(this, b, a);
            this.legendItem && (this.setLegendColor(), this.chart.legend.colorizeItem(this, !0))
        }, getDataClassLegendSymbols: function () {
            var b = this, a = this.chart, c = this.legendItems, d = a.options.legend, e = d.valueDecimals, f = d.valueSuffix || "", g;
            c.length || i(this.dataClasses, function (d, h) {
                var k = !0, l = d.from, m = d.to;
                g = "";
                l === void 0 ? g = "< " : m === void 0 && (g = "> ");
                l !== void 0 && (g += x(l, e) + f);
                l !== void 0 && m !== void 0 && (g += " - ");
                m !== void 0 && (g += x(m, e) + f);
                c.push(r({
                    chart: a,
                    name: g,
                    options: {},
                    drawLegendSymbol: t.drawRectangle,
                    visible: !0,
                    setState: n,
                    setVisible: function () {
                        k = this.visible = !k;
                        i(b.series, function (a) {
                            i(a.points, function (a) {
                                a.dataClass === h && a.setVisible(k)
                            })
                        });
                        a.legend.colorizeItem(this, k)
                    }
                }, d))
            });
            return c
        }, name: ""
    });
    i(["fill", "stroke"], function (b) {
        HighchartsAdapter.addAnimSetter(b, function (a) {
            a.elem.attr(b, q.prototype.tweenColors(l(a.start), l(a.end), a.pos))
        })
    });
    s(y.prototype, "getAxes", function (b) {
        var a = this.options.colorAxis;
        b.call(this);
        this.colorAxis = [];
        a && new q(this, a)
    });
    s(z.prototype, "getAllItems", function (b) {
        var a = [], c = this.chart.colorAxis[0];
        c && (c.options.dataClasses ? a = a.concat(c.getDataClassLegendSymbols()) : a.push(c), i(c.series, function (a) {
            a.options.showInLegend = !1
        }));
        return a.concat(b.call(this))
    });
    h = {
        pointAttrToOptions: {
            stroke: "borderColor",
            "stroke-width": "borderWidth",
            fill: "color",
            dashstyle: "dashStyle"
        },
        pointArrayMap: ["value"],
        axisTypes: ["xAxis", "yAxis", "colorAxis"],
        optionalAxis: "colorAxis",
        trackerGroups: ["group",
            "markerGroup", "dataLabelsGroup"],
        getSymbol: n,
        parallelArrays: ["x", "y", "value"],
        colorKey: "value",
        translateColors: function () {
            var b = this, a = this.options.nullColor, c = this.colorAxis, d = this.colorKey;
            i(this.data, function (e) {
                var f = e[d];
                if (f = f === null ? a : c && f !== void 0 ? c.toColor(f, e) : e.color || b.color)e.color = f
            })
        }
    };
    s(v.prototype, "buildText", function (b, a) {
        var c = a.styles && a.styles.HcTextStroke;
        b.call(this, a);
        c && a.applyTextStroke && a.applyTextStroke(c)
    });
    v.prototype.Element.prototype.applyTextStroke = function (b) {
        var a =
            this.element, c, d, b = b.split(" ");
        c = a.getElementsByTagName("tspan");
        d = a.firstChild;
        this.ySetter = this.xSetter;
        i([].slice.call(c), function (c, f) {
            var g;
            f === 0 && (c.setAttribute("x", a.getAttribute("x")), (f = a.getAttribute("y")) !== null && c.setAttribute("y", f));
            g = c.cloneNode(1);
            g.setAttribute("stroke", b[1]);
            g.setAttribute("stroke-width", b[0]);
            g.setAttribute("stroke-linejoin", "round");
            a.insertBefore(g, d)
        })
    };
    w.plotOptions.heatmap = m(w.plotOptions.scatter, {
        animation: !1,
        borderWidth: 0,
        nullColor: "#F8F8F8",
        dataLabels: {
            formatter: function () {
                return this.point.value
            },
            verticalAlign: "middle",
            crop: !1,
            overflow: !1,
            style: {color: "white", fontWeight: "bold", HcTextStroke: "1px rgba(0,0,0,0.5)"}
        },
        marker: null,
        tooltip: {pointFormat: "{point.x}, {point.y}: {point.value}<br/>"},
        states: {normal: {animation: !0}, hover: {brightness: 0.2}}
    });
    p.heatmap = A(p.scatter, m(h, {
        type: "heatmap",
        pointArrayMap: ["y", "value"],
        hasPointSpecificOptions: !0,
        supportsDrilldown: !0,
        getExtremesFromAll: !0,
        init: function () {
            p.scatter.prototype.init.apply(this, arguments);
            this.pointRange = this.options.colsize || 1;
            this.yAxis.axisPointRange =
                this.options.rowsize || 1
        },
        translate: function () {
            var b = this.options, a = this.xAxis, c = this.yAxis;
            this.generatePoints();
            i(this.points, function (d) {
                var e = (b.colsize || 1) / 2, f = (b.rowsize || 1) / 2, g = Math.round(a.len - a.translate(d.x - e, 0, 1, 0, 1)), e = Math.round(a.len - a.translate(d.x + e, 0, 1, 0, 1)), h = Math.round(c.translate(d.y - f, 0, 1, 0, 1)), f = Math.round(c.translate(d.y + f, 0, 1, 0, 1));
                d.plotX = (g + e) / 2;
                d.plotY = (h + f) / 2;
                d.shapeType = "rect";
                d.shapeArgs = {x: Math.min(g, e), y: Math.min(h, f), width: Math.abs(e - g), height: Math.abs(f - h)}
            });
            this.translateColors();
            this.chart.hasRendered && i(this.points, function (a) {
                a.shapeArgs.fill = a.options.color || a.color
            })
        },
        drawPoints: p.column.prototype.drawPoints,
        animate: n,
        getBox: n,
        drawLegendSymbol: t.drawRectangle,
        getExtremes: function () {
            u.prototype.getExtremes.call(this, this.valueData);
            this.valueMin = this.dataMin;
            this.valueMax = this.dataMax;
            u.prototype.getExtremes.call(this)
        }
    }))
})(Highcharts);
