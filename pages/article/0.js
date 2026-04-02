import EvidencePage from '@/themes/heo/components/EvidencePage'
import { getEvidenceStaticProps } from '@/lib/evidence-page'

export default function AboutMeArticlePage() {
  return <EvidencePage pageKey='aboutMe' />
}

export async function getStaticProps({ locale }) {
  return getEvidenceStaticProps({ locale, pageKey: 'aboutMe' })
}
