const request = require('request');
const parseString = require('xml2js').parseString;
const zlib = require('zlib');

export default getSitemap = url => {
    request(url, {encoding: null}, function(err, resp, body) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else if (resp.headers['content-type'].includes('gzip')) {
            zlib.gunzip(body, function (err, unzipData) {
                if (err) {
                    console.error(err);
                    process.exit(2);
                } else {
                    parseString(unzipData.toString(), function(err, xmlData) {
                        if (err) {
                            console.error(err);
                            process.exit(4);
                        } else {
                            console.log(JSON.stringify(xmlData, null, 4));
                        }
                    });
                }
            })
        }
    });
};
