// This file is part of charto-ajax, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

export interface AjaxOptions {
	method?: string;
	headers?: { [key: string]: string | number };
	body?: string | Uint8Array | ArrayBuffer | Blob | Document | null;
	xhr?: XMLHttpRequest;
}

/** Send a GET request, return a promise resolving to (after onload and status 200) or
  * rejected with (otherwise) the XMLHttpRequest object.
  * @param url Remote URL.
  * @param options Options object matching the new fetch API: method, headers and body.
  * @param params Optional query parameters appended to the URL. */

export function ajax(url: string, options: AjaxOptions = {}, params?: { [key: string]: string | number }) {
	const result = new Promise((resolve: (xhr: XMLHttpRequest) => void, reject: (xhr: XMLHttpRequest) => void) => {
		const xhr = options.xhr || new XMLHttpRequest();

		xhr.onload = () => xhr.status == 200 ? resolve(xhr) : reject(xhr);
		xhr.onerror = () => reject(xhr);

		if(params) {
			// Sort and encode query parameters.
			const query = Object.keys(params).sort().map((key: string) =>
				encodeURIComponent(key) + '=' + encodeURIComponent('' + params[key])
			).join('&');

			// If parameters exist, append them after a ? or &.
			if(query) url += (url.indexOf('?') < 0 ? '?' : '&') + query;
		}

		xhr.open(options.method || 'get', url, true);

		for(let key of Object.keys(options.headers || {})) {
			xhr.setRequestHeader(key, '' + options.headers![key]);
		}

		xhr.send(options.body || null);
	});

	return(result);
}
