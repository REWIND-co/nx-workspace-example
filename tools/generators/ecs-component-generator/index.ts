import { Tree, formatFiles, generateFiles, joinPathFragments, applyChangesToString, ChangeType, StringChange } from '@nrwl/devkit';
import * as ts from 'typescript';
import { findNodes } from '@nrwl/workspace/src/utilities/typescript/find-nodes';
import {addImport} from '@nrwl/react/src/utils/ast-utils';
interface ECSComponentSchema {
  componentName: string;
  fileName?: string;
  registerToECS?: boolean;
  directory?:string;
}


export default async function (host: Tree, schema: ECSComponentSchema) {

  //apply our defaults and other required params
  const schemaWithDefaults = {
    componentName: schema.componentName,
    fileName: schema.fileName || schema.componentName,
    registerToECS:schema.registerToECS || true,
    directory: schema.directory || "components/"+schema.componentName
  }

  //load AST for our ECS register class.
  const registerPath = "./libs/ecs/src/lib/register.ts";
  const registerSource = host.read(registerPath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    registerPath,
    registerSource,
    ts.ScriptTarget.Latest,
    true
  );

  //define our changes
  let registerChange = appendToFunction(sourceFile, "register", `this.registerComponent(${schemaWithDefaults.componentName});`);
  let importChange = addImport(sourceFile, `import {${schemaWithDefaults.componentName}} from './${schemaWithDefaults.directory}/${schemaWithDefaults.fileName}';`)


  //apply the changes
  let changes = applyChangesToString(registerSource,[...registerChange,...importChange]);

  //write changes
  host.write(registerPath, changes);

  //gernerate the templated files.
  generateFiles(host, joinPathFragments(__dirname, './files'), './libs/ecs/src/lib/'+schemaWithDefaults.directory, {"tmpl":"",...schemaWithDefaults});
  await formatFiles(host);
}

function appendToFunction(sourceFile: ts.SourceFile, functionName:string, textToAppend:string):StringChange[]{
  const functions = findNodes(
    sourceFile,
    ts.SyntaxKind.MethodDeclaration
  ) as ts.MethodDeclaration[];

  for (const expr of functions) {
    if (expr.name.getText(sourceFile) === functionName) {
     return [
        {
          type: ChangeType.Insert,
          index: expr.getChildren()[expr.getChildCount() - 1].end - 1,
          text: textToAppend,
        },
      ];
    }
  }
  return [];
}
