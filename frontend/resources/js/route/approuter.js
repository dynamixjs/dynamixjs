const useRouter = (pathName, appFunction) => {
    if (window.location.pathname == pathName) appFunction()
}

export { useRouter }