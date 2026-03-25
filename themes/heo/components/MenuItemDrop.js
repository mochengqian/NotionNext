import SmartLink from '@/components/SmartLink'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

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
          className='rounded-lg border border-transparent px-3 py-1.5 text-sm no-underline transition-colors hover:border-slate-200 hover:bg-slate-50 hover:text-blue-600'>
          {link?.icon && <i className={link?.icon} />} {link?.name}
        </SmartLink>
      )}
      {/* 含子菜单的按钮 */}
      {hasSubMenu && (
        <>
          <div className='relative flex cursor-pointer items-center justify-center rounded-lg border border-transparent px-3 py-1.5 text-sm no-underline transition-colors hover:border-slate-200 hover:bg-slate-50 hover:text-blue-600'>
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
          className={`${show ? 'visible opacity-100 top-14 pointer-events-auto' : 'invisible opacity-0 top-20 pointer-events-none'} absolute z-20 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-all duration-300`}>
          {link.subMenus.map((sLink, index) => {
            return (
              <li
                key={index}
                className='cursor-pointer py-1 pr-6 pl-3 text-slate-800 transition-colors duration-200 hover:bg-slate-50 hover:text-blue-600'>
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
