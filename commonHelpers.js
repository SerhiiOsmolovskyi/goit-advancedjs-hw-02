import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */function a(){return`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,0)}`}const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let o;t.addEventListener("click",()=>{t.disabled=!0,e.disabled=!1,o=setInterval(()=>{document.body.style.backgroundColor=a()},1e3)});e.addEventListener("click",()=>{t.disabled=!1,e.disabled=!0,clearInterval(o)});
//# sourceMappingURL=commonHelpers.js.map