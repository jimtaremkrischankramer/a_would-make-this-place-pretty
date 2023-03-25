const fetch = require("node-fetch");

let key = "API_KEY";
let options = {
  headers: {
    "X-Auth-Token": key,
  },
};

exports.handler = async (event, context) => {
  let statusCode, data;
  let url = event.path;
  url = url.split(".netlify/functions/index/")[1];
  url = decodeURIComponent(url);
  url = new URL(url);
  console.log(url);

  //___________________________

  //   await fetch(
  //     "https://static.poly.pizza/1d9ec236-045a-44e6-8805-048378d618d8.glb"
  //   ).then((res) => {
  //     const contentType = res.headers.get("content-type");
  //     if (contentType && contentType.indexOf("application/json") !== -1) {
  //       console.log("JSON");
  //       res.json().then((json) => ({
  //         statusCode: 200,
  //         body: JSON.stringify(json),
  //       }));
  //     } else {
  //       console.log("GLB");
  //       return res.buffer().then((buffer) => ({
  //         statusCode: 200,
  //         isBase64Encoded: true,
  //         body: buffer.toString("base64"),
  //       }));
  //       res.buffer().then((buffer) => ({
  //         statusCode: 200,
  //         isBase64Encoded: true,
  //         body: buffer.toString("base64"),
  //       }));
  //     }
  //   });
  // };

  //________________________

  if (String(url).endsWith(".glb")) {
    console.log("GLB");
    return fetch(url)
      .then((res) => res.buffer())
      .then((buffer) => ({
        statusCode: 200,
        isBase64Encoded: true,
        body: buffer.toString("base64"),
      }));
  } else {
    console.log("JSON");
    return fetch(url, options)
      .then((res) => res.json())
      .then((json) => ({
        statusCode: 200,
        body: JSON.stringify(json),
      }));
  }

  //_________________________

  //   return fetch(
  //     "https://static.poly.pizza/1d9ec236-045a-44e6-8805-048378d618d8.glb"
  //   )
  //     .then((res) => res.buffer())
  //     .then((buffer) => ({
  //       statusCode: 200,
  //       // headers: {'Content-Type': 'image/jpeg'},
  //       isBase64Encoded: true,
  //       body: buffer.toString("base64"),
  //     }));
  // };

  //_____________________________

  // for (let i in event.queryStringParameters) {
  //   url.searchParams.append(i, event.queryStringParameters[i]);
  // }

  // try {
  //   const response = await fetch(
  //     "https://static.poly.pizza/ea819ee1-f814-4d70-8997-04a33a54c11c.glb",
  //     {
  //       headers: {
  //         "X-Auth-Token": "8565db91665b47cd8826e494a19071bb",
  //       },
  //     }
  //   );
  //   data = await response.text();
  //   // let b64 = Buffer.from(data).toString("base64");
  //   data = String(Buffer.from(data).toString("base64"));
  //   console.log(data);
  //   if (false) {
  //     //data.startsWith("{")
  //     data = data.json();
  //     console.log("JSON");
  //   } else if (false) {
  //     //data.startsWith("glTF"
  //     // data = btoa(data);
  //   } else {
  //     console.log("data");
  //   }
  //   statusCode = 200;
  // } catch (err) {
  //   statusCode = err.statusCode || 500;
  //   data = { error: err.message };
  // }

  // return {
  //   statusCode,
  //   // body: data,
  //   body: data,
  // };
};
