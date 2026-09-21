import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsCounter extends Struct.ComponentSchema {
  collectionName: 'components_elements_counters';
  info: {
    description: 'Counter with number, display, and label';
    displayName: 'Counter';
    icon: 'chartCircle';
  };
  attributes: {
    description: Schema.Attribute.String;
    display: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    prefix: Schema.Attribute.String;
    suffix: Schema.Attribute.String;
    value: Schema.Attribute.Integer;
  };
}

export interface ElementsFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_faq_items';
  info: {
    description: 'Question and Answer pair';
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_feature_items';
  info: {
    description: 'Feature card with title, description, and optional icon or link';
    displayName: 'Feature Item';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'>;
    linkText: Schema.Attribute.String;
    linkUrl: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_elements_footer_columns';
  info: {
    description: 'Column of links in the footer';
    displayName: 'Footer Column';
    icon: 'layout';
  };
  attributes: {
    links: Schema.Attribute.Component<'elements.nav-link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsNavGroup extends Struct.ComponentSchema {
  collectionName: 'components_elements_nav_groups';
  info: {
    description: 'Mega menu navigation group';
    displayName: 'Nav Group';
    icon: 'layer';
  };
  attributes: {
    columns: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<3>;
    items: Schema.Attribute.Component<'elements.nav-link', true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    promoCtaHref: Schema.Attribute.String;
    promoCtaLabel: Schema.Attribute.String;
    promoDetails: Schema.Attribute.String;
    promoTitle: Schema.Attribute.String;
    slug: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['default', 'work']> &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface ElementsNavLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_nav_links';
  info: {
    description: 'Navigation link item';
    displayName: 'Nav Link';
    icon: 'link';
  };
  attributes: {
    badge: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    description: Schema.Attribute.String;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_social_links';
  info: {
    description: 'Social media channel link';
    displayName: 'Social Link';
    icon: 'share';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTimelineStep extends Struct.ComponentSchema {
  collectionName: 'components_elements_timeline_steps';
  info: {
    description: 'Numbered step in a process';
    displayName: 'Timeline Step';
    icon: 'clock';
  };
  attributes: {
    description: Schema.Attribute.Text;
    stepNumber: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsCaseStudies extends Struct.ComponentSchema {
  collectionName: 'components_sections_case_studies';
  info: {
    description: 'Case studies preview block';
    displayName: 'Case Studies Block';
    icon: 'briefcase';
  };
  attributes: {
    caseStudies: Schema.Attribute.Relation<
      'oneToMany',
      'api::case-study.case-study'
    >;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
  };
}

export interface SectionsCtaBanner extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_banners';
  info: {
    description: 'Call-to-action banner';
    displayName: 'CTA Banner Block';
    icon: 'speakerphone';
  };
  attributes: {
    btnText: Schema.Attribute.String;
    btnUrl: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFaqAccordion extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq_accordions';
  info: {
    description: 'Accordion FAQ block';
    displayName: 'FAQ Accordion Block';
    icon: 'question';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    faqs: Schema.Attribute.Component<'elements.faq-item', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFeaturesGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_features_grids';
  info: {
    description: 'Grid of feature cards';
    displayName: 'Features Grid Block';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    features: Schema.Attribute.Component<'elements.feature-item', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHappyClients extends Struct.ComponentSchema {
  collectionName: 'components_sections_happy_clients';
  info: {
    description: 'Testimonial carousel block';
    displayName: 'Happy Clients Block';
    icon: 'emotionHappy';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    testimonials: Schema.Attribute.Relation<
      'oneToMany',
      'api::testimonial.testimonial'
    >;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    description: 'Hero section banner';
    displayName: 'Hero Block';
    icon: 'landscape';
  };
  attributes: {
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    eyebrows: Schema.Attribute.JSON;
    image: Schema.Attribute.Media<'images'>;
    showReviews: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    subheading: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['split', 'centered']> &
      Schema.Attribute.DefaultTo<'split'>;
  };
}

export interface SectionsProcessTimeline extends Struct.ComponentSchema {
  collectionName: 'components_sections_process_timelines';
  info: {
    description: 'Timeline of numbered workflow steps';
    displayName: 'Process Timeline Block';
    icon: 'layer';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    steps: Schema.Attribute.Component<'elements.timeline-step', true>;
  };
}

export interface SectionsProofCounters extends Struct.ComponentSchema {
  collectionName: 'components_sections_proof_counters';
  info: {
    description: 'Animated proof counters';
    displayName: 'Proof Counters Block';
    icon: 'chartPie';
  };
  attributes: {
    counters: Schema.Attribute.Component<'elements.counter', true>;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO metadata fields';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    metaImage: Schema.Attribute.Media<'images'>;
    metaTitle: Schema.Attribute.String;
    preventIndexing: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'elements.counter': ElementsCounter;
      'elements.faq-item': ElementsFaqItem;
      'elements.feature-item': ElementsFeatureItem;
      'elements.footer-column': ElementsFooterColumn;
      'elements.nav-group': ElementsNavGroup;
      'elements.nav-link': ElementsNavLink;
      'elements.social-link': ElementsSocialLink;
      'elements.timeline-step': ElementsTimelineStep;
      'sections.case-studies': SectionsCaseStudies;
      'sections.cta-banner': SectionsCtaBanner;
      'sections.faq-accordion': SectionsFaqAccordion;
      'sections.features-grid': SectionsFeaturesGrid;
      'sections.happy-clients': SectionsHappyClients;
      'sections.hero': SectionsHero;
      'sections.process-timeline': SectionsProcessTimeline;
      'sections.proof-counters': SectionsProofCounters;
      'shared.seo': SharedSeo;
    }
  }
}
