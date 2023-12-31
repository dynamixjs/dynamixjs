
const indexBlog = async (request, response) => {
   
    const params = {
        site: {
            metadata: {
                title: "My Blog",
                description: "My Blog With Dynamix.js",
                fav_icon: "",
                og_image: ""
            }
        },
        blog: {
            posts: [
                {
                    title: "Deden"
                }
            ]
        }
    }

    const dmlPath = `${process.cwd()}/templates/basic/index.ejs`
    
    response.render(dmlPath, params)
}

export { indexBlog }