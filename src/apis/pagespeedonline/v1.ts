// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-irregular-whitespace */

import {
  OAuth2Client,
  JWT,
  Compute,
  UserRefreshClient,
  GaxiosPromise,
  GoogleConfigurable,
  createAPIRequest,
  MethodOptions,
  GlobalOptions,
  BodyResponseCallback,
  APIRequestContext,
} from 'googleapis-common';

export namespace pagespeedonline_v1 {
  export interface Options extends GlobalOptions {
    version: 'v1';
  }

  interface StandardParameters {
    /**
     * Data format for the response.
     */
    alt?: string;
    /**
     * Selector specifying which fields to include in a partial response.
     */
    fields?: string;
    /**
     * API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
     */
    key?: string;
    /**
     * OAuth 2.0 token for the current user.
     */
    oauth_token?: string;
    /**
     * Returns response with indentations and line breaks.
     */
    prettyPrint?: boolean;
    /**
     * An opaque string that represents a user for quota purposes. Must not exceed 40 characters.
     */
    quotaUser?: string;
    /**
     * Deprecated. Please use quotaUser instead.
     */
    userIp?: string;
  }

  /**
   * PageSpeed Insights API
   *
   * Analyzes the performance of a web page and provides tailored suggestions to make that page faster.
   *
   * @example
   * const {google} = require('googleapis');
   * const pagespeedonline = google.pagespeedonline('v1');
   *
   * @namespace pagespeedonline
   * @type {Function}
   * @version v1
   * @variation v1
   * @param {object=} options Options for Pagespeedonline
   */
  export class Pagespeedonline {
    context: APIRequestContext;
    pagespeedapi: Resource$Pagespeedapi;

    constructor(options: GlobalOptions, google?: GoogleConfigurable) {
      this.context = {
        _options: options || {},
        google,
      };

      this.pagespeedapi = new Resource$Pagespeedapi(this.context);
    }
  }

  export interface Schema$Result {
    /**
     * The captcha verify result
     */
    captchaResult?: string | null;
    /**
     * Localized PageSpeed results. Contains a ruleResults entry for each PageSpeed rule instantiated and run by the server.
     */
    formattedResults?: {
      locale?: string;
      ruleResults?: {
        [key: string]: {
          localizedRuleName?: string;
          ruleImpact?: number;
          urlBlocks?: Array<{
            header?: {
              args?: Array<{type?: string; value?: string}>;
              format?: string;
            };
            urls?: Array<{
              details?: Array<{
                args?: Array<{type?: string; value?: string}>;
                format?: string;
              }>;
              result?: {
                args?: Array<{type?: string; value?: string}>;
                format?: string;
              };
            }>;
          }>;
        };
      };
    } | null;
    /**
     * Canonicalized and final URL for the document, after following page redirects (if any).
     */
    id?: string | null;
    /**
     * List of rules that were specified in the request, but which the server did not know how to instantiate.
     */
    invalidRules?: string[] | null;
    /**
     * Kind of result.
     */
    kind?: string | null;
    /**
     * Summary statistics for the page, such as number of JavaScript bytes, number of HTML bytes, etc.
     */
    pageStats?: {
      cssResponseBytes?: string;
      flashResponseBytes?: string;
      htmlResponseBytes?: string;
      imageResponseBytes?: string;
      javascriptResponseBytes?: string;
      numberCssResources?: number;
      numberHosts?: number;
      numberJsResources?: number;
      numberResources?: number;
      numberStaticResources?: number;
      otherResponseBytes?: string;
      textResponseBytes?: string;
      totalRequestBytes?: string;
    } | null;
    /**
     * Response code for the document. 200 indicates a normal page load. 4xx/5xx indicates an error.
     */
    responseCode?: number | null;
    /**
     * The PageSpeed Score (0-100), which indicates how much faster a page could be. A high score indicates little room for improvement, while a lower score indicates more room for improvement.
     */
    score?: number | null;
    /**
     * Base64-encoded screenshot of the page that was analyzed.
     */
    screenshot?: {
      data?: string;
      height?: number;
      mime_type?: string;
      width?: number;
    } | null;
    /**
     * Title of the page, as displayed in the browser&#39;s title bar.
     */
    title?: string | null;
    /**
     * The version of PageSpeed used to generate these results.
     */
    version?: {major?: number; minor?: number} | null;
  }

