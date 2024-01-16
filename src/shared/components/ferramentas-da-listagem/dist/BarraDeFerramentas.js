"use strict";
exports.__esModule = true;
exports.BarraDeFerramentas = void 0;
var material_1 = require("@mui/material");
var react_1 = require("react");
exports.BarraDeFerramentas = function (_a) {
    var _b = _a.textoDaBusca, textoDaBusca = _b === void 0 ? '' : _b, _c = _a.mostrarInputBusca, mostrarInputBusca = _c === void 0 ? false : _c, aoMudarTextoDeBusca = _a.aoMudarTextoDeBusca;
    var theme = material_1.useTheme();
    return (react_1["default"].createElement(material_1.Box, { gap: 1, marginX: 1, padding: 1, paddingX: 2, display: "flex", alignItems: "center", height: theme.spacing(5), component: material_1.Paper },
        mostrarInputBusca && (react_1["default"].createElement(material_1.TextField, { size: "small", value: textoDaBusca, placeholder: "Perquisar...", onChange: function (_a) {
                var target = _a.target;
                return aoMudarTextoDeBusca === null || aoMudarTextoDeBusca === void 0 ? void 0 : aoMudarTextoDeBusca(target.value);
            } })),
        react_1["default"].createElement(material_1.Box, { flex: 1, display: "flex", justifyContent: "end" },
            react_1["default"].createElement(material_1.Button, { color: "primary", variant: "contained", disableElevation: true, endIcon: react_1["default"].createElement(material_1.Icon, null, "add") }, "Novo"))));
};
