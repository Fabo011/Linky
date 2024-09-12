import { encryptFile } from "@/components/crypto/crypto";
import { supabase } from "@/components/lib/supabaseClient";
import { store } from "@/store/store";

export const uploadFile = async () => {
    const uuid = store.getUUID();

    for (const file of store.files) {
        const encryptedFile = await encryptFile(file);
        await supabase.storage.from('linky').upload(`${uuid}/${file.name}`, encryptedFile, {
            upsert: true  // This ensures the file gets overwritten if it exists
          });
        return file.name;
    }
}