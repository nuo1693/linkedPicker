const city = require("../../utils/city.js");
Page({
  data: {
    linkedInfo: '', // 选中的联动信息
    linkedCode: [], //选中的联动id
    linkedFlag: false, // 联动框是否显示flag
    linkeds: [], // 三级联动地城市地址
  },
  onLoad(){
    this.setData({
      linkeds:city,
    })
  },

  //点击打开联动
  clickOpenLinked(e) {
    this.setData({
      linkedFlag: true
    });
  },

  linkedFlagChange(e) {
    this.setData({
      linkedFlag: e.detail.flag
    });
  },

  onLinkedConfirm(e) {
    let { linkedInfo, linkedCode } = e.detail;
    let list = [];
    for (let i = 0; i < linkedInfo.length; i++) {
      list.push(linkedInfo[i].name)
    }
    this.setData({
      linkedInfo: list.join('-'),
      linkedCode: [...linkedCode],
    });
  },
})