import { reactive } from 'vue'
import { supabase } from '../components/lib/supabaseClient'

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
        const username = this.username
      
           try {
            const { data, error } = await supabase.from('link').select('*').eq(`username`, username)
            if (error) throw new Error('Error retrieving data.')
        
            this.items = data as any   

            this.categories = data as any
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
});