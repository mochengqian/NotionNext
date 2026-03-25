import Live2D from '@/components/Live2D'
import Card from './Card'
import Catalog from './Catalog'
import CategoryGroup from './CategoryGroup'
import { InfoCard } from './InfoCard'
import LatestPostsGroupMini from './LatestPostsGroupMini'
import TagGroups from './TagGroups'

/**
 * Right sidebar for desktop
 */
export default function SideRight(props) {
  const {
    post,
    tagOptions,
    currentTag,
    currentCategory,
    categoryOptions,
    rightAreaSlot
  } = props

  const sortedTags = tagOptions?.slice(0, 24) || []
  const sortedCategories = categoryOptions?.slice(0, 10) || []

  return (
    <div id='sideRight' className='hidden xl:block w-72 space-y-4 h-full'>
      <InfoCard {...props} />

      <div className='sticky top-20 space-y-4'>
        {post && post.toc && post.toc.length > 0 && (
          <Card className='wow fadeInUp bg-white border-slate-200 shadow-sm'>
            <Catalog toc={post.toc} />
          </Card>
        )}

        <Card className='wow fadeInUp bg-white border-slate-200 shadow-sm'>
          <LatestPostsGroupMini {...props} />
        </Card>

        <Card className='wow fadeInUp bg-white border-slate-200 shadow-sm'>
          <div className='mb-3 text-xs uppercase tracking-[0.16em] text-slate-500'>
            Categories
          </div>
          <CategoryGroup
            currentCategory={currentCategory}
            categories={sortedCategories}
          />
        </Card>

        <Card className='wow fadeInUp bg-white border-slate-200 shadow-sm'>
          <div className='mb-3 text-xs uppercase tracking-[0.16em] text-slate-500'>
            Tags
          </div>
          <TagGroups tags={sortedTags} currentTag={currentTag} />
        </Card>

        {rightAreaSlot}
        <Live2D />
      </div>
    </div>
  )
}
