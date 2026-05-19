import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/* =========================================================================
   LANDING PAGE CMS - MULTIEMPRESA
   Arquitectura dinámica para landing pages
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

      sites: a.hasMany('Site', 'companyId'),
    })
    .authorization((allow) => [allow.guest()]),

  /* =========================================================================
     SITES
     Una empresa puede tener varias landing pages/sitios
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

      company: a.belongsTo('Company', 'companyId'),

      pages: a.hasMany('Page', 'siteId'),
      languages: a.hasMany('SiteLanguage', 'siteId'),
    })
    .authorization((allow) => [allow.guest()]),

  /* =========================================================================
     LANGUAGES
  ========================================================================= */
  Language: a
    .model({
      code: a.string().required(),
      name: a.string().required(),

      active: a.boolean().default(true),
    })
    .authorization((allow) => [allow.guest()]),

  /* =========================================================================
     SITE LANGUAGES
  ========================================================================= */
  SiteLanguage: a
    .model({
      siteId: a.id().required(),

      languageCode: a.string().required(),

      isDefault: a.boolean().default(false),

      site: a.belongsTo('Site', 'siteId'),
    })
    .authorization((allow) => [allow.guest()]),

  /* =========================================================================
     PAGES
  ========================================================================= */
  Page: a
    .model({
      siteId: a.id().required(),

      name: a.string().required(),
      slug: a.string().required(),

      pageType: a.string(), // home, landing, contact, etc
      isHome: a.boolean().default(false),

      seoTitle: a.string(),
      seoDescription: a.string(),

      status: a.boolean().default(true),

      site: a.belongsTo('Site', 'siteId'),

      sections: a.hasMany('Section', 'pageId'),
    })
    .authorization((allow) => [allow.guest()]),

  /* =========================================================================
     SECTIONS
     Hero, Header, Footer, About, FAQ, etc.
  ========================================================================= */
  Section: a
    .model({
      pageId: a.id().required(),

      code: a.string(),
      name: a.string().required(),

      sectionType: a.string().required(),

      orderIndex: a.integer(),

      isActive: a.boolean().default(true),

      settingsJson: a.json(),

      page: a.belongsTo('Page', 'pageId'),

      blocks: a.hasMany('Block', 'sectionId'),
    })
    .authorization((allow) => [allow.guest()]),

  /* =========================================================================
     BLOCKS
     Elementos internos de una sección
  ========================================================================= */
  Block: a
    .model({
      sectionId: a.id().required(),

      parentBlockId: a.id(),

      blockType: a.string().required(),

      name: a.string(),

      orderIndex: a.integer(),

      layoutJson: a.json(),
      styleJson: a.json(),
      visibilityRulesJson: a.json(),

      section: a.belongsTo('Section', 'sectionId'),

      fields: a.hasMany('BlockField', 'blockId'),
      mediaItems: a.hasMany('BlockMedia', 'blockId'),
    })
    .authorization((allow) => [allow.guest()]),

  /* =========================================================================
     BLOCK FIELDS
     Contenido dinámico textual
  ========================================================================= */
  BlockField: a
    .model({
      blockId: a.id().required(),

      fieldKey: a.string().required(),

      fieldType: a.string(), // text, richtext, button, json

      languageCode: a.string(),

      valueText: a.string(),

      valueJson: a.json(),

      orderIndex: a.integer(),

      block: a.belongsTo('Block', 'blockId'),
    })
    .authorization((allow) => [allow.guest()]),

  /* =========================================================================
     MEDIA
  ========================================================================= */
  Media: a
    .model({
      fileName: a.string().required(),

      fileUrl: a.string().required(),

      fileType: a.string(), // image, video, icon

      mimeType: a.string(),

      altText: a.string(),

      metadataJson: a.json(),

      blockRelations: a.hasMany('BlockMedia', 'mediaId'),
    })
    .authorization((allow) => [allow.guest()]),

  /* =========================================================================
     BLOCK MEDIA
     Relación multimedia con bloques
  ========================================================================= */
  BlockMedia: a
    .model({
      blockId: a.id().required(),

      mediaId: a.id().required(),

      role: a.string(), // background, slide, logo, icon

      caption: a.string(),

      orderIndex: a.integer(),

      block: a.belongsTo('Block', 'blockId'),

      media: a.belongsTo('Media', 'mediaId'),
    })
    .authorization((allow) => [allow.guest()]),

  /* =========================================================================
     MENUS
     Navegación dinámica
  ========================================================================= */
  Menu: a
    .model({
      siteId: a.id().required(),

      name: a.string().required(),

      location: a.string(), // header, footer

      site: a.belongsTo('Site', 'siteId'),

      items: a.hasMany('MenuItem', 'menuId'),
    })
    .authorization((allow) => [allow.guest()]),

  /* =========================================================================
     MENU ITEMS
  ========================================================================= */
  MenuItem: a
    .model({
      menuId: a.id().required(),

      label: a.string().required(),

      url: a.string(),

      target: a.string(),

      orderIndex: a.integer(),

      menu: a.belongsTo('Menu', 'menuId'),
    })
    .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,

  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});