# Frecl Code Generator

Code generation utils for Frecl React Components.

## Example Usage

```js
import Swagger from "@frecl/swagger";
import generateCode, {getOperationIdFromSwaggerObject, CreateFormattedJSXFromNJK} from "@frecl/codegen"; 

Swagger
  .load("http://swaggerURL/here")
  .then((swagger : Swagger) => {
            const renderedJSX = generateCode(swagger, getOperationIdFromSwaggerObject("UserAccount_RequestNewPassword"), CreateFormattedJSXFromNJK("form.njk"));
  }).catch(err => console.error(err));
```
