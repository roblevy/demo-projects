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
          console.log('read from csv');
          console.log(result);
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

const lib = {
  dimensions: dimensions,
  json: json,
  csv: csv
};

