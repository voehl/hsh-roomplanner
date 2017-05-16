<template>
	<div :class="entityManagerClass" @click="handleEntityManagerClick($event)">
		<div class="entity-manager-controls">
			<button @click="sendData">Save</button>
		</div>
		<div :class="entityManagerAvailableEntitiesClass">
			<div class="entity-manager-available-entities-toggle" @click="toggle();">&rsaquo;</div>
			<div class="entity-manager-available-entities-inner">
				<entity
						:model="entity"
						:key="entity.id"
						:selected="isSelected(entity)"
						@click="handleEntityClick($event, entity)"
						@move="handleEntityInitialMove($event, entity)"
						v-for="entity in entities"
						v-if="!(entity.x > 0 || entity.y > 0)"></entity>
			</div>
		</div>
		<div class="entity-manager-entities">
			<entity
					:model="entity"
					:key="entity.id"
					:selected="isSelected(entity)"
					@click="handleEntityClick($event, entity)"
					@move="handleEntityMove($event, entity)"
					@rotate="handleEntityRotate($event, entity)"
					@delete="handleEntityDelete($event, entity)"
					v-for="entity in entities"
					v-if="entity.x > 0 || entity.y > 0"></entity>
		</div>
	</div>
</template>

<script>
	module.exports = {
		props: {
			url: String
		},
		data: function () {
			return {
				entities: [],
				selection: [],
				expanded: true
			};
		},
		computed: {
			entityManagerClass: function () {
				return {'entity-manager': true, 'has-selection': this.selection.length > 0};
			},
			entityManagerAvailableEntitiesClass: function () {
				return {'entity-manager-available-entities': true, 'active': this.expanded};
			}
		},
		methods: {
			requestData: function () {
				const self = this;
				this.$http.get(this.url).then(function (response) {
					self.entities = response.body;
				});
			},
			sendData: function () {
				const data = [];
				this.entities.forEach(function (entity) {
					if (['project', 'placeholder'].indexOf(entity.type) > -1)
						data.push({
							id: entity.id,
							type: entity.type,
							x: entity.x,
							y: entity.y,
							angle: entity.angle
						});
				});
//				console.log(JSON.stringify(data, null, 4));
				this.$http.post(this.url, JSON.stringify(data)).then(function (response) {
					console.log(response);
				});

			},
			isSelected: function (entity) {
				return this.selection.indexOf(entity) > -1;
			},
			handleEntityManagerClick: function (e) {
				this.selection = [];
				e.stopPropagation();
			},
			handleEntityClick: function (event, entity) {
				this.selection = [entity];
				event.stopPropagation();
			},
			handleEntityMove: function (event, entity) {
				entity.x = event.x;
				entity.y = event.y;
			},
			handleEntityInitialMove: function (event, entity) {
				entity.x = event.x;
				entity.y = event.y;
			},
			handleEntityRotate: function (event, entity) {
				entity.angle = event.angle;
			},
			handleEntityDelete: function (event, entity) {
				entity.x = 0;
				entity.y = 0;
				entity.angle = 0;
			},
			toggle: function () {
				this.expanded = !this.expanded;

			}
		},
		mounted: function () {
			this.requestData();
		}
	};
</script>