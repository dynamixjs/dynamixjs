// frontend/resources/js/route/approuter.js
var useRouter = (pathName, appFunction) => {
  if (window.location.pathname == pathName)
    appFunction();
};

// frontend/resources/js/lib/postListing.js
function postListing_default() {
}

// frontend/resources/js/lib/writeContent.js
function writeContent_default() {
  const editor = new EditorJS({
    holder: "editor",
    placeholder: "Write content"
  });
}

// frontend/resources/js/app.js
window.addEventListener("load", () => {
  useRouter("/admin/main:post-listing", postListing_default);
  useRouter("/admin/main:write-post", writeContent_default);
});
