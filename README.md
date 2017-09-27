charto-ajax
===========

[![npm version](https://img.shields.io/npm/v/charto-ajax.svg)](https://www.npmjs.com/package/charto-ajax)

Reinventing the wheel with another ajax library for browsers.

This one is really simple and compact.

- One function, `ajax`.
- Three parameters, only the first is mandatory:
  - URL.
  - Options object with `method`, `headers` and `body`, like the new fetch API.
    - Additionally, an `xhr` field for passing your own `XMLHttpRequest` instance.
      Useful if you need access for monitoring its progress.
    - TypeScript definition provided: `AjaxOptions`.
  - Object with query parameters. Keys are sorted and passed (with values) through `encodeURIComponent`.
- Returns a `Promise`. Resolves after `onload` with status 200, rejects otherwise.
  - Either way, the value of the `Promise` is the `XMLHttpRequest` object.

Usage
-----

```TypeScript
import { ajax } from 'charto-ajax';

ajax(
	'https://www.google.com/',
	{ method: 'GET' },
	{ q: 'ajax' }
).then(
	(xhr) => console.log(xhr.responseText)
);
```

Why not use `fetch`?
--------------------

- This is less code than a polyfill.
- The returned `Promise` is rejected on HTTP errors like 404.
- Easy access to the `XMLHttpRequest` object during and after requests, which may be useful.
- Query parameters are handled for you. Might save a bit of code, YMMV.

License
=======

[The MIT License](https://raw.githubusercontent.com/charto/charto-ajax/master/LICENSE)

Copyright (c) 2017 BusFaster Ltd
