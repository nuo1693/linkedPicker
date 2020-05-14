Component({
  properties: {
    linkedFlag: {
      type: Boolean,
      observer(newVal, oldVal) {
        this.setData({
          flag: newVal
        });
      }
    },
    // linked-datas
    linkedDatas: {
      type: Array,
      observer(newVal, oldVal) {
        this.setData({
          datas: newVal
        });
        //初始化数据
        this.initTabs();
      }
    }
  },
  data: {
    flag: false, // 是否显示flag
    datas: [], // 联动信息
    tabList: [], // 选中信息组合
    code: [], // 选中
  },
  methods: {

    initTabs: function () {
      const that = this;
      const tabArray = [];
      const { datas } = this.data;
      if (datas && datas.length != 0) {
        tabArray.push({
          selectIndex: -1,
          name: '请选择',
          node: {},
          list: datas
        });
      }

      that.setData({
        tabList: tabArray
      });

    },

    // 点击遮罩层
    clickMask: function (e) {
      let id = e.target.id;
      if (id === 'linked_mask') {
        this.setData({
          flag: false
        });
        this.triggerEvent('trigger-linked-flag', {
          flag: false
        });
        this.initTabs();
      }
    },

    //关闭联动框
    clickClose: function (e) {
      this.setData({
        flag: false
      });
      this.triggerEvent('trigger-linked-flag', {
        flag: false
      });
      this.initTabs();
    },

    clickTabItem: function (e) {
      // 点击的第几个tab
      const that = this
      const { index } = e.target.dataset
      let { code, tabList } = that.data
      const array = [];
      if (parseInt(index) === 1) {
        code.pop()
      }
      if (parseInt(index) === 0) {
        code = []
      }
      for (let i = 0; i < index + 1; i++) {
        array.push(tabList[i]);
      }
      that.setData({
        tabList: array,
        code,
      });
    },

    clickItem: function (e) {
      const that = this
      const { index } = e.target.dataset;
      const { tabList } = this.data;
      let code = []
      let pre = tabList[tabList.length - 1];
      pre.selectIndex = index;
      pre.name = pre.list[index].name;
      pre.node = pre.list[index];
      code.push(pre.node.code)
      // 判断是否有下一个
      if (pre.list[index].children && pre.list[index].children.length != 0) {
        let next = {
          selectIndex: -1,
          name: '',
          node: {},
          list: pre.list[index].children
        }
        tabList.push(next);
        that.setData({
          tabList,
          code: [...that.data.code, ...code],
        });
      } else {
        that.triggerEvent('trigger-linked-flag', {
          flag: false
        });
        that.triggerEvent('trigger-linked-confirm', {
          linkedInfo: tabList,
          linkedCode: [...that.data.code, ...code]
        });
        that.setData({ flag: false, code: [], tabList: [] }, () => {
          that.initTabs()
        })
      }
    }
  }
})