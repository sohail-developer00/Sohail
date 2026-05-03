export function ContactForm() {
  return (
    <div>
      <span className="section-eyebrow">Project Brief</span>
      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">Tell me what you need</h3>
      <p className="mt-4 text-sm leading-7 text-white/65">
        This is a frontend-only form UI. For the fastest response, use the WhatsApp button beside it.
      </p>

      <form className="mt-8 grid gap-4" action="#">
        <label className="grid gap-2 text-sm text-white/70">
          Your Name
          <input className="form-input" type="text" placeholder="Enter your name" />
        </label>
        <label className="grid gap-2 text-sm text-white/70">
          Business / Brand
          <input className="form-input" type="text" placeholder="Brand name" />
        </label>
        <label className="grid gap-2 text-sm text-white/70">
          Phone / Email
          <input className="form-input" type="text" placeholder="How should I reach you?" />
        </label>
        <label className="grid gap-2 text-sm text-white/70">
          What do you want built?
          <textarea
            className="form-input min-h-36 resize-none"
            placeholder="Website, app, AI feature, timeline, budget, goals..."
          />
        </label>
        <button type="button" className="button-primary justify-center">
          Send Brief
        </button>
      </form>
    </div>
  );
}
