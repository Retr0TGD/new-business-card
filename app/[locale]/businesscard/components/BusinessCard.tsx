import { FormValuesBC } from'@/app/[locale]/businesscard/schema';
import { BlueTemplate, GreenTemplate, PurpleTemplate } from '@/app/[locale]/businesscard/components/CardTemplates'

export default function BusinessCard({ data }: { data: FormValuesBC }) {
  switch (data.template) {
    case '1':
      return <BlueTemplate data={data} />
    case '2':
      return <GreenTemplate data={data} />
    case '3':
      return <PurpleTemplate data={data} />
    default:
      return <BlueTemplate data={data} />
  }
}
