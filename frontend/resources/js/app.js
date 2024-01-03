import { useRouter } from "./route/approuter.js"
import initPostListing from './lib/postListing.js'
import initWriteContent from './lib/writeContent.js'

window.addEventListener('load', () => {
   useRouter("/admin/main:post-listing", initPostListing)
   useRouter("/admin/main:write-post", initWriteContent)
})
