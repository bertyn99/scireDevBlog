---
title: "Flexbox Layout"
description: "Learn one-dimensional layout with CSS flexbox. Center elements, build navbars, and create responsive card grids."
course: "css-fundamentals"
order: 2
duration: 30
exercises:
  - type: "qcm"
    id: "flex-direction-qcm"
    question: "Which property sets the main axis direction in a flex container?"
    options:
      - "align-items"
      - "flex-direction"
      - "justify-content"
      - "flex-wrap"
    correct: 1
    explanation: "flex-direction controls the main axis. The default is row (horizontal). Use column for vertical layouts."
    points: 10
    conceptTags: ["flex-direction"]
  - type: "qcm"
    id: "justify-content-qcm"
    question: "Which property centers flex items along the main axis?"
    options:
      - "align-items: center"
      - "justify-content: center"
      - "text-align: center"
      - "place-items: center"
    correct: 1
    explanation: "justify-content controls alignment along the main axis. align-items controls the cross axis."
    points: 10
    conceptTags: ["justify-content", "align-items"]
  - type: "graphical"
    id: "flex-gap-visual"
    question: "Which property creates the equal spacing between these three cards?"
    image: "/exercises/screenshots/flex-gap-layout.png"
    options:
      - "margin-right: 20px on each card"
      - "gap: 20px on the container"
      - "padding: 20px on the container"
      - "justify-content: space-between"
    correct: 1
    explanation: "The gap property works in both flexbox and grid. It creates consistent spacing between items without needing margins."
    points: 10
    conceptTags: ["gap"]
  - type: "code_challenge"
    id: "center-with-flex"
    title: "Center a div with Flexbox"
    description: "Write CSS to horizontally AND vertically center the blue box inside the container using flexbox."
    language: "html-css"
    starterFiles:
      html: |
        <div class="container">
          <div class="box">Centered</div>
        </div>
      css: |
        .container {
          height: 300px;
          border: 2px solid #333;
          /* Add your flexbox CSS here */
        }
        .box {
          width: 200px;
          height: 100px;
          background: #3b82f6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }
    assertions:
      - ".container has display:flex"
      - ".container has justify-content:center"
      - ".container has align-items:center"
    hints:
      - "You need three properties: display, justify-content, and align-items"
      - "First, make the container a flex container with display: flex"
      - "justify-content centers horizontally (main axis)"
      - "align-items centers vertically (cross axis)"
    solution:
      css: |
        .container {
          height: 300px;
          border: 2px solid #333;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .box {
          width: 200px;
          height: 100px;
          background: #3b82f6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }
    points: 30
    conceptTags: ["display-flex", "justify-content", "align-items"]
---

# Flexbox Layout

Flexbox is a **one-dimensional layout system**. It excels at distributing space and aligning content along a single axis — either a row or a column.

## The Flex Container

To activate flexbox, set `display: flex` on the parent element. This turns all direct children into "flex items."

```css
.container {
  display: flex;
}
```

Once a container is flex, you control how items behave with two categories of properties:

- **Container properties** — applied to the parent (`justify-content`, `align-items`, `gap`, `flex-direction`, etc.)
- **Item properties** — applied to children (`flex-grow`, `flex-shrink`, `flex-basis`, `align-self`)

## Main Axis vs Cross Axis

Flexbox works along two axes:

| Axis | Default direction | Controlled by |
|---|---|---|
| **Main axis** | Horizontal (left → right) | `flex-direction`, `justify-content` |
| **Cross axis** | Vertical (top → bottom) | `align-items`, `align-content` |

This mental model is the key to understanding flexbox. The main axis is where items flow. The cross axis is perpendicular to it.

## Common Patterns

### Centering (both axes)

```css
.container {
  display: flex;
  justify-content: center; /* main axis */
  align-items: center;     /* cross axis */
}
```

This is the most common flexbox pattern. Three lines. Perfect centering. No more margin hacks.

### Navigation Bar

```css
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}
```

`space-between` pushes the first item to the start and the last item to the end, with equal space between.

### Card Grid with Wrapping

```css
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.card {
  flex: 1 1 300px; /* grow, shrink, basis */
}
```

`flex-wrap: wrap` lets items flow to the next row. `gap` replaces margin hacks. `flex: 1 1 300px` means "grow to fill space, shrink if needed, start at 300px."

---

Now test your understanding with the exercises below.
