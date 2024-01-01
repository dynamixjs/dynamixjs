import { indexAdminPage } from "../controllers/adminController.js"
import { indexBlog } from "../controllers/blogController.js"

const useRouter = (application) => {
    application.get('/', indexBlog)
    application.get('/admin', (request, response) => response.redirect('/admin/main:post-listing'))
    application.get('/admin/:page', indexAdminPage)
}

export { useRouter }