import extend = require('xtend')
import { join } from 'path'
import { ConfigJson } from './interfaces/main'
import { transformJson, writeJson, isFile } from './utils/fs'
import { CONFIG_FILE } from './utils/config'
import { inferDefinitionName } from './utils/path'

export interface Options {
  upgrade: boolean
  cwd: string
}

const DEFAULT_CONFIG: ConfigJson = {
  dependencies: {},
  devDependencies: {},
  ambientDependencies: {}
}

export function init (options: Options) {
  const path = join(options.cwd, CONFIG_FILE)

  return isFile(path)
    .then(exists => {
      if (exists) {
        return Promise.reject(new Error(`A ${CONFIG_FILE} file already exists`))
      }

      return writeJson(path, DEFAULT_CONFIG, 2)
    })
}
