import { reactive } from 'vue'

export const store = reactive({

    //auth
    authStatus: '',
    token: '',
    username: '',
    password: '',

    //searchbar
    searchValue: '',
    
    //createAndSaveNewLink
    linkname: '',
    linkdescription: '',
    category: '',
    link: '',

    // link data
    items: [],


    //auth
    action(authStatus: string) {
        this.authStatus = authStatus,
        localStorage.setItem('authStatus', this.authStatus)
        localStorage.setItem('user', this.username)
    },
    setToken(data: string) {
        this.token = data
        localStorage.setItem('token', this.token)
    },
    setUsername(username: string) {
        this.username = username
    },
    setPassword(password: string) {
        this.password = password
    },
    authStatusRefresh(){
        const authStatus = localStorage.getItem('authStatus')
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        if(authStatus) this.authStatus = authStatus
        if(token) this.token = token
        if(user) this.username = user 
    },

    //searchbar
    setSearchValue(searchValue: string) {
       this.searchValue = searchValue
    },

    //createAndSaveNewLink
    setLink(link: string){
        this.link = link
     },
    setLinkname(linkname: string) {
        this.linkname = linkname
    },
    setLinkdescription(linkdescription: string) {
        this.linkdescription = linkdescription
    },
    setCategory(category: string) {
        this.category = category
    },
});