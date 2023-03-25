//______________THREE

const loader = new THREE.GLTFLoader();
loader.crossOrigin = true;

let glbLink;

let creator;
const modelby = document.querySelector(".ARoverlay > p");

let scale = 1;
let fac;

const bar = document.querySelector(".lds-spinner");
const search = document.querySelector("#search");
const input = document.querySelector("input");
const overlay = document.querySelector(".overlay");
const sorry = document.querySelector(".sorry");

const marker = document.querySelector("a-marker");

input.value = "";
let textInInput = "";

const isEmpty = (str) => !str.trim().length;

search.addEventListener("click", function () {
  if (isEmpty(textInInput)) {
    console.log(textInInput);
  } else {
    overlay.style.display = "none";
    document.querySelector(".ARoverlay").style.display = "flex";
    sorry.style.display = "none";
    let term = input.value;
    bar.style.display = "inline-block";
    fetch("/.netlify/functions/index/https://api.poly.pizza/v1/search/" + term)
      .then((response) => response.clone().json())
      .then((json) => {
        if (json.results.length !== 0) {
          console.log(json);
          creator = json.results[0].Creator.Username;
          modelby.innerHTML = "MODEL BY " + creator;
          glbLink = "/.netlify/functions/index/" + json.results[0].Download;
          let obj = document.createElement("a-entity");

          obj.setAttribute("gltf-model", glbLink);
          marker.appendChild(obj);

          let threeObj = document.querySelector("a-entity");
          threeObj.addEventListener("model-loaded", (e) => {
            let mesh = threeObj.getObject3D("mesh");
            var bbox = new THREE.Box3().setFromObject(mesh);
            bbox.getCenter(mesh.position);
            mesh.position.multiplyScalar(-1);
            bbox = bbox.max;
            mesh.translateY(bbox.y / 2);
            console.log("BBOX: " + bbox);
            let max = Math.max(bbox.x, bbox.y, bbox.z);
            fac = scale / max;

            obj.setAttribute("position", "0 0 0");
            obj.setAttribute("scale", fac + " " + fac + " " + fac);
          });

          bar.style.display = "none";
        } else {
          bar.style.display = "none";
          document.querySelector(".ARoverlay").style.display = "none";
          console.log("gibs leider nich :(");
          if (sorryAn) {
            sorry.querySelector(".textInInput").innerHTML = "an " + textInInput;
          } else if (!sorryAn) {
            sorry.querySelector(".textInInput").innerHTML = "a " + textInInput;
          }
          sorry.style.display = "flex";
          overlay.style.display = "flex";
        }
      });
  }
});

//______________AR-OVERLAY

const refreshButton = document.querySelector("#refresh");
refreshButton.addEventListener("click", () => {
  window.location.reload();
});

//_______________STYLING

const makePretty = document.querySelectorAll("#makePretty");

search.addEventListener("mouseover", () => {
  makePretty.forEach((e) => {
    e.style.color = "#fff";
  });
});

search.addEventListener("mouseout", () => {
  makePretty.forEach((e) => {
    e.style.color = "#ef3340";
  });
});

let sorryAn = false;

const An = document.querySelector("#an");
input.addEventListener("input", () => {
  let x = input.value.slice(0, 1);
  textInInput = input.value;
  if (
    x === "A" ||
    x === "a" ||
    x === "E" ||
    x === "e" ||
    x === "I" ||
    x === "i" ||
    x === "O" ||
    x === "o" ||
    x === "U" ||
    x === "u"
  ) {
    console.log(input.value.slice(0, 1));
    An.innerText = "An ";
    sorryAn = true;
  } else {
    An.innerText = "A ";
    sorryAn = false;
  }
});
