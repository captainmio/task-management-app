import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

interface BreadcrumbItemData {
  link: string;
  label: string;
}

interface BreadcrumbsProps {
  links: BreadcrumbItemData[];
}

export const Breadcrumbs = ({links}: BreadcrumbsProps) => {
  return (
    <Breadcrumb>
        {links.map(({link, label}) => (
            <BreadcrumbItem key={link}>
                <BreadcrumbLink href={link}>{label}</BreadcrumbLink>
            </BreadcrumbItem>
        ))}
    </Breadcrumb>
  )
}
