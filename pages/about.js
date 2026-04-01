import EvidencePage from '@/themes/heo/components/EvidencePage'
import { getEvidenceStaticProps } from '@/lib/evidence-page'

export default function AboutPage() {
  return <EvidencePage pageKey='about' />
}

export async function getStaticProps({ locale }) {
  return getEvidenceStaticProps({ locale, pageKey: 'about' })
}
