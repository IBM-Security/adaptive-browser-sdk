/**
 * MIT License
 * Copyright 2020 - IBM Corp.
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions: The above copyright
 * notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import "core-js/stable";
import "regenerator-runtime/runtime";

/**
 * Start the Trusteer gathering process.
 * 
 * Given a Trusteer JavaScript snippet ID, this function will inject that
 * snippet into the webpage, initiating the gathering process. During
 * gathering, two callback functions will be called; <code>getTCSID</code>, and
 * <code>getFlow</code>. The injected Trusteer snippets will call
 * <code>getTCSID</code> to indicate that we have been given a session ID. This
 * session ID should be used for subsequent requests to the Adaptive Proxy SDK.
 * The <code>getFlow</code> function will be called to indicate that the
 * gathering process has completed.
 * @param {string} host The host of the Trusteer JavaScript snippet to inject
 * into the webpage, e.g. <code>a1bcdefgh2ijkl.cloudfront.net</code>.
 * @param {int|string} snippetID The identifier of the Trusteer JavaScript snippet
 * to inject into the webpage, e.g. <code>123456</code>.
 */
function startAdaptiveV1(host, snippetID) {
  var cookie_value = null;
  try {
    cookie_value = document.cookie;
  } catch (e) { } if (cookie_value) {
    var re = new RegExp('(?:^| )(LSESSIONID=.[^;]+)', 'i'),
      matches = null;
    var result = null;
    if (cookie_value.length > 0) {
      matches = cookie_value.match(re);
      if (matches && matches.length == 2) {
        result = matches[1];
      }
    }
  }
  var url = `https://${host}/${snippetID}/aloads.js`;
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  var extra = ['dt=login&r=' + Math.random()];
  if (result) {
    extra.push(result);
  } s.src = [url, extra.join('&')].join('?');
  document.getElementsByTagName('head')[0].appendChild(s);
  console.log('CDN snippet loaded');
}

/**
 * A promise which will be fulfilled after the <code>getTCSID</code> function is
 * called during the gathering process ({@link startAdaptive}).
 */
const _getTCSIDPromise = new Promise((resolve, _) => {
  global.getTCSID = (csid) => {
    console.log('[:getTCSID(csid)]', 'csid:', csid);
    resolve(csid);
  }
});

/**
 * A promise which will be fulfilled after the <code>getFlow</code> function is
 * called during the gathering process ({@link startAdaptive}).
 */
const _getFlowPromise = new Promise((resolve, _) => {
  global.getFlow = () => {
    console.log('[:getFlow()]');
    resolve();
  }
});

/**
 * Retrieve the session ID returned by Trusteer, after the gathering process
 * ({@link startAdaptive}) has completed.
 * 
 * @return {Promise<string>} The session ID returned by Trusteer.
 */
async function getSessionId() {
  const values = await Promise.all([_getTCSIDPromise, _getFlowPromise]);
  return values[0];
}

global.startAdaptiveV1 = startAdaptiveV1;
global.getSessionId = getSessionId;
