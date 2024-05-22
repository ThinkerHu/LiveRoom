__require = function e(t, o, n) {
    function i(r, c) {
        if (!o[r]) {
            if (!t[r]) {
                var s = r.split("/");
                if (s = s[s.length - 1], !t[s]) {
                    var l = "function" == typeof __require && __require;
                    if (!c && l) return l(s, !0);
                    if (a) return a(s, !0);
                    throw new Error("Cannot find module '" + r + "'")
                }
            }
            var u = o[r] = {
                exports: {}
            };
            t[r][0].call(u.exports,
            function(e) {
                return i(t[r][1][e] || e)
            },
            u, u.exports, e, t, o, n)
        }
        return o[r].exports
    }
    for (var a = "function" == typeof __require && __require,
    r = 0; r < n.length; r++) i(n[r]);
    return i
} ({
    API: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "0d9a1nBa41G7JHyJ4olJope", "API"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./pl/Lingxian"),
        i = e("./User"),
        a = function() {
            function e() {}
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function() {
                n.
            default.share.isSelf && n.
            default.share.init()
            },
            e.prototype.showClub = function() {},
            e.prototype.showLoginButton = function(e) {},
            e.prototype.showBannerAd = function() {},
            e.prototype.hideBannerAd = function() {},
            e.prototype.showVideoAd = function(e) {
                cc.log("\u64ad\u653e\u89c6\u9891\u5e7f\u544a\uff01\uff01"),
                e(!0)
            },
            e.prototype.login = function(e, t) {
                n.
            default.share.isSelf && n.
            default.share.login(e)
            },
            e.prototype.getFriends = function(e) {
                e([i.
            default.share.uid], null)
            },
            e.prototype.updateRank = function(e) {},
            e.prototype.share = function(e) {},
            e.prototype.shareParam = function(e, t, o, n) {
                cc.log("\u5206\u4eab\u6e38\u620f\u6210\u529f\uff01\uff01\uff08\u6d4b\u8bd5)"),
                n(!0)
            },
            e.prototype.moveGame = function() {},
            Object.defineProperty(e.prototype, "lang", {
                get: function() {
                    if (n.
                default.share.isSelf) return n.
                default.share.lang;
                    var e = window.location.search;
                    if (null != e && "" != e) for (var t = 0,
                    o = (e = e.substr(1)).split("&"); t < o.length; t++) {
                        var i = o[t].split("=");
                        if ("LANG" == i[0].toUpperCase()) return i[1]
                    }
                    return "en"
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.jumpTo = function(e, t) {},
            e.prototype.getStartData = function() {
                return "test=test"
            },
            e.prototype.pay = function(e) {
                cc.log("\u5145\u503c"),
                n.
            default.share.isSelf && n.
            default.share.pay(e)
            },
            e.prototype.postUser = function() {
                cc.log("\u4e0a\u4f20\u7528\u6237\u6570\u636e"),
                n.
            default.share.isSelf && n.
            default.share.postUser()
            },
            e.prototype.quickGame = function() {
                n.
            default.share.isSelf && n.
            default.share.quickGame()
            },
            e.prototype.restart = function() {
                n.
            default.share.isSelf && n.
            default.share.quickGame()
            },
            e._instance = null,
            e
        } ();
        o.
    default = a,
        cc._RF.pop()
    },
    {
        "./User": "User",
        "./pl/Lingxian": "Lingxian"
    }],
    ActionNum: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "ab82bG6otdOq4CQLKI6BF6R", "ActionNum"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Lang"),
        i = e("./NumberAtlas"),
        a = e("./NumberLabel"),
        r = e("./Sound"),
        c = e("./Util"),
        s = cc._decorator,
        l = s.ccclass,
        u = s.property,
        d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.old = 0,
                t.new = 0,
                t.progress = 0,
                t.sumTime = 0,
                t.bindClass = null,
                t.type = 1,
                t.format = "{1}",
                t.decimal = 2,
                t.soundId = -1,
                t.soundName = null,
                t
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                var e = this;
                if (null == this.uhand) switch (this.type) {
                case 1:
                    this.uhand = function(t) {
                        e.setText(c.
                    default.formatThousand(Math.floor(t)))
                    };
                    break;
                case 2:
                    this.uhand = function(t) {
                        e.setText(c.
                    default.formatNumber(Math.floor(t)))
                    };
                    break;
                case 3:
                    this.uhand = function(t) {
                        e.setText(Math.floor(t).toString())
                    };
                    break;
                case 4:
                    this.uhand = function(t) {
                        e.setText(t.toFixed(e.decimal))
                    }
                }
            },
            t.prototype.reset = function(e) {
                this.old = e,
                this.new = e,
                this.progress = 0,
                this.sumTime = 0,
                this.uhand && this.uhand(this.old),
                this.stopSound()
            },
            t.prototype.setValue = function(e, t, o) {
                var n = this;
                void 0 === o && (o = null),
                t <= 0 ? this.reset(e) : (this.old !== this.new && (this.old += (this.new - this.old) * this.progress / this.sumTime, this.uhand(this.old)), this.new = e, this.progress = 0, this.sumTime = t, this.stopSound(), this.soundName = o, this.soundId = -2, null != o && r.
            default.share.sound(o,
                function(e) {
                    if ( - 2 != n.soundId) return r.
                default.share.stopSound(e),
                    void console.log("\u58f0\u97f3\u5df2\u7ecf\u5173\u95ed");
                    n.soundId = e
                },
                !0))
            },
            t.prototype.setText = function(e) {
                e = n.
            default.share.format(this.format, e),
                this.getBindClass(e)
            },
            t.prototype.getBindClass = function(e) {
                void 0 === e && (e = "");
                for (var t = 0,
                o = [a.
            default, i.
            default, cc.Label, cc.RichText]; t < o.length; t++) {
                    var n = o[t],
                    r = this.node.getComponent(n);
                    if (r) return this.bindClass = r,
                    void 0 === r.text ? (this.bindClass.string = e, void(this.getBindClass = function(e, t) {
                        void 0 === e && (e = ""),
                        void 0 === t && (t = this),
                        t.bindClass.string = e
                    })) : (this.bindClass.text = e, void(this.getBindClass = function(e, t) {
                        void 0 === e && (e = ""),
                        void 0 === t && (t = this),
                        t.bindClass.text = e
                    }))
                }
            },
            t.prototype.update = function(e) {
                if (this.new != this.old) {
                    this.progress += e;
                    var t = this.old,
                    o = this.new - this.old;
                    this.progress >= this.sumTime ? (t = this.new, this.old = this.new) : t += o * this.progress / this.sumTime,
                    t == this.new && (this.stopSound(), null != this.rhand && this.rhand()),
                    this.uhand(t)
                }
            },
            t.prototype.stopSound = function() {
                this.soundId > 0 && r.
            default.share.stopSound(this.soundId),
                this.soundId = -1
            },
            __decorate([u({
                type: cc.Integer,
                tooltip: "\u4f7f\u75281-4\u7c7b\u578b\u524d\uff0c\u8bf7\u786e\u5b9a\u5f53\u524dNode\u4e0a\u5df2\u7ecf\u6709Label\uff0cRichText\uff0cNumberLabel, NumberAtlas \u5176\u4e2d\u4e00\u4e2a\u7ec4\u4ef6\u3002\n\u7c7b\u578b 1 \u662f\u5343\u5206\u7b26\uff0c \n\u7c7b\u578b 2 \u662fKM ,\n\u7c7b\u578b 3 \u666e\u901a\u6574\u6570 ,\n\u7c7b\u578b 4 \u5c0f\u6570, \n\u5176\u5b83\u9700\u8981\u5728onload \u51fd\u6570\u65f6\u8bbe\u5b9auhand"
            })], t.prototype, "type", void 0),
            __decorate([u({
                tooltip: "\u683c\u5f0f\u5316\u5b57\u7b26,\u4f8b\u5982+{1}\uff0c\u5219\u6700\u7ec8\u663e\u793a+1"
            })], t.prototype, "format", void 0),
            __decorate([u({
                tooltip: "\u5c0f\u6570\u70b9\u540e\u4e2a\u6570"
            })], t.prototype, "decimal", void 0),
            t = __decorate([l], t)
        } (cc.Component);
        o.
    default = d,
        cc._RF.pop()
    },
    {
        "./Lang": "Lang",
        "./NumberAtlas": "NumberAtlas",
        "./NumberLabel": "NumberLabel",
        "./Sound": "Sound",
        "./Util": "Util"
    }],
    AnimalLayer: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "1ddfdNComVMErq0XwBCqw1M", "AnimalLayer"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Animal"),
        i = e("../control/DataUtil"),
        a = e("../base/Util"),
        r = e("../const/GEvent"),
        c = e("../const/Effect"),
        s = e("../proxy/PlayerProxy"),
        l = e("../control/EnoughUtil"),
        u = e("../model/Room"),
        d = e("../base/Sound"),
        h = e("../base/Loading"),
        f = cc._decorator,
        p = f.ccclass,
        g = f.property,
        y = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.itemFrefab = null,
                t.animalList = [],
                t.nodeBlack = null,
                t.nodeTouch = null,
                t.nodeTypes = [],
                t.nodeFinger = null,
                t.animalCount = 0,
                t.index = 0,
                t.tipsIndex = 0,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                this.initFinger(),
                this.hideWinLight(),
                this.nodeFinger.zIndex = 100,
                this.initAnimals(),
                this.initEvent(),
                this.checkState()
            },
            t.prototype.initAnimals = function() {
                var e = i.
            default.getOdds();
                this.animalCount = e.length;
                var t = u.
            default.share.myBet;
                null == t && (t = {});
                for (var o = null,
                a = 0; a < this.animalCount; a++) {
                    var r = this.node.getChildByName("Animal" + (a + 1)),
                    c = cc.instantiate(this.itemFrefab);
                    c.parent = r,
                    (o = c.getComponent(n.
                default)).setData(e[a]),
                    o.setBlack(!1),
                    o.setBetareaRed(!1);
                    var s = t[a + 1],
                    l = void 0 == s ? 0 : s;
                    o.setBet(l),
                    this.animalList.push(o)
                }
            },
            t.prototype.checkState = function() {
                var e = this;
                i.
            default.getWinArea( - 1);
                var t = u.
            default.share.state;
                if (t != u.
            default.STATE_NONE && t != u.
            default.STATE_BET) {
                    for (var o = 0,
                    a = this.animalList; o < a.length; o++) {
                        a[o].updateStar()
                    }
                    if (t != u.
                default.STATE_SETT) {
                        for (var r = 0,
                        c = this.nodeTypes; r < c.length; r++) {
                            c[r].color = n.
                        default.COLOR_BLACK
                        }
                        this.index = Math.floor(Math.random() * this.animalCount),
                        this.startSett()
                    } else {
                        if (console.log(" cs \u7ed3\u7b97\u5269\u4f59\u65f6\u95f4 ", u.
                    default.share.subTime), u.
                    default.share.subTime > 5) {
                            h.
                        default.show();
                            var s = u.
                        default.share.subTime - 5;
                            return void this.node.runAction(cc.sequence(cc.delayTime(s), cc.callFunc(function() {
                                h.
                            default.hide(),
                                e.showWin()
                            })))
                        }
                        this.showWin()
                    }
                } else this.startBet()
            },
            t.prototype.initEvent = function() {
                a.
            default.event.on(r.
            default.START_BET, this.startBet, this),
                a.
            default.event.on(r.
            default.START_ROTATE, this.startRotate, this),
                a.
            default.event.on(r.
            default.SHOW_SETT, this.startSett, this),
                this.nodeTouch.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, !0),
                this.nodeTouch.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, !0),
                this.nodeTouch.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this, !0)
            },
            t.prototype.initFinger = function() {
                var e = this;
                this.nodeFinger.runAction(cc.repeatForever(cc.sequence(cc.delayTime(c.
            default.TIPS_BET_DELAY), cc.callFunc(function() {
                    e.tipsIndex++,
                    e.tipsIndex >= e.animalCount && (e.tipsIndex = 0);
                    for (var t = 0; t < e.animalCount; t++) {
                        var o = e.animalList[t];
                        t == e.tipsIndex ? e.setFinger(o) : o.setBetareaRed(!1)
                    }
                })))),
                this.nodeFinger.x = -1e4,
                this.nodeFinger.active = !1
            },
            t.prototype.setFinger = function(e) {
                e.setBetareaRed(!0);
                var t = e.node.parent.position;
                t.x += 40,
                t.y += -30,
                this.nodeFinger.position = t
            },
            t.prototype.startBet = function() {
                this.nodeFinger.active = !0,
                this.node.stopActionByTag(100),
                this.hideWinLight();
                for (var e = 0,
                t = this.animalList; e < t.length; e++) { (a = t[e]).updateStar(),
                    a.setBlack(!1),
                    null == u.
                default.share.myBet && a.setBet(0)
                }
                for (var o = 0,
                i = this.nodeTypes; o < i.length; o++) {
                    var a; (a = i[o]).stopAllActions(),
                    a.rotation = 0,
                    a.color = n.
                default.COLOR_LIGHT
                }
            },
            t.prototype.startRotate = function() {
                this.index = Math.floor(Math.random() * this.animalCount),
                this.roundOne(),
                this.node.stopActionByTag(100),
                this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1 / c.
            default.ROTATE_SPEED), cc.callFunc(this.roundOne.bind(this))))).setTag(100);
                for (var e = 0,
                t = this.nodeTypes; e < t.length; e++) {
                    t[e].color = n.
                default.COLOR_BLACK
                }
                for (var o = 0,
                i = this.animalList; o < i.length; o++) {
                    i[o].setBetareaRed(!1)
                }
                this.nodeFinger.active = !1
            },
            t.prototype.startSett = function() {
                this.node.stopActionByTag(100);
                var e = u.
            default.share.subTime,
                t = Math.ceil(e * c.
            default.ROTATE_SPEED);
                t = Math.ceil(t / this.animalCount) * this.animalCount;
                var o = u.
            default.share.winArea;
                o < 0 && (o = i.
            default.getWinArea( - o));
                var n = u.
            default.share.winArea - this.index;
                n < 0 && (n += this.animalCount);
                var a = e / (t += n),
                r = cc.repeat(cc.sequence(cc.delayTime(a), cc.callFunc(this.roundOne.bind(this))), t);
                this.node.runAction(cc.sequence(r, cc.callFunc(this.showWin.bind(this)))).setTag(100)
            },
            t.prototype.showWin = function() {
                d.
            default.share.sound("countDown"),
                u.
            default.share.state = u.
            default.STATE_WIN,
                this.node.stopActionByTag(100);
                var e = null;
                u.
            default.share.winArea > 0 ? (e = []).push(u.
            default.share.winArea):
                e = -1 == u.
            default.share.winArea ? i.
            default.type1List:
                i.
            default.type2List;
                for (var t = null,
                o = this.animalCount - 1; o >= 0; o--)(t = this.animalList[o]).setBetareaRed(!1),
                t.setBlack(!0);
                for (var n = 0,
                c = e; n < c.length; n++) {
                    var l = c[n]; (t = this.animalList[l - 1]).setBetareaRed(!0),
                    t.setBlack(!1)
                }
                this.nodeBlack.active = !0,
                u.
            default.share.winCoin > 0 && a.
            default.event.emit(r.
            default.UPDATE_COIN),
                s.
            default.share.getTodayEarnings(),
                a.
            default.event.emit(r.
            default.SHOW_WIN),
                this.showTypeWin()
            },
            t.prototype.showTypeWin = function() {
                if (! (u.
            default.share.winArea > 0)) {
                    var e = this.nodeTypes[ - u.
                default.share.winArea - 1];
                    e.color = n.
                default.COLOR_LIGHT,
                    e.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(.1, -15), cc.rotateTo(.1, 15), cc.rotateTo(.1, -15), cc.rotateTo(.1, 15), cc.rotateTo(.1, 0), cc.delayTime(.3))))
                }
            },
            t.prototype.roundOne = function() {
                this.index++,
                this.index >= this.animalCount && (this.index = 0),
                this.light(this.index),
                d.
            default.share.sound("countDown1")
            },
            t.prototype.light = function(e) {
                for (var t = 0; t < this.animalCount; t++) this.animalList[t].setBlack(t != e)
            },
            t.prototype.onTouchStart = function(e) {
                e.stopPropagation();
                for (var t = this.node.convertToNodeSpaceAR(e.getLocation()), o = 1; o <= 2; o++) {
                    var n = "type_" + o,
                    i = this.node.getChildByName(n).position;
                    if (! (Math.abs(t.x - i.x) > 50 || Math.abs(t.y - i.y) > 50)) return void a.
                default.event.emit(r.
                default.SHOW_TYPE_TIPS, o)
                }
            },
            t.prototype.onTouchEnd = function(e) {
                if (e.stopPropagation(), u.
            default.share.subTime <= 0 || u.
            default.share.state != u.
            default.STATE_BET) console.log("\u975e\u4e0b\u6ce8\u65f6\u95f4");
                else {
                    a.
                default.event.emit(r.
                default.HIDE_TYPE_TIPS);
                    for (var t = this.node.convertToNodeSpaceAR(e.getLocation()), o = null, n = null, i = 0; i < this.animalCount; i++) if (o = (n = this.animalList[i]).node.parent.position, !(Math.abs(t.x - o.x) > 65 || Math.abs(t.y - o.y) > 65)) {
                        if (d.
                    default.share.click(), l.
                    default.bet()) return;
                        if (!u.
                    default.share.isCanBet(i + 1)) return;
                        return void this.betItem(i, n, o)
                    }
                }
            },
            t.prototype.onTouchCancel = function() {
                a.
            default.event.emit(r.
            default.HIDE_TYPE_TIPS)
            },
            t.prototype.betItem = function(e, t, o) {
                var n = this;
                s.
            default.share.bet(e + 1,
                function(i) {
                    for (var s = 0,
                    l = n.animalList; s < l.length; s++) {
                        l[s].setBetareaRed(!1)
                    }
                    var u = t.node.parent.parent.convertToWorldSpaceAR(o);
                    a.
                default.event.emit(r.
                default.USER_BET, u),
                    n.node.runAction(cc.sequence(cc.delayTime(.9 * c.
                default.BET_EFFECT_FLY_TIME), cc.callFunc(function() {
                        n.betEffectCmp(t, i, e)
                    })))
                })
            },
            t.prototype.betEffectCmp = function(e, t, o) {
                var n = this;
                e.setBet(t),
                this.nodeFinger.active = !1,
                this.tipsIndex = o,
                this.setFinger(e);
                var i = .5 * c.
            default.TIPS_BET_DELAY;
                e.setBetareaRed(!0, i,
                function() {
                    n.node.stopActionByTag(101),
                    n.node.runAction(cc.sequence(cc.delayTime(c.
                default.USER_BET_DELAY_TIPS), cc.callFunc(function() {
                        u.
                    default.share.state == u.
                    default.STATE_BET && (n.nodeFinger.active = !0)
                    }))).setTag(101)
                });
                var a = e.labBet.node;
                a.stopActionByTag(100),
                a.runAction(cc.sequence(cc.scaleTo(0, 2), cc.scaleTo(.1, 1)))
            },
            t.prototype.hideWinLight = function() {
                this.nodeBlack.active = !1
            },
            t.prototype.onDestroy = function() {
                a.
            default.event.off(r.
            default.START_BET, this.startBet, this),
                a.
            default.event.off(r.
            default.START_ROTATE, this.startRotate, this),
                a.
            default.event.off(r.
            default.SHOW_SETT, this.startSett, this),
                this.nodeTouch.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, !1),
                this.nodeTouch.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this),
                this.nodeTouch.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this, !0)
            },
            __decorate([g(cc.Prefab)], t.prototype, "itemFrefab", void 0),
            __decorate([g(cc.Node)], t.prototype, "nodeBlack", void 0),
            __decorate([g(cc.Node)], t.prototype, "nodeTouch", void 0),
            __decorate([g(cc.Node)], t.prototype, "nodeTypes", void 0),
            __decorate([g(cc.Node)], t.prototype, "nodeFinger", void 0),
            t = __decorate([p], t)
        } (cc.Component);
        o.
    default = y,
        cc._RF.pop()
    },
    {
        "../base/Loading": "Loading",
        "../base/Sound": "Sound",
        "../base/Util": "Util",
        "../const/Effect": "Effect",
        "../const/GEvent": "GEvent",
        "../control/DataUtil": "DataUtil",
        "../control/EnoughUtil": "EnoughUtil",
        "../model/Room": "Room",
        "../proxy/PlayerProxy": "PlayerProxy",
        "./Animal": "Animal"
    }],
    Animal: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "23be97qDrBJcKjMnTUdM2Ae", "Animal"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Lang"),
        i = e("../control/DataUtil"),
        a = e("../base/Util"),
        r = e("../const/GEvent"),
        c = e("../model/Room"),
        s = cc._decorator,
        l = s.ccclass,
        u = s.property,
        d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labYouBet = null,
                t.labBet = null,
                t.nodeStar = null,
                t.nodeX = null,
                t.nodeType = null,
                t.nodeHot = null,
                t.nodePanels = [],
                t.data = null,
                t.bet = 0,
                t.index = 0,
                t
            }
            return __extends(t, e),
            t.prototype.onLoad = function() { (this.labYouBet.string = n.
            default.share.find("you_bet"), n.
            default.share.isLeft) || (this.labBet.node.parent.getComponent(cc.Layout).horizontalDirection = cc.Layout.HorizontalDirection.RIGHT_TO_LEFT);
                a.
            default.event.on(r.
            default.UPDATE_STAR, this.updateStar, this),
                this.nodeHot.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(.1, 5), cc.rotateTo(.1, -5), cc.rotateTo(.1, 5), cc.rotateTo(.1, -5), cc.rotateTo(.05, 0), cc.delayTime(1)))),
                this.nodeHot.active = !1,
                this.updateStar();
                var e = this.node.getChildByName("nodeBet");
                e = e.getChildByName("icon_jb"),
                i.
            default.getPayIcon(e)
            },
            t.prototype.setBet = function(e) {
                this.bet = e,
                e < 1 ? this.labBet.node.parent.active = !1 : (this.labBet.node.parent.active = !0, this.labBet.string = i.
            default.formatBet(e))
            },
            t.prototype.updateStar = function() {
                for (var e = c.
            default.share.stars[this.index]; e > this.nodeStar.childrenCount;) a.
            default.loadSprite("ui/cion_small").parent = this.nodeStar;
                for (var t = 0; t < this.nodeStar.childrenCount; t++) this.nodeStar.children[t].active = e > t;
                this.nodeHot.active = this.index == c.
            default.share.hot
            },
            t.prototype.setData = function(e) {
                this.data = e,
                a.
            default.loadSprite(i.
            default.getIcon(e.id)).parent = this.nodeType,
                a.
            default.loadSprite("ui/multiple" + e.ratio).parent = this.nodeX,
                this.index = e.id - 1
            },
            t.prototype.setBlack = function(e) {
                this.nodePanels[2].active = e
            },
            t.prototype.setBetareaRed = function(e, t, o) {
                var n = this;
                if (void 0 === t && (t = 0), void 0 === o && (o = null), this.nodePanels[0].active = e, this.nodePanels[1].active = !e, null != this.node.getChildByTag(200) && this.node.removeChildByTag(200), !(t <= 0)) {
                    var i = new cc.Node;
                    i.parent = this.node,
                    i.tag = 200,
                    i.runAction(cc.sequence(cc.delayTime(t), cc.callFunc(function() {
                        n.setBetareaRed(!1),
                        null != o && o()
                    })))
                }
            },
            t.prototype.onDestroy = function() {
                a.
            default.event.off(r.
            default.UPDATE_STAR, this.updateStar, this)
            },
            t.COLOR_LIGHT = cc.Color.WHITE,
            t.COLOR_BLACK = cc.hexToColor("#a0a0a0"),
            __decorate([u(cc.Label)], t.prototype, "labYouBet", void 0),
            __decorate([u(cc.Label)], t.prototype, "labBet", void 0),
            __decorate([u(cc.Node)], t.prototype, "nodeStar", void 0),
            __decorate([u(cc.Node)], t.prototype, "nodeX", void 0),
            __decorate([u(cc.Node)], t.prototype, "nodeType", void 0),
            __decorate([u(cc.Node)], t.prototype, "nodeHot", void 0),
            __decorate([u(cc.Node)], t.prototype, "nodePanels", void 0),
            t = __decorate([l], t)
        } (cc.Component);
        o.
    default = d,
        cc._RF.pop()
    },
    {
        "../base/Lang": "Lang",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../control/DataUtil": "DataUtil",
        "../model/Room": "Room"
    }],
    BaseCommand: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "7aba0TAlPhFb7EuWhxZguY3", "BaseCommand"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {}
            return Object.defineProperty(e.prototype, "typeId", {
                get: function() {
                    return ""
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.execute = function(e) {},
            e
        } ();
        o.
    default = n,
        cc._RF.pop()
    },
    {}],
    BaseScene: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "2b496cS4a1GQqEy7CPg+fuu", "BaseScene"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Lang"),
        i = e("./Util"),
        a = cc._decorator,
        r = (a.ccclass, a.property,
        function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                i.
            default.adjustResolution(this.getComponent(cc.Canvas))
            },
            t.prototype.start = function() {
                n.
            default.share.bind(this.node)
            },
            t.prototype.showBox = function(e) {
                return i.
            default.showBox(e)
            },
            t
        } (cc.Component));
        o.
    default = r,
        cc._RF.pop()
    },
    {
        "./Lang": "Lang",
        "./Util": "Util"
    }],
    BetCommand: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "2f8f0m4VO1Kg4j9iVi58yyh", "BetCommand"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/BaseCommand"),
        i = e("../model/Room"),
        a = e("../base/Util"),
        r = e("../const/GEvent"),
        c = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "typeId", {
                get: function() {
                    return "301"
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.execute = function(e) {
                e = e.result,
                i.
            default.share.state = i.
            default.STATE_BET,
                i.
            default.share.time = e[0],
                i.
            default.share.round = e[1],
                i.
            default.share.myBet = null,
                i.
            default.share.saveMyBetInfo();
                for (var t = i.
            default.share.stars.length - 1; t >= 0; t--) i.
            default.share.stars[t] = 0;
                i.
            default.share.hot = -1,
                a.
            default.event.emit(r.
            default.START_BET)
            },
            t
        } (n.
    default);
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "../base/BaseCommand": "BaseCommand",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../model/Room": "Room"
    }],
    BetTipsCommand: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "38a54JvYrdEqaocPCFQk2bG", "BetTipsCommand"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {}
            return Object.defineProperty(e.prototype, "typeId", {
                get: function() {
                    return "102"
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.execute = function(t) {
                e.data = t.result
            },
            e.data = null,
            e
        } ();
        o.
    default = n,
        cc._RF.pop()
    },
    {}],
    BetTips: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "b4c2fPzyIdCt7YcJIw1F5SN", "BetTips"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Box"),
        i = e("../base/Lang"),
        a = e("../base/Loading"),
        r = e("../base/User"),
        c = e("../base/Util"),
        s = e("../command/BetTipsCommand"),
        l = cc._decorator,
        u = l.ccclass,
        d = l.property,
        h = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.nodeArrow = null,
                t.nodeMsg = null,
                t.target = null,
                t
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.onLoad = function() {
                var e = cc.view.getVisibleSize();
                this.node.setContentSize(e)
            },
            t.prototype.start = function() {
                var e = this;
                i.
            default.share.bind(this.node),
                this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this, !1),
                this.nodeMsg.y = this.nodeArrow.y + 170,
                this.nodeArrow.children[0].opacity = 0,
                this.nodeArrow.children[0].runAction(cc.repeatForever(cc.sequence(cc.fadeIn(.3), cc.fadeOut(.3)))),
                this.nodeArrow.children[1].runAction(cc.repeatForever(cc.sequence(cc.fadeOut(.3), cc.fadeIn(.3)))),
                this.nodeArrow.runAction(cc.repeatForever(cc.sequence(cc.moveBy(.3, 0, 50), cc.moveBy(.3, 0, -50)))),
                this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function() {
                    e.nodeMsg.active = !1
                }), cc.delayTime(2), cc.callFunc(function() {
                    s.
                default.data = null,
                    o.hide()
                }))),
                o.shared = this
            },
            t.prototype.showArrow = function(e) {
                e = this.node.convertToNodeSpaceAR(e),
                this.nodeArrow.position = e
            },
            t.prototype.onTouch = function(e) {
                this.node._touchListener.setSwallowTouches(!1),
                (null == this.target || cc.rectContainsPoint(this.target.getBoundingBoxToWorld(), e.getLocation())) && r.
            default.share.betIndex >= r.
            default.share.betList.length - 2 && this.node.runAction(cc.sequence(cc.delayTime(.1), cc.callFunc(function() {
                    s.
                default.data = null,
                    o.hide()
                })))
            },
            t.hide = function() {
                null != o.shared && (o.shared.node.removeFromParent(!0), o.shared = null)
            },
            t.show = function(e, t) {
                o.shared || null == s.
            default.data || r.
            default.share.isHighBet || (a.
            default.show(), c.
            default.showBoxAsync("box/BetTips",
                function(n) {
                    a.
                default.hide();
                    var i = e.convertToWorldSpaceAR(cc.p(0, 0));
                    i.y += t;
                    var r = n.getComponent(o);
                    r.showArrow(i),
                    r.target = e
                }))
            },
            t.shared = null,
            __decorate([d(cc.Node)], t.prototype, "nodeArrow", void 0),
            __decorate([d(cc.Node)], t.prototype, "nodeMsg", void 0),
            t = o = __decorate([u], t)
        } (n.
    default);
        o.
    default = h,
        cc._RF.pop()
    },
    {
        "../base/Box": "Box",
        "../base/Lang": "Lang",
        "../base/Loading": "Loading",
        "../base/User": "User",
        "../base/Util": "Util",
        "../command/BetTipsCommand": "BetTipsCommand"
    }],
    Bets: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "0cfcd0dNQ5Nl7rhVn31HN1C", "Bets"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Sound"),
        i = e("../base/User"),
        a = e("../control/DataUtil"),
        r = e("../base/Lang"),
        c = e("../base/Util"),
        s = e("../base/NumberLabel"),
        l = e("../const/GEvent"),
        u = e("../const/Effect"),
        d = e("../box/BetTips"),
        h = cc._decorator,
        f = h.ccclass,
        p = h.property,
        g = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labBets = [],
                t.spBtns = [],
                t.normalSfs = null,
                t.selectSfs = null,
                t.nodesSelect = null,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                r.
            default.share.bind(this.node);
                for (var e = 0,
                t = 0,
                o = this.labBets; t < o.length; t++) {
                    var n = o[t];
                    n.text = i.
                default.share.betList[e].toString(),
                    this.spBtns.push(n.node.parent.getComponent(cc.Sprite));
                    var s = n.node.parent.getChildByName("icon_jb2");
                    a.
                default.getPayIcon(s),
                    e++
                }
                this.selectSfs = this.spBtns[0].spriteFrame,
                this.normalSfs = this.spBtns[1].spriteFrame,
                this.updateBet(),
                c.
            default.event.on(l.
            default.USER_BET, this.betEffect, this),
                c.
            default.event.on(l.
            default.START_BET, this.showBetTips, this)
            },
            t.prototype.onBet = function(e, t) {
                n.
            default.share.click(),
                i.
            default.share.betIndex = parseInt(t),
                this.updateBet()
            },
            t.prototype.updateBet = function() {
                for (var e = this.spBtns.length - 1; e >= 0; e--) i.
            default.share.betIndex == e ? (this.spBtns[e].spriteFrame = this.selectSfs, this.nodesSelect = this.spBtns[e].node) : this.spBtns[e].spriteFrame = this.normalSfs
            },
            t.prototype.betEffect = function(e) {
                var t = this.node.parent,
                o = e.detail;
                o = t.convertToNodeSpaceAR(o);
                var n = null; (n = a.
            default.getPayIcon(null)).scale = .2 * Math.random() + .9,
                n.rotation = 30 * Math.random() - 15;
                var r = this.nodesSelect.position;
                r = this.node.convertToWorldSpaceAR(r),
                r = t.convertToNodeSpaceAR(r);
                var c = cc.p(0, r.y + (o.y - r.y) / 2);
                Math.random() > .5 ? c.x = r.x - 300 : c.x = r.x + 300,
                n.position = r,
                n.parent = t,
                n.zIndex = 10;
                var s = cc.bezierTo(u.
            default.BET_EFFECT_FLY_TIME, [r, c, o]);
                s.easing(cc.easeOut(3)),
                n.runAction(s),
                n.runAction(cc.sequence(cc.delayTime(u.
            default.BET_EFFECT_FLY_TIME), cc.removeSelf(!0))),
                n.runAction(cc.sequence(cc.scaleTo(.5 * u.
            default.BET_EFFECT_FLY_TIME, 1.8 * n.scale), cc.scaleTo(.5 * u.
            default.BET_EFFECT_FLY_TIME, .9 * n.scale))),
                this.nodesSelect.stopActionByTag(100),
                this.nodesSelect.runAction(cc.sequence(cc.scaleTo(0, 1.2), cc.scaleTo(.1, 1))).setTag(100);
                var l = this.spBtns[i.
            default.share.betIndex].node;
                l.stopActionByTag(100),
                l.runAction(cc.sequence(cc.scaleTo(0, 1.2), cc.scaleTo(.1, 1))).setTag(100)
            },
            t.prototype.showBetTips = function() {
                i.
            default.share.isHighBet || d.
            default.show(this.spBtns[i.
            default.share.betIndex + 1].node, 50)
            },
            t.prototype.onDestroy = function() {
                c.
            default.event.off(l.
            default.USER_BET, this.betEffect, this),
                c.
            default.event.off(l.
            default.START_BET, this.showBetTips, this)
            },
            t.SAVE_KEY = "BET_INDEX",
            __decorate([p(s.
        default)], t.prototype, "labBets", void 0),
            t = __decorate([f], t)
        } (cc.Component);
        o.
    default = g,
        cc._RF.pop()
    },
    {
        "../base/Lang": "Lang",
        "../base/NumberLabel": "NumberLabel",
        "../base/Sound": "Sound",
        "../base/User": "User",
        "../base/Util": "Util",
        "../box/BetTips": "BetTips",
        "../const/Effect": "Effect",
        "../const/GEvent": "GEvent",
        "../control/DataUtil": "DataUtil"
    }],
    Bottom: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "1d980i9dJhJnre+dkgxP7Fu", "Bottom"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/User"),
        i = e("../base/Util"),
        a = e("../const/GEvent"),
        r = e("../control/EnoughUtil"),
        c = e("../control/DataUtil"),
        s = e("../control/UpliveUtil"),
        l = e("../base/Lang"),
        u = e("../proxy/PlayerProxy"),
        d = e("../base/Sound"),
        h = cc._decorator,
        f = h.ccclass,
        p = h.property,
        g = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labCoin = null,
                t.labName = null,
                t.labDay = null,
                t.labDayWin = null,
                t.nodeHead = null,
                t.dayIcon = null,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                i.
            default.event.on(a.
            default.UPDATE_COIN, this.updateInfo, this),
                i.
            default.event.on(a.
            default.UPDATE_DAYWIN, this.updateDayWin, this),
                this.labDay.string = l.
            default.share.find("today_top"),
                this.updateInfo(),
                this.updateDayWin(),
                this.node.getChildByName("head").active = !n.
            default.share.icon,
                s.
            default.loadHead(this.nodeHead, n.
            default.share.icon),
                i.
            default.subName(this.labName, void 0 == n.
            default.share.name ? "": n.
            default.share.name, 8);
                var e = this.node.getChildByName("icon_jb");
                c.
            default.getPayIcon(e),
                c.
            default.getPayIcon(this.dayIcon)
            },
            t.prototype.onPay = function() {
                d.
            default.share.click(),
                r.
            default.pay()
            },
            t.prototype.updateInfo = function() {
                this.labCoin.string = i.
            default.formatThousand(n.
            default.share.coin)
            },
            t.prototype.updateDayWin = function() {
                this.labDayWin.string = u.
            default.share.dayWin + ""
            },
            t.prototype.onDestroy = function() {
                i.
            default.event.off(a.
            default.UPDATE_COIN, this.updateInfo, this),
                i.
            default.event.off(a.
            default.UPDATE_DAYWIN, this.updateDayWin, this)
            },
            __decorate([p(cc.Label)], t.prototype, "labCoin", void 0),
            __decorate([p(cc.Label)], t.prototype, "labName", void 0),
            __decorate([p(cc.Label)], t.prototype, "labDay", void 0),
            __decorate([p(cc.Label)], t.prototype, "labDayWin", void 0),
            __decorate([p(cc.Node)], t.prototype, "nodeHead", void 0),
            __decorate([p(cc.Node)], t.prototype, "dayIcon", void 0),
            t = __decorate([f], t)
        } (cc.Component);
        o.
    default = g,
        cc._RF.pop()
    },
    {
        "../base/Lang": "Lang",
        "../base/Sound": "Sound",
        "../base/User": "User",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../control/DataUtil": "DataUtil",
        "../control/EnoughUtil": "EnoughUtil",
        "../control/UpliveUtil": "UpliveUtil",
        "../proxy/PlayerProxy": "PlayerProxy"
    }],
    BoxConfig: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "09b1ain8cJNXLhGnOrDTmGL", "BoxConfig"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Box"),
        i = e("../base/Sound"),
        a = cc._decorator,
        r = a.ccclass,
        c = a.property,
        s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.mSlider = null,
                t.mProgress = null,
                t.sSlider = null,
                t.sProgress = null,
                t.togMusic = null,
                t.togSound = null,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                e.prototype.start.call(this),
                this.onInit()
            },
            t.prototype.onMusic = function(e, t) {
                i.
            default.share.click(),
                i.
            default.share.enableMusic = !i.
            default.share.enableMusic,
                this.togMusic.getChildByName("on").active = i.
            default.share.enableMusic,
                this.togMusic.getChildByName("off").active = !i.
            default.share.enableMusic
            },
            t.prototype.onSound = function(e, t) {
                i.
            default.share.click(),
                i.
            default.share.enableSound = !i.
            default.share.enableSound,
                this.togSound.getChildByName("on").active = i.
            default.share.enableSound,
                this.togSound.getChildByName("off").active = !i.
            default.share.enableSound
            },
            t.prototype.onInit = function() {
                this.mSlider.handle.node.on(cc.Node.EventType.TOUCH_END, this.onTouchBtn, this),
                this.mSlider.handle.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchBtn, this),
                this.sSlider.handle.node.on(cc.Node.EventType.TOUCH_END, this.onTouchBtn, this),
                this.sSlider.handle.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchBtn, this),
                this.mSlider.progress = i.
            default.share.musicVolume,
                this.mProgress.progress = this.mSlider.progress,
                this.sSlider.progress = i.
            default.share.soundVolume,
                this.sProgress.progress = this.sSlider.progress
            },
            t.prototype.onChangeMusic = function() {
                this.mProgress.progress = this.mSlider.progress,
                i.
            default.share.musicVolume = this.mSlider.progress
            },
            t.prototype.onChangeSound = function() {
                this.sProgress.progress = this.sSlider.progress,
                i.
            default.share.soundVolume = this.sSlider.progress
            },
            t.prototype.onTouchBtn = function() {
                i.
            default.share.click()
            },
            t.prototype.onTouch = function(e) {
                var t = this.node.getChildByName("ppy_xinxi_di");
                cc.rectContainsPoint(t.getBoundingBoxToWorld(), e.getLocation()) || this.onClose()
            },
            t.prototype.onDestroy = function() {
                try {
                    this.mSlider.handle.node.off(cc.Node.EventType.TOUCH_END, this.onTouchBtn, this),
                    this.mSlider.handle.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchBtn, this),
                    this.sSlider.handle.node.off(cc.Node.EventType.TOUCH_END, this.onTouchBtn, this),
                    this.sSlider.handle.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchBtn, this)
                } catch(e) {}
            },
            __decorate([c(cc.Slider)], t.prototype, "mSlider", void 0),
            __decorate([c(cc.ProgressBar)], t.prototype, "mProgress", void 0),
            __decorate([c(cc.Slider)], t.prototype, "sSlider", void 0),
            __decorate([c(cc.ProgressBar)], t.prototype, "sProgress", void 0),
            __decorate([c(cc.Node)], t.prototype, "togMusic", void 0),
            __decorate([c(cc.Node)], t.prototype, "togSound", void 0),
            t = __decorate([r], t)
        } (n.
    default);
        o.
    default = s,
        cc._RF.pop()
    },
    {
        "../base/Box": "Box",
        "../base/Sound": "Sound"
    }],
    BoxLogs: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "eef58oyu4BPDIemLTONMr6V", "BoxLogs"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Box"),
        i = e("../proxy/PlayerProxy"),
        a = e("../base/Util"),
        r = e("../control/DataUtil"),
        c = e("../const/GEvent"),
        s = cc._decorator,
        l = s.ccclass,
        u = s.property,
        d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.scroll = null,
                t.spLine = null,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                e.prototype.start.call(this),
                i.
            default.share.getUserRecord(this.loadRhand.bind(this)),
                a.
            default.event.on(c.
            default.SHOW_WIN, this.onClose, this)
            },
            t.prototype.loadRhand = function(e) {
                this.scroll.content.removeAllChildren();
                var t = new cc.Node;
                t.height = 20,
                t.parent = this.scroll.content;
                for (var o = 1,
                n = 0,
                i = e; n < i.length; n++) {
                    var a = i[n];
                    this.create1(a, o),
                    o++
                }
                this.scroll.scrollToTop()
            },
            t.prototype.create1 = function(e, t) {
                var o = this.create2(e.xiazhu),
                n = new cc.Node;
                o.parent = n,
                o.x = -135,
                n.parent = this.scroll.content,
                n.height = o.height + 10,
                n.anchorY = 0;
                var i = n.height / 2,
                a = new cc.Node;
                a.addComponent(cc.Sprite).spriteFrame = this.spLine.spriteFrame,
                a.parent = n,
                a.setContentSize(this.spLine.node.width, 3),
                a.color = this.spLine.node.color;
                var r = new cc.Node;
                r.parent = n,
                r.x = -255,
                r.y = i;
                var c = r.addComponent(cc.Label);
                c.fontSize = 20,
                c.lineHeight = c.fontSize + 4,
                c.horizontalAlign = cc.Label.HorizontalAlign.CENTER,
                r.color = t % 2 != 0 ? cc.hexToColor("#ffffff") : cc.hexToColor("#fefefe"),
                c.string = this.formatTime(e);
                var s = this.create3(e.kaijiang);
                s.parent = n,
                s.x = 132,
                s.y = (n.height - s.height) / 2
            },
            t.prototype.formatTime = function(e) {
                var t = e.time,
                o = e.round,
                n = new Date(1e3 * t);
                return n.getFullYear() + "/" + a.
            default.numberFill(n.getMonth() + 1, 2) + "/" + a.
            default.numberFill(n.getDate(), 2) + "\nRound:" + o
            },
            t.prototype.create2 = function(e) {
                var t = new cc.Node;
                t.setAnchorPoint(0, 0);
                for (var o = 5,
                n = 0,
                i = e.split(","); n < i.length; n++) {
                    var c = i[n];
                    if ("" != c) {
                        var s = c.split("_");
                        if (2 == s.length) {
                            var l = a.
                        default.loadSprite(r.
                        default.getIcon(parseInt(s[0])));
                            l.parent = t,
                            l.y = o + 31;
                            var u = new cc.Node;
                            u.setContentSize(0, 30),
                            u.anchorX = 0;
                            var d = u.addComponent(cc.Layout);
                            d.type = cc.Layout.Type.HORIZONTAL,
                            d.resizeMode = cc.Layout.ResizeMode.CONTAINER,
                            u.x = 75,
                            u.y = l.y,
                            d.spacingX = 0;
                            var h = new cc.Node;
                            h.setContentSize(46, 37),
                            h.scale = .8,
                            r.
                        default.getPayIcon(h),
                            h.parent = u;
                            var f = new cc.Node;
                            f.parent = u,
                            f.color = cc.Color.BLACK;
                            var p = f.addComponent(cc.Label);
                            p.horizontalAlign = cc.Label.HorizontalAlign.LEFT,
                            p.verticalAlign = cc.Label.VerticalAlign.CENTER,
                            p.fontSize = 22,
                            p.lineHeight = p.fontSize + 4;
                            var g = parseInt(s[1]);
                            p.string = a.
                        default.formatThousand(g),
                            u.parent = t,
                            o += 62
                        }
                    }
                }
                return t.setContentSize(260, o),
                t
            },
            t.prototype.create3 = function(e) {
                var t = new cc.Node;
                if (t.setAnchorPoint(0, 0), t.height = 60, "" == e) return t;
                var o = e.split("_");
                if (0 == o.length) return t;
                var n = parseInt(o[0]),
                i = a.
            default.loadSprite(r.
            default.getIcon(n));
                i.parent = t,
                i.y = t.height / 2;
                var c = new cc.Node;
                c.setContentSize(0, 30),
                c.anchorX = 0;
                var s = c.addComponent(cc.Layout);
                s.type = cc.Layout.Type.HORIZONTAL,
                s.resizeMode = cc.Layout.ResizeMode.CONTAINER,
                c.x = 50,
                c.y = i.y,
                s.spacingX = 0;
                var l = new cc.Node;
                l.setContentSize(46, 37),
                l.scale = .8,
                r.
            default.getPayIcon(l),
                l.parent = c;
                var u = new cc.Node;
                u.anchorX = 0,
                u.parent = c;
                var d = u.addComponent(cc.Label);
                d.fontSize = 24,
                d.horizontalAlign = cc.Label.HorizontalAlign.LEFT,
                d.verticalAlign = cc.Label.VerticalAlign.CENTER;
                var h = parseInt(o[1]);
                return h > 0 ? d.string = "+" + a.
            default.formatThousand(h):
                (u.color = cc.hexToColor("#c0c0c0"), d.string = a.
            default.formatThousand(h)),
                c.parent = t,
                t
            },
            t.prototype.onTouch = function(e) {
                var t = this.node.getChildByName("sgj_bg4");
                cc.rectContainsPoint(t.getBoundingBoxToWorld(), e.getLocation()) || this.onClose()
            },
            t.prototype.onDestroy = function() {
                a.
            default.event.off(c.
            default.SHOW_WIN, this.onClose, this)
            },
            __decorate([u(cc.ScrollView)], t.prototype, "scroll", void 0),
            __decorate([u(cc.Sprite)], t.prototype, "spLine", void 0),
            t = __decorate([l], t)
        } (n.
    default);
        o.
    default = d,
        cc._RF.pop()
    },
    {
        "../base/Box": "Box",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../control/DataUtil": "DataUtil",
        "../proxy/PlayerProxy": "PlayerProxy"
    }],
    BoxMsg: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "8cc9eQ704dLQYm9bztgH/cv", "BoxMsg"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Box"),
        i = e("./Util"),
        a = e("./Loading"),
        r = cc._decorator,
        c = r.ccclass,
        s = r.property,
        l = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.richMsg = null,
                t.scrollView = null,
                t
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.start = function() {
                e.prototype.start.call(this)
            },
            Object.defineProperty(t.prototype, "text", {
                get: function() {
                    return this.richMsg.string
                },
                set: function(e) {
                    this.richMsg.string = e,
                    null == this.scrollView || this.richMsg.node.height < this.scrollView.node.height || (this.richMsg.node.removeComponent(cc.Widget), this.scrollView.scrollToTop())
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.onClose = function() {
                null != this.rhand && (this.rhand(this), this.rhand = null),
                e.prototype.onClose.call(this)
            },
            t.show = function(e, t) {
                a.
            default.show(),
                i.
            default.showBoxAsync("box/BoxMsg",
                function(n) {
                    a.
                default.hide();
                    var i = n.getComponent(o);
                    null != i ? (i.text = e, i.rhand = t) : cc.log("\u52a0\u8f7dBoxMsg\u4e3a\u7a7a\u5bf9\u8c61")
                })
            },
            __decorate([s(cc.RichText)], t.prototype, "richMsg", void 0),
            __decorate([s(cc.ScrollView)], t.prototype, "scrollView", void 0),
            t = o = __decorate([c], t)
        } (n.
    default);
        o.
    default = l,
        cc._RF.pop()
    },
    {
        "./Box": "Box",
        "./Loading": "Loading",
        "./Util": "Util"
    }],
    BoxRank: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "f7e90D4s15BCZpal2fL1q7Z", "BoxRank"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Box"),
        i = e("../proxy/PlayerProxy"),
        a = e("../base/Util"),
        r = e("../control/DataUtil"),
        c = e("../const/GEvent"),
        s = e("../control/UpliveUtil"),
        l = e("../base/Lang"),
        u = cc._decorator,
        d = u.ccclass,
        h = u.property,
        f = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.scroll = null,
                t.spLine = null,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                e.prototype.start.call(this),
                this.offsetRevise(),
                i.
            default.share.getTop(this.loadRhand.bind(this)),
                a.
            default.event.on(c.
            default.SHOW_WIN, this.onClose, this)
            },
            t.prototype.offsetRevise = function() {
                if (l.
            default.LangName) {
                    if ( - 1 != ["cn", "tw", "hk"].indexOf(l.
                default.LangName)) {
                        var e = this.node.getChildByName("lab2");
                        e.x = e.x - 15
                    }
                }
            },
            t.prototype.loadRhand = function(e) {
                this.scroll.content.removeAllChildren();
                var t = new cc.Node;
                t.height = 20,
                t.parent = this.scroll.content;
                for (var o = 1,
                n = 0,
                i = e; n < i.length; n++) {
                    var a = i[n];
                    this.create1(a, o),
                    o++
                }
                this.scroll.scrollToTop(),
                this.scroll.enabled = !1
            },
            t.prototype.create1 = function(e, t) {
                var o = new cc.Node;
                o.parent = this.scroll.content,
                o.height = 76;
                var n = null; (n = this.rank(t)).parent = o,
                n.x = -260; (n = a.
            default.loadSprite("ui/head")).parent = o,
                n.scale = .5,
                n.x = -130,
                (n = this.icon(e.icon)).parent = o,
                n.x = -130,
                (n = a.
            default.loadSprite("ui/head1")).parent = o,
                n.scale = .5,
                n.x = -130;
                var i = new cc.Node;
                i.parent = o,
                i.x = 40;
                var c = i.addComponent(cc.Label);
                c.fontSize = 20,
                c.lineHeight = c.fontSize + 4,
                c.horizontalAlign = cc.Label.HorizontalAlign.CENTER,
                c.verticalAlign = cc.Label.VerticalAlign.TOP,
                c.overflow = cc.Label.Overflow.CLAMP,
                i.setContentSize(200, 26),
                a.
            default.subName(c, void 0 == e.name ? "": e.name, 6);
                var s = new cc.Node;
                s.setContentSize(0, 30);
                var l = s.addComponent(cc.Layout);
                l.type = cc.Layout.Type.HORIZONTAL,
                l.resizeMode = cc.Layout.ResizeMode.CONTAINER,
                s.x = 229,
                l.spacingX = 5;
                var u = new cc.Node;
                u.setContentSize(46, 37),
                u.scale = .8,
                r.
            default.getPayIcon(u),
                u.parent = s,
                (i = new cc.Node).parent = s,
                (c = i.addComponent(cc.Label)).fontSize = 22,
                c.lineHeight = c.fontSize + 4,
                c.horizontalAlign = cc.Label.HorizontalAlign.CENTER,
                c.string = a.
            default.formatThousand(Math.floor(e.score)),
                s.parent = o
            },
            t.prototype.rank = function(e) {
                return a.
            default.loadSprite("ui/rank/" + e)
            },
            t.prototype.icon = function(e) {
                var t = new cc.Node;
                t.setContentSize(45, 45);
                var o = t.addComponent(cc.Mask);
                return o.type = cc.Mask.Type.RECT,
                o.segements = 360,
                s.
            default.loadHead(t, e),
                t
            },
            t.prototype.onTouch = function(e) {
                var t = this.node.getChildByName("sgj_bg4");
                cc.rectContainsPoint(t.getBoundingBoxToWorld(), e.getLocation()) || this.onClose()
            },
            t.prototype.onDestroy = function() {
                a.
            default.event.off(c.
            default.SHOW_WIN, this.onClose, this)
            },
            __decorate([h(cc.ScrollView)], t.prototype, "scroll", void 0),
            __decorate([h(cc.Sprite)], t.prototype, "spLine", void 0),
            t = __decorate([d], t)
        } (n.
    default);
        o.
    default = f,
        cc._RF.pop()
    },
    {
        "../base/Box": "Box",
        "../base/Lang": "Lang",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../control/DataUtil": "DataUtil",
        "../control/UpliveUtil": "UpliveUtil",
        "../proxy/PlayerProxy": "PlayerProxy"
    }],
    BoxSurePay: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "13ca4I3pGlEa4q9f1C82Tvz", "BoxSurePay"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Box"),
        i = e("../base/Util"),
        a = e("../base/Loading"),
        r = e("../base/Lang"),
        c = e("../proxy/PlayerProxy"),
        s = cc._decorator,
        l = s.ccclass,
        u = s.property,
        d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labCoint = null,
                t.nodeCheck1 = null,
                t.nodeCheck2 = null,
                t.rhand = null,
                t
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.start = function() {
                r.
            default.share.bind(this.node),
                this.nodeCheck2.active = !1,
                this.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this, !0)
            },
            t.prototype.onOK = function() {
                null != this.rhand && this.rhand(),
                o.SHOW_TIPS = !1,
                this.nodeCheck2.active && c.
            default.share.setTips(!0),
                this.onClose()
            },
            t.prototype.onCheck = function(e, t) {
                this.nodeCheck1.active = !this.nodeCheck1.active,
                this.nodeCheck2.active = !this.nodeCheck1.active
            },
            t.show = function(e, t) {
                return o.SHOW_TIPS ? (a.
            default.show(), i.
            default.showBoxAsync("box/BoxSurePay",
                function(n) {
                    a.
                default.hide();
                    var i = n.getComponent(o);
                    null != i ? (i.labCoint.string = e.toString(), i.rhand = t) : cc.log("\u52a0\u8f7dBoxMsg\u4e3a\u7a7a\u5bf9\u8c61")
                }), !0) : (null != t && t(), !1)
            },
            t.SHOW_TIPS = !0,
            __decorate([u(cc.Label)], t.prototype, "labCoint", void 0),
            __decorate([u(cc.Node)], t.prototype, "nodeCheck1", void 0),
            __decorate([u(cc.Node)], t.prototype, "nodeCheck2", void 0),
            t = o = __decorate([l], t)
        } (n.
    default);
        o.
    default = d,
        cc._RF.pop()
    },
    {
        "../base/Box": "Box",
        "../base/Lang": "Lang",
        "../base/Loading": "Loading",
        "../base/Util": "Util",
        "../proxy/PlayerProxy": "PlayerProxy"
    }],
    BoxTipsPay: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "a2e7cv4DFdNaowO+EWdGkNd", "BoxTipsPay"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Box"),
        i = e("../base/Util"),
        a = e("../base/Loading"),
        r = e("../base/Lang"),
        c = e("../base/User"),
        s = e("../proxy/HeartProxy"),
        l = e("../const/GEvent"),
        u = cc._decorator,
        d = u.ccclass,
        h = u.property,
        f = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.richMsg = null,
                t.isWaitPlay = !1,
                t.time = 0,
                t
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.start = function() {
                r.
            default.share.bind(this.node),
                this.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this, !0),
                i.
            default.event.on(l.
            default.PAY_CALL_BACK, this.payCallbak, this)
            },
            t.prototype.onOK = function() {
                var e = this;
                s.
            default.share.payment(),
                this.time = 1,
                this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function() {
                    e.time = 0
                }))),
                this.node.removeAllChildren(!0);
                var t = new cc.Node,
                o = t.addComponent(cc.Label);
                o.fontSize = 30,
                o.lineHeight = 34,
                o.string = r.
            default.share.find("click_close"),
                t.parent = this.node,
                this.isWaitPlay = !0
            },
            t.prototype.payCallbak = function() {
                this.node.removeFromParent(!0)
            },
            t.prototype.onClose = function() {
                this.time > 0 || (this.isWaitPlay && s.
            default.share.paymentComplete(), e.prototype.onClose.call(this))
            },
            t.prototype.onTouch = function(e) {
                this.isWaitPlay && this.onClose()
            },
            t.prototype.onDestroy = function() {
                i.
            default.event.off(l.
            default.PAY_CALL_BACK, this.payCallbak, this)
            },
            t.show = function(e) {
                a.
            default.show(),
                i.
            default.showBoxAsync("box/BoxTipsPay",
                function(t) {
                    a.
                default.hide();
                    var n = t.getComponent(o);
                    if (null != n) {
                        var i = null;
                        i = 1 == e ? r.
                    default.share.find("my_coin") + c.
                    default.share.coin:
                        r.
                    default.share.find("pay_msg"),
                        n.richMsg.string = i
                    } else cc.log("\u52a0\u8f7dBoxMsg\u4e3a\u7a7a\u5bf9\u8c61")
                })
            },
            __decorate([h(cc.RichText)], t.prototype, "richMsg", void 0),
            t = o = __decorate([d], t)
        } (n.
    default);
        o.
    default = f,
        cc._RF.pop()
    },
    {
        "../base/Box": "Box",
        "../base/Lang": "Lang",
        "../base/Loading": "Loading",
        "../base/User": "User",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../proxy/HeartProxy": "HeartProxy"
    }],
    BoxUtil: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "df90cuSZsJFC6NwWVgFgp+F", "BoxUtil"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Util"),
        i = e("../base/Loading"),
        a = function() {
            function e() {}
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.show = function(e, t, o) {
                var a = "box_util_" + e,
                r = cc.director.getScene().getChildByName("Canvas").getChildByName(a);
                if (null == r || null == t) i.
            default.show(),
                n.
            default.showBoxAsync(e,
                function(e) {
                    if (i.
                default.hide(), null == e || null == t);
                    else {
                        var n = e.getComponent(t);
                        null != n && (n.data = o)
                    }
                });
                else {
                    var c = r.getComponent(t);
                    null != c && (c.data = o)
                }
            },
            e._instance = null,
            e
        } ();
        o.
    default = a,
        cc._RF.pop()
    },
    {
        "../base/Loading": "Loading",
        "../base/Util": "Util"
    }],
    Box: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "4fa713X111DKK2acymMGkJa", "Box"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Lang"),
        i = cc._decorator,
        a = i.ccclass,
        r = (i.property,
        function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                var e = null != cc.director.getVisibleSize ? cc.director.getVisibleSize() : cc.view.getVisibleSize();
                this.node.setContentSize(e);
                var t = this.node.addComponent(cc.Graphics);
                t.fillColor = cc.color(0, 0, 0, 178.5),
                t.fillRect( - e.width / 2, -e.height / 2, 2 * e.width, 2 * e.height)
            },
            t.prototype.start = function() {
                n.
            default.share.bind(this.node),
                this.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this, !0)
            },
            t.prototype.onTouch = function(e) {},
            t.prototype.onClose = function() {
                this.node.removeFromParent(!0)
            },
            Object.defineProperty(t.prototype, "data", {
                get: function() {
                    return this._data
                },
                set: function(e) {
                    this._data = e
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.onDestroy = function() {
                this.node.off(cc.Node.EventType.TOUCH_END, this.onTouch, this, !0)
            },
            t = __decorate([a], t)
        } (cc.Component));
        o.
    default = r,
        cc._RF.pop()
    },
    {
        "./Lang": "Lang"
    }],
    BroadcastCommand: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "139f3MQ7shOr6qewx5YK1yA", "BroadcastCommand"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/BaseCommand"),
        i = e("../control/BroadcastUtil"),
        a = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "typeId", {
                get: function() {
                    return "308"
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.execute = function(e) {
                e = e.result,
                i.
            default.share.push(e)
            },
            t
        } (n.
    default);
        o.
    default = a,
        cc._RF.pop()
    },
    {
        "../base/BaseCommand": "BaseCommand",
        "../control/BroadcastUtil": "BroadcastUtil"
    }],
    BroadcastUtil: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "4300dLubXJC44WkbN1J67jR", "BroadcastUtil"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        e("../component/Broadcast");
        var n = function() {
            function e() {
                this.list = [],
                this.prefab = null,
                this.localY = [105, 145, 185],
                this.localUse = [!1, !1, !1],
                this.index = 0,
                this.lastTime = 0,
                this.isFirst = !0,
                this.timeMap = {}
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.first = function() {
                var e = this,
                t = new cc.Node;
                t.parent = cc.director.getScene().getChildByName("Canvas");
                var o = 0;
                t.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1), cc.callFunc(function() {--o > 0 || (o = 3 * Math.random() + 2, e.next())
                })))),
                this.next(),
                this.timeMap = {}
            },
            e.prototype.push = function(e) {
                for (this.list.unshift(e); this.list.length > 10;) this.list.pop();
                this.index = 0,
                this.next()
            },
            e.prototype.next = function() {},
            e.prototype.loadPrefab = function() {
                var e = this;
                cc.loader.loadRes("prefab/Broadcast", cc.Prefab,
                function(t, o) {
                    t || (e.prefab = o, e.next())
                })
            },
            e._instance = null,
            e
        } ();
        o.
    default = n,
        cc._RF.pop()
    },
    {
        "../component/Broadcast": "Broadcast"
    }],
    Broadcast: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "7436bSNDrJDgJ3wNZoDtucN", "Broadcast"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Lang"),
        i = e("../control/UpliveUtil"),
        a = cc._decorator,
        r = a.ccclass,
        c = (a.property,
        function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.data = null,
                t.rhand = null,
                t
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                if (!n.
            default.share.isLeft) {
                    var e = this.node.children[1];
                    e.removeComponent(cc.RichText);
                    var t = e.addComponent(cc.Layout);
                    t.type = cc.Layout.Type.HORIZONTAL,
                    t.horizontalDirection = cc.Layout.HorizontalDirection.RIGHT_TO_LEFT,
                    t.resizeMode = cc.Layout.ResizeMode.CONTAINER;
                    for (var o = ["#ffffff", "#ffff80", "#ffffff", "#02b7bf", "#ffffff", "#ffff80"], i = o.length, a = 0; a < i; a++) {
                        var r = new cc.Node,
                        c = r.addComponent(cc.Label);
                        c.fontSize = 22,
                        c.lineHeight = 26,
                        r.height = c.lineHeight,
                        r.color = cc.hexToColor(o[a]),
                        r.parent = e
                    }
                    this.node.opacity = 0
                }
            },
            t.prototype.start = function() {
                var e = this.data,
                t = this.node,
                o = e[0],
                a = e[1],
                r = e[2],
                c = e[4],
                s = t.children[0],
                l = t.children[1],
                u = t.children[2],
                d = t.children[3];
                if (i.
            default.loadHead(d, a), n.
            default.share.isLeft) {
                    var h = l.getComponent(cc.RichText);
                    o = "<color=#ffff80>" + o + "</c>",
                    r = "<color=#ffff80>" + r + "</c>",
                    c = "<color=#02b7bf>" + c + "</c>";
                    var f = n.
                default.share.find("barrage", o, r, c);
                    h.string = f
                } else {
                    l.removeComponent(cc.RichText);
                    var p = l.addComponent(cc.Layout);
                    p.type = cc.Layout.Type.HORIZONTAL,
                    p.horizontalDirection = cc.Layout.HorizontalDirection.RIGHT_TO_LEFT,
                    p.resizeMode = cc.Layout.ResizeMode.CONTAINER;
                    for (var g = [n.
                default.share.find("barrage1"), o, n.
                default.share.find("barrage2"), c, n.
                default.share.find("barrage3"), r], y = g.length, v = 0; v < y; v++) {
                        l.children[v].getComponent(cc.Label).string = g[v]
                    }
                    p.updateLayout()
                }
                t.opacity = 255;
                var m = cc.view.getVisibleSize(),
                _ = l.width;
                s.width = _ + 30;
                var b = s.width / 2 + m.width / 2 + 50;
                n.
            default.share.isLeft ? u.x = -s.width / 2 - 21 : (b = -b, u.x = s.width / 2 + 21),
                d.x = u.x,
                t.x = b,
                t.runAction(cc.sequence(cc.moveTo(10, -b, t.y), cc.callFunc(this.rhand), cc.removeSelf(!0)))
            },
            t = __decorate([r], t)
        } (cc.Component));
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "../base/Lang": "Lang",
        "../control/UpliveUtil": "UpliveUtil"
    }],
    CheckIps: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "e03d1sOrKxJiJAxXRhv+I1P", "CheckIps"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../const/Config"),
        i = e("./BoxMsg"),
        a = e("./Init"),
        r = function() {
            function e() {
                this.list = [],
                this.rhand = null,
                this.ip = null,
                this.port = 0
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function(e) {
                var t = this;
                if (a.
            default.isTest || n.
            default.isTest) e();
                else {
                    this.ip = null,
                    this.rhand = e;
                    var o = "http://dygdckj6ewkc8.cloudfront.net/ips.json?v=" + window.ips_version;
                    cc.loader.load(o,
                    function(e, o) {
                        e ? console.log("\u52a0\u8f7d\u670d\u52a1\u5668\u5217\u8868\u51fa\u9519:", e) : (t.list = o, t.tests())
                    })
                }
            },
            e.prototype.tests = function() {
                var e = this;
                if (null != this.list && 0 != this.list.length) for (var t = function(t) {
                    var o = window.location.protocol + "//" + t.ip + ":" + t.dataPort + "/iptest.lx?time=" + Date.now();
                    cc.loader.load(o,
                    function(n, i) {
                        n || (cc.log("\u670d\u52a1\u5668\u8fd4\u56de", o, i), "lingxian" == i && (null == e.ip ? (e.ip = t.ip, e.port = t.port, e.rhand()) : cc.log("\u5df2\u7ecf\u6709\u6570\u636e\u8fd4\u56de", o, i)))
                    })
                },
                o = 0, n = this.list; o < n.length; o++) {
                    t(n[o])
                } else i.
            default.show("\u670d\u52a1\u5668\u5217\u8868\u52a0\u8f7d\u5931\u8d25")
            },
            e.prototype.getIp = function() {
                return "ws://" + e.share.ip + ":" + (e.share.port + parseInt(n.
            default.gameId))
            },
            e._instance = null,
            e
        } ();
        o.
    default = r,
        cc._RF.pop()
    },
    {
        "../const/Config": "Config",
        "./BoxMsg": "BoxMsg",
        "./Init": "Init"
    }],
    CommandUtil: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "20f5fiHrYhBiJXqRON+JUb+", "CommandUtil"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../proxy/ServerPorxy"),
        i = e("./BetCommand"),
        a = e("./WaitCommand"),
        r = e("./SettCommand"),
        c = e("./Top1Command"),
        s = e("./StarCommand"),
        l = e("./UpdateCoinCommand"),
        u = e("./BroadcastCommand"),
        d = e("./BetTipsCommand"),
        h = function() {
            function e() {}
            return e.init = function() {
                for (var e = n.
            default.share.net,
                t = 0,
                o = [new l.
            default, new i.
            default, new a.
            default, new r.
            default, new c.
            default, new s.
            default, new u.
            default, new d.
            default]; t < o.length; t++) {
                    var h = o[t];
                    e.addCommand(h)
                }
            },
            e
        } ();
        o.
    default = h,
        cc._RF.pop()
    },
    {
        "../proxy/ServerPorxy": "ServerPorxy",
        "./BetCommand": "BetCommand",
        "./BetTipsCommand": "BetTipsCommand",
        "./BroadcastCommand": "BroadcastCommand",
        "./SettCommand": "SettCommand",
        "./StarCommand": "StarCommand",
        "./Top1Command": "Top1Command",
        "./UpdateCoinCommand": "UpdateCoinCommand",
        "./WaitCommand": "WaitCommand"
    }],
    Config: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "98501bMXC9PH51yrp+Orbmn", "Config"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Init"),
        i = function() {
            function e() {}
            return Object.defineProperty(e, "isTest", {
                get: function() {
                    return 1 == window.isTest
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e, "isGold", {
                get: function() {
                    return 1 == window.isGold
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e, "SERVER_ID", {
                get: function() {
                    return e.isTest ? "wss://" + e.IP + "/ws_game/" + (56e3 + parseInt(e.gameId)) : "wss://" + e.IP + "/ws_game/" + (1e4 + parseInt(e.gameId))
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e, "gameId", {
                get: function() {
                    return n.
                default.isTest ? "117": e.isTest ? "1": "101"
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e, "SERVER_ID_DEBUG", {
                get: function() {
                    return "ws://gz.leadercc.com:10" + e.gameId
                },
                enumerable: !0,
                configurable: !0
            }),
            e.IP = e.isTest ? "gztest.leadercc.com": "womo.leadercc.com",
            e
        } ();
        o.
    default = i,
        cc._RF.pop()
    },
    {
        "../base/Init": "Init"
    }],
    ConfirmBox: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "c721dnrEztBhYfO4MSSkmAQ", "ConfirmBox"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Box"),
        i = e("../base/Util"),
        a = e("../base/Loading"),
        r = cc._decorator,
        c = r.ccclass,
        s = r.property,
        l = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.richMsg = null,
                t.rhand = null,
                t
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.onOK = function() {
                null != this.rhand && this.rhand(),
                this.onClose()
            },
            t.show = function(e, t) {
                a.
            default.show(),
                i.
            default.showBoxAsync("box/ConfirmBox",
                function(n) {
                    a.
                default.hide();
                    var i = n.getComponent(o);
                    null != i ? (i.richMsg.string = e, i.rhand = t) : cc.log("\u52a0\u8f7dBoxMsg\u4e3a\u7a7a\u5bf9\u8c61")
                })
            },
            __decorate([s(cc.RichText)], t.prototype, "richMsg", void 0),
            t = o = __decorate([c], t)
        } (n.
    default);
        o.
    default = l,
        cc._RF.pop()
    },
    {
        "../base/Box": "Box",
        "../base/Loading": "Loading",
        "../base/Util": "Util"
    }],
    DataUtil: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "eae0fpTXvZLh4X6Xf64HxCw", "DataUtil"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Data"),
        i = e("../base/Util"),
        a = cc._decorator,
        r = a.ccclass,
        c = (a.property,
        function() {
            function e() {}
            var t;
            return t = e,
            e.getOdds = function() {
                return n.
            default.share.getData("DXYZPBet")
            },
            e.formatBet = function(e) {
                return e >= 1e6 ? Math.floor(e / 1e6) + "M": e >= 1e4 ? Math.floor(e / 1e3) + "K": e.toString()
            },
            e.getWinArea = function(e) {
                if (null == t.type1List) {
                    t.type1List = [],
                    t.type2List = [];
                    for (var o = 0,
                    n = t.getOdds(); o < n.length; o++) {
                        var i = n[o];
                        1 == i.type && t.type1List.push(i.id),
                        2 == i.type && t.type2List.push(i.id)
                    }
                }
                var a = null;
                return (a = 1 == e ? t.type1List: t.type2List)[Math.floor(Math.random() * a.length)]
            },
            e.getIcon = function(e) {
                return - 1 == e ? "ui/small_type1": -2 == e ? "ui/small_type2": "ui/small_" + e
            },
            e.getIcon2 = function(e) {
                return - 1 == e ? "ui/icon_type1": -2 == e ? "ui/icon_type2": "ui/icon_" + e
            },
            e.getPayIcon = function(e) {
                var t = i.
            default.loadSprite("ui/YB_1",
                function(t) {
                    null != e && (t.scale = e.width / t.width)
                });
                return t.parent = e,
                t
            },
            e.type1List = null,
            e.type2List = null,
            e = t = __decorate([r], e)
        } ());
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "../base/Data": "Data",
        "../base/Util": "Util"
    }],
    Data: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "7d5b6EEJlxCa5uJRJ4h6Luz", "Data"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./API"),
        i = function() {
            function e() {
                this.dataMap = {}
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.load = function(e, t) {
                for (var o = this,
                i = [], a = 0, r = e; a < r.length; a++) {
                    var c = r[a];
                    i.push("data/" + c)
                }
                cc.loader.loadResArray(i,
                function(e, a) {
                    if (a.length == i.length) {
                        for (var r = 0,
                        c = a; r < c.length; r++) {
                            var s = c[r],
                            l = s.name;
                            o.dataMap[l] = s.json
                        }
                        t()
                    } else n.
                default.share.restart()
                })
            },
            e.prototype.getData = function(e, t) {
                var o = this.dataMap[e];
                if (!o) return null;
                if (!t) return o;
                for (var n = 0,
                i = o; n < i.length; n++) {
                    var a = i[n];
                    if (a.id == t) return a
                }
            },
            e._instance = null,
            e
        } ();
        o.
    default = i,
        cc._RF.pop()
    },
    {
        "./API": "API"
    }],
    Description: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "c199ey/tBxAoL2np4fOeE53", "Description"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Box"),
        i = e("../base/Lang"),
        a = cc._decorator,
        r = a.ccclass,
        c = a.property,
        s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.scrollView = null,
                t.bg = null,
                t.context = null,
                t.nodeTips = null,
                t.dy = 0,
                t.tipsDy = 0,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                if (e.prototype.start.call(this), this.dy = this.bg.height, this.tipsDy = -this.nodeTips.y - this.bg.height / 2, i.
            default.share.isLeft) this.getMem().parent = this.context;
                else for (var t = 1; t <= 6; t++) this.getMem(t).parent = this.context;
                this.context.getComponent(cc.Layout).updateLayout(),
                this.bg.height = this.context.height + this.dy;
                var o = -this.bg.height / 2 - this.tipsDy;
                this.nodeTips.y = o,
                this.scrollView.node.height = this.bg.height - 120,
                this.scrollView && this.scrollView.scrollToTop()
            },
            t.prototype.getMem = function(e) {
                var t = new cc.Node;
                t.width = this.context.width - 10;
                var o = t.addComponent(cc.Label);
                return o.fontSize = 24,
                o.lineHeight = o.fontSize + 16,
                o.overflow = cc.Label.Overflow.RESIZE_HEIGHT,
                o.verticalAlign = cc.Label.VerticalAlign.CENTER,
                o.string = e >= 1 ? i.
            default.share.find("wfsm" + e) : i.
            default.share.find("wfsm"),
                i.
            default.share.isLeft || (o.horizontalAlign = cc.Label.HorizontalAlign.RIGHT),
                t
            },
            t.prototype.onTouch = function(e) {
                var t = this.node.getChildByName("sgj_bg4");
                cc.rectContainsPoint(t.getBoundingBoxToWorld(), e.getLocation()) || this.onClose()
            },
            __decorate([c(cc.ScrollView)], t.prototype, "scrollView", void 0),
            __decorate([c(cc.Node)], t.prototype, "bg", void 0),
            __decorate([c(cc.Node)], t.prototype, "context", void 0),
            __decorate([c(cc.Node)], t.prototype, "nodeTips", void 0),
            t = __decorate([r], t)
        } (n.
    default);
        o.
    default = s,
        cc._RF.pop()
    },
    {
        "../base/Box": "Box",
        "../base/Lang": "Lang"
    }],
    Effect: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "47e1eGgVmxJ0ZucI9s+5dko", "Effect"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {}
            return e.ROTATE_SPEED = 12,
            e.WAIT_TIME = 3,
            e.WIN_TIME = 5,
            e.TIPS_BET_DELAY = 1,
            e.USER_BET_DELAY_TIPS = 5,
            e.WIN_PANEL_SHOW_TIME = .3,
            e.BET_EFFECT_FLY_TIME = .3,
            e
        } ();
        o.
    default = n,
        cc._RF.pop()
    },
    {}],
    EnoughUtil: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "4c7d9fmRclN749kc2ShQ+6H", "EnoughUtil"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/API"),
        i = e("../base/Util"),
        a = e("../const/GEvent"),
        r = e("../base/User"),
        c = e("../box/ConfirmBox"),
        s = e("../base/Lang"),
        l = e("../const/Config"),
        u = function() {
            function e() {}
            return e.bet = function() {
                return e.coin(r.
            default.share.bet)
            },
            e.coin = function(t) {
                return t > r.
            default.share.coin && (l.
            default.isGold ? e.showGold() : e.showGem(), !0)
            },
            e.showGem = function() {
                c.
            default.show(s.
            default.share.find("pay_msg"),
                function() {
                    e.pay()
                })
            },
            e.showGold = function() {
                c.
            default.show(s.
            default.share.find("gold_receive"),
                function() {})
            },
            e.pay = function() {
                l.
            default.isGold || n.
            default.share.pay(function() {
                    i.
                default.event.emit(a.
                default.UPDATE_COIN)
                })
            },
            e
        } ();
        o.
    default = u,
        cc._RF.pop()
    },
    {
        "../base/API": "API",
        "../base/Lang": "Lang",
        "../base/User": "User",
        "../base/Util": "Util",
        "../box/ConfirmBox": "ConfirmBox",
        "../const/Config": "Config",
        "../const/GEvent": "GEvent"
    }],
    Facebook: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "483a02nMhpMeZzsBxJZxniV", "Facebook"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../GameBox"),
        i = e("../User"),
        a = function() {
            function e() {
                this.noVideoAD = !1,
                this._facebookVideoAd = null,
                this._facebookVideoAdShowing = !1
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function() {
                this.loadVideoAd(),
                FBInstant.logEvent("init_facebook_sdk")
            },
            e.prototype.loadVideoAd = function() {
                var e = this,
                t = n.
            default.share.voideoId;
                if (null != t) {
                    this._facebookVideoAd = null,
                    this._facebookVideoAdShowing = !1;
                    var o = null;
                    FBInstant.getRewardedVideoAsync(t).then(function(e) {
                        return o = e,
                        e.loadAsync()
                    }).then(function() {
                        console.log("\u52a0\u8f7d\u89c6\u9891\u5b8c\u6210\uff01"),
                        e._facebookVideoAd = o
                    }).
                    catch(function(t) {
                        console.error("\u52a0\u8f7d\u89c6\u9891\u5931\u8d25: " + t.message),
                        e.loadWebAd()
                    })
                } else console.log("facebook \u6ca1\u6709\u914d\u7f6e\u89c6\u9891\u5e7f\u544a")
            },
            e.prototype.loadWebAd = function() {
                var e = this,
                t = n.
            default.share.voideoId;
                if (null != t) {
                    var o = null;
                    FBInstant.getInterstitialAdAsync(t).then(function(e) {
                        return (o = e).loadAsync()
                    }).then(function() {
                        console.log("\u52a0\u8f7d\u7f51\u9875\u5e7f\u544a\u6210\u529f\uff01"),
                        e._facebookVideoAd = o
                    }).
                    catch(function(t) {
                        console.error("\u52a0\u8f7d\u7f51\u9875\u5e7f\u544a\u5931\u8d25: " + t.message),
                        e.noVideoAD = !0
                    })
                } else console.log("facebook \u6ca1\u6709\u914d\u7f6e\u7f51\u7edc\u5e7f\u544a")
            },
            e.prototype.login = function(e) {
                i.
            default.share.uid = FBInstant.player.getID(),
                i.
            default.share.name = FBInstant.player.getName(),
                i.
            default.share.icon = "",
                cc.log("facebook \u767b\u5f55\u5b8c\u6210", i.
            default.share.uid, i.
            default.share.name),
                null != e && e()
            },
            e.prototype.share = function(e, t, o, i) {
                console.log("\u5206\u4eab\u56fe\u7247\uff1a", e, t, o),
                n.
            default.share.getImageBase64(t,
                function(t) {
                    FBInstant.context.chooseAsync().then(function() {
                        FBInstant.updateAsync({
                            action: "CUSTOM",
                            cta: "Play",
                            image: t,
                            text: {
                            default:
                                e
                            },
                            template: "WORD_PLAYED",
                            data: {
                                myReplayData: "..."
                            },
                            strategy: "IMMEDIATE",
                            notification: "NO_PUSH"
                        }).then(function() {
                            console.log("Message was sent successfully"),
                            i(!0)
                        }).
                        catch(function() {
                            console.log("Message was sent fail"),
                            i(!1)
                        })
                    }).
                    catch(function() {
                        i(!1)
                    })
                })
            },
            e.prototype.friends = function(e) {
                FBInstant.player.getConnectedPlayersAsync().then(function(t) {
                    for (var o = [], n = {},
                    i = 0, a = t; i < a.length; i++) {
                        var r = a[i];
                        r = r.$1,
                        o.push(r.id),
                        n[r.id] = r.photo
                    }
                    o.push(FBInstant.player.getID()),
                    n[FBInstant.player.getID()] = FBInstant.player.getPhoto(),
                    console.log("\u597d\u53cbIDS:", JSON.stringify(o)),
                    e(o, n)
                })
            },
            e.prototype.showVideoAd = function(e) {
                var t = this;
                return this.noVideoAD ? (console.log("\u6ca1\u6709\u5e7f\u544a..."), void e(!1)) : this._facebookVideoAdShowing ? (cc.log("\u89c6\u9891\u52a0\u8f7d\u4e2d..."), void e(!1)) : null == this._facebookVideoAd ? (cc.log("\u89c6\u9891\u8fd8\u6ca1\u52a0\u8f7d\u5b8c\u6210\uff01\uff01"), void e(!1)) : (this._facebookVideoAdShowing = !0, void this._facebookVideoAd.showAsync().then(function() {
                    t._facebookVideoAdShowing = !1,
                    console.log("\u663e\u793a\u5e7f\u544a\u6210\u529f\uff01"),
                    e(!0),
                    t.loadVideoAd()
                }).
                catch(function(o) {
                    t._facebookVideoAdShowing = !1,
                    console.error("\u663e\u793a\u5e7f\u544a\u5931\u8d25\uff1a", o.message),
                    e(!1),
                    t.loadVideoAd()
                }))
            },
            e.prototype.showBannerAd = function() {
                console.log("FB\u6ca1\u6709Banner\u5e7f\u544a")
            },
            e.prototype.jumpTo = function(e) {
                console.log("\u8df3\u8f6cAPP :", e),
                FBInstant.switchGameAsync(e).
                catch(function(t) {
                    console.log("\u8df3\u8f6cAPP\u5931\u8d25 :", e, t, JSON.stringify(t))
                })
            },
            e.prototype.activePlayers = function(e) {
                cc.log("activePlayers1");
                var t = FBInstant.context.getPlayersAsync().then(function(t) {
                    console.log("activePlayers ", JSON.stringify(t));
                    for (var o = [], n = {},
                    i = 0, a = t; i < a.length; i++) {
                        var r = a[i];
                        r = r.$1,
                        o.push(r.id),
                        n[r.id] = r.photo
                    }
                    console.log("\u73a9\u5bb6\u5217\u8868IDS:", JSON.stringify(o)),
                    e(o, n)
                });
                console.log("activePlayers222 ", JSON.stringify(t)),
                cc.log("activePlayers2")
            },
            e.prototype.updateRank = function(e) {
                FBInstant.getLeaderboardAsync("TopG").then(function(t) {
                    return console.log(t.getName()),
                    t.setScoreAsync(e)
                }).then(function() {
                    return console.log("facebook \u4e0a\u4f20\u5206\u6570\u6210\u529f\uff01\uff01")
                }).
                catch(function(e) {
                    return console.error(e)
                })
            },
            e.prototype.getFacebookRank = function(e, t) {
                var o = 2,
                n = {},
                i = function() {--o > 0 || t(n)
                };
                FBInstant.getLeaderboardAsync("TopG").then(function(t) {
                    return t.getEntriesAsync(e, 0)
                }).then(function(e) {
                    if (null == e) return console.log("\u8fd4\u56de\u6392\u884c\u699c\u6570\u636e\u4e3anull"),
                    void i();
                    for (var t = [], o = 0, a = e; o < a.length; o++) {
                        var r = a[o],
                        c = {
                            i: r.getRank(),
                            uid: r.getPlayer().getID(),
                            name: r.getPlayer().getName(),
                            icon: r.getPlayer().getPhoto(),
                            score: r.getScore()
                        };
                        t.push(c)
                    }
                    n.datas = t,
                    i()
                }).
                catch(function(e) {
                    console.error("\u83b7\u53d6\u4e16\u754c\u6392\u884c\u699c\u5931\u8d25", e),
                    i()
                }),
                FBInstant.getLeaderboardAsync("TopG").then(function(e) {
                    return e.getPlayerEntryAsync()
                }).then(function(e) {
                    if (null == e) return console.log("\u8fd4\u56de\u81ea\u5df1\u6392\u884c\u699c\u6570\u636e\u4e3anull"),
                    void i();
                    n.my = {
                        i: e.getRank(),
                        uid: e.getPlayer().getID(),
                        name: e.getPlayer().getName(),
                        icon: e.getPlayer().getPhoto(),
                        score: e.getScore()
                    },
                    i()
                }).
                catch(function(e) {
                    console.error("\u83b7\u53d6\u81ea\u5df2\u6392\u884c\u699c\u5931\u8d25", e),
                    i()
                })
            },
            e.prototype.getStartData = function() {
                return FBInstant.getEntryPointData()
            },
            e._instance = null,
            e
        } ();
        o.
    default = a,
        cc._RF.pop()
    },
    {
        "../GameBox": "GameBox",
        "../User": "User"
    }],
    FriendTop3: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "0b20fjG9q9K3Zijd4cUxgxv", "FriendTop3"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./RankUtil"),
        i = e("./API"),
        a = cc._decorator,
        r = a.ccclass,
        c = (a.property,
        function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            t.prototype.start = function() {
                var e = this;
                if (i.
            default.share.isWeChat) this.node.active = !1;
                else {
                    for (var t = 0; t < 3; t++) this.updateItem(t, null);
                    n.
                default.share.showFriend(3,
                    function(t, o) {
                        for (var n = t.length,
                        i = 0; i < 3; i++) i < n ? e.updateItem(i, t[i]) : e.updateItem(i, null)
                    })
                }
            },
            t.prototype.updateItem = function(e, t) {
                cc.log("\u8bf7\u91cd\u6784updateItem \u65b9\u6cd5\u8fdb\u884c\u4ed8\u503c\uff01\uff01\uff01\uff01", e)
            },
            t = __decorate([r], t)
        } (cc.Component));
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "./API": "API",
        "./RankUtil": "RankUtil"
    }],
    GEvent: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "0e59aqnvdFLu4kO5IIxgCRU", "GEvent"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {}
            return e.UPDATE_COIN = "UPDATE_COIN",
            e.USER_BET = "USER_BET",
            e.START_BET = "START_BET",
            e.START_ROTATE = "START_ROTATE",
            e.SHOW_SETT = "SHOW_SETT",
            e.SHOW_WIN = "SHOW_WIN",
            e.UPDATE_STAR = "UPDATE_STAR",
            e.SHOW_TYPE_TIPS = "SHOW_TYPE_TIPS",
            e.HIDE_TYPE_TIPS = "HIDE_TYPE_TIPS",
            e.PAY_CALL_BACK = "PAY_CALL_BACK",
            e.UPDATE_DAYWIN = "UPDATE_DAYWIN",
            e.UPDATE_TOP = "UPDATE_TOP",
            e
        } ();
        o.
    default = n,
        cc._RF.pop()
    },
    {}],
    GameBox: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "1bc58G1KShFM5fXkQpP7Zl7", "GameBox"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Util"),
        i = e("./API"),
        a = e("./User"),
        r = function() {
            function e() {
                this.url = "",
                this.gameId = "",
                this.version = "",
                this.moreGameData = null,
                this.gameData = null,
                this.shareData = null,
                this.adData = null
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function(e, t, o) {
                var n = this;
                if (this.gameId = t, "" != e) {
                    "/" != e.substr(e.length - 1) && (e += "/"),
                    this.url = e;
                    var i = 4;
                    this.httpGet("getGameGengduo.jsp", {
                        gameId: t
                    },
                    function(e) {
                        "" != e && (n.moreGameData = JSON.parse(e)),
                        --i <= 0 && o()
                    }),
                    this.httpGet("Boxapi.jsp", {
                        gameId: t
                    },
                    function(e) {
                        "" != e && (n.gameData = JSON.parse(e)),
                        --i <= 0 && o()
                    }),
                    this.httpGet("ShareData.jsp", {
                        gameId: t
                    },
                    function(e) {
                        "" != e && (n.shareData = JSON.parse(e)),
                        --i <= 0 && o()
                    }),
                    this.httpGet("AdvertiseData.jsp", {
                        gameId: t
                    },
                    function(e) {
                        "" != e && (n.adData = JSON.parse(e)),
                        cc.log("this.addata", n.adData),
                        --i <= 0 && o()
                    })
                } else o()
            },
            e.prototype.httpGet = function(e, t, o) {
                var i = this.url + e;
                n.
            default.loadHtml(i, o, t)
            },
            e.prototype.moreGame = function() {
                null != this.moreGameData ? 0 == this.moreGameData.jump ? i.
            default.share.jumpTo(this.moreGameData.erWeiPicture, !0) : 1 == this.moreGameData.jump && i.
            default.share.jumpTo(this.moreGameData.jumpAppId, !1) : cc.log("\u6ca1\u6709\u66f4\u591a\u6e38\u620f\u6570\u636e\uff01\uff01")
            },
            e.prototype.createIcon = function() {
                var e = this,
                t = null;
                if (null != this.gameData && void 0 != this.gameData.icon) {
                    if (i.
                default.share.isFacebook) t = new cc.Node,
                    n.
                default.loadBase64(this.gameData.icon,
                    function(e) {
                        t.addComponent(cc.Sprite).spriteFrame = e
                    });
                    else if (cc.sys.isBrowser) t = new cc.Node,
                    n.
                default.loadSpriteCrossOrigin(this.gameData.icon,
                    function(e) {
                        t.addComponent(cc.Sprite).spriteFrame = e
                    });
                    else {
                        var o = "png";
                        this.gameData.icon.lastIndexOf(".jpg") > 0 && (o = "jpg"),
                        t = n.
                    default.loadSpriteURL(this.gameData.icon, o)
                    }
                    t.setContentSize(100, 100),
                    t.runAction(cc.repeatForever(cc.sequence(cc.delayTime(3), cc.rotateTo(.2, 20), cc.rotateTo(.2, -20), cc.rotateTo(.2, 20), cc.rotateTo(.2, 0)))),
                    t.on(cc.Node.EventType.TOUCH_START,
                    function(t) {
                        i.
                    default.share.jumpTo(e.gameData.qrcode, !0)
                    })
                } else t = new cc.Node;
                return t
            },
            Object.defineProperty(e.prototype, "isShowRevive", {
                get: function() {
                    return null != this.shareData && this.shareData.version == this.version
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "isShowVideoAd", {
                get: function() {
                    return null != this.voideoId
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.uploadPid = function(e) {
                this.httpGet("platform.jsp", {
                    uid: a.
                default.share.uid,
                    gameId: this.gameId,
                    pid: e
                },
                function(e) {})
            },
            Object.defineProperty(e.prototype, "voideoId", {
                get: function() {
                    return this.getAdId(e.AD_VIDEO)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "bannerId", {
                get: function() {
                    return this.getAdId(e.AD_BANNER)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "webId", {
                get: function() {
                    return this.getAdId(e.AD_WEB)
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.getAdId = function(e) {
                if (null == this.adData) return cc.log("\u5e7f\u544a\u6570\u636e\u4e3aNULL"),
                null;
                for (var t = 0,
                o = this.adData; t < o.length; t++) {
                    var n = o[t];
                    if (n.type == e) return n.advertiseId
                }
                return null
            },
            e.prototype.getImageBase64 = function(e, t) {
                this.httpGet("imageTurn.jsp", {
                    imagePath: e
                },
                function(o) {
                    o = "data:image/" + e.substring(e.lastIndexOf(".") + 1).toLowerCase() + ";base64," + o,
                    null != t && t(o)
                })
            },
            e.AD_VIDEO = 1,
            e.AD_BANNER = 2,
            e.AD_WEB = 3,
            e.AD_NONE = 4,
            e._instance = null,
            e
        } ();
        o.
    default = r,
        cc._RF.pop()
    },
    {
        "./API": "API",
        "./User": "User",
        "./Util": "Util"
    }],
    GameScene: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "aa47bT2qM5EXZp9pZBv+vD5", "GameScene"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/BaseScene"),
        i = e("../base/Util"),
        a = e("../const/GEvent"),
        r = e("../model/Room"),
        c = e("../control/ResUtil"),
        s = e("../control/BroadcastUtil"),
        l = e("../proxy/HeartProxy"),
        u = e("../proxy/PlayerProxy"),
        d = e("../proxy/ServerPorxy"),
        h = e("../control/LXSDK"),
        f = cc._decorator,
        p = f.ccclass,
        g = (f.property,
        function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.dtime = 0,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                u.
            default.share.getTodayEarnings(),
                i.
            default.event.on(a.
            default.START_ROTATE, this.startRotate, this),
                i.
            default.event.on(a.
            default.SHOW_WIN, this.showWin, this),
                i.
            default.event.on(a.
            default.SHOW_TYPE_TIPS, this.showTips, this),
                i.
            default.event.on(a.
            default.HIDE_TYPE_TIPS, this.hideTips, this),
                s.
            default.share.first(),
                cc.game.on(cc.game.EVENT_SHOW, this.onResume, this),
                cc.game.on(cc.game.EVENT_HIDE, this.onPause, this),
                l.
            default.share.addLoop(),
                h.
            default.setWinTime(this.node, a.
            default.START_BET, a.
            default.START_ROTATE, 45)
            },
            t.prototype.onResume = function() {
                console.log("\u6e38\u620f\u6062\u590d\uff01\uff01"),
                Date.now() - this.dtime < 5e3 || d.
            default.share.getUserInfo(function() {
                    u.
                default.share.joinRoom(function() {
                        cc.director.loadScene("GameScene")
                    })
                })
            },
            t.prototype.onPause = function() {
                console.log("\u5207\u6362\u540e\u53f0\uff01\uff01"),
                this.dtime = Date.now()
            },
            t.prototype.showTips = function() {},
            t.prototype.hideTips = function() {},
            t.prototype.startRotate = function() {},
            t.prototype.showWin = function() {
                if (! (r.
            default.share.winCoin <= 0)) for (var e = [c.
            default.share.sfsPaper1, c.
            default.share.sfsPaper2, c.
            default.share.sfsPaper3, c.
            default.share.sfsPaper4], t = e.length, o = 50 * Math.random() + 50, n = null, i = 0, a = cc.view.getVisibleSize(), s = 0; s < o; s++) i = Math.floor(Math.random() * t),
                (n = c.
            default.share.createSprite(e[i], 12, -1, null)).parent = this.node,
                n.y = a.height / 2 + 60,
                n.x = (1 * Math.random() - .5) * a.width,
                n.rotation = 360 * Math.random(),
                n.opacity = 50 * Math.random() + 200,
                n.scale = .4 * Math.random() + .8,
                n.runAction(cc.repeatForever(cc.rotateBy(3 * Math.random() + 5, Math.random() > .5 ? 360 : -360))),
                n.runAction(cc.sequence(cc.hide(), cc.delayTime(.05 * s), cc.show(), cc.moveTo(1 * Math.random() + 4, cc.p((1 * Math.random() - .5) * a.width, -a.height / 2 - 100)), cc.removeSelf(!0)))
            },
            t.prototype.onDestroy = function() {
                i.
            default.event.off(a.
            default.START_ROTATE, this.startRotate, this),
                i.
            default.event.off(a.
            default.SHOW_WIN, this.showWin, this),
                i.
            default.event.off(a.
            default.SHOW_TYPE_TIPS, this.showTips, this),
                i.
            default.event.off(a.
            default.HIDE_TYPE_TIPS, this.hideTips, this),
                cc.game.off(cc.game.EVENT_SHOW, this.onResume, this),
                cc.game.off(cc.game.EVENT_HIDE, this.onPause, this),
                h.
            default.clearWinTime(this.node)
            },
            t = __decorate([p], t)
        } (n.
    default));
        o.
    default = g,
        cc._RF.pop()
    },
    {
        "../base/BaseScene": "BaseScene",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../control/BroadcastUtil": "BroadcastUtil",
        "../control/LXSDK": "LXSDK",
        "../control/ResUtil": "ResUtil",
        "../model/Room": "Room",
        "../proxy/HeartProxy": "HeartProxy",
        "../proxy/PlayerProxy": "PlayerProxy",
        "../proxy/ServerPorxy": "ServerPorxy"
    }],
    GameUtil: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "8d4f7zwcdBHAYHj01ggK8tS", "GameUtil"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {}
            return e.formatTime = function(e) {
                var t = Math.floor(e / 3600) + "",
                o = Math.floor(e % 3600 / 60) + "",
                n = Math.floor(e % 60) + "";
                return parseInt(t) < 100 && ("00" + t).substr(t.length),
                ("00" + o).substr(o.length) + ":" + ("00" + n).substr(n.length)
            },
            e.layoutPos = function(e, t, o, n, i) {
                if (! (o <= 0)) {
                    var a = 0,
                    r = o / t,
                    c = r / 2;
                    0 == i ? a = (e - 1) * r + c: 1 == i && (a = -(e - 1) * r - c),
                    n && n(a)
                }
            },
            e
        } ();
        o.
    default = n,
        cc._RF.pop()
    },
    {}],
    HeartProxy: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "cb2a7olKGxJ2JYNj7fzMzGT", "HeartProxy"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./ServerPorxy"),
        i = e("../base/User"),
        a = e("../base/Util"),
        r = e("../const/GEvent"),
        c = e("../base/API"),
        s = e("../base/Loading"),
        l = e("../base/BoxMsg"),
        u = e("../base/Lang"),
        d = e("../control/LXSDK"),
        h = function() {
            function e() {
                this.heartTime = 0,
                this.heartCount = 0,
                this.ping = 0
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.send = function(e, t) {
                for (var o, i = [], a = 2; a < arguments.length; a++) i[a - 2] = arguments[a]; (o = n.
            default.share).send.apply(o, [e, "Heart", t].concat(i))
            },
            e.prototype.payment = function() {
                s.
            default.show(),
                this.send(function(e) {
                    s.
                default.hide(),
                    0 == e.error && c.
                default.share.pay(function() {
                        a.
                    default.event.emit(r.
                    default.UPDATE_COIN)
                    })
                },
                "payment", i.
            default.share.uid)
            },
            e.prototype.paymentComplete = function() {
                s.
            default.show(),
                this.send(function(e) {
                    s.
                default.hide(),
                    e.error
                },
                "payment_complete", i.
            default.share.uid)
            },
            e.prototype.logout = function(e) {
                s.
            default.show(),
                this.send(function(t) {
                    if (s.
                default.hide(), 0 == t.error) {
                        var o = -1;
                        "number" == typeof t.result && (o = t.result),
                        e(o)
                    } else e( - 1)
                },
                "logout", i.
            default.share.uid, 1)
            },
            e.prototype.addLoop = function() {
                var t = "ling_xian_ping_loop_node",
                o = cc.director.getScene().getChildByName("Canvas");
                if (null == o.getChildByName(t)) {
                    var n = new cc.Node;
                    n.parent = o,
                    n.name = t,
                    n.runAction(cc.repeatForever(cc.sequence(cc.delayTime(e.LOOP), cc.callFunc(this.heart.bind(this))))),
                    this.recvHeart()
                }
            },
            e.prototype.heart = function() {
                var t = this;
                if (null != n.
            default.share.net) {
                    if (this.heartTime > 0 && (this.heartCount++, this.heartCount >= 2 && (this.ping = 999), this.heartCount >= e.COUNT)) return d.
                default.heartTimeOut(),
                    n.
                default.share.close(),
                    void l.
                default.show(u.
                default.share.find("net_error"),
                    function() {
                        cc.director.loadScene("LoginScene")
                    });
                    this.heartTime = (new Date).getTime(),
                    this.send(function(e) {
                        t.ping = Date.now() - t.heartTime,
                        t.recvHeart(),
                        t.postPing()
                    },
                    "heart", i.
                default.share.uid)
                }
            },
            e.prototype.postPing = function() {
                this.ping < 1 || d.
            default.ping(this.ping)
            },
            e.prototype.recvHeart = function() {
                this.heartTime = 0,
                this.heartCount = 0
            },
            e.LOOP = 5,
            e.COUNT = 3,
            e._instance = null,
            e
        } ();
        o.
    default = h,
        cc._RF.pop()
    },
    {
        "../base/API": "API",
        "../base/BoxMsg": "BoxMsg",
        "../base/Lang": "Lang",
        "../base/Loading": "Loading",
        "../base/User": "User",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../control/LXSDK": "LXSDK",
        "./ServerPorxy": "ServerPorxy"
    }],
    InitScene: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "5234d214R1K66dbeOl+AaEv", "InitScene"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./BaseScene"),
        i = e("./Init"),
        a = e("./Sound"),
        r = e("./Lang"),
        c = e("./Util"),
        s = e("./API"),
        l = e("../proxy/ServerPorxy"),
        u = cc._decorator,
        d = (u.ccclass, u.property),
        h = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labLoading = null,
                t.progressBar = null,
                t.gameBoxUrl = "",
                t.gameBoxFacebookUrl = "",
                t.version = "1.0.0",
                t.clientID = "y7usoxml",
                t.progressValue = 0,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                i.
            default.init("", this.gameId, this.dataList, this.loadRhand.bind(this), this.initRhand.bind(this)),
                a.
            default.share.bgm(),
                this.labLoading.string = "...",
                c.
            default.event.on("loading", this.loadingUpdate, this),
                this.progressBar.progress = 0
            },
            t.prototype.loadRhand = function() {
                this.labLoading.string = r.
            default.share.find("loading", "0")
            },
            t.prototype.initRhand = function() {
                var e = this;
                cc.log("\u5f00\u59cb\u8fde\u63a5\u670d\u52a1\u5668"),
                l.
            default.share.connect(function() {
                    e.loadData(function() {
                        console.log("\u5f00\u542f\u6e38\u620f\u754c\u9762"),
                        s.
                    default.share.postUser(),
                        cc.director.loadScene(e.nextScene)
                    })
                })
            },
            t.prototype.loadingUpdate = function(e) {
                this.progressValue = e.detail,
                this.updateProgress()
            },
            t.prototype.updateProgress = function() {
                this.labLoading.string = r.
            default.share.find("loading", (100 * this.progressValue).toFixed(0)),
                this.progressBar.progress = this.progressValue
            },
            Object.defineProperty(t.prototype, "gameId", {
                get: function() {
                    return ""
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "dataList", {
                get: function() {
                    return []
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "nextScene", {
                get: function() {
                    return "GameScene"
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.getNetList = function() {
                return []
            },
            t.prototype.loadData = function(e) {
                var t = 0,
                o = 0,
                n = null,
                a = function() {
                    if (++t >= o) e();
                    else {
                        var n = t / o;
                        c.
                    default.event.emit("loading", .3 + .7 * n),
                        i.
                    default.isTest && cc.log("\u767b\u5f55\u4e2d:", t, o)
                    }
                };
                n = [l.
            default.share.getGunScores.bind(l.
            default.share)],
                i.
            default.isTest && n.push(l.
            default.share.getUserInfo.bind(l.
            default.share));
                for (var r = 0,
                s = this.getNetList(); r < s.length; r++) {
                    var u = s[r];
                    n.push(u)
                }
                o = n.length;
                for (var d = 0,
                h = n; d < h.length; d++) { (0, h[d])(a)
                }
            },
            t.prototype.onDestroy = function() {
                c.
            default.event.off("loading", this.loadingUpdate, this)
            },
            __decorate([d(cc.Label)], t.prototype, "labLoading", void 0),
            __decorate([d(cc.ProgressBar)], t.prototype, "progressBar", void 0),
            __decorate([d], t.prototype, "version", void 0),
            t
        } (n.
    default);
        o.
    default = h,
        cc._RF.pop()
    },
    {
        "../proxy/ServerPorxy": "ServerPorxy",
        "./API": "API",
        "./BaseScene": "BaseScene",
        "./Init": "Init",
        "./Lang": "Lang",
        "./Sound": "Sound",
        "./Util": "Util"
    }],
    Init: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "36457WYI+VG8LmBGQi6x5dk", "Init"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./API"),
        i = e("./Lang"),
        a = e("./User"),
        r = e("./Data"),
        c = e("../control/BoxUtil"),
        s = e("./Util"),
        l = e("../control/ResUtil"),
        u = e("./pl/Lingxian"),
        d = function() {
            function e() {}
            return e.init = function(t, o, a, c, u) {
                if (e.callback = u, e.isInit) e.startLogin();
                else {
                    n.
                default.share.init(),
                    e.isInit = !0;
                    var d = 0,
                    h = 0,
                    f = function() {
                        var t = ++d / h;
                        s.
                    default.event.emit("loading", .3 * t),
                        d < h || e.startLogin()
                    };
                    i.
                default.share.init(function() {
                        if (c(), cc.log("\u8bed\u8a00\u5305\u52a0\u8f7d\u5b8c\u6210\uff01\uff01"), cc.sys.isBrowser) {
                            var t = i.
                        default.share.find("title");
                            "title" != t && (window.document.title = t)
                        }
                        a.length > 0 && (cc.log("\u6570\u636e\u8868"), h++, r.
                    default.share.load(a, f)),
                        h++,
                        l.
                    default.share.loadRes(f);
                        for (var o = 0,
                        n = ["Game", "WinPanel", "Top", "box/BetTips"]; o < n.length; o++) {
                            var s = n[o];
                            h++,
                            cc.loader.loadRes("prefab/" + s, cc.Prefab, f)
                        }
                        h++,
                        e.loadRhand(f)
                    })
                }
            },
            e.loadRhand = function(e) {
                if (i.
            default.share.isLeft) e && e();
                else {
                    var t = cc.director.getScene().getChildByName("Canvas").getChildByName("ayu");
                    if (!t) return void(e && e());
                    t.getComponent(cc.Label).string = "\u202b  \u062a\u0641\u0639\u064a  \u200c",
                    t.runAction(cc.sequence(cc.delayTime(.1), cc.callFunc(function() {
                        var o = t.width; (o > 56 || o < 51) && (i.
                    default.isOldWebView = !0),
                        console.log(" cs loadRhand ", i.
                    default.isOldWebView, o),
                        e && e()
                    })))
                }
            },
            e.startLogin = function() {
                s.
            default.event.emit("loading", .31),
                e.isTest ? e.test() : e.login()
            },
            Object.defineProperty(e, "isTest", {
                get: function() {
                    return ! u.
                default.share.isSelf
                },
                enumerable: !0,
                configurable: !0
            }),
            e.login = function() {
                n.
            default.share.login(function() {
                    cc.log("login success", a.
                default.share.uid),
                    e.switchGame()
                },
                function() {
                    n.
                default.share.showLoginButton(e.login)
                })
            },
            e.test = function() {
                null != a.
            default.share.uid && "" != a.
            default.share.uid ? e.switchGame() : c.
            default.share.show("box/TestLogin")
            },
            e.switchGame = function() {
                this.callback()
            },
            e.isInit = !1,
            e
        } ();
        o.
    default = d,
        cc._RF.pop()
    },
    {
        "../control/BoxUtil": "BoxUtil",
        "../control/ResUtil": "ResUtil",
        "./API": "API",
        "./Data": "Data",
        "./Lang": "Lang",
        "./User": "User",
        "./Util": "Util",
        "./pl/Lingxian": "Lingxian"
    }],
    LCActivity01Command: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "f9308fGSrFLuICcc7I9G99a", "LCActivity01Command"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/BaseCommand"),
        i = e("../base/Util"),
        a = e("./LCActivityBtnZP"),
        r = e("./LCActivityUtil"),
        c = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "typeId", {
                get: function() {
                    return "220222001"
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.execute = function(e) {
                e = e.result,
                console.log("\u6267\u884c 220222001\uff1a", e),
                r.
            default.shared.userInfo.typeId = e[0],
                r.
            default.shared.userInfo.count++,
                r.
            default.shared.userInfo.endTime = e[2],
                i.
            default.event.emit(a.
            default.EVENT)
            },
            t
        } (n.
    default);
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "../base/BaseCommand": "BaseCommand",
        "../base/Util": "Util",
        "./LCActivityBtnZP": "LCActivityBtnZP",
        "./LCActivityUtil": "LCActivityUtil"
    }],
    LCActivity02Command: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "d6e7fGm5LlA8akVcciO83Ul", "LCActivity02Command"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/BaseCommand"),
        i = e("../base/Lang"),
        a = e("../base/MyWidget"),
        r = e("../base/User"),
        c = e("./LCActivity"),
        s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.color = "#00ff18",
                t.sf = null,
                t.list = [],
                t.tag = 1001,
                t.parent = null,
                t
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "typeId", {
                get: function() {
                    return "220222002"
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.execute = function(e) {
                var t = this;
                e = e.result,
                null != this.parent && cc.isValid(this.parent) || (this.parent = cc.director.getScene().getChildByName("Canvas")),
                e[0] == r.
            default.share.name ? this.parent.runAction(cc.sequence(cc.delayTime(c.
            default.TIME), cc.callFunc(function() {
                    t.add(e)
                }))) : this.add(e)
            },
            t.prototype.add = function(e) {
                this.list.push(e),
                this.doNext()
            },
            t.prototype.doNext = function() {
                var e, t = this;
                if (0 != this.list.length && !this.parent.getChildByTag(this.tag)) if (null != this.sf && cc.isValid(this.sf)) {
                    var o = this.list.shift(),
                    n = [o[0], o[1], i.
                default.share.find("lcactivity_coin")];
                    if (i.
                default.share.isLeft) for (var a in n) n[a] = "<color=" + this.color + ">" + n[a] + "</color>";
                    else for (var a in n) n[a] = "@@@" + this.color + "&&" + n[a] + "@@@";
                    this.showMsg((e = i.
                default.share).find.apply(e, ["lcactivity_guangbo"].concat(n)))
                } else cc.loader.loadRes("broadcast/banner_bg", cc.SpriteFrame,
                function(e, o) {
                    e && cc.log("\u52a0\u8f7d\u6587\u4ef6\u51fa\u9519", e),
                    t.sf = o,
                    t.doNext()
                })
            },
            t.prototype.showMsg = function(e) {
                var t = new cc.Node;
                t.parent = this.parent,
                t.zIndex = this.tag,
                t.tag = this.tag,
                t.opacity = 0,
                t.y = 99999,
                t.addComponent(cc.Sprite).spriteFrame = this.sf;
                var o = new cc.Node;
                if (o.parent = t, i.
            default.share.isLeft) { (u = o.addComponent(cc.RichText)).fontSize = 32,
                    u.lineHeight = u.fontSize + 4,
                    u.string = e,
                    u.handleTouchEvent = !0
                } else {
                    o.setContentSize(cc.size(0, 42));
                    var n = o.addComponent(cc.Layout);
                    n.type = cc.Layout.Type.HORIZONTAL,
                    n.horizontalDirection = cc.Layout.HorizontalDirection.RIGHT_TO_LEFT,
                    n.resizeMode = cc.Layout.ResizeMode.CONTAINER;
                    for (var a = 0,
                    r = e.split("@@@"); a < r.length; a++) {
                        var c = r[a];
                        if ("" != c) if (c.indexOf("&&") < 0) {
                            var s = new cc.Node;
                            s.parent = o;
                            var l = s.addComponent(cc.Label);
                            l.fontSize = 32,
                            l.lineHeight = l.fontSize + 4,
                            l.string = c
                        } else {
                            var u, d = c.split("&&"),
                            h = new cc.Node;
                            h.parent = o,
                            h.color = cc.hexToColor(d[0]),
                            (u = h.addComponent(cc.Label)).fontSize = 32,
                            u.lineHeight = u.fontSize + 4,
                            u.string = d[1]
                        }
                    }
                }
                this.showMsg2(t, o)
            },
            t.prototype.showMsg2 = function(e, t) {
                var o = this;
                e.opacity = 255,
                e.runAction(cc.sequence(cc.delayTime(.1), cc.callFunc(function() {
                    var n = cc.view.getVisibleSize(),
                    r = t.getContentSize();
                    r.width += 200,
                    r.height += 10,
                    e.setContentSize(r);
                    var c = e.addComponent(cc.Widget);
                    c.isAlignTop = !0,
                    c.top = n.width >= n.height ? 120 : 240,
                    e.addComponent(a.
                default);
                    var s = (n.width + r.width) / 2,
                    l = 2 * s / 200;
                    i.
                default.share.isLeft || (s = -s),
                    e.setPosition(s, 0),
                    e.runAction(cc.sequence(cc.moveTo(l, -s, e.y), cc.callFunc(function() {
                        e.removeFromParent(!0),
                        o.doNext()
                    })))
                })))
            },
            t
        } (n.
    default);
        o.
    default = s,
        cc._RF.pop()
    },
    {
        "../base/BaseCommand": "BaseCommand",
        "../base/Lang": "Lang",
        "../base/MyWidget": "MyWidget",
        "../base/User": "User",
        "./LCActivity": "LCActivity"
    }],
    LCActivityBoxBase: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "0b71bYOinlAkYxNryX5q1dO", "LCActivityBoxBase"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Box"),
        i = cc._decorator,
        a = i.ccclass,
        r = (i.property,
        function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                var e = null != cc.director.getVisibleSize ? cc.director.getVisibleSize() : cc.view.getVisibleSize();
                this.node.setContentSize(e);
                var t = this.node.addComponent(cc.Graphics);
                t.fillColor = cc.color(0, 0, 0, 178.5),
                t.fillRect(0, 0, 4 * e.width, 4 * e.height),
                this.node.setContentSize(cc.size(4 * e.width, 4 * e.height)),
                this.node.scale = Math.min(e.width, e.height) / 1010
            },
            t = __decorate([a], t)
        } (n.
    default));
        o.
    default = r,
        cc._RF.pop()
    },
    {
        "../base/Box": "Box"
    }],
    LCActivityBoxXS: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "b5ed8A4EitFg7HR5ofPHzET", "LCActivityBoxXS"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Lang"),
        i = e("../base/Util"),
        a = e("./LCActivityBoxBase"),
        r = e("./LCActivityBtnXS"),
        c = e("./LCActivityItemXS"),
        s = e("./LCActivityXSPorxy"),
        l = cc._decorator,
        u = l.ccclass,
        d = l.property,
        h = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.item = null,
                t.scrollItem = null,
                t.content = null,
                t.bg = null,
                t
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                var t = cc.director.getScene().getChildByName("Canvas").getChildByName("LCActivityBoxXS");
                t.uuid != this.node.uuid && t.removeFromParent(!0),
                e.prototype.onLoad.call(this),
                this.node.scale = 1
            },
            t.prototype.start = function() {
                e.prototype.start.call(this),
                n.
            default.share.bind(this.node),
                this.updateItem(),
                i.
            default.event.on(s.
            default.UPDATE_ITEM, this.getData, this)
            },
            t.prototype.getData = function() {
                var e = this;
                s.
            default.share.getTaskData(function() {
                    e.updateItem(),
                    i.
                default.event.emit(r.
                default.EVENT)
                })
            },
            t.prototype.updateItem = function() {
                if (!s.
            default.share.isOpen) return this.offEvent(),
                void this.node.removeFromParent(!0);
                this.content.removeAllChildren(!0);
                for (var e = s.
            default.share.count,
                t = 0; t < e; t++) {
                    var o = cc.instantiate(this.item),
                    n = o.getComponent(c.
                default),
                    i = s.
                default.share.dataVoArr[t];
                    n.init(i),
                    o.parent = this.content
                }
                this.content.getComponent(cc.Layout).updateLayout(),
                this.scrollItem.scrollToTop()
            },
            t.prototype.onTouch = function(e) {
                cc.rectContainsPoint(this.bg.getBoundingBoxToWorld(), e.getLocation()) || (this.offEvent(), this.onClose())
            },
            t.prototype.offEvent = function() {
                i.
            default.event.off(s.
            default.UPDATE_ITEM, this.getData, this)
            },
            t.prototype.onDestroy = function() {
                this.offEvent()
            },
            __decorate([d(cc.Prefab)], t.prototype, "item", void 0),
            __decorate([d(cc.ScrollView)], t.prototype, "scrollItem", void 0),
            __decorate([d(cc.Node)], t.prototype, "content", void 0),
            __decorate([d(cc.Node)], t.prototype, "bg", void 0),
            t = __decorate([u], t)
        } (a.
    default);
        o.
    default = h,
        cc._RF.pop()
    },
    {
        "../base/Lang": "Lang",
        "../base/Util": "Util",
        "./LCActivityBoxBase": "LCActivityBoxBase",
        "./LCActivityBtnXS": "LCActivityBtnXS",
        "./LCActivityItemXS": "LCActivityItemXS",
        "./LCActivityXSPorxy": "LCActivityXSPorxy"
    }],
    LCActivityBox: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "0023csMpqFNAZJEmD6qNfZa", "LCActivityBox"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./LCActivityBoxBase"),
        i = e("./LCActivityUtilXS"),
        a = cc._decorator,
        r = a.ccclass,
        c = a.property,
        s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.nodeLight = null,
                t.labCount = null,
                t.nodeOk = null,
                t
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.onLoad = function() {
                var e = this,
                t = null != cc.director.getVisibleSize ? cc.director.getVisibleSize() : cc.view.getVisibleSize();
                this.node.setContentSize(t);
                var o = this.node.addComponent(cc.Graphics);
                o.fillColor = cc.color(0, 0, 0, 178.5),
                o.fillRect( - t.width / 2, -t.height / 2, 2 * t.width, 2 * t.height),
                this.nodeOk.active = !1,
                this.node.runAction(cc.sequence(cc.scaleTo(0, 0), cc.scaleTo(.3, 1.1), cc.scaleTo(.1, .9), cc.scaleTo(.1, 1), cc.delayTime(1), cc.callFunc(function() {
                    e.nodeOk.active = !0
                })))
            },
            t.prototype.start = function() {
                e.prototype.start.call(this),
                this.labCount.string = "x" + o.win,
                this.nodeLight.runAction(cc.repeatForever(cc.rotateBy(5, 360))),
                this.setIcon()
            },
            t.prototype.setIcon = function() {
                var e = this.node.getChildByName("item");
                e.getComponent(cc.Sprite).enabled = !1,
                i.
            default.setCoinIcon(e)
            },
            t.win = 0,
            __decorate([c(cc.Node)], t.prototype, "nodeLight", void 0),
            __decorate([c(cc.Label)], t.prototype, "labCount", void 0),
            __decorate([c(cc.Node)], t.prototype, "nodeOk", void 0),
            t = o = __decorate([r], t)
        } (n.
    default);
        o.
    default = s,
        cc._RF.pop()
    },
    {
        "./LCActivityBoxBase": "LCActivityBoxBase",
        "./LCActivityUtilXS": "LCActivityUtilXS"
    }],
    LCActivityBtnMB: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "1f370miuVdD55hh28Hv3CqK", "LCActivityBtnMB"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./LCActivityButton"),
        i = e("./LCActivityTaskPorxy"),
        a = e("./LCActivityUtil"),
        r = cc._decorator,
        c = r.ccclass,
        s = (r.property,
        function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.start = function() {
                this.tagName = o.EVENT,
                e.prototype.start.call(this)
            },
            t.prototype.updateStatus = function() {
                0 != i.
            default.share.isOpen() ? (this.node.active = !0, this.setCount(i.
            default.share.count), i.
            default.share.count > 0 ? (this.showLight(), this.nodeLight.active = !1) : this.hideLight()) : this.node.active = !1
            },
            t.prototype.onClick = function() {
                e.prototype.onClick.call(this),
                i.
            default.share.getData(function() {
                    a.
                default.shared.box("LCActivityList")
                })
            },
            t.EVENT = "LCActivityBtnMB",
            t = o = __decorate([c], t)
        } (n.
    default));
        o.
    default = s,
        cc._RF.pop()
    },
    {
        "./LCActivityButton": "LCActivityButton",
        "./LCActivityTaskPorxy": "LCActivityTaskPorxy",
        "./LCActivityUtil": "LCActivityUtil"
    }],
    LCActivityBtnXS: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "efdf1RH3o1F65q8OJ61kcCp", "LCActivityBtnXS"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../lcactivity/LCActivityButton"),
        i = e("./LCActivityXSPorxy"),
        a = e("./LCActivityUtil"),
        r = cc._decorator,
        c = r.ccclass,
        s = (r.property,
        function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.start = function() {
                this.tagName = o.EVENT,
                e.prototype.start.call(this)
            },
            t.prototype.updateStatus = function() {
                i.
            default.share.isOpen ? (this.node.active = !0, this.setCount(i.
            default.share.receiveAwardCount), i.
            default.share.receiveAwardCount > 0 ? (this.showLight(), this.nodeLight.active = !1) : this.hideLight(), i.
            default.share.firstLogin && (i.
            default.share.firstLogin = !1, i.
            default.share.getTaskData(function() {
                    a.
                default.shared.box("LCActivityBoxXS")
                }))):
                this.node.active = !1
            },
            t.prototype.onClick = function() {
                e.prototype.onClick.call(this),
                i.
            default.share.getTaskData(function() {
                    a.
                default.shared.box("LCActivityBoxXS")
                })
            },
            t.EVENT = "LCActivityBtnXS",
            t = o = __decorate([c], t)
        } (n.
    default));
        o.
    default = s,
        cc._RF.pop()
    },
    {
        "../lcactivity/LCActivityButton": "LCActivityButton",
        "./LCActivityUtil": "LCActivityUtil",
        "./LCActivityXSPorxy": "LCActivityXSPorxy"
    }],
    LCActivityBtnZP: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "c03cfkOT2xL8Yo+PzAzGX+Y", "LCActivityBtnZP"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Lang"),
        i = e("../control/TimeUtil"),
        a = e("./LCActivityButton"),
        r = e("./LCActivityPorxy"),
        c = e("./LCActivityUtil"),
        s = cc._decorator,
        l = s.ccclass,
        u = s.property,
        d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labTime = null,
                t.canOpen = !1,
                t
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.start = function() {
                this.tagName = o.EVENT,
                e.prototype.start.call(this)
            },
            t.prototype.updateStatus = function() {
                this.node.stopActionByTag(1e3),
                c.
            default.shared.userInfo.count < 1 ? this.node.active = !1 : (this.node.active = !0, this.canOpen = !1, this.setCount(c.
            default.shared.userInfo.count), this.node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(this.updateTime, this), cc.delayTime(1)))).setTag(1e3))
            },
            t.prototype.updateTime = function() {
                var e = c.
            default.shared.userInfo.endTime / 1e3 - i.
            default.now;
                if (e < 0) return this.labTime.string = n.
            default.share.find("lcactivity_open"),
                this.canOpen = !0,
                this.showLight(),
                void(this.nodeLight.active = !1);
                this.labTime.string = i.
            default.formatTimeD(e)
            },
            t.prototype.onClick = function() {
                e.prototype.onClick.call(this),
                this.canOpen && r.
            default.share.getDataByID(c.
            default.shared.userInfo.typeId,
                function() {
                    c.
                default.shared.box("LCActivity")
                })
            },
            t.EVENT = "LCActivityBtnZP",
            __decorate([u(cc.Label)], t.prototype, "labTime", void 0),
            t = o = __decorate([l], t)
        } (a.
    default);
        o.
    default = d,
        cc._RF.pop()
    },
    {
        "../base/Lang": "Lang",
        "../control/TimeUtil": "TimeUtil",
        "./LCActivityButton": "LCActivityButton",
        "./LCActivityPorxy": "LCActivityPorxy",
        "./LCActivityUtil": "LCActivityUtil"
    }],
    LCActivityButton: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "49cfdFNg6RJHrYpC+So/5dq", "LCActivityButton"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Sound"),
        i = e("../base/Util"),
        a = cc._decorator,
        r = a.ccclass,
        c = a.property,
        s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.isAllHide = !1,
                t.tagName = "base",
                t.labCount = null,
                t.nodeLight = null,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                this.isAllHide ? this.node.active = !1 : (null == this.nodeLight && (this.nodeLight = new cc.Node, this.nodeLight.parent = this.node), this.nodeLight.runAction(cc.repeatForever(cc.rotateBy(5, 360))), this.nodeLight.active = !1, i.
            default.event.on(this.tagName, this.updateStatus, this), this.updateStatus())
            },
            t.prototype.onClick = function() {
                n.
            default.share.click()
            },
            t.prototype.updateStatus = function() {},
            t.prototype.setCount = function(e) {
                null != this.labCount && (e < 1 ? this.labCount.node.parent.active = !1 : (this.labCount.node.parent.active = !0, this.labCount.string = e.toString()))
            },
            t.prototype.showLight = function() {
                this.nodeLight.active = !0,
                this.node.stopAllActions(),
                this.node.runAction(cc.repeatForever(cc.sequence(cc.repeat(cc.sequence(cc.rotateTo(.1, 15), cc.rotateTo(.1, -15)), 3), cc.rotateTo(.1, 0), cc.delayTime(1))))
            },
            t.prototype.hideLight = function() {
                this.nodeLight.active = !1,
                this.node.stopAllActions(),
                this.node.rotation = 0
            },
            t.prototype.onDestroy = function() {
                i.
            default.event.off(this.tagName, this.updateStatus, this)
            },
            __decorate([c({
                type: cc.Label,
                tooltip: "\u7ea2\u70b9\u6570\u5b57"
            })], t.prototype, "labCount", void 0),
            __decorate([c({
                type: cc.Node,
                tooltip: "\u80cc\u9762\u53d1\u5149"
            })], t.prototype, "nodeLight", void 0),
            t = __decorate([r], t)
        } (cc.Component);
        o.
    default = s,
        cc._RF.pop()
    },
    {
        "../base/Sound": "Sound",
        "../base/Util": "Util"
    }],
    LCActivityItemXS: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "bab29UfhmRBH6/1POnJ0w0h", "LCActivityItemXS"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Lang"),
        i = e("../base/Sound"),
        a = e("../base/Util"),
        r = e("./LCActivityXSPorxy"),
        c = e("./LCActivityUtilXS"),
        s = cc._decorator,
        l = s.ccclass,
        u = s.property,
        d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.level = null,
                t.body = null,
                t.award = null,
                t.progressBar = null,
                t.height = 40,
                t
            }
            return __extends(t, e),
            t.prototype.init = function(e) {
                this.level = e.level,
                n.
            default.share.bind(this.node),
                this.creationBody(e),
                this.updateProgress(e.score, e.needScore),
                this.updateStatus(e.receiveAward);
                var t = this.award.getChildByName("icon");
                c.
            default.setCoinIcon(t),
                this.award.getChildByName("lab").getComponent(cc.Label).string = e.award + ""
            },
            t.prototype.updateProgress = function(e, t) {
                e = Math.min(e, t),
                this.progressBar.progress = e / t;
                var o = this.progressBar.node.getChildByName("state");
                o.getChildByName("ownLab").getComponent(cc.Label).string = e + "",
                o.getChildByName("needLab").getComponent(cc.Label).string = t + ""
            },
            t.prototype.updateStatus = function(e) {
                var t = this.node.getChildByName("statusArea"),
                o = t.getChildByName("status1"),
                n = t.getChildByName("status2"),
                i = t.getChildByName("status3");
                switch (t.active = !0, e) {
                case 0:
                    o.active = !0,
                    n.active = !1,
                    i.active = !1;
                    break;
                case 1:
                    o.active = !1,
                    n.active = !0,
                    i.active = !1;
                    break;
                case 2:
                    o.active = !1,
                    n.active = !1,
                    i.active = !0
                }
            },
            t.prototype.creationBody = function(e) {
                var t = this,
                o = new cc.Node,
                i = o.addComponent(cc.RichText);
                i.string = "",
                i.fontSize = 24,
                i.lineHeight = i.fontSize + 16,
                i.horizontalAlign = cc.TextAlignment.LEFT;
                var r = Math.floor(2 * this.node.width / 3);
                i.maxWidth = r <= 0 ? 340 : r,
                n.
            default.share.isLeft || (i.horizontalAlign = cc.TextAlignment.LEFT);
                var s = function() {
                    t.body.height = o.height,
                    t.updateSize()
                },
                l = "xs_task_type" + e.type;
                switch (e.displayType) {
                case 1:
                    var u = e.iconID + "";
                    a.
                default.loadNodeSprite(c.
                default.getIconUrl(e.iconID),
                    function(t) {
                        i.imageAtlas = new cc.SpriteAtlas,
                        i.imageAtlas._spriteFrames[u] = t,
                        i.string = "<color=#f1f8fb>" + n.
                    default.share.find(l, " <img src='" + u + "'/> ", e.needScore) + "</c>",
                        s()
                    });
                    break;
                case 2:
                    break;
                case 3:
                    i.string = "<color=#f1f8fb>" + n.
                default.share.find(l, e.numID, e.needScore) + "</c>",
                    s();
                    break;
                default:
                    i.string = "<color=#f1f8fb>" + n.
                default.share.find(l, e.needScore) + "</c>",
                    s()
                }
                o.parent = this.body
            },
            t.prototype.updateSize = function() {
                var e = this.body.height - this.height;
                if (! (e <= 0)) {
                    var t = this.node.getChildByName("bg").getComponent(cc.Sprite);
                    t.sizeMode = cc.Sprite.SizeMode.CUSTOM,
                    t.type = cc.Sprite.Type.SLICED;
                    var o = t.node.height + e;
                    t.node.height = o,
                    this.node.height = o,
                    this.progressBar.node.y -= Math.floor(e / 2)
                }
            },
            t.prototype.onReceive = function() {
                i.
            default.share.click(),
                r.
            default.share.receive(this.level,
                function(e) {
                    console.log(" xs receive ", e),
                    c.
                default.showWin(e[0]),
                    a.
                default.event.emit(r.
                default.UPDATE_ITEM)
                })
            },
            __decorate([u(cc.Node)], t.prototype, "body", void 0),
            __decorate([u(cc.Node)], t.prototype, "award", void 0),
            __decorate([u(cc.ProgressBar)], t.prototype, "progressBar", void 0),
            t = __decorate([l], t)
        } (cc.Component);
        o.
    default = d,
        cc._RF.pop()
    },
    {
        "../base/Lang": "Lang",
        "../base/Sound": "Sound",
        "../base/Util": "Util",
        "./LCActivityUtilXS": "LCActivityUtilXS",
        "./LCActivityXSPorxy": "LCActivityXSPorxy"
    }],
    LCActivityList: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "150827LhbRO7Jzz5zsnDIkS", "LCActivityList"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Lang"),
        i = e("../base/Util"),
        a = e("../const/GEvent"),
        r = e("./LCActivityBox"),
        c = e("./LCActivityBoxBase"),
        s = e("./LCActivityBtnMB"),
        l = e("./LCActivityTaskPorxy"),
        u = e("./LCActivityUtil"),
        d = cc._decorator,
        h = d.ccclass,
        f = d.property,
        p = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.scroll = null,
                t.scrollItem = null,
                t.bg = null,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                e.prototype.start.call(this),
                this.initLists()
            },
            t.prototype.initLists = function() {
                for (var e = l.
            default.share.data,
                t = e[0].score, o = e[1].condType, n = e[1].conds, i = n.length, a = "lcactivity_test_type" + o, r = 0; r < i; r++) {
                    var c = n[r],
                    s = cc.instantiate(this.scrollItem);
                    s.parent = this.scroll.content,
                    this.updateItem(r + 1, s, c, t, a)
                }
                this.scrollItem.active = !1,
                this.scroll.scrollToTop()
            },
            t.prototype.updateItem = function(e, t, o, a, r) {
                n.
            default.share.bind(t);
                var c = cc.find("title/lab", t).getComponent(cc.Label),
                s = cc.find("title/num", t).getComponent(cc.Label),
                u = cc.find("coin/labCoin", t).getComponent(cc.Label),
                d = cc.find("btnReceive", t),
                h = cc.find("bntbtnReceiveLock", t),
                f = cc.find("bntbtnReceiveLab", t);
                d.name = e.toString(),
                c.string = n.
            default.share.find(r, o.number, n.
            default.share.find("lcactivity_coin")),
                s.string = n.
            default.share.format("({1}/{2})", Math.min(a, o.number), o.number),
                u.string = i.
            default.formatNumber(o.reward);
                var p = cc.Color.GREEN;
                l.
            default.share.isReceive(e) ? (d.active = !1, h.active = !1) : a >= o.number ? (h.active = !1, f.active = !1) : (p = cc.Color.RED, d.active = !1, f.active = !1),
                s.node.color = p
            },
            t.prototype.onTouch = function(e) {
                cc.rectContainsPoint(this.bg.getBoundingBoxToWorld(), e.getLocation()) || this.onClose()
            },
            t.prototype.onLine = function(e) {
                var t = parseInt(e.target.name),
                o = e.target.parent,
                n = e.target,
                c = cc.find("bntbtnReceiveLab", o);
                n.active = !1,
                l.
            default.share.receive(t,
                function(e) {
                    c.active = !0,
                    l.
                default.share.count--,
                    r.
                default.win = e[0],
                    u.
                default.shared.box("LCActivityBox"),
                    i.
                default.event.emit(s.
                default.EVENT),
                    i.
                default.event.emit(a.
                default.UPDATE_COIN)
                })
            },
            __decorate([f(cc.ScrollView)], t.prototype, "scroll", void 0),
            __decorate([f(cc.Node)], t.prototype, "scrollItem", void 0),
            __decorate([f(cc.Node)], t.prototype, "bg", void 0),
            t = __decorate([h], t)
        } (c.
    default);
        o.
    default = p,
        cc._RF.pop()
    },
    {
        "../base/Lang": "Lang",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "./LCActivityBox": "LCActivityBox",
        "./LCActivityBoxBase": "LCActivityBoxBase",
        "./LCActivityBtnMB": "LCActivityBtnMB",
        "./LCActivityTaskPorxy": "LCActivityTaskPorxy",
        "./LCActivityUtil": "LCActivityUtil"
    }],
    LCActivityPorxy: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "1db50C5dZlFiJMK/CAOzHvN", "LCActivityPorxy"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/User"),
        i = e("../proxy/ServerPorxy"),
        a = e("./LCActivityUser"),
        r = e("./LCActivityUtil"),
        c = function() {
            function e() {
                this.data = null
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.send = function(e, t) {
                for (var o, n = [], a = 2; a < arguments.length; a++) n[a - 2] = arguments[a]; (o = i.
            default.share).send.apply(o, [e, "RZhuanpan", t].concat(n))
            },
            e.prototype.getData = function(e) {
                this.send(function(t) {
                    0 == t.error && (t = t.result, r.
                default.shared.userInfo = a.
                default.parse(t), null != e && e())
                },
                "getData", n.
            default.share.uid)
            },
            e.prototype.getDataByID = function(e, t) {
                var o = this;
                this.send(function(e) {
                    0 == e.error && (o.data = e.result, null != t && t())
                },
                "getData", n.
            default.share.uid, e)
            },
            e.prototype.open = function(e, t) {
                this.send(function(e) {
                    0 == e.error && (e = e.result, n.
                default.share.coin = e[1], null != t && t(e))
                },
                "open", n.
            default.share.uid, e)
            },
            e.prototype.getRecord = function(e, t) {
                this.send(function(e) {
                    0 == e.error && (e = e.result, null != t && t())
                },
                "getRecord", n.
            default.share.uid, e)
            },
            e._instance = null,
            e
        } ();
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "../base/User": "User",
        "../proxy/ServerPorxy": "ServerPorxy",
        "./LCActivityUser": "LCActivityUser",
        "./LCActivityUtil": "LCActivityUtil"
    }],
    LCActivityTaskCommand: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "edcc5MxT+9JYp3n2ZriRXlR", "LCActivityTaskCommand"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/BaseCommand"),
        i = e("../base/Util"),
        a = e("./LCActivityBtnMB"),
        r = e("./LCActivityTaskPorxy"),
        c = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "typeId", {
                get: function() {
                    return "220302001"
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.execute = function(e) {
                e = e.result,
                r.
            default.share.count = e[0],
                i.
            default.event.emit(a.
            default.EVENT)
            },
            t
        } (n.
    default);
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "../base/BaseCommand": "BaseCommand",
        "../base/Util": "Util",
        "./LCActivityBtnMB": "LCActivityBtnMB",
        "./LCActivityTaskPorxy": "LCActivityTaskPorxy"
    }],
    LCActivityTaskOpenCommand: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "8d5143YKB9PFZEsWBT5NJv6", "LCActivityTaskOpenCommand"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/BaseCommand"),
        i = e("../base/Util"),
        a = e("./LCActivityBtnMB"),
        r = e("./LCActivityTaskPorxy"),
        c = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "typeId", {
                get: function() {
                    return "220302002"
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.execute = function(e) {
                e = e.result,
                r.
            default.share.count = e[0],
                i.
            default.event.emit(a.
            default.EVENT)
            },
            t
        } (n.
    default);
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "../base/BaseCommand": "BaseCommand",
        "../base/Util": "Util",
        "./LCActivityBtnMB": "LCActivityBtnMB",
        "./LCActivityTaskPorxy": "LCActivityTaskPorxy"
    }],
    LCActivityTaskPorxy: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "22af30yJWpLUJWz7J/kMcqc", "LCActivityTaskPorxy"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/User"),
        i = e("../proxy/ServerPorxy"),
        a = function() {
            function e() {
                this.data = null,
                this.count = 0
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.send = function(e, t) {
                for (var o, n = [], a = 2; a < arguments.length; a++) n[a - 2] = arguments[a]; (o = i.
            default.share).send.apply(o, [e, "RTask", t].concat(n))
            },
            e.prototype.getReceiveCount = function(e) {
                var t = this;
                this.send(function(o) {
                    0 == o.error && (t.count = o.result, null != e && e())
                },
                "getReceiveCount", n.
            default.share.uid)
            },
            e.prototype.getData = function(e) {
                var t = this;
                this.send(function(o) {
                    0 == o.error && (t.data = o.result, null != e && e())
                },
                "getData", n.
            default.share.uid)
            },
            e.prototype.receive = function(e, t) {
                this.send(function(e) {
                    0 == e.error && (e = e.result, n.
                default.share.coin = e[1], null != t && t(e))
                },
                "receive", n.
            default.share.uid, e)
            },
            e.prototype.isOpen = function() {
                return this.count >= 0
            },
            e.prototype.isReceive = function(e) {
                var t = this.data[0];
                return void 0 !== t && "string" == typeof t.receives && t.receives.split(",").indexOf(e.toString()) > 0
            },
            e._instance = null,
            e
        } ();
        o.
    default = a,
        cc._RF.pop()
    },
    {
        "../base/User": "User",
        "../proxy/ServerPorxy": "ServerPorxy"
    }],
    LCActivityUser: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "485abW8viBLuIZ7OLGzb3DB", "LCActivityUser"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../control/TimeUtil"),
        i = cc._decorator,
        a = i.ccclass,
        r = (i.property,
        function() {
            function e() {
                this.count = 0,
                this.endTime = 0
            }
            var t;
            return t = e,
            e.prototype.canPlay = function() {
                return ! (this.count < 1) && n.
            default.now - this.endTime / 1e3 > 0
            },
            e.parse = function(e) {
                var o = new t;
                return "number" != typeof e[0] ? o: (o.count = e[0], o.typeId = e[1], o.endTime = e[2], o)
            },
            e = t = __decorate([a], e)
        } ());
        o.
    default = r,
        cc._RF.pop()
    },
    {
        "../control/TimeUtil": "TimeUtil"
    }],
    LCActivityUtilXS: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "0357fYlUTVP3JN4mnHNNNV9", "LCActivityUtilXS"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Lang"),
        i = e("../base/Util"),
        a = e("./LCActivityXSVo"),
        r = function() {
            function e() {}
            return e.getIconUrl = function(e) {
                var t = "lcactivity/iconXS/" + e;
                return "bingo" == a.
            default.GameName ? t = "ball/" + i.
            default.numberFill(e, 2) : t
            },
            e.setIcon = function(t, o, n) {
                var i = "lcactivity/iconXS/" + t;
                return e.getIcon(i, o, n)
            },
            e.setLangIcon1 = function(t, o, i) {
                var a = "lang_ui/" + n.
            default.LangName + "/" + t;
                return e.getIcon(a, o, i)
            },
            e.setLangIcon2 = function(t, o, i) {
                var a = "lang_ui/" + n.
            default.LangName + "/lcactivity/" + t;
                return e.getIcon(a, o, i)
            },
            e.setCoinIcon = function(t, o) {
                return e.getIcon("ui/YB_1", t, o)
            },
            e.getIcon = function(e, t, o) {
                var n = i.
            default.loadSprite(e,
                function(e) {
                    if (null != t) {
                        var n = t.width / e.width,
                        i = t.height / e.height,
                        a = Math.min(n, i); (a > 1 || 0 == a) && (a = 1),
                        e.scale = a,
                        null != o && o(e)
                    }
                });
                return n.parent = t,
                n
            },
            e.showWin = function(e, t) {
                var o = cc.director.getScene().getChildByName("Canvas"),
                n = new cc.Node;
                n.color = cc.color().fromHEX("#FFD700");
                var i = n.addComponent(cc.Label);
                i.fontSize = 40,
                i.lineHeight = 41,
                i.string = "+" + e;
                var a = n.addComponent(cc.LabelOutline);
                a.color = cc.color().fromHEX("#DAA520"),
                a.width = 1,
                n.position = cc.p(0, 0),
                n.parent = o,
                n.opacity = 255,
                n.zIndex = 2e3,
                null != t && t(i, a),
                n.scale = .4,
                n.runAction(cc.sequence(cc.scaleTo(.2, 1.2), cc.scaleTo(.1, .9), cc.scaleTo(.1, 1), cc.moveBy(1.2, 0, 50), cc.removeSelf(!0)))
            },
            e
        } ();
        o.
    default = r,
        cc._RF.pop()
    },
    {
        "../base/Lang": "Lang",
        "../base/Util": "Util",
        "./LCActivityXSVo": "LCActivityXSVo"
    }],
    LCActivityUtil: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "aeb07dMtS9K45Ylt6XKyUOc", "LCActivityUtil"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/User"),
        i = e("../base/Util"),
        a = e("../control/TimeUtil"),
        r = e("../proxy/ServerPorxy"),
        c = e("./LCActivity01Command"),
        s = e("./LCActivity02Command"),
        l = e("./LCActivityXSCommand"),
        u = e("./LCActivityXSUpdateCommand"),
        d = e("./LCActivityXSPorxy"),
        h = e("./LCActivityPorxy"),
        f = e("./LCActivityTaskCommand"),
        p = e("./LCActivityTaskOpenCommand"),
        g = e("./LCActivityTaskPorxy"),
        y = cc._decorator,
        v = y.ccclass,
        m = (y.property,
        function() {
            function e() {
                this.userInfo = null
            }
            var t;
            return t = e,
            Object.defineProperty(e, "shared", {
                get: function() {
                    return null == t._instance && (t._instance = new t),
                    t._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.load = function(e) {
                var t = r.
            default.share.net;
                t.addCommand(new c.
            default),
                t.addCommand(new s.
            default),
                t.addCommand(new f.
            default),
                t.addCommand(new p.
            default),
                t.addCommand(new l.
            default),
                t.addCommand(new u.
            default);
                var o = 0,
                i = function() {++o < 4 || e()
                };
                h.
            default.share.getData(i),
                g.
            default.share.getReceiveCount(i),
                d.
            default.share.gameLogin(i),
                r.
            default.share.send(function(e) {
                    0 == e.error && (e = e.result, a.
                default.init(e[0]), i())
                },
                "common", "getServerTime", n.
            default.share.uid)
            },
            e.prototype.box = function(e) {
                cc.loader.loadRes("lcactivity/" + e, cc.Prefab,
                function(e, t) {
                    i.
                default.showBox(t)
                })
            },
            e._instance = null,
            e = t = __decorate([v], e)
        } ());
        o.
    default = m,
        cc._RF.pop()
    },
    {
        "../base/User": "User",
        "../base/Util": "Util",
        "../control/TimeUtil": "TimeUtil",
        "../proxy/ServerPorxy": "ServerPorxy",
        "./LCActivity01Command": "LCActivity01Command",
        "./LCActivity02Command": "LCActivity02Command",
        "./LCActivityPorxy": "LCActivityPorxy",
        "./LCActivityTaskCommand": "LCActivityTaskCommand",
        "./LCActivityTaskOpenCommand": "LCActivityTaskOpenCommand",
        "./LCActivityTaskPorxy": "LCActivityTaskPorxy",
        "./LCActivityXSCommand": "LCActivityXSCommand",
        "./LCActivityXSPorxy": "LCActivityXSPorxy",
        "./LCActivityXSUpdateCommand": "LCActivityXSUpdateCommand"
    }],
    LCActivityXSCommand: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "5fe714/lYRPur+T8NflmQDp", "LCActivityXSCommand"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/BaseCommand"),
        i = e("../base/Util"),
        a = e("./LCActivityBtnXS"),
        r = e("./LCActivityXSPorxy"),
        c = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "typeId", {
                get: function() {
                    return "220226004"
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.execute = function(e) {
                e = e.result,
                console.log(" \u6d4b\u8bd5 \u65b0\u624b\u6d3b\u52a8 \u6709\u53ef\u9886\u53d6\u5956\u52b1 ", e),
                r.
            default.share.setReceiveAward(e),
                i.
            default.event.emit(a.
            default.EVENT)
            },
            t
        } (n.
    default);
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "../base/BaseCommand": "BaseCommand",
        "../base/Util": "Util",
        "./LCActivityBtnXS": "LCActivityBtnXS",
        "./LCActivityXSPorxy": "LCActivityXSPorxy"
    }],
    LCActivityXSPorxy: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "b40e2TjsO9PU6Ou6WGfcAqk", "LCActivityXSPorxy"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/User"),
        i = e("../proxy/ServerPorxy"),
        a = e("./LCActivityXSVo"),
        r = e("../base/Util"),
        c = e("../const/GEvent"),
        s = e("../model/Room"),
        l = e("../proxy/PlayerProxy"),
        u = function() {
            function e() {
                this.firstLogin = !1,
                this.dataVoArr = null
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.send = function(e, t) {
                for (var o, n = [], a = 2; a < arguments.length; a++) n[a - 2] = arguments[a]; (o = i.
            default.share).send.apply(o, [e, "XTask", t].concat(n))
            },
            e.prototype.setReceiveAward = function(e) {
                for (var t = 0,
                o = e; t < o.length; t++) for (var n = o[t], i = 0, a = this.dataVoArr; i < a.length; i++) {
                    var r = a[i];
                    r.level == n && r.setReceiveAward(n, 1)
                }
            },
            Object.defineProperty(e.prototype, "receiveAwardCount", {
                get: function() {
                    for (var e = 0,
                    t = 0,
                    o = this.dataVoArr; t < o.length; t++) {
                        1 == o[t].receiveAward && e++
                    }
                    return e
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "count", {
                get: function() {
                    return null == this.dataVoArr || this.dataVoArr.length < 1 ? 0 : this.dataVoArr.length
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "isOpen", {
                get: function() {
                    return this.count > 0
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.creatieVo = function(e) {
                if (this.dataVoArr = [], !(null == e || e.length < 1)) for (var t = 0; t < e.length; t++) {
                    var o = e[t],
                    n = a.
                default.creatieVo(o);
                    this.dataVoArr.push(n)
                }
            },
            e.prototype.gameLogin = function(e) {
                var t = this;
                this.firstLogin = !0,
                this.send(function(o) {
                    0 == o.error && t.getTaskData(e)
                },
                "gameLogin", n.
            default.share.uid)
            },
            e.prototype.getTaskData = function(e) {
                var t = this;
                this.send(function(o) {
                    0 == o.error && (o = o.result, console.log(" \u6d4b\u8bd5 \u65b0\u624b\u4efb\u52a1 \u83b7\u53d6\u4efb\u52a1\u6d3b\u52a8 ", o, r.
                default.formatToZoneTime2(Date.now())), t.creatieVo(o), null != e && e())
                },
                "getTaskData", n.
            default.share.uid)
            },
            e.prototype.receive = function(t, o) {
                this.send(function(t) {
                    0 == t.error && (t = t.result, e.playReward(t[0], t[1]), null != o && o(t))
                },
                "receive", n.
            default.share.uid, t)
            },
            e.playReward = function(e, t) {
                if (console.log(" \u6d4b\u8bd5 \u4f59\u989d 1 ", n.
            default.share.coin, t, s.
            default.share.winCoin), s.
            default.share.state == s.
            default.STATE_SETT) return n.
            default.share.coin = t - s.
            default.share.winCoin,
                console.log(" \u6d4b\u8bd5 \u4f59\u989d \u7ed3\u7b97\u72b6\u6001 1 ", n.
            default.share.coin, t, s.
            default.share.winCoin),
                r.
            default.event.emit(c.
            default.UPDATE_COIN),
                n.
            default.share.coin = t,
                void console.log(" \u6d4b\u8bd5 \u4f59\u989d \u7ed3\u7b97\u72b6\u6001 1 ", n.
            default.share.coin, t, s.
            default.share.winCoin);
                n.
            default.share.coin = t,
                r.
            default.event.emit(c.
            default.UPDATE_COIN),
                l.
            default.share.getTodayEarnings(),
                console.log(" \u6d4b\u8bd5 \u4f59\u989d \u975e\u7ed3\u7b97\u72b6\u6001 ", n.
            default.share.coin, t, s.
            default.share.winCoin)
            },
            e.UPDATE_ITEM = "UPDATE_ITEM",
            e._instance = null,
            e
        } ();
        o.
    default = u,
        cc._RF.pop()
    },
    {
        "../base/User": "User",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../model/Room": "Room",
        "../proxy/PlayerProxy": "PlayerProxy",
        "../proxy/ServerPorxy": "ServerPorxy",
        "./LCActivityXSVo": "LCActivityXSVo"
    }],
    LCActivityXSUpdateCommand: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "f7dabgvWypJfo6Q7kE9Bqjt", "LCActivityXSUpdateCommand"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/BaseCommand"),
        i = e("../base/Util"),
        a = e("./LCActivityBtnXS"),
        r = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "typeId", {
                get: function() {
                    return "220226003"
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.execute = function(e) {
                e = e.result,
                console.log(" \u6d4b\u8bd5 \u65b0\u624b\u6d3b\u52a8 \u66f4\u65b0 ", e),
                i.
            default.event.emit(a.
            default.EVENT)
            },
            t
        } (n.
    default);
        o.
    default = r,
        cc._RF.pop()
    },
    {
        "../base/BaseCommand": "BaseCommand",
        "../base/Util": "Util",
        "./LCActivityBtnXS": "LCActivityBtnXS"
    }],
    LCActivityXSVo: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "1f804j/dWVC4KBbtTmpORdy", "LCActivityXSVo"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {}
            return e.prototype.setReceiveAward = function(e, t) {
                void 0 === t && (t = 0),
                null == this.needScore || this.needScore <= 0 ? this._receiveAward = 0 : null != e ? e == this.level && (this._receiveAward = t) : this._receiveAward = this.score >= this.needScore ? 1 : 0
            },
            Object.defineProperty(e.prototype, "receiveAward", {
                get: function() {
                    return this._receiveAward
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "displayType", {
                get: function() {
                    var e = this.paramTemplate;
                    return e ? e.displayType: (console.log(" \u6d4b\u8bd5 vo \u663e\u793a\u7c7b\u578b\u51fa\u9519"), null)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "needScore", {
                get: function() {
                    var e = this.paramTemplate;
                    if (!e) return console.log(" \u6d4b\u8bd5 vo needScore\u51fa\u9519"),
                    null;
                    var t = e.needScore;
                    return this.paramArr[t - 1]
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "iconID", {
                get: function() {
                    var e = this.paramTemplate;
                    if (!e) return console.log(" \u6d4b\u8bd5 vo iconID\u51fa\u9519"),
                    null;
                    var t = e.iconID;
                    return this.paramArr[t - 1]
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "langID", {
                get: function() {
                    var e = this.paramTemplate;
                    if (!e) return console.log(" \u6d4b\u8bd5 vo langID\u51fa\u9519"),
                    null;
                    var t = e.langID;
                    return this.paramArr[t - 1]
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "numID", {
                get: function() {
                    var e = this.paramTemplate;
                    if (!e) return console.log(" \u6d4b\u8bd5 vo numID\u51fa\u9519"),
                    null;
                    var t = e.numID;
                    return this.paramArr[t - 1]
                },
                enumerable: !0,
                configurable: !0
            }),
            e.creatieVo = function(t) {
                var o = new e;
                return null == t || t.length < 1 ? null: (o.level = t[0], o.type = t[1], o.award = t[5], o.score = t[6], o.paramManage(t[2], t[3], t[4]), o.setReceiveAward(), o)
            },
            e.prototype.paramManage = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this.paramArr = e
            },
            Object.defineProperty(e.prototype, "paramTemplate", {
                get: function() {
                    return e.TASK_TYPE[e.GameName][this.type]
                },
                enumerable: !0,
                configurable: !0
            }),
            e.GameName = "wheel",
            e.TASK_TYPE = {
                fish: {
                    1 : {
                        iconID: 1,
                        needScore: 2,
                        displayType: 1
                    }
                },
                wheel: {
                    1 : {
                        iconID: 1,
                        needScore: 2,
                        displayType: 1
                    },
                    2 : {
                        iconID: 1,
                        needScore: 2,
                        displayType: 1
                    },
                    3 : {
                        needScore: 1,
                        displayType: 0
                    }
                },
                liberty_bell: {
                    1 : {
                        iconID: 1,
                        needScore: 2,
                        displayType: 1
                    },
                    2 : {
                        numID: 1,
                        needScore: 2,
                        displayType: 3
                    }
                },
                liberty_bell2: {
                    1 : {
                        iconID: 1,
                        needScore: 2,
                        displayType: 1
                    }
                },
                race: {
                    1 : {
                        iconID: 1,
                        needScore: 2,
                        displayType: 1
                    },
                    2 : {
                        iconID: 1,
                        needScore: 2,
                        displayType: 1
                    },
                    3 : {
                        needScore: 1,
                        displayType: 0
                    }
                },
                mario: {
                    1 : {
                        iconID: 1,
                        needScore: 2,
                        displayType: 1
                    }
                },
                liberty_bell3: {
                    1 : {
                        iconID: 1,
                        needScore: 2,
                        displayType: 1
                    }
                },
                fish4: {
                    1 : {
                        iconID: 1,
                        needScore: 2,
                        displayType: 1
                    }
                },
                liberty_bell4: {
                    1 : {
                        iconID: 1,
                        needScore: 2,
                        displayType: 1
                    }
                },
                bingo: {
                    1 : {
                        iconID: 1,
                        needScore: 2,
                        displayType: 1
                    },
                    2 : {
                        needScore: 1,
                        displayType: 0
                    }
                },
                zhuanpan2: {
                    1 : {
                        iconID: 1,
                        needScore: 2,
                        displayType: 1
                    },
                    2 : {
                        iconID: 1,
                        needScore: 2,
                        displayType: 1
                    },
                    3 : {
                        needScore: 1,
                        displayType: 1
                    }
                }
            },
            e
        } ();
        o.
    default = n,
        cc._RF.pop()
    },
    {}],
    LCActivity: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "854e3lZAM5A76j28/pbJIWw", "LCActivity"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Lang"),
        i = e("../base/Loading"),
        a = e("../base/Sound"),
        r = e("../base/Util"),
        c = e("../const/GEvent"),
        s = e("./LCActivityBox"),
        l = e("./LCActivityBoxBase"),
        u = e("./LCActivityBtnZP"),
        d = e("./LCActivityPorxy"),
        h = e("./LCActivityUtil"),
        f = e("./LCActivityUtilXS"),
        p = cc._decorator,
        g = p.ccclass,
        y = p.property,
        v = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.nodeGift = null,
                t.nodeItemLight = null,
                t.nodeLight = null,
                t.nodeScroll = null,
                t.nodeScrollItem = null,
                t.labCount = null,
                t.labLogsTitle = null,
                t.itemsCoin = [],
                t.lightIndex = 0,
                t
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.start = function() {
                e.prototype.start.call(this),
                this.initItems(),
                this.initLogs(),
                this.updateCount(),
                this.hideLight(),
                this.nodeItemLight.opacity = 0
            },
            t.prototype.initItems = function() {
                for (var e = d.
            default.share.data[1], t = e.length, o = 0; o < 8; o++) {
                    var n = 0,
                    i = this.nodeGift.children[o + 1];
                    n = o < t ? e[o].reward: Math.floor(1e4 * Math.floor(1 + 10 * Math.random())),
                    i.getChildByName("labCount").getComponent(cc.Label).string = "x" + r.
                default.formatNumber(n),
                    this.itemsCoin.push(n)
                }
            },
            t.prototype.setItemIcon = function(e) {
                e.getComponent(cc.Sprite).enabled = !1,
                f.
            default.setCoinIcon(e)
            },
            t.prototype.initLogs = function() {
                this.nodeScrollItem.active = !1;
                for (var e = 0,
                t = d.
            default.share.data[2]; e < t.length; e++) {
                    var o = t[e],
                    i = cc.instantiate(this.nodeScrollItem);
                    i.active = !0,
                    i.getComponent(cc.Label).string = n.
                default.share.find("lcactivity_logs", o[0], o[1], n.
                default.share.find("lcactivity_coin")),
                    i.parent = this.nodeScroll.content
                }
                this.nodeScroll.scrollToTop()
            },
            t.prototype.updateCount = function() {
                this.labCount.string = n.
            default.share.find("lcactivity_count", h.
            default.shared.userInfo.count)
            },
            t.prototype.onStart = function() {
                var e = this;
                a.
            default.share.click(),
                this.nodeGift.getActionByTag(1) || h.
            default.shared.userInfo.canPlay() && (i.
            default.show(), this.showLight(), d.
            default.share.open(h.
            default.shared.userInfo.typeId,
                function(t) {
                    i.
                default.hide(),
                    e.nodeGift.rotation = e.nodeGift.rotation % 360;
                    for (var n = t[0], a = 0, r = e.itemsCoin.length - 1; r >= 0; r--) if (e.itemsCoin[r] == n) {
                        a = r;
                        break
                    }
                    s.
                default.win = n;
                    var c = -45 * a + 1800,
                    l = cc.rotateTo(o.TIME, c);
                    l.easing(cc.easeSineInOut()),
                    e.nodeGift.runAction(cc.sequence(l, cc.callFunc(function() {
                        var t = c % 360;
                        e.nodeItemLight.runAction(cc.sequence(cc.rotateTo(0, -t), cc.fadeIn(0), cc.blink(1, 5), cc.fadeOut(0)))
                    }), cc.delayTime(1), cc.callFunc(e.playCmp, e))).setTag(1)
                }))
            },
            t.prototype.playCmp = function() {
                console.log("\u52a8\u753b\u5b8c\u6210"),
                r.
            default.event.emit(c.
            default.UPDATE_COIN),
                h.
            default.shared.userInfo.count--,
                this.updateCount(),
                this.hideLight(),
                r.
            default.event.emit(u.
            default.EVENT),
                h.
            default.shared.box("LCActivityBox")
            },
            t.prototype.onTouch = function(e) {
                this.nodeGift.getActionByTag(1) || cc.rectContainsPoint(this.node.getChildByName("touch").getBoundingBoxToWorld(), e.getLocation()) || this.onClose()
            },
            t.prototype.lightLoop = function() {
                this.lightIndex++;
                for (var e = 0; e < this.nodeLight.childrenCount; e++) this.nodeLight.children[e].active = (this.lightIndex + e) % 3 == 0
            },
            t.prototype.showLight = function() {
                this.nodeLight.stopAllActions(),
                this.nodeLight.runAction(cc.repeatForever(cc.sequence(cc.callFunc(this.lightLoop, this), cc.delayTime(.1)))).setTag(1)
            },
            t.prototype.hideLight = function() {
                this.nodeLight.stopAllActions();
                for (var e = 0; e < this.nodeLight.childrenCount; e++) this.nodeLight.children[e].active = !1
            },
            t.TIME = 3,
            __decorate([y(cc.Node)], t.prototype, "nodeGift", void 0),
            __decorate([y(cc.Node)], t.prototype, "nodeItemLight", void 0),
            __decorate([y(cc.Node)], t.prototype, "nodeLight", void 0),
            __decorate([y(cc.ScrollView)], t.prototype, "nodeScroll", void 0),
            __decorate([y(cc.Node)], t.prototype, "nodeScrollItem", void 0),
            __decorate([y(cc.Label)], t.prototype, "labCount", void 0),
            __decorate([y(cc.Label)], t.prototype, "labLogsTitle", void 0),
            t = o = __decorate([g], t)
        } (l.
    default);
        o.
    default = v,
        cc._RF.pop()
    },
    {
        "../base/Lang": "Lang",
        "../base/Loading": "Loading",
        "../base/Sound": "Sound",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "./LCActivityBox": "LCActivityBox",
        "./LCActivityBoxBase": "LCActivityBoxBase",
        "./LCActivityBtnZP": "LCActivityBtnZP",
        "./LCActivityPorxy": "LCActivityPorxy",
        "./LCActivityUtil": "LCActivityUtil",
        "./LCActivityUtilXS": "LCActivityUtilXS"
    }],
    LXSDK: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "5df66o0GDFIL5dsXh97oq5b", "LXSDK"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Util"),
        i = function() {
            function e() {}
            return e.netError = function() {
                e.error(1)
            },
            e.loginFail = function() {
                e.error(2)
            },
            e.plError = function(t) {
                e.error(3, t)
            },
            e.refreshToken = function() {
                e.error(4)
            },
            e.refreshTokenComplete = function() {
                e.error(5)
            },
            e.showWinTimeOut = function() {
                e.error(6)
            },
            e.heartTimeOut = function() {
                e.error(7)
            },
            e.jsonError = function(t) {
                e.error(8, 0, t)
            },
            e.netDisconnected = function() {
                e.error(9)
            },
            e.setWinTime = function(t, o, i, a) {
                t.getChildByName(e.TIME_OUT_NODE) ? console.log("xxx Node\u5df2\u5b58\u57281") : (e.startFunc && n.
            default.event.off(o, e.startFunc), e.winFunc && n.
            default.event.off(i, e.winFunc), e.startFunc = function() {
                    if (t.getChildByName(e.TIME_OUT_NODE)) console.log("xxx Node\u5df2\u5b58\u57282");
                    else {
                        var o = new cc.Node;
                        o.parent = t,
                        o.name = e.TIME_OUT_NODE,
                        o.runAction(cc.sequence(cc.delayTime(a), cc.callFunc(function() {
                            console.log("xxx \u8d85\u65f6"),
                            e.showWinTimeOut()
                        }))),
                        console.log("xxx \u589e\u52a0\u4e8b\u4ef6")
                    }
                },
                e.winFunc = function() {
                    console.log("xxx \u5220\u9664\u4e8b\u4ef6");
                    var o = t.getChildByName(e.TIME_OUT_NODE);
                    o && o.removeFromParent(!0)
                },
                e.startEvent = o, e.winEvent = i, n.
            default.event.on(o, e.startFunc), n.
            default.event.on(i, e.winFunc), e.startFunc())
            },
            e.clearWinTime = function(t) {
                if (cc.isValid(t)) {
                    var o = t.getChildByName(e.TIME_OUT_NODE);
                    o && o.removeFromParent(!0),
                    n.
                default.event.off(e.startEvent, e.startFunc),
                    n.
                default.event.off(e.winEvent, e.winFunc),
                    e.startFunc = null,
                    e.winFunc = null,
                    e.startEvent = null,
                    e.winEvent = null
                }
            },
            e.error = function(e, t, o) {
                if (void 0 === t && (t = 0), void 0 === o && (o = ""), window.lxsdk) try {
                    window.lxsdk.error(e, t, o)
                } catch(e) {
                    console.log("lxsdk", e)
                } else console.log("\u4e0a\u4f20\u65e5\u5fd7\uff1a", e, t, o)
            },
            e.ping = function(e) {
                try {
                    window.lxsdk && window.lxsdk.ping(e)
                } catch(e) {
                    console.log("lxsdk", e)
                }
            },
            e.TIME_OUT_NODE = "time_out_node",
            e
        } ();
        o.
    default = i,
        cc._RF.pop()
    },
    {
        "../base/Util": "Util"
    }],
    LangComponentSimple: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "a3b59twAJpA+ox16XbD3E2C", "LangComponentSimple"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Lang"),
        i = cc._decorator,
        a = i.ccclass,
        r = i.property,
        c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.fileName = "",
                t.isInit = !1,
                t.x = !1,
                t.anchorX = !1,
                t.scaleX = !1,
                t.y = !1,
                t.anchorY = !1,
                t.scaleY = !1,
                t.active = !0,
                t.arActive = !0,
                t
            }
            return __extends(t, e),
            t.prototype.onload = function() {
                this.update(0)
            },
            t.prototype.update = function(e) {
                if (!this.isInit && null != n.
            default.LangName) if (this.isInit = !0, n.
            default.share.isLeft) this.node.active = this.active;
                else {
                    var t = this.node.getComponent(cc.Widget);
                    t ? (!this.x || t.isAlignLeft && t.isAlignRight || (t.isAlignLeft ? (t.isAlignRight = !0, t.right = t.left, t.isAlignLeft = !1) : t.isAlignRight && (t.isAlignLeft = !0, t.left = t.right, t.isAlignRight = !1)), !this.y || t.isAlignTop && t.isAlignBottom || (t.isAlignTop ? (t.isAlignTop = !1, t.isAlignBottom = !0, t.bottom = t.top) : t.isAlignBottom && (t.isAlignTop = !0, t.isAlignBottom = !1, t.top = t.bottom))) : (this.x && (this.node.x = -this.node.x), this.y && (this.node.y = -this.node.y)),
                    this.scaleX && (this.node.scaleX = -this.node.scaleX),
                    this.scaleY && (this.node.scaleY = -this.node.scaleY),
                    this.anchorX && (this.node.anchorX = 1 - this.node.anchorX),
                    this.anchorY && (this.node.anchorY = 1 - this.node.anchorY),
                    this.node.active = this.arActive;
                    var o = this.node.getComponent(cc.Label);
                    null != o && (o.horizontalAlign == cc.Label.HorizontalAlign.LEFT ? o.horizontalAlign = cc.Label.HorizontalAlign.RIGHT: o.horizontalAlign == cc.Label.HorizontalAlign.RIGHT && (o.horizontalAlign = cc.Label.HorizontalAlign.LEFT));
                    var i = this.node.getComponent(cc.RichText);
                    null != i && (i.horizontalAlign == cc.TextAlignment.LEFT ? i.horizontalAlign = cc.TextAlignment.RIGHT: i.horizontalAlign == cc.TextAlignment.RIGHT && (i.horizontalAlign = cc.TextAlignment.LEFT));
                    var a = this.node.getComponent(cc.Layout);
                    null != a && a.type == cc.Layout.Type.HORIZONTAL && (a.horizontalDirection == cc.Layout.HorizontalDirection.LEFT_TO_RIGHT ? a.horizontalDirection = cc.Layout.HorizontalDirection.RIGHT_TO_LEFT: a.horizontalDirection = cc.Layout.HorizontalDirection.LEFT_TO_RIGHT)
                }
            },
            t.DEFALUT = -912345,
            __decorate([r], t.prototype, "x", void 0),
            __decorate([r], t.prototype, "anchorX", void 0),
            __decorate([r], t.prototype, "scaleX", void 0),
            __decorate([r], t.prototype, "y", void 0),
            __decorate([r], t.prototype, "anchorY", void 0),
            __decorate([r], t.prototype, "scaleY", void 0),
            __decorate([r], t.prototype, "active", void 0),
            __decorate([r], t.prototype, "arActive", void 0),
            t = __decorate([a], t)
        } (cc.Component);
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "./Lang": "Lang"
    }],
    LangComponent: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "4eed1fmnAZJEoy15hetNmpd", "LangComponent"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Lang"),
        i = cc._decorator,
        a = i.ccclass,
        r = i.property,
        c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.isInit = !1,
                t.transX = o.DEFALUT,
                t.transY = o.DEFALUT,
                t.transScaleX = o.DEFALUT,
                t.transScaleY = o.DEFALUT,
                t.anchorX = o.DEFALUT,
                t.anchorY = o.DEFALUT,
                t.transActive = !0,
                t
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.onload = function() {
                this.update(0)
            },
            t.prototype.update = function(e) {
                if (!this.isInit && null != n.
            default.LangName && (this.isInit = !0, !n.
            default.share.isLeft)) {
                    this.transX != o.DEFALUT && (this.node.x = this.transX),
                    this.transY != o.DEFALUT && (this.node.y = this.transY),
                    this.transScaleX != o.DEFALUT && (this.node.scaleX = this.transScaleX),
                    this.transScaleY != o.DEFALUT && (this.node.scaleY = this.transScaleY),
                    this.anchorX != o.DEFALUT && (this.node.anchorX = this.anchorX),
                    this.anchorY != o.DEFALUT && (this.node.anchorY = this.anchorY),
                    this.node.active = this.transActive;
                    var t = this.node.getComponent(cc.Label);
                    null != t && (t.horizontalAlign == cc.Label.HorizontalAlign.LEFT ? t.horizontalAlign = cc.Label.HorizontalAlign.RIGHT: t.horizontalAlign == cc.Label.HorizontalAlign.RIGHT && (t.horizontalAlign = cc.Label.HorizontalAlign.LEFT));
                    var i = this.node.getComponent(cc.RichText);
                    null != i && (i.horizontalAlign == cc.TextAlignment.LEFT ? i.horizontalAlign = cc.TextAlignment.RIGHT: i.horizontalAlign == cc.TextAlignment.RIGHT && (i.horizontalAlign = cc.TextAlignment.LEFT))
                }
            },
            t.DEFALUT = -912345,
            __decorate([r], t.prototype, "transX", void 0),
            __decorate([r], t.prototype, "transY", void 0),
            __decorate([r], t.prototype, "transScaleX", void 0),
            __decorate([r], t.prototype, "transScaleY", void 0),
            __decorate([r], t.prototype, "anchorX", void 0),
            __decorate([r], t.prototype, "anchorY", void 0),
            __decorate([r], t.prototype, "transActive", void 0),
            t = o = __decorate([a], t)
        } (cc.Component);
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "./Lang": "Lang"
    }],
    LangSprite: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "a58eeOJazlHUqBHzhT/olTl", "LangSprite"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Lang"),
        i = cc._decorator,
        a = i.ccclass,
        r = i.property,
        c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.fileName = "",
                t.isLoading = !1,
                t
            }
            return __extends(t, e),
            t.prototype.onload = function() {
                this.update(0)
            },
            t.prototype.update = function(e) {
                var t = this;
                if (!this.isLoading && null != n.
            default.LangName) {
                    this.isLoading = !0;
                    var o = "lang_ui/" + n.
                default.LangName + "/" + this.fileName;
                    cc.log("url", o),
                    cc.loader.loadRes(o, cc.SpriteFrame,
                    function(e, n) {
                        e ? cc.log("\u52a0\u8f7d\u8bed\u8a00\u5305UI\u6587\u4ef6\u51fa\u9519\uff1a", o, e) : t.spriteFrame = n
                    })
                }
            },
            __decorate([r], t.prototype, "fileName", void 0),
            t = __decorate([a], t)
        } (cc.Sprite);
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "./Lang": "Lang"
    }],
    Lang: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "252e4j0EDdDLL/0/Zeni/kx", "Lang"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./API"),
        i = function() {
            function e() {
                this.data = null,
                this.isLeft = !0,
                this.font = null
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function(t) {
                var o = this;
                if (null == this.data) {
                    var i = n.
                default.share.lang; - 1 == e.ALL.indexOf(i) && (i = e.ALL[0]),
                    e.LangName = i,
                    "ar-EG" == i && (this.isLeft = !1);
                    var a = 2,
                    r = function() {--a > 0 || t()
                    };
                    this.data = {};
                    var c = "lang/" + i;
                    cc.loader.loadRes(c,
                    function(e, t) {
                        if (e) cc.log("\u8bed\u8a00\u5305\u52a0\u8f7d\u51fa\u9519", c);
                        else {
                            var n = null;
                            n = "string" == typeof t ? t: t.text,
                            o.transBase(n),
                            r()
                        }
                    }),
                    "th" == e.LangName && (a++, cc.loader.loadRes("font/PSL050pro", cc.Font,
                    function(e, t) {
                        e ? cc.log("\u52a0\u8f7d\u6cf0\u8bed\u5b57\u4f53\u51fa\u9519font/PSL050pro") : (o.font = t, r())
                    }));
                    var s = window.location.host;
                    s.indexOf(".com") < 0 && s.indexOf(".net") < 0 && (s = "gztest.leadercc.com");
                    var l = [(s = window.location.protocol + "//" + s + "/langs/") + "normal/" + i + "_err.txt?v=" + e.VERSION, s + "platform/" + i + "_err.txt?v=" + e.VERSION];
                    cc.loader.load(l,
                    function(e, t) {
                        if (e) console.log("\u52a0\u8f7d\u9519\u8bef\u7801\u8bed\u8a00\u5305\u51fa\u9519:", e);
                        else {
                            for (var n = 0,
                            i = l; n < i.length; n++) {
                                var a = i[n];
                                o.transBase(t.getContent(a))
                            }
                            r()
                        }
                    })
                } else cc.log("\u8bed\u8a00\u5305\u5df2\u7ecf\u521d\u59cb\u5316")
            },
            e.prototype.transBase = function(t) {
                for (var o, n, i, a = t.split(/[\r\n]/g), r = a.length - 1; r >= 0; r--) if (! ((i = (o = a[r]).indexOf("=")) < 1)) {
                    var c = "\n";
                    e.share.isLeft || (c = e.isOldWebView ? "\u200c   \n   \u202b": "    \u200c\n\u202b   "),
                    n = o.substr(i + 1).replace(/\[br\]/g, c),
                    o = o.substr(0, i),
                    this.data[o] = n
                }
            },
            e.prototype.find = function(t) {
                for (var o = [], n = 1; n < arguments.length; n++) o[n - 1] = arguments[n];
                if (null == this.data) return cc.log("\u8bed\u8a00\u5305\u672a\u5b8c\u6210\u521d\u59cb\u5316"),
                t;
                var i = this.data[t];
                return i ? (i = this.format.apply(this, [i].concat(o)), i = e.rtl(i)) : i = t,
                i
            },
            e.prototype.format = function(e) {
                for (var t = [], o = 1; o < arguments.length; o++) t[o - 1] = arguments[o];
                for (var n in t) {
                    var i = new RegExp("\\{" + (Number(n) + 1) + "\\}", "g");
                    e = e.replace(i, t[n])
                }
                return e
            },
            e.prototype.bind = function(e) {
                if (null != e) {
                    var t = e.getComponent(cc.Label);
                    null != t && (t.string = this.find(t.string), null != this.font && e.name.indexOf("num") < 0 && e.name.indexOf("Coin") < 0 && t.isSystemFontUsed && (t.font = this.font));
                    for (var o = 0; o < e.childrenCount; o++) this.bind(e.children[o])
                }
            },
            e.prototype.link = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                for (var o = "",
                n = 0,
                i = e; n < i.length; n++) {
                    var a = i[n];
                    if ("string" == typeof a) a = this.find(a);
                    else {
                        for (var r = this.find(a[0]), c = a.length, s = 1; s < c; s++) {
                            var l = new RegExp("\\{" + s + "\\}", "g");
                            r = r.replace(l, a[s])
                        }
                        a = r
                    }
                    this.isLeft ? o += a: o = a + o
                }
                return o
            },
            e.rtl = function(t) {
                if (e.share.isLeft) return t;
                for (var o = !1,
                n = t.length - 1; n >= 0; n--) if (t.charCodeAt(n) > 1e3) {
                    o = !0;
                    break
                }
                return o ? e.isOldWebView ? " \u202b  " + t + "  \u200c": "   \u202b" + t + "  \u200c": t
            },
            e.ALL = ["en", "cn", "tw", "id-ID", "ar-EG", "vi-VN", "ja-JP", "tr", "th", "ms"],
            e.VERSION = "1.0.2",
            e._instance = null,
            e.isOldWebView = !1,
            e.LangName = null,
            e
        } ();
        o.
    default = i,
        cc._RF.pop()
    },
    {
        "./API": "API"
    }],
    LingxianProxy: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "29140mPahhPfbMKKiP3zcC7", "LingxianProxy"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./ServerPorxy"),
        i = e("../base/User"),
        a = e("../control/LXSDK"),
        r = e("../base/pl/Lingxian"),
        c = e("./PlayerProxy"),
        s = function() {
            function e() {}
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.send = function(e, t) {
                for (var o, i = [], a = 2; a < arguments.length; a++) i[a - 2] = arguments[a]; (o = n.
            default.share).send.apply(o, [e, "common", t].concat(i))
            },
            e.prototype.login = function(e) {
                var t = this;
                this.send(function(o) {
                    if (0 != o.error || !o.result) return a.
                default.loginFail(),
                    void console.log("\u767b\u5f55\u6e38\u620f\u51fa\u9519");
                    var n = o.result;
                    i.
                default.share.uid = n.uid,
                    i.
                default.share.name = n.nickname,
                    i.
                default.share.icon = n.avatar,
                    i.
                default.share.coin = n.score,
                    null != e ? e() : t.getUserInfo(function() {
                        c.
                    default.share.joinRoom(function() {
                            cc.director.loadScene("GameScene")
                        })
                    })
                },
                "login", i.
            default.share.uid, i.
            default.share.session, r.
            default.share.platformRoomID)
            },
            e.prototype.getUserInfo = function(e) {
                this.send(function(t) {
                    0 == t.error ? (i.
                default.share.coin = t.result, null != e && e()) : console.log("\u767b\u5f55\u6e38\u620f\u51fa\u9519")
                },
                "getUserInfo", i.
            default.share.uid)
            },
            e._instance = null,
            e
        } ();
        o.
    default = s,
        cc._RF.pop()
    },
    {
        "../base/User": "User",
        "../base/pl/Lingxian": "Lingxian",
        "../control/LXSDK": "LXSDK",
        "./PlayerProxy": "PlayerProxy",
        "./ServerPorxy": "ServerPorxy"
    }],
    Lingxian: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "ebabcQuUilBBLXLSpNVyupp", "Lingxian"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../Util"),
        i = e("../../proxy/ServerPorxy"),
        a = e("../../const/GEvent"),
        r = e("../User"),
        c = e("../Sound");
        window.updateCoin = function() {
            i.
        default.share.getUserInfo(function() {
                n.
            default.event.emit(a.
            default.UPDATE_COIN)
            })
        },
        window.lxSoundOn = function() {
            null != c.
        default.share.enableMusic && (c.
        default.share.enableMusic = !0),
            null != c.
        default.share.enableSound && (c.
        default.share.enableSound = !0)
        },
        window.lxSoundOff = function() {
            null != c.
        default.share.enableMusic && (c.
        default.share.enableMusic = !1),
            null != c.
        default.share.enableSound && (c.
        default.share.enableSound = !1)
        };
        var s = function() {
            function e() {
                this.platformLang = "",
                this.platformRoomID = ""
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "isSelf", {
                get: function() {
                    return ! (window.location.search.indexOf("lx=debug") >= 0) && !!window.isLingxian
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function() {
                var e = window.location.search;
                if (null != e && "" != e) {
                    for (var t = {},
                    o = 0,
                    n = (e = e.substr(1)).split("&"); o < n.length; o++) {
                        var i = n[o].split("=");
                        t[i[0].toUpperCase()] = i[1]
                    }
                    r.
                default.share.uid = t.UID,
                    this.platformLang = t.LANG,
                    r.
                default.share.session = t.TOKEN,
                    r.
                default.share.roomID = t.ROOMID,
                    void 0 === r.
                default.share.roomID && (r.
                default.share.roomID = "Lingxian"),
                    this.platformRoomID = r.
                default.share.roomID
                } else alert("\u8bf7\u4f20\u542f\u52a8\u53c2\u6570")
            },
            e.prototype.login = function(e) {
                e()
            },
            e.prototype.pay = function(e) {
                try {
                    "undefined" == typeof LingxianAndroid ? window.webkit.messageHandlers.pay.postMessage("") : LingxianAndroid.pay()
                } catch(e) {
                    console.log("pay, ", e)
                }
            },
            e.prototype.postUser = function() {},
            e.prototype.quickGame = function() {
                try {
                    "undefined" == typeof LingxianAndroid ? window.webkit.messageHandlers.closeGame.postMessage("") : LingxianAndroid.closeGame()
                } catch(e) {
                    console.log("closeGame, ", e)
                }
            },
            Object.defineProperty(e.prototype, "lang", {
                get: function() {
                    var e = this.platformLang;
                    switch (e || (e = "en"), e) {
                    case "zh-CN":
                        return "cn";
                    case "zh-TW":
                        return "tw";
                    case "vi-VN":
                        return "vi-VN";
                    case "hi-IN":
                        return "in";
                    case "id-ID":
                        return "id-ID";
                    case "ar-EG":
                        return "ar-EG";
                    case "pt-PT":
                        return "pt";
                    case "es-ES":
                        return "es";
                    case "tr-TR":
                        return "tr";
                    case "th-TH":
                        return "th"
                    }
                    return "en"
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.openSDK = function(e) {
                window.location.href = e
            },
            e._instance = null,
            e
        } ();
        o.
    default = s,
        cc._RF.pop()
    },
    {
        "../../const/GEvent": "GEvent",
        "../../proxy/ServerPorxy": "ServerPorxy",
        "../Sound": "Sound",
        "../User": "User",
        "../Util": "Util"
    }],
    LiveMe: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "137a8TfF0BJKZfFz4OnpRi4", "LiveMe"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../User"),
        i = e("../../proxy/ServerPorxy"),
        a = e("../Util"),
        r = e("../../const/GEvent"),
        c = e("../Loading"),
        s = e("../Lang"),
        l = e("../../proxy/HeartProxy");
        window.onRechargeFinish = function(e) {
            if (console.log("onRechargeFinish code:" + e), a.
        default.event.emit(r.
        default.PAY_CALL_BACK), l.
        default.share.paymentComplete(), 1e4 == e) {
                var t = n.
            default.share.coin,
                o = new cc.Node;
                c.
            default.show(),
                o.parent = cc.director.getScene().getChildByName("Canvas"),
                o.runAction(cc.sequence(cc.repeat(cc.sequence(cc.callFunc(function() {
                    i.
                default.share.getUserInfo(function() {
                        t != n.
                    default.share.coin && null != o && (c.
                    default.hide(), o.removeFromParent(!0), a.
                    default.event.emit(r.
                    default.UPDATE_COIN), o = null)
                    })
                }), cc.delayTime(1)), 3), cc.callFunc(function() {
                    null != o && (c.
                default.hide(), o = null)
                }), cc.removeSelf(!0)))
            } else console.log("onRechargeFinish \u53c2\u6570\u9519\u8bef\uff1a" + e)
        };
        var u = function() {
            function e() {
                this.appLang = "cn"
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "isSelf", {
                get: function() {
                    return !! window.isLiveme
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function() {
                n.
            default.share.session = this.getCode()
            },
            e.prototype.uploadGameName = function() {
                if (this.isSelf) {
                    var e = s.
                default.share.find("title");
                    "title" == e && (e = window.title),
                    KEWLApp.setTitle(e),
                    cc.sys.isBrowser && (window.document.title = e)
                }
            },
            e.prototype.login = function(e) {
                null != e && e()
            },
            e.prototype.getCode = function() {
                var e = window.location.search;
                if (null == e || "" == e) return null;
                for (var t = 0,
                o = (e = e.substr(1)).split("&"); t < o.length; t++) {
                    var n = o[t].split("=");
                    if ("CODE" == n[0].toUpperCase()) return n[1]
                }
                return null
            },
            Object.defineProperty(e.prototype, "gameURL", {
                get: function() {
                    var e = window.location.href.split("?"),
                    t = e[0];
                    return "/" != t.substr(t.length - 1) && (t += "/"),
                    e[0]
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.showLogin = function() {},
            e.prototype.pay = function(e) {
                KEWLApp.openRechargePage(JSON.stringify({
                    srcName: "LingXianGame"
                }))
            },
            e.prototype.quickGame = function() {
                KEWLApp.closePage(JSON.stringify({
                    srcName: "LingXianGame"
                }))
            },
            Object.defineProperty(e.prototype, "lang", {
                get: function() {
                    var e = this.appLang;
                    if (null == e) return "en";
                    if ("IN" == e) return "id-ID";
                    if ("CN" == e) return "cn";
                    return - 1 != "SA,PK,JO,KW,QA,OM,LB,SY,IQ,YE,BH,AE,DZ,MA,TN,EG,LY,TR,PS,IL,GY,SR,SN,BJ,BF,GM,GW,ML,MZ,NE,NG,SL,TZ,UG,TD,BN,BA,GA,CM,CI,SD,IR,BD,TG".indexOf(e) ? "ar-EG": "en"
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "platform", {
                get: function() {
                    var e = window.lx_platform;
                    return void 0 == e && (e = ""),
                    e
                },
                enumerable: !0,
                configurable: !0
            }),
            e._instance = null,
            e
        } ();
        o.
    default = u,
        cc._RF.pop()
    },
    {
        "../../const/GEvent": "GEvent",
        "../../proxy/HeartProxy": "HeartProxy",
        "../../proxy/ServerPorxy": "ServerPorxy",
        "../Lang": "Lang",
        "../Loading": "Loading",
        "../User": "User",
        "../Util": "Util"
    }],
    Loading: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "62dbeVCCdZDNLFEqQY3gJLx", "Loading"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Lang"),
        i = e("./Util"),
        a = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.step = 0,
                t.len = 0,
                t.label = null,
                t
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                var e = null != cc.director.getVisibleSize ? cc.director.getVisibleSize() : cc.view.getVisibleSize();
                this.node.setContentSize(e);
                var o = this.node.addComponent(cc.Graphics);
                o.fillColor = cc.color(0, 0, 0, 178.5),
                o.fillRect( - e.width / 2, -e.height / 2, 2 * e.width, 2 * e.height);
                var a = new cc.Node,
                r = a.addComponent(cc.Label);
                r.fontSize = 30,
                r.string = n.
            default.share.find("loading", "").replace("%", ""),
                a.parent = this.node;
                var c = a.addComponent(cc.Widget);
                c.verticalCenter = 0,
                c.horizontalCenter = 0,
                this.label = r,
                i.
            default.event.on(t.EVENT_NAME, this.onEvent, this)
            },
            t.prototype.start = function() {
                this.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this, !0)
            },
            t.prototype.onTouch = function(e) {},
            t.prototype.onEvent = function() {
                this.node.removeFromParent(!0)
            },
            t.prototype.update = function(e) {
                if (this.step++, this.step % 24 == 0) {
                    this.label.string = n.
                default.share.find("loading", "").replace("%", "");
                    for (var t = this.len; t > 0; t--) this.label.string += ".";
                    this.len++,
                    this.len >= 4 && (this.len = 0)
                }
            },
            t.show = function(e) {
                void 0 === e && (e = 0),
                cc.log("show loading");
                var o = t.getLoading();
                null == o ? ((o = new cc.Node).addComponent(t), o.name = t.NAME, o.parent = cc.director.getScene().getChildByName("Canvas"), e > 0 && o.runAction(cc.sequence([cc.delayTime(e), cc.removeSelf(!0)]))) : cc.log("Loading \u5b58\u5728!")
            },
            t.hide = function() {
                i.
            default.event.emit(t.EVENT_NAME)
            },
            t.getLoading = function() {
                return cc.director.getScene().getChildByName("Canvas").getChildByName(t.NAME)
            },
            t.prototype.onDestroy = function() {
                i.
            default.event.off(t.EVENT_NAME, this.onEvent, this),
                this.node.off(cc.Node.EventType.TOUCH_END, this.onTouch, this, !0)
            },
            t.NAME = "game_loading",
            t.EVENT_NAME = "hide_loading",
            t
        } (cc.Component);
        o.
    default = a,
        cc._RF.pop()
    },
    {
        "./Lang": "Lang",
        "./Util": "Util"
    }],
    LoginScene: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "04affGsaWlP4YFh4T8shOU2", "LoginScene"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/InitScene"),
        i = e("../const/Config"),
        a = e("../proxy/PlayerProxy"),
        r = e("../proxy/ServerPorxy"),
        c = e("../base/Util"),
        s = e("../lcactivity/LCActivityUtil"),
        l = cc._decorator,
        u = l.ccclass,
        d = l.property,
        h = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.sps = [],
                t.index = 0,
                t
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {},
            t.prototype.start = function() {
                e.prototype.start.call(this),
                cc.director.setDisplayStats(!1),
                this.loadings()
            },
            t.prototype.loadings = function() {
                for (var e = this,
                t = [], o = 1; o <= 8; o++) t.push("ldh/f_" + c.
            default.numberFill(o, 2));
                for (o = 1; o <= 8; o++) t.push("ldh/t_" + c.
            default.numberFill(o, 2));
                cc.loader.loadResArray(t, cc.SpriteFrame,
                function(t, o) {
                    for (var n = [o.slice(0, 8), o.splice(8, 16)], i = 0; i < 2; i++) {
                        var a = e.sps[i].node.addComponent(cc.Animation),
                        r = cc.AnimationClip.createWithSpriteFrames(n[i], 12);
                        r.name = "play",
                        r.wrapMode = cc.WrapMode.Loop,
                        a.addClip(r),
                        a.play(r.name)
                    }
                })
            },
            Object.defineProperty(t.prototype, "gameId", {
                get: function() {
                    return i.
                default.gameId.toString()
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "dataList", {
                get: function() {
                    return ["DXYZPBet"]
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "nextScene", {
                get: function() {
                    return "GameScene"
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.getNetList = function() {
                return [r.
            default.share.getServerTime.bind(r.
            default.share), a.
            default.share.joinRoom.bind(a.
            default.share), s.
            default.shared.load.bind(s.
            default.shared)]
            },
            __decorate([d(cc.Sprite)], t.prototype, "sps", void 0),
            t = __decorate([u], t)
        } (n.
    default);
        o.
    default = h,
        cc._RF.pop()
    },
    {
        "../base/InitScene": "InitScene",
        "../base/Util": "Util",
        "../const/Config": "Config",
        "../lcactivity/LCActivityUtil": "LCActivityUtil",
        "../proxy/PlayerProxy": "PlayerProxy",
        "../proxy/ServerPorxy": "ServerPorxy"
    }],
    MyHorizontal: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "dd0e37A3KVMt47tWg+yewgF", "MyHorizontal"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator,
        i = n.ccclass,
        a = (n.property,
        function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                var e = this.node.getComponent(cc.Widget);
                null != e && this.isIphoneX() && (e.isAlignLeft && (e.left += 90), e.horizontalCenter, e.isAlignRight && (e.right += 40))
            },
            t.prototype.isIphoneX = function() {
                if ("undefined" == typeof navigator || null == navigator) return ! 1;
                if ( - 1 == navigator.userAgent.indexOf("iPhone")) return ! 1;
                var e = cc.view.getVisibleSize(),
                t = 0;
                return t = e.width > e.height ? e.width / e.height: e.height / e.width,
                console.log("size", e.width, e.height),
                t >= 2
            },
            t = __decorate([i], t)
        } (cc.Component));
        o.
    default = a,
        cc._RF.pop()
    },
    {}],
    MyWidget: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "7740004F7VJP6u1SsqdRSPm", "MyWidget"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator,
        i = n.ccclass,
        a = (n.property,
        function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                var e = this.node.getComponent(cc.Widget);
                null != e && (this.isIphoneX() ? (e.isAlignTop && (e.top += 90), e.isAlignBottom && (e.bottom += 40)) : e.isAlignTop)
            },
            t.prototype.isIphoneX = function() {
                if ("undefined" == typeof navigator || null == navigator) return ! 1;
                if ( - 1 == navigator.userAgent.indexOf("iPhone")) return ! 1;
                var e = cc.view.getVisibleSize(),
                t = 0;
                return t = e.width > e.height ? e.width / e.height: e.height / e.width,
                console.log("size", e.width, e.height),
                t >= 2
            },
            t = __decorate([i], t)
        } (cc.Component));
        o.
    default = a,
        cc._RF.pop()
    },
    {}],
    Netstatus: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "8fa41gdwXxLG6aC+RK9/jr/", "Netstatus"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../proxy/HeartProxy"),
        i = cc._decorator,
        a = i.ccclass,
        r = (i.property,
        function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labPing = null,
                t.nodePings = [],
                t
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.start = function() {
                this.labPing = this.node.getChildByName("labPing").getComponent(cc.Label);
                for (var e = 1;; e++) {
                    var t = this.node.getChildByName("icon_wlxh_" + e);
                    if (null == t) break;
                    this.nodePings.push(t)
                }
                this.node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(this.loop, this), cc.delayTime(2))))
            },
            t.prototype.loop = function() {
                this.node.opacity = 255;
                var e = n.
            default.share.ping,
                t = 2;
                e > 999 ? e = 999 : e < 10 && (e = 10),
                e <= 100 ? t = 0 : e <= 200 && (t = 1),
                this.labPing.node.color = o.COLOR[t],
                this.labPing.string = e + "ms";
                for (var i = this.nodePings.length - 1; i >= 0; i--) this.nodePings[i].active = t == i
            },
            t.COLOR = [cc.hexToColor("#19d62b"), cc.hexToColor("#f43023"), cc.hexToColor("#f0aa22")],
            t = o = __decorate([a], t)
        } (cc.Component));
        o.
    default = r,
        cc._RF.pop()
    },
    {
        "../proxy/HeartProxy": "HeartProxy"
    }],
    Network: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "fe45f5grbtHko90yRrOZtU3", "Network"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../control/LXSDK"),
        i = function() {
            function e(e) {
                this.socket = null,
                this.id = 1,
                this.msgMap = {},
                this.isDebug = !1,
                this.cmdMap = [],
                this.isDebug = e
            }
            return e.prototype.addCommand = function(e) {
                this.cmdMap[e.typeId] = e
            },
            e.prototype.connect = function(e, t) {
                this.close(),
                this.openRhand = t,
                this.socket = new WebSocket(e),
                this.socket.onopen = this.onOpen.bind(this),
                this.socket.onclose = this.onClose.bind(this),
                this.socket.onerror = this.onError.bind(this),
                this.socket.onmessage = this.onMessage.bind(this),
                this.msgMap = {},
                cc.log("network:\u5f00\u59cb\u8fde\u63a5", e)
            },
            e.prototype.close = function() {
                null != this.socket && (this.socket.onopen = null, this.socket.onclose = null, this.socket.onerror = null, this.socket.onmessage = null, this.socket.readyState != WebSocket.CLOSED && this.socket.readyState != WebSocket.CLOSING && (this.socket.close(), this.openRhand = null, this.errorMsg = null, this.errorRhand = null))
            },
            e.prototype.onOpen = function(e, t) {
                cc.log("network:\u94fe\u63a5\u670d\u52a1\u5668\u6210\u529f"),
                this.openRhand && this.openRhand()
            },
            e.prototype.onMessage = function(e) {
                this.isDebug && cc.log("network:\u7f51\u7edc\u63a5\u6536 :", e.data);
                var t = null;
                try {
                    t = JSON.parse(e.data)
                } catch(o) {
                    console.log("json1", o),
                    n.
                default.jsonError(e.data);
                    try {
                        t = JSON.parse(e.data.replace(/[\u0000-\u0019\"\\]+/g, ""))
                    } catch(e) {
                        console.log("json2", e)
                    }
                }
                if (null == t && (t = {
                    error: 4999
                }), 0 == t.type) {
                    var o = t.id,
                    i = this.msgMap[o];
                    i && (i(t), delete this.msgMap[t.id]),
                    0 != t.error && null != this.errorMsg && this.errorMsg(t.error)
                } else {
                    var a = this.cmdMap[t.type];
                    null != a && a.execute(t)
                }
            },
            e.prototype.onError = function(e, t) {
                cc.log("network:\u8fde\u63a5\u51fa\u9519\uff01", this.socket),
                n.
            default.netError(),
                null != this.errorRhand && this.errorRhand()
            },
            e.prototype.onClose = function(e, t) {
                cc.log("network:\u670d\u52a1\u5668\u5173\u95ed", this.socket),
                n.
            default.netDisconnected(),
                null != this.errorRhand && this.errorRhand()
            },
            e.prototype.send = function(e, t, o) {
                for (var n = [], i = 3; i < arguments.length; i++) n[i - 3] = arguments[i];
                null == n && (n = []),
                this.msgMap[this.id] = e;
                var a = {};
                a.id = this.id,
                a.bean = t,
                a.method = o,
                a.params = n;
                var r = JSON.stringify(a);
                return this.socket.send(r),
                this.id++,
                this.isDebug && cc.log("network:\u7f51\u7edc\u53d1\u9001\uff1a", r),
                a.id
            },
            e
        } ();
        o.
    default = i,
        cc._RF.pop()
    },
    {
        "../control/LXSDK": "LXSDK"
    }],
    NumberAtlas: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "c68e6D9LjdMT5KR8lA/4aga", "NumberAtlas"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Util"),
        i = e("./Lang"),
        a = cc._decorator,
        r = a.ccclass,
        c = a.property,
        s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.charMap = "",
                t.format = "",
                t.spacingX = 0,
                t._value = -121212,
                t._text = null,
                t._map = null,
                t._spList = [],
                t.align = cc.TextAlignment.CENTER,
                t._loadSum = 0,
                t
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.onLoad = function() {
                this.init()
            },
            t.prototype.init = function() {
                if (null == this._map) {
                    this._map = {};
                    for (var e = this.charMap,
                    t = e.length,
                    a = t.toString().length, r = function(t) {
                        var r = e.substr(t, 1),
                        s = i.
                    default.share.format(c.format, n.
                    default.numberFill(t + 1, a, "0"));
                        if (c._map[r] = s, o._texture[s]) return "continue";
                        cc.loader.loadRes(s, cc.SpriteFrame,
                        function(e, t) {
                            e ? console.log("\u52a0\u8f7d\u6570\u5b57\u51fa\u9519:", e) : o._texture[s] = t
                        })
                    },
                    c = this, s = 0; s < t; s++) r(s)
                }
            },
            Object.defineProperty(t.prototype, "value", {
                get: function() {
                    return this._value
                },
                set: function(e) {
                    if (this._value != e) {
                        this._value = e;
                        var t = e.toString();
                        this.setString(t)
                    }
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "bigValue", {
                set: function(e) {
                    this.value = e,
                    this.setString(n.
                default.formatNumber(e))
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "text", {
                get: function() {
                    return this._text
                },
                set: function(e) {
                    this._text = e,
                    this.setString(e)
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.setString = function(e) {
                if ("" != this.charMap) {
                    this._map || this.init();
                    for (var t = 0,
                    i = this._spList; t < i.length; t++) { (l = i[t]).removeFromParent(!0)
                    }
                    this._spList = [];
                    var a = "",
                    r = e.length;
                    this._loadSum = r;
                    for (var c = 0; c < r; c++) {
                        var s = e.substr(c, 1);
                        if (void 0 != (a = this._map[s])) {
                            var l = null;
                            if (o._texture[a]) {
                                var u = (l = new cc.Node).addComponent(cc.Sprite);
                                u.trim = !1,
                                u.sizeMode = cc.Sprite.SizeMode.RAW,
                                u.spriteFrame = o._texture[a]
                            } else l = n.
                        default.loadSprite(a, this.alignNumber.bind(this));
                            l.parent = this.node,
                            this._spList.push(l),
                            l.active = !1,
                            o._texture[a] && this.alignNumber()
                        } else console.log("NumberAtlas \u9519\u8bef\u5b57\u7b26", s, this.charMap)
                    }
                } else cc.log("\u5e76\u6ca1\u6709\u8bbe\u7f6echarMap\u6570\u636e\uff01\uff01")
            },
            t.prototype.alignNumber = function() {
                if (this._loadSum--, !(this._loadSum > 0)) {
                    for (var e = 0,
                    t = 0,
                    o = 0,
                    n = this._spList; o < n.length; o++) {
                        e += (d = n[o]).width + this.spacingX,
                        t = Math.max(d.height, t),
                        d.active = !0
                    }
                    this.node.setContentSize(e, t);
                    var i = 0;
                    if (this.align == cc.TextAlignment.LEFT) for (var a = 0,
                    r = this._spList; a < r.length; a++) { (d = r[a]).x = i,
                        d.anchorX = 0,
                        i += d.width + this.spacingX
                    } else if (this.align == cc.TextAlignment.CENTER) {
                        i = -e / 2;
                        for (var c = 0,
                        s = this._spList; c < s.length; c++) { (d = s[c]).x = i,
                            d.anchorX = 0,
                            i += d.width + this.spacingX
                        }
                    } else {
                        i = -e;
                        for (var l = 0,
                        u = this._spList; l < u.length; l++) {
                            var d; (d = u[l]).x = i,
                            d.anchorX = 0,
                            i += d.width + this.spacingX
                        }
                    }
                }
            },
            t.prototype.onDestroy = function() {
                this._map = null
            },
            t._texture = {},
            __decorate([c({
                tooltip: "\u5b57\u7b26\u6620\u5c04\u987a\u5e8f,\u7b2c\u4e00\u4e2a\u5bf9\u5e94\u6587\u4ef6\u540d\u4e3a1"
            })], t.prototype, "charMap", void 0),
            __decorate([c({
                tooltip: "\u5b57\u7b26\u8def\u5f84\u683c\u5f0f\u5316,\u4f8b\u5982\uff1anums/num1_{1},{1}\u4f1a\u6362\u62101\uff0c\u621601\uff0c\u6839\u636echarMap\u6570\u5b57\u4f4d\u6570\u51b3\u5b9a"
            })], t.prototype, "format", void 0),
            __decorate([c], t.prototype, "spacingX", void 0),
            __decorate([c], t.prototype, "value", null),
            t = o = __decorate([r], t)
        } (cc.Component);
        o.
    default = s,
        cc._RF.pop()
    },
    {
        "./Lang": "Lang",
        "./Util": "Util"
    }],
    NumberLabel: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "7aaf0XTU2NH0bAN98lt6NlD", "NumberLabel"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Util"),
        i = cc._decorator,
        a = i.ccclass,
        r = i.property,
        c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.charMap = "",
                t.map = null,
                t._value = -9999999,
                t._text = null,
                t.isInit = !1,
                t
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                this.initMap()
            },
            t.prototype.initMap = function() {
                if (null == this.map) {
                    this.map = {},
                    this.isInit = !0;
                    for (var e = this.charMap,
                    t = e.length,
                    o = 0; o < t; o++) {
                        var n = e.substr(o, 1);
                        this.map[n] = String.fromCharCode(48 + o)
                    }
                }
            },
            Object.defineProperty(t.prototype, "value", {
                get: function() {
                    return this._value
                },
                set: function(e) {
                    if (this._value != e) {
                        this._value = e;
                        var t = e.toString();
                        this.setString(t)
                    }
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "bigValue", {
                set: function(e) {
                    this.value = e,
                    this.setString(n.
                default.formatNumber(e))
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "text", {
                get: function() {
                    return this._text
                },
                set: function(e) {
                    this._text = e,
                    this.setString(e)
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.setString = function(e) {
                if (null == this.map && this.initMap(), "" == this.charMap) return this.string = e,
                void cc.log("\u5e76\u6ca1\u6709\u8bbe\u7f6echarMap\u6570\u636e\uff01\uff01", this.name);
                for (var t = "",
                o = e.length,
                n = 0; n < o; n++) {
                    var i = e.substr(n, 1);
                    t += this.map[i] || ""
                }
                this.string = t
            },
            __decorate([r], t.prototype, "charMap", void 0),
            __decorate([r], t.prototype, "value", null),
            t = __decorate([a], t)
        } (cc.Label);
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "./Util": "Util"
    }],
    PlayerProxy: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "a66d5Ex21JMqrkHRjyZpP6e", "PlayerProxy"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./ServerPorxy"),
        i = e("../base/User"),
        a = e("../model/Room"),
        r = e("../const/Effect"),
        c = e("../base/Util"),
        s = e("../const/GEvent"),
        l = e("../command/SettCommand"),
        u = e("../box/BoxSurePay"),
        d = e("../control/BroadcastUtil"),
        h = e("../base/Loading"),
        f = function() {
            function e() {
                this.dayWin = 0
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.send = function(e, t) {
                for (var o, i = [], a = 2; a < arguments.length; a++) i[a - 2] = arguments[a]; (o = n.
            default.share).send.apply(o, [e, "Xingyunzhuanpan", t].concat(i))
            },
            e.prototype.joinRoom = function(e) {
                this.send(function(t) {
                    0 == t.error && (t = t.result, a.
                default.share.state = t[0], a.
                default.share.time = t[1], a.
                default.share.sumBet = t[2], a.
                default.share.myBet = t[3], a.
                default.share.saveMyBetInfo(), a.
                default.share.todayTop3 = t[4], a.
                default.share.round = t[5], a.
                default.share.canBet = t[6], a.
                default.share.winSum = t[8], u.
                default.SHOW_TIPS = 0 == t[9], d.
                default.share.list = t[10], a.
                default.share.state == a.
                default.STATE_WAIT ? a.
                default.share.time += r.
                default.WAIT_TIME:
                    a.
                default.share.state == a.
                default.STATE_SETT && (t[7] ? l.
                default.parse(t[7]):
                    (a.
                default.share.winArea = 0, a.
                default.share.winCoin = 0, a.
                default.share.winByBet = 0, a.
                default.share.top3 = null, a.
                default.share.state = a.
                default.STATE_NONE, a.
                default.share.time = 0, console.log("\u7ed3\u7b97\u4e2d\uff0c\u4f46\u662f\u6ca1\u6709\u8fd4\u56de\u7ed3\u7b97\u6570\u636e\uff1a", t[7]))), null != e && e())
                },
                "joinRoom", i.
            default.share.uid, i.
            default.share.roomID)
            },
            e.prototype.bet = function(e, t) {
                var o = this;
                if (a.
            default.share.bufferBet()) {
                    var n = i.
                default.share.bet;
                    a.
                default.share.userBetInfo(e, 1),
                    this.send(function(r) {
                        o.getTodayEarnings(),
                        0 == r.error ? (r = r.result, a.
                    default.share.userBetInfo(e, -1, r[2]), a.
                    default.share.bufferBet(), null != r[2] && void 0 != r[2] && 0 != r[2] || (a.
                    default.share.addUserBet(e, n), i.
                    default.share.coin = r[0], c.
                    default.event.emit(s.
                    default.UPDATE_COIN), null != t && t(r[1]), h.
                    default.hide())):
                        a.
                    default.share.userBetInfo(e, -1, 1)
                    },
                    "bet", i.
                default.share.uid, e, i.
                default.share.bet)
                }
            },
            e.prototype.getTodayEarnings = function() {
                var e = this;
                this.send(function(t) {
                    0 == t.error && (t = t.result, e.dayWin = t, c.
                default.event.emit(s.
                default.UPDATE_DAYWIN))
                },
                "getTodayEarnings", i.
            default.share.uid)
            },
            e.prototype.getRecords = function(e) {
                this.send(function(t) {
                    0 == t.error && null != e && e(t.result)
                },
                "getRecords", i.
            default.share.uid)
            },
            e.prototype.getUserRecord = function(e) {
                this.send(function(t) {
                    0 == t.error && null != e && e(t.result)
                },
                "getUserRecord", i.
            default.share.uid)
            },
            e.prototype.getTop = function(e) {
                this.send(function(t) {
                    0 == t.error && null != e && e(t.result)
                },
                "getTop", i.
            default.share.uid)
            },
            e.prototype.setTips = function(e) {
                this.send(function(e) {
                    e.error
                },
                "setTips", i.
            default.share.uid, e ? 1 : 0)
            },
            e._instance = null,
            e
        } ();
        o.
    default = f,
        cc._RF.pop()
    },
    {
        "../base/Loading": "Loading",
        "../base/User": "User",
        "../base/Util": "Util",
        "../box/BoxSurePay": "BoxSurePay",
        "../command/SettCommand": "SettCommand",
        "../const/Effect": "Effect",
        "../const/GEvent": "GEvent",
        "../control/BroadcastUtil": "BroadcastUtil",
        "../model/Room": "Room",
        "./ServerPorxy": "ServerPorxy"
    }],
    QQPlay: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "966b8/lZrZJdLN71X7I+Xii", "QQPlay"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../User"),
        i = e("../Util"),
        a = function() {
            function e() {}
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.login = function(e) {
                i.
            default.event.emit("loading", 21);
                var t = GameStatusInfo.openId;
                cc.log("\u73a9\u5bb6openId", t),
                n.
            default.share.uid = t,
                i.
            default.event.emit("loading", 22),
                this.getNameIcon(t,
                function(t, o) {
                    i.
                default.event.emit("loading", 23),
                    n.
                default.share.name = t,
                    n.
                default.share.icon = o,
                    cc.log("QQPlay \u767b\u5f55\u5b8c\u6210", n.
                default.share.uid, n.
                default.share.name),
                    null != e && e()
                })
            },
            e.prototype.getNameIcon = function(e, t) {
                BK.MQQ.Account.getNick(e,
                function(o, n) {
                    BK.MQQ.Account.getHead(e,
                    function(e, o) {
                        t(n, o)
                    })
                })
            },
            e.prototype.share = function(e, t, o, n) {
                var i = {
                    summary: e,
                    picUrl: t,
                    extendInfo: o,
                    localPicPath: t,
                    gameName: "\u6781\u5370\u8c61\u6e38\u620f"
                };
                BK.QQ.share(i,
                function(e, t, o) {
                    cc.log(1, 1, "retCode:" + e + " shareDest:" + t + " isFirstShare:" + o),
                    0 == e ? n(!0) : 1 == e ? (cc.log(1, 1, "\u5206\u4eab\u5931\u8d25" + e), n(!1)) : 2 == e && (cc.log(1, 1, "\u5206\u4eab\u5931\u8d25\uff0c\u7528\u6237\u53d6\u6d88\u5206\u4eab\uff1a" + e), n(!1))
                })
            },
            e.prototype.updateRank = function(e) {
                var t = (new Date).getTime().toString(),
                o = {
                    userData: [{
                        openId: GameStatusInfo.openId,
                        startMs: t,
                        endMs: t,
                        scoreInfo: {
                            score: 100
                        }
                    }],
                    attr: {
                        score: {
                            type: "rank",
                            order: 1
                        }
                    }
                };
                BK.QQ.uploadScoreWithoutRoom(1, o,
                function(e, t, o) {
                    0 !== e && cc.log(1, 1, "\u4e0a\u4f20\u5206\u6570\u5931\u8d25!\u9519\u8bef\u7801\uff1a" + e)
                })
            },
            e.prototype.getFriends = function(e) {
                BK.QQ.getRankListWithoutRoom("score", 1, 0,
                function(t, o, i) {
                    if (cc.log(1, 1, "getRankListWithoutRoom callback  cmd" + o + " errCode:" + t + "  data:" + JSON.stringify(i)), 0 === t) if (i) {
                        for (var a = null,
                        r = [], c = i.data.ranking_list.length, s = 0; s < c; ++s) {
                            var l = i.data.ranking_list[s],
                            u = {
                                i: s + 1,
                                name: l.nick,
                                icon: l.url,
                                score: l.score
                            };
                            r.push(u),
                            l.selfFlag ? (a = u, u.uid = n.
                        default.share.uid):
                            u.uid = "rank" + s
                        }
                        e(null, {
                            datas: r,
                            my: a
                        })
                    } else e([], null);
                    else cc.log(1, 1, "\u83b7\u53d6\u6392\u884c\u699c\u6570\u636e\u5931\u8d25!\u9519\u8bef\u7801\uff1a" + t)
                })
            },
            e.prototype.jumoTo = function(e) {
                BK.QQ.skipGame(e, "")
            },
            e._instance = null,
            e
        } ();
        o.
    default = a,
        cc._RF.pop()
    },
    {
        "../User": "User",
        "../Util": "Util"
    }],
    RankUtil: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "2482046teRGgYzkZoxByMrz", "RankUtil"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./User"),
        i = function() {
            function e() {
                this.data = null,
                this.selfData = null,
                this.pageIndex = 0,
                this.isLoading = !1,
                this.readMaxLen = e.DEFAUL_COUNT,
                this.friendData = null,
                this.friendSelf = null,
                this.friendMaxPage = 0
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.show = function(e, t) {
                cc.log("rank tuil show"),
                this.pageIndex = 0,
                this.next(e, t)
            },
            e.prototype.next = function(e, t) {
                cc.log("rank tuil next"),
                this.isLoading ? cc.log("RankUtil \u52a0\u8f7d\u4e2d...") : (this.pageIndex++, this.loadData(e, t))
            },
            e.prototype.before = function(e, t) {
                if (this.isLoading) cc.log("RankUtil \u52a0\u8f7d\u4e2d...");
                else {
                    if (this.pageIndex <= 1) return this.pageIndex = 1,
                    void(null != this.data ? t(this.data.slice(0, e), this.selfData) : t([], null));
                    this.pageIndex--,
                    this.loadData(e, t)
                }
            },
            e.prototype.loadData = function(e, t) {
                for (var o = this.pageIndex * e,
                n = this.data.length; null != this.data && 0 != n && !(this.pageIndex > 1 && n < o);) return void t(this.data.slice((this.pageIndex - 1) * e, this.pageIndex * e), this.selfData);
                this.isLoading = !0,
                this.readMaxLen = Math.max(o, this.readMaxLen)
            },
            e.prototype.showFriend = function(e, t) {
                if (cc.log("RankUtil.showFriend"), this.pageIndex = 1, null != this.friendData) return this.friendMaxPage = Math.ceil(this.friendData.length / e),
                void t(this.friendData.slice((this.pageIndex - 1) * e, this.pageIndex * e), this.friendSelf);
                this.isLoading = !0
            },
            e.prototype.nextFriend = function(e, t) {
                this.isLoading ? cc.log("RankUtil \u52a0\u8f7d\u4e2d...") : this.pageIndex >= this.friendMaxPage ? cc.log("\u5df2\u7ecf\u662f\u6700\u540e\u4e00\u9875\uff01\uff01\uff01") : (this.pageIndex++, t(this.friendData.slice((this.pageIndex - 1) * e, this.pageIndex * e), this.friendSelf))
            },
            e.prototype.beforeFriend = function(e, t) {
                this.isLoading ? cc.log("RankUtil \u52a0\u8f7d\u4e2d...") : this.pageIndex <= 1 ? cc.log("\u5df2\u7ecf\u662f\u7b2c\u4e00\u9875\uff01\uff01\uff01") : (this.pageIndex--, t(this.friendData.slice((this.pageIndex - 1) * e, this.pageIndex * e), this.friendSelf))
            },
            e.prototype.targetFriend = function(e, t) {
                if (null == this.friendData);
                else {
                    for (var o = null,
                    i = this.friendData,
                    a = i.length - 1; a >= 0; a--) {
                        var r = i[a];
                        if (r.uid != n.
                    default.share.uid && r.score > e) {
                            o = r;
                            break
                        }
                    }
                    t(o)
                }
            },
            e.prototype.cacheData = function() {},
            e.DEFAUL_COUNT = 30,
            e._instance = null,
            e
        } ();
        o.
    default = i,
        cc._RF.pop()
    },
    {
        "./User": "User"
    }],
    RedDot: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "7e10e9ceo1F4pUF6BXNc779", "RedDot"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Util"),
        i = cc._decorator,
        a = i.ccclass,
        r = (i.property,
        function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            t.prototype.start = function() {
                n.
            default.event.on(this.eventName, this.updateStatus, this),
                this.updateStatus()
            },
            t.prototype.updateStatus = function() {
                this.node.active = this.showDot
            },
            Object.defineProperty(t.prototype, "eventName", {
                get: function() {
                    return ""
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "showDot", {
                get: function() {
                    return ! 0
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.onDestroy = function() {
                n.
            default.event.off(this.eventName, this.updateStatus, this)
            },
            t = __decorate([a], t)
        } (cc.Component));
        o.
    default = r,
        cc._RF.pop()
    },
    {
        "../base/Util": "Util"
    }],
    ResUtil: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "26241ckgEtNGaKpvX/Qpjp4", "ResUtil"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Util"),
        i = function() {
            function e() {
                this.sfsStar = null,
                this.sfsPaper1 = null,
                this.sfsPaper2 = null,
                this.sfsPaper3 = null,
                this.sfsPaper4 = null,
                this.face = null,
                this.sfsBigWin = null
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.loadRes = function(e) {
                for (var t = this,
                o = null,
                i = [], a = [], r = 1; r <= 4; r++) o = "ui/star_" + r,
                i.push(o);
                a.push({
                    name: "sfsStar",
                    count: 4
                });
                for (r = 1; r <= 9; r++) o = "paper/blue" + n.
            default.numberFill(r, 4),
                i.push(o);
                a.push({
                    name: "sfsPaper1",
                    count: 9
                });
                for (r = 1; r <= 9; r++) o = "paper/green" + n.
            default.numberFill(r, 4),
                i.push(o);
                a.push({
                    name: "sfsPaper2",
                    count: 9
                });
                for (r = 1; r <= 9; r++) o = "paper/red" + n.
            default.numberFill(r, 4),
                i.push(o);
                a.push({
                    name: "sfsPaper3",
                    count: 9
                });
                for (r = 1; r <= 9; r++) o = "paper/yellow" + n.
            default.numberFill(r, 4),
                i.push(o);
                a.push({
                    name: "sfsPaper4",
                    count: 9
                });
                for (r = 1; r <= 8; r++) o = "ui/big_" + n.
            default.numberFill(r, 1),
                i.push(o);
                i.push("ui/big_type1"),
                i.push("ui/big_type2"),
                a.push({
                    name: "sfsBigWin",
                    count: 10
                }),
                cc.loader.loadResArray(i, cc.SpriteFrame,
                function(o, n) {
                    for (var i = 0,
                    r = a.length,
                    c = 0; c < r; c++) {
                        var s = a[c];
                        t[s.name] = n.slice(i, i + s.count),
                        i += s.count
                    }
                    null != e && e()
                })
            },
            e.prototype.createSprite = function(e, t, o, n) {
                var i = new cc.Node,
                a = i.addComponent(cc.Sprite);
                a.trim = !1,
                a.sizeMode = cc.Sprite.SizeMode.RAW;
                var r = i.addComponent(cc.Animation),
                c = cc.AnimationClip.createWithSpriteFrames(e, t);
                if (c.wrapMode = 1 != o ? cc.WrapMode.Loop: cc.WrapMode.Normal, c.name = "run", r.addClip(c), r.play(c.name), o <= 0) return i;
                null == n && (n = function() {});
                var s = (e.length + 1) / t * o;
                return i.runAction(cc.sequence(cc.delayTime(s), cc.callFunc(n), cc.removeSelf(!0))),
                i
            },
            e._instance = null,
            e
        } ();
        o.
    default = i,
        cc._RF.pop()
    },
    {
        "../base/Util": "Util"
    }],
    Result: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "6f6a9svvpJHrp0O9Ha2waIh", "Result"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Lang"),
        i = e("../model/Room"),
        a = e("../proxy/PlayerProxy"),
        r = e("../base/Util"),
        c = e("../const/GEvent"),
        s = e("../control/DataUtil"),
        l = cc._decorator,
        u = l.ccclass,
        d = l.property,
        h = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.firstOpen = !0,
                t.nodeList = null,
                t.nodeNew = null,
                t.list = [],
                t.isLoading = !1,
                t
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.start = function() {
                n.
            default.share.bind(this.node),
                this.nodeNew.active = !1,
                r.
            default.event.on(c.
            default.SHOW_WIN, this.updateData, this),
                a.
            default.share.getRecords(this.loadRahd.bind(this))
            },
            t.prototype.loadRahd = function(e) {
                this.list = [];
                for (var t = 0,
                n = e; t < n.length; t++) {
                    var i = n[t];
                    if (this.list.push(i), this.list.length >= o.MAX) break
                }
                if (0 != this.list.length) {
                    this.nodeList.removeAllChildren(!0),
                    this.nodeNew.active = !0;
                    for (var a = 0,
                    c = 0,
                    l = this.list; c < l.length; c++) {
                        if (((i = l[c]) || 0 === i) && (r.
                    default.loadSprite(s.
                    default.getIcon2(i)).parent = this.nodeList, ++a >= o.MAX)) break
                    }
                    this.isLoading = !0
                } else this.nodeNew.active = !1
            },
            t.prototype.updateData = function() {
                if (!this.isLoading || this.firstOpen) return console.log("\u6536\u5230\u63a8\u9001\u65f6\u3002\u8fd8\u6ca1\u52a0\u8f7d\u5b8c"),
                this.firstOpen = !1,
                void a.
            default.share.getRecords(this.loadRahd.bind(this));
                for (this.nodeNew.active = !0, this.list.unshift(i.
            default.share.winArea); this.nodeList.childrenCount >= o.MAX;) this.nodeList.removeChild(this.nodeList.children[this.nodeList.childrenCount - 1], !0),
                this.list.pop();
                for (var e = 0; e < this.nodeList.childrenCount; e++) this.nodeList.children[e].zIndex = e + 1;
                var t = r.
            default.loadSprite(s.
            default.getIcon2(i.
            default.share.winArea));
                this.nodeList.addChild(t)
            },
            t.prototype.onDestroy = function() {
                r.
            default.event.off(c.
            default.SHOW_WIN, this.updateData, this)
            },
            t.MAX = 8,
            __decorate([d(cc.Node)], t.prototype, "nodeList", void 0),
            __decorate([d(cc.Node)], t.prototype, "nodeNew", void 0),
            t = o = __decorate([u], t)
        } (cc.Component);
        o.
    default = h,
        cc._RF.pop()
    },
    {
        "../base/Lang": "Lang",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../control/DataUtil": "DataUtil",
        "../model/Room": "Room",
        "../proxy/PlayerProxy": "PlayerProxy"
    }],
    Room: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "927ecHWp35GoI9FoKLSDRxh", "Room"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/BoxMsg"),
        i = e("../base/Lang"),
        a = e("../base/Loading"),
        r = e("../control/TimeUtil"),
        c = function() {
            function e() {
                this.state = 0,
                this.time = 0,
                this.myBetInfo = {},
                this.winArea = 0,
                this.winCoin = 0,
                this.winSum = 0,
                this.winByBet = 0,
                this.stars = [0, 0, 0, 0, 0, 0],
                this.hot = -1,
                this.top3 = null
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.saveMyBetInfo = function() {
                if (null != this.myBet) for (var e in this.myBet) this.myBetInfo[e] = 0;
                else this.myBetInfo = {}
            },
            e.prototype.getBetCount = function() {
                var e = 0;
                for (var t in this.myBetInfo) {
                    var o = Number(t);
                    o >= 1 && o <= 8 && e++
                }
                return e
            },
            e.prototype.addUserBet = function(t, o) {
                var n = t + "";
                null == e.share.myBet && (e.share.myBet = {}),
                this.myBet[n] = this.myBet[n] ? this.myBet[n] : 0,
                this.myBet[n] += Number(o)
            },
            e.prototype.userBetInfo = function(e, t, o) {
                void 0 === o && (o = 0);
                var n = e + "",
                i = 0;
                if (null == this.myBetInfo ? (this.myBetInfo = {},
                this.myBetInfo[n] = 0) : this.myBetInfo[n] >= 0 ? i = this.myBetInfo[n] : this.myBetInfo[n] = 0, void 0 != o && null != o && 0 !== o) return i <= 1 && t < 0 ? this.myBet && this.myBet[n] > 0 ? void(this.myBetInfo[n] += t) : (delete this.myBetInfo[n], void console.log(" cs \u4e0b\u6ce8\u5931\u8d25\u5220\u9664\u8bb0\u5f55 ", this.myBetInfo, n)) : void(this.myBetInfo[n] += t);
                t <= 0 && 0 == i ? this.myBetInfo[n] = 0 : this.myBetInfo[n] += t
            },
            e.prototype.isCanBet = function(t) {
                return ! (t <= 0 || t > 8) && (!( - 1 == Object.keys(this.myBetInfo).indexOf(t + "") && e.share.getBetCount() >= e.BET_MAX) || (n.
            default.show(i.
            default.share.find("5004")), !1))
            },
            e.prototype.bufferBet = function() {
                if (e.IN_BET_MAX <= 0) return ! 0;
                var t = 0;
                for (var o in this.myBetInfo) {
                    var n = Number(o);
                    n <= 0 || n > 8 || (!this.myBetInfo[o] || this.myBetInfo[o] <= 0 || (t += this.myBetInfo[o]))
                }
                return t >= e.IN_BET_MAX ? (a.
            default.show(), console.log(" cs \u4e0b\u6ce8\u8bf7\u6c42\u8fc7\u591a ", t), !1) : (a.
            default.hide(), !0)
            },
            Object.defineProperty(e.prototype, "subTime", {
                get: function() {
                    var t = this.state == e.STATE_BET ? 2 : 0;
                    return this.time - r.
                default.now - t
                },
                enumerable: !0,
                configurable: !0
            }),
            e._instance = null,
            e.BET_MAX = 6,
            e.IN_BET_MAX = -1,
            e.STATE_NONE = 0,
            e.STATE_BET = 1,
            e.STATE_WAIT = 2,
            e.STATE_SETT = 3,
            e.STATE_WIN = 4,
            e
        } ();
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "../base/BoxMsg": "BoxMsg",
        "../base/Lang": "Lang",
        "../base/Loading": "Loading",
        "../control/TimeUtil": "TimeUtil"
    }],
    RotateTime: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "48c80oCx8ZPdauf6hM6gzUz", "RotateTime"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Lang"),
        i = e("../base/Util"),
        a = e("../const/GEvent"),
        r = e("../model/Room"),
        c = cc._decorator,
        s = c.ccclass,
        l = c.property,
        u = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labRound = null,
                t.labRound2 = null,
                t.count = 0,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                n.
            default.share.bind(this.node),
                n.
            default.share.isLeft ? (this.labRound2.node.x = this.labRound.node.width / 2 + 5, this.labRound2.node.anchorX = 0) : (this.labRound2.node.x = -this.labRound.node.width / 2 - 5, this.labRound2.node.anchorX = 1),
                i.
            default.event.on(a.
            default.START_BET, this.startBet, this),
                i.
            default.event.on(a.
            default.START_ROTATE, this.startRotate, this),
                i.
            default.event.on(a.
            default.SHOW_WIN, this.startBet, this),
                r.
            default.share.state == r.
            default.STATE_WAIT ? this.startRotate() : this.startBet()
            },
            t.prototype.startBet = function() {
                this.labRound.node.active = !1,
                this.labRound2.node.active = !1
            },
            t.prototype.startRotate = function() {
                var e = this;
                this.labRound.node.active = !0,
                this.labRound2.node.active = !0,
                this.labRound.string = n.
            default.share.find("sett_time"),
                this.labRound.node.stopAllActions(),
                this.labRound.node.scale = 10,
                this.labRound.node.runAction(cc.sequence(cc.scaleTo(.5, 1), cc.callFunc(function() {
                    e.labRound.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(.4), cc.callFunc(e.updateText, e))))
                })))
            },
            t.prototype.updateText = function() {
                if (this.count++, this.count > 3) return this.labRound2.string = "",
                void(this.count = 0);
                this.labRound2.string += "."
            },
            t.prototype.onDestroy = function() {
                i.
            default.event.off(a.
            default.START_BET, this.startBet, this),
                i.
            default.event.off(a.
            default.START_ROTATE, this.startRotate, this),
                i.
            default.event.off(a.
            default.SHOW_WIN, this.startBet, this)
            },
            __decorate([l(cc.Label)], t.prototype, "labRound", void 0),
            __decorate([l(cc.Label)], t.prototype, "labRound2", void 0),
            t = __decorate([s], t)
        } (cc.Component);
        o.
    default = u,
        cc._RF.pop()
    },
    {
        "../base/Lang": "Lang",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../model/Room": "Room"
    }],
    ScrollViewBase: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "2376cWbw0RHW7v7K4Ed5Fz3", "ScrollViewBase"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Lang"),
        i = cc._decorator,
        a = i.ccclass,
        r = i.property,
        c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.scrollView = null,
                t.cellLst = new Array,
                t.touchBeginX = 0,
                t.touchBeginY = 0,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                n.
            default.share.bind(this.node),
                console.log("scroll Start()"),
                this.scrollView ? (this.scrollView.node.on(cc.Node.EventType.TOUCH_START, this.touchEventHandler, this), this.scrollView.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchEventHandler, this), this.scrollView.node.on(cc.Node.EventType.TOUCH_END, this.touchEventHandler, this), this.scrollView.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEventHandler, this)) : console.log("\u627e\u4e0d\u5230\u754c\u9762scrollView")
            },
            t.prototype.setContentHeight = function(e) {
                this.scrollView ? this.scrollView.content.height = Math.max(e, this.scrollView.node.height) : console.log("\u627e\u4e0d\u5230\u754c\u9762scrollView")
            },
            t.prototype.touchEventHandler = function(e) {
                if (e.type == cc.Node.EventType.TOUCH_START) this.touchBeginX = e.getLocationX(),
                this.touchBeginY = e.getLocationY();
                else if (e.type == cc.Node.EventType.TOUCH_END || e.type == cc.Node.EventType.TOUCH_CANCEL) {
                    if (Math.abs(e.getLocationX() - this.touchBeginX) > 50 || Math.abs(e.getLocationY() - this.touchBeginY) > 50) return;
                    for (var t = 0,
                    o = this.cellLst; t < o.length; t++) {
                        var n = o[t],
                        i = new cc.Vec2(e.getLocationX(), e.getLocationY());
                        if (n.getBoundingBoxToWorld().contains(i)) return void this.onClickCell(n)
                    }
                }
            },
            t.prototype.onDestroy = function() {
                null != this.scrollView && null != this.scrollView.node && (this.scrollView.node.off(cc.Node.EventType.TOUCH_START, this.touchEventHandler, this), this.scrollView.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchEventHandler, this), this.scrollView.node.off(cc.Node.EventType.TOUCH_END, this.touchEventHandler, this), this.scrollView.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchEventHandler, this))
            },
            t.prototype.onClickCell = function(e) {},
            __decorate([r(cc.ScrollView)], t.prototype, "scrollView", void 0),
            t = __decorate([a], t)
        } (cc.Component);
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "./Lang": "Lang"
    }],
    ServerPorxy: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "2ac3fHDgzJNUqMAfUhC9C8B", "ServerPorxy"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Network"),
        i = e("../const/Config"),
        a = e("../base/User"),
        r = e("../base/Util"),
        c = e("../base/BoxMsg"),
        s = e("../base/Lang"),
        l = e("../base/Init"),
        u = e("../base/Loading"),
        d = e("../base/API"),
        h = e("../const/GEvent"),
        f = e("./HeartProxy"),
        p = e("../control/TimeUtil"),
        g = e("../command/CommandUtil"),
        y = e("../control/LXSDK"),
        v = e("./LingxianProxy"),
        m = function() {
            function e() {
                this.net = null,
                this.rhand = null,
                this.isDebug = !0,
                this.gameIP = null,
                this.sign = null,
                this.errorTry = e.TRY_CONNECT_COUNT
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.connect = function(e) {
                this.rhand = e,
                this.startConnect()
            },
            e.prototype.startConnect = function() {
                var t = this;
                this.close(),
                this.net = new n.
            default(this.isDebug),
                this.net.errorRhand = this.connectError.bind(this),
                this.net.errorMsg = this.errorMsg.bind(this);
                var o = null;
                o = l.
            default.isTest ? i.
            default.SERVER_ID_DEBUG:
                i.
            default.SERVER_ID,
                this.net.connect(o,
                function() {
                    t.errorTry = e.TRY_CONNECT_COUNT,
                    f.
                default.share.recvHeart(),
                    g.
                default.init(),
                    l.
                default.isTest ? null != t.rhand && t.rhand() : v.
                default.share.login(t.rhand)
                })
            },
            e.prototype.send = function(e, t, o) {
                for (var n, i = [], a = 3; a < arguments.length; a++) i[a - 3] = arguments[a];
                null != this.net ? (n = this.net).send.apply(n, [e, t, o].concat(i)) : cc.log("\u672a\u8fde\u63a5\u670d\u52a1\u5668")
            },
            e.prototype.setSession = function(e) {
                this.send(function(t) {
                    e()
                },
                "common", "setSession", a.
            default.share.uid, a.
            default.share.session)
            },
            e.prototype.getUserInfo = function(e) {
                v.
            default.share.getUserInfo(e)
            },
            e.prototype.getGunScores = function(e) {
                this.send(function(t) {
                    if (0 == t.error) {
                        a.
                    default.share.betList = t.result;
                        for (var o = a.
                    default.share.betList.length - 2; o >= 0; o--) {
                            var n = 1e3 * a.
                        default.share.betList[o];
                            if (a.
                        default.share.coin >= n) {
                                a.
                            default.share.betIndex = o + 1;
                                break
                            }
                        }
                        e()
                    }
                },
                "common", "getGunScores", a.
            default.share.uid, Number(i.
            default.gameId))
            },
            e.prototype.getServerTime = function(e) {
                this.send(function(t) {
                    0 == t.error && (t = t.result, p.
                default.init(t[0], t[1]), e())
                },
                "common", "getServerTime", a.
            default.share.uid)
            },
            e.prototype.close = function() {
                null != this.net && (this.net.close(), this.net = null)
            },
            e.prototype.connectError = function() {
                this.close(),
                c.
            default.show(s.
            default.share.find("net_error"),
                function() {
                    u.
                default.show(),
                    cc.director.loadScene("LoginScene")
                })
            },
            e.prototype.errorMsg = function(e) {
                if (y.
            default.plError(e), 4004 != e) if (6001 != e) {
                    var t = s.
                default.share.find(e.toString());
                    l.
                default.isTest ? t = "\u9519\u8bef\u4ee3\u7801:" + t: t == e.toString() && (t = s.
                default.share.find("net_error") + "\n" + t),
                    c.
                default.show(t,
                    function() {
                        d.
                    default.share.restart()
                    })
                } else c.
            default.show(s.
            default.share.find("5004"));
                else this.getUserInfo(function() {
                    r.
                default.event.emit(h.
                default.UPDATE_COIN)
                })
            },
            e.TRY_CONNECT_COUNT = 3,
            e.TRY_DELAY = 5,
            e._instance = null,
            e
        } ();
        o.
    default = m,
        cc._RF.pop()
    },
    {
        "../base/API": "API",
        "../base/BoxMsg": "BoxMsg",
        "../base/Init": "Init",
        "../base/Lang": "Lang",
        "../base/Loading": "Loading",
        "../base/Network": "Network",
        "../base/User": "User",
        "../base/Util": "Util",
        "../command/CommandUtil": "CommandUtil",
        "../const/Config": "Config",
        "../const/GEvent": "GEvent",
        "../control/LXSDK": "LXSDK",
        "../control/TimeUtil": "TimeUtil",
        "./HeartProxy": "HeartProxy",
        "./LingxianProxy": "LingxianProxy"
    }],
    SettCommand: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "cb83etN2tlDQa3TGijAd+1e", "SettCommand"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/BaseCommand"),
        i = e("../model/Room"),
        a = e("../base/Util"),
        r = e("../const/GEvent"),
        c = e("../base/User"),
        s = e("../base/Loading"),
        l = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "typeId", {
                get: function() {
                    return "303"
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.execute = function(e) {
                e = e.result,
                s.
            default.hide(),
                i.
            default.share.state = i.
            default.STATE_SETT,
                t.parse(e),
                a.
            default.event.emit(r.
            default.SHOW_SETT)
            },
            t.parse = function(e) {
                null != e ? (i.
            default.share.winArea = e[1], i.
            default.share.winCoin = e[2], c.
            default.share.coin = e[3], i.
            default.share.winByBet = e[5], i.
            default.share.top3 = e[6]) : console.log("\u7ed3\u7b97\u5904\u7406\u6570\u636e\u4e3a\u7a7a")
            },
            t
        } (n.
    default);
        o.
    default = l,
        cc._RF.pop()
    },
    {
        "../base/BaseCommand": "BaseCommand",
        "../base/Loading": "Loading",
        "../base/User": "User",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../model/Room": "Room"
    }],
    Sound: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "d5b56kLCwJHqIyASbrXgPFJ", "Sound"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Util"),
        i = function() {
            function e() {
                this._enableMusic = !0,
                this._enableSound = !0,
                this.musicName = null,
                this.musicId = -1,
                this.soundCache = {},
                this.musicCache = {},
                this._musicVolume = 1,
                this._soundVolume = 1,
                this.getVolume(),
                this.initEvent()
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.initEvent = function(e, t) {
                var o = this;
                cc.game.on(cc.game.EVENT_SHOW,
                function() {
                    cc.sys.__audioSupport.context.resume(),
                    cc.audioEngine.resumeAll(),
                    cc.sys.os === cc.sys.OS_IOS && (o.musicName ? o.music(o.musicName) : o.bgm()),
                    e && e()
                }),
                cc.game.on(cc.game.EVENT_HIDE,
                function() {
                    cc.sys.__audioSupport.context.suspend(),
                    cc.audioEngine.pauseAll(),
                    t && t()
                })
            },
            Object.defineProperty(e.prototype, "enableMusic", {
                get: function() {
                    return this._enableMusic
                },
                set: function(e) {
                    this._enableMusic = e,
                    this.saveData(),
                    e ? null != this.musicName && this.music(this.musicName) : -1 != this.musicId && cc.audioEngine.stop(this.musicId)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "enableSound", {
                get: function() {
                    return this._enableSound
                },
                set: function(e) {
                    this._enableSound = e,
                    this.saveData()
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.saveData = function() {
                n.
            default.saveItem(e.MUSIC_KEY, {
                    music: this.enableMusic,
                    sound: this.enableSound
                })
            },
            e.prototype.music = function(e) {
                var t = this;
                if (this.musicName = e, this.enableMusic && !cc.director.isPaused() && !cc.game.isPaused()) {
                    if ( - 1 != this.musicId && (cc.audioEngine.stop(this.musicId), cc.audioEngine.stopMusic()), this.musicCache[e]) return this.musicId = cc.audioEngine.playMusic(this.musicCache[e], !0),
                    void cc.audioEngine.setMusicVolume(this.musicVolume);
                    cc.loader.loadRes(this.getPath(e), cc.AudioClip,
                    function(o, n) {
                        t.musicCache[e] = n,
                        t.musicId = cc.audioEngine.playMusic(t.musicCache[e], !0),
                        cc.audioEngine.setMusicVolume(t.musicVolume)
                    })
                }
            },
            e.prototype.musicOne = function(e, t) {
                var o = this;
                if (!this.enableMusic || cc.director.isPaused() || cc.game.isPaused()) cc.log("musicOne \u97f3\u4e50\u5173\u95ed,\u4e0d\u64ad\u653e\u97f3\u4e50");
                else if (this.musicCache[e]) {
                    var n = cc.audioEngine.playMusic(this.musicCache[e], !1);
                    null != t && t(n)
                } else console.log("this.getPath(v)", this.getPath(e)),
                cc.loader.loadRes(this.getPath(e), cc.AudioClip,
                function(n, i) {
                    console.log("\u64ad\u653e\u97f3\u4e50"),
                    o.musicCache[e] = i;
                    var a = cc.audioEngine.playMusic(o.musicCache[e], !1);
                    null != t && t(a)
                })
            },
            e.prototype.sound = function(e, t, o) {
                var n = this;
                if (void 0 === o && (o = !1), this.enableSound && !cc.director.isPaused() && !cc.game.isPaused() && 0 !== this.soundVolume) if (this.soundCache[e]) {
                    var i = cc.audioEngine.playEffect(this.soundCache[e], o);
                    null != t && t(i)
                } else cc.loader.loadRes(this.getPath(e), cc.AudioClip,
                function(i, a) {
                    n.soundCache[e] = a;
                    var r = cc.audioEngine.playEffect(n.soundCache[e], o);
                    null != t && t(r)
                })
            },
            e.prototype.stopSound = function(e) {
                cc.audioEngine.stop(e)
            },
            e.prototype.click = function() {
                this.sound("click")
            },
            e.prototype.bgm = function() {
                this.music("bgm")
            },
            e.prototype.getPath = function(e) {
                return "sound/" + e
            },
            e.prototype.getVolume = function() {
                var t = n.
            default.loadItem(e.VOLUME_KEY);
                null != t && "" != t && (this._musicVolume = t.music, this._soundVolume = t.sound, cc.audioEngine.setEffectsVolume(t.sound), cc.audioEngine.setVolume(this.musicId, t.music), cc.audioEngine.setMusicVolume(t.music))
            },
            e.prototype.saveVolume = function() {
                n.
            default.saveItem(e.VOLUME_KEY, {
                    music: this.musicVolume,
                    sound: this.soundVolume
                })
            },
            Object.defineProperty(e.prototype, "musicVolume", {
                get: function() {
                    return this._musicVolume
                },
                set: function(e) {
                    this._musicVolume = e,
                    cc.audioEngine.setEffectsVolume(this._soundVolume),
                    cc.audioEngine.setVolume(this.musicId, e),
                    cc.audioEngine.setMusicVolume(e),
                    this.saveVolume()
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "soundVolume", {
                get: function() {
                    return this._soundVolume
                },
                set: function(e) {
                    this._soundVolume = e,
                    cc.audioEngine.setEffectsVolume(e),
                    cc.audioEngine.setVolume(this.musicId, this._musicVolume),
                    cc.audioEngine.setMusicVolume(this._musicVolume),
                    this.saveVolume()
                },
                enumerable: !0,
                configurable: !0
            }),
            e._instance = null,
            e.MUSIC_KEY = "MUSIC_KEY",
            e.VOLUME_KEY = "VOLUME_KEY",
            e
        } ();
        o.
    default = i,
        cc._RF.pop()
    },
    {
        "./Util": "Util"
    }],
    StarCommand: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "69429zc+ttMJr6XZl0NYT5+", "StarCommand"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/BaseCommand"),
        i = e("../model/Room"),
        a = e("../base/Util"),
        r = e("../const/GEvent"),
        c = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "typeId", {
                get: function() {
                    return "307"
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.execute = function(e) {
                e = e.result,
                i.
            default.share.stars[e[0] - 1] = e[1];
                for (var t = -1,
                o = 0,
                n = i.
            default.share.stars.length - 1; n >= 0; n--) {
                    var c = i.
                default.share.stars[n];
                    c > o && (t = n, o = c)
                }
                i.
            default.share.hot = t,
                a.
            default.event.emit(r.
            default.UPDATE_STAR)
            },
            t
        } (n.
    default);
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "../base/BaseCommand": "BaseCommand",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../model/Room": "Room"
    }],
    StorageBox: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "a64165/Eo9KSZIBqXWWwtxv", "StorageBox"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Lang"),
        i = e("../base/Sound"),
        a = e("../base/Util"),
        r = e("../const/GEvent"),
        c = e("../control/BoxUtil"),
        s = e("../control/DataUtil"),
        l = e("../control/UpliveUtil"),
        u = e("../model/Room"),
        d = cc._decorator,
        h = d.ccclass,
        f = d.property,
        p = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.rankNode = null,
                t.recordNode = null,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                this.initRank(),
                this.recordNode.getChildByName("lab").getComponent(cc.Label).string = n.
            default.share.find("log_title"),
                a.
            default.event.on(r.
            default.UPDATE_TOP, this.initRank, this)
            },
            t.prototype.initRank = function() {
                var e = u.
            default.share.todayTop3[0],
                t = this.rankNode.getChildByName("icon_jb");
                s.
            default.getPayIcon(t);
                var o = this.rankNode.getChildByName("labName").getComponent(cc.Label),
                n = this.rankNode.getChildByName("labWin").getComponent(cc.Label),
                i = this.rankNode.getChildByName("head");
                if (!e) return o.string = "---",
                void(n.string = "0");
                a.
            default.subName(o, void 0 == e.name ? "": e.name, 6),
                n.string = a.
            default.formatThousand(Math.floor(e.score)),
                l.
            default.loadHead(i, e.icon)
            },
            t.prototype.onMyRecord = function() {
                u.
            default.share.state != u.
            default.STATE_WIN ? (i.
            default.share.click(), c.
            default.share.show("box/BoxLogs")):
                console.log("\u7ed3\u7b97\u65f6\uff01\uff01\u4e0d\u80fd\u770b\u65e5\u5fd7\uff01")
            },
            t.prototype.onRank = function() {
                u.
            default.share.state != u.
            default.STATE_WIN ? (i.
            default.share.click(), c.
            default.share.show("box/BoxRank")):
                console.log("\u7ed3\u7b97\u65f6\uff01\uff01\u4e0d\u80fd\u770b\u65e5\u5fd7\uff01")
            },
            t.prototype.onDestroy = function() {
                a.
            default.event.off(r.
            default.UPDATE_TOP, this.initRank, this)
            },
            __decorate([f(cc.Node)], t.prototype, "rankNode", void 0),
            __decorate([f(cc.Node)], t.prototype, "recordNode", void 0),
            t = __decorate([h], t)
        } (cc.Component);
        o.
    default = p,
        cc._RF.pop()
    },
    {
        "../base/Lang": "Lang",
        "../base/Sound": "Sound",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../control/BoxUtil": "BoxUtil",
        "../control/DataUtil": "DataUtil",
        "../control/UpliveUtil": "UpliveUtil",
        "../model/Room": "Room"
    }],
    TargetFriend: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "b4b09a+AdFBarplIIQNk4/g", "TargetFriend"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./NumberLabel"),
        i = e("./API"),
        a = e("./RankUtil"),
        r = e("./Util"),
        c = cc._decorator,
        s = c.ccclass,
        l = c.property,
        u = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labName = null,
                t.labScorl = null,
                t.nodeHead = null,
                t.step = 0,
                t.lastFriend = null,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                i.
            default.share.isWeChat ? this.node.active = !1 : (this.labName.string = "", this.nodeHead.removeAllChildren(!0), this.node.opacity = 0, null != this.labScorl && (this.labScorl.value = 0))
            },
            t.prototype.getScore = function() {
                return 0
            },
            t.prototype.update = function(e) {
                var t = this;
                this.step--,
                this.step > 0 || (this.step = 60, a.
            default.share.targetFriend(this.getScore(),
                function(e) {
                    null != e ? (t.node.opacity = 255, null != t.lastFriend && t.lastFriend.uid == e.uid || (t.labName.string = e.name, r.
                default.loadHead(t.nodeHead, e.icon), t.lastFriend = e), null != t.labScorl && (t.labScorl.value = e.score)) : t.node.opacity = 0
                }))
            },
            __decorate([l(cc.Label)], t.prototype, "labName", void 0),
            __decorate([l(n.
        default)], t.prototype, "labScorl", void 0),
            __decorate([l(cc.Node)], t.prototype, "nodeHead", void 0),
            t = __decorate([s], t)
        } (cc.Component);
        o.
    default = u,
        cc._RF.pop()
    },
    {
        "./API": "API",
        "./NumberLabel": "NumberLabel",
        "./RankUtil": "RankUtil",
        "./Util": "Util"
    }],
    TestLogin: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "243dbv0uUZLDJeRfnxBSQbA", "TestLogin"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Box"),
        i = e("./BoxMsg"),
        a = e("./Util"),
        r = e("./User"),
        c = e("./Init"),
        s = e("./Sound"),
        l = e("./Lang"),
        u = e("./API"),
        d = cc._decorator,
        h = d.ccclass,
        f = d.property,
        p = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.editUid = null,
                t.langNode = null,
                t
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.start = function() {
                e.prototype.start.call(this);
                var t = a.
            default.loadItem(o.SAVE_KEY);
                null == t && (t = "test" + (new Date).getSeconds()),
                this.editUid.string = t;
                var n = new cc.Node,
                i = n.addComponent(cc.Layout);
                i.type = cc.Layout.Type.GRID,
                i.startAxis = cc.Layout.AxisDirection.HORIZONTAL,
                i.resizeMode = cc.Layout.ResizeMode.CONTAINER,
                i.spacingX = 20,
                i.spacingY = 20,
                n.width = 520,
                n.parent = this.node,
                this.langNode = n,
                n.y = -200;
                for (var r = u.
            default.share.lang,
                c = 0,
                s = l.
            default.ALL; c < s.length; c++) {
                    var d = s[c],
                    h = new cc.Node;
                    h.parent = n,
                    h.setContentSize(100, 50),
                    h.addComponent(cc.Label).string = d;
                    var f = h.addComponent(cc.Button);
                    f.zoomScale = 1.2;
                    var p = new cc.Component.EventHandler;
                    p.component = "TestLogin",
                    p.handler = "onLang",
                    p.target = this.node,
                    p.customEventData = d,
                    f.clickEvents.push(p),
                    h.opacity = d == r ? 255 : 100
                }
                var g = this.node.children[0];
                i.updateLayout(),
                g.width < n.width && (g.width = n.width + 60)
            },
            t.prototype.onOK = function() {
                s.
            default.share.click();
                var e = this.editUid.string;
                "" != e ? (a.
            default.saveItem(o.SAVE_KEY, e), r.
            default.share.uid = e, r.
            default.share.name = e, r.
            default.share.icon = "http://demo.leadercc.com/head/1.jpg", c.
            default.test(), this.onClose()) : i.
            default.show("\u8bf7\u8f93\u5165UID")
            },
            t.prototype.onLang = function(e, t) {
                var o = window.location.href,
                n = o.toUpperCase().lastIndexOf("LANG=");
                if (n > 0) {
                    n += 5;
                    var i = o.substr(0, n),
                    a = o.substr(n);
                    o = i + t,
                    (n = a.indexOf("&")) > 0 && (o += a.substr(n))
                } else o.indexOf("?") > 0 ? o += "&": o += "?",
                o += "lang=" + t;
                window.location.href = o
            },
            t.SAVE_KEY = "TEST_LOGIN",
            __decorate([f(cc.EditBox)], t.prototype, "editUid", void 0),
            t = o = __decorate([h], t)
        } (n.
    default);
        o.
    default = p,
        cc._RF.pop()
    },
    {
        "./API": "API",
        "./Box": "Box",
        "./BoxMsg": "BoxMsg",
        "./Init": "Init",
        "./Lang": "Lang",
        "./Sound": "Sound",
        "./User": "User",
        "./Util": "Util"
    }],
    TimeUtil: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "cd681/4soNDKYVqwNKf9Azi", "TimeUtil"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Util"),
        i = function() {
            function e() {}
            return e.init = function(t, o) {
                var n = Date.now() / 1e3;
                if (e.dtime = t - n, null != o) {
                    var i = o / 36e5;
                    e.zone = i
                }
            },
            Object.defineProperty(e, "now", {
                get: function() {
                    return Math.floor(Date.now() / 1e3 + e.dtime)
                },
                enumerable: !0,
                configurable: !0
            }),
            e.formatTimeMini = function(e) {
                e = Math.floor(e);
                var t = Math.floor(e / 60),
                o = e % 60;
                return n.
            default.numberFill(t, 2) + ":" + n.
            default.numberFill(o, 2)
            },
            e.formatTime = function(e) {
                e = Math.floor(e);
                var t = Math.floor(e / 3600),
                o = Math.floor(e / 60) % 60,
                i = e % 60;
                return n.
            default.numberFill(t, 2) + ":" + n.
            default.numberFill(o, 2) + ":" + n.
            default.numberFill(i, 2)
            },
            e.formatTimeD = function(t) {
                var o = Math.floor(t / 24 / 3600);
                return o > 0 ? o + "d " + e.formatTime(t % 86400) : e.formatTime(t)
            },
            e.formatToZoneTime = function(t, o, i, a) {
                void 0 === o && (o = !0),
                void 0 === i && (i = -1),
                void 0 === a && (a = "\n");
                var r = o ? e.formatDate(t) : new Date(t);
                switch (i) {
                case 1:
                    return r.getFullYear() + "/" + (r.getMonth() + 1) + "/" + r.getDate();
                case 2:
                    return n.
                default.numberFill(r.getHours(), 2, "0") + ":" + n.
                default.numberFill(r.getMinutes(), 2, "0") + ":" + n.
                default.numberFill(r.getSeconds(), 2, "0");
                default:
                    return r.getFullYear() + "/" + (r.getMonth() + 1) + "/" + r.getDate() + a + n.
                default.numberFill(r.getHours(), 2, "0") + ":" + n.
                default.numberFill(r.getMinutes(), 2, "0") + ":" + n.
                default.numberFill(r.getSeconds(), 2, "0")
                }
            },
            e.formatDate = function(t) {
                var o = e.zone;
                return o += (new Date).getTimezoneOffset() / 60,
                new Date(t + 3600 * o * 1e3)
            },
            e.dtime = 0,
            e.zone = 8,
            e
        } ();
        o.
    default = i,
        cc._RF.pop()
    },
    {
        "../base/Util": "Util"
    }],
    Time: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "34de5S8NAVP1I7JbmFOyzGw", "Time"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Lang"),
        i = e("../model/Room"),
        a = e("../const/GEvent"),
        r = e("../base/Util"),
        c = e("../base/NumberLabel"),
        s = cc._decorator,
        l = s.ccclass,
        u = s.property,
        d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.nodeTimeBG = null,
                t.labTimeTitle = null,
                t.labTime = null,
                t.nodeBet = null,
                t.nodeRotate = null,
                t.labRotateTime = null,
                t.lastTime = -1,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                n.
            default.share.bind(this.node),
                this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(.1), cc.callFunc(this.updateTime.bind(this))))),
                i.
            default.share.state == i.
            default.STATE_WAIT || i.
            default.share.state == i.
            default.STATE_SETT || i.
            default.share.state == i.
            default.STATE_WIN ? this.startRotate() : this.startBet(),
                this.updateTime(),
                r.
            default.event.on(a.
            default.START_BET, this.startBet, this),
                r.
            default.event.on(a.
            default.START_ROTATE, this.startRotate, this)
            },
            t.prototype.onRules = function() {},
            t.prototype.updateTime = function() {
                var e = i.
            default.share.subTime;
                e < 0 && (e = 0),
                this.lastTime != e && (this.lastTime = e, this.nodeBet.active ? this.labTime.text = e.toFixed(0) : this.labRotateTime.text = e.toFixed(0))
            },
            t.prototype.startBet = function() {
                this.labTimeTitle.string = n.
            default.share.find("select_time"),
                this.nodeTimeBG.active = !1,
                this.nodeBet.active = !0,
                this.labTimeTitle.node.active = !0,
                this.nodeRotate.active = !1,
                this.updateTime()
            },
            t.prototype.startRotate = function() {
                this.labTimeTitle.string = n.
            default.share.find("sett_time"),
                this.nodeTimeBG.active = !0,
                this.nodeBet.active = !1,
                this.labTimeTitle.node.active = !1,
                this.nodeRotate.active = !0,
                this.updateTime()
            },
            t.prototype.onDestroy = function() {
                r.
            default.event.off(a.
            default.START_BET, this.startBet, this),
                r.
            default.event.off(a.
            default.START_ROTATE, this.startRotate, this)
            },
            __decorate([u(cc.Node)], t.prototype, "nodeTimeBG", void 0),
            __decorate([u(cc.Label)], t.prototype, "labTimeTitle", void 0),
            __decorate([u(c.
        default)], t.prototype, "labTime", void 0),
            __decorate([u(cc.Node)], t.prototype, "nodeBet", void 0),
            __decorate([u(cc.Node)], t.prototype, "nodeRotate", void 0),
            __decorate([u(c.
        default)], t.prototype, "labRotateTime", void 0),
            t = __decorate([l], t)
        } (cc.Component);
        o.
    default = d,
        cc._RF.pop()
    },
    {
        "../base/Lang": "Lang",
        "../base/NumberLabel": "NumberLabel",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../model/Room": "Room"
    }],
    Tips: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "17525gTaUpLs5FUOMdzt6HG", "Tips"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Util"),
        i = cc._decorator,
        a = i.ccclass,
        r = i.property,
        c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.richMsg = null,
                t
            }
            var o;
            return __extends(t, e),
            o = t,
            t.prototype.start = function() {
                var e = null != cc.director.getVisibleSize ? cc.director.getVisibleSize() : cc.view.getVisibleSize();
                this.node.setContentSize(e),
                this.node.runAction(cc.sequence(cc.delayTime(1.5), cc.fadeOut(.3), cc.removeSelf()))
            },
            Object.defineProperty(t.prototype, "text", {
                get: function() {
                    return this.richMsg.string
                },
                set: function(e) {
                    this.richMsg.string = e,
                    this.node.children[0].height = this.richMsg.node.height + 20
                },
                enumerable: !0,
                configurable: !0
            }),
            t.show = function(e) {
                n.
            default.showBoxAsync("Tips",
                function(t) {
                    var n = t.getComponent(o);
                    null != n ? n.text = e: cc.log("\u52a0\u8f7dTips\u4e3a\u7a7a\u5bf9\u8c61")
                })
            },
            __decorate([r(cc.RichText)], t.prototype, "richMsg", void 0),
            t = o = __decorate([a], t)
        } (cc.Component);
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "./Util": "Util"
    }],
    Top1Command: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "2e737L0guVBD7PPPiTyAUwm", "Top1Command"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/BaseCommand"),
        i = e("../model/Room"),
        a = e("../base/Util"),
        r = e("../const/GEvent"),
        c = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "typeId", {
                get: function() {
                    return "306"
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.execute = function(e) {
                e = e.result,
                i.
            default.share.todayTop3 = e[0],
                i.
            default.share.winSum = e[1],
                a.
            default.event.emit(r.
            default.UPDATE_TOP)
            },
            t
        } (n.
    default);
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "../base/BaseCommand": "BaseCommand",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../model/Room": "Room"
    }],
    Top3: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "477e4UzFXJOpowqE2KThErs", "Top3"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Util"),
        i = e("../const/GEvent"),
        a = e("../model/Room"),
        r = e("../control/UpliveUtil"),
        c = cc._decorator,
        s = c.ccclass,
        l = c.property,
        u = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.nodeHead = [],
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                n.
            default.event.on(i.
            default.SHOW_WIN, this.onShowWin, this),
                this.onShowWin();
                var e = cc.view.getVisibleSize(),
                t = e.height / e.width;
                if (t < 16 / 9) this.node.active = !1;
                else {
                    var o = 750 * t;
                    this.node.y = (o - 1334) / 2
                }
            },
            t.prototype.onShowWin = function() {
                for (var e = this.nodeHead.length - 1; e >= 0; e--) {
                    var t = this.nodeHead[e],
                    o = a.
                default.share.todayTop3[e];
                    null != o && void 0 != o ? r.
                default.loadHead(t, o.icon) : t.removeAllChildren(!0)
                }
            },
            t.prototype.onDestroy = function() {
                n.
            default.event.off(i.
            default.SHOW_WIN, this.onShowWin, this)
            },
            __decorate([l(cc.Node)], t.prototype, "nodeHead", void 0),
            t = __decorate([s], t)
        } (cc.Component);
        o.
    default = u,
        cc._RF.pop()
    },
    {
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../control/UpliveUtil": "UpliveUtil",
        "../model/Room": "Room"
    }],
    Top: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "90705x+YFdJSpNaBIg0XYRg", "Top"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Lang"),
        i = e("../model/Room"),
        a = e("../control/BoxUtil"),
        r = e("../base/Util"),
        c = e("../const/GEvent"),
        s = e("../base/Sound"),
        l = e("../base/API"),
        u = cc._decorator,
        d = u.ccclass,
        h = u.property,
        f = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labRound = null,
                t.roudDx = 0,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                n.
            default.share.bind(this.node),
                this.updateRound(),
                r.
            default.event.on(c.
            default.START_BET, this.updateRound, this)
            },
            t.prototype.onRules = function() {
                s.
            default.share.click(),
                a.
            default.share.show("box/Description")
            },
            t.prototype.onMyRecord = function() {
                i.
            default.share.state != i.
            default.STATE_WIN ? (s.
            default.share.click(), a.
            default.share.show("box/BoxLogs")):
                console.log("\u7ed3\u7b97\u65f6\uff01\uff01\u4e0d\u80fd\u770b\u65e5\u5fd7\uff01")
            },
            t.prototype.onRank = function() {
                i.
            default.share.state != i.
            default.STATE_WIN ? (s.
            default.share.click(), a.
            default.share.show("box/BoxRank")):
                console.log("\u7ed3\u7b97\u65f6\uff01\uff01\u4e0d\u80fd\u770b\u65e5\u5fd7\uff01")
            },
            t.prototype.onSetting = function() {
                s.
            default.share.click(),
                a.
            default.share.show("box/BoxConfig")
            },
            t.prototype.onBack = function() {
                s.
            default.share.click(),
                l.
            default.share.quickGame()
            },
            t.prototype.updateRound = function() {
                this.labRound.string = n.
            default.share.find("round", i.
            default.share.round)
            },
            t.prototype.onDestroy = function() {
                r.
            default.event.off(c.
            default.START_BET, this.updateRound, this)
            },
            __decorate([h(cc.Label)], t.prototype, "labRound", void 0),
            t = __decorate([d], t)
        } (cc.Component);
        o.
    default = f,
        cc._RF.pop()
    },
    {
        "../base/API": "API",
        "../base/Lang": "Lang",
        "../base/Sound": "Sound",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent",
        "../control/BoxUtil": "BoxUtil",
        "../model/Room": "Room"
    }],
    TypeTips: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "be92cl2qQ1Kx64hSg08FCq+", "TypeTips"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Lang"),
        i = e("../base/Util"),
        a = e("../const/GEvent"),
        r = cc._decorator,
        c = r.ccclass,
        s = r.property,
        l = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.nodeList = [],
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                n.
            default.share.bind(this.node),
                i.
            default.event.on(a.
            default.SHOW_TYPE_TIPS, this.showTips, this),
                i.
            default.event.on(a.
            default.HIDE_TYPE_TIPS, this.hideTips, this),
                this.hideTips()
            },
            t.prototype.updateSize = function(e) {
                var t = e.getChildByName("tip"),
                o = t.getChildByName("lab").getComponent(cc.Label);
                if (t && o) {
                    var n = 298; (n = o.node.height + 80) < 160 && (n = 160),
                    t.height = n
                }
            },
            t.prototype.showTips = function(e) {
                this.node.active = !0;
                for (var t = e.detail - 1,
                o = this.nodeList.length - 1; o >= 0; o--) {
                    var n = this.nodeList[o];
                    n.active = o == t,
                    this.updateSize(n)
                }
            },
            t.prototype.hideTips = function() {
                this.node.active = !1
            },
            t.prototype.onDestroy = function() {
                i.
            default.event.off(a.
            default.SHOW_TYPE_TIPS, this.showTips, this),
                i.
            default.event.off(a.
            default.HIDE_TYPE_TIPS, this.hideTips, this)
            },
            __decorate([s(cc.Node)], t.prototype, "nodeList", void 0),
            t = __decorate([c], t)
        } (cc.Component);
        o.
    default = l,
        cc._RF.pop()
    },
    {
        "../base/Lang": "Lang",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent"
    }],
    UpLive: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "0e9bcfyenpMFKZ1/DZE79RQ", "UpLive"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../User"),
        i = e("../Util"),
        a = e("../../proxy/ServerPorxy"),
        r = e("../../const/Config"),
        c = e("../BoxMsg"),
        s = e("../Lang"),
        l = function() {
            function e() {
                this.clientID = null,
                this.code = null,
                this.upliveCode = null,
                this.countryCode = null
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "loginBackUrl", {
                get: function() {
                    return r.
                default.isTest ? r.
                default.isGold ? "http://" + r.
                default.IP + ":8082/uplive_login.jsp": "http://uplive.leadercc.com/test_jsp/zhibo/uplive_login.jsp": r.
                default.isGold ? "https://" + r.
                default.IP + "/gold_jsp/uplive_login.jsp": "https://" + r.
                default.IP + "/jsp/uplive_login.jsp"
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "isSelf", {
                get: function() {
                    return !! window.isUplive
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function() {
                var e = r.
            default.isTest ? "r5uy6l1m": this.clientID,
                t = r.
            default.gameId.toString();
                this.getOpenSdk().init({
                    env:
                    this.evt,
                    client_id: e,
                    game_id: t,
                    mode: r.
                default.isGold ? "gold": "diamond"
                }),
                console.log("init open sdk")
            },
            e.prototype.login = function(e) {
                var t = this,
                o = this.getCode();
                if (null == o) this.showLogin("\u6ca1CODE");
                else {
                    this.code = o;
                    var a = this.gameURL;
                    i.
                default.loadHtml(this.loginBackUrl,
                    function(o) {
                        if (console.log("html11", o), "null" != (o = o.replace(/[\n\r]/g, ""))) {
                            var i = JSON.parse(o);
                            if (null == i || i.hasOwnProperty("errno")) return console.log("\u767b\u5f55\u9519\u8bef\u53cb\uff1a", o),
                            void t.showLogin(o);
                            t.upliveCode = i.uplive_code,
                            t.countryCode = i.country_code,
                            n.
                        default.share.uid = i.open_id,
                            n.
                        default.share.name = i.username,
                            n.
                        default.share.icon = i.avatar,
                            n.
                        default.share.roomID = t.getScope(),
                            "zh-TW" == t.platformLang && "TW" == t.countryCode ? (s.
                        default.LangName = "tw", s.
                        default.share.init2(e)):
                            e()
                        } else t.showLogin("\u6ca1\u6570\u636e\u8fd4\u56de")
                    },
                    {
                        code: this.code,
                        redirect_uri: a
                    })
                }
            },
            Object.defineProperty(e.prototype, "gameURL", {
                get: function() {
                    var e = window.location.href.split("?")[0],
                    t = e.length;
                    return "/" != e.substr(t - 1) && "html" != e.substr(t - 4).toLocaleLowerCase() && (e += "/"),
                    e
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.showLogin = function(e) {
                console.log("show login", e);
                var t = this.gameURL;
                console.log("\u767b\u5f55URL", t),
                this.getOpenSdk().oauth({
                    redirect_url: t
                });
                var o = new cc.Node;
                o.parent = cc.director.getScene().getChildByName("Canvas"),
                o.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function() {
                    window.location.href = t + "&restart=" + (new Date).getTime()
                })))
            },
            e.prototype.getCode = function() {
                var e = window.location.search;
                if (null == e || "" == e) return null;
                for (var t = 0,
                o = (e = e.substr(1)).split("&"); t < o.length; t++) {
                    var n = o[t].split("=");
                    if ("CODE" == n[0].toUpperCase()) return n[1]
                }
                return null
            },
            e.prototype.getFeature = function() {
                var e = window.location.search;
                if (null == e || "" == e) return "";
                for (var t = 0,
                o = (e = e.substr(1)).split("&"); t < o.length; t++) {
                    var n = o[t].split("=");
                    if ("FEATURE" == n[0].toUpperCase()) return n[1]
                }
                return ""
            },
            e.prototype.setCoinIcon = function(t) {
                null == t && (t = (new cc.Node).addComponent(cc.Sprite)),
                t.spriteFrame = null;
                var o = this.getFeature(),
                n = null;
                return n = o == e.FEATURE_BUBBLY ? "ui/bubbly": o == e.FEATURE_HAYA ? "ui/haya": "ui/uplive",
                cc.loader.loadRes(n, cc.SpriteFrame,
                function(e, o) {
                    e ? console.log("\u52a0\u8f7d\u8d27\u5e01\u56fe\u6807\u5931\u8d25", n) : t.spriteFrame = o
                }),
                t.node
            },
            e.prototype.getScope = function() {
                var e = window.location.search;
                if (null == e || "" == e) return "";
                for (var t = 0,
                o = (e = e.substr(1)).split("&"); t < o.length; t++) {
                    var n = o[t].split("=");
                    if ("SCOPE" == n[0].toUpperCase()) return n[1]
                }
                return ""
            },
            e.prototype.pay = function(e) {
                var t = {
                    upliveCode: this.upliveCode,
                    lang: this.platformLang || "cn",
                    counytryCode: this.countryCode,
                    success: function() {
                        console.log("=>\u5145\u503c\u6210\u529f"),
                        null == e && (e = function() {}),
                        a.
                    default.share.getUserInfo(e)
                    },
                    fail: function() {
                        console.log("=>\u5145\u503c\u5931\u8d25")
                    },
                    cancel: function() {
                        console.log("=>\u5173\u95ed\u5145\u503c\u5f39\u7a97")
                    }
                };
                "stage" == this.evt && (t.rechargeMethod = "aliweb"),
                this.getOpenSdk().recharge(t)
            },
            e.prototype.postUser = function() {
                this.getOpenSdk().ping({
                    open_id: n.
                default.share.uid
                }),
                this.getGold(function() {
                    cc.log("\u83b7\u53d6\u91d1\u5e01")
                })
            },
            Object.defineProperty(e.prototype, "evt", {
                get: function() {
                    return r.
                default.isTest ? "stage": "pro"
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.receiver = function() {
                this.isSelf || cc.log("uplive receiver")
            },
            e.prototype.getGold = function(e) {
                this.isSelf ? r.
            default.isGold ? this.getOpenSdk().receiveGold({
                    open_id: n.
                default.share.uid,
                    getGoldSuccess: function() {
                        a.
                    default.share.getUserInfo(e)
                    }
                }):
                cc.log("\u4e0d\u662f\u91d1\u5e01\u7248"):
                cc.log("uplive getGold")
            },
            e.prototype.rechargeGold = function() {
                this.isSelf && this.getOpenSdk().rechargeGold()
            },
            e.prototype.quickGame = function() {
                this.getOpenSdk().quitGame()
            },
            e.prototype.quickGameHalf = function() {
                if (cc.sys.isBrowser) {
                    var e = window.history.length - 2;
                    e > 0 ? window.history.go( - e) : window.history.back()
                }
            },
            Object.defineProperty(e.prototype, "lang", {
                get: function() {
                    var t = this.platformLang;
                    if (null == t) t = "en";
                    else if ("zh-CN" == t) t = "cn";
                    else {
                        var o = t.substr(0, 2);
                        "zh" == o && (t = "hk"),
                        "en" == o && (t = "en"),
                        "pt" == o && (t = "pt"),
                        "tr" == o && (t = "tr")
                    }
                    return i.
                default.saveItem(e.LANG_KEY, t),
                    t
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "platformLang", {
                get: function() {
                    var t = window.location.search;
                    if (null == t || "" == t) return i.
                default.loadItem(e.LANG_KEY);
                    for (var o = null,
                    n = 0,
                    a = (t = t.substr(1)).split("&"); n < a.length; n++) {
                        var r = a[n].split("=");
                        if ("_LANG" == r[0].toUpperCase()) {
                            o = r[1];
                            break
                        }
                    }
                    return null == o && (o = i.
                default.loadItem(e.LANG_KEY)),
                    o
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.getOpenSdk = function() {
                if ("undefined" == typeof openSdk) {
                    var e = window.location.href;
                    return e.indexOf("restart=") > 0 ? e += "1": e = e + "&restart=" + (new Date).getTime(),
                    c.
                default.show("SDK init error!!",
                    function() {
                        window.location.href = e
                    }),
                    {}
                }
                return openSdk
            },
            e.FEATURE_BUBBLY = "777",
            e.FEATURE_HAYA = "6666",
            e.LANG_KEY = "UPLIVE_LANG_KEY",
            e._instance = null,
            e
        } ();
        o.
    default = l,
        cc._RF.pop()
    },
    {
        "../../const/Config": "Config",
        "../../proxy/ServerPorxy": "ServerPorxy",
        "../BoxMsg": "BoxMsg",
        "../Lang": "Lang",
        "../User": "User",
        "../Util": "Util"
    }],
    UpdateCoinCommand: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "6a45a4CedpCdKd2gumPvZF4", "UpdateCoinCommand"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/BaseCommand"),
        i = e("../base/Util"),
        a = e("../const/GEvent"),
        r = e("../base/User"),
        c = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "typeId", {
                get: function() {
                    return "101"
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.execute = function(e) {
                r.
            default.share.coin = e.result[0],
                i.
            default.event.emit(a.
            default.UPDATE_COIN)
            },
            t
        } (n.
    default);
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "../base/BaseCommand": "BaseCommand",
        "../base/User": "User",
        "../base/Util": "Util",
        "../const/GEvent": "GEvent"
    }],
    UpliveUtil: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "1a5a9Yp8S9NvK3PdmuyE9Us", "UpliveUtil"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Util"),
        i = function() {
            function e() {}
            return e.loadHead = function(t, o) {
                null != o && "" != o && e.loadImageBase64(o,
                function(e) {
                    n.
                default.loadHead(t, e)
                })
            },
            e.loadImageBase64 = function(e, t) {
                window.URL = window.URL || window.webkitURL;
                var o = cc.loader.getXMLHttpRequest();
                o.open("get", e, !0),
                o.responseType = "blob",
                o.onload = function() {
                    if (200 == this.status) {
                        var e = this.response,
                        o = new FileReader;
                        o.onloadend = function(e) {
                            var o = e.target.result.toString(),
                            n = (o.substr(11, 3), o.indexOf(";")),
                            i = (o.substr(0, n), o.substr(n)),
                            a = i.substr(8, 4),
                            r = "data:image/";
                            o = (r += "/9j/" == a ? "jpeg": "R0lG" == a ? "gif": "UklG" == a ? "webp": "png") + i,
                            t(o)
                        },
                        o.readAsDataURL(e)
                    }
                },
                o.send()
            },
            e
        } ();
        o.
    default = i,
        cc._RF.pop()
    },
    {
        "../base/Util": "Util"
    }],
    User: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "b28a6DL4DlLWIc2lhjQo3dE", "User"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {
                this.uid = null,
                this.name = null,
                this.icon = null,
                this.hasWon = !1,
                this.session = "",
                this.coin = 0,
                this.betList = null,
                this.betIndex = 0,
                this.roomID = ""
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._share && (e._share = new e),
                    e._share
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "isLowBet", {
                get: function() {
                    return 0 == this.betIndex
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "isHighBet", {
                get: function() {
                    return this.betIndex == this.betList.length - 1
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "bet", {
                get: function() {
                    return this.betIndex >= this.betList.length ? (cc.log("\u83b7\u53d6\u5f53\u524d\u4e0b\u6ce8\u989d\uff0c\u5f53\u524d\u6570\u636e\u8d8a\u754c\uff01"), 0) : this.betList[this.betIndex]
                },
                enumerable: !0,
                configurable: !0
            }),
            e._share = null,
            e
        } ();
        o.
    default = n,
        cc._RF.pop()
    },
    {}],
    Util: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "5a0f5en39JFP7Z0SsMmJC6F", "Util"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./API"),
        i = e("./GameBox"),
        a = e("./Loading"),
        r = function() {
            function e() {}
            return e.saveItem = function(e, t) {
                var o = JSON.stringify(t);
                cc.sys.localStorage.setItem(e, o)
            },
            e.loadItem = function(e) {
                var t = cc.sys.localStorage.getItem(e);
                return null == t || "" == t ? null: JSON.parse(t)
            },
            e.removeItem = function(e) {
                cc.sys.localStorage.removeItem(e)
            },
            e.loadHtml = function(e, t, o) {
                void 0 === o && (o = null),
                console.log("http ", e);
                var n = cc.loader.getXMLHttpRequest();
                n.onreadystatechange = function() {
                    4 == n.readyState && (n.status >= 200 && n.status < 300 || 304 == n.status ? (cc.log("---\x3eurl:", e), cc.log("http request : ", n.responseText), cc.log("<---:", e), t(n.responseText)) : (console.log("\u8bf7\u6c42\u72b6\u6001\u4e0d\u5bf9 xhr status : ", e, n.status), t(null)))
                },
                n.ontimeout = function() {
                    console.log("\u8bf7\u6c42\u8d85\u65f6\uff1a", e),
                    t(null)
                };
                var i = null != o ? "POST": "GET";
                if (n.open(i, e, !0), n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), null != o) {
                    for (var a in i = "",
                    o) i += a + "=" + o[a] + "&";
                    o = i.substr(0, i.length - 1),
                    console.log("post data :", o)
                }
                n.send(o)
            },
            e.formatNumber = function(e) {
                return e >= 1e6 ? Math.floor(e / 1e6).toFixed(0) + "M": e >= 1e4 ? Math.floor(e / 1e3).toFixed(0) + "K": e.toFixed(0)
            },
            e.formatThousand = function(e) {
                return (e + "").replace(/\d{1,3}(?=(\d{3})+$)/g, "$&,")
            },
            e.loadSprite = function(e, t) {
                var o = new cc.Node,
                n = o.addComponent(cc.Sprite);
                return n.trim = !1,
                n.sizeMode = cc.Sprite.SizeMode.RAW,
                cc.loader.loadRes(e, cc.SpriteFrame,
                function(i, a) {
                    i ? cc.log("\u52a0\u8f7d\u56fe\u7247\u51fa\u9519", e) : (n.spriteFrame = a, null != t && t(o))
                }),
                o
            },
            e.loadNodeSprite = function(e, t) {
                cc.loader.loadRes(e, cc.SpriteFrame,
                function(o, n) {
                    o ? cc.log(e) : t(n)
                })
            },
            e.loadSpriteURL = function(e, t, o) {
                var n = new cc.Node,
                i = n.addComponent(cc.Sprite);
                return cc.loader.load({
                    url: e,
                    type: t
                },
                function(t, a) {
                    t ? cc.log("\u52a0\u8f7d\u56fe\u7247\u51fa\u9519", e) : (i.spriteFrame = new cc.SpriteFrame(a), null != o && o(n))
                }),
                n
            },
            e.loadHead = function(t, o) {
                if (t.removeAllChildren(!0), null != o && "" != o && "data:text" != o.substr(0, 9)) {
                    if ("data:image" == o.substr(0, 10)) {
                        cc.log("\u4f7f\u7528base64\u56fe\u7247");
                        var n = new Image;
                        return n.onload = function() {
                            cc.log("loadBase64\u52a0\u8f7d\u5b8c\u6210");
                            var e = new cc.Texture2D;
                            e.initWithElement(n),
                            e.handleLoadedTexture();
                            var o = new cc.SpriteFrame(e),
                            i = new cc.Node;
                            i.addComponent(cc.Sprite).spriteFrame = o,
                            i.parent = t,
                            i.scale = t.width / i.width
                        },
                        void(n.src = o.replace(/ /g, "+"))
                    }
                    if (cc.sys.isBrowser) return cc.log("facebook load image"),
                    void e.loadImageBase64(o,
                    function(o) {
                        e.loadHead(t, o)
                    });
                    cc.loader.load({
                        url: o,
                        type: "png"
                    },
                    function(e, n) {
                        if (e) cc.log("\u52a0\u8f7d\u5934\u50cf\u51fa\u9519", o);
                        else {
                            var i = new cc.Node;
                            i.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(n),
                            i.parent = t,
                            i.scale = t.width / i.width
                        }
                    })
                } else console.log("\u52a0\u8f7d\u56fe\u6807\u5730\u5740\u6709\u95ee\u9898\uff1a", o)
            },
            e.loadSpriteCrossOrigin = function(e, t) {
                var o = new Image;
                o.src = e,
                o.crossOrigin = "anonymous",
                o.onload = function() {
                    cc.log("loadSpriteCrossOrigin\u52a0\u8f7d\u5b8c\u6210");
                    var e = new cc.Texture2D;
                    e.initWithElement(o),
                    e.handleLoadedTexture();
                    var n = new cc.SpriteFrame(e);
                    t(n)
                }
            },
            e.loadBase64 = function(e, t) {
                i.
            default.share.getImageBase64(e,
                function(o) {
                    if (null != o) {
                        var n = "png"; (e.lastIndexOf(".jpg") || e.lastIndexOf(".JPG") > 0) && (n = "jpg");
                        var i = new Image;
                        i.onload = function() {
                            cc.log("loadBase64\u52a0\u8f7d\u5b8c\u6210");
                            var e = new cc.Texture2D;
                            e.initWithElement(i),
                            e.handleLoadedTexture();
                            var o = new cc.SpriteFrame(e);
                            t(o)
                        },
                        i.src = "data:image/" + n + ";base64," + o
                    } else cc.log("\u52a0\u8f7d\u56fe\u7247\u5931\u8d25:", e)
                })
            },
            e.showBox = function(e) {
                var t = cc.instantiate(e);
                return t.parent = cc.director.getScene().getChildByName("Canvas"),
                t.zIndex = 1e3,
                t
            },
            e.showBoxAsync = function(t, o) {
                cc.log("\u6253\u5f00\u7a97\u53e3:", t),
                e.loadPrefab(t,
                function(t) {
                    var n = e.showBox(t);
                    o && o(n)
                })
            },
            e.loadPrefab = function(e, t) {
                cc.loader.loadRes("prefab/" + e,
                function(e, o) {
                    if (e) return console.log("load prefab error" + e),
                    void a.
                default.hide();
                    t && t(o)
                })
            },
            e.adjustResolution = function(e) {
                if (null != e) {
                    var t = cc.view.getFrameSize(),
                    o = cc.view.getDesignResolutionSize();
                    o.width / o.height < t.width / t.height ? (e.fitHeight = !0, e.fitWidth = !1) : (e.fitHeight = !1, e.fitWidth = !0)
                }
            },
            e.image2base64 = function(e, t) {
                var o = new Image;
                o.src = e,
                o.crossOrigin = "anonymous",
                o.onload = function() {
                    console.log("loadSpriteCrossOrigin\u52a0\u8f7d\u5b8c\u6210");
                    var e = o.width,
                    n = o.height,
                    i = document.createElement("canvas"),
                    a = i.getContext("2d");
                    i.width = e,
                    i.height = n,
                    a.drawImage(o, 0, 0, o.width, o.height);
                    var r = o.src.substring(o.src.lastIndexOf(".") + 1).toLowerCase(),
                    c = i.toDataURL("image/" + r);
                    cc.log("\u56fe\u7247\u7f16\u7801:", c),
                    t(c)
                }
            },
            e.loadImageBase64 = function(e, t) {
                window.URL = window.URL || window.webkitURL;
                var o = cc.loader.getXMLHttpRequest();
                o.open("get", e, !0),
                o.responseType = "blob",
                o.onload = function() {
                    if (200 == this.status) {
                        var e = this.response,
                        o = new FileReader;
                        o.onloadend = function(e) {
                            var o = e.target.result;
                            t(o)
                        },
                        o.readAsDataURL(e)
                    }
                },
                o.send()
            },
            e.startGame = function(t, o) {
                n.
            default.share.isFacebook && e.gamePlayCount > 0 && e.gamePlayCount % t == 0 ? n.
            default.share.showVideoAd(function(t) {
                    t && (cc.director.loadScene(o), e.gamePlayCount++)
                }) : (cc.director.loadScene(o), e.gamePlayCount++)
            },
            e.copy = function(e, t) {
                for (var o in e) t[o] = e[o];
                return t
            },
            e.numberFill = function(e, t, o) {
                void 0 === o && (o = "0");
                var n = e.toString();
                for (t -= n.length; t > 0;) n = o + n,
                t--;
                return n
            },
            e.clickEffect = function(e) {
                e.stopActionByTag(100),
                e.runAction(cc.sequence(cc.scaleTo(.1, 1.2), cc.scaleTo(.1, 1))).setTag(100)
            },
            e.addPrefabs = function(e, t, o) {
                for (var n = [], i = 0, a = t; i < a.length; i++) {
                    var r = a[i];
                    n.push("prefab/" + r)
                }
                cc.loader.loadResArray(n,
                function(t, n) {
                    for (var i = [], a = 0, r = n; a < r.length; a++) {
                        var c = r[a],
                        s = cc.instantiate(c);
                        s.parent = e,
                        i.push(s)
                    }
                    o(i)
                })
            },
            e.subName = function(e, t, o) {
                return (t = t || "").length > o + 1 && (t = t.substr(0, o) + "..."),
                e && e.string && (e.string = t),
                t
            },
            e.formatToZoneTime = function(t) {
                var o = new Date(t.replace(new RegExp(/-/g), "/")).getTime();
                return e.formatToZoneTime2(o)
            },
            e.formatToZoneTime2 = function(t, o) {
                void 0 === o && (o = "\n");
                var n = 8;
                n += (new Date).getTimezoneOffset() / 60;
                var i = new Date(t - 3600 * n * 1e3);
                return i.getFullYear() + "/" + (i.getMonth() + 1) + "/" + i.getDate() + o + e.numberFill(i.getHours(), 2, "0") + ":" + e.numberFill(i.getMinutes(), 2, "0") + ":" + e.numberFill(i.getSeconds(), 2, "0")
            },
            e.event = new cc.EventTarget,
            e.gamePlayCount = 0,
            e
        } ();
        o.
    default = r,
        cc._RF.pop()
    },
    {
        "./API": "API",
        "./GameBox": "GameBox",
        "./Loading": "Loading"
    }],
    WaitCommand: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "eefaabYTB9Gu7uka9Hkm4qr", "WaitCommand"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/BaseCommand"),
        i = e("../model/Room"),
        a = e("../base/Util"),
        r = e("../const/GEvent"),
        c = e("../const/Effect"),
        s = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            Object.defineProperty(t.prototype, "typeId", {
                get: function() {
                    return "302"
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.execute = function(e) {
                e = e.result,
                i.
            default.share.state = i.
            default.STATE_WAIT,
                i.
            default.share.time = e[0] + c.
            default.WAIT_TIME,
                i.
            default.share.round = e[1],
                a.
            default.event.emit(r.
            default.START_ROTATE)
            },
            t
        } (n.
    default);
        o.
    default = s,
        cc._RF.pop()
    },
    {
        "../base/BaseCommand": "BaseCommand",
        "../base/Util": "Util",
        "../const/Effect": "Effect",
        "../const/GEvent": "GEvent",
        "../model/Room": "Room"
    }],
    WechatSubSprite: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "d682bkON8BHU73ydETcKqY1", "WechatSubSprite"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./pl/Wechat"),
        i = cc._decorator,
        a = i.ccclass,
        r = i.property,
        c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.texture = new cc.Texture2D,
                t.rankType = 0,
                t
            }
            return __extends(t, e),
            t.prototype.start = function() {
                switch (cc.log("WechatSubSprite", this.rankType), this.rankType) {
                case 1:
                    n.
                default.share.updateFriendRank();
                    break;
                case 2:
                    n.
                default.share.updateTargetFriend(this.score);
                    break;
                case 3:
                    n.
                default.share.updateFriendRank2();
                    break;
                case 4:
                    n.
                default.share.updateTargetFriend2(this.score)
                }
            },
            Object.defineProperty(t.prototype, "score", {
                get: function() {
                    return 0
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.update = function(e) {
                n.
            default.share.updateContext(this, this.texture),
                this.node.scale = 750 / this.node.width
            },
            t.prototype.onDestroy = function() {
                null != this.texture && (this.texture = null)
            },
            __decorate([r], t.prototype, "rankType", void 0),
            t = __decorate([a], t)
        } (cc.Sprite);
        o.
    default = c,
        cc._RF.pop()
    },
    {
        "./pl/Wechat": "Wechat"
    }],
    Wechat: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "87707q8sU5G3ZA0rCm4fdz7", "Wechat"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../GameBox"),
        i = e("../User"),
        a = e("../Lang"),
        r = e("../Util"),
        c = e("../API"),
        s = function() {
            function e() {
                this._wechatCludBtn = null,
                this._wechatLoginBtn = null,
                this._wechatCode = null,
                this._wechatVideo = null,
                this._wechatBannerAd = null,
                this.videoRhand = null
            }
            return Object.defineProperty(e, "share", {
                get: function() {
                    return null == e._instance && (e._instance = new e),
                    e._instance
                },
                enumerable: !0,
                configurable: !0
            }),
            e.prototype.init = function() {
                var e = this;
                wx.showShareMenu({
                    withShareTicket: !0
                }),
                null != n.
            default.share.shareData && "" != n.
            default.share.shareData.picture ? wx.onShareAppMessage(function() {
                    return {
                        title: n.
                    default.share.shareData.title,
                        imageUrl: n.
                    default.share.shareData.picture,
                        query: "uid=" + i.
                    default.share.uid,
                        success: function(t) {
                            e.shareRhand(t,
                            function(e) {
                                if (null != e) {
                                    var t = e.encryptedData + "," + e.iv;
                                    cc.log("share key:", t)
                                }
                            })
                        }
                    }
                }) : cc.loader.loadRes("share.jpg",
                function(t, o) {
                    t ? cc.log("share error ", t) : wx.onShareAppMessage(function() {
                        return {
                            title: a.
                        default.share.find("share_to"),
                            imageUrl: o.url,
                            query: "uid=" + i.
                        default.share.uid,
                            success: function(t) {
                                e.shareRhand(t,
                                function(e) {
                                    if (null != e) {
                                        var t = e.encryptedData + "," + e.iv;
                                        cc.log("share key:", t)
                                    }
                                })
                            }
                        }
                    })
                });
                var t = n.
            default.share.voideoId;
                null != t && (this._wechatVideo = wx.createRewardedVideoAd({
                    adUnitId: t
                }), this._wechatVideo.onClose(function(t) {
                    t && t.isEnded || void 0 === t ? null != e.videoRhand && e.videoRhand(!0) : null != e.videoRhand && e.videoRhand(!1)
                })),
                this.wechatStart(wx.getLaunchOptionsSync()),
                wx.onShow(this.wechatStart.bind(this))
            },
            e.prototype.wechatStart = function(e) {
                console.log("wechatStart");
                var t = null;
                if (void 0 != e.scene_note) {
                    t = e.scene_note,
                    t = decodeURIComponent(t);
                    var o = (t = decodeURIComponent(t)).indexOf("pid=");
                    o = (t = t.substr(o + 4)).indexOf("&"),
                    t = t.substr(0, o)
                }
                console.log("\u542f\u52a8\u53c2\u6570\uff1a", t),
                void 0 != t && null != t && "" != t && n.
            default.share.uploadPid(t),
                console.log(JSON.stringify(e))
            },
            e.prototype.showLoginButton = function(e) {
                var t = this;
                if (null == this._wechatLoginBtn) {
                    var o = wx.getSystemInfoSync(),
                    n = {
                        left: (o.screenWidth - 150) / 2,
                        top: (o.screenHeight - 30) / 2,
                        width: 150,
                        height: 35,
                        backgroundColor: "#ffffff",
                        borderColor: "#ffffff",
                        color: "#111111",
                        borderWidth: 2,
                        borderRadius: 10,
                        textAlign: "center",
                        fontSize: 20,
                        lineHeight: 30
                    };
                    this._wechatLoginBtn = wx.createUserInfoButton({
                        type: "text",
                        text: "\u767b\u5f55\u6e38\u620f",
                        style: n
                    }),
                    this._wechatLoginBtn.onTap(function(o) {
                        console.log(o);
                        var n = o.userInfo;
                        i.
                    default.share.name = n.nickName,
                        i.
                    default.share.icon = n.avatarUrl,
                        e(),
                        t._wechatLoginBtn.hide()
                    }),
                    this._wechatLoginBtn.show()
                } else this._wechatLoginBtn.show()
            },
            e.prototype.showClub = function() {
                null == this._wechatCludBtn && (this._wechatCludBtn = wx.createGameClubButton({
                    icon: "green",
                    style: {
                        left: 10,
                        top: 10,
                        width: 40,
                        height: 40
                    }
                }))
            },
            e.prototype.login = function(e, t) {
                var o = this;
                r.
            default.event.emit("loading", 11),
                wx.login({
                    success: function(n) {
                        r.
                    default.event.emit("loading", 12),
                        o._wechatCode = n.code,
                        wx.getUserInfo({
                            success: function(t) {
                                r.
                            default.event.emit("loading", 13);
                                var n = t.userInfo;
                                i.
                            default.share.uid = o._wechatCode,
                                i.
                            default.share.name = n.nickName,
                                i.
                            default.share.icon = n.avatarUrl,
                                e()
                            },
                            fail: t
                        })
                    },
                    fail: t
                })
            },
            e.prototype.showBannerAd = function() {
                var e = n.
            default.share.bannerId;
                if (null != e) {
                    if (null == this._wechatBannerAd) {
                        var t = wx.getSystemInfoSync();
                        this._wechatBannerAd = wx.createBannerAd({
                            adUnitId: e,
                            style: {
                                left: 0,
                                top: t.screenHeight - 80,
                                width: t.screenWidth,
                                height: 80
                            }
                        })
                    }
                    this._wechatBannerAd.show()
                } else cc.log("\u6ca1\u6709Banner\u5e7f\u544aID")
            },
            e.prototype.hideBannerAd = function() {
                null == this._wechatBannerAd || this._wechatBannerAd.hide()
            },
            e.prototype.showVideoAd = function(e) {
                this.videoRhand = e,
                this._wechatVideo.show()
            },
            e.prototype.share = function(e, t, o, n) {
                var i = this;
                wx.shareAppMessage({
                    title: e,
                    imageUrl: t,
                    query: o,
                    success: function(e) {
                        i.shareRhand(e, n)
                    }
                })
            },
            e.prototype.shareRhand = function(e, t) {
                console.log("\u8f6c\u53d1\u6210\u529f!!!"),
                null == e.shareTickets || void 0 == e.shareTickets || "" == e.shareTickets ? (console.log("res.shareTickets is null"), wx.showModal({
                    title: "\u63d0\u793a",
                    content: "\u8bf7\u5206\u4eab\u5230\u7fa4!",
                    showCancel: !1,
                    cancelText: "\u53d6\u6d88",
                    confirmText: "\u77e5\u9053\u4e86"
                }), t(null)) : (console.log("res.shareTickets is not null"), e.shareTickets.length > 0 && (console.log("\u5206\u4eab\u6210\u529f\uff01\uff01", e.shareTickets[0]), wx.getShareInfo({
                    shareTicket: e.shareTickets[0],
                    success: function(e) {
                        t(e)
                    },
                    fail: function() {
                        t(null)
                    }
                })))
            },
            e.prototype.updateFriendRank = function() {
                c.
            default.share.isWeChat && wx.postMessage({
                    type: 1,
                    name: "score",
                    openId: i.
                default.share.uid
                })
            },
            e.prototype.updateFriendRank2 = function() {
                c.
            default.share.isWeChat && wx.postMessage({
                    type: 3,
                    name: "score",
                    openId: i.
                default.share.uid
                })
            },
            e.prototype.updateTargetFriend = function(e) {
                c.
            default.share.isWeChat && wx.postMessage({
                    type: 2,
                    name: "score",
                    openId: i.
                default.share.uid,
                    score: e
                })
            },
            e.prototype.updateTargetFriend2 = function(e) {
                c.
            default.share.isWeChat && wx.postMessage({
                    type: 4,
                    name: "score",
                    openId: i.
                default.share.uid,
                    score: e
                })
            },
            e.prototype.updateOther = function(e) {
                c.
            default.share.isWeChat ? wx.postMessage(e) : cc.log("updateWechatOther")
            },
            e.prototype.clearContext = function() {
                c.
            default.share.isWeChat ? wx.postMessage({
                    type: 0
                }) : cc.log("\u4e0d\u662f\u5728\u5fae\u4fe1\u91cc\uff1aclearWechatContext")
            },
            e.prototype.updateContext = function(e, t) {
                "undefined" != typeof sharedCanvas && (t.initWithElement(sharedCanvas), t.handleLoadedTexture(), e.spriteFrame = new cc.SpriteFrame(t))
            },
            e.prototype.updateRank = function(e) {
                wx.setUserCloudStorage({
                    KVDataList: [{
                        key: "score",
                        value: e.toString()
                    }],
                    success: function(e) {
                        cc.log("\u4e0a\u4f20\u6392\u884c\u699c\u6210\u529f:", e)
                    },
                    fail: function(e) {
                        cc.log("\u4e0a\u4f20\u6392\u884c\u699c\u5931\u8d25:", e)
                    }
                })
            },
            e.prototype.previewImage = function(e) {
                wx.previewImage({
                    current: e,
                    urls: [e]
                })
            },
            e.prototype.jumpto = function(e) {
                wx.navigateToMiniProgram({
                    appId: e,
                    path: ""
                })
            },
            e._instance = null,
            e
        } ();
        o.
    default = s,
        cc._RF.pop()
    },
    {
        "../API": "API",
        "../GameBox": "GameBox",
        "../Lang": "Lang",
        "../User": "User",
        "../Util": "Util"
    }],
    WinCoin: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "bb4b8iLaTFLKoig/vE5cqWC", "WinCoin"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/NumberLabel"),
        i = e("../base/Util"),
        a = e("../base/Sound"),
        r = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                this.charMap = "+1234567890",
                e.prototype.onLoad.call(this)
            },
            t.prototype.start = function() {
                this.font = t.FONT,
                this.fontSize = 63.36,
                this.lineHeight = 63.36,
                this.playAction()
            },
            t.prototype.playAction = function() {
                this.text = this.text,
                this.node.scale = 0,
                this.node.runAction(cc.moveBy(.2, 0, 80)),
                this.node.runAction(cc.sequence(cc.scaleTo(.2, 1.8), cc.scaleTo(.15, .9), cc.scaleTo(.12, 1.4), cc.scaleTo(.12, 1), cc.spawn(cc.moveBy(1.5, 0, 100), cc.fadeOut(1.5)), cc.removeSelf(!0)))
            },
            t.show = function(e, o, n, r) {
                var c = new cc.Node;
                c.addComponent(t).text = "+" + n,
                c.parent = r,
                c.position = e,
                c.zIndex = 200;
                for (var s = 0; s < 5; s++) { (c = i.
                default.loadSprite("ui/YB_1")).position = e,
                    c.parent = r,
                    c.scale = .8 + .4 * Math.random(),
                    c.rotation = 360 * Math.random(),
                    c.runAction(cc.sequence(cc.hide(), cc.delayTime(.1 + .1 * s), cc.show(), cc.moveTo(.3, o), cc.removeSelf(!0)))
                }
                a.
            default.share.sound("win")
            },
            t.loadFont = function() {
                cc.loader.loadRes("nums/ppy_num1", cc.Font,
                function(e, o) {
                    e && cc.log("\u52a0\u8f7d\u6570\u5b57\u51fa\u9519", e.message),
                    t.FONT = o
                })
            },
            t.FONT = null,
            t
        } (n.
    default);
        o.
    default = r,
        cc._RF.pop()
    },
    {
        "../base/NumberLabel": "NumberLabel",
        "../base/Sound": "Sound",
        "../base/Util": "Util"
    }],
    WinPanel: [function(e, t, o) {
        "use strict";
        cc._RF.push(t, "3137cAJzONPcL0sCZ/u+xZ+", "WinPanel"),
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../base/Lang"),
        i = e("../base/Util"),
        a = e("../const/GEvent"),
        r = e("../const/Effect"),
        c = e("../model/Room"),
        s = e("../control/DataUtil"),
        l = e("../control/ResUtil"),
        u = e("../control/BroadcastUtil"),
        d = e("../control/UpliveUtil"),
        h = e("../base/Sound"),
        f = cc._decorator,
        p = f.ccclass,
        g = f.property,
        y = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.nodeBgs = [],
                t.labTime = null,
                t.labRound = null,
                t.nodeHead = null,
                t.nodeAnimal = null,
                t.labWin = null,
                t.labBet = null,
                t.starList = [],
                t.sumTime = 0,
                t
            }
            return __extends(t, e),
            t.prototype.onLoad = function() {
                n.
            default.share.bind(this.node),
                this.node.opacity = 255,
                this.node.y = this.yHide,
                this.initStar(),
                i.
            default.event.on(a.
            default.SHOW_WIN, this.showWin, this),
                i.
            default.event.on(a.
            default.START_BET, this.startBet, this)
            },
            Object.defineProperty(t.prototype, "yShow", {
                get: function() {
                    return - cc.view.getVisibleSize().height / 2
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "yHide", {
                get: function() {
                    return this.yShow - 1.5 * this.node.height
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.start = function() {
                this.labTime.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(.5), cc.callFunc(this.updateTime, this))));
                for (var e = 1; e <= 2; e++) {
                    var t = this.node.getChildByName("icon_jb" + e);
                    s.
                default.getPayIcon(t)
                }
                for (e = 1; e <= 3; e++) {
                    t = (t = (t = this.node.getChildByName("play" + e)).getChildByName("nodeWin")).getChildByName("icon_jb"),
                    s.
                default.getPayIcon(t)
                }
            },
            t.prototype.initStar = function() {
                for (var e = this.node.getContentSize(), t = function(t) {
                    var n = new cc.Node;
                    n.addComponent(cc.Sprite),
                    n.parent = o.node;
                    var i = function() {
                        n.position = cc.p((1 * Math.random() - .5) * e.width, Math.random() * e.height),
                        n.rotation = 360 * Math.random(),
                        n.scale = .4 * Math.random() + .8;
                        var t = Math.floor(Math.random() * l.
                    default.share.sfsStar.length);
                        n.getComponent(cc.Sprite).spriteFrame = l.
                    default.share.sfsStar[t],
                        n.runAction(cc.fadeTo(.3, 155 * Math.random() + 100))
                    };
                    n.runAction(cc.repeatForever(cc.sequence(cc.delayTime(2 * Math.random() + 1.5), cc.fadeOut(.3), cc.callFunc(i)))),
                    n.runAction(cc.repeatForever(cc.rotateBy(5 * Math.random() + 5, Math.random() > .5 ? -360 : 360))),
                    o.starList.push(n),
                    i()
                },
                o = this, n = 0; n < 4; n++) t()
            },
            t.prototype.showWin = function() {
                this.sumTime = c.
            default.share.subTime,
                this.sumTime <= 0 && (this.sumTime = r.
            default.WIN_TIME),
                this.sumTime += .5,
                this.updateTime(),
                this.node.stopAllActions(),
                this.node.runAction(cc.sequence(cc.moveTo(r.
            default.WIN_PANEL_SHOW_TIME, cc.p(0, this.yShow)), cc.callFunc(function() {
                    u.
                default.share.next()
                }))),
                this.nodeHead.removeAllChildren(!0);
                var e = c.
            default.share.winArea,
                t = null;
                t = e < 0 ? l.
            default.share.sfsBigWin[7 - e] : l.
            default.share.sfsBigWin[c.
            default.share.winArea - 1];
                var o = new cc.Node;
                o.addComponent(cc.Sprite).spriteFrame = t,
                o.parent = this.nodeHead,
                this.labRound.string = n.
            default.share.find("round_title", c.
            default.share.round),
                this.labBet.string = i.
            default.formatThousand(c.
            default.share.winByBet),
                this.labWin.string = i.
            default.formatThousand(c.
            default.share.winCoin),
                this.nodeAnimal.removeAllChildren(!0),
                i.
            default.loadSprite(s.
            default.getIcon(c.
            default.share.winArea)).parent = this.nodeAnimal,
                this.nodeBgs[0].active = c.
            default.share.winArea > 0,
                this.nodeBgs[1].active = !this.nodeBgs[0].active;
                for (var a = c.
            default.share.top3,
                f = null == a ? 0 : a.length, p = 0; p < 3; p++) {
                    var g = this.node.getChildByName("play" + (p + 1));
                    if (p >= f) g.active = !1;
                    else {
                        g.active = !0;
                        var y = a[p];
                        g.getChildByName("head").active = !y[1];
                        var v = g.getChildByName("nodeHead");
                        v.removeAllChildren(),
                        d.
                    default.loadHead(v, y[1]);
                        var m = g.getChildByName("labName").getComponent(cc.Label),
                        _ = g.getChildByName("nodeWin").getChildByName("labWin").getComponent(cc.Label);
                        m.string = y[2],
                        _.string = i.
                    default.formatThousand(y[3])
                    }
                }
                for (var b = c.
            default.share.winCoin > 0,
                T = 0,
                C = this.starList; T < C.length; T++) { (g = C[T]).active = b
                }
                b && h.
            default.share.sound("bigwin")
            },
            t.prototype.startBet = function() {
                this.node.stopAllActions(),
                this.node.runAction(cc.moveTo(r.
            default.WIN_PANEL_SHOW_TIME, cc.p(0, this.yHide)))
            },
            t.prototype.updateTime = function() {
                this.sumTime -= .5,
                this.sumTime < 0 && (this.sumTime = 0),
                this.labTime.string = "(" + this.sumTime.toFixed(0) + "s)"
            },
            t.prototype.onDestroy = function() {
                i.
            default.event.off(a.
            default.SHOW_WIN, this.showWin, this),
                i.
            default.event.off(a.
            default.START_BET, this.startBet, this)
            },
            __decorate([g(cc.Node)], t.prototype, "nodeBgs", void 0),
            __decorate([g(cc.Label)], t.prototype, "labTime", void 0),
            __decorate([g(cc.Label)], t.prototype, "labRound", void 0),
            __decorate([g(cc.Node)], t.prototype, "nodeHead", void 0),
            __decorate([g(cc.Node)], t.prototype, "nodeAnimal", void 0),
            __decorate([g(cc.Label)], t.prototype, "labWin", void 0),
            __decorate([g(cc.Label)], t.prototype, "labBet", void 0),
            t = __decorate([p], t)
        } (cc.Component);
        o.
    default = y,
        cc._RF.pop()
    },
    {
        "../base/Lang": "Lang",
        "../base/Sound": "Sound",
        "../base/Util": "Util",
        "../const/Effect": "Effect",
        "../const/GEvent": "GEvent",
        "../control/BroadcastUtil": "BroadcastUtil",
        "../control/DataUtil": "DataUtil",
        "../control/ResUtil": "ResUtil",
        "../control/UpliveUtil": "UpliveUtil",
        "../model/Room": "Room"
    }]
},
{},
["API", "ActionNum", "BaseCommand", "BaseScene", "Box", "BoxMsg", "CheckIps", "Data", "FriendTop3", "GameBox", "Init", "InitScene", "Lang", "LangComponent", "LangComponentSimple", "LangSprite", "Loading", "MyHorizontal", "MyWidget", "Netstatus", "Network", "NumberAtlas", "NumberLabel", "RankUtil", "ScrollViewBase", "Sound", "TargetFriend", "TestLogin", "Tips", "User", "Util", "WechatSubSprite", "Facebook", "Lingxian", "LiveMe", "QQPlay", "UpLive", "Wechat", "BetTips", "BoxConfig", "BoxLogs", "BoxRank", "BoxSurePay", "BoxTipsPay", "ConfirmBox", "Description", "BetCommand", "BetTipsCommand", "BroadcastCommand", "CommandUtil", "SettCommand", "StarCommand", "Top1Command", "UpdateCoinCommand", "WaitCommand", "Animal", "AnimalLayer", "Bets", "Bottom", "Broadcast", "RedDot", "Result", "RotateTime", "StorageBox", "Time", "Top", "Top3", "TypeTips", "WinCoin", "WinPanel", "Config", "Effect", "GEvent", "BoxUtil", "BroadcastUtil", "DataUtil", "EnoughUtil", "GameUtil", "LXSDK", "ResUtil", "TimeUtil", "UpliveUtil", "LCActivity", "LCActivity01Command", "LCActivity02Command", "LCActivityBox", "LCActivityBoxBase", "LCActivityBoxXS", "LCActivityBtnMB", "LCActivityBtnXS", "LCActivityBtnZP", "LCActivityButton", "LCActivityItemXS", "LCActivityList", "LCActivityPorxy", "LCActivityTaskCommand", "LCActivityTaskOpenCommand", "LCActivityTaskPorxy", "LCActivityUser", "LCActivityUtil", "LCActivityUtilXS", "LCActivityXSCommand", "LCActivityXSPorxy", "LCActivityXSUpdateCommand", "LCActivityXSVo", "Room", "HeartProxy", "LingxianProxy", "PlayerProxy", "ServerPorxy", "GameScene", "LoginScene"]);