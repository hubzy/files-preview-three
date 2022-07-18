# files-preview: a simple static HTTP server

`files-preview` is a simple, zero-configuration command-line static HTTP server.  It is powerful enough for production usage, but it's simple and hackable enough to be used for testing, local development and learning.


## Installation:


#### Globally via `npm`

```bash
npm install --global files-preview
```

This will install `files-preview` globally so that it may be run from the command line anywhere.

#### As a dependency in your `npm` package:

```bash
npm install files-preview
```

*安装完之后替换`lib`文件，将`lib`文件夹拷贝后，macOS下替换` /usr/local/lib/node_modules/files-preview/` ，目录下的`lib`文件即可*

```bash
npm run push
```




## Usage:

```bash
 files-preview [path] [options]
```

`[path]` defaults to `./public` if the folder exists, and `./` otherwise.

*Now you can visit http://localhost:8080 to view your server*

**Note:** Caching is on by default. Add `-c-1` as an option to disable caching.

## Available Options:

| Command         | 	Description         | Defaults  |
| -------------  |-------------|-------------|
|`-p` or `--port` |Port to use. Use `-p 0` to look for an open port, starting at 8080. It will also read from `process.env.PORT`<br/>.端口使用。使用-p 0查找开放端口，从8080开始。它还将从process.env.PORT中读取。 |8080 |
|`-a`   |Address to use / 使用的地址 |0.0.0.0|
|`-d`     |Show directory listings / 显示目录列表 |`true` |
|`-i`   | Display autoIndex / 显示器自动索引 | `true` |
|`-g` or `--gzip` |When enabled it will serve `./public/some-file.js.gz` in place of `./public/some-file.js` when a gzipped version of the file exists and the request accepts gzip encoding. If brotli is also enabled, it will try to serve brotli first.<br />启用后，当文件的gzipped版本存在并且请求接受gzip编码时，它将提供./public/some-file.js.gz代替./public/some-file.js。如果brotli也启用了，它将尝试先提供brotli。|`false`|
|`-b` or `--brotli`|When enabled it will serve `./public/some-file.js.br` in place of `./public/some-file.js` when a brotli compressed version of the file exists and the request accepts `br` encoding. If gzip is also enabled, it will try to serve brotli first.<br />启用后，当文件的brotli压缩版本存在并且请求接受br编码时，它将使用./public/some-file.js.br代替./public/some-file.js。如果gzip也已启用，它将尝试先提供brotli。 |`false`|
|`-e` or `--ext`  |Default file extension if none supplied / 默认文件扩展名（如果没有提供） |`html` |
|`-s` or `--silent` |Suppress log messages from output / 从输出中抑制日志消息  | |
|`--cors` |Enable CORS via the `Access-Control-Allow-Origin` header<br />通过Access-Control-Allow-Origin标头启用CORS 跨域  | |
|`-o [path]` |Open browser window after starting the server. Optionally provide a URL path to open. e.g.: -o /other/dir/<br />启动服务器后打开浏览器窗口。可选地提供要打开的URL路径，例如：-o /other/dir/ | |
|`-c` |Set cache time (in seconds) for cache-control max-age header, e.g. `-c10` for 10 seconds. To disable caching, use `-c-1`.<br />为缓存控制最大年龄标头设置缓存时间（以秒为单位），例如-c10为10秒。要禁用缓存，请使用-c-1。|`3600` |
|`-U` or `--utc` |Use UTC time format in log messages. 在日志消息中使用UTC时间格式。| |
|`--log-ip` |Enable logging of the client's IP address 启用客户端IP地址的记录 |`false` |
|`-P` or `--proxy` |Proxies all requests which can't be resolved locally to the given url. e.g.: -P http://someurl.com<br />将无法在本地解决的所有请求代理到给定的URL，例如：-P http://someurl.com | |
|`--proxy-options` |Pass proxy [options](https://github.com/http-party/node-http-proxy#options) using nested dotted objects. e.g.: --proxy-options.secure false<br />使用嵌套虚线对象传递代理选项，例如：--proxy-options.secure false ||
|`--username` |Username for basic authentication 基本身份验证的用户名 | |
|`--password` |Password for basic authentication 基本身份验证的密码 | |
|`-S`, `--tls` or `--ssl` |Enable secure request serving with TLS/SSL (HTTPS)<br />使用TLS/SSL（HTTPS）启用安全请求|`false`|
|`-C` or `--cert` |Path to ssl cert file<br />Ssl证书文件的路径 |`cert.pem` |
|`-K` or `--key` |Path to ssl key file<br />Ssl密钥文件的路径 |`key.pem` |
|`-r` or `--robots` | Automatically provide a /robots.txt (The content of which defaults to `User-agent: *\nDisallow: /`)<br />自动提供/robots.txt（其内容默认为用户代理：*\n禁用：/） | `false` |
|`--no-dotfiles` |Do not show dotfiles<br />不要显示dotfiles| |
|`--mimetypes` |Path to a .types file for custom mimetype definition<br />自定义mimetype定义的.types文件的路径| |
|`-h` or `--help` |Print this list and exit.<br />打印此列表并退出。 |   |
|`-v` or `--version`|Print the version and exit.<br />打印版本并退出。 | |

## Magic Files

- `index.html` will be served as the default file to any directory requestsIndex.html
- `index.html` 将作为任何目录请求的默认文件。.
- `404.html` will be served if a file is not found. This can be used for Single-Page App (SPA) hosting to serve the entry page.
- 如果找不到文件，将提供`404.html` 。这可用于单页应用程序（SPA）托管，以服务输入页面。

## Catch-all redirect

To implement a catch-all redirect, use the index page itself as the proxy with:
要实现全面重定向，请使用索引页面本身作为代理：

```
http-server --proxy http://localhost:8080?
```

Note the `?` at the end of the proxy URL. Thanks to [@houston3](https://github.com/houston3) for this clever hack!

## TLS/SSL

First, you need to make sure that [openssl](https://github.com/openssl/openssl) is installed correctly, and you have `key.pem` and `cert.pem` files. You can generate them using this command:

``` sh
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

You will be prompted with a few questions after entering the command. Use `127.0.0.1` as value for `Common name` if you want to be able to install the certificate in your OS's root certificate store or browser so that it is trusted.

This generates a cert-key pair and it will be valid for 3650 days (about 10 years).

Then you need to run the server with `-S` for enabling SSL and `-C` for your certificate file.

``` sh
http-server -S -C cert.pem
```

If you wish to use a passphrase with your private key you can include one in the openssl command via the -passout parameter (using password of foobar)


e.g.
`openssl req -newkey rsa:2048 -passout pass:foobar -keyout key.pem -x509 -days 365 -out cert.pem`

For security reasons, the passphrase will only be read from the `NODE_HTTP_SERVER_SSL_PASSPHRASE` environment variable.


This is what should be output if successful:

``` sh
Starting up http-server, serving ./ through https
http-server settings:
CORS: disabled
Cache: 3600 seconds
Connection Timeout: 120 seconds
Directory Listings: visible
AutoIndex: visible
Serve GZIP Files: false
Serve Brotli Files: false
Default File Extension: none
Available on:
  https://127.0.0.1:8080
  https://192.168.1.101:8080
  https://192.168.1.104:8080
Hit CTRL-C to stop the server
```

# Development

Checkout this repository locally, then:

```sh
$ npm i
$ npm start
```

*Now you can visit http://localhost:8080 to view your server*

You should see the turtle image in the screenshot above hosted at that URL. See
the `./example` folder for demo content.