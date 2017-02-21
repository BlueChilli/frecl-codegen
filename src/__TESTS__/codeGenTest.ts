import {Map, List} from "immutable";
import config from "./_config";
import Swagger from "@frecl/swagger";
import generateCode, {getOperationIdFromSwaggerObject, CreateFormattedJSXFromNJK} from "../CodeGen";

describe('CodeGen', () => {

    let swagger : Swagger;
    let templateDir = __dirname + "/../templates/";

    beforeAll((done : Function) => {
        Swagger
            .loadURL(config.legitSwaggerURL)
            .then((o : Swagger) => {
                swagger = o;
                done();
            });
    });

    it("Test it all", () => {
        const renderedJSX = generateCode(swagger, getOperationIdFromSwaggerObject(config.legitPostableOpId), CreateFormattedJSXFromNJK("form.njk"));
        expect(renderedJSX.length).toBeGreaterThan(0);
    });

});