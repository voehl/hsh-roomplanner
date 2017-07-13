<template>
	<div class="project">
		<div class="project-popover">
			<div class="project-title">{{ model.name }}</div>
			<div class="project-requirements">{{ model.roomRequirements }}</div>
		</div>
		<div class="project-color" v-bind:style="{backgroundColor:model.voteGroupColor}"></div>
	</div>
</template>
<script>
	module.exports = {
		props: {
			model: Object
		}
	};
</script>