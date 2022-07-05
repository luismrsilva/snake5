/**
 * gamepad.js
 *
 * Very basic handler for Gamepads using the Gamepad API.
 *
 * Currently, handles the first two axes on every connected gamepad as arrow keys.
 *
 * (c) 2022 by Luís Silva
 * https://github.com/luismrsilva
 **/


const GAMEPAD_BUTTON_START = 9;
const AXIS_THRESHOLD = 0.5;

function MyGamepadHandler() {
	window.addEventListener("gamepadconnected", function(e) {
		let p = e.gamepad;
		console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
			p.index,
			p.id,
			p.buttons.length,
			p.axes.length);
		if (p.mapping != "standard") {
			console.info("Gamepad mapping \"%s\" is not \"standard\", so it may not work.",
				p.mapping);
		}
	});

	window.addEventListener("gamepaddisconnected", function(e) {
		console.log("Gamepad disconnected from index %d: %s. %d buttons, %d axes.",
			e.gamepad.index,
			e.gamepad.id,
			e.gamepad.buttons.length,
			e.gamepad.axes.length);
	});

	this.last0 = undefined;
	this.last1 = undefined;
}

MyGamepadHandler.prototype.testGamePad = function(p) {
	if (p.axes.length < 2) {
		return;
	}

	if (p.axes[0] !== this.last0) {
		this.last0 = p.axes[0];
		if (this.last0 < -AXIS_THRESHOLD) {
			this.onLeft();
		} else if (this.last0 > AXIS_THRESHOLD) {
			this.onRight();
		}
	}

	if (p.axes[1] !== this.last1) {
		this.last1 = p.axes[1];
		if (this.last1 < -AXIS_THRESHOLD) {
			this.onUp();
		} else if (this.last1 > AXIS_THRESHOLD) {
			this.onDown();
		}
	}
}

MyGamepadHandler.prototype.isGamepadButtonPressed = function(p, i) {
	return p.buttons.length > i && p.buttons[i] && p.buttons[i].pressed;
}

MyGamepadHandler.prototype.handleGamePads = function() {
	if (navigator.getGamepads === "undefined") {
		// not supported
		return;
	}

	const pads = navigator.getGamepads();
	for (let i = 0; i < pads.length; i++) {
		let p = pads[i];
		if (p) {
			this.testGamePad(p);
			if (this.isGamepadButtonPressed(p, GAMEPAD_BUTTON_START)) {
				this.onTryRestart();
			}
		}
	}
}


MyGamepadHandler.prototype.onRight = function() {};
MyGamepadHandler.prototype.onUp = function() {};
MyGamepadHandler.prototype.onLeft = function() {};
MyGamepadHandler.prototype.onDown = function() {};
MyGamepadHandler.prototype.onTryRestart = function() {};

MyGamepadHandler.prototype.setOnRight = function(f) {
	this.onRight = f;
};

MyGamepadHandler.prototype.setOnUp = function(f) {
	this.onUp = f;
};

MyGamepadHandler.prototype.setOnLeft = function(f) {
	this.onLeft = f;
};

MyGamepadHandler.prototype.setOnDown = function(f) {
	this.onDown = f;
};

MyGamepadHandler.prototype.setOnTryRestart = function(f) {
	this.onTryRestart = f;
};
