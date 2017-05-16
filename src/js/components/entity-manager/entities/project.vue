<template>
	<div class="project">
		<div class="project-popover">
			<div class="project-title">{{ model.name }}</div>
		</div>
	</div>
</template>
<script>
	module.exports = {
		props: {
			model: Object
		}
	};
</script>