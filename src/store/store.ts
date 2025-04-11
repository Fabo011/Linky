import { convertHexToString, convertStringToHex, decryptString } from '@/components/crypto/crypto';
import { getAccountSize } from '@/components/lib/account';
import router from '@/router/index';
import { reactive } from 'vue';
import { supabase } from '../components/lib/supabaseClient';

export const store = reactive({

    //auth
    authStatus: '',
    email: '',
    password: '',
    state: '',

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

    // crypto
    key: '',

    // account
    accountSizeInMB: '',
    async updateAccountSize() {
     const { mb, gb, totalSizeInMB } = await getAccountSize();
     this.accountSizeInMB = mb;
    },

    transformUmlauts(text: string) {
        // Replace German Umlaut characters with the respective "ae", "ue", etc.
        const umlautMap: { [key: string]: string } = {
          'Ä': 'Ae',
          'Ö': 'Oe',
          'Ü': 'Ue',
          'ä': 'ae',
          'ö': 'oe',
          'ü': 'ue',
          'ß': 'ss',
        };
  
        return text.replace(/[ÄÖÜäöüß]/g, (match) => umlautMap[match]);
      },

    getKey() {
        const fullKey = sessionStorage.getItem('key') as string;
        return fullKey;
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
                sessionStorage.setItem('email', data.user?.user_metadata.email as any)
                sessionStorage.setItem('tariff', data.user?.user_metadata.tariff as any)
                const userUUIDHex = convertStringToHex(data.user.id);
                sessionStorage.setItem('uuid', userUUIDHex);
            }
        } catch (error) {
            router.push('signin');
        }
    },

    logout() {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('cat');
        sessionStorage.removeItem('key');
        sessionStorage.removeItem('iv');
        sessionStorage.removeItem('tariff');
        sessionStorage.removeItem('uuid');
    },

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
                linkname: decryptString(item.linkname),
                linkdescription: decryptString(item.linkdescription),
                category: decryptString(item.category),
                link: decryptString(item.link),
                linkusername: decryptString(item.linkusername),
                contactname: decryptString(item.contactname),
                contactemail: decryptString(item.contactemail),
                contactphonenumber: decryptString(item.contactphonenumber),
                notes: decryptString(item.notes),
                filename: decryptString(item.filename)
               }));               
        

            this.categories = data as any
             // eslint-disable-next-line prefer-const
             let uniqueCategories = new Set()
             this.categories.forEach(item => {
             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
             // @ts-ignore: Unreachable code error  
             const category = decryptString(item.category)
             uniqueCategories.add(category)
           })
             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
             // @ts-ignore: Unreachable code error
             this.categories = Array.from(uniqueCategories)
             

             await this.updateAccountSize();
           } catch (error) {
               console.error('retrieveAllLinks Error: ' + error);
           }   
    }
});