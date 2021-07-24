# http-server: a command-line http server

`http-server` is a simple, zero-configuration command-line http server. It is powerful enough for production usage, but it's simple and hackable enough to be used for testing, local development, and learning.
209/5000 
`http-server`是一个简单的、零配置的命令行HTTP服务器。对于生产应用来说，它的功能足够强大，但是它也足够简单和易于破解，可以用于测试、本地开发和学习。

## 安装:

#### Globally via `npm` 使用npm全局安装

```
npm install --global http-server
```

This will install `http-server` globally so that it may be run from the command line anywhere.
这样可以全局安装 `http-server`，之后你可以使用命令行在任何地方运行。

#### Globally via Homebrew 使用Homebrew全局安装

```
brew install http-server
```

#### Running on-demand 按需运行:

Using `npx` you can run the script without installing it first:
你可以使用 `npx` 命令来运行脚本而无需提前安装

```
npx http-server [path] [options]
```

#### As a dependency in your `npm` package 作为npm的依赖包:

```
npm install http-server
```

## 使用:

```
 http-server [path] [options]
```

`[path]` defaults to `./public` if the folder exists, and `./` otherwise.
`[path]` defaults to `./public` if the folder exists, and `./` otherwise.


_Now you can visit [http://localhost:8080](http://localhost:8080/) to view your server_
现在你可以访问 [http://localhost:8080](http://localhost:8080/) 这个地址来查看你的服务器。

**Note:** Caching is on by default. Add `-c-1` as an option to disable caching.
**备注:** Caching 默认开启，可以通过添加 `-c-1` 选项禁用 caching.


## 可选项:

`-p` or `--port` Port to use (defaults to 8080). It will also read from `process.env.PORT`.
`-p` or `--port` 使用的端口 (默认为 8080). 它也会从 `process.env.PORT`读取.

`-a` Address to use (defaults to 0.0.0.0)
`-a` 使用的地址 ( 默认为 0.0.0.0)

`-d` Show directory listings (defaults to `true`)
`-d` 显示目录列表 (默认为 `true`)

`-i` Display autoIndex (defaults to `true`)
`-i` 显示自动索引 (默认为 `true`)

`-g` or `--gzip` When enabled (defaults to `false`) it will serve `./public/some-file.js.gz` in place of `./public/some-file.js` when a gzipped version of the file exists and the request accepts gzip encoding. If brotli is also enabled, it will try to serve brotli first.
`-g` or `--gzip` 当启用(默认为 `false`)时， 它将用 `./public/some-file.js.gz` 代替 `./public/some-file.js` when a gzipped version of the file exists and the request accepts gzip encoding. If brotli is also enabled, it will try to serve brotli first.

`-b` or `--brotli` When enabled (defaults to `false`) it will serve `./public/some-file.js.br` in place of `./public/some-file.js` when a brotli compressed version of the file exists and the request accepts `br` encoding. If gzip is also enabled, it will try to serve brotli first.
`-b` 或者 `--brotli` 启用时 (默认为 `false`) 它将用 `./public/some-file.js.br` 代替 `./public/some-file.js` when a brotli compressed version of the file exists and the request accepts `br` encoding. 当 gzip 同时在启用时, it will try to serve brotli first.

`-e` or `--ext` Default file extension if none supplied (defaults to `html`)
`-e` 或 `--ext` 默认文件扩展名，如果没有提供 (默认为 `html`)

`-s` or `--silent` Suppress log messages from output
`-s` 或 `--silent` 抑制输出中的日志消息

`--cors` Enable CORS via the `Access-Control-Allow-Origin` header
`--cors` 通过 `Access-Control-Allow-Origin` header 启用 CORS

`-o [path]` Open browser window after starting the server. Optionally provide a URL path to open. e.g.: -o /other/dir/
`-o [path]` 启用服务后打开浏览器窗口，可以指定打开的路径，例如: -o /other/dir/

`-c` Set cache time (in seconds) for cache-control max-age header, e.g. `-c10` for 10 seconds (defaults to `3600`). To disable caching, use `-c-1`.
`-c` 设置缓存时间 (以秒为单位) for cache-control max-age header, 例如 `-c10` 代表 10 秒 (默认为 `3600`)。如果要禁用缓存，请使用 `-c-1`.

`-U` or `--utc` Use UTC time format in log messages.
`-U` or `--utc` 在日志中使用 UTC 时间格式。

`--log-ip` Enable logging of the client's IP address (default: `false`).
`--log-ip` 启用在日志中记录连接用户的 IP 地址（默认为`false`).

`-P` or `--proxy` Proxies all requests which can't be resolved locally to the given url. e.g.: -P [http://someurl.com](http://someurl.com/)
`-P` or `--proxy` Proxies all requests which can't be resolved locally to the given url. e.g.: -P [http://someurl.com](http://someurl.com/)

`--username` Username for basic authentication [none]
`--username` 基本认证的用户名

`--password` Password for basic authentication [none]
`--password` 基本认证的密码

`-S` or `--ssl` Enable https.
`-S` or `--ssl` 启用 https

`-C` or `--cert` Path to ssl cert file (default: `cert.pem`).
`-C` or `--cert`  ssl cert 文件路径 (默认值: `cert.pem`).

`-K` or `--key` Path to ssl key file (default: `key.pem`).
`-K` or `--key` ssl key 文件路径 (默认值: `key.pem`).

`-r` or `--robots` Provide a /robots.txt (whose content defaults to `User-agent: *\nDisallow: /`)
`-r` or `--robots` 提供一个 /robots.txt (内容默认为 `User-agent: *\nDisallow: /`)

`--no-dotfiles` Do not show dotfiles
`--no-dotfiles` 不显示 dotfiles

`-h` or `--help` Print this list and exit.
`-h` or `--help` 显示此列表并退出

`-v` or `--version` Print the version and exit.
`-v` or `--version` 显示版本号

## Magic Files

-   `index.html` will be served as the default file to any directory requests.
-   `index.html` 任何目录请求将会默认打开该文件
-   `404.html` will be served if a file is not found. This can be used for Single-Page App (SPA) hosting to serve the entry page.
-   `404.html` 如果文件丢失将会显示该页面. 这个页面可以用于单页应用（SPA）托管空页面。
-   

## Catch-all redirect

To implement a catch-all redirect, use the index page itself as the proxy with:

```
http-server --proxy http://localhost:8080?
```

Note the `?` at the end of the proxy URL. Thanks to [@houston3](https://github.com/houston3) for this clever hack!
注意代理地址最末的 `?` 。感谢 [@houston3](https://github.com/houston3) 提供该方案。

## TLS/SSL

First, you need to make sure that [openssl](https://github.com/openssl/openssl) is installed correctly, and you have `key.pem` and `cert.pem` files. You can generate them using this command:
首先要确定你已经正确安装 [openssl](https://github.com/openssl/openssl)以及拥有 `key.pem` 和 `cert.pem`这两个文件。你可以用以下命令生成：

openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

You will be prompted with a few questions after entering the command. Use `127.0.0.1` as value for `Common name` if you want to be able to install the certificate in your OS's root certificate store or browser so that it is trusted.
输入命令后系统会提示一些问题。如果你想在系统的根证书库或者浏览器中被信任，请使用`127.0.0.1` 作为`Common name`的值。

This generates a cert-key pair and it will be valid for 3650 days (about 10 years).
这样能生成一对cert-key，它的有效期为3650天（大约10年）。

Then you need to run the server with `-S` for enabling SSL and `-C` for your certificate file.
然后你需要在运行服务时添加`-S`启用SSL已经`-C`提交你的认证文件。

http-server -S -C cert.pem

This is what should be output if successful:
如果成功运行的话将会显示以下信息：

Starting up http-server, serving ./ through https
Available on:
  https:127.0.0.1:8080
  https:192.168.1.101:8080
  https:192.168.1.104:8080
Hit CTRL-C to stop the server

# 开发

Checkout this repository locally, then:
将这个仓库在你本地checkout，然后：

$ npm i
$ node bin/http-server

_Now you can visit [http://localhost:8080](http://localhost:8080/) to view your server_
现在你可以访问 [http://localhost:8080](http://localhost:8080/) 来查看你的服务器。

You should see the turtle image in the screenshot above hosted at that URL. See the `./public` folder for demo content.
你应该会在以上的地址看到一张乌龟的图片。demo的内容放置在`./public` 文件夹中。
