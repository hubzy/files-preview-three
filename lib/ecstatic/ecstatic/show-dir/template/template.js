

    function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
      }
  
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
  
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }
  
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
  
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }
  
        return arr2;
      }
  
      function _iterableToArrayLimit(arr, i) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  
        if (_i == null) return;
        var _arr = [];
        var _n = true;
        var _d = false;
  
        var _s, _e;
  
        try {
          for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
  
            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }
  
        return _arr;
      }
  
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
      }
  
    //   var treeData = '{{treeData}}';
  
      (function () {
        var weeks_ch = ["日", "一", "二", "三", "四", "五", "六"];
        var dateType = "yyyy|y|mm|m|dd|d|hh|h|ii|i|ss|s";
        var imgExt = ['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp', 'bmp', 'tif', 'svga'];
        var modeExt = ['glb', 'gltf']
        var beforeTime = [{
          time: 31536000000,
          format: 'YYYY年MM月DD日 更新',
          useDiffTime: false
        }, {
          time: 259200000,
          format: 'MM月DD日 更新',
          useDiffTime: false
        }, {
          time: 86400000,
          format: 'D天前 更新',
          useDiffTime: 'day'
        }, {
          time: 0,
          format: 'h小时前 更新',
          useDiffTime: 'hours'
        }];
        var app = new Vue({
          el: '#app',
          data: {
            project: [],
            folder: [],
            imageObj: [],
            path: [],
            otherFiles: [],
            blurHeder: true,
            current: treeData.current,
            modePopupData: false,
            modePopupDataModel: null,
            modePopupDataSrc: null,
            modePopupDataIndex: null,
            modePopupDataWidth: null,
            modePopupDataHeight: null,
            imgAction: [{
              name: '下载文件',
              fn: 'downloadFile'
            }, {
              name: '复制链接',
              fn: 'copyLink'
            }],
            modAction: [{
              name: '下载文件',
              fn: 'downloadFile'
            }, {
              name: '复制链接',
              fn: 'copyLink'
            }, {
              name: '调试模型',
              fn: 'modelDev'
            }]
          },
          created: function created() {
  
            this.initFileList();
            this.initFloder();
            this.initNav();
          },
          mounted: function mounted() {
            var _this = this;
            this.$nextTick(function () {
              window.addEventListener("scroll", _this.handleScroll); // 监听（绑定）滚轮滚动事件
  
              _this.handleScroll();
            });
            _this.images.length > 0 ? _this.initViewer() : '';
  
            document.body.style.opacity = '1';
  
          },
          beforeDestroy: function beforeDestroy() {
            window.removeEventListener("scroll", this.handleScroll);
          },
          computed: {
            getProjectList: function getProjectList() {
              var _list = this.project || [];
  
              _list = _list.sort(function (item, item2) {
                return item2.mtimeMs - item.mtimeMs;
              });
              return _list;
            }
          },
          methods: {
  
            openFile(event, url) {
              event.preventDefault();
              window.open(url, '_blank')
            },
            closeModePopup() {
              this.modePopupData = false;
              document.getElementsByTagName('body')[0].style.overflow = '';
            },
  
            moveStart() {
              this.moveStartVlue = false
              this.timer = setInterval(() => {
                this.moveStartVlue = true
              }, 500);
            },
            // 停止移动
            moveStop(mode, src, index) {
              if (!this.moveStartVlue) {
                this.modePopupData = true;
                this.modePopupDataModel = mode;
                this.modePopupDataSrc = src;
                this.modePopupDataIndex = index;
                this.modePopupDataWidth = `${document.documentElement.clientWidth}`;
                this.modePopupDataHeight = `${document.documentElement.clientHeight}`;
                document.getElementsByTagName('body')[0].style.overflow = 'hidden';
              }
              clearInterval(this.timer);
            },
  
            // 操作图片
            imageAction(actionItem, itemInfo) {
              let fn = actionItem.fn
              if (this[fn]) {
                this[fn](itemInfo)
              }
            },// 操作模型
            modelAction(actionItem, itemInfo) {
              let fn = actionItem.fn
              if (this[fn]) {
                this[fn](itemInfo)
              }
            },
            //下载服务
            downloadFile(itemInfo) {
              const a = document.createElement("a");
              a.href = window.location.href + itemInfo.fileName;
              a.download = itemInfo.fileName;
              a.click();
              a.remove();
            },
            //模型调试
            modelDev(itemInfo) {
              window.open(window.location.origin + '/三维模型库/GlTF-Viewer/#model=' + window.location.href + itemInfo.fileName)
            },
  
            copyLink(itemInfo) {
              var copy = function (e) {
                e.preventDefault()
                e.clipboardData.setData('text/plain', window.location.href + itemInfo.fileName)
  
                window.VsToast.show({
                  title: '复制成功',
                  variant: 'success',
                  timeout: 3000
                });
  
                document.removeEventListener('copy', copy)
              }
              document.addEventListener('copy', copy)
              document.execCommand("Copy");
            },
  
            initViewer() {
              if (window.Viewer) {
                let viewer = new window.Viewer(document.querySelector('.type-image'), {
                  inline: false,
                });
              } else {
                setTimeout(() => {
                  this.initViewer()
                }, 50)
              }
            },
  
            getUpdateTime: function getUpdateTime(time) {
              time = parseInt(time);
              var nowTime = new Date().getTime();
              var diffTime = nowTime - time;
              var formatStr = 'YYYY年MM月DD日 更新';
              var useDiffTime = false;
              beforeTime.some(function (item) {
                if (diffTime >= item.time) {
                  formatStr = item.format;
                  useDiffTime = item.useDiffTime;
                  return true;
                }
  
                return false;
              });
  
              if (!useDiffTime) {
                return this.formateTime(time, formatStr);
              } else {
                return this.calcTime(diffTime, useDiffTime);
              }
            },
            // 计算相差的时间
            // TODO 支持 format 格式
            calcTime: function calcTime(time) {
              var diffType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hours'; // 转换时间对象
              // var timeObj = this.timeToDateObj(time)
  
              switch (diffType) {
                case 'day':
                  return parseInt(time / 86400000) + '天前 更新';
  
                case 'hours':
                  return parseInt(time / 3600000) + '小时前 更新';
              }
            },
  
            /**
             * 格式化时间戳
             * @param  {Number}    time           需要转换的时间戳。默认当前时间
             * @param  {String}    format         时间格式 默认 yyyy-mm-dd HH:ii:ss
             * @return {String}    timeStr        格式化后的字符串
             */
            formateTime: function formateTime() {
              var _this2 = this;
  
              var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getTime();
              var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "yyyy-mm-dd hh:ii:ss";
              time = parseInt(time); // 转换时间对象
  
              var timeObj = this.timeToDateObj(time); // 正则
  
              format = format.toLocaleLowerCase().match(new RegExp(dateType + "|.", "g")) || []; // 匹配格式
  
              format.forEach(function (v, i) {
                if (/yyyy|y/.test(v)) {
                  //年
                  format[i] = _this2.digit(timeObj.year, v.length);
                } else if (/mm|m/.test(v)) {
                  //月
                  format[i] = _this2.digit(timeObj.month, v.length);
                } else if (/dd|d/.test(v)) {
                  //日
                  format[i] = _this2.digit(timeObj.day, v.length);
                } else if (/hh|h/.test(v)) {
                  //时
                  format[i] = _this2.digit(timeObj.hours, v.length);
                } else if (/ii|i/.test(v)) {
                  //分
                  format[i] = _this2.digit(timeObj.minutes, v.length);
                } else if (/ss|s/.test(v)) {
                  //秒
                  format[i] = _this2.digit(timeObj.seconds, v.length);
                }
              });
              return format.join("");
            },
  
            /**
            * 数字前置补零
            * @param  {Number}  num     传入的数字
            * @param  {Number}  length  需要的长度。默认2位
            * @return {Number}  num     转换好的数字
            */
            digit: function digit(num) {
              var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
              var str = "";
              num = String(num);
              length = length || 2;
  
              for (var i = num.length; i < length; i++) {
                str += "0";
              }
  
              return num < Math.pow(10, length) ? str + (num | 0) : num;
            },
  
            /**
             * 时间戳转换为对象 (new Date()) => (timeObject)
             * @param  {Number}   time   传入原时间
             * @return {Object}   object 转换后的时间戳，和时间对象
             */
            timeToDateObj: function timeToDateObj() {
              var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getTime();
              var date = new Date();
              date.setTime(time);
              return {
                time: time,
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
                week: weeks_ch[date.getDay()],
                hours: date.getHours(),
                minutes: date.getMinutes(),
                seconds: date.getSeconds(),
                monthStr: this.digit(date.getMonth() + 1),
                dayStr: this.digit(date.getDate()),
                hoursStr: this.digit(date.getHours()),
                minutesStr: this.digit(date.getMinutes()),
                secondsStr: this.digit(date.getSeconds())
              };
            },
            handleScroll: function handleScroll() {
              var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop; //滚动高度
  
              if (scrollHeight >= 100) {
                this.blurHeder = true;
              } else {
                this.blurHeder = false;
              }
            },
  
            initNav: function initNav() {
              var routes = treeData.current.split('/');
              var path = window.location.origin;
              var paths = [];
              routes.forEach(function (item, index) {
                (item || index == 0) && paths.push({
                  text: item || 'Home',
                  path: path += item + '/'
                });
              });
              this.currentName = paths[paths.length - 1].text;
              this.path = paths;
            },
            initFloder: function initFloder() {
              var _this4 = this;
  
              var dirs = treeData.dirs; // 项目目录
  
              var projectList = []; // 普通文件夹
  
              var folderList = [];
  
              for (const item of dirs) {
                let _item = _slicedToArray(item, 2);
                let name = _item[0];
                let dirData = _item[1];
                let cover = _item[2];
  
                if (name !== '..' && name !== 'config') {
                  if (cover) {
                    projectList.push({
                      dirData: dirData,
                      name: name,
                      cover: cover
                    });
                    console.log(name,dirData)
                  } else {
                    folderList.push({
                      dirData: dirData,
                      name: name
                    });
                  }
  
                  var imgInfo = false;
                }
              };
              this.project = projectList || [];
              this.folder = folderList || [];
            },
            initFileList: function initFileList() {
              var files = treeData.renderFiles;
              var imageObj = {};
              var images = [];
              var otherFiles = [];
              var modelGlb = new Array;
              files.forEach(function (item) {
                var fileName = item[0];
                var nameArr = fileName.split('.');
                var ext = nameArr.pop();
                fileName = nameArr.join('.');
  
                // // feature 当前目录下包含MD文件，自动进入MD视图
                // if (ext === 'md') {
                //   window.location.href += item[0]
                // }
  
                if (imgExt.indexOf(ext) !== -1) {
                  // imageObj[fileName] = {
                  //   fileName: item[0],
                  //   ...item[1]
                  // }
                  images.push({
                    fileName: item[0],
                    dirData: item[1]
                  });
                } else if (modeExt.indexOf(ext) !== -1) {
                  modelGlb.push({
                    fileName: item[0],
                    dirData: item[1]
                  });
                } else {
                  otherFiles.push({
                    fileName: item[0],
                    dirData: item[1]
                  });
                }
              }); // this.imageObj = imageObj
              this.images = images;
              this.modelGlb = modelGlb;
              this.otherFiles = otherFiles;
  
            }
          }
        });
  
  
        Vue.component('operation', {
          template: `
      <div ref="operation" :class="['operation-wrap',{open:open}]" @click.stop="toggleOpen" v-if="actionList.length">
        <div class="operation">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
  
        <div :class="['operation-list-wrap',{open:open}]">
          <div class="operation-list">
            <div class="operation-item" v-for="(item,index) in actionList" :key="index" @click.stop="clickItem(item)">{{item.name}}</div>
          </div>
        </div>
      </div>
      `,
          props: {
            actionList: {
              type: Array,
              default: function () {
                return []
              }
            },
            value: {
              type: Object,
              default: function () {
                return {}
              }
            }
          },
          data() {
            return {
              open: false
            }
          },
          mounted() {
            let _this = this
            document.body.addEventListener('click', _this.bodyClick, false)
            app.$on('openOperation', function () {
              _this.bodyClick()
            })
          },
          destroyed() {
            document.body.removeEventListener('click', this.bodyClick, false)
          },
          methods: {
            bodyClick(event) {
              this.open = false
            },
            toggleOpen() {
              app.$emit('openOperation')
              this.$nextTick(() => {
                this.open = !this.open
              })
            },
            clickItem(item) {
              this.$emit('click-item', item, this.value)
              this.open = false
            }
          }
        })
  
        Vue.component('modelscale', {
          template: `
              <div>
                <div id="modelBorder" class="modelBorder"></div>
                <div class="file-name">{{(loadedData == '100' ) ? model : '加载中' +loadedData+'%'}}</div>
              </div>
      `,
          props: {
            model: Array,
            src: Array,
            width: Number,
            height: Number,
            index: Number,
          },
          data: function () {
            return {
              scene: null,
              camera: null,
              renderer: null,
              index: null,
              group: null,
              rotating: true,
              loadedData: 0,
  
            }
          },
          mounted() {
  
           
  
          },
          destroyed() {
            
          },
          methods: {
  
            init() {
              let self = this;
  
              self.clock = new THREE.Clock();
  
  
              var camera = new THREE.PerspectiveCamera(45, self.width / self.height, 0.1, 1000);
              self.camera = camera
              self.camera.position.set(0, 0, 100);
  
              self.scene = new THREE.Scene();
              self.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
              self.renderer.setPixelRatio(window.devicePixelRatio);
              self.renderer.setSize(self.width, self.height);
              self.renderer.toneMapping = THREE.ACESFilmicToneMapping;
              self.renderer.toneMappingExposure = 1;
              self.renderer.outputEncoding = THREE.sRGBEncoding;
              self.renderer.shadowMapEnabled = true;
  
              //插入div
              document.getElementsByClassName("modelBorder")[self.index].appendChild(self.renderer.domElement);
  
              // container.appendChild(renderer.domElement);
              let controls = new THREE.OrbitControls(camera, self.renderer.domElement);
              // controls.enableDamping = true;
              // controls.minDistance = 0.5;
              // controls.maxDistance = 1;
              // controls.target.set(0, 1, 0);
              // controls.update();
  
  
              new THREE.RGBELoader()
                // .setPath('pisaHDR/')
                .load(window.location.origin + '/三维模型库/GlTF-Viewer/assets/environment/venice_sunset_1k.hdr', function (texture) {
  
                  texture.mapping = THREE.EquirectangularReflectionMapping;
                  // self.scene.background = texture;
                  self.scene.environment = texture;
  
                  //new加载模型放在材质内可以方便按顺序加载，hdr加载完之后再显示模型，否侧会先显示黑模型再显示hdr灯光
                  // model  
                  new THREE.GLTFLoader()
                    // .setPath( 'models/gltf/' )
                    .setDRACOLoader(new THREE.DRACOLoader().setDecoderPath())
                    .load(self.src, function (gltf) {
                      // console.log(self.src)
                      let loadscene = gltf.scene;
                      loadscene.scale.set(1, 1, 1);
                      // mixer = new THREE.AnimationMixer( gltf.scene );
                      // mixer.clipAction( gltf.animations[ 0 ] ).play();
                      self.setContent(loadscene)
                    }, function (xhr) {
                      //模型加载状态
                      self.loadedData = Math.floor(xhr.loaded / xhr.total * 100);
                      if (self.loadedData == '100') {
                        let ld = document.getElementsByClassName('modelBorder')[self.index];
                        ld.style.backgroundImage = 'none';
                      }
                    });
  
                });
  
  
  
            },
  
            setContent(model) {
              let self = this;
              let group = new THREE.Group();
              group.add(model);
              group.updateMatrixWorld();
              let bbox = new THREE.Box3().setFromObject(group);
              const boxSize = bbox.getSize(new THREE.Vector3());
              const center = bbox.getCenter(new THREE.Vector3());
              group.position.x += group.position.x - center.x;
              group.position.y += group.position.y - center.y;
              group.position.z += group.position.z - center.z;
              this.camera.position.copy(center);
              if (boxSize.x > boxSize.y) {
                self.camera.position.z = boxSize.x * -2.85
              } else {
                self.camera.position.z = boxSize.y * -2.85
              }
              self.camera.lookAt(0, 0, 0);
  
              //外框架
              let boxhelper = new THREE.BoxHelper(group, 0xbe1915); //外面红色框
              // self.scene.add(boxhelper);
              //坐标线
              let axesHelper = new THREE.AxesHelper(100);
              // self.scene.add(axesHelper);
  
              self.scene.add(group);
  
            },
  
            animate() {
              let self = this;
              requestAnimationFrame(self.animate);
              self.render()
  
            },
            render() {
              let self = this;
              self.renderer.render(self.scene, self.camera);
            }
          },
  
          mounted() {
            window.ob = this;
            this.init();
            this.animate();
          }
        })
      })();