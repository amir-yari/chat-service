# Project Convention and Styles

## File Structure

1. Each Top level component must be in a folder, beside its sub componenets.
2. If a sub component is a reusable across different top level components, it should be placed in components folder.

## File Exports

1. Exports must be as defualt export for component files. (e.g. `export default ComponentFunction`)
2. Exports must be named exports for non-component files. (e.g. `export {func1, func2, ..., funcN}`)
