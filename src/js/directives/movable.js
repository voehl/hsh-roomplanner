module.exports = {
	bind: function (el, _, node) {
		function updatePosition(x, y, eventName) {
			var rect = container.getBoundingClientRect();
			node.context.$emit(eventName, {
				x: Math.max(Math.min((x - rect.left - offsetX) / rect.width * 100, 100), 0),
				y: Math.max(Math.min((y - rect.top - offsetY) / rect.height * 100, 100), 0)
			});
		}

		const container = node.context.$parent.$el;
		var offsetX = 0, offsetY = 0;

		el.draggable = true;
		el.addEventListener('mousedown', function (event) {
			if (node.context.selected) {
				var rect = el.getBoundingClientRect();
				offsetX = event.clientX - rect.left - rect.width / 2;
				offsetY = event.clientY - rect.top - rect.height / 2;
				event.stopPropagation();
			}
		}, false);
		el.addEventListener('dragstart', function (event) {
			if (node.context.selected) {
				event.dataTransfer.setData('text/plan', null);
				event.dataTransfer.setDragImage(new Image, 0, 0);
				return;
			}
			event.preventDefault();
			return false;
		}, false);
		container.addEventListener('dragover', function (event) {
			if (node.context.selected) {
				updatePosition(event.clientX, event.clientY, 'move');
				event.preventDefault();
				return false;
			}
		}, false);
		window.addEventListener('dragover', function (event) {
			if (node.context.selected) {
				updatePosition(event.clientX, event.clientY, 'move');
			}
		}, false);
		container.addEventListener('drop', function (event) {
			if (node.context.selected) {
				updatePosition(event.clientX, event.clientY, 'moved');
				event.preventDefault();
				return false;
			}
		}, false);
	}
};