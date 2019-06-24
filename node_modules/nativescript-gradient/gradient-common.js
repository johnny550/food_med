"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stack_layout_1 = require("tns-core-modules/ui/layouts/stack-layout");
var color_1 = require("tns-core-modules/color");
var view_1 = require("tns-core-modules/ui/core/view");
var directionProperty = new view_1.Property({
    name: "direction",
    defaultValue: "to bottom"
});
var borderRadiusProperty = new view_1.Property({
    name: "borderRadius",
    defaultValue: 0
});
var colorsProperty = new view_1.Property({
    name: "colors"
});
var Gradient = (function (_super) {
    __extends(Gradient, _super);
    function Gradient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Gradient.prototype[directionProperty.setNative] = function (value) {
        if (value) {
            var sanitizedValue = value.toLowerCase().trim();
            if (Gradient.isValidDirection(sanitizedValue)) {
                this.updateDirection(sanitizedValue);
            }
        }
    };
    Gradient.prototype[borderRadiusProperty.setNative] = function (value) {
        if (value) {
            this.updateBorderRadius(value);
        }
    };
    Gradient.prototype[colorsProperty.setNative] = function (value) {
        if (value) {
            var _colors = [];
            var _colorsCodes = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);
            for (var _i = 0, _colorsCodes_1 = _colorsCodes; _i < _colorsCodes_1.length; _i++) {
                var _colorCode = _colorsCodes_1[_i];
                if (color_1.Color.isValid(_colorCode.trim())) {
                    _colors.push(new color_1.Color(_colorCode.trim()));
                }
            }
            this.updateColors(_colors);
        }
    };
    Gradient.isValidDirection = function (value) {
        return GradientDirection.TO_BOTTOM === value
            || GradientDirection.TO_TOP === value
            || GradientDirection.TO_LEFT === value
            || GradientDirection.TO_RIGHT === value
            || GradientDirection.TO_BOTTOM_LEFT === value
            || GradientDirection.TO_TOP_LEFT === value
            || GradientDirection.TO_BOTTOM_RIGHT === value
            || GradientDirection.TO_TOP_RIGHT === value;
    };
    return Gradient;
}(stack_layout_1.StackLayout));
exports.Gradient = Gradient;
directionProperty.register(Gradient);
borderRadiusProperty.register(Gradient);
colorsProperty.register(Gradient);
var GradientDirection;
(function (GradientDirection) {
    GradientDirection.TO_BOTTOM = "to bottom";
    GradientDirection.TO_TOP = "to top";
    GradientDirection.TO_RIGHT = "to right";
    GradientDirection.TO_LEFT = "to left";
    GradientDirection.TO_BOTTOM_LEFT = "to bottom left";
    GradientDirection.TO_TOP_LEFT = "to top left";
    GradientDirection.TO_BOTTOM_RIGHT = "to bottom right";
    GradientDirection.TO_TOP_RIGHT = "to top right";
})(GradientDirection = exports.GradientDirection || (exports.GradientDirection = {}));
//# sourceMappingURL=gradient-common.js.map