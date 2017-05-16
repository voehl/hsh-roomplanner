<template>
	<div :class="getClass">
		<img :src="src">
		<div class="entities" x-grid>
			<!--<x-room v-for="(room, index) in rooms"
					:key="index"
					:id="room.id"
					:name="room.name"
					:x="room.x"
					:y="room.y"
					:width="room.width"
					:height="room.height"></x-room>-->
			<x-project v-for="(project, index) in projects"
					   :key="index"
					   :id="project.id"
					   :name="project.name"
					   :x="project.x"
					   :y="project.y"
					   :width="project.width"
					   :height="project.height"
					   :snapX="2"
					   :snapY="2"
					   @select="selectProject(project)"
					   @deselect="deselectProject(project)"
					   @move="moveProject($event)"
					   @rotate="rotateProject($event)"
			></x-project>
		</div>
	</div>
</template>

<script>
	module.exports = {
		props: {
			src: String
		},
		data: function () {
			return {rooms: [], projects: [], selection: null}
		},
		computed: {
			getClass: function () {
				console.log(this.selection);
				return {map: true, 'has-selection': !!this.selection}
			}
		},
		methods: {
			loadRooms: function () {
				const self = this;
				this.$http.get('data/room.json').then(function (response) {
					self.rooms = response.body;
				});
			},
			loadProjects: function () {
				const self = this;
				this.$http.get('data/project.json').then(function (response) {
					self.projects = response.body;
				});
			},
			selectProject: function () {
				this.selection = true;
			},
			deselectProject: function () {
				this.selection = false;
			},
			moveProject: function (e) {
				console.log('MOVE:', e);
			},
			rotateProject: function (e) {
				console.log('ROTA:', e);
			}
		},
		mounted: function () {
			this.loadRooms();
			this.loadProjects();
		}
	};
</script>