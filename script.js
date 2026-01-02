// Waitlist form toggle functionality
// All JavaScript is plain vanilla JS - no external libraries

// Get elements
const joinWaitlistBtn = document.getElementById("joinWaitlistBtn")
const waitlistModal = document.getElementById("waitlistModal")
const closeModal = document.getElementById("closeModal")
const waitlistForm = document.getElementById("waitlistForm")
const successMessage = document.getElementById("successMessage")
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbycKEt3VwmhNyuP4y1EQOrqW3xp95G3IK1GDEbyHMJCkAlYR39WxBdU0s3p7n2HohVl/exec" // Replace with your Google Apps Script URL


// Open modal when "Join the Waitlist" button is clicked
joinWaitlistBtn.addEventListener("click", () => {
  waitlistModal.classList.add("active")
  document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
})

// Close modal when X button is clicked
closeModal.addEventListener("click", () => {
  waitlistModal.classList.remove("active")
  document.body.style.overflow = "" // Restore scrolling
})

// Close modal when clicking outside the modal content
waitlistModal.addEventListener("click", (e) => {
  if (e.target === waitlistModal) {
    waitlistModal.classList.remove("active")
    document.body.style.overflow = ""
  }
})

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && waitlistModal.classList.contains("active")) {
    waitlistModal.classList.remove("active")
    document.body.style.overflow = ""
  }
})

// Handle form submission (CONNECTED TO GOOGLE SHEETS)
waitlistForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const emailInput = document.getElementById("emailInput")
  const email = emailInput.value.trim()

  if (!email) return

  try {
      await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
    })

    // SUCCESS UI
    console.log("Email submitted:", email)

    waitlistForm.style.display = "none"
    successMessage.classList.add("visible")

    // Auto close modal
    setTimeout(() => {
      waitlistModal.classList.remove("active")
      document.body.style.overflow = ""

      setTimeout(() => {
        waitlistForm.style.display = "flex"
        successMessage.classList.remove("visible")
        emailInput.value = ""
      }, 300)
    }, 3000)

  } catch (error) {
    console.error("Submission error:", error)
    alert("Something went wrong. Please try again.")
  }
})

// Ocean cursor effect
class OceanCursor {
  constructor() {
    this.trailPoints = []
    this.maxTrailPoints = 12
    this.mouse = { x: 0, y: 0 }
    this.glowTrail = null
    this.init()
  }

  init() {
    // Create glow trail element
    this.createGlowTrail()

    // Mouse events
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX
      this.mouse.y = e.clientY

      // Update trail points for smooth following
      this.trailPoints.push({ x: this.mouse.x, y: this.mouse.y, time: Date.now() })
      if (this.trailPoints.length > this.maxTrailPoints) {
        this.trailPoints.shift()
      }

      // Update glow trail position
      this.updateGlowTrail()
    })

    // Touch events for mobile devices
    document.addEventListener('touchmove', (e) => {
      // Prevent scrolling when touching
      e.preventDefault()
      
      const touch = e.touches[0]
      this.mouse.x = touch.clientX
      this.mouse.y = touch.clientY

      // Update trail points for smooth following
      this.trailPoints.push({ x: this.mouse.x, y: this.mouse.y, time: Date.now() })
      if (this.trailPoints.length > this.maxTrailPoints) {
        this.trailPoints.shift()
      }

      // Update glow trail position
      this.updateGlowTrail()
    }, { passive: false })

    // Handle touch end to maintain trail briefly
    document.addEventListener('touchend', (e) => {
      // Keep the trail visible for a moment after touch ends
      setTimeout(() => {
        if (this.glowTrail) {
          this.glowTrail.style.opacity = '0'
          setTimeout(() => {
            this.glowTrail.style.opacity = ''
          }, 500)
        }
      }, 100)
    })
  }

  createGlowTrail() {
    this.glowTrail = document.createElement('div')
    this.glowTrail.className = 'cursor-glow-trail'
    document.body.appendChild(this.glowTrail)
  }

  updateGlowTrail() {
    if (this.glowTrail && this.trailPoints.length > 0) {
      // Position at current mouse with smooth interpolation
      const currentPoint = this.trailPoints[this.trailPoints.length - 1]
      this.glowTrail.style.left = currentPoint.x + 'px'
      this.glowTrail.style.top = currentPoint.y + 'px'
    }
  }
}

// Initialize ocean effect when page loads
document.addEventListener('DOMContentLoaded', () => {
  new OceanCursor()
})
