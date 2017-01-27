function trimSpace(str) {
  try {
    return str.replace(/^[\s]*/, "").replace(/[\s]*$/, "");
  } catch(e) {
    return "";
  }
}

function fetchHtml(domain, path) {
  let socket = new Socket();
  if (socket.open(domain + ":80", "UTF-8")) {
    socket.write(
`GET ${path} HTTP/1.1
Host: ${domain}
Accept: text/html;charset=UTF-8
Accept-Language: ja
Cache-Control: no-cache
Accept-Charset: UTF-8
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36\n\n`);
    let html = "";
    while (!socket.eof) {
      $.sleep(500); // XXX: Sleep
      html += socket.read(10000000);
    }
    socket.close();
    return html.replace(/^[\s\S]*?\n\n[0-9a-f]*\n/, "");
  } else {
    throw "cannot open socket";
  }
}

const NOT_FOUND = ["不明", "不明"];

function getVideoInfo(id) {
  let html = fetchHtml("www.nicovideo.jp", `/watch/${id}`);
  let title = (html.match(/<h1 itemprop="name" class="txt-title">([\s\S]*?)<\/h1>/) || NOT_FOUND)[1];
  let userName = (html.match(/<strong itemprop="name">([\s\S]*?)<\/strong> /) || NOT_FOUND)[1];
  return { id: id, title: trimSpace(title), userName: trimSpace(userName), url: `http://www.nicovideo.jp/watch/${id}` };
}

function getImageInfo(id) {
  let html = fetchHtml("seiga.nicovideo.jp", `/seiga/${id}`);
  let title = (html.match(/<li class="active" itemscope itemtype=".*?"><span itemprop="title">([\s\S]*?)<\/span>/) || NOT_FOUND)[1];
  let userName = (html.match(/<li itemscope itemtype=".*?"><a href="\/user\/illust\/[0-9]+" itemprop="url"><span itemprop="title">([\s\S]*?)<span /) || NOT_FOUND)[1];
  return { id: id, title: trimSpace(title), userName: trimSpace(userName), url: `http://seiga.nicovideo.jp/seiga/${id}` };
}

function getCommonsInfo(id) {
  let html = fetchHtml("commons.nicovideo.jp", `/material/${id}`);
  let title = (html.match(/<div class="commons_title">([\s\S]*?)<\/div>/) || NOT_FOUND)[1];
  let userName = (html.match(/<a href="\/user\/[0-9]+" class="userlink">([\s\S]*?)<\/a>/) || NOT_FOUND)[1];
  return { id: id, title: trimSpace(title), userName: trimSpace(userName), url: `http://commons.nicovideo.jp/material/${id}` };
}

function getLiveInfo(id) {
  let html = fetchHtml("live.nicovideo.jp", `/watch/${id}`);
  let title = (html.match(/<h1 class="title">([\s\S]*?)<\/h1>/) || NOT_FOUND)[1];
  let userName = (html.match(/<span itemprop="member">([\s\S]*?)<\/span>/) || NOT_FOUND)[1];
  return { id: id, title: trimSpace(title), userName: trimSpace(userName), url: `http://live.nicovideo.jp/watch/${id}` };
}

function get3DInfo(id) {
  let html = fetchHtml("3d.nicovideo.jp", `/works/${id}`);
  let title = (html.match(/<h1 class="work-info-title">([\s\S]*?)<\/h1>/) || NOT_FOUND)[1];
  let userName = (html.match(/<div class="work-author-name">([\s\S]*?)<\/div>/) || NOT_FOUND)[1];
  return { id: id, title: trimSpace(title), userName: trimSpace(userName), url: `http://3d.nicovideo.jp/works/${id}` };
}

function getGameInfo(id) {
  return { id: id, title: "非対応", userName: "非対応", url: `http://game.nicovideo.jp/atsumaru/games/${id}` };
}

export default function(id) {
  switch (id.substring(0, 2)) {
    case "sm":
      return getVideoInfo(id);
    case "im":
      return getImageInfo(id);
    case "nc":
      return getCommonsInfo(id);
    case "lv":
      return getLiveInfo(id);
    case "td":
      return get3DInfo(id);
    case "gm":
      return getGameInfo(id);
  }
};
