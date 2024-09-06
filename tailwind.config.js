module.exports = {
  theme: {
    extend: {
      // Extending the theme allows for custom configurations and using Tailwind's core functionalities
    },
  },
  variants: {
    extend: {
      // Extend variants if you need to control which states (like hover, focus, etc.) are affected by certain utilities
      transform: ['responsive', 'hover', 'focus'], // This will apply transformation utilities
      rotate: ['responsive', 'hover', 'focus', 'active', 'group-hover'], // This allows rotation utilities to be responsive and interactive
      scale: ['responsive', 'hover', 'focus'], // Scale utilities for zooming effects
      transitionProperty: ['responsive', 'hover', 'focus'], // This controls which properties will transition
    },
  },
  plugins: [
    // Include any plugins here if you use them
  ],
  corePlugins: {
    // Enable specific core plugins if needed
    transform: true, // Enables `transform` utilities like `translate`, `rotate`, `scale`
    transformOrigin: true, // Enables controlling the origin for scale and rotate transformations
    transitionProperty: true, // Enables transition properties
    transitionDuration: true, // Allows specifying how long transitions should last
    transitionTimingFunction: true, // Allows specifying the timing function for transition effects
    transitionDelay: true, // Allows setting a delay before a transition starts
  },
}
