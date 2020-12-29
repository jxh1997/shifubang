  
<template>
  <a-button type="primary" @click="showModal"> 新增订单 </a-button>
  <a-modal v-model:visible="addModel.visible" title="新增订单" @ok="handleOk">
    <template #footer>
      <a-button key="back" @click="handleCancel"> 取消 </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="addModel.loading"
        @click="handleOk"
      >
        新增
      </a-button>
    </template>

    <label for="region">
      <span>服务区域：</span>
      <a-input  class="o_width" type="text" />
    </label>
    <label for="project">
      <span>服务项目：</span>
      <a-select
        label-in-value
        v-model:value="value"
        style="width: 300px"
        @change="handleChange"
      >
        <a-select-option  value="anzhuang"> 安装 </a-select-option>
        <a-select-option value="zhibao"> 质保维修 </a-select-option>
      </a-select>
    </label>
    <label for="seller">
      <span>销售平台：</span>
      <a-cascader
        v-model:value="seller_options.value"
        :options="seller_options"
        placeholder="Please select"
        class="o_width"
      />
    </label>
    <label for="maintainer">
      <span>维护商名：</span>
      <a-input class="o_width" type="text" />
    </label>
    <label for="acceptance">
      <span>受理单号：</span>
      <a-input  class="o_width" type="text" />
    </label>
    <label for="sales">
      <span>销售单ID：</span>
      <a-input  class="o_width" type="text" />
    </label>
    <label for="telephone">
      <span>客户电话：</span>
      <a-input  class="o_width" type="text" />
    </label>
  </a-modal>
  <a-table class="o_table" :columns="columns" :data-source="data">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>

    <template #action="">
      <span>
        <a>完成</a>
        <a-divider type="vertical" />
        <a>修改</a>
        <a-divider type="vertical" />
        <a>删除</a>
      </span>
    </template>
  </a-table>
</template>
<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const addModel = reactive({
      visible: false,
      loading: false,
    });
    const seller_options = reactive([
      {
        value: "天猫",
        label: "天猫",
        children: [
          {
            value: "沁园旗舰店",
            label: "沁园旗舰店",
          },
          {
            value: "沁园净水旗舰",
            label: "沁园净水旗舰",
          },
        ],
      },
      {
        value: "京东",
        label: "京东",
        children: [
          {
            value: "沁园京东自营旗舰店",
            label: "沁园京东自营旗舰店",
          },
        ],
      },
      {
        value: "苏宁易购官方旗舰店（天猫）",
        label: "苏宁易购官方旗舰店（天猫）",
      },
    ]);

    const store = useStore();
    const columns = computed(() => store.state.columns);
    const data = computed(() => store.state.data);

    const showModal = () => {
      addModel.visible = true;
    };
    const handleOk = () => {
      addModel.loading = true;
      setTimeout(() => {
        addModel.visible = false;
        addModel.loading = false;
      }, 3000);
    };
    const handleCancel = () => {
      addModel.visible = false;
    };

    // const add = () => {
    //   store.dispatch('add')
    // }
    return {
      columns,
      data,
      addModel,
      showModal,
      handleOk,
      handleCancel,
      seller_options,
    };
  },
};
</script>

<style scoped>
label {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  height: 50px;
}
label span {
  width: 100px;
}
.o_width {
    width: 300px;
}
</style>