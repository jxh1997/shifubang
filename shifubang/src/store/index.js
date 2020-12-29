import { createStore } from 'vuex'

export default createStore({
  state: {
    columns: [{
      title: "服务区域",
      dataIndex: "region",
      key: "region",
      slots: { customRender: "region" },
      ellipsis: true,
    },
    {
      title: "服务项目",
      dataIndex: "project",
      key: "project",
      width: 100,
    },
    // {
    //   title: "品牌-机型",
    //   dataIndex: "brand",
    //   key: "brand",
    //   ellipsis: true,
    // },
    {
      title: "销售平台",
      dataIndex: "seller",
      key: "seller",
      ellipsis: true,
    },
    {
      title: "维护商名",
      dataIndex: "maintainer",
      key: "maintainer",
      ellipsis: true,
    },
    {
      title: "受理单号",
      dataIndex: "acceptance",
      key: "acceptance",
    },
    {
      title: "销售单ID",
      dataIndex: "sales",
      key: "sales",
    },
    {
      title: "客户电话",
      dataIndex: "telephone",
      key: "telephone",
    },
    {
      title: '操作',
      key: 'action',
      slots: { customRender: 'action' },
    },
  ],

    data: [
      {
        key: "1",
        region: "江西省吉安市新干县金川镇",
        project: '安装',
        // brand: "沁园-橱下超滤机",
        seller: '天猫/沁园旗舰店',
        maintainer: '金川镇黄师傅*1',
        acceptance: 'C2020111315627763',
        sales: 'BXSD160523700281535421',
        telephone: '15000296505'
      },
      {
        key: "2",
        region: "甘肃省武威市凉州区五和乡",
        project: '安装',
        // brand: "沁园-纯水机",
        seller: '京东/沁园京东自营旗舰店',
        maintainer: '凉州区王掌柜1',
        acceptance: 'C2020111315646108',
        sales: 'BXSD16052450548480684',
        telephone: '15002693910'
      },
      {
        key: "3",
        region: "陕西省西安市碑林区太乙路街道",
        project: '安装',
        // brand: "沁园-橱下RO机",
        seller: '天猫/沁园旗舰店',
        maintainer: '莲湖区李师傅*17',
        acceptance: 'C2020111315650059',
        sales: 'BXSD160524780272653310',
        telephone: '15003582722'
      },
      {
        key: "4",
        region: "江西省吉安市新干县金川镇",
        project: '安装',
        // brand: "沁园-橱下超滤机",
        seller: '天猫/沁园旗舰店',
        maintainer: '金川镇黄师傅*1',
        acceptance: 'C2020111315627763',
        sales: 'BXSD160523700281535421',
        telephone: '15000296505'
      },
      {
        key: "5",
        region: "甘肃省武威市凉州区五和乡",
        project: '安装',
        // brand: "沁园-纯水机",
        seller: '京东/沁园京东自营旗舰店',
        maintainer: '凉州区王掌柜1',
        acceptance: 'C2020111315646108',
        sales: 'BXSD16052450548480684',
        telephone: '15002693910'
      },
      {
        key: "6",
        region: "陕西省西安市碑林区太乙路街道",
        project: '安装',
        // brand: "沁园-橱下RO机",
        seller: '天猫/沁园旗舰店',
        maintainer: '莲湖区李师傅*17',
        acceptance: 'C2020111315650059',
        sales: 'BXSD160524780272653310',
        telephone: '15003582722'
      },
      
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
