import React from "react";
import * as ReactDOM from "react-dom";
const modalRoot = document.getElementById("modal");
class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.el = document.createElement("div");
	}

	componentDidMount() {
		this.el.style.position = "fixed";
        this.el.style.zIndex = "5"
		this.el.style.top = "0px";
		this.el.style.left = "0px";
		this.el.style.width = "100%";
		this.el.style.height = "100%";
		this.el.style.display = "grid";
		this.el.style.gridTemplateColumns = "1fr";
		this.el.style.gridTemplateRows = "100vh";
		this.el.style.alignItems = "center";
		this.el.style.justifyItems = "center";
		this.el.style.background = "rgba(119, 126, 144, 0.3)";
		this.el.style.backdropFilter = "blur(3px)";
		modalRoot.appendChild(this.el);
	}

	componentWillUnmount() {
		modalRoot.removeChild(this.el);
	}

	render() {
		return ReactDOM.createPortal(this.props.children, this.el);
	}
}

export default Modal;
