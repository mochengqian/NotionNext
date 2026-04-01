import EvidencePage from '@/themes/heo/components/EvidencePage'
import { getEvidenceStaticProps } from '@/lib/evidence-page'

export default function OpenSourcePage() {
  return <EvidencePage pageKey='openSource' />
}

export async function getStaticProps({ locale }) {
  return getEvidenceStaticProps({ locale, pageKey: 'openSource' })
}
