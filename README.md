# PINGMAN  [![Build Status](https://travis-ci.org/dopecodez/pingman.svg?branch=master)](https://travis-ci.org/dopecodez/pingman) [![Contributions](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dopecodez/pingman/issues) [![install size](https://packagephobia.now.sh/badge?p=pingman)](https://packagephobia.now.sh/result?p=pingman) [![Test Coverage](https://api.codeclimate.com/v1/badges/18e10003e2c71f0c100b/test_coverage)](https://codeclimate.com/github/dopecodez/pingman/test_coverage)

Human-friendly node wrapper for ping utility across platforms.

Add ping utility to your projects with zero dependencies. Build with latest ES6 features with native support for async/await and promises.

Newly released and actively maintained. Small unpacked size.

# INSTALLATION

```
$ npm install pingman
```

## Highlights

- [Usage](#Usage)
- [Available options](#available-options)
- [Output Model](#output-model)
- [Types](#types)
- [Extended options(Platform-specific)](#extended-options)
- [Contributing](#contributing)

## Usage

```js
const ping = require('pingman');

(async () => {
	try {
		const response = await ping('127.0.0.1');
		console.log(response);
		if(response.alive){
		//=>if pinged ip is available and responds
		}	
	} catch (error) {
		console.log(error);
		//=> 'Internal server error ...'
	}
})();
```

### Usage with options and TypeScript

```js
import ping, {pingResponse, pingOptions} from 'pingman'

(async () => {
	try {
		const options: pingOptions = {logToFile:true, numberOfEchos: 6, timeout: 2, IPV4: true};
		const response: pingResponse = await ping('www.github.com', {logToFile:true, numberOfEchos: 6, timeout: 2, IPV4: true});
		console.log(response);
		if(response.alive){
		//=>if pinged ip is available and responds
		}
	} catch (error) {
		console.log(error);
		//=> 'Internal server error ...'
	}
})();
```

## Available options

```js
let response = await ping(TargetIp, {options})
```
`TargetIp` can be any valid IPV4 host, IPV6 host or domain name.

The `options` available are based on the docs available for [Windows](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/ping), and the `man` pages for [Mac](https://ss64.com/osx/ping.html) and [Linux](https://linux.die.net/man/8/ping).

There are options which are platform-specific across all three platforms. These are included in the `extendedPingOptions` available and can be found [here](#extended-options). The general options available are abstracted across platforms and should work on all platforms. They can be found in the `pingOptions` object available in types.

| option         | Type        | On Windows    | On Unix          |
| :---           |    :----:   | :---          | :----            |
| numeric        | boolean     | -a            | -n               |
| bufferSize     | number      | -l            | -s               |
| numberOfEchos  | number      | -n            | -c               |
| TTL            | number      | -i            | -t(-m for Mac)   |
| timeout        | number      | -w            | -w(-W for Mac)   |
| IPV6           | boolean     | -6            | ping6            |
| IPV4           | boolean     | -4            | ping             |

**Note : The above options are the general options across platforms**

Please specify the `IPV6` option in case the target is an IPV6 address. While in windows it is not required, it is required in unix systems so as to invoke `ping6` command.

There are two further options available: `logToFile` and `logFilePath`. If `logToFile` is set to true, it will log the command and output to a default `log.txt` file at your project root. This is helpful in case you are trying to debug or want a more detailed idea of the output. `logFilePath` can be used in case you want a custom log file path relative to your project root.

## Output Model

```js
/**
 * Parsed response
 * @typedef {pingResponse} pingResponse
 * @param {string} host - The input IP address or HOST
 * @param {string} numeric_host - Target IP address
 * @param {boolean} alive - True for existed host
 * @param {string} output - Raw stdout from system ping
 * @param {number} time - Time (float) in ms for first successful ping response
 * @param {Array<number>} times - Array of Time (float) in ms for each ping response
 * @param {number} min - Minimum time for collection records
 * @param {number} max - Maximum time for collection records
 * @param {number} avg - Average time for collection records
 * @param {number} bufferSize - Buffer size of each packet sent to target
 * @param {string} packetLoss - Packet Losses in percent (100% -> "100.000")
 * @param {string} number - Standard deviation time for collected records
 */
```

## Types

Pingman exports some handy TypeScript types and interfaces. See the type definition for all the exported types.

## Extended options

**Note : Using the below options could cause your code to behave unexpectedly in some platforms**

| option          | Type        | On Windows    | On Unix          |
| :---            |    :----:   | :---          | :----            |
| recordRouteHops | number      | -r            | N/A              |
| hopTimestamp    | number      | -s            | N/A              |
| interval        | number      | N/A           | -i               |
| soDebugOption   | boolean     | N/A           | -d               |
| floodPing       | boolean     | N/A           | -f               |
| interfaceAddress| string      | N/A           | -I               |
| suppressLoopback| boolean     | N/A           | -L               |
| pattern         | string      | N/A           | -p               |
| quiet           | boolean     | N/A           | -q               |
| timeBeforeExit  | number      | N/A           | -W(-t for Mac)   |
| verboseOutput   | boolean     | N/A           | -v               |
| doNotFragment   | boolean     | -f            | -D for Mac       |
| srcAddr         | string      | -S            | -S for Mac       |

## Contributing

Before opening a pull request please make sure your changes follow the
[contribution guidelines][1].

[1]: https://github.com/dopecodez/pingman/blob/master/CONTRIBUTING.md

## Contributors

The project would not be the way it is without these rockstars.

<!-- readme: contributors -start --> 
<table>
<tr>
    <td align="center">
        <a href="https://github.com/dopecodez">
            <img src="https://avatars2.githubusercontent.com/u/34269105?v=4" width="100;" alt="dopecodez"/>
            <br />
            <sub><b>Govind S</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/lolPants">
            <img src="https://avatars2.githubusercontent.com/u/2358182?v=4" width="100;" alt="lolPants"/>
            <br />
            <sub><b>Jack Baron</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/JesseVermeulen123">
            <img src="https://avatars3.githubusercontent.com/u/43927190?v=4" width="100;" alt="JesseVermeulen123"/>
            <br />
            <sub><b>JessC) Vermeulen</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/chebro">
            <img src="https://avatars0.githubusercontent.com/u/54331348?v=4" width="100;" alt="chebro"/>
            <br />
            <sub><b>Sravanth C.</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: contributors -end -->
