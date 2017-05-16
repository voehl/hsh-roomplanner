<script>
	module.exports = {
		mounted: function () {
			function update() {
				var deg = angle * 180 / Math.PI;
				if (shiftDown) {
					deg = Math.round(deg / 45) * 45;
				}
				if (deg !== lastAngle) {
					self.$emit('rotate', deg);
					lastAngle = deg;
				}
			}

			const self = this;

			var angle;
			var lastAngle;
			var mouseDown = false;
			var mouseDownX, mouseDownY;
			var shiftDown = false;

			this.$el.addEventListener('mousedown', function (e) {
				mouseDown = true;
				mouseDownX = e.clientX;
				mouseDownY = e.clientY;
			}, false);
			window.addEventListener('keydown', function (e) {
				if (e.keyCode === 16) {
					shiftDown = true;
					update();
				}
			}, false);
			window.addEventListener('keyup', function (e) {
				if (e.keyCode === 16) {
					shiftDown = false;
					update();
				}
			}, false);
			window.addEventListener('mousemove', function (e) {
				if (mouseDown) {
					angle = Math.PI - Math.atan2(mouseDownX - e.clientX, mouseDownY - e.clientY);
					update();
				}
			}, false);
			window.addEventListener('mouseup', function () {
				mouseDown = false;
				update();
			}, false);
		}
	};
</script>