/* ── FunesButton ─────────────────────────────────────────────────────────────
   <funes-button label="..." [href="#..."] [type="submit"] [variant="hero"] [full]>
   Siempre renderiza un <button> internamente para garantizar
   apariencia consistente en todos los navegadores.
────────────────────────────────────────────────────────────────────────────── */

class FunesButton extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute('label') || ''
    const href = this.getAttribute('href')
    const type = this.getAttribute('type') || 'button'
    const full = this.hasAttribute('full')
    const variant = this.getAttribute('variant')

    this.innerHTML = ''

    const btn = document.createElement('button')
    btn.type = type
    btn.className = `btn${variant ? ` btn--${variant}` : ''}${full ? ' btn--full' : ''}`
    btn.textContent = label

    if (href) {
      btn.addEventListener('click', () => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      })
    }

    this.appendChild(btn)
  }
}

customElements.define('funes-button', FunesButton)
