import Swagger from "@frecl/swagger";
export declare const CreateFormattedJSXFromNJK: (templatePath: string) => (data: any) => any;
export declare const getOperationIdFromSwaggerObject: (operationId: string) => (swagger: Swagger) => any;
export default function generateCode(swagger: Swagger, swaggerMapper: any, templateCreator: any): string;
