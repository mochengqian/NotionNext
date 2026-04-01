export default function PageLead({
  eyebrow,
  title,
  description,
  actions,
  className = ''
}) {
  if (!title && !description) {
    return null
  }

  return (
    <section
      className={`mb-6 rounded-xl border border-slate-200 bg-white px-5 py-5 shadow-sm dark:border-gray-700 dark:bg-[#1e1e1e] md:px-6 ${className}`}>
      <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
        <div className='max-w-3xl'>
          {eyebrow && (
            <div className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>
              {eyebrow}
            </div>
          )}
          {title && (
            <h1 className='mt-2 text-2xl font-semibold text-slate-900 dark:text-white md:text-3xl'>
              {title}
            </h1>
          )}
          {description && (
            <p className='mt-3 text-sm leading-7 text-slate-600 dark:text-gray-300'>
              {description}
            </p>
          )}
        </div>

        {actions?.length > 0 && (
          <div className='flex flex-wrap gap-2 lg:justify-end'>
            {actions}
          </div>
        )}
      </div>
    </section>
  )
}
