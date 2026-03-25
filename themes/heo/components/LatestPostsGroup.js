import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'
import { getUnifiedPostCover } from './tech-visual'

/**
 * 最新文章列表
 * @param posts 所有文章数据
 * @param sliceCount 截取展示的数量 默认6
 * @constructor
 */
const LatestPostsGroup = ({ latestPosts, siteInfo }) => {
  // 获取当前路径

  if (!latestPosts) {
    return <></>
  }

  return (
    <div className='grid grid-cols-2 gap-4'>
      {latestPosts.map(post => {
        return (
          <SmartLink
            key={post.id}
            passHref
            title={post.title}
            href={post?.href}
            className={'my-3 flex flex-col w-full'}>
            <div className='w-full h-24 md:h-60 overflow-hidden relative rounded-lg mb-2'>
              <LazyImage
                src={getUnifiedPostCover(post, siteInfo?.title || 'latest-grid')}
                className='object-cover w-full h-full'
              />
            </div>

            <div
              className='w-full rounded px-2 font-semibold text-slate-800 transition-colors duration-200 hover:text-blue-600'>
              <div className='line-clamp-2 menu-link'>{post.title}</div>
            </div>
          </SmartLink>
        )
      })}
    </div>
  )
}
export default LatestPostsGroup
