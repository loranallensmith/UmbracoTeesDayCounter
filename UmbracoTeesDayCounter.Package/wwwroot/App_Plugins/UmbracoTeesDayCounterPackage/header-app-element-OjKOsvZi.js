import { html as i, css as C, state as d, customElement as $ } from "@umbraco-cms/backoffice/external/lit";
import { UmbHeaderAppButtonElement as f } from "@umbraco-cms/backoffice/components";
var I = Object.defineProperty, L = Object.getOwnPropertyDescriptor, v = (e) => {
  throw TypeError(e);
}, u = (e, t, n, s) => {
  for (var r = s > 1 ? void 0 : s ? L(t, n) : t, l = e.length - 1, h; l >= 0; l--)
    (h = e[l]) && (r = (s ? h(t, n, r) : h(r)) || r);
  return s && r && I(t, n, r), r;
}, S = (e, t, n) => t.has(e) || v("Cannot " + n), U = (e, t, n) => t.has(e) ? v("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), o = (e, t, n) => (S(e, t, "access private method"), n), a, _, m, b, c, y, g, w, k, D, T, x;
const O = "umbraco-tees-header-app";
let p = class extends f {
  constructor() {
    super(), U(this, a), this._dates = [], this._timeLeft = 0, this.timerInterval = null, fetch("https://api.github.com/repos/OwainWilliams/UmbracoTeesDay/contents/datesFolder/dates.json").then((e) => e.json()).then((e) => {
      const t = atob(e.content);
      this._dates = JSON.parse(t), this._timeLeft = (Date.parse(o(this, a, c).call(this)) - Date.now()) / 1e3;
    }).catch((e) => console.error(e));
  }
  connectedCallback() {
    super.connectedCallback(), o(this, a, _).call(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), o(this, a, m).call(this);
  }
  get formattedTimeLeft() {
    let e = Math.floor(this._timeLeft);
    const t = Math.floor(e / (60 * 60 * 24 * 7));
    e %= 60 * 60 * 24 * 7;
    const n = Math.floor(e / (60 * 60 * 24));
    e %= 60 * 60 * 24;
    const s = Math.floor(e / (60 * 60));
    e %= 60 * 60;
    const r = Math.floor(e / 60);
    return e %= 60, { weeks: t, days: n, hours: s, minutes: r, seconds: e };
  }
  render() {
    return i` ${o(this, a, g).call(this)} ${o(this, a, w).call(this)} `;
  }
};
a = /* @__PURE__ */ new WeakSet();
_ = function() {
  this.timerInterval || (this.timerInterval = setInterval(() => {
    this._timeLeft > 0 ? this._timeLeft -= 1 : o(this, a, m).call(this);
  }, 1e3));
};
m = function() {
  this.timerInterval && (clearInterval(this.timerInterval), this.timerInterval = null);
};
b = function(e) {
  this._popoverOpen = e.newState === "open";
};
c = function() {
  for (var e = /* @__PURE__ */ new Date(), t = this._dates[0], n = 1; n < this._dates.length; n++) {
    var s = Date.parse(this._dates[n]);
    s > e.getTime() && s < Date.parse(t) && (t = this._dates[n]);
  }
  return t;
};
y = function() {
  return this._timeLeft <= 1e3 * 60 * 60 * 24 * 14;
};
g = function() {
  return i`
			<uui-button popovertarget="tees-menu-popover" look="primary" label="help" class=${o(this, a, y).call(this) ? "sparkle" : ""} compact>
				<uui-icon name="icon-t-shirt"></uui-icon>
			</uui-button>
		`;
};
w = function() {
  return i`
			<uui-popover-container id="tees-menu-popover" @toggle=${o(this, a, b)}>
				<umb-popover-layout>
					<uui-scroll-container>
						<div>
                            ${o(this, a, k).call(this)}
                        </div>
                        <div>
                            <small>
                                Visit the <a href="https://umbracocommunity.store" target="_blank">Umbraco Community Store</a> and get yours today!
                            </small>
                        </div>
					</uui-scroll-container>
				</umb-popover-layout>
			</uui-popover-container>
		`;
};
k = function() {
  const e = o(this, a, c).call(this);
  var t = /* @__PURE__ */ new Date();
  t.setHours(0, 0, 0, 0);
  var n = new Date(e);
  if (n.setHours(0, 0, 0, 0), n.getTime() === t.getTime())
    return o(this, a, T).call(this);
  var s = Date.parse(e), r = /* @__PURE__ */ new Date();
  return isNaN(s) || s <= r.getTime() ? o(this, a, D).call(this) : o(this, a, x).call(this);
};
D = function() {
  return i`<p>There's not an upcoming Umbraco Tees at the moment, check back soon!</p>`;
};
T = function() {
  return i`<p>Today is Umbraco Tees Day!</p>`;
};
x = function() {
  const { weeks: e, days: t, hours: n, minutes: s, seconds: r } = this.formattedTimeLeft, l = new Date(o(this, a, c).call(this)).toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  return i`
            <p>The next Umbraco Tees Day is happening in:</p>
            <p><b>
                ${e > 0 ? i`${e}<span> weeks</span>` : ""}
                ${t > 0 ? i`${t}<span> days, </span>` : ""}
                ${n > 0 ? i`${n}<span> hours, </span>` : ""}
                ${s}<span> minutes, and </span>
                ${r}<span> seconds </span>
            </b></p>
            <p>on ${l}.</p>
        `;
};
p.styles = [f.styles, C`
        uui-popover-container div {
            padding: 1em 16px;
            text-align: center;
        }

        /* Sparkle effect applied when countdown is under two weeks */
        .sparkle::before,
        .sparkle::after {
        content: "";
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(255, 255, 200, 0.9);
        border-radius: 50%;
        box-shadow: 
            0px 0px 8px 2px rgba(255, 255, 200, 0.8),
            2px 2px 4px rgba(255, 255, 150, 0.5);
        animation: sparkle-animation 1.5s infinite ease-in-out alternate;
        }

        .sparkle::before {
        top: 3px;
        left: 6px;
        animation-delay: 0s;
        }

        .sparkle::after {
        bottom: 5px;
        right: 5px;
        animation-delay: 0.75s;
        }

        @keyframes sparkle-animation {
        0% {
            transform: scale(0.8);
            opacity: 0.8;
        }
        50% {
            transform: scale(1.2);
            opacity: 1;
        }
        100% {
            transform: scale(0.6);
            opacity: 0.6;
        }
        }
        `];
u([
  d()
], p.prototype, "_dates", 2);
u([
  d()
], p.prototype, "_timeLeft", 2);
p = u([
  $(O)
], p);
export {
  p as UmbracoTeesHeaderAppElement,
  p as element
};
//# sourceMappingURL=header-app-element-OjKOsvZi.js.map
