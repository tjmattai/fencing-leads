// Google Analytics 4 Configuration
export const GA_TRACKING_ID = 'G-XXXXXXXXXX' // Replace with your actual GA4 measurement ID

// Pageview tracking
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// Event tracking
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
} 