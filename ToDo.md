## Feature

- Contacts backup - vCard
- https://bootstrap-vue.org
- https://bootstrap-vue.org/docs/components/overlay
- https://bootstrap-vue.org/docs/components/modal
- https://bootstrap-vue.org/docs/components/sidebar
- https://bootstrap-vue.org/docs/components/toast

## Bugs

- Close dropdown in links and file archive when service is choosen

## Security

## v2.0.0 Must Haves & Features

- GitHub actions pipeline

- Add rollbar error report

- https://supabase.com/docs/guides/storage

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
