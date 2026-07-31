import { Prisma } from '@prisma/client'

export const SOFT_DELETE_MODELS = [
  'user',
  'organization',
  'workspace',
  'membership',
  'link',
] as const

type SoftDeleteModel = (typeof SOFT_DELETE_MODELS)[number]

function isSoftDeleteModel(model: string): model is SoftDeleteModel {
  return (SOFT_DELETE_MODELS as readonly string[]).includes(model)
}

/**
 * Transparently converts `delete`/`deleteMany` into soft deletes for
 * models that carry a `deletedAt` column. All read queries must add
 * `deletedAt: null` to their `where` clause (see `activeWhere` helper).
 */
export const softDeleteExtension = Prisma.defineExtension({
  name: 'soft-delete',
  query: {
    $allModels: {
      async delete({ model, args, query }) {
        if (!isSoftDeleteModel(model)) return query(args)

        const context = Prisma.getExtensionContext(this)
        const modelClient = context as unknown as {
          update: (args: { where: Record<string, unknown>; data: { deletedAt: Date } }) => unknown
        }

        return modelClient.update({
          where: args.where as Record<string, unknown>,
          data: { deletedAt: new Date() },
        })
      },

      async deleteMany({ model, args, query }) {
        if (!isSoftDeleteModel(model)) return query(args)

        const context = Prisma.getExtensionContext(this)
        const modelClient = context as unknown as {
          updateMany: (args: {
            where: Record<string, unknown>
            data: { deletedAt: Date }
          }) => Promise<{ count: number }>
        }

        return modelClient.updateMany({
          where: args.where as Record<string, unknown>,
          data: { deletedAt: new Date() },
        })
      },
    },
  },
})

export const activeWhere = { deletedAt: null } as const
