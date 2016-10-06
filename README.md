# a11y-testing

### Front End Specific Dependecies
- [Nodejs v4.3.2](http://nodejs.org/)
- [NPM v2.14.12](https://www.npmjs.com/)
- [Gulpjs v3.9.1](http://gulpjs.com)

### Installation and Startup

Once all the dependencies are installed and running follow these steps to get the local environment up and running.

1. `npm install`
2. `Create config.json file (see below)`
3. `start gulp (see below)`


#### Config.json
This file is not in the repo and needs to be created and saved in the root where the gulp.babel.js file is located.

```javascript
{
    "env":{
        "dev":"./src/",
        "wwwroot":"./dist/"
    },
    "a11y": {
        "urls":[
            "http://localhost:9000"
        ],
        "enabled": true,
        "include": "",
        "exclude": ""
    }
}
```

##### Config Definitions

| Object | Type | Definition |
| ------------- | ------------- |-------------|
| **env.dev** | String | path to your src folder in your local files "Clone'd Repo" |
| **env.wwwroot** | String | path to your dist folder |
| **a11y.urls** |  Array | the sites/urls that you want to test for accessibility issues while coding |
| **a11y.enabled** | Boolean | enabled or disables the a11y testing engine |
| **a11y.include** | String | html "selector" that you want to include into the scan (i.e. .content will only check those matching the selector .content) |
| **a11y.exclude** | String | html "selector" that excludes that selector from the scan (i.e. .navigation will skip the matching selector from the scan) |

#### Gulp Tasks
| Command  | Type | Purpose |
| ------------- | ------------- |-------------|
| **gulp** | Main | Runs all sub tasks needed but does not run a local web server via browsersync. |
| **gulp serve** | Main | Runs all sub tasks needed and launches a local web server via browsersync at http://localhost:9000 |
| **gulp serve:docs** | Main | Generates a jsdoc and launches a local web server via browsersync at http://localhost:9000 (no watch) |
| **clean** | Utility | Deletes all the JS, CSS and Views from Inetpub |