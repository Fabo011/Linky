## Feature

- Contacts backup - vCard
- Like bio, but for privacy, where users with their ideas have their own webpage with all the links and a photos
- Kanban Board ToDo
- !!!! Payment, Upgrade Account
- https://bootstrap-vue.org
- https://bootstrap-vue.org/docs/components/overlay
- https://bootstrap-vue.org/docs/components/modal
- https://bootstrap-vue.org/docs/components/sidebar
- https://bootstrap-vue.org/docs/components/toast

## Bugs

- 1. !!!! Contacts to another page and not a overlay to add edit and searchbar for contacts
- 2. Error messages at register or login when password too short. Add script to check length and format at send button level
- Close dropdown in links and file archive when service is choosen
- Convert filename is case of spaces in the filename
- Chat bug????
- Must Have: Sort catgories alphabetic in selection
- Only show categories with for example (tech) when click on folders
- Upload for link json for example from Firefox to store all links from Browser

---

## Upload contacts

```
npm install vcf
import vCard from 'vcf';
const parsedVCard = vCard.parse(vCardData);

<template>
  <div>
    <h1>{{ parsedVCard.fn }}</h1>
    <p>Email: {{ parsedVCard.email }}</p>
    <p>Phone: {{ parsedVCard.tel }}</p>
    <!-- Add more fields as needed -->
  </div>
</template>
```

export const checkStorageLimit = async (): Promise<boolean> => {
const { data } = await supabase.auth.getUser();
const account = data.user?.user_metadata.tariff as string | undefined;
