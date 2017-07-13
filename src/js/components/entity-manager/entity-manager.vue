<template>
	<div>
		<div :class="entityManagerClass" @click="handleEntityManagerClick($event)">
			<div class="entity-manager-controls">
				<button @click="sendData" class="btn save-button">Speichern</button>
			</div>
			<div :class="entityManagerAvailableEntitiesClass">
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
			<div class="legende">
				<div class="vote-group" v-for="voteGroup in voteGroups">
					<div class="vote-group-color" v-bind:style="{backgroundColor:voteGroup.color}"></div>
					<div class="vote-group-name">{{ voteGroup.name }}</div>
				</div>
			</div>
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
				expanded: false
			};
		},
		computed: {
			entityManagerClass: function () {
				return {'entity-manager': true, 'has-selection': this.selection.length > 0};
			},
			entityManagerAvailableEntitiesClass: function () {
				return {'entity-manager-available-entities': true, 'active': this.expanded};
			},
			voteGroups: function () {
				var _voteGroups = {};
				this.entities.forEach(function (entity) {
					_voteGroups[entity.voteGroupName] = {name: entity.voteGroupName, color: entity.voteGroupColor};
				});
				var voteGroups = [];
				for (var k in _voteGroups) {
					voteGroups.push(_voteGroups[k]);
				}
				return voteGroups;
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
							angle: entity.angle,
							voteGroupName: entity.voteGroupName || '',
//							customRequirements: '',
							roomRequirements: entity.roomRequirements || ''
						});
				});
//				console.log(JSON.stringify(data, null, 4));
				this.$http.post(this.url, JSON.stringify(data)).then(function (response) {
					alert('Gespeichert!');
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