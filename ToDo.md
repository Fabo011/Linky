## Feature

- Contacts backup - vCard
- Like bio, but for privacy, where users with their ideas have their own webpage with all the links and a photos
- https://bootstrap-vue.org
- https://bootstrap-vue.org/docs/components/overlay
- https://bootstrap-vue.org/docs/components/modal
- https://bootstrap-vue.org/docs/components/sidebar
- https://bootstrap-vue.org/docs/components/toast

## Bugs

- Close dropdown in links and file archive when service is choosen

## Until v3.1.0 release

- GitHub actions pipeline

- Add rollbar error report

- https://supabase.com/docs/guides/storage

- Bucket policies depending on user payment status

- Security check

- Contacts number and email downloadable

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
