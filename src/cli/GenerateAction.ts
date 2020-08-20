// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import * as path from 'path';

import { ApiDocumenterCommandLine } from './ApiDocumenterCommandLine';
import { BaseAction } from './BaseAction';
import { DocumenterConfig } from '../documenters/DocumenterConfig';

import { ApiModel } from '@microsoft/api-extractor-model';
import { FileSystem } from '@rushstack/node-core-library';
import { MarkdownDocumenter } from '../documenters/MarkdownDocumenter';

export class GenerateAction extends BaseAction {
  public constructor(parser: ApiDocumenterCommandLine) {
    super({
      actionName: 'generate',
      summary: 'generate markdown documentation based on a config file',
      documentation:
        'Config file driven mode of operation for API Documenter' +
        ' Set --config --input-folder and --output-folder.'
    });
  }

  protected onExecute(): Promise<void> {
    // override
    this.setConfigPath();
    let configFilePath: string = path.join(process.cwd(), this.configPath);

    // First try the current folder
    if (!FileSystem.exists(configFilePath)) {
      // Otherwise try the standard "config" subfolder
      configFilePath = path.join(process.cwd(), 'config', DocumenterConfig.FILENAME);
      if (!FileSystem.exists(configFilePath)) {
        throw new Error(
          `Unable to find ${DocumenterConfig.FILENAME} in the current folder or in a "config" subfolder`
        );
      }
    }

    const documenterConfig: DocumenterConfig = DocumenterConfig.loadFile(configFilePath);

    const apiModel: ApiModel = this.buildApiModel();

    if (documenterConfig.configFile.outputTarget === 'markdown') {
      const markdownDocumenter: MarkdownDocumenter = new MarkdownDocumenter(apiModel, documenterConfig);
      markdownDocumenter.generateFiles(this.outputFolder);
    } else {
      throw new Error(`output target ${documenterConfig.configFile.outputTarget} is not supported in this version of api-documenter.`);
    }

    return Promise.resolve();
  }
}
