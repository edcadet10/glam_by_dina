# Glam by Dina Website

This repository contains a fully responsive website built for a professional content creator based on the premium design specification. The website features a distinctive pink-champagne aesthetic that creates a consistent, recognizable brand while maintaining professional credibility.

## Website Structure

### Pages

- **Home (index.html)**: Landing page featuring hero section, content highlights, audience metrics, service previews, and call-to-action sections.
- **Portfolio (portfolio.html)**: Showcase of content creator's work with filterable masonry grid, organized by content type.
- **Services (services.html)**: Detailed service offerings, process breakdown, package options, and FAQ section.
- **Contact (contact.html)**: Multi-step inquiry form, availability calendar, and quick connect options.
- **About**: About page showcasing the creator's background, philosophy, and equipment (not yet implemented).
- **Testimonials**: Page displaying client feedback and case studies (not yet implemented).

### CSS Structure

- **reset.css**: Normalizes browser styles for consistent rendering across different browsers.
- **style.css**: Core stylesheet containing design system variables, global styles, and layout components.
- **portfolio.css**: Portfolio-specific styles.
- **services.css**: Services-specific styles.
- **contact.css**: Contact page-specific styles.

### JavaScript Structure

- **main.js**: Core functionality shared across the site (navigation, scrolling animations, etc.).
- **portfolio.js**: Portfolio-specific functionality (filtering, masonry layout).
- **services.js**: Services-specific functionality (package tabs, FAQ accordion).
- **contact.js**: Contact-specific functionality (multi-step form, calendar).

### Design System

The website follows a comprehensive design system as outlined in the specification:

- **Color System**: Pink-champagne theme with gold accents and neutral palette
- **Typography**: Playfair Display for headlines, Poppins for body text
- **Shadow & Elevation**: Three levels of depth with custom shadows
- **Grid & Layout**: 12-column responsive grid with consistent spacing
- **Animation & Interaction**: Thoughtful motion design enhancing the user experience

## Customization Guide

### Updating Content

1. **Text Content**: Edit the HTML files to update text content.
2. **Images**: Replace placeholder images in the `/images` directory with your own.
3. **Services & Pricing**: Update services information and pricing in `services.html`.
4. **Portfolio Items**: Modify the portfolio grid in `portfolio.html` to showcase your work.

### Styling Customization

1. **Colors**: Edit color variables in the `:root` section of `style.css` to match your brand.
2. **Typography**: Change font families and sizes in the CSS files if needed.
3. **Spacing**: Adjust spacing variables to modify the overall density of the design.

### Adding Pages

1. Create a new HTML file based on the existing pages as templates.
2. Link the new page in the navigation menu across all pages.
3. Create a corresponding CSS file if needed for page-specific styles.

### Form Functionality

The contact form is currently set up for demonstration purposes. To make it functional:

1. Set up a server-side script to process form submissions.
2. Update the form action attribute in `contact.html`.
3. Configure email notifications or database storage as needed.

## Browser Compatibility

The website is built with modern web standards and is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

The website includes several optimizations:

- Responsive images
- CSS custom properties for efficient styling
- Optimized JavaScript with performance-minded animation
- Lazy loading for offscreen content

## Accessibility Features

The website follows accessibility best practices:

- Semantic HTML structure
- ARIA attributes where needed
- Keyboard navigable interface
- Sufficient color contrast
- Focus states for interactive elements
- Screen reader-friendly content

## Credits

- Design specification: Premium Content Creator Website Design
- Fonts: Google Fonts (Playfair Display, Poppins)
- Icons: Custom SVG icons

## License

This project is licensed under the MIT License - see the LICENSE file for details.
