import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import React from 'react';

interface BreadcrumbItemData {
  link: string;
  label: string;
}

interface BreadcrumbsProps {
  links: BreadcrumbItemData[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({links}) => {
  return (
    <Breadcrumb size={'md'}>
        {links.map(({link, label}) => (
            <BreadcrumbItem key={link}>
                <BreadcrumbLink href={link}>{label}</BreadcrumbLink>
            </BreadcrumbItem>
        ))}
    </Breadcrumb>
  )
}
