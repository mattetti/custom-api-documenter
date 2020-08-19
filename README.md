# custom-api-documenter a fork of @microsoft/api-documenter

This tool can be used to generate an online API reference manual for your TypeScript library.
It reads the *.api.json data files produced by [API Extractor](https://api-extractor.com/),
and then generates files in [Markdown](https://en.wikipedia.org/wiki/Markdown) format with some HTML.

For usage information, see the
[Generating Docs](https://api-extractor.com/pages/setup/generating_docs/) article from the API Extractor
documentation.

## Customization

The markdown renderer was customized to better render API docs using
[hugo](https://gohugo.io/) and to allow for a different file structure.

Custom json options not available in the original api-documenter markdown:

- uriRoot: so the doc can generate links for api docs not hosted at the root of the domain.
- onlyPackagesStartingWith: a string used to filter packages to document, useful when you want to publish only document some packages.


```
{
  "outputTarget": "markdown",
  "newlineKind": "lf",
  "uriRoot": "/apis",
  "onlyPackagesStartingWith": "@mything"
}
```
