import { reactive } from 'vue';
import { supabase } from '../components/lib/supabaseClient';
import { convertStringToHex, convertHexToString, decryptString } from '@/components/crypto/crypto';
import router from '@/router/index';

export const store = reactive({

    //auth
    authStatus: '',
    username: '',
    email: '',
    password: '',
    
    friendID: '',

    //searchbar
    searchValue: '',
    
    //createAndSaveNewLink
    linkname: '',
    linkdescription: '',
    category: '',
    link: '',
    linkPassword: '',
    linkUsername: '',
    contactName: '',
    contactPhoneNumber: '',
    contactEmail: '',
    linkNotes: '',
    files: [] as any,

    // link data
    item: {} as any,
    items: [],

    // categories
    categories: [],

    // chat
    text: '',

    // crypto
    key: '',

    getKey() {
        const fullKey = sessionStorage.getItem('key') as string;
        return fullKey;
    },

    setUsername(username: string) {
        this.username = username;
        const usernameHex = convertStringToHex(username);
        sessionStorage.setItem('user', usernameHex);
    },
    setPassword(password: string) {
        this.password = password
    },

    getUsername() {
        const userHex = sessionStorage.getItem('user') as string;
        const username = convertHexToString(userHex);
        return username;
    },

    getUUID() {
        const hexUUID = sessionStorage.getItem('uuid') as string;
        const uuid = convertHexToString(hexUUID);
        return uuid;
    },

    async checkUser() {  
        const storedToken = localStorage.getItem('sb-ycsymeeovppvwzcfdddr-auth-token');
        const token = storedToken ? JSON.parse(storedToken) : null;
        if (token) {
            if (!token || !token.user || !token.user.email) {
                console.log('Token or user email is missing.');
                router.push('signin');
                return;
            };
        };

        try {
            const { data } = await supabase.auth.getUser();

            if (!data || !data.user || !data.user.email || data.user.email !== token.user.email) {
                router.push('signin');
            } else {
                this.setUsername(data.user?.user_metadata.name)
                sessionStorage.setItem('email', data.user?.user_metadata.email as any)
                sessionStorage.setItem('tariff', data.user?.user_metadata.tariff as any)
                const userUUIDHex = convertStringToHex(data.user.id);
                sessionStorage.setItem('uuid', userUUIDHex);
            }
        } catch (error) {
            router.push('signin');
        }
    },

    setFriendID(friendID: string) {
        this.friendID = friendID
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
        sessionStorage.setItem('cat', category);        
    },
    getCategory() {
        return sessionStorage.getItem('cat');
    },

    setLinkPassword(linkPassword: string) {
        this.linkPassword = linkPassword
    },
    setLinkUsername(linkUsername: string) {
       this.linkUsername = linkUsername
    },

    logout() {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('cat');
        sessionStorage.removeItem('chatKey');
        sessionStorage.removeItem('authStatus');
        sessionStorage.removeItem('key');
        sessionStorage.removeItem('iv');
        sessionStorage.removeItem('tariff');
        sessionStorage.removeItem('uuid');
    },

    //retrieveAllLinks and Categories
    async retieveAllLinks() {
        const uuid = this.getUUID();
      
           try {
            const { data, error }: any = await supabase.from('link').select('*').eq(`user_id`, uuid)
               if (error) {
                   console.log(error);
                   throw new Error('Error retrieving data.')
               }
             
               this.items =  data.map((item: any) => ({
                ...item,
                linkusername: decryptString(item.linkusername),
                contactname: decryptString(item.contactname),
                contactemail: decryptString(item.contactemail),
                contactphonenumber: decryptString(item.contactphonenumber),
                notes: decryptString(item.notes)
               }));
               

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
               console.error('retrieveAllLinks Error: ' + error);
           }   
    }
});