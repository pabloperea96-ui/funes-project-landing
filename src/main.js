/* ─────────────────────────────────────────────────────────────────────────────
   FUNES PROJECT — main.js
───────────────────────────────────────────────────────────────────────────── */

import './components/FunesButton.js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY

/* ── Supabase insert ────────────────────────────────────────────────────────── */
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
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`)
    if (res.status === 409) err.duplicate = true
    throw err
  }
}

/* ── Helpers ────────────────────────────────────────────────────────────────── */
function val(id) {
  return document.getElementById(id)?.value.trim() ?? ''
}

function showError(message, focusId) {
  const fb = document.getElementById('form-feedback')
  fb.textContent = message
  fb.className = 'form__feedback form__feedback--error'
  if (focusId) document.getElementById(focusId)?.focus()
}

/* ── Form handler ───────────────────────────────────────────────────────────── */
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
        <p>¡Listo! Pronto te contactaremos.</p>
        <p>Mientras tanto, seguro que conoces a otro lector en problemas...</p>
      </div>
    `
  } catch (err) {
    feedback.textContent = err.duplicate
      ? 'Ya te registraste y pronto te contactaremos.'
      : 'No se guardó. Intenta de nuevo.'
    feedback.className = err.duplicate
      ? 'form__feedback form__feedback--success'
      : 'form__feedback form__feedback--error'
    btn.disabled = false
    btn.textContent = 'Quiero participar'
  }
})

/* ── Country data ───────────────────────────────────────────────────────────── */
const LATAM_COUNTRIES = [
  { code: '+57',    flag: '🇨🇴', name: 'Colombia' },
  { code: '+52',    flag: '🇲🇽', name: 'México' },
  { code: '+54',    flag: '🇦🇷', name: 'Argentina' },
  { code: '+34',    flag: '🇪🇸', name: 'España' },
  { code: '+56',    flag: '🇨🇱', name: 'Chile' },
  { code: '+51',    flag: '🇵🇪', name: 'Perú' },
  { code: '+591',   flag: '🇧🇴', name: 'Bolivia' },
  { code: '+55',    flag: '🇧🇷', name: 'Brasil' },
  { code: '+506',   flag: '🇨🇷', name: 'Costa Rica' },
  { code: '+53',    flag: '🇨🇺', name: 'Cuba' },
  { code: '+593',   flag: '🇪🇨', name: 'Ecuador' },
  { code: '+503',   flag: '🇸🇻', name: 'El Salvador' },
  { code: '+502',   flag: '🇬🇹', name: 'Guatemala' },
  { code: '+509',   flag: '🇭🇹', name: 'Haití' },
  { code: '+504',   flag: '🇭🇳', name: 'Honduras' },
  { code: '+505',   flag: '🇳🇮', name: 'Nicaragua' },
  { code: '+507',   flag: '🇵🇦', name: 'Panamá' },
  { code: '+595',   flag: '🇵🇾', name: 'Paraguay' },
  { code: '+1-787', flag: '🇵🇷', name: 'Puerto Rico' },
  { code: '+1-809', flag: '🇩🇴', name: 'Rep. Dominicana' },
  { code: '+598',   flag: '🇺🇾', name: 'Uruguay' },
  { code: '+58',    flag: '🇻🇪', name: 'Venezuela' },
]

