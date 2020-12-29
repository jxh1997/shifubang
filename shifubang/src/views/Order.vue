  
<template>
	<a-button type="primary" @click="showModal"> 新增回访记录 </a-button>
	<a-modal
		v-model:visible="addModel.visible"
		title="新增回访记录"
		@ok="handleOk"
	>
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

		<div>
			<label for="region">
				<span>服务区域：</span>
				<a-input class="o_width" type="text" />
			</label>
			<label for="project">
				<span>服务项目：</span>
				<a-input class="o_width" type="text" />
				<!-- <a-select
					label-in-value
					v-model:value="value"
					style="width: 300px"
					@change="handleChange"
				>
					<a-select-option value="安装"> 安装 </a-select-option>
					<a-select-option value="质保维修"> 质保维修 </a-select-option>
				</a-select> -->
			</label>
			<label for="seller">
				<span>销售平台：</span>
				<a-input class="o_width" type="text" />
				<!-- <a-cascader
					v-model:value="seller_options.value"
					:options="seller_options"
					placeholder="Please select"
					class="o_width"
				/> -->
			</label>
			<label for="maintainer">
				<span>维护商名：</span>
				<a-input class="o_width" type="text" />
			</label>
			<label for="acceptance">
				<span>受理单号：</span>
				<a-input class="o_width" type="text" />
			</label>
			<label for="sales">
				<span>销售单ID：</span>
				<a-input class="o_width" type="text" />
			</label>
			<label for="telephone">
				<span>客户电话：</span>
				<a-input class="o_width" type="text" />
			</label>
		</div>
	</a-modal>

	<a-table class="o_table" :columns="columns" :data-source="data">
		<template #name="{ text }">
			<a>{{ text }}</a>
		</template>

		<template #action="">
			<span>
				<a>修改</a>
				<a-divider type="vertical" />

        <a-popconfirm
          title="你确定要删除么?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="confirm"
          @cancel="cancel"
        >
          <a href="#">删除</a>
        </a-popconfirm>
			</span>
		</template>
	</a-table>
</template>
<script>
import { computed, reactive, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { message } from 'ant-design-vue';

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
		let key = 6;

		const store = useStore();
		const columns = computed(() => store.state.columns);
		const data = computed(() => store.state.data);

		const showModal = () => {
			addModel.visible = true;
		};

    const { ctx } = getCurrentInstance();
    console.log(ctx);
		// 添加记录
		const handleOk = (e) => {
			const dataArr = [
				"key",
				"region",
				"project",
				"seller",
				"maintainer",
				"acceptance",
				"sales",
				"telephone",
			];
			let addArr = e.path[2].children[2].children[0].children;
			let addOrderObj = {};
			key++;

			addArr.forEach((item, index) => {
				addOrderObj[dataArr[0]] = key;
				addOrderObj[dataArr[index + 1]] = item.children[1].value;
			});

			store.state.data.push(addOrderObj);
      addModel.visible = false;
      message.info('添加成功！');
		};
		const handleCancel = () => {
			addModel.visible = false;
    };
    
    // 删除记录
    // const confirm = (e) => {
    //   // console.log(e.path[8].children[1].children[0].children[0].children[1].children[1].children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[2].children);
    //   message.success('删除成功！');
    // }
    const confirm = (() => {
      console.log(this);
    })


    const cancel = (e) => {
      console.log(e);
      message.error('删除失败！');
    }

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
      confirm,
      cancel
		};
	},
};
</script>

<style scoped>
label {
	display: flex;
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