"use strict";
var nunjucks = require("nunjucks");
var esformatter = require("esformatter");
var existsSync = require("fs-exists-sync");
var templateDir = __dirname + "/templates/";
// attempts to find the path first.
// If path is not found, reverts to the template dir 
// in the repo.
var resolve = function (path) {
    if (existsSync(path)) {
        return path;
    }
    else {
        return templateDir + path;
    }
};
var getDefaultFormatterOptions = function () {
    return {
        "plugins": ["esformatter-jsx"],
        "jsx": {
            "formatJSX": true,
            "attrsOnSameLineAsTag": true,
            "maxAttrsOnTag": 12,
            "firstAttributeOnSameLine": true,
            "formatJSXExpressions": true,
            "JSXExpressionsSingleLine": true,
            "alignWithFirstAttribute": false,
            "spaceInJSXExpressionContainers": " ",
            "removeSpaceBeforeClosingJSX": false,
            "closingTagOnNewLine": false,
            "JSXAttributeQuotes": "",
            "htmlOptions": {
                "indent_size": 2
            }
        }
    };
};
exports.CreateFormattedJSXFromNJK = function (templatePath) {
    return function (data) {
        var renderedJSX = nunjucks.render(resolve(templatePath), data.toJS());
        return esformatter.format(renderedJSX, getDefaultFormatterOptions());
    };
};
exports.getOperationIdFromSwaggerObject = function (operationId) {
    var foo = function (swagger) {
        return swagger
            .getAllByOperationId(operationId)
            .find(function (e) { return e.get("requestMethod") === "post"; });
    };
    return foo;
};
function generateCode(swagger, swaggerMapper, templateCreator) {
    var data = swaggerMapper.apply(this, arguments);
    return templateCreator.apply(this, [data]);
}
exports.__esModule = true;
exports["default"] = generateCode;
;
