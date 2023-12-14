import { reactive } from 'vue'
import { supabase } from '../components/lib/supabaseClient'
import { decryptData } from '@/components/crypto/crypto';

export const store = reactive({
    item: {} as any,
    editButtonActive: true,

    isLoading: false,

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
    linkPassword: '',
    linkUsername: '',

    // link data
    items: [] as any,

    // categories
    categories: [],

    // passwordResetToken
    passwordResetToken: '',

    // chat
    text: '',
    chatSecret: '',

    // crypto
    privateKey: '',
    publicKey: '',

    setItem(item: any) {
        this.item = item;
    },

    //auth
    action(authStatus: string) {
        this.authStatus = authStatus,
        localStorage.setItem('authStatus', this.authStatus)
    },
    setToken(data: string) {
        this.token = data
        localStorage.setItem('token', this.token)
    },
    setUsername(username: string) {
        this.username = username,
        localStorage.setItem('user', this.username)    
    },
    setPassword(password: string) {
        this.password = password
    },
    authStatusRefresh(){
        const authStatus = localStorage.getItem('authStatus')
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        const privateKey: any = localStorage.getItem('privKey')
        const publicKey: any = localStorage.getItem('pubKey')
        if(authStatus) this.authStatus = authStatus
        if (user) this.username = user 
        this.privateKey = privateKey
        this.publicKey = publicKey
    },

    //searchbar
    setSearchValue(searchValue: string) {
       this.searchValue = searchValue
    },

    // chat
    setChatTextValue(text: string) {
       this.text = text
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
    setLinkPassword(linkPassword: string) {
        this.linkPassword = linkPassword
    },
    setLinkUsername(linkUsername: string) {
       this.linkUsername = linkUsername
    },

    // crypto
    setKeyPair(privateKey: any, publicKey: any) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
        localStorage.setItem('privKey', privateKey);
        localStorage.setItem('pubKey', publicKey);
    },

    getPrivateKey() {
        return localStorage.getItem('privKey');
    },

    getPublicKey() {
        return localStorage.getItem('pubKey');
    },

    //retrieveAllLinks and Categories
    async retrieveAllLinks() {
        const username = this.username;

        try {
            const { data, error } = await supabase.from('link').select('*').eq(`username`, username);
            if (error) throw new Error('Error retrieving data.');
            // Add rollbar

            if (data) {
                const decryptedData = data.map((item) => {
                    return {
                        ...item,
                        link: item.link ? decryptData(item.link) : null,
                        linkname: item.linkname ? decryptData(item.linkname) : null,
                        linkdescription: item.linkdescription ? decryptData(item.linkdescription) : null,
                        category: item.category ? decryptData(item.category) : null,
                        linkUsername: item.linkUsername ? decryptData(item.linkUsername) : null,
                        linkPassword: item.linkPassword ? decryptData(item.linkPassword) : null,
                        chatSecret: item.chatSecret ? decryptData(item.chatSecret) : null,
                    };
                });

                this.items = decryptedData as any;
                this.categories = decryptedData as any;

                // Extract unique categories
                let uniqueCategories = new Set();
                decryptedData.forEach((item) => {
                    if (item.category) {
                        uniqueCategories.add(item.category);
                    }
                });

                this.categories = Array.from(uniqueCategories) as any;
            } else {
                // Add rollbar
                console.error('No data retrieved.');
            }
        } catch (error) {
            // Add rollbar
            console.error(error);
        }
    }
});