<template>
	<div :class="entityWrapperClass" :style="entityWrapperStyle">
		<div class="entity selectable" :style="entityStyle" @click="handleClick" v-movable v-rotatable v-if="isMovableModel">
			<div class="entity-delete" @click="handleDelete">X</div>
			<dynamic-component :tag="model.type" :props="{model: model}"></dynamic-component>
		</div>
		<div class="entity" :style="entityStyle" v-if="!isMovableModel">
			<dynamic-component :tag="model.type" :props="{model: model}"></dynamic-component>
		</div>
	</div>
</template>

<script>
	module.exports = {
		props: {
			model: Object,
			selected: Boolean
		},
		computed: {
			isMovableModel: function () {
				return ['project', 'placeholder'].indexOf(this.model.type) > -1;
			},
			entityWrapperClass: function () {
				return {
					'entity-wrapper': true,
					selected: this.selected
				};
			},
			getWidth: function () {
				if (this.model.type === 'project') {
					return 5;
				}
				return this.model.width;
			},
			getHeight: function () {
				if (this.model.type === 'project') {
					return 3;
				}
				return this.model.height;
			},
			entityWrapperStyle: function () {
				return {
					left: this.model.x + '%',
					top: this.model.y + '%',
					width: this.getWidth + '%',
					height: this.getHeight + '%'
				};
			},
			entityStyle: function () {
				return {
					transform: 'rotate(' + (this.model.angle || 0) + 'deg)'
				};
			}
		},
		methods: {
			handleClick: function (event) {
				this.$emit('click', event);
			},
			handleDelete: function (event) {
				this.$emit('delete', event);
			}
		}
	};
</script>