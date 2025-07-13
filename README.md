# Employee Directory – Tacnique Frontend Assignment

This project is a responsive and interactive Employee Directory web interface built with **HTML, CSS, Vanilla JavaScript, and Freemarker templates**. It was developed as part of a frontend take-home assignment.

## 📌 Features

* List of employees (ID, Name, Email, Department, Role)
* Edit and Delete employee records
* Add new employees via a form
* Filter by name, role, department
* Sort by name and department
* Pagination-ready layout
* Fully responsive (mobile/tablet/desktop)

## 📁 Project Structure

```
employee-directory/
├── templates/
│   ├── index.ftl          # Freemarker template (list view)
│   └── add_edit.ftl       # Freemarker template (add/edit form)
├── output/
│   └── index.html         # Rendered HTML output from Freemarker
├── styles.css             # Custom styles
├── app.js                 # JS logic (edit/delete/search)
├── FreemarkerRender.java  # Java file to render Freemarker templates
└── README.md              # Project guide
```

## 🚀 Setup Instructions

### Step 1: Install Java and Freemarker

* Download `freemarker-2.3.32.jar` from the [Apache Freemarker site](https://freemarker.apache.org/).
* Save it in your project directory.

### Step 2: Render `index.ftl`

```bash
javac -cp freemarker-2.3.32.jar FreemarkerRender.java
java -cp .:freemarker-2.3.32.jar FreemarkerRender
```

> This will generate `output/index.html`

### Step 3: Prepare Deployment

1. Copy `output/index.html` to the project root or `deploy/` folder.
2. Move `app.js` and `styles.css` alongside the `index.html`

### Step 4: Deploy

You can deploy the site using:

#### GitHub Pages:

1. Push code to GitHub repo
2. Go to Settings > Pages > Deploy from root or `docs/` folder


#### Vercel:

1. Go to [https://vercel.com/](https://vercel.com/)
2. Import your repo and deploy (set framework as `Other`)

## 🧠 Notes

* Freemarker templates are rendered **once** and the data is stored in-memory with JS.
* No backend or API calls used.


## 🔍 Reflection

> Things that went well:

* Clear requirement structure
* Simple rendering pipeline using Freemarker + JS

> If I had more time:

* I would integrate persistent storage using `localStorage`
* Add animations and transitions to improve UI

---

📩 **Mayank Sagar**
📧 [mayankrsagar@gmail.com](mailto:mayankrsagar@gmail.com)
