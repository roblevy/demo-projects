/* eslint-disable no-unused-vars */
function dimensions(object) {
  return {
    l: object.x,
    r: object.x + object.width,
    t: object.y,
    b: object.y + object.height
  };
}

function csv(url) {
  return ajax(url, 'csv');
}

function json(url) {
  return ajax(url, 'json');
}

function ajax(url, responseType) {
  console.log('loading', url);
  responseType = responseType || 'json';
  return new Promise(function(resolve, reject) {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if(req.readyState === 4) {
        if(req.status === 200) {
          let result = req.responseText;
          switch(responseType) {
            case 'json':
              result = JSON.parse(result).result;
              break;
            case 'csv':
              result = result.split('\n')
                .filter(row => row.includes(','))
                .map(row => row.split(','));
              break;
          }
          return resolve(result);
        } else {
          return reject(req);
        }
      }
    };
    req.open('GET', url);
    req.send();
  });

}

// Pad `toPad` with `padWith` such that it is as long as `toLength`
// Default `padWith` is '0'.
// > pad(1, 3)
// 001
// > pad('a', 4, '-')
// ---a
function padTo(toPad, toLength, padWith) {
  toPad = toPad.toString();
  padWith = padWith || '0';
  let result = '';
  for(let i = toLength; i > toPad.length; i--) {
    result += padWith.toString();
  }
  return result + toPad;
}

const lib = {
  dimensions: dimensions,
  json: json,
  csv: csv,
  pad: padTo
};
