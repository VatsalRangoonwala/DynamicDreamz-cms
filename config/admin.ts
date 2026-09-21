import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET')!,
  },
  apiToken: {
    salt: env('API_TOKEN_SALT')!,
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT')!,
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY')!,
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    docLinks: env.bool('FLAG_DOC_LINKS', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('CLIENT_URL', 'http://localhost:3000')],
      async handler(uid, { documentId, locale, status }) {
        const clientUrl = env('CLIENT_URL', 'http://localhost:3000').replace(/\/+$/, '');
        const secret = env('PREVIEW_SECRET', 'StrapiPreviewSecret');

        let slug = '';
        if (documentId) {
          try {
            const doc = await strapi.documents(uid as any).findOne({
              documentId,
              locale: locale || undefined,
              status: (status as any) || 'draft',
            });
            if (doc && 'slug' in doc) {
              slug = String((doc as Record<string, unknown>).slug || '');
            }
          } catch (err) {
            strapi.log.warn(
              `Preview handler could not find document for ${uid} [${documentId}]:`,
              err
            );
          }
        }

        if (uid === 'api::page.page') {
          return `${clientUrl}/api/preview?secret=${secret}&slug=${encodeURIComponent(slug)}&model=page`;
        }
        if (uid === 'api::article.article') {
          return `${clientUrl}/api/preview?secret=${secret}&slug=${encodeURIComponent(slug)}&model=article`;
        }
        if (uid === 'api::case-study.case-study') {
          return `${clientUrl}/api/preview?secret=${secret}&slug=${encodeURIComponent(slug)}&model=case-study`;
        }
        if (uid === 'api::global.global') {
          return `${clientUrl}/api/preview?secret=${secret}&model=global`;
        }

        return undefined;
      },
    },
  },
});

export default config;
