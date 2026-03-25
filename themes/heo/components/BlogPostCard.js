import LazyImage from '@/components/LazyImage'
import NotionIcon from './NotionIcon'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import TagItemMini from './TagItemMini'
import { getUnifiedPostCover } from './tech-visual'

const BlogPostCard = ({ index = 0, post, showSummary, siteInfo }) => {
  const showPreview =
    siteConfig('HEO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap

  if (
    post &&
    !post.pageCoverThumbnail &&
    siteConfig('HEO_POST_LIST_COVER_DEFAULT', null, CONFIG)
  ) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }

  const showPageCover =
    siteConfig('HEO_POST_LIST_COVER', null, CONFIG) && !showPreview

  const coverSrc = getUnifiedPostCover(post, `post-card-${index}`)

  return (
    <article className='wow fadeInUp'>
      <div className='group mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md'>
        {showPageCover && (
          <SmartLink href={post?.href} passHref legacyBehavior>
            <div className='aspect-[16/9] w-full cursor-pointer overflow-hidden select-none'>
              <LazyImage
                priority={index < 2}
                src={coverSrc}
                alt={post?.title}
                className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
              />
            </div>
          </SmartLink>
        )}

        <div className='flex flex-col gap-4 p-6'>
          <header>
            {post?.category && (
              <div className='mb-2 flex flex-wrap items-center text-xs text-slate-500'>
                <SmartLink
                  passHref
                  href={`/category/${encodeURIComponent(post.category)}`}
                  className='cursor-pointer rounded-md border border-slate-200 px-2 py-0.5 transition-colors hover:border-blue-200 hover:text-blue-600'>
                  {post.category}
                </SmartLink>
              </div>
            )}

            <SmartLink
              href={post?.href}
              passHref
              className='line-clamp-2 cursor-pointer text-2xl font-semibold leading-8 text-slate-900 transition-colors group-hover:text-blue-700'>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon
                  icon={post.pageIcon}
                  className='heo-icon mr-1 inline-block h-6 w-6 translate-y-[-8%] align-middle'
                />
              )}
              <span className='menu-link'>{post.title}</span>
            </SmartLink>
          </header>

          {(!showPreview || showSummary) && (
            <main className='line-clamp-3 text-sm leading-7 text-slate-600'>
              {post.summary}
            </main>
          )}

          <footer className='flex flex-wrap items-center justify-between gap-3'>
            <div className='flex flex-wrap gap-2'>
              {post.tagItems?.slice(0, 4).map(tag => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
            <div className='text-xs text-slate-400'>
              {post?.publishDay || post?.lastEditedDay || ''}
            </div>
          </footer>
        </div>
      </div>
    </article>
  )
}

export default BlogPostCard
