import type { FactoryProvider, ModuleMetadata } from '@nestjs/common'

export const UnitPayOptionsSymbol = Symbol('UnitPayOptions')

export type UnitPayOptions = {
	projectId: string
	secretKey: string
	apiUrl?: string
}

export type UnitPayAsyncOptions = Pick<ModuleMetadata, 'imports'> &
	Pick<FactoryProvider<UnitPayOptions>, 'useFactory' | 'inject'>
