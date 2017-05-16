<template>
	<div class="room">
		<div class="room-title">{{ model.name }}</div>
	</div>
</template>
<script>
	module.exports = {
		props: {
			model: Object
		}
	};
</script>