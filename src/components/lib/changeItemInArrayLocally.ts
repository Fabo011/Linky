import { store } from "@/store/store";

export const updateItemInArrayLocally = (id: string, newValue: string, property: string) => {
    const index = store.items.findIndex((item: any) => item.id === id);
    if (index !== -1) {
        store.items[index][property] = newValue;
    }
};

export const deleteItemInArrayLocally = (item: any) => {
    const index = store.items.findIndex((i: any) => i === item);
    if (index !== -1) {
        store.items.splice(index, 1);
    }
};