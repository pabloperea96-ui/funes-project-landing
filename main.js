/* ─────────────────────────────────────────────────────────────────────────────
   FUNES PROJECT — main.js
───────────────────────────────────────────────────────────────────────────── */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY

/* ── Supabase insert ───────────────────────────────────────────────────────── */
async function submitToWaitlist(data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
}

/* ── Helpers ───────────────────────────────────────────────────────────────── */
function val(id) {
  return document.getElementById(id)?.value.trim() ?? ''
}

function showError(message, focusId) {
  const fb = document.getElementById('form-feedback')
  fb.textContent = message
  fb.className = 'form__feedback form__feedback--error'
  if (focusId) document.getElementById(focusId)?.focus()
}

/* ── Form handler ──────────────────────────────────────────────────────────── */
const form = document.getElementById('waitlist-form')

let formDirty = false
form.addEventListener('input', () => { formDirty = true }, { once: false })
window.addEventListener('beforeunload', (e) => {
  if (formDirty) e.preventDefault()
})

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  formDirty = false

  const feedback = document.getElementById('form-feedback')
  feedback.textContent = ''
  feedback.className = 'form__feedback'

  const nombre      = val('nombre')
  const apellido    = val('apellido')
  const countryCode = val('country-code')
  const rawNumber   = val('whatsapp-number').replace(/[\s\-\(\)\.]/g, '')
  const email       = val('email')
  const libros      = val('libros')
  const consentimiento = document.getElementById('consentimiento').checked

  if (!nombre) {
    showError('Ingresa tu nombre.', 'nombre')
    return
  }

  if (!apellido) {
    showError('Ingresa tu apellido.', 'apellido')
    return
  }

  if (!rawNumber || rawNumber.length < 7) {
    showError('Ingresa un número de WhatsApp válido (mínimo 7 dígitos).', 'whatsapp-number')
    return
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('Ingresa un email válido.', 'email')
    return
  }

  if (!consentimiento) {
    showError('Acepta el uso de tus datos para continuar.', 'consentimiento')
    return
  }

  const btn = form.querySelector('[type="submit"]')
  btn.disabled = true
  btn.textContent = 'Enviando...'

  try {
    await submitToWaitlist({
      nombre,
      apellido,
      whatsapp:        countryCode + rawNumber,
      email,
      'libros_al_año': libros || null,
      consentimiento:   true,
      source:           'landing',
    })

    const formWrap = document.getElementById('form')
    const cta      = formWrap.querySelector('.form__cta')
    const formEl   = formWrap.querySelector('form')

    if (cta) cta.remove()
    formEl.innerHTML = `
      <div class="form__success">
        <p>¡Listo! Te contactaremos esta semana.</p>
        <p>Mientras tanto, seguro que conoces a otro lector en problemas...</p>
      </div>
    `
  } catch (err) {
    feedback.textContent = 'No se guardó. Intenta de nuevo.'
    feedback.className = 'form__feedback form__feedback--error'
    btn.disabled = false
    btn.textContent = 'Quiero participar'
  }
})

/* ── Country selector: short display when closed, full text when open ──────── */
const countrySelect = document.getElementById('country-code')

// Store long text and compute short text for every option
Array.from(countrySelect.options).forEach(opt => {
  const chars = [...opt.text.trim()]
  const flag  = chars[0] + chars[1]          // flag emoji = 2 code points
  opt.dataset.long  = opt.text
  opt.dataset.short = flag + ' ' + opt.value
  opt.text = opt.dataset.short               // start collapsed
})

// Expand to full text before the picker opens
countrySelect.addEventListener('mousedown', expand)
countrySelect.addEventListener('touchstart', expand, { passive: true })
countrySelect.addEventListener('keydown', expand)

// Collapse back after selection or dismiss
countrySelect.addEventListener('change', collapse)
countrySelect.addEventListener('blur',   collapse)

function expand() {
  Array.from(countrySelect.options).forEach(opt => { opt.text = opt.dataset.long })
}

function collapse() {
  Array.from(countrySelect.options).forEach(opt => { opt.text = opt.dataset.short })
}

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
          const target   = 847
          const duration = 1400
          const start    = performance.now()

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased    = 1 - Math.pow(1 - progress, 3)
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
