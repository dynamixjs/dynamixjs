const hello = (data) => {
    return {
        status: 200,
        content: "Hello World"
    }
}

const getActions = () => {
    return [
        {
            actionName: "hello",
            call: hello
        }
    ]
}

const createPageView = () => {
    return ("<div>Hello</div>")
}

const createSidebarMenu = () => {
    return {
        title: "Hello Plugin",
        subTitle: "Dynamix CMS Plugin example",
        icon: "http://godam.cc",
    }
}

export { getActions, createPageView, createSidebarMenu }