const WORLD_COUNTRIES = [
  { code: '+93',    flag: '🇦🇫', name: 'Afganistán' },
  { code: '+355',   flag: '🇦🇱', name: 'Albania' },
  { code: '+213',   flag: '🇩🇿', name: 'Argelia' },
  { code: '+376',   flag: '🇦🇩', name: 'Andorra' },
  { code: '+244',   flag: '🇦🇴', name: 'Angola' },
  { code: '+1-268', flag: '🇦🇬', name: 'Antigua y Barbuda' },
  { code: '+374',   flag: '🇦🇲', name: 'Armenia' },
  { code: '+297',   flag: '🇦🇼', name: 'Aruba' },
  { code: '+61',    flag: '🇦🇺', name: 'Australia' },
  { code: '+43',    flag: '🇦🇹', name: 'Austria' },
  { code: '+994',   flag: '🇦🇿', name: 'Azerbaiyán' },
  { code: '+1-242', flag: '🇧🇸', name: 'Bahamas' },
  { code: '+973',   flag: '🇧🇭', name: 'Baréin' },
  { code: '+880',   flag: '🇧🇩', name: 'Bangladés' },
  { code: '+1-246', flag: '🇧🇧', name: 'Barbados' },
  { code: '+375',   flag: '🇧🇾', name: 'Bielorrusia' },
  { code: '+32',    flag: '🇧🇪', name: 'Bélgica' },
  { code: '+501',   flag: '🇧🇿', name: 'Belice' },
  { code: '+229',   flag: '🇧🇯', name: 'Benín' },
  { code: '+975',   flag: '🇧🇹', name: 'Bután' },
  { code: '+387',   flag: '🇧🇦', name: 'Bosnia y Herzegovina' },
  { code: '+267',   flag: '🇧🇼', name: 'Botsuana' },
  { code: '+673',   flag: '🇧🇳', name: 'Brunéi' },
  { code: '+359',   flag: '🇧🇬', name: 'Bulgaria' },
  { code: '+226',   flag: '🇧🇫', name: 'Burkina Faso' },
  { code: '+257',   flag: '🇧🇮', name: 'Burundi' },
  { code: '+238',   flag: '🇨🇻', name: 'Cabo Verde' },
  { code: '+855',   flag: '🇰🇭', name: 'Camboya' },
  { code: '+237',   flag: '🇨🇲', name: 'Camerún' },
  { code: '+1',     flag: '🇨🇦', name: 'Canadá' },
  { code: '+236',   flag: '🇨🇫', name: 'Rep. Centroafricana' },
  { code: '+235',   flag: '🇹🇩', name: 'Chad' },
  { code: '+86',    flag: '🇨🇳', name: 'China' },
  { code: '+357',   flag: '🇨🇾', name: 'Chipre' },
  { code: '+269',   flag: '🇰🇲', name: 'Comoras' },
  { code: '+242',   flag: '🇨🇬', name: 'Congo' },
  { code: '+243',   flag: '🇨🇩', name: 'Congo (RD)' },
  { code: '+850',   flag: '🇰🇵', name: 'Corea del Norte' },
  { code: '+82',    flag: '🇰🇷', name: 'Corea del Sur' },
  { code: '+225',   flag: '🇨🇮', name: 'Costa de Marfil' },
  { code: '+385',   flag: '🇭🇷', name: 'Croacia' },
  { code: '+599',   flag: '🇨🇼', name: 'Curazao' },
  { code: '+45',    flag: '🇩🇰', name: 'Dinamarca' },
  { code: '+253',   flag: '🇩🇯', name: 'Yibuti' },
  { code: '+1-767', flag: '🇩🇲', name: 'Dominica' },
  { code: '+20',    flag: '🇪🇬', name: 'Egipto' },
  { code: '+971',   flag: '🇦🇪', name: 'Emiratos Árabes' },
  { code: '+291',   flag: '🇪🇷', name: 'Eritrea' },
  { code: '+421',   flag: '🇸🇰', name: 'Eslovaquia' },
  { code: '+386',   flag: '🇸🇮', name: 'Eslovenia' },
  { code: '+372',   flag: '🇪🇪', name: 'Estonia' },
  { code: '+251',   flag: '🇪🇹', name: 'Etiopía' },
  { code: '+679',   flag: '🇫🇯', name: 'Fiyi' },
  { code: '+63',    flag: '🇵🇭', name: 'Filipinas' },
  { code: '+358',   flag: '🇫🇮', name: 'Finlandia' },
  { code: '+33',    flag: '🇫🇷', name: 'Francia' },
  { code: '+241',   flag: '🇬🇦', name: 'Gabón' },
  { code: '+220',   flag: '🇬🇲', name: 'Gambia' },
  { code: '+995',   flag: '🇬🇪', name: 'Georgia' },
  { code: '+233',   flag: '🇬🇭', name: 'Ghana' },
  { code: '+350',   flag: '🇬🇮', name: 'Gibraltar' },
  { code: '+30',    flag: '🇬🇷', name: 'Grecia' },
  { code: '+299',   flag: '🇬🇱', name: 'Groenlandia' },
  { code: '+1-473', flag: '🇬🇩', name: 'Granada' },
  { code: '+1-671', flag: '🇬🇺', name: 'Guam' },
  { code: '+224',   flag: '🇬🇳', name: 'Guinea' },
  { code: '+240',   flag: '🇬🇶', name: 'Guinea Ecuatorial' },
  { code: '+245',   flag: '🇬🇼', name: 'Guinea-Bisáu' },
  { code: '+592',   flag: '🇬🇾', name: 'Guyana' },
  { code: '+852',   flag: '🇭🇰', name: 'Hong Kong' },
  { code: '+36',    flag: '🇭🇺', name: 'Hungría' },
  { code: '+91',    flag: '🇮🇳', name: 'India' },
  { code: '+62',    flag: '🇮🇩', name: 'Indonesia' },
  { code: '+964',   flag: '🇮🇶', name: 'Irak' },
  { code: '+98',    flag: '🇮🇷', name: 'Irán' },
  { code: '+353',   flag: '🇮🇪', name: 'Irlanda' },
  { code: '+354',   flag: '🇮🇸', name: 'Islandia' },
  { code: '+1-345', flag: '🇰🇾', name: 'Islas Caimán' },
  { code: '+682',   flag: '🇨🇰', name: 'Islas Cook' },
  { code: '+298',   flag: '🇫🇴', name: 'Islas Feroe' },
  { code: '+500',   flag: '🇫🇰', name: 'Islas Malvinas' },
  { code: '+692',   flag: '🇲🇭', name: 'Islas Marshall' },
  { code: '+677',   flag: '🇸🇧', name: 'Islas Salomón' },
  { code: '+1-340', flag: '🇻🇮', name: 'Islas Vírgenes EE.UU.' },
  { code: '+1-284', flag: '🇻🇬', name: 'Islas Vírgenes RU' },
  { code: '+972',   flag: '🇮🇱', name: 'Israel' },
  { code: '+39',    flag: '🇮🇹', name: 'Italia' },
  { code: '+1-876', flag: '🇯🇲', name: 'Jamaica' },
  { code: '+81',    flag: '🇯🇵', name: 'Japón' },
  { code: '+962',   flag: '🇯🇴', name: 'Jordania' },
  { code: '+7',     flag: '🇰🇿', name: 'Kazajistán' },
  { code: '+254',   flag: '🇰🇪', name: 'Kenia' },
  { code: '+996',   flag: '🇰🇬', name: 'Kirguistán' },
  { code: '+686',   flag: '🇰🇮', name: 'Kiribati' },
  { code: '+383',   flag: '🇽🇰', name: 'Kosovo' },
  { code: '+965',   flag: '🇰🇼', name: 'Kuwait' },
  { code: '+856',   flag: '🇱🇦', name: 'Laos' },
  { code: '+266',   flag: '🇱🇸', name: 'Lesoto' },
  { code: '+371',   flag: '🇱🇻', name: 'Letonia' },
  { code: '+961',   flag: '🇱🇧', name: 'Líbano' },
  { code: '+231',   flag: '🇱🇷', name: 'Liberia' },
  { code: '+218',   flag: '🇱🇾', name: 'Libia' },
  { code: '+423',   flag: '🇱🇮', name: 'Liechtenstein' },
  { code: '+370',   flag: '🇱🇹', name: 'Lituania' },
  { code: '+352',   flag: '🇱🇺', name: 'Luxemburgo' },
  { code: '+853',   flag: '🇲🇴', name: 'Macao' },
  { code: '+389',   flag: '🇲🇰', name: 'Macedonia del Norte' },
  { code: '+261',   flag: '🇲🇬', name: 'Madagascar' },
  { code: '+60',    flag: '🇲🇾', name: 'Malasia' },
  { code: '+265',   flag: '🇲🇼', name: 'Malaui' },
  { code: '+960',   flag: '🇲🇻', name: 'Maldivas' },
  { code: '+223',   flag: '🇲🇱', name: 'Malí' },
  { code: '+356',   flag: '🇲🇹', name: 'Malta' },
  { code: '+212',   flag: '🇲🇦', name: 'Marruecos' },
  { code: '+222',   flag: '🇲🇷', name: 'Mauritania' },
  { code: '+230',   flag: '🇲🇺', name: 'Mauricio' },
  { code: '+691',   flag: '🇫🇲', name: 'Micronesia' },
  { code: '+373',   flag: '🇲🇩', name: 'Moldavia' },
  { code: '+377',   flag: '🇲🇨', name: 'Mónaco' },
  { code: '+976',   flag: '🇲🇳', name: 'Mongolia' },
  { code: '+382',   flag: '🇲🇪', name: 'Montenegro' },
  { code: '+258',   flag: '🇲🇿', name: 'Mozambique' },
  { code: '+264',   flag: '🇳🇦', name: 'Namibia' },
  { code: '+674',   flag: '🇳🇷', name: 'Nauru' },
  { code: '+977',   flag: '🇳🇵', name: 'Nepal' },
  { code: '+227',   flag: '🇳🇪', name: 'Níger' },
  { code: '+234',   flag: '🇳🇬', name: 'Nigeria' },
  { code: '+47',    flag: '🇳🇴', name: 'Noruega' },
  { code: '+64',    flag: '🇳🇿', name: 'Nueva Zelanda' },
  { code: '+968',   flag: '🇴🇲', name: 'Omán' },
  { code: '+31',    flag: '🇳🇱', name: 'Países Bajos' },
  { code: '+92',    flag: '🇵🇰', name: 'Pakistán' },
  { code: '+680',   flag: '🇵🇼', name: 'Palaos' },
  { code: '+970',   flag: '🇵🇸', name: 'Palestina' },
  { code: '+675',   flag: '🇵🇬', name: 'Papúa Nueva Guinea' },
  { code: '+48',    flag: '🇵🇱', name: 'Polonia' },
  { code: '+351',   flag: '🇵🇹', name: 'Portugal' },
  { code: '+974',   flag: '🇶🇦', name: 'Catar' },
  { code: '+44',    flag: '🇬🇧', name: 'Reino Unido' },
  { code: '+40',    flag: '🇷🇴', name: 'Rumanía' },
  { code: '+7',     flag: '🇷🇺', name: 'Rusia' },
  { code: '+250',   flag: '🇷🇼', name: 'Ruanda' },
  { code: '+685',   flag: '🇼🇸', name: 'Samoa' },
  { code: '+1-869', flag: '🇰🇳', name: 'San Cristóbal y Nieves' },
  { code: '+378',   flag: '🇸🇲', name: 'San Marino' },
  { code: '+1-784', flag: '🇻🇨', name: 'San Vicente y Granadinas' },
  { code: '+290',   flag: '🇸🇭', name: 'Santa Elena' },
  { code: '+1-758', flag: '🇱🇨', name: 'Santa Lucía' },
  { code: '+239',   flag: '🇸🇹', name: 'Santo Tomé y Príncipe' },
  { code: '+966',   flag: '🇸🇦', name: 'Arabia Saudita' },
  { code: '+221',   flag: '🇸🇳', name: 'Senegal' },
  { code: '+381',   flag: '🇷🇸', name: 'Serbia' },
  { code: '+248',   flag: '🇸🇨', name: 'Seychelles' },
  { code: '+232',   flag: '🇸🇱', name: 'Sierra Leona' },
  { code: '+65',    flag: '🇸🇬', name: 'Singapur' },
  { code: '+252',   flag: '🇸🇴', name: 'Somalia' },
  { code: '+94',    flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+27',    flag: '🇿🇦', name: 'Sudáfrica' },
  { code: '+249',   flag: '🇸🇩', name: 'Sudán' },
  { code: '+211',   flag: '🇸🇸', name: 'Sudán del Sur' },
  { code: '+46',    flag: '🇸🇪', name: 'Suecia' },
  { code: '+41',    flag: '🇨🇭', name: 'Suiza' },
  { code: '+597',   flag: '🇸🇷', name: 'Surinam' },
  { code: '+268',   flag: '🇸🇿', name: 'Suazilandia' },
  { code: '+963',   flag: '🇸🇾', name: 'Siria' },
  { code: '+255',   flag: '🇹🇿', name: 'Tanzania' },
  { code: '+66',    flag: '🇹🇭', name: 'Tailandia' },
  { code: '+886',   flag: '🇹🇼', name: 'Taiwán' },
  { code: '+992',   flag: '🇹🇯', name: 'Tayikistán' },
  { code: '+670',   flag: '🇹🇱', name: 'Timor Oriental' },
  { code: '+228',   flag: '🇹🇬', name: 'Togo' },
  { code: '+676',   flag: '🇹🇴', name: 'Tonga' },
  { code: '+1-868', flag: '🇹🇹', name: 'Trinidad y Tobago' },
  { code: '+216',   flag: '🇹🇳', name: 'Túnez' },
  { code: '+993',   flag: '🇹🇲', name: 'Turkmenistán' },
  { code: '+90',    flag: '🇹🇷', name: 'Turquía' },
  { code: '+688',   flag: '🇹🇻', name: 'Tuvalu' },
  { code: '+380',   flag: '🇺🇦', name: 'Ucrania' },
  { code: '+256',   flag: '🇺🇬', name: 'Uganda' },
  { code: '+1',     flag: '🇺🇸', name: 'Estados Unidos' },
  { code: '+998',   flag: '🇺🇿', name: 'Uzbekistán' },
  { code: '+678',   flag: '🇻🇺', name: 'Vanuatu' },
  { code: '+84',    flag: '🇻🇳', name: 'Vietnam' },
  { code: '+967',   flag: '🇾🇪', name: 'Yemen' },
  { code: '+260',   flag: '🇿🇲', name: 'Zambia' },
  { code: '+263',   flag: '🇿🇼', name: 'Zimbabue' },
]

/* ── Country selector ───────────────────────────────────────────────────────── */
const countrySelect = document.getElementById('country-code')

function populateCountrySelect() {
  const latamGroup = document.createElement('optgroup')
  latamGroup.label = 'América Latina y España'
  LATAM_COUNTRIES.forEach(({ code, flag, name }) => {
    const opt = document.createElement('option')
    opt.value = code
    opt.textContent = `${flag} ${name} ${code}`
    latamGroup.appendChild(opt)
  })

  const worldGroup = document.createElement('optgroup')
  worldGroup.label = 'Resto del mundo'
  WORLD_COUNTRIES.forEach(({ code, flag, name }) => {
    const opt = document.createElement('option')
    opt.value = code
    opt.textContent = `${flag} ${name} ${code}`
    worldGroup.appendChild(opt)
  })

  countrySelect.appendChild(latamGroup)
  countrySelect.appendChild(worldGroup)
}

populateCountrySelect()

// Store long/short text for each option and start collapsed
Array.from(countrySelect.options).forEach(opt => {
  const chars = [...opt.text.trim()]
  const flag  = chars[0] + chars[1]       // flag emoji = 2 code points
  opt.dataset.long  = opt.text
  opt.dataset.short = flag + ' ' + opt.value
  opt.text = opt.dataset.short
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

/* ── Scroll animations ──────────────────────────────────────────────────────── */
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

/* ── Counter animation — 847 ────────────────────────────────────────────────── */
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