  export class Resource$Pagespeedapi {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * pagespeedonline.pagespeedapi.runpagespeed
     * @desc Runs PageSpeed analysis on the page at the specified URL, and returns a PageSpeed score, a list of suggestions to make that page faster, and other information.
     * @example
     * // Before running the sample, please make sure to run:
     * //   $ npm install googleapis
     *
     * const {google} = require('googleapis');
     * const pagespeedonline = google.pagespeedonline('v1');
     *
     * async function main() {
     *   // By default, this method will look for, in order:
     *   // 1. An environment variable set to `GOOGLE_APPLICATION_CREDENTIALS`
     *   //    pointing to a service account credential file.
     *   // 2. A GCE metadata server, present in Google Cloud products like
     *   //    Compute Engine, Kubernetes Engine, Cloud Run, etc.
     *   // 3. A local OAuth token written by the Cloud SDK, obtained by running
     *   //    `gcloud auth application-default login`. This is preferred for local
     *   //    development.
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await pagespeedonline.pagespeedapi.runpagespeed({
     *     // Indicates if third party resources should be filtered out before PageSpeed analysis.
     *     filter_third_party_resources: 'placeholder-value',
     *     // The locale used to localize formatted results
     *     locale: '[a-zA-Z]+(_[a-zA-Z]+)?',
     *     // A PageSpeed rule to run; if none are given, all rules are run
     *     rule: '[a-zA-Z]+',
     *     // Indicates if binary data containing a screenshot should be included
     *     screenshot: 'placeholder-value',
     *     // The analysis strategy to use
     *     strategy: 'placeholder-value',
     *     // The URL to fetch and analyze
     *     url: '(?i)http(s)?://.*',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "captchaResult": "my_captchaResult",
     *   //   "formattedResults": {},
     *   //   "id": "my_id",
     *   //   "invalidRules": [],
     *   //   "kind": "my_kind",
     *   //   "pageStats": {},
     *   //   "responseCode": 0,
     *   //   "score": 0,
     *   //   "screenshot": {},
     *   //   "title": "my_title",
     *   //   "version": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias pagespeedonline.pagespeedapi.runpagespeed
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {boolean=} params.filter_third_party_resources Indicates if third party resources should be filtered out before PageSpeed analysis.
     * @param {string=} params.locale The locale used to localize formatted results
     * @param {string=} params.rule A PageSpeed rule to run; if none are given, all rules are run
     * @param {boolean=} params.screenshot Indicates if binary data containing a screenshot should be included
     * @param {string=} params.strategy The analysis strategy to use
     * @param {string} params.url The URL to fetch and analyze
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    runpagespeed(
      params?: Params$Resource$Pagespeedapi$Runpagespeed,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Result>;
    runpagespeed(
      params: Params$Resource$Pagespeedapi$Runpagespeed,
      options: MethodOptions | BodyResponseCallback<Schema$Result>,
      callback: BodyResponseCallback<Schema$Result>
    ): void;
    runpagespeed(
      params: Params$Resource$Pagespeedapi$Runpagespeed,
      callback: BodyResponseCallback<Schema$Result>
    ): void;
    runpagespeed(callback: BodyResponseCallback<Schema$Result>): void;
    runpagespeed(
      paramsOrCallback?:
        | Params$Resource$Pagespeedapi$Runpagespeed
        | BodyResponseCallback<Schema$Result>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Result>,
      callback?: BodyResponseCallback<Schema$Result>
    ): void | GaxiosPromise<Schema$Result> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Pagespeedapi$Runpagespeed;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Pagespeedapi$Runpagespeed;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://www.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/pagespeedonline/v1/runPagespeed').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['url'],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Result>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Result>(parameters);
      }
    }
  }

  export interface Params$Resource$Pagespeedapi$Runpagespeed
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Indicates if third party resources should be filtered out before PageSpeed analysis.
     */
    filter_third_party_resources?: boolean;
    /**
     * The locale used to localize formatted results
     */
    locale?: string;
    /**
     * A PageSpeed rule to run; if none are given, all rules are run
     */
    rule?: string[];
    /**
     * Indicates if binary data containing a screenshot should be included
     */
    screenshot?: boolean;
    /**
     * The analysis strategy to use
     */
    strategy?: string;
    /**
     * The URL to fetch and analyze
     */
    url?: string;
  }
}
