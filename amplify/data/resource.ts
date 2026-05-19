import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/* =========================================================================
   LANDING PAGE CMS - MULTIEMPRESA
   Arquitectura enterprise para landing pages dinámicas
============================================================================ */

const schema = a.schema({
  /* =========================================================================
     COMPANIES
  ========================================================================= */
  Company: a
    .model({
      name: a.string().required(),
      slug: a.string().required(),
      description: a.string(),
      logoUrl: a.string(),
      defaultLanguage: a.string().default('es'),
      status: a.boolean().default(true),
      createdBy: a.string(),
      updatedBy: a.string(),

      sites: a.hasMany('Site', 'companyId'),
    })
    .secondaryIndexes((index) => [index('slug')])
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated(),
    ]),

  /* =========================================================================
     SITES
  ========================================================================= */
  Site: a
    .model({
      companyId: a.id().required(),
      name: a.string().required(),
      domain: a.string(),
      subdomain: a.string(),
      theme: a.string(),
      faviconUrl: a.string(),
      status: a.boolean().default(true),
      createdBy: a.string(),
      updatedBy: a.string(),
      company: a.belongsTo('Company', 'companyId'),
      pages: a.hasMany('Page', 'siteId'),
      languages: a.hasMany('SiteLanguage', 'siteId'),
      menus: a.hasMany('Menu', 'siteId'),
    })
    .secondaryIndexes((index) => [
      index('companyId'),
      index('domain'),
      index('subdomain'),
    ])
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated(),
    ]),

  /* =========================================================================
     LANGUAGES
  ========================================================================= */
  Language: a
    .model({
      code: a.string().required(),
      name: a.string().required(),
      active: a.boolean().default(true),
      siteLanguages: a.hasMany('SiteLanguage', 'languageId'),
    })
    .secondaryIndexes((index) => [index('code')])
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated(),
    ]),

  /* =========================================================================
     SITE LANGUAGES
  ========================================================================= */
  SiteLanguage: a
    .model({
      siteId: a.id().required(),
      languageId: a.id().required(),
      isDefault: a.boolean().default(false),
      site: a.belongsTo('Site', 'siteId'),
      language: a.belongsTo('Language', 'languageId'),
    })
    .secondaryIndexes((index) => [
      index('siteId'),
      index('languageId'),
    ])
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated(),
    ]),

  /* =========================================================================
     PAGES
  ========================================================================= */
  Page: a
    .model({
      siteId: a.id().required(),
      name: a.string().required(),
      slug: a.string().required(),
      pageType: a.string(),
      isHome: a.string().default('false'), 
      seoTitle: a.string(),
      seoDescription: a.string(),
      seoKeywords: a.string().array(),
      canonicalUrl: a.string(),
      ogImageUrl: a.string(),
      status: a.boolean().default(true),
      isDraft: a.boolean().default(true),
      version: a.integer().default(1),
      publishedAt: a.datetime(),
      createdBy: a.string(),
      updatedBy: a.string(),
      site: a.belongsTo('Site', 'siteId'),
      sections: a.hasMany('Section', ['pageSiteId', 'pageSlug']),
    })
    .identifier(['siteId', 'slug'])
    .secondaryIndexes((index) => [
      index('siteId'),
      index('slug'),
      index('isHome'),
    ])
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated(),
    ]),

  /* =========================================================================
     SECTIONS
  ========================================================================= */
  Section: a
    .model({
      pageSiteId: a.id().required(),
      pageSlug: a.string().required(),
      code: a.string(),
      name: a.string().required(),
      sectionType: a.string().required(),
      orderIndex: a.integer().default(0),
      isActive: a.boolean().default(true),
      settingsJson: a.json(),
      createdBy: a.string(),
      updatedBy: a.string(),
      page: a.belongsTo('Page', ['pageSiteId', 'pageSlug']),
      blocks: a.hasMany('Block', 'sectionId'),
    })
    .secondaryIndexes((index) => [
      index('pageSiteId'),
      index('pageSlug'),
      index('sectionType'),
    ])
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated(),
    ]),

  /* =========================================================================
     BLOCKS
  ========================================================================= */
  Block: a
    .model({
      sectionId: a.id().required(),
      parentBlockId: a.id(),
      blockType: a.string().required(),
      name: a.string(),
      orderIndex: a.integer().default(0),
      layoutJson: a.json(),
      styleJson: a.json(),
      visibilityRulesJson: a.json(),
      createdBy: a.string(),
      updatedBy: a.string(),
      section: a.belongsTo('Section', 'sectionId'),
      parent: a.belongsTo('Block', 'parentBlockId'),

      children: a.hasMany('Block', 'parentBlockId'),
      fields: a.hasMany('BlockField', 'blockId'),
      mediaItems: a.hasMany('BlockMedia', 'blockId'),
    })
    .secondaryIndexes((index) => [
      index('sectionId'),
      index('parentBlockId'),
      index('blockType'),
    ])
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated(),
    ]),

  /* =========================================================================
     BLOCK FIELDS
  ========================================================================= */
  BlockField: a
    .model({
      blockId: a.id().required(),
      fieldKey: a.string().required(),
      fieldType: a.string(),
      languageCode: a.string(),
      valueText: a.string(),
      valueJson: a.json(),
      orderIndex: a.integer().default(0),
      block: a.belongsTo('Block', 'blockId'),
    })
    .secondaryIndexes((index) => [
      index('blockId'),
      index('fieldKey'),
      index('languageCode'),
    ])
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated(),
    ]),

  /* =========================================================================
     MEDIA
  ========================================================================= */
  Media: a
    .model({
      fileName: a.string().required(),
      s3Key: a.string().required(),
      bucket: a.string(),
      region: a.string(),
      fileType: a.string(),
      mimeType: a.string(),
      altText: a.string(),
      metadataJson: a.json(),
      createdBy: a.string(),
      updatedBy: a.string(),
      blockRelations: a.hasMany('BlockMedia', 'mediaId'),
    })
    .secondaryIndexes((index) => [
      index('s3Key'),
      index('fileType'),
    ])
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated(),
    ]),

  /* =========================================================================
     BLOCK MEDIA
  ========================================================================= */
  BlockMedia: a
    .model({
      blockId: a.id().required(),
      mediaId: a.id().required(),
      role: a.string(),
      caption: a.string(),
      orderIndex: a.integer().default(0),
      block: a.belongsTo('Block', 'blockId'),
      media: a.belongsTo('Media', 'mediaId'),
    })
    .secondaryIndexes((index) => [
      index('blockId'),
      index('mediaId'),
      index('role'),
    ])
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated(),
    ]),

  /* =========================================================================
     MENUS
  ========================================================================= */
  Menu: a
    .model({
      siteId: a.id().required(),
      name: a.string().required(),
      location: a.string(),
      site: a.belongsTo('Site', 'siteId'),
      items: a.hasMany('MenuItem', 'menuId'),
    })
    .secondaryIndexes((index) => [
      index('siteId'),
      index('location'),
    ])
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated(),
    ]),

  /* =========================================================================
     MENU ITEMS
  ========================================================================= */
  MenuItem: a
    .model({
      menuId: a.id().required(),
      parentItemId: a.id(),
      label: a.string().required(),
      url: a.string(),
      target: a.string(),
      orderIndex: a.integer().default(0),
      menu: a.belongsTo('Menu', 'menuId'),
      parent: a.belongsTo('MenuItem', 'parentItemId'),
      children: a.hasMany('MenuItem', 'parentItemId'),
    })
    .secondaryIndexes((index) => [
      index('menuId'),
      index('parentItemId'),
    ])
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated(),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,

  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});