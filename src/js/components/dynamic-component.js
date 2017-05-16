module.exports = {
	props: {
		tag: {
			type: String,
			required: true
		},
		props: Object
	},
	render: function (createElement) {
		return createElement(this.tag, {props: this.props});
	}
};