import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const router = useRouter()
  const hasSubMenu = link?.subMenus?.length > 0
  const currentPath = router.pathname
  const normalizedHref = link?.href === '/search' ? '/search' : link?.href
  const selected =
    normalizedHref === '/'
      ? currentPath === '/'
      : normalizedHref &&
        (currentPath === normalizedHref ||
          currentPath.startsWith(`${normalizedHref}/`))

  if (!link || !link.show) {
    return null
  }

  return (
    <div
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}>
      {/* 不含子菜单 */}
      {!hasSubMenu && (
        <SmartLink
          target={link?.target}
          href={link?.href}
          className={`rounded-full flex justify-center items-center px-3 py-2 no-underline text-sm font-medium transition-colors ${
            selected
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-[#25242b] dark:hover:text-white'
          }`}>
          {link?.icon && <i className={link?.icon} />} {link?.name}
        </SmartLink>
      )}
      {/* 含子菜单的按钮 */}
      {hasSubMenu && (
        <>
          <div
            className={`cursor-pointer rounded-full flex justify-center items-center px-3 py-2 no-underline text-sm font-medium relative transition-colors ${
              selected
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-[#25242b] dark:hover:text-white'
            }`}>
            {link?.icon && <i className={link?.icon} />} {link?.name}
            {/* 主菜单下方的安全区域 */}
            {show && (
              <div className='absolute w-full h-4 -bottom-4 left-0 bg-transparent z-30'></div>
            )}
          </div>
        </>
      )}
      {/* 子菜单 */}
      {hasSubMenu && (
        <ul
          style={{ backdropFilter: 'blur(3px)' }}
          className={`${show ? 'visible opacity-100 top-14 pointer-events-auto' : 'invisible opacity-0 top-20 pointer-events-none'} drop-shadow-md overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-gray-700 dark:bg-[#1e1e1e] transition-all duration-300 z-20 absolute`}>
          {link.subMenus.map((sLink, index) => {
            return (
              <li
                key={index}
                className='cursor-pointer hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 text-gray-900 dark:text-gray-100 transition-all duration-200 py-2 pr-6 pl-3'>
                <SmartLink href={sLink.href} target={link?.target}>
                  <span className='text-sm text-nowrap font-extralight'>
                    {link?.icon && <i className={sLink?.icon}> &nbsp; </i>}
                    {sLink.title}
                  </span>
                </SmartLink>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
