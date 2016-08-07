'use strict'

/* generation options */
let jsdocDefinitions = [
  {
    name: 'files', alias: 'f', type: String, multiple: true, defaultOption: true,
    description: 'A list of jsdoc explain files (or glob expressions) to parse for documentation.',
    typeLabel: '[underline]{file} ...'
  },
  {
    name: 'source', type: String,
    description: 'A string containing source code to parse for documentation.'
  },
  {
    name: 'configure',
    alias: 'c',
    type: String,
    typeLabel: '[underline]{file}',
    description: 'Path to a jsdoc configuration file, passed directly to `jsdoc -c`.'
  },
  { name: 'html', type: Boolean, description: "Enable experimental parsing of .html files. When specified, configuration supplied via --conf is ignored." },
]

let jsdoc2mdDefinitions = [
  {
    name: 'help', description: 'Print usage information',
    alias: 'h', type: Boolean
  },
  {
    name: 'config', description: 'Print the stored config and exit',
    type: Boolean
  },
  { name: 'json', type: Boolean },
  { name: 'jsdoc', type: Boolean },
  { name: 'version', type: Boolean },
  { name: 'clear', type: Boolean }
]

const dmdDefinitions = [
  { name: 'template', alias: 't', type: String, typeLabel: '<file>',
    description: 'A custom handlebars template file to insert documentation into. The default template is `{{>main}}`.'
  },
  {
    name: 'private', type: Boolean,
    description: 'Include identifiers marked @private in the output'
  },
  { name: 'heading-depth', type: Number, alias: 'd',
    description: 'root heading depth, defaults to 2 (`##`).'
  },
  { name: 'plugin', type: String, typeLabel: '<modules>', multiple: true,
    description: 'Use an installed package containing helper and/or partial overrides'
  },
  { name: 'helper', type: String, typeLabel: '<files>', multiple: true,
    description: 'handlebars helper files to override or extend the default set'
  },
  { name: 'partial', type: String, typeLabel: '<files>', multiple: true,
    description: 'handlebars partial files to override or extend the default set'
  },
  { name: 'example-lang', type: String, alias: 'l',
    description: 'Specifies the default language used in @example blocks (for syntax-highlighting purposes). In gfm mode, each @example is wrapped in a fenced-code block. Example usage: `--example-lang js`. Use the special value `none` for no specific language. While using this option, you can override the supplied language for any @example by specifying the `@lang` subtag, e.g `@example @lang hbs`. Specifying `@example @lang off` will disable code blocks for that example.'
  },
  { name: 'name-format', type: Boolean,
    description: 'Format identifier names as code'
  },
  { name: 'no-gfm', type: Boolean,
    description: 'By default, dmd generates github-flavoured markdown. Not all markdown parsers render gfm correctly. If your generated docs look incorrect on sites other than Github (e.g. npmjs.org) try enabling this option to disable Github-specific syntax. '
  },
  { name: 'separators', type: Boolean,
    description: 'Put <hr> breaks between identifiers. Improves readability on bulky docs. '
  },
  { name: 'module-index-format', type: String, alias: 'm',
    description: 'none, grouped, table, dl'
  },
  { name: 'global-index-format', type: String, alias: 'g',
    description: 'none, grouped, table, dl'
  },
  { name: 'param-list-format', type: String, alias: 'p',
    description: "Two options to render parameter lists: 'list' or 'table' (default). Table format works well in most cases but switch to list if things begin to look crowded / squashed. "
  },
  { name: 'property-list-format', type: String, alias: 'r',
    description: 'list, table'
  },
  { name: 'member-index-format', type: String,
    description: 'grouped, list'
  }
]

/* mix in the jsdoc-parse and dmd options */
let definitions = jsdocDefinitions
  .map(def => {
    def.group = 'jsdoc'
    return def
  })
  .concat(jsdoc2mdDefinitions.map(def => {
    def.group = 'jsdoc2md'
    return def
  }))
  .concat(dmdDefinitions.map(function (def) {
    def.group = 'dmd'
    return def
  }))

module.exports = {
  definitions: definitions,
  usageSections: [
    {
      header: 'jsdoc-to-markdown',
      content: 'Generates markdown documentation from jsdoc-annotated source code.'
    },
    {
      header: 'Synopsis',
      content: [
        {
          cmmd: '$ jsdoc2md [<options>] [bold]{--files} [underline]{file} ...',
          desc: '[italic]{Generate documentation (dmd output)}'
        },
        {
          cmmd: '$ jsdoc2md [<jsdoc-options>] [bold]{--jsdoc}  [underline]{file} ...',
          desc: '[italic]{Get raw jsdoc data (jsdoc-api output)}'
        },
        {
          cmmd: '$ jsdoc2md [bold]{--json} [underline]{file} ...',
          desc: '[italic]{Get template data (jsdoc-parse output)}'
        },
        {
          cmmd: '$ jsdoc2md [bold]{--help}'
        },
        {
          cmmd: '$ jsdoc2md [bold]{--config}'
        },
        {
          cmmd: '$ jsdoc2md [bold]{--stats}'
        }
      ]
    },
    {
      header: 'jsdoc options',
      content: 'Options regarding the input source code, passed directly to jsdoc.'
    },
    {
      optionList: jsdocDefinitions
    },
    {
      header: 'jsdoc2md options',
      content: 'Options relating specifically to this tool.'
    },
    {
      optionList: jsdoc2mdDefinitions
    },
    {
      header: 'dmd',
      content: 'These options affect how the markdown output looks.'
    },
    {
      optionList: definitions,
      group: 'dmd'
    },
    {
      content: [
        {
          col1: 'Project repositories:',
          col2: '[underline]{https://github.com/jsdoc2md/jsdoc-to-markdown}'
        },
        {
          col1: '',
          col2: '[underline]{https://github.com/jsdoc2md/jsdoc-api}'
        },
        {
          col1: '',
          col2: '[underline]{https://github.com/jsdoc2md/jsdoc-parse}'
        },
        {
          col1: '',
          col2: '[underline]{https://github.com/jsdoc2md/dmd}'
        }
      ]
    }
  ]
}