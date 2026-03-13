/* ─────────────────────────────────────────────────────────────────────────────
   FUNES PROJECT — main.js
───────────────────────────────────────────────────────────────────────────── */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY

/* ── Phone validation ──────────────────────────────────────────────────────── */
function isValidPhone(value) {
  const cleaned = value.replace(/[\s\-\(\)\.]/g, '')
  return /^\+?[0-9]{7,15}$/.test(cleaned)
}

/* ── Supabase insert ───────────────────────────────────────────────────────── */
async function submitToWaitlist(whatsapp) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify({ whatsapp, source: 'landing' }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
}

/* ── Form handler ──────────────────────────────────────────────────────────── */
const form     = document.getElementById('waitlist-form')
const feedback = document.getElementById('form-feedback')
const input    = document.getElementById('whatsapp')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const value = input.value.trim()
  feedback.textContent = ''
  feedback.className = 'form__feedback'

  if (!value) {
    feedback.textContent = 'Ingresa tu número de WhatsApp.'
    feedback.classList.add('form__feedback--error')
    input.focus()
    return
  }

  if (!isValidPhone(value)) {
    feedback.textContent = 'El número no parece válido. Ejemplo: +57 300 000 0000'
    feedback.classList.add('form__feedback--error')
    input.focus()
    return
  }

  const btn = form.querySelector('[type="submit"]')
  btn.disabled = true
  btn.textContent = 'Enviando...'

  try {
    await submitToWaitlist(value)

    const formWrap = document.getElementById('form')
    const cta = formWrap.querySelector('.form__cta')
    const formEl = formWrap.querySelector('form')

    if (cta) cta.remove()
    formEl.innerHTML = `
      <div class="form__success">
        <p>¡Listo! Te contactaremos esta semana.</p>
        <p>Mientras tanto, seguro que conoces a otro lector en problemas...</p>
      </div>
    `
  } catch (err) {
    feedback.textContent = 'No se guardó. Intenta de nuevo.'
    feedback.classList.add('form__feedback--error')
    btn.disabled = false
    btn.textContent = 'Quiero participar'
  }
})

/* ── Scroll animations ─────────────────────────────────────────────────────── */
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )

  document.querySelectorAll('.fade-in, .slide-in').forEach((el) => observer.observe(el))
} else {
  document.querySelectorAll('.fade-in, .slide-in').forEach((el) => el.classList.add('visible'))
}

/* ── Counter animation — 847 ───────────────────────────────────────────────── */
const counterEl = document.getElementById('counter847')

if (counterEl && 'IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = 847
          const duration = 1400
          const start = performance.now()

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            counterEl.textContent = Math.round(eased * target)
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
          counterObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.8 }
  )

  counterObserver.observe(counterEl)
}
