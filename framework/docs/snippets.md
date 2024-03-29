# Snippets
A snippet allows you to generate a bunch of code by just writing a few letters, for example:
![frcomp snippet example](../assets/snippet-example.gif)

The following guide explains how to setup the snippets for Framework. This is specific to VSCode.


## Setup

1. Press `ctrl + shift + P` to open up the command palette.
2. Type "snippets", and click on "Snippets: Configure User Snippets".
3. Click "New Global Snippets File".
4. Paste the following code into the file.
    ```json
    {
      "Framework Component Long": {
        "scope": "javascript,typescript",
        "prefix": "frcompl",
        "body": [
          "import { BaseComponent, html, converter } from 'framework';",
          "",
          "export class $TM_FILENAME_BASE extends BaseComponent {",
          "\tconstructor() {",
          "\t\tsuper();",
          "\t\t// this.attr1 = this.attr(...) // retrieve an attribute of the component",
          "\t\t// this.state1 = this.state(...) // create some local state",
          "\t\t// this.slice1 = this.slice(...) // subscribe to some precreated global state",
          "\t\t// this.query1 = this.query(...) // subscribe to some server state",
          "\t\t// this.mutation1 = this.mutation(...) // subscribe to some action that mutates server",
          "\t}",
          "",
          "\t/**",
          "\t * REQUIRED",
          "\t * Returns html to be rendered to the DOM",
          "\t * @returns html",
          "\t */",
          "\trender() {",
          "\t\t// Add css classes to the root BaseComponent element - will normally be something like d-block (display: block), w-100 (width: 100%), etc"
          "\t\tthis.rootCSSClasses('w-100');",
          "",
          "\t\treturn html`",
          "\t\t\t<div>${0:$TM_FILENAME_BASE}</div>",
          "\t\t`;",
          "\t}",
          "",
          "\t/**",
          "\t * OPTIONAL, delete if not required",
          "\t * Hydrates the html that was rendered onto the DOM",
          "\t */",
          "\thydrate() {",
          "",
          "\t}",
          "",
          "\t/**",
          "\t * OPTIONAL, delete if not required",
          "\t * Additional logic that should be run after rendering",
          "\t */",
          "\teffect() {",
          "",
          "\t}",
          "",
          "\t/**",
          "\t * OPTIONAL, delete if not required",
          "\t * Any cleanup logic that should be run before unmouting of the component",
          "\t */",
          "\tcleanup() {",
          "",
          "\t}",
          "}",
          "",
        ],
        "description": "Create a framework component with all methods and comments"
      },
      "Framework Component": {
        "scope": "javascript,typescript",
        "prefix": "frcomp",
        "body": [
          "import { BaseComponent, html, converter } from 'framework';",
          "",
          "export class $TM_FILENAME_BASE extends BaseComponent {",
          "\tconstructor() {",
          "\t\tsuper();",
          "\t}",
          "",
          "\trender() {",
          "\t\tthis.rootCSSClasses('w-100');",
          "",
          "\t\treturn html`",
          "\t\t\t<div>${0:$TM_FILENAME_BASE}</div>",
          "\t\t`;",
          "\t}",
          "",
          "\thydrate() {",
          "",
          "\t}",
          "}",
          "",
        ],
        "description": "Create a minimal framework component"
      },
      "Framework State": {
        "scope": "javascript,typescript",
        "prefix": "frstate",
        "body": [
          "import { StateSlice } from 'framework';",
          "",
          "export class $TM_FILENAME_BASE extends StateSlice {",
          "\tconstructor() {",
          "\t\tconst state = {",
          "\t\t\t$0",
          "\t\t};",
          "",
          "\t\tsuper(state);",
          "\t}",
          "",
          "\t/* create methods below to act upon the state */",
          "}",
          ""
        ],
        "description": "Create a framework StateSlice subclass"
      },
      "Framework Query Long": {
        "scope": "javascript,typescript",
        "prefix": "frqueryl",
        "body": [
          "import { api } from '@/api/api';",
          "",
          "export const $TM_FILENAME_BASE = (${1:optionalarguments}) => ({",
          "\tqueryFn: () => api.get('${2:api-route}').json(),",
          "\ttag: '${3}', // enter identity tag",
          "\ttransformer: (data) => { return ${4:data}; } // OPTIONAL: change return as needed, or delete",
          "});",
          ""
        ],
        "description": "Setup a framework query with comments"
      },
      "Framework Query": {
        "scope": "javascript,typescript",
        "prefix": "frquery",
        "body": [
          "import { api } from '@/api/api';",
          "",
          "export const $TM_FILENAME_BASE = (${1:optionalarguments}) => ({",
          "\tqueryFn: () => api.get('${2:api-route}').json(),",
          "\ttag: '${3}',",
          "\ttransformer: (data) => ${4:data},",
          "});",
          ""
        ],
        "description": "Setup a framework query"
      },
      "Framework Mutation Long": {
        "scope": "javascript,typescript",
        "prefix": "frmutl",
        "body": [
          "import { api } from '@/api/api';",
          "",
          "export const $TM_FILENAME_BASE = (${2:optionalarguments}) => ({",
          "\tmutationFn: (data) => api.${1|post,put,patch,delete,get|}('${3:api-route}', { json: data }).json(),",
          "\tinvalidateTags: ['${4}'], // enter list of QUERY tags to invalidate",
          "\ttransformer: (data) => { return ${5:data}; } // OPTIONAL: change return as needed, or delete",
          "});",
          ""
        ],
        "description": "Setup a framework mutation with comments"
      },
      "Framework Mutation": {
        "scope": "javascript,typescript",
        "prefix": "frmut",
        "body": [
          "import { api } from '@/api/api';",
          "",
          "export const $TM_FILENAME_BASE = (${2:optionalarguments}) => ({",
          "\tmutationFn: (data) => api.${1|post,put,patch,delete,get|}('${3:api-route}', { json: data }).json(),",
          "\tinvalidateTags: ['${4}'],",
          "\ttransformer: (data) => ${5:data},",
          "});",
          ""
        ],
        "description": "Setup a framework mutation"
      }
    }
    ```

## Snippets
Once you've done the above. You can go to any javascript file and type the following prefixes, and vscode will automatically bring the associated boiletplate code in for you.

`frcomp` - Create a minimal framework component with only the essential methods and no comments  
`frcompl` - Create a framework component with all methods and all comments  
`frstate` - Create a framework StateSlice subclass  
`frquery` - Create a minimal framework query with no comments  
`frqueryl` - Create a framework query with all comments  
`frmut` - Create a minimal framework mutation with no comments  
`frmutl` - Create a framework mutation with all comments  