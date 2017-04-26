# Native UI Select Angular component
## ng2-select [![npm version](https://badge.fury.io/js/ng2-select-hoveytech.svg)](http://badge.fury.io/js/ng2-select-hoveytech) [![npm downloads](https://img.shields.io/npm/dm/ng2-select-hoveytech.svg)](https://npmjs.org/ng2-select-hoveytech)[![slack](https://ngx-slack.herokuapp.com/badge.svg)](https://ngx-slack.herokuapp.com)

[![Build Status](https://travis-ci.org/hoveytech/ng2-select.svg?branch=development)](https://travis-ci.org/hoveytech/ng2-select-hoveytech)

#### <span style="color: blue;">NOTE: This is a port of ng2-select library by [valor-software](https://github.com/valor-software). due to this [issue](https://github.com/valor-software/ng2-select/issues/769).</span>

## Quick start

1. A recommended way to install ***ng2-select-hoveytech*** is through [npm](https://www.npmjs.com/search?q=ng2-select-hoveytech) package manager using the following command:

  `npm i ng2-select-hoveytech --save`

## API

### Properties

  - `items` - (`Array<any>`) - Array of items from which to select. Should be an array of objects with `id` and `text` properties.
  As convenience, you may also pass an array of strings, in which case the same string is used for both the ID and the text.
  Items may be nested by adding a `children` property to any item, whose value should be another array of items. Items that have children may omit having an ID.
  If `items` are specified, all items are expected to be available locally and all selection operations operate on this local array only.
  If omitted, items are not available locally, and the `query` option should be provided to fetch data.
  - `active` (`?Array<any>`) - selection data to set. This should be an object with `id` and `text` properties in the case of input type 'Single',
  or an array of such objects otherwise. This option is mutually exclusive with value.
  - `allowClear` (`?boolean=false`) (*not yet supported*) - Set to `true` to allow the selection to be cleared. This option only applies to single-value inputs.
  - `placeholder` (`?string=''`) - Placeholder text to display when the element has no focus and selected items.
  - `disabled` (`?boolean=false`) - When `true`, it specifies that the component should be disabled.
  - `multiple` - (`?boolean=false`) - Mode of this component. If set `true` user can select more than one option.
  - `dropdown` (`?boolean=true`) - Set to false if you want the dropup class applied.

  This option only applies to single-value inputs, as multiple-value inputs don't have the search input in the dropdown to begin with.

### Events

  - `data` - it fires during all events of this component; returns `Array<any>` - current selected data
  - `selected` - it fires after a new option selected; returns object with `id` and `text` properties that describes a new option.
  - `removed` - it fires after an option removed; returns object with `id` and `text` properties that describes a removed option.
  - `typed` - it fires after changing of search input; returns `string` with that value.

# Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/hoveytech/ng2-select/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/hoveytech/ng2-select/blob/master/LICENSE) file for the full text)
