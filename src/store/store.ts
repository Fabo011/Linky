import { reactive } from 'vue'
import { supabase } from '../components/lib/supabaseClient'
import { decryptData } from '@/components/crypto/crypto';
import { convertHexToString } from '@/components/crypto/crypto';
import router from '@/router/index';
import { getUser } from '@/components/authentication/getUser';

export const store = reactive({
    item: {} as any,
    editButtonActive: true,

    isLoading: false,

    //auth
    authStatus: '',
    token: '',
    username: '',
    email: '',
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
    chatPublicKey: '',
    chatPrivateKey: '',

    setItem(item: any) {
        this.item = item;
    },

    //auth
    action(authStatus: string) {
        this.authStatus = authStatus,
        localStorage.setItem('authStatus', this.authStatus)
    },
    authStatusRefresh(){
        const authStatus = localStorage.getItem('authStatus')
        if(authStatus) this.authStatus = authStatus
    },

    //searchbar
    setSearchValue(searchValue: string) {
       this.searchValue = searchValue
    },

    // chat
    setChatTextValue(text: string) {
        this.text = text
    },
    setChatKeyPairKey(publicKey: string, privateKey: string) {
        sessionStorage.setItem('chatPub', publicKey);
        sessionStorage.setItem('chatPriv', privateKey);
    },
    getChatPublicKey() {
        // #TODO Validate incomming values, everywhere at get
        const publicKey = sessionStorage.getItem('chatPub');
        return publicKey;
    },
    getChatPrivateKey() {
        // #TODO Validate incomming values, everywhere at get
        const privateKey = sessionStorage.getItem('chatPriv');
        return privateKey;
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

    /**
     * Crypto
     * @param privateKey 
     * @param publicKey 
     */
    setKeyPair(privateKey: any, publicKey: any) {
        localStorage.setItem('priv', privateKey);
        localStorage.setItem('pub', publicKey);
    },

    getPrivateKey() {
        // #TODO Validate incomming values, everywhere at get
        const privateKey = sessionStorage.getItem('priv') as string;
        return privateKey;
    },

    getPublicKey() {
        // #TODO Validate incomming values, everywhere at get
        const publicKeyPem = sessionStorage.getItem('pub') as string;
        return publicKeyPem;
    },

    /**
     * User
     * @param storedToken 
     * @param publicKey 
     * @param privateKey 
     */
    async setUser() {
        const privateKey = localStorage.getItem('priv');
        if (privateKey) {
            sessionStorage.setItem('priv', privateKey);
            localStorage.removeItem('priv');
        };

        const storedToken = localStorage.getItem('sb-ycsymeeovppvwzcfdddr-auth-token');
        const token = storedToken ? JSON.parse(storedToken) : null;
        if (token) {
            if (!token || !token.user || !token.user.email) {
               console.log('Token or user email is missing.');
               router.push('signin');
               return;
            };

        const publicKey = localStorage.getItem('pub');
        if (publicKey) {
            await getUser(token.user.email);
            localStorage.removeItem('pub');
        } else if (!publicKey) {
            await getUser(token.user.email);
        };

        try {
           const { data } = await supabase.auth.getUser();

          if (!data || !data.user || !data.user.email || data.user.email !== token.user.email) {
             console.log('You are logged out.');
             router.push('signin');
          } else {
              sessionStorage.setItem('user', JSON.stringify(token));
              localStorage.removeItem('sb-ycsymeeovppvwzcfdddr-auth-token');
              localStorage.removeItem('authStatus');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          router.push('signin');
        }
        };
    },

    getStandardUser() {
        // #TODO Validate incomming values, everywhere at get
        const username = sessionStorage.getItem('username') as string;
        const hexTariff = sessionStorage.getItem('tariff') as string;
        const accountSize = sessionStorage.getItem('accountSize');
        const accountStatus = sessionStorage.getItem('accountStatus');
        const tariff = convertHexToString(hexTariff) as string;

        return {
            username: username,
            tariff: tariff,
            accountSize: accountSize,
            accountStatus: accountStatus,
        };
    },

    getUser() {
        const user = sessionStorage.getItem('user');
        return user;
    },

    logoutDeleteAll() {
        sessionStorage.removeItem('priv');
        sessionStorage.removeItem('pub');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('tariff');
        sessionStorage.removeItem('accountSize');
        sessionStorage.removeItem('accountStatus');
        sessionStorage.removeItem('chatPub');
        sessionStorage.removeItem('chatPriv');
        sessionStorage.removeItem('username');
    },

    /**
     * Retrieve All Data
     */
    async retrieveAllLinks() {
        const username = sessionStorage.getItem('username');

        try {
            const { data, error } = await supabase.from('links').select('*').eq(`username`, username);
            if (error) throw new Error('Error retrieving data.');
    
            if (data) {
                const decryptedData = data.map((item) => {
                    const decryptedItem = {
                        ...item,
                        data: item.data ? decryptData(item.data) : null,
                    };

                    if (decryptedItem.data) {
                        const { data } = decryptedItem;

                        decryptedItem.link = data.link || null;
                        decryptedItem.linkname = data.linkname || null;
                        decryptedItem.linkdescription = data.linkdescription || null;
                        decryptedItem.category = data.category || null;
                        decryptedItem.linkUsername = data.linkUsername || null;
                        decryptedItem.linkPassword = data.linkPassword || null;
                        decryptedItem.chatPublicKey = data.chatPublicKey || null;
                        decryptedItem.chatPrivateKey = data.chatPrivateKey || null;
                    }

                    return decryptedItem;
                });

                this.items = decryptedData;
      
                // Extract unique categories
                let uniqueCategories = new Set();
                decryptedData.forEach((item) => {
                    if (item.category) {
                        uniqueCategories.add(item.category);
                    }
                });

                this.categories = Array.from(uniqueCategories) as any;
            } else {
                console.error('No data retrieved.');
            }
        } catch (error) {
            console.trace(error);
        }
    }
});