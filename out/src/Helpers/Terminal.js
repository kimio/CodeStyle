'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var cmd = require('node-cmd');
class Terminal {
    static command(command, callback) {
        cmd.get(command, function (err, data, stderr) {
            callback(err, data, stderr);
        });
    }
}
exports.Terminal = Terminal;
//# sourceMappingURL=Terminal.js.map