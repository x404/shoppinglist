# React + Vite
https://x404.github.io/shoppinglist/

## Inststurction for start project
1. Clone the project repository to your local machine
```
git clone https://github.com/x404/shoppinglist.git
cd shoppinglist-app
```

2. Install Dependencies
```
npm install
```

3. Running the App
```
npm run dev
```

4. Open the app in your browser by URL
```
http://localhost:5173/
```

## Architecture and Design Decisions
### - State Management with Redux Toolkit
All product data and UI state (like selected category) are managed in one place

### - Component Structure and Composition
Modular component architecture with clear separation of concerns

### - Form Handling and Validation
Consistent form handling pattern in 'add product' modal and edit product form

### - Accessibility Considerations
Built with attemption for accessibility (partially)

### - Using Typescript
Added type definitions for all components and state

### - UI/UX Decisions
Thoughtful user experience design



## LocalStorage Data
**productList** key
```
[{"name":"Banana","quantity":2,"category":"Fruits","purchased":false,"id":1},{"name":"Apple","quantity":3,"category":"Vegetables","purchased":false,"id":2},{"name":"Milk","quantity":4,"category":"Dairy","purchased":false,"id":3},{"name":"Chees","quantity":5,"category":"Dairy","purchased":false,"id":4},{"id":1743520846384,"name":"foo","category":"Fruits","purchased":false,"quantity":1}]
```


## What you would improve if given more time
1. Implement routing for categories with React Router
2. Add support for nested/sub-categories hierarchy
3. Add internationalization support
4. Improve a11y following WCAG standards
6. Ordering and Sorting categories and products
7. Bulk actions (Multiple select for deleting/ mark as purchased)
8. Add sorting by: purchase, title, quantity 
9. Option to hide empty categories
10. Pagination for large list
12. Dark mode support
13. Reduce unnecessary re-renders
14. Create the store category Redux slice
15. Product drag and drop
16. Clear categories
17. Move category to another category
18. Cart with Undo options
19. Resize sidebar
20. Show/hide sidebar
21. Local/remote storage with option save local to remote
22. Search
23. 
