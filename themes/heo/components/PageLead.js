export default function PageLead({
  eyebrow,
  title,
  description,
  actions,
  compact = false,
  className = ''
}) {
  if (!title && !description) {
    return null
  }

  if (compact) {
    return (
      <section
        className={`mb-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-none dark:border-gray-700 dark:bg-[#202026] md:px-5 ${className}`}>
        <div className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
          <div className='min-w-0 max-w-4xl'>
            <div className='flex flex-wrap items-center gap-2'>
              {eyebrow && (
                <span className='inline-flex rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:bg-[#25242b] dark:text-gray-300'>
                  {eyebrow}
                </span>
              )}
              {title && (
                <h1 className='text-lg font-semibold text-slate-900 dark:text-white md:text-xl'>
                  {title}
                </h1>
              )}
            </div>

            {description && (
              <p className='mt-1 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-gray-300 md:line-clamp-1'>
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
