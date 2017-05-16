module.exports = {
	bind: function (el, _, node) {
		function getAngle(x, y) {
			var rect = container.getBoundingClientRect();
			const dx = (x - rect.left) / rect.width * 100 - node.context.model.x;
			const dy = (y - rect.top) / rect.height * 100 - node.context.model.y;
			return Math.PI - Math.atan2(dx, dy) / Math.PI * 180;
		}

		function snapValue(value, step) {
			return shiftDown ? Math.round(value / step) * step : value;

		}

		function updateRotationByPosition(x, y, eventName) {
			const angle = snapValue(getAngle(x, y) - angleOffset, snapStep);
			node.context.$emit(eventName, {angle: angle});
			lastAngle = angle;
			lastX = x;
			lastY = y;
		}

		function updateRotationByInitialAngle(eventName) {
			node.context.$emit(eventName, {angle: snapValue(lastAngle, snapStep)});
		}

		const container = node.context.$parent.$el;
		var lastX, lastY;
		var mouseDown = false, shiftDown = false;
		var snapStep = 45 / 2;
		var lastAngle;
		var angleOffset;

		container.addEventListener('mousedown', function (event) {
			lastX = undefined;
			lastY = undefined;
			angleOffset = 0;
			if (node.context.selected) {
				lastAngle = node.context.model.angle;
				angleOffset = getAngle(event.clientX, event.clientY) - lastAngle;
				mouseDown = true;
			}
		}, false);
		container.addEventListener('mousemove', function (event) {
			if (node.context.selected && mouseDown) {
				if (lastX && lastY) {
					updateRotationByPosition(event.clientX, event.clientY, 'rotate');
				} else {
					lastX = event.clientX;
					lastY = event.clientY;
				}
			}
		}, false);
		container.addEventListener('mouseup', function (event) {
			if (node.context.selected && mouseDown) {
				mouseDown = false;
				updateRotationByPosition(event.clientX, event.clientY, 'rotated');
			}
		}, false);
		window.addEventListener('click', function (event) {
			if (node.context.selected && mouseDown) {
				event.stopPropagation();
			}
		}, false);
		window.addEventListener('keydown', function (event) {
			if (event.keyCode === 16) {
				shiftDown = true;
				if (node.context.selected && mouseDown) {
					updateRotationByInitialAngle('rotate');
				}
			}
		}, false);
		window.addEventListener('keyup', function (event) {
			if (event.keyCode === 16) {
				shiftDown = false;
				if (node.context.selected && mouseDown) {
					updateRotationByInitialAngle('rotate');
				}
			}
		}, false);
	}
};