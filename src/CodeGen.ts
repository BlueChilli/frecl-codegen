import * as nunjucks from 'nunjucks';
import * as esformatter from 'esformatter';
import * as esformatterJsx from 'esformatter-jsx';
import Swagger from "@frecl/swagger";
import * as existsSync from 'fs-exists-sync';

declare var __dirname;
const templateDir = __dirname + "/templates/";

// attempts to find the path first.
// If path is not found, reverts to the template dir
// in the repo.
const resolve = (path : string) : string => {
    if (existsSync(path)) {
        return path;
    } else {
        return templateDir + path;
    }

};

const getDefaultFormatterOptions = () : Object => {
    return {
        "plugins": ["esformatter-jsx"],
        "jsx": {
            "formatJSX": true, // Duh! that's the default
            "attrsOnSameLineAsTag": true, // move each attribute to its own line
            "maxAttrsOnTag": 12, // if lower or equal than 3 attributes, they will be kept on a single line
            "firstAttributeOnSameLine": true, // keep the first attribute in the same line as the tag
            "formatJSXExpressions": true, // default true, if false jsxExpressions won't be recursively formatted
            "JSXExpressionsSingleLine": true, // default true, if false the JSXExpressions might span several lines
            "alignWithFirstAttribute": false, // do not align attributes with the first tag
            "spaceInJSXExpressionContainers": " ", // default to one space. Make it empty if you don't like spaces between JSXExpressionContainers
            "removeSpaceBeforeClosingJSX": false, // default false. if true <React.Something /> => <React.Something/>
            "closingTagOnNewLine": false, // default false. if true attributes on multiple lines will close the tag on a new line
            "JSXAttributeQuotes": "", // possible values "single" or "double". Leave it as empty string if you don't want to modify the attributes' quotes
            "htmlOptions": {
                "indent_size": 2
            }
        }
    };
};

export const CreateFormattedJSXFromNJK = (templatePath : string) => {
    return (data) => {
        const renderedJSX = nunjucks.render(resolve(templatePath), data.toJS());
        return esformatter.format(renderedJSX, getDefaultFormatterOptions());
    };
};

export const getOperationIdFromSwaggerObject = (operationId : string) => {
    const foo = (swagger : Swagger) => {
        return swagger
            .getAllByOperationId(operationId)
            .find(e => e.get("requestMethod") === "post");
    };
    return foo;
};

export default function generateCode(swagger : Swagger, swaggerMapper, templateCreator) : string {
    const data = swaggerMapper.apply(this, arguments);
    return templateCreator.apply(this, [data]);
};
