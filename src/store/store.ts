import { reactive } from 'vue'
import globalVaribales from '@/globalVariables'

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

    // categories
    categories: [],

    //passwordResetToken
    passwordResetToken: '',

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

    //retrieveAllLinks and Categories
    async retieveAllLinks() {
        const url = globalVaribales[0]
        const username = this.username
        const token = this.token

            const requiredData = { username, token }
            const options = {
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(requiredData)
               }
      
           try {
            const res = await fetch(`${url}profile/v1/retrieveAllLinks`, options)
            const data = await res.json()
            this.items = data

            this.categories = data
             // eslint-disable-next-line prefer-const
             let uniqueCategories = new Set()
             this.categories.forEach(item => {
             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
             // @ts-ignore: Unreachable code error  
             uniqueCategories.add(item.category)
           })
             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
             // @ts-ignore: Unreachable code error
             this.categories = Array.from(uniqueCategories)
             
           } catch (error) {
              console.error(error)
           }   
    },

    async retrievePasswordResetTokenFunction() {
        const url = globalVaribales[0]
        const username = this.username
        const token = this.token

        const requiredData = { username, token }
            const options = {
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(requiredData)
               }
      
           try {
            const res = await fetch(`${url}profile/v1/retrievePasswordResetToken`, options)
            const data = await res.json()
            this.passwordResetToken = data.passwordResetToken  
           } catch (error) {
              console.error(error)
           }   
         },
      
});