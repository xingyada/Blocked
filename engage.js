(function () {
    'use strict';

    function Engager() {
      this.middlewares = [];
      this.events = {}; //改为对象存储，这样同类事件首先要定位到key，然后直接遍历就可以了。
    }

    Engager.prototype.on = function (key, fn) {
      this.events[key] = this.events[key] || [];
      this.events[key].push(fn);
    };

    Engager.prototype.emit = function (key, data) {
      var fns = this.events[key];

      if (!fns || fns.length === 0) {
        return false;
      }

      for (var i = 0, fn; fn = fns[i++];) {
        fn.call(this, data);
      }
    };

    Engager.prototype.use = function (fn) {
      this.middlewares.push(fn);
      return this;
    };

    Engager.prototype.init = function () {
      var protocol = "https:" == location.protocol ? "https://" : "http://";
      var script = document.createElement('script');
      var sid = localStorage.getItem('PTSID');
      script.type = 'text/javascript';
      script.async = false; //尽可能早一些

      script.charset = 'UTF-8'; // script.src = protocol+"pteengagejs.ptengine.jp/c." + sid + '.js?ts='  + (new Date()).getTime() ;

      script.src = protocol + "pteengagejs.ptengine.cn" + "/c." + sid + '.v2.js?ts=' + new Date().getTime();
      document.getElementsByTagName('head')[0].appendChild(script); //内部变量

      window.$$__pt_engage_$ = this;
    };

    Engager.prototype.run = function (setting) {
      if (!setting) return false;
      var self = this; //TODO:同步engage 和 异步 engage 需要区分

      var context = {
        window: window,
        setting: setting,
        engager: self
      };
      var index = 0;

      function next() {
        var handler = self.middlewares[index++];
        if (!handler) return;
        handler(context, next);
      }

      next();
    };

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);

        if (typeof Object.getOwnPropertySymbols === 'function') {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }

        ownKeys.forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      }

      return target;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (typeof call === "object" || typeof call === "function")) {
        return call;
      }

      return _assertThisInitialized(self);
    }

    function _readOnlyError(name) {
      throw new Error("\"" + name + "\" is read-only");
    }

    var URL = ("https:" == location.protocol ? "https://" : "http://") + "collect.ptengine.cn/egg";

    function isPCByPlat() {
      var platForm = navigator.platform.toLowerCase();

      if (platForm.indexOf("win") > -1) {
        return true;
      }

      var listIn = ["mac68k", "macppc", "macintosh", "macintel"];

      for (var i = 0; i < listIn.length; i++) {
        if (platForm == listIn[i]) {
          return true;
        }
      }

      return false;
    }

    function isPCByOSList(uaArg) {
      var pcOS = ["AIX", "Amiga", "BeOS", "DragonFly", "FreeBSD", "GNU", "Haiku", "HP-UX", "IRIX", "Joli", "Java", "Macintosh", "Minix", "MorphOS", "NetBSD", "OpenBSD", "PClinuxOS", "QNX x86pc", "SunOS", "Ubuntu", "Mint", "Red Hat", "Slackware", "SUSE", "PCLinuxOS", "Debian", "Fedora", "CentOS", "Vine", "Arch Linux", "Gentoo", "Kanotix", "Mandriva"];

      for (var i = 0; i < pcOS.length; i++) {
        if (uaArg.indexOf(pcOS[i]) > -1) {
          return true;
        }
      }

      return false;
    }

    function isMobileByOSList(uaArg) {
      var mobilephoneOS = ["Android", "AROS", "Bada", "BlackBerry", "Chromium", "CrOS", "Danger Hiptop", "Inferno", "iPhone", "iPad", "iPod", "Nintendo DS", "Nintendo Wii", "Palm OS", "PLAYSTATION", "Syllable", "SymbOS", "Symbian", "Tizen", "webOS", "WebTV", "Windows CE", "Windows Mobile", "Windows Phone", "Xbox"];

      for (var i = 0; i < mobilephoneOS.length; i++) {
        if (uaArg.indexOf(mobilephoneOS[i]) > -1) {
          return true;
        }
      }

      return false;
    }

    function getScreenWidth() {
      try {
        var tmp = window.screen.width;
        return tmp ? isNaN(parseInt(tmp, 10)) ? 0 : parseInt(tmp, 10) : 0;
      } catch (ex) {
        return 0;
      }
    }
    /**
     * 采集数据上传
     * @param {*} data 
     */


    function collect(data) {
      return createAjax({
        method: 'POST',
        data: encodeURIComponent(JSON.stringify(data)),
        url: URL
      });
    }
    /**
     * 创建ajax
     * @param {ajax配置项} ajaxOptions 
     */

    function createAjax(ajaxOptions) {
      var method = ajaxOptions.method,
          data = ajaxOptions.data,
          url = ajaxOptions.url,
          callback = ajaxOptions.callback;
      method = method || 'GET';
      var xhr = new XMLHttpRequest();

      if ('withCredentials' in xhr) {
        xhr.open(method, url, true);
      } else if (typeof XDomainRequest != 'undefined') {
        xhr = (_readOnlyError("xhr"), new XDomainRequest());
        xhr.open(method, url);
      } else {
        xhr = (_readOnlyError("xhr"), null);
      }

      if (xhr) {
        callback && (xhr.onreadystatechange = function () {
          // 204 no content 忽略
          if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 201)) {
            callback(xhr.responseText);
          }
        });
        xhr.send(data);
      }
    }
    /**
     * cookie 操作
     * @param {*} name  cookie名称
     * @param {*} value cookie 值  当set cookie 操作时，必传
     * @param {*} options 
     */

    function cookie(name, value, options) {
      //读cookie
      if (arguments.length === 1) {
        var arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) return unescape(arr[2]);else return null;
      } //写cookie
      else if (arguments.length > 1) {
          var expires = '';

          if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;

            if (typeof options.expires == 'number') {
              date = new Date();
              date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
            } else {
              date = options.expires;
            }

            expires = '; expires=' + date.toUTCString();
          }

          document.cookie = name + '=' + value + expires + '; path=/;';
        }
    }
    /**
     * 从cookie 中获取值
     * @param {网站id} sid 
     * @param {*} key 
     */

    function getValueFromCookies(sid, key) {
      // uid=neSBbem3Czqe0JfUgjLHTQ&nid=0&vid=25IEGxlwBmBQoT/2l0Co5w&vn=61&pvn=1&sact=1541064689804&to_flag=0&pl=CfX2XACZFVB-9Y-ictwkWg*pt*1541064689804
      try {
        var ptData = cookie('pt_' + sid);
        return ptData.indexOf(key) != -1 ? ptData.split(key + "=")[1].split("&")[0] : "";
      } catch (ex) {
        console.log(ex);
      }
    }
    /**
     * 是否为新访
     */


    function isNewVisit(sid) {
      sid = sid || localStorage.getItem('PTSID');
      return getVisit(sid) == 1;
    }
    function getVid(sid) {
      sid = sid || localStorage.getItem('PTSID');
      return getValueFromCookies(sid, "vid");
    }
    function getUid(sid) {
      sid = sid || localStorage.getItem('PTSID');
      return getValueFromCookies(sid, "uid");
    }
    /**
     * 获取访问次数
     * @param {*} sid 
     */

    function getVisit(sid) {
      sid = sid || localStorage.getItem('PTSID');
      return +getValueFromCookies(sid, "vn");
    }
    /**
     * 取得终端类型  0:不可识别 1:手机 2:PC 3:PC模拟的手机 4:平板
     */

    function getTerminalType() {
      try {
        var ua = navigator.userAgent;

        if (!ua) {
          // 如果ua不存在，直接返回0
          return 0;
        }

        if (isPCByPlat() || isPCByOSList(ua)) {
          // 判断为PC
          if (isMobileByOSList(ua)) {
            // 如果在移动终端列表里的话，则判断为模拟器
            return 3;
          } else {
            if (ua.match(/.*MSIE.*Windows NT 6\.2;.*Touch\).*/)) {
              // 专门针对window surface的UA判断
              return 4;
            } // 否则为真正的pc


            return 2;
          }
        } else {
          // 为移动终端
          if (ua.indexOf("iPad") > -1 || Math.min(getScreenWidth(), window.screen.height) >= 1000) {
            // 如果是apple的平板,或者横竖分辨率最小的值大于等于1000，则判定为平板
            return 4;
          } else {
            // 真正的手机
            return 1;
          }
        }
      } catch (ex) {
        return 0;
      }
    }
    /**
     * 转义包含正则元字符的字符串
     * @param {String} str 被转义的字符串
     */

    function escapeRexCharacters(str) {
      if (typeof str != 'string') return; // 需要被转义的正则元字符

      var metacharacters = ['?', '^', '$', '*', '+', '(', ')', '|'];
      metacharacters.map(function (character) {
        var reg = new RegExp("(\\" + character + ")", "g"); // console.log(str.match(reg));

        str = str.replace(reg, "\\$1"); // console.log(str.replace(reg,"\\$1"));
      });
      return str;
    }
    /**
     * 获取请求参数值
     * @param {*} name 
     */

    function getRequestParameter(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return null;
    }
    function addEventHandler(element, type, eventHandle) {
      if (element.addEventListener) {
        element.addEventListener(type, eventHandle, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + type, eventHandle);
      }
    }
    /**
     * 保存数据
     * @param {*} key 
     * @param {*} value 
     */

    function saveDataToStorage(key, value) {
      if (key) {
        var engager = JSON.parse(localStorage.getItem("engager") || "{}");
        engager[key] = value;
        localStorage.setItem("engager", JSON.stringify(engager));
      }
    }
    function getDataFromStorage(key) {
      var value;

      if (key) {
        var engager = JSON.parse(localStorage.getItem("engager") || "{}");

        if (engager.hasOwnProperty(key)) {
          value = engager[key];
        }
      }

      return value;
    }
    function print(des, value) {
      var isEnable = localStorage.getItem("enableLog") || "false";

      if (isEnable == "true") {
        console.log(des || "", value || "");
      }
    }
    function isOpenInWeixin() {
      return /MicroMessenger/i.test(navigator.userAgent);
    }

    var ProfileTime =
    /*#__PURE__*/
    function () {
      function ProfileTime() {
        _classCallCheck(this, ProfileTime);

        this.timezone = "";
      }

      _createClass(ProfileTime, [{
        key: "setTimeZone",
        value: function setTimeZone(timezone) {
          this.timezone = timezone;
        }
      }, {
        key: "getProfileTimeStamp",
        value: function getProfileTimeStamp() {
          //示例 this.timezone="+03:30";
          var profileTimestamp = 0;

          if (!!this.timezone.trim()) {
            var today = new Date();
            var currentTimezoneOffset = today.getTimezoneOffset() * 60 * 1000 * -1; //换算成毫秒数

            var tempArr = this.timezone.replace(":", " ").split(" ");
            var profileTimezonOffset;

            if (tempArr.length == 2) {
              profileTimezonOffset = Number(tempArr[0].slice(1)) * 60 * 60 * 1000 + Number(tempArr[1]) * 60 * 1000;
              profileTimezonOffset = Number(tempArr[0].slice(0, 1) + profileTimezonOffset);
            }

            var offset = currentTimezoneOffset - profileTimezonOffset; //得到当地时区和档案时区的毫秒数的差值

            profileTimestamp = Date.now() - offset; //用当地时间减去差值得到档案时区的毫秒数
          }

          return profileTimestamp; //毫秒数
        }
      }]);

      return ProfileTime;
    }();

    var PtCache =
    /*#__PURE__*/
    function () {
      function PtCache() {
        _classCallCheck(this, PtCache);

        this.cache = {};
      }

      _createClass(PtCache, [{
        key: "get",
        value: function get(key) {
          return this.cache[key];
        }
      }, {
        key: "set",
        value: function set(key, value) {
          this.cache[key] = value;
        }
      }]);

      return PtCache;
    }();

    var ptCache = new PtCache();
    var profileTime = new ProfileTime();

    var BaseValidator =
    /*#__PURE__*/
    function () {
      function BaseValidator() {
        _classCallCheck(this, BaseValidator);
      }

      _createClass(BaseValidator, [{
        key: "validate",
        value: function validate() {
          throw {
            "name": "ImplementError",
            "message": "validate method should be implement by " + this.constructor.name
          };
        }
      }]);

      return BaseValidator;
    }();

    var AsyncUserProps =
    /*#__PURE__*/
    function (_BaseValidator) {
      _inherits(AsyncUserProps, _BaseValidator);

      function AsyncUserProps() {
        _classCallCheck(this, AsyncUserProps);

        return _possibleConstructorReturn(this, _getPrototypeOf(AsyncUserProps).call(this));
      }

      _createClass(AsyncUserProps, [{
        key: "validate",
        value: function validate(value, condition) {
          switch (condition) {
            case 'Match':
              return value;
          }

          return false;
        }
      }]);

      return AsyncUserProps;
    }(BaseValidator); //validate terminal type 


    var TerminalType =
    /*#__PURE__*/
    function (_BaseValidator2) {
      _inherits(TerminalType, _BaseValidator2);

      function TerminalType() {
        var _this;

        _classCallCheck(this, TerminalType);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(TerminalType).call(this));
        _this.currentTerminalType = getTerminalType();
        return _this;
      }

      _createClass(TerminalType, [{
        key: "validate",
        value: function validate(value, condition) {
          switch (condition) {
            case "==":
              return this.currentTerminalType == value;

            case "!=":
              return this.currentTerminalType != value;
          }

          return false;
        }
      }]);

      return TerminalType;
    }(BaseValidator);

    var VisitType =
    /*#__PURE__*/
    function (_BaseValidator3) {
      _inherits(VisitType, _BaseValidator3);

      function VisitType() {
        _classCallCheck(this, VisitType);

        return _possibleConstructorReturn(this, _getPrototypeOf(VisitType).call(this));
      }

      _createClass(VisitType, [{
        key: "validate",
        value: function validate(value, condition) {
          var ret = isNewVisit() ? "NV" : "RV";

          switch (condition) {
            case "==":
              return ret == value;

            case "!=":
              return ret != value;
          }

          return false;
        }
      }]);

      return VisitType;
    }(BaseValidator);

    var UtmParameter =
    /*#__PURE__*/
    function (_BaseValidator4) {
      _inherits(UtmParameter, _BaseValidator4);

      function UtmParameter(type) {
        var _this2;

        _classCallCheck(this, UtmParameter);

        _this2 = _possibleConstructorReturn(this, _getPrototypeOf(UtmParameter).call(this));
        _this2.type = type;
        return _this2;
      }

      _createClass(UtmParameter, [{
        key: "validate",
        value: function validate(value, condition) {
          //兼容两种写法，如：utmSource umt_source
          var type = this.type;
          var param = getRequestParameter(type) || "";

          if (!param) {
            //如果param为空，先假设参数名为umt_source的情况
            var temp = type.toLowerCase().split("utm");
            type = temp.length > 0 && "utm".concat(temp).replace(",", "_");
            param = getRequestParameter(type) || "";
          }

          switch (condition) {
            case "==":
              return param == value;

            case "!=":
              return param != value;

            case "Rex":
              return new RegExp(value).test(param);

            case "[()]":
              return param.indexOf(value) != -1;

            case "[(":
              return new RegExp("^" + value).test(param);

            case ")]":
              return new RegExp(value + "$").test(param);
          }

          return false;
        }
      }]);

      return UtmParameter;
    }(BaseValidator);

    var EntryPage =
    /*#__PURE__*/
    function (_BaseValidator5) {
      _inherits(EntryPage, _BaseValidator5);

      function EntryPage() {
        _classCallCheck(this, EntryPage);

        return _possibleConstructorReturn(this, _getPrototypeOf(EntryPage).call(this));
      }

      _createClass(EntryPage, [{
        key: "validate",
        value: function validate(value, condition) {
          // condition: "==" //可以设置 == ，!= (不等),[()] 表示 包含 ,[( 头匹配  )] 尾匹配  
          var result;
          var entryPage = document.referrer;

          switch (condition) {
            case "==":
              result = entryPage == value;
              break;

            case "Rex":
              result = new RegExp(value).test(entryPage);
              break;

            case "[()]":
              result = entryPage.indexOf(value) != -1;
              break;

            case "[(":
              result = new RegExp("^" + entryPage).test(value);
              break;

            case ")]":
              result = new RegExp(entryPage + "$").test(value);
              break;

            default:
              result = false;
          }

          return result;
        }
      }]);

      return EntryPage;
    }(BaseValidator);

    var URL$1 =
    /*#__PURE__*/
    function (_BaseValidator6) {
      _inherits(URL, _BaseValidator6);

      function URL() {
        _classCallCheck(this, URL);

        return _possibleConstructorReturn(this, _getPrototypeOf(URL).call(this));
      }

      _createClass(URL, [{
        key: "validate",
        value: function validate(value, condition) {
          var url = location.href;
          var result;

          switch (condition) {
            case "==":
              {
                //解决url带斜杠和不带斜杠不能完全匹配问题
                result = url == value || url.slice(0, -1) == value;
              }
              break;

            case "Rex":
              result = new RegExp(value).test(url);
              break;

            case "[()]":
              result = url.indexOf(value) != -1;
              break;

            case "![()]":
              result = url.indexOf(value) == -1;
              break;

            case "[(":
              result = new RegExp("^" + escapeRexCharacters(value)).test(url);
              break;

            case ")]":
              result = new RegExp(escapeRexCharacters(value) + "$").test(url);
              break;

            default:
              result = false;
          }

          return result;
        }
      }]);

      return URL;
    }(BaseValidator);

    var PageGroup =
    /*#__PURE__*/
    function (_BaseValidator7) {
      _inherits(PageGroup, _BaseValidator7);

      function PageGroup() {
        _classCallCheck(this, PageGroup);

        return _possibleConstructorReturn(this, _getPrototypeOf(PageGroup).call(this));
      }

      _createClass(PageGroup, [{
        key: "validate",
        value: function validate(value, condition) {
          // [{“id”:1474967455324228,“url”:“http://datatest15.ptmind.com/czbtest1/jp_ks/jp_ks19/index.html“,”pattern”:5,“level”:1},
          var result = false;

          try {
            var currentUrl = location.href;

            if (!Array.isArray(condition)) {
              condition = JSON.parse(condition);
            }

            for (var i = 0, j = condition.length; i < j; i++) {
              var c = condition[i],
                  pattern = c.pattern;

              switch (pattern) {
                case 2:
                  //正则
                  result = new RegExp(c.url).test(currentUrl);
                  break;

                case 3:
                  // 头匹配
                  result = new RegExp("^" + c.url).test(currentUrl);
                  break;

                case 4:
                  //尾匹配
                  result = new RegExp(c.url + "$").test(currentUrl);
                  break;

                case 5:
                  //完全匹配
                  result = c.url == currentUrl;
                  break;

                case 8:
                  //包含
                  result = currentUrl.indexOf(c.url) > -1;
                  break;
              }
            }
          } catch (error) {}

          return result;
        }
      }]);

      return PageGroup;
    }(BaseValidator);

    var UserBlur =
    /*#__PURE__*/
    function (_BaseValidator8) {
      _inherits(UserBlur, _BaseValidator8);

      function UserBlur() {
        var _this3;

        _classCallCheck(this, UserBlur);

        _this3 = _possibleConstructorReturn(this, _getPrototypeOf(UserBlur).call(this));
        _this3.currentTerminalType = getTerminalType();
        return _this3;
      }

      _createClass(UserBlur, [{
        key: "validate",
        value: function validate(value, condition) {
          var context = value.context,
              engager = context.engager,
              current = value.current;
          value = value.value;
          var hasEmit = false;

          if (condition == "==" && value) {
            //注册全局 blur 事件，监听doc 失去焦点 事件
            // addEventHandler(document, "click", function () {
            //     // 触发next 事件，render 模块中需要监听 next 事件，并获取current ，根据current 显示
            //     engager.emit("next", context);
            // })
            // 在用户好似离开的时候触发事件
            if (this.currentTerminalType == "2") {
              addEventHandler(document, "mousemove", function (e) {
                if (e.clientY < 12 && !hasEmit && !isOpenInWeixin()) {
                  //weixin not support
                  engager.emit("next", {
                    "context": context,
                    "current": current
                  });
                  hasEmit = true;
                }
              });
            }

            if ((this.currentTerminalType == "1" || this.currentTerminalType == "4") && !isOpenInWeixin()) {
              history.replaceState("beforeunload", null, null);
              history.pushState("back", null, null);
              window.addEventListener && window.addEventListener('popstate', function (e) {
                if (e.state === "beforeunload") {
                  // ag_stopper_req();
                  if (!hasEmit) {
                    hasEmit = true;
                    engager.emit("next", {
                      "context": context,
                      "current": current
                    });
                  }
                }
              });
            }
          }
        }
      }]);

      return UserBlur;
    }(BaseValidator);

    var UserStay =
    /*#__PURE__*/
    function (_BaseValidator9) {
      _inherits(UserStay, _BaseValidator9);

      function UserStay() {
        _classCallCheck(this, UserStay);

        return _possibleConstructorReturn(this, _getPrototypeOf(UserStay).call(this));
      }

      _createClass(UserStay, [{
        key: "validate",
        value: function validate(value, condition) {
          var context = value.context,
              engager = context.engager,
              current = value.current; // currentIndex=value.currentIndex;

          switch (condition) {
            case "==":
              setTimeout(function () {
                engager.emit("next", {
                  "context": context,
                  "current": current
                });
              }, +value.value * 1000);
              break;

            case ">=":
              setTimeout(function () {
                engager.emit("next", {
                  "context": context,
                  "current": current
                });
              }, (+value.value + 1) * 1000);
          }
        }
      }]);

      return UserStay;
    }(BaseValidator);

    var ScrollMatch =
    /*#__PURE__*/
    function (_BaseValidator10) {
      _inherits(ScrollMatch, _BaseValidator10);

      function ScrollMatch() {
        _classCallCheck(this, ScrollMatch);

        return _possibleConstructorReturn(this, _getPrototypeOf(ScrollMatch).call(this));
      }

      _createClass(ScrollMatch, [{
        key: "validate",
        value: function validate(value, condition) {
          // 获取页面实际高度
          var context = value.context,
              current = context.current,
              engager = context.engager,
              value = +value.value.replace("%", "");
          var isEmit = false;
          addEventHandler(document, "scroll", function () {
            setTimeout(function () {
              var pageHeight = parseInt(document.body.scrollHeight, 10);
              var scrollTop = document.documentElement.scrollTop || window.pageYOffset;
              isNaN(scrollTop) && (screenTop = 0);
              var scrollPosition = parseFloat(scrollTop);
              var clientHeight = parseInt(document.documentElement.clientHeight, 10);
              var scrollPercent = (scrollPosition + clientHeight) / pageHeight * 100;
              /**
               * 2%的误差值
               */

              var diff = Math.abs(scrollPercent - value);

              if ((diff <= 2 || scrollPercent >= value) && !isEmit) {
                isEmit = true;
                engager.emit("next", {
                  "context": context,
                  "current": current
                });
              }
            }, 50);
          });
        }
      }]);

      return ScrollMatch;
    }(BaseValidator);

    var SeenTimes =
    /*#__PURE__*/
    function (_BaseValidator11) {
      _inherits(SeenTimes, _BaseValidator11);

      function SeenTimes() {
        _classCallCheck(this, SeenTimes);

        return _possibleConstructorReturn(this, _getPrototypeOf(SeenTimes).call(this));
      }

      _createClass(SeenTimes, [{
        key: "validate",
        value: function validate(value, condition) {
          var v = value.value,
              context = value.context,
              current = context.current; //当前experiment

          switch (condition) {
            case ">":
              // 需要view 包发送后更新显示次数
              var exp = JSON.parse(getDataFromStorage(current.exp_id) || "{}"); // var exp = JSON.parse(localStorage.getItem(current.exp_id) || "{}"); //@fixme 这样会导致localstorage 存储内容过多 待优化
              //    exp:{
              //        seenTimes:0, // 显示次数
              //        hasClicked:1 //是否点击过按钮
              //    }
              //如果 显示次数大于 value 不在显示

              if (+exp.seenTimes >= v) {
                current.goNext = false;
              } else {
                // localStorage.setItem(current.exp_id, ++seenTimes);
                current.goNext = true;
              }

              break;
          }
        }
      }]);

      return SeenTimes;
    }(BaseValidator);

    var ClickButton =
    /*#__PURE__*/
    function (_BaseValidator12) {
      _inherits(ClickButton, _BaseValidator12);

      function ClickButton() {
        _classCallCheck(this, ClickButton);

        return _possibleConstructorReturn(this, _getPrototypeOf(ClickButton).call(this));
      }

      _createClass(ClickButton, [{
        key: "validate",
        value: function validate(value, condition) {
          // 需要再点击按钮后发更新实验是否被点击过
          var context = value.context;
          var v = value.value;
          var current = context.current; //当前experiment

          var exp = JSON.parse(getDataFromStorage(current.exp_id) || "{}"); // JSON.parse(localStorage.getItem(current.exp_id) || "{}");
          // if(exp.hasClicked)

          switch (condition) {
            case "==":
              if (!!exp.hasClicked == v) current.goNext = false;else current.goNext = true;
              break;

            case "!=":
              if (!!exp.hasClicked != v) current.goNext = true;else current.goNext = false;
          }
        }
      }]);

      return ClickButton;
    }(BaseValidator);

    var Dater =
    /*#__PURE__*/
    function (_BaseValidator14) {
      _inherits(Dater, _BaseValidator14);

      function Dater() {
        _classCallCheck(this, Dater);

        return _possibleConstructorReturn(this, _getPrototypeOf(Dater).call(this));
      }

      _createClass(Dater, [{
        key: "validate",
        value: function validate(value, condition) {
          var profileTimeStamp = profileTime.getProfileTimeStamp();
          var Now = !profileTimeStamp ? Date.now() : profileTimeStamp;
          Now = String(Now).slice(0, -3);

          if (!Array.isArray(value)) {
            value = [value];
          }

          var result;

          if (value.length > 0) {
            var startDiff = value[0] ? Now - value[0] : "";
            var endDiff = value[1] ? value[1] - Now : "";
            result = endDiff ? endDiff >= 0 && startDiff >= 0 : startDiff && startDiff >= 0;
          } else {
            result = true;
          }

          return result;
        }
      }]);

      return Dater;
    }(BaseValidator);

    var Week =
    /*#__PURE__*/
    function (_BaseValidator15) {
      _inherits(Week, _BaseValidator15);

      function Week() {
        _classCallCheck(this, Week);

        return _possibleConstructorReturn(this, _getPrototypeOf(Week).call(this));
      }

      _createClass(Week, [{
        key: "validate",
        value: function validate(value, condition) {
          var profileTimeStamp = profileTime.getProfileTimeStamp();
          var Now = !profileTimeStamp ? new Date() : new Date(profileTimeStamp);
          var day = Now.getDay();

          if (!Array.isArray(value)) {
            value = [value];
          }

          var result;

          if (value.length == 0 || value.length == 7) {
            result = true;
          } else {
            //需考虑数据类型问题 暂不清楚数据类型
            result = value.indexOf(day) > -1;
          }

          return result;
        }
      }]);

      return Week;
    }(BaseValidator);

    var Time =
    /*#__PURE__*/
    function (_BaseValidator16) {
      _inherits(Time, _BaseValidator16);

      function Time() {
        _classCallCheck(this, Time);

        return _possibleConstructorReturn(this, _getPrototypeOf(Time).call(this));
      }

      _createClass(Time, [{
        key: "validate",
        value: function validate(value, condition) {
          var profileTimeStamp = profileTime.getProfileTimeStamp();
          var Now = !profileTimeStamp ? new Date() : new Date(profileTimeStamp);
          var hour = Now.getHours();
          hour = hour < 10 ? "0" + hour : hour;
          var minute = Now.getMinutes();
          var nowTime = hour + ":" + minute;

          if (!Array.isArray(value)) {
            value = [value];
          }

          var result = false;

          if (value.length > 0) {
            //Time的value在有值的情况下数组长度一定是2
            var startTime = value[0];
            var endTime = value[1];

            if (nowTime >= startTime && nowTime <= endTime) {
              result = true;
            }
          } else {
            result = true;
          }

          return result;
        }
      }]);

      return Time;
    }(BaseValidator);
    /**
     * 实例工厂
     * @param {*} type 
     */


    function createInstance(type) {
      var instance = ptCache.get(type);

      if (!instance) {
        switch (type) {
          case "TerminalType":
            instance = new TerminalType();
            break;

          case "VisitType":
            instance = new VisitType();
            break;

          case "utmCampaign": //广告参数分开处理

          case "utmSource":
          case "utmMedium":
          case "utmContent":
          case "utmTerm":
            instance = new UtmParameter(type);
            break;

          case "EntryPage":
            instance = new EntryPage();
            break;

          case "URL":
            instance = new URL$1();
            break;

          case "PageGroup":
            instance = new PageGroup();
            break;

          case "UserBlur":
            instance = new UserBlur();
            break;

          case "UserStay":
            instance = new UserStay();
            break;

          case "ScrollMatch":
            instance = new ScrollMatch();
            break;

          case "UtmParameter":
            instance = new UtmParameter();
            break;

          case "ClickButton":
            instance = new ClickButton();
            break;

          case "SeenTimes":
            instance = new SeenTimes();
            break;

          case "Dater":
            instance = new Dater();
            break;

          case "Week":
            instance = new Week();
            break;

          case "Time":
            instance = new Time();
            break;

          case "AsyncUserProps":
            instance = new AsyncUserProps();
            break;
        }

        ptCache.set(type, instance);
      }

      return instance;
    }

    var Validate =
    /*#__PURE__*/
    function () {
      function Validate(value, condition, validator) {
        _classCallCheck(this, Validate);

        this.value = value;
        this.condition = condition;
        this.validator = validator;
      }

      _createClass(Validate, [{
        key: "setValue",
        value: function setValue(value) {
          this.value = value;
        }
      }, {
        key: "setCondition",
        value: function setCondition(condition) {
          this.condition = condition;
        }
      }, {
        key: "setValidator",
        value: function setValidator(validator) {
          this.validator = validator;
        }
      }, {
        key: "run",
        value: function run() {
          var result;

          try {
            return this.validator.validate(this.value, this.condition);
          } catch (error) {
            print(error.name, error.message);
            result = false;
          }

          return result;
        }
      }]);

      return Validate;
    }();

    function createValidationInstance(value, condition, validator) {
      return new Validate(value, condition, validator);
    }

    var LOCALVERSIONKEY = "LOCALVERSION";

    var process = function process(context, configs) {
      print("the value of configs is:", configs);

      if (configs && Array.isArray(configs)) {
        var validate = createValidationInstance();

        for (var i = 0, len = configs.length; i < len; i++) {
          var config = configs[i]; // 对每个config 进行 满足trigger条件的确认

          var audienceResult = config.audienceResult;

          if (!audienceResult) {
            continue;
          } // 应用trigger的哪个实验版本


          var experiments = config.experiments;
          var expRate = experiments.rate || config.rates; //新旧兼容，旧版本在experiments上，新版本在config 中
          // 简单的随机数处理，取 0 到1的随机数
          // expRate = [0.3, 0.7]; //@fixme just for test 
          //

          var localExpRate = getDataFromStorage("EXPRATE_" + config.engageId),
              // localStorage.getItem("EXPRATE_"+config.engageId),
          localVersion = -1;

          if (localExpRate == Array.prototype.join.call(expRate, ',')) {
            // 用户并未更新ab test 比例，应该直接使用缓存版本
            localVersion = +getDataFromStorage(LOCALVERSIONKEY + "_" + config.engageId); // localStorage.getItem(LOCALVERSIONKEY+"_"+config.engageId);
          }

          print("local version", localVersion); // 如果没有缓存版本，则需要重新计算版本

          if (localVersion == -1) {
            var start = 0,
                levels = [];

            for (var i = 0, j = expRate.length; i < j; i++) {
              levels.push({
                min: start,
                max: start + expRate[i]
              });
              start += expRate[i];
            }

            var r = Math.random(); // whichOne = -1;

            for (var i = 0, j = levels.length; i < j; i++) {
              if (r >= levels[i].min && r < levels[i].max) {
                // whichOne = i;
                localVersion = i;
                saveDataToStorage(LOCALVERSIONKEY + "_" + config.engageId, localVersion);
                saveDataToStorage("EXPRATE_" + config.engageId, Array.prototype.join.call(expRate, ',')); // localStorage.setItem(LOCALVERSIONKEY+"_"+config.engageId, localVersion);
                // localStorage.setItem("EXPRATE_"+config.engageId, Array.prototype.join.call(expRate, ','));

                break;
              }
            }

            print(levels);
            print('random number is' + r, "whione = ");
          } //兼容新旧结构


          var currentExperiment = experiments.experiment ? experiments.experiment[localVersion] : experiments[localVersion];

          if (currentExperiment) {
            context.current = currentExperiment;
            context.current.engagerId = config.engageId;
          } // 对每个实验版本 进行显示与否的 判断


          var current = context.current;
          current.when = current.config.when; //新旧版本兼容

          var when = current.when;

          if (!Array.isArray(when)) {
            when = [when];
          }

          var when_result = false;
          var isExclude = false; // exclude need a special handler

          if (when[0] && when[0].type == 'URL' && when[0].condition == '![()]') {
            isExclude = true;
            when_result = true;
          }

          for (var w_i = 0, w_j = when.length; w_i < w_j; w_i++) {
            var displayAt = when[w_i];

            if (displayAt.type) {
              validate.setValue(displayAt.value);
              validate.setCondition(displayAt.condition);
              validate.setValidator(createInstance(displayAt.type));

              if (isExclude) {
                when_result = when_result && validate.run();
              } else {
                when_result = when_result || validate.run();
              }

              print("current context ", context.current);
              print("validate value", validate);

              if (isExclude && !when_result) {
                break;
              }

              if (!isExclude && when_result) {
                break;
              }
            }
          }

          print("the result of validation", when_result);

          if (!when_result) {
            continue;
          }

          print("ready to validate the stopToDisplay condition", current); ///  // 如何停止 兼容新旧

          current.stopToDisplay = current.stopToDisplay || current.config.stop;

          if (current.stopToDisplay && current.stopToDisplay.length > 0) {
            var stopToDisplayList = current.stopToDisplay;

            for (var st_i = 0, st_j = stopToDisplayList.length; st_i < st_j; st_i++) {
              var stItem = stopToDisplayList[st_i];
              validate.setValue({
                value: stItem.value,
                // currentIndex:i,
                current: context.current,
                // engager: context.engager,
                context: context
              });
              validate.setCondition(stItem.condition);
              validate.setValidator(createInstance(stItem.type));
              validate.run(); //

              if (!context.current.goNext) {
                //只要满足一个停止条件则停止渲染
                print("satisfied with stopToDisplay condition,stop to render engage");
                break;
              }
            }
          } else {
            context.current.goNext = true;
          }

          print("validate displayTime condition", current); //判断是否满足时间段

          var isMeetTime = true;
          current.displayTime = current.displayTime || current.config.schedule;
          current.timezone = current.timezone || current.config.timezone;

          if (current.displayTime && current.displayTime.length > 0) {
            var displayTime = current.displayTime;
            var timezone = current.timezone || {};
            profileTime.setTimeZone(""); //useVisitor为false 按档案时间判断

            !timezone.useVisitor && profileTime.setTimeZone(timezone.profile || "");

            if (!Array.isArray(displayTime)) {
              displayTime = [displayTime];
            }

            for (var t_i = 0; t_i < displayTime.length; t_i++) {
              var tItem = displayTime[t_i];
              validate.setValue(tItem.value);
              validate.setValidator(createInstance(tItem.type));
              print("the result of dispalyTime validation", validate.run());

              if (!validate.run()) {
                isMeetTime = false;
                print("not satisfied with dispalyTime condition", validate);
                break;
              }
            }
          }

          print("validate startToDisplay condition", current); //如果不需要满足任何条件，并且不满足停止条件，应该直接显示即可

          if (isMeetTime && context.current.goNext) {
            // 在trigger 阶段的这个时期，必然会显示 engager组件，这里只是显示时机
            current.startToDisplay = current.startToDisplay || current.config.start;

            if (current.startToDisplay && current.startToDisplay.length > 0) {
              var startToDisplayList = current.startToDisplay;

              if (!Array.isArray(startToDisplayList)) {
                startToDisplayList = [startToDisplayList];
              }

              for (var s_i = 0, s_j = startToDisplayList.length; s_i < s_j; s_i++) {
                var sItem = startToDisplayList[s_i];
                validate.setValue({
                  value: sItem.value,
                  // currentIndex:i,
                  current: context.current,
                  context: context
                });
                validate.setCondition(sItem.condition);
                validate.setValidator(createInstance(sItem.type));
                validate.run(); // start 状态直接调用即可 并不关注返回值（或者返回值必然为true）

                print("delay to enter the render staged...");
              }
            } else {
              print("enter the render staged immediate...");
              context.engager.emit("next", context);
            } // next();

          }
        }
      }
    };

    var findBy = function findBy(id, arr) {
      var ret = Array.prototype.filter.call(arr, function (t) {
        return t.id == id;
      });

      if (ret && ret.length > 0) {
        return ret[0];
      }

      return null;
    };

    var processAudienceSegment = function processAudienceSegment(configs, jsons) {
      /**
       * 遍历configs
       */
      for (var index in configs) {
        var config = configs[index];
        if (!config) break;
        var result = findBy(config.engageId, jsons);
        print('result = ', result);
        if (!result) continue;
        var audienceResult = result.audienceResult; //附加属性audienceResult 到 config 中

        config.audienceResult = audienceResult;
      }

      print('async configs', configs);
      return configs;
    };
    /**
     * 处理异步engage
     * @param {*} context 
     * @param {*} configs 
     * @param {*} callback 
     */


    var processAsync = function processAsync(context, configs, _callback) {
      var sid = context.setting.sid;
      var protocol = "https:" == location.protocol ? "https://" : "http://";

      if (sid) {
        var uid = getUid(sid),
            vid = getVid(sid);
        createAjax({
          url: "".concat(protocol, "engagematch.ptengine.cn/match"),
          method: 'POST',
          data: JSON.stringify({
            uid: uid,
            sid: sid,
            vid: vid
          }),
          callback: function callback(res) {
            //console.log(res);
            try {
              var json = JSON.parse(res);

              if (json.status && json.status == 'Success') {
                var ret = processAudienceSegment(configs, json.result);
                _callback && _callback(ret);
              }
            } catch (ex) {
              print(ex);
            }
          }
        });
      }
    };

    function trigger(context) {
      if (!window.localStorage) {
        print("not support to use localstorage");
        return;
      }

      print("ready to enter triger staged", context); // 一个档案可以包含多个engager 所以configs 对象格式应为数组

      localStorage.setItem("PTSID", context.setting.sid);
      var configs = (context.setting || {}).configs || []; // let asyncConfigs = [],
      //     syncConfigs = [];
      // // 分离同步配置和异步配置
      // for (let i = 0, j = configs.length; i < j; i++) {
      //     let c = configs[i];
      //     if(c.async==1){
      //         asyncConfigs.push(c)
      //     }
      //     else{
      //         syncConfigs.push(c);
      //     } 
      // }
      // // 处理同步engage
      // process(context, syncConfigs);
      // //处理异步engage
      // asyncConfigs.length > 0 && processAsync(context, asyncConfigs, (cfgs) => process(context, cfgs));

      processAsync(context, configs, function (cfgs) {
        return process(context, cfgs);
      });
    }

    //发包模块，包括初始化模块
    function sender(context, next) {
      print("running sender module");
      print("mounted the send to context，send to collect package");
      /**
       * send 方法  
       * params {type} 包的类型
       * desc : type的取值 为 view 和 click 
       */

      context.send = function (type, obj) {
        // console.log("view package send");
        // 1、5 个id
        // 2、engagerid
        // 3、engager_ver_id
        // 4、type :[click/view]
        // 5、variant object
        // 6、trigger_condition  (用户条件，行为条件)
        var sid = obj.sid,
            // context.current 需要在render 阶段设置
        engagerId = obj.engagerId,
            engagerVerId = obj.engagerVerId,
            variant = obj.variant || {},
            triggerCondition = obj.triggerCondition; //如果是是 view事件，则trigger 模块会设置

        if (type == "click") {
          triggerCondition = "click"; //如果是click 事件，那么触发条件为click
        } //TODO:采集中对下面的记录并没有存储localstorage 需要存储之后下面代码才可用，不存储到cookie 中的原因在于，
        //会增加客户端的cookie大小并且第一方cookie会影响用户网络cookie包的大小


        var ptIds = localStorage.getItem("PT_ID_" + sid);

        if (ptIds) {
          var idArr = ptIds.split('.'),
              sid = idArr[0],
              //访客id	
          uid = idArr[1],
              //访客id	
          vid = idArr[2],
              //访次id	
          pid = idArr[3],
              //页面id	
          peid = idArr[4]; //页面访问id	

          collect({
            "sid": sid,
            "uid": uid,
            "vid": vid,
            "pid": pid,
            "peid": peid,
            "ts": new Date().getTime(),
            "engagerId": engagerId,
            "engagerVerId": engagerVerId,
            "triggerCondition": triggerCondition,
            "engagerType": type,
            "variant": variant //自定义变量

          });
        }
      };

      print("init sender finished,ready to enter trigger staged...");
      next();
    }

    var POSITION = "position"; //engager 渲染位置

    var CENTERPOSITION = "pos-center";
    var CONTAINERID = "ptEngage"; //engage容器id

    var MASKLAYERPPREFIX = 'pt_mask_';
    var MAXZINDEXINENGAGE = 2147483647;
    var EngageActions = {
      URLOPEN: 'button-url',
      TELCALL: 'button-tel',
      BUTTONCLOSE: 'button-close',
      ICONCLOSE: 'icon-close'
    };
    var terminalType = getTerminalType();
    var count = 1;

    var subscribeClickEvent = function subscribeClickEvent(delegateNode, context, onSuccess) {
      var current = context.current;
      addEventHandler(delegateNode, "click", function (e) {
        e = e || window.event;
        var currentNode = e.target || e.srcElement; // console.log(currentNode);

        var interactiveNodeSelector = ['data-engage-action-click', 'data-engage-action-close'];
        var isInteractiveNode = false,
            linkType = ''; //查找交互元素

        do {
          // button-url   button-tel  button-close icon-close
          linkType = currentNode.getAttribute('data-engage-block'); //1 link ,2 call, 3 close

          isInteractiveNode = function () {
            for (var i = 0, j = interactiveNodeSelector.length; i < j; i++) {
              if (currentNode.getAttribute(interactiveNodeSelector[i])) {
                return true;
              }
            }
          }();

          !isInteractiveNode && (currentNode = currentNode.parentNode);
        } while (!isInteractiveNode && currentNode != delegateNode);

        if (isInteractiveNode) {
          //交互模式的code 由程序控制，非交互模式由浏览器默认行为控制即可
          e.preventDefault();
          var currentTagName = currentNode.tagName.toUpperCase();
          var target = currentNode.textContent || currentTagName || 'unknow target';

          if (currentNode.parentNode && currentNode.parentNode.getAttribute('data-engage-block') == 'image') {
            var childNode = currentNode.querySelector('img');

            if (childNode) {
              target = childNode.getAttribute('alt');
            }
          } // close 操作 和 click操作


          if (linkType && (linkType == EngageActions.ICONCLOSE || linkType == EngageActions.BUTTONCLOSE)) {
            //移除engage dom 结构
            getEngageContainerWrapper().removeChild(delegateNode); //尝试移除蒙层

            current.shouldCreateMaskLayer && tryRemoveMaskLayer(current.engagerId);

            if (linkType == EngageActions.BUTTONCLOSE) {
              //button which action is close
              sendPackage(context, current, 'click', target);
              onSuccess && typeof onSuccess == 'function' && onSuccess(current.exp_id);
            } else {
              sendPackage(context, current, 'close', target);
            }

            return;
          } else {
            sendPackage(context, current, 'click', target);
          } //存在href 并且 值不为javascript:;、# 、javascript:void(0) 等内容


          if (currentNode.href && !/#|^javascript:(void\(0\))?;?$/.test(currentNode.href)) {
            if (currentNode.target == '_blank') {
              try {
                window.open(currentNode.href, '_blank');
              } catch (error) {
                print("not support to use window.open", error);
              }
            } else {
              window.location.href = currentNode.href;
            }
          }

          onSuccess && typeof onSuccess == 'function' && onSuccess(current.exp_id);
        }
      });
    };

    var renderNodesForNewEditor = function renderNodesForNewEditor(context, callback) {
      var codeMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var current = context.current;
      var widgetNodes = codeMode ? current.currentTerminal.codeSync : current.currentTerminal.visualModel.widgetNodes;
      var engageWrap = createEngageWrap(getEngageWrapperId(current.engagerId));
      engageWrap.innerHTML = processAndPureHtml(widgetNodes);
      var container = getEngageContainerWrapper();
      container.appendChild(engageWrap);
      codeMode && applyInlineScript(engageWrap);
      var currentTerminal = current.currentTerminal; //中间位置渲染的engage 需要创建遮罩层

      if (currentTerminal) {
        var widgetSettings = currentTerminal.visualModel.widgetSettings;

        if (widgetSettings && widgetSettings.position == CENTERPOSITION) {
          tryCreateMaskLayer(current.engagerId);
          context.current.shouldCreateMaskLayer = true;
        }

        var domBranding = engageWrap.querySelector('[data-engage-block="branding"]');

        if (domBranding) {
          var href = (domBranding.href || '').replace(/(utm_source=)Customer-Site/, '$1' + location.hostname);
          domBranding.setAttribute('href', href);
        }
      }

      subscribeClickEvent(engageWrap, context, function (exp_id) {
        return updateLocalCache(exp_id, 'hasClicked');
      });
      count = 1;
      var imgs = engageWrap.querySelectorAll("img");
      Array.prototype.slice.call(imgs).forEach(function (img) {
        addEventHandler(img, 'load', function () {
          img.style.opacity = "1";
          img.style.visibility = "visible";
        });
      }); //渲染dom 完成之后 发送 view 包

      callback && typeof callback === "function" && callback();
    };
    /**
     * 渲染非code模式dom结构
     * @param {*} context 
     * @param {*} callback 
     */


    function renderNormalNodes(context, callback) {
      var current = context.current;
      var node = current.currentTerminal.nodes;
      var engageWrap = createEngageWrap(getEngageWrapperId(current.engagerId));
      var container = getEngageContainerWrapper();
      var engageDomContent = createElement(node);
      engageWrap.appendChild(engageDomContent);
      container.appendChild(engageWrap); //

      var currentTerminal = current.currentTerminal; //中间位置渲染的engage 需要创建遮罩层

      if (currentTerminal) {
        if (currentTerminal.commonSync.position == CENTERPOSITION) {
          tryCreateMaskLayer(current.engagerId);
          context.current.shouldCreateMaskLayer = true;
        } //branding 处理，如果通过权限控制 修改了branding node结构中并未发生变化


        var domBranding = engageWrap.querySelector('.js-engage-promotion-branding,.engage-promotion__friendLink,.engage-friendLink');

        if (domBranding) {
          if (currentTerminal.commonSync.branding) {
            domBranding.style.display = 'block';
            var href = (domBranding.href || '').replace(/(utm_source=)Customer-Site/, '$1' + location.hostname);
            domBranding.setAttribute('href', href);
          } else {
            domBranding.style.display = 'none';
          }
        }
      }

      delegateEventRegister(engageWrap, context, function (exp_id) {
        return updateLocalCache(exp_id, 'hasClicked');
      });
      count = 1;
      var imgs = engageWrap.querySelectorAll("img");
      Array.prototype.slice.call(imgs).forEach(function (img) {
        addEventHandler(img, 'load', function () {
          img.style.opacity = "1";
          img.style.visibility = "visible";
        });
      }); //渲染dom 完成之后 发送 view 包

      callback && typeof callback === "function" && callback();
    }
    /**
     * 虚拟node结构转为dom结构
     * @param {*} nodes 
     */


    function createElement(nodes) {
      if (typeof nodes === "string" || typeof nodes === "number") {
        if (nodes.indexOf('<') != -1 && /<?\/[a-z]*>/.test(nodes)) {
          var tmp = document.createElement('div');
          tmp.innerHTML = nodes;
          return tmp;
        }

        return document.createTextNode(nodes);
      }

      var element;
      var props;

      if (count == 1 && nodes.tag == "a") {
        //保证所有engage最外层的父节点为div。为了兼容旧engage的父节点tag为a。移除href属性
        element = document.createElement("div"); //根元素

        props = nodes.props;

        if (props.hasOwnProperty("href")) {
          delete props.href;
        }
      } else {
        element = document.createElement(nodes.tag); //子元素

        props = nodes.props;
      }

      count++;
      setProps(element, props);
      var children = nodes.children;
      children && children.map(createElement).forEach(element.appendChild.bind(element));
      return element;
    }

    function setProps(element, attributes) {
      for (var key in attributes) {
        element.setAttribute(key, attributes[key]);
      }
    }
    /**
     * 真正渲染前的准备工作
     * @param {*} data 
     */


    function readyToRender(data) {
      print("running render dom...");
      var context = data.context || data;
      context.current = data.current;
      var current = context.current;
      /**
       * 新旧版本兼容 根据terminnal确定defaultOptions
       */

      var terminalConfig = current.terminal && getTerminalByType(terminalType, current.terminal);
      var defaultOptions = current.defaultOptions || terminalConfig;

      if (terminalConfig) {
        current.currentTerminal = terminalConfig; //如果terminal 属于非激活状态，则直接return

        if (!terminalConfig.status) {
          return;
        }
      }

      var onRenderSuccess = function onRenderSuccess(context, current) {
        return function () {
          ptCache.set(current.exp_id, current.exp_id);
          sendPackage(context, current, 'view');
          updateLocalCache(current.exp_id);
        };
      };

      try {
        var visualModel = current.currentTerminal.visualModel;

        if (visualModel && visualModel.widgetSettings) {
          //new editor setting
          if (current.currentTerminal.codeMode) {
            if (!ptCache.get(current.exp_id)) {
              var html = current.currentTerminal.codeSync.html;

              if (html && /data-engage-block/i.test(html)) {
                renderNodesForNewEditor(context, onRenderSuccess(context, current), true);
              } else {
                renderCodeNodes(context, onRenderSuccess(context, current));
              }
            }
          } else {
            if (isRenderCurrentEngage(visualModel.widgetSettings.position)) {
              if (!ptCache.get(current.exp_id)) {
                renderNodesForNewEditor(context, onRenderSuccess(context, current));
              }
            }
          }
        } else {
          //history setting
          if (current.currentTerminal.codeMode) {
            if (!ptCache.get(current.exp_id)) {
              renderCodeNodes(context, onRenderSuccess(context, current));
            }
          } else {
            if (isRenderCurrentEngage(defaultOptions.position || defaultOptions.commonSync.position)) {
              //当前engage是否已经渲染了
              if (!ptCache.get(current.exp_id)) {
                //调用渲染dom的方法，渲染完成后执行回调
                renderNormalNodes(context, onRenderSuccess(context, current));
              }
            }
          }
        }
      } catch (ex) {
        console.log(ex);
      }
    }
    /**
     * 更新本地缓存信息
     * @param {*} localId 
     */


    function updateLocalCache(localId) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'seenTimes';
      var expInfo = getDataFromStorage(localId);

      if (expInfo == null) {
        expInfo = {
          seenTimes: 1,
          // 显示次数
          hasClicked: 0 //是否点击过按钮

        };
      } else {
        expInfo = JSON.parse(expInfo);
        expInfo[key] = Number(expInfo[key]) + 1;
      }

      saveDataToStorage(localId, JSON.stringify(expInfo));
    }
    /**
     * 发送包
     * @param {*} context 
     * @param {*} type 
     */


    function sendPackage(context, current) {
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'view';
      var target = arguments.length > 3 ? arguments[3] : undefined;
      var sid = context.setting.sid,
          engagerId = current.engagerId,
          engagerVerId = current.exp_id,
          variant = current.variant || {},
          triggerCondition = current.triggerCondition;

      if (target) {
        variant = _objectSpread({}, variant, {
          target: target
        });
      }

      context.send(type, {
        sid: sid,
        engagerId: engagerId,
        engagerVerId: engagerVerId,
        variant: variant,
        triggerCondition: triggerCondition
      });
    }
    /**
     * 应用脚本到wrapper 容器中
     * @param {*} wrapper 
     */


    function applyInlineScript(wrapper) {
      var scripts = Array.prototype.slice.call(wrapper.querySelectorAll('script'));
      scripts.forEach(function (script) {
        var scriptTag = document.createElement('script');
        var scriptContentWrapper = "\n                try {\n                    (function(){".concat(script.innerHTML, "})();\n                } catch (error) {\n                    console.warn(error);\n                }");
        scriptTag.innerHTML = scriptContentWrapper;
        var htmlHead = document.getElementsByTagName('head')[0];
        htmlHead.appendChild(scriptTag);
        htmlHead.removeChild(scriptTag);
      });
    }
    /**
     * 渲染code模式
     * @param {*} context 
     * @param {*} callback 
     */


    function renderCodeNodes(context, callback) {
      var current = context.current;
      var engageWrap = createEngageWrap(getEngageWrapperId(current.engagerId));
      var container = getEngageContainerWrapper();
      engageWrap.innerHTML = processAndPureHtml(current.currentTerminal.codeSync);
      container.appendChild(engageWrap); //应用html 中的script

      applyInlineScript(engageWrap); //是否需要创建遮罩层

      var shouldCreateMaskLayer = !!engageWrap.querySelector('[data-pt-showmask]');
      context.current.shouldCreateMaskLayer = shouldCreateMaskLayer;

      if (shouldCreateMaskLayer) {
        tryCreateMaskLayer(current.engagerId); //创建遮罩层之后需要提高 内容的 z-index
        //存在内置的class 则内置元素设置 z-index

        var builtInEl = engageWrap.querySelector('.engage-promo__v-common');

        if (builtInEl) {
          builtInEl.style.zIndex = MAXZINDEXINENGAGE; //
        } else {
          var innerWrapper = engageWrap.querySelector('[data-pt-engage-id]');

          if (innerWrapper) {
            innerWrapper.style.zIndex = MAXZINDEXINENGAGE;
          }
        }
      } //注册delegate 事件


      delegateEventRegister(engageWrap, context, function (exp_id) {
        return updateLocalCache(exp_id, 'hasClicked');
      });
      callback && typeof callback == 'function' && callback();
    }
    /**
     * 代理事件注册
     * @param {*} delegateNode 
     * @param {*} context 
     * @param {*} onSuccess 
     */


    function delegateEventRegister(delegateNode, context, onSuccess) {
      var current = context.current;
      addEventHandler(delegateNode, "click", function (e) {
        e = e || window.event;
        var currentNode = e.target || e.srcElement; // console.log(currentNode);

        var interactiveNodeClass = ['js-engage-interaction', 'js-engage-close', 'js-engage-promotion-close', 'js-engage-promotion-button', 'js-engage-promotion-image', 'js-engage-promotion-a'];
        var isInteractiveNode = false,
            isNoAction = false,
            linkType = '',
            classNames = [],
            dataAction; //兼容历史数据 
        //查找交互元素

        do {
          dataAction = JSON.parse(currentNode.getAttribute('data-pt-action') || "{}");
          /**
           * 旧版的status为boolean类型 新版的status为string类型
           * 旧版的type为number类型 新版的type为string类型
           * 
          */

          isNoAction = (currentNode.getAttribute('data-pt-status') || String(dataAction['status'])) === 'false';
          linkType = currentNode.getAttribute('data-pt-type') || String(dataAction['type']); //1 link ,2 call, 3 close

          classNames = currentNode.className || currentNode.classList.value;

          isInteractiveNode = function () {
            for (var i = 0, j = interactiveNodeClass.length; i < j; i++) {
              if (classNames.indexOf(interactiveNodeClass[i]) !== -1) {
                return true;
              }
            }
          }();

          !isInteractiveNode && (currentNode = currentNode.parentNode);
        } while (!isInteractiveNode && currentNode != delegateNode);

        if (isNoAction) {
          e.preventDefault();
          return;
        } //可以指定为1个


        if (isInteractiveNode) {
          //交互模式的code 由程序控制，非交互模式由浏览器默认行为控制即可
          e.preventDefault(); // close 操作 和 click操作

          var currentTagName = currentNode.tagName.toUpperCase();
          var target = currentNode.textContent || currentTagName || 'unknow target';

          if (currentNode.parentNode && currentNode.parentNode.getAttribute('data-engage-block') == 'image') {
            var childNode = currentNode.querySelector('img');

            if (childNode) {
              target = childNode.getAttribute('alt');
            }
          }

          if (linkType === '3' || classNames.indexOf('js-engage-close') != -1 || classNames.indexOf('js-engage-promotion-close') != -1) {
            //移除engage dom 结构
            getEngageContainerWrapper().removeChild(delegateNode); //尝试移除蒙层

            current.shouldCreateMaskLayer && tryRemoveMaskLayer(current.engagerId);

            if (linkType === "3") {
              //button which action is close
              sendPackage(context, current, 'click', target);
              onSuccess && typeof onSuccess == 'function' && onSuccess(current.exp_id);
            } else {
              sendPackage(context, current, 'close', target);
            }

            return;
          } else {
            sendPackage(context, current, 'click', target);
          } //存在href 并且 值不为javascript:;、# 、javascript:void(0) 等内容


          if (currentNode.href && !/#|^javascript:(void\(0\))?;?$/.test(currentNode.href)) {
            if (currentNode.target == '_blank') {
              try {
                window.open(currentNode.href, '_blank');
              } catch (error) {
                print("not support to use window.open", error);
              }
            } else {
              window.location.href = currentNode.href;
            }
          }

          onSuccess && typeof onSuccess == 'function' && onSuccess(current.exp_id);
        }
      });
    }
    /**
     * 存在即清除
     */


    function clearIfHasRendered() {
      var div = document.getElementById(CONTAINERID);

      if (!!div) {
        document.body.removeChild(div);
      }
    }
    /**
     * 获取terminal
     * @param {*} type 
     * @param {*} tmls 
     */


    function getTerminalByType(type, tmls) {
      for (var i = 0, j = tmls.length; i < j; i++) {
        if (tmls[i].type == type) {
          return tmls[i];
        }
      }

      return tmls[0]; //默认返回第一个
    }

    function render(context) {
      print("running render module");
      print(context);
      print("render finished,all over");
      readyToRender(context);
    } //判断是否需要渲染当前的engage


    function isRenderCurrentEngage(currentPosition) {
      /**
       * 所有渲染过的engage位置都缓存在内存。
       *  移动端的engage只能渲染在中间位置。(@deprecated) 
       * pc段的engage有左右中间三个位置渲染。
       */
      var renderedPosition = ptCache.get(POSITION) || [];
      var result;

      if (terminalType == 1) {
        //移动端 所有engager都在中间位置渲染 只要渲染一个后其他不渲染。
        result = !renderedPosition.length;
      } else {
        //其他则都认为是pc
        result = !(renderedPosition.indexOf(currentPosition) > -1);
      }

      if (result) {
        /**
         * result=true，说明可以渲染当前的engage，所以要保存当前enagge渲染的位置
         */
        renderedPosition[renderedPosition.length] = currentPosition;
        ptCache.set(POSITION, renderedPosition);
      }

      return result;
    }
    /**
     * code mode
     */


    function processAndPureHtml(code) {
      /**
       * 添加样式
       */
      var css = code.css,
          html = code.html;
      applyCss(css); //返回html结构

      return html;

      function applyCss(cssText) {
        var style = document.createElement('style');
        style.type = "text/css";
        style.appendChild(document.createTextNode(cssText));
        document.getElementsByTagName('head')[0].appendChild(style);
      }
    }
    /**
     * 所有engage的容器
     */


    function getEngageContainerWrapper() {
      var container = document.getElementById(CONTAINERID);

      if (!container) {
        container = document.createElement("div");
        container.setAttribute("id", CONTAINERID);
        document.body.appendChild(container);
      }

      return container;
    }
    /**
     * 给每一个engage包一层div
     * @param {*} id 
     */


    function createEngageWrap(id) {
      var container = document.getElementById(id);

      if (!container) {
        container = document.createElement("div");
        container.setAttribute("id", id);
      }

      return container;
    }

    function getEngageWrapperId(engageWrapperID) {
      return "engage_" + engageWrapperID;
    }
    /**
     * 尝试创建遮罩层
     * @param {*} id 
     */


    function tryCreateMaskLayer(id) {
      var layer = document.querySelector('.engage-layer');

      if (!layer) {
        layer = document.createElement("div");
        layer.classList.add('engage-layer');
      }

      var willCreateClassName = "".concat(MASKLAYERPPREFIX).concat(id); //固定遮罩层，避免页面滚动。

      document.getElementsByTagName("html")[0].classList.add("engage-layer-open", willCreateClassName);
      var body = document.body;
      body.classList.add("engage-layer-open", willCreateClassName);
      body.appendChild(layer);
    }
    /**
     * 尝试删除遮罩层
     * @param {*} id 
     */


    function tryRemoveMaskLayer(id) {
      // var layers = document.querySelectorAll(".engage-layer");
      var layer = document.querySelector('.engage-layer');

      if (layer) {
        //如果body class中只包含 engage-layer-open 和 id创建的class ，那么remove掉
        var tryRemoveClassName = "".concat(MASKLAYERPPREFIX).concat(id);
        var minClasses = ['engage-layer-open', tryRemoveClassName];
        var htmlTag = document.getElementsByTagName("html")[0];
        var bodyTag = document.body;
        var classList = Array.prototype.slice.call(document.body.classList).filter(function (item) {
          return item == "engage-layer-open" || /^pt_mask_/.test(item);
        });

        if (classList.reverse().join('') == minClasses.reverse().join('')) {
          bodyTag.removeChild(layer);
          minClasses.forEach(function (cls) {
            htmlTag.classList.remove(cls);
            bodyTag.classList.remove(cls);
          });
        } else {
          //如果还有其它需要保持遮罩层的engage存在，则只是干掉try to remove 的id
          htmlTag.classList.remove(tryRemoveClassName);
          bodyTag.classList.remove(tryRemoveClassName);
        }
      }
    }

    var render$1 = {
      init: function init(engager) {
        /**
         * 每次渲染前，都会清除engage的dom。以防止不该渲染的页面出现engage
         */
        clearIfHasRendered();
        engager.on("next", function (current) {
          // 延迟加载的实验版本会通过事件的方式传递过来
          print("call render...");
          render(current);
        });
      }
    };

    // 用来添加css
    var ENGAGERLINKID = "__pt__engager__common__style";
    var prerender = {
      init: function init(engager) {
        engager.on("next", function () {
          // 
          var style = document.getElementById(ENGAGERLINKID);

          if (!style) {
            var link = document.createElement('link');
            link.rel = "stylesheet";
            link.type = "text/css";
            link.id = ENGAGERLINKID;
            link.href = ("https:" == location.protocol ? "https://" : "http://") + "pteengagecss.ptengine.cn/styles/engager.css";
            document.getElementsByTagName('head')[0].appendChild(link);
          }

          addStyle(); //在css加载回来之前默认隐藏。

          function addStyle() {
            var style = document.createElement('style');
            style.type = "text/css";
            style.appendChild(document.createTextNode(".engage-promotion-wrap{display:none}"));
            document.getElementsByTagName('head')[0].appendChild(style);
          }
        });
      }
    };

    function PtEvent(type, data) {
      window.CustomEvent = window.CustomEvent || function () {
        function CustomEvent(event, params) {
          params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
          };
          var evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        }

        CustomEvent.prototype = window.Event.prototype;
        return CustomEvent;
      }();

      try {
        return new window.CustomEvent(type, data);
      } catch (ex) {
        return null;
      }
    }

    function fireReadyevent(context, next) {
      try {
        var event = new PtEvent('ptEngageReady', {
          bubbles: false,
          cancelable: false,
          detail: {//TODO 自定义数据
          }
        });

        if (event) {
          if (document.dispatchEvent && typeof document.dispatchEvent === 'function') {
            document.dispatchEvent(event);
          } else if (document.fireEvent && typeof document.fireEvent === 'function') {
            // Uses the non-standard name: fireEvent
            //Older versions of IE supported an equivalent, proprietary EventTarget.fireEvent() method.
            document.fireEvent(event);
          }

          window.ptEngage = context.engage;
        }
      } catch (ex) {
        console.log('catch phase invoke !');
      }

      next();
    }

    var engager = new Engager(); //支持用户监听自定义事件ptEngageReady
    //需要用户把自定义事件设置到engageReady 事件中
    //eg: 如果熟悉jquery，类似使用 $(document).ready(callback)

    /*
    document.addEventListener("ptEngageReady",function(){
        //获取engage并监听engage 的next事件
        window.ptEngage.on('next',current=>{
            //此时可以执行渲染逻辑
        })
    })
    */

    engager.use(fireReadyevent).use(sender).use(trigger);
    prerender.init(engager);
    render$1.init(engager);
    engager.init();

}());
//# sourceMappingURL=http://localhost:8080/dest/bundle.js.map