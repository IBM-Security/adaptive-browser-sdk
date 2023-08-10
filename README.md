![Type](https://img.shields.io/badge/Type-JavaScript-blue.svg)
[![npm](https://img.shields.io/badge/npm-adaptive_browser_sdk-blue)](https://www.npmjs.com/package/@ibm-verify/adaptive-browser)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

# IBM Security Verify Adaptive Browser SDK

The purpose of the Browser SDK is to enable a developer to initiate a collection process, and verify the collected data. The collection process consists of the SDK collection device information, which will be assigned to a session identifier, and evaluated at later points in time. This SDK is to be used in conjunction with the Proxy SDK, which will be responsible for evaluating the session identifier during authentication.

## Prerequisites
- [Onboard your application](https://docs.verify.ibm.com/verify/docs/on-boarding-a-native-application).
- Configure and set up the Proxy SDK on your server. Check out the [Adding the proxy SDK to an application](https://docs.verify.ibm.com/verify/docs/developing-a-native-web-application#add-the-proxy-sdk-to-the-application) to get started.

##  Installation
After setting up the Proxy SDK on your server, you can install the IBM Security Verify Adaptive Browser SDK by cloning this repository, or installing from [npm](https://www.npmjs.com/package/@ibm-verify/adaptive-browser).

```bash
npm install @ibm-verify/adaptive-browser
```

## Overview

| Function | Async | Return |
|----------------|-------|--------|
| [`startAdaptiveV1(host, snippetID)`](#start-the-collection-process) | ✅ | `undefined`
| [`getSessionId()`](#get-the-session-id-after-collection) | ✅ | `Promise<Object>`

## Usage

### Reference the Browser SDK in your application

```html
<script src="/static/adaptive-v1.js"></script>
```

Alternatively, the minified version:
```html
<script src="/static/adaptive-v1.min.js"></script>
```

### Start the collection process

Starts the Trusteer collection process. This will gather device information, and assign it to a session ID under the hood. To obtain this session ID, see [Get the session ID after collection](#get-the-session-id-after-collection).

#### `startAdaptiveV1(host, snippetID)`

| Parameter   | Type     | Description |
|-------------|----------|-------------|
| `host`      | `string` | The host of the Trusteer JavaScript snippet received during [application onboarding](https://pages.github.ibm.com/ibm-security/iam-docs/adaptive/native-applications/onboarding-a-native-app/onboarding-native-apps-using-adaptive-access).
| `snippetID` | `int` \| `string` | The Trusteer snippet ID received during [application onboarding](https://pages.github.ibm.com/ibm-security/iam-docs/adaptive/native-applications/onboarding-a-native-app/onboarding-native-apps-using-adaptive-access).

#### Example usage

```html
<script src="/static/adaptive-v1.js"></script>
<script>startAdaptiveV1('a1bcdefgh2ijkl.cloudfront.net', 123456);</script>
```

### Get the session ID after collection

Retrieves the session ID once the [collection process](#start-the-collection-process) has completed. This function returns a promise, which is fulfilled after the collection process completes.

Note; it is [`startAdaptiveV1(host, snippetID)`](#start-the-collection-process) that eventually fulfills the returned promise. Therefore, [`startAdaptiveV1(host, snippetID)`](#start-the-collection-process) must be called in order to resolve the returned promise.

#### `getSessionId()`


#### Example usage

```html
<script>
  getSessionId().then((sessionId) => {
    console.log(`Gathering has completed. Session ID received: ${sessionId}`);
  });
</script>
```

## License

```
MIT License
Copyright (c) 2019, 2022 IBM

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright
notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
