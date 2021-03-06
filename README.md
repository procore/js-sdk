# Procore JS SDK

[![CircleCI](https://circleci.com/gh/procore/js-sdk.svg?style=svg&circle-token=b24f4748ba5d14817088d02a0e14d376e1461c60)](https://circleci.com/gh/procore/js-sdk)

A node.js JS SDK for the Procore API.

Note: ECMAScript target is ES5.

# Requirements
- Node.js version 10.12 and above.
- A registered app on the [Procore Developer Portal](https://developers.procore.com/).
- A Node.js web server (such as Express) for server authentication.

## Installation
```bash
yarn add @procore/js-sdk
```
We recommend installing the package with [yarn](http://yarnpkg.com).

## Making Requests

At the core of the package is the `client` object. Clients are initialized with a
`client_id` and `client_secret` which can be obtained by signing up for
Procore's [Developer Program](https://developers.procore.com/). The `redirect_uri`
used for authorization must be specified on the `Manage App` page for the App
associated with the `client_id` in use.

The Client object exposes `#get`, `#post`, `#put`, `#patch`, and `#delete` methods to you.

```javascript
client.get({ base, version?, action?, params?, qs? }: EndpointConfig)
client.post({ base, version?, action?, params?, qs? }: EndpointConfig)
client.put({ base, version?, action?, params?, qs? }: EndpointConfig)
client.patch({ base, version?, action?, params?, qs? }: EndpointConfig)
client.delete({ base, version?, action?, params?, qs? }: EndpointConfig)
```

## Example

### JS-SDK-Sample-App

Use [js-sdk-sample-app](https://github.com/procore/js-sdk-sample-app/) as a
getting started example application.

All paths are relative to `https://{apiHostname}/{vapid|rest/{version}}/`,
the `@procore/js-sdk` will handle expanding them.

An API version may be specified in the `version` attribute to the `client[method]`
function call, or the default version is used. The default version is `v1.0` unless
otherwise configured when instantiating the `client`
(`client(Authorizer, RequestInit, { defaultVersion: 'vapid' })`).

| Example | Requested URL |
| --- | --- |
| `client.get({ base: '/example/{id}', params: { id: 42 } })` | `https://app.procore.com/rest/v1.0/example/42` |
| `client.get({ base: '/example/{id}', params: { id: 42 }, version: 'v1.1' })` | `https://app.procore.com/rest/v1.1/example/42` |
| `client.get({ base: '/example/{id}', params: { id: 42 }, version: 'vapid' })` | `https://app.procore.com/vapid/example/42` |

## Responses
A single API response contains the response body (JSON parsed), original request, and complete response: `{ body, request, response }`.
[isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) is the underlying http library, so both the request and response follow its specification. See [fetch](https://github.github.io/fetch/) for more details.

```javascript
const procore = client(authorizer);
procore.get({ base: '/projects', qs: { company_id: 1 } })
  .then({ body, request, response } => {
    console.log(body[0].name); // ACME Construction LLC.
    console.log(response.headers.get('Total')) // 865 (Total records for the resource)
  })
  .catch(error => {
    //Handle error
    console.log(error);
  });
```

or

```javascript
const procore = client(authorizer);
async function getProjects() {
  const { body, request, response } = await procore
    .get({ base: '/projects', qs: { company_id: 1 } })
    .catch(error => {
    // Handle error
    console.log(error);
  });
  console.log(body[0].name); // ACME Construction LLC.
  console.log(response.headers.get('Total')) // 865 (Total records for the resource)
}
getProjects();
```

### Formatting the response

By default, the SDK tries to format the `body` as JSON, you can control the
formatting of the `body` by passing the `formatter` option as follows:

```javascript
const procore = client(authorizer);
// Create your own formatter
function formatter(response) {
  // Your custom formatter code.
  // Response supports .text() and .json()
}

// Pass the formatter configuration
procore.get({base: '/me'}, { formatter })
```

## Tests
```
yarn && yarn test
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/procore/js-sdk. This project is
intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the
[Contributor Covenant](http://contributor-covenant.org) code of conduct.

1. Create PR with version change `npm version minor`
2. Merge PR
3. Circle Ci will release a new version of the package

Use `npm publish --dry-run` to verify the contents of your new version.

## License

The package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

## About Procore

<img
  src="https://www.procore.com/images/procore_logo.png"
  alt="Procore Logo"
  width="250px"
/>

The `@procore/js-sdk` is maintained by Procore Technologies.

Procore - building the software that builds the world.

Learn more about the #1 most widely used construction management software at [procore.com](https://www.procore.com/)
