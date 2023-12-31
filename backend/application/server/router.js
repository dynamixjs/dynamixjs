import { indexAdminPage } from "../controllers/adminController.js"
import { indexBlog } from "../controllers/blogController.js"

const useRouter = (application) => {
    application.get('/', indexBlog)
    application.get('/admin', indexAdminPage)
}

export { useRouter }