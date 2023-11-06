"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRotationFromV = exports.GetDistance = void 0;
function GetDistance(p1, p2) {
    var vx = p1.x - p2.x;
    var vy = p1.y - p2.y;
    return Math.sqrt((vx * vx) + (vy * vy));
}
exports.GetDistance = GetDistance;
function GetRotationFromV(v) {
    var radians = Math.atan2(v.y, v.x);
    var angle = (radians > 0 ? radians : (2 * Math.PI + radians)) * 360 / (2 * Math.PI);
    if (angle >= 315 || angle <= 45) {
        return 3 /* Rotation.Left */;
    }
    ;
    if (angle > 45 && angle < 135) {
        return 1 /* Rotation.Top */;
    }
    ;
    if (angle >= 135 && angle <= 225) {
        return 2 /* Rotation.Right */;
    }
    ;
    if (angle > 225 && angle < 315) {
        return 0 /* Rotation.Down */;
    }
}
exports.GetRotationFromV = GetRotationFromV;
//# sourceMappingURL=geometry.js.